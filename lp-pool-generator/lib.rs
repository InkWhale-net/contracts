#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod lp_pool_generator {
    use ink_prelude::{
        vec::Vec,
    };
    use ink_lang::ToAccountId;
    use ink_env::CallFlags;
    use ink_storage::{
        traits::{
            SpreadAllocate,
            SpreadLayout,
        },
        Mapping,
    };
    use openbrush::{
        contracts::{
            ownable::*,
            traits::psp22::*,
        },
        modifiers,
        traits::{
            Storage,
            String
        }
    };
    use my_lp_pool::my_lp_pool::MyLPPoolRef;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        Custom(String),
        CannotTransfer
    }

    impl From<OwnableError> for Error {
        fn from(ownable: OwnableError) -> Self {
            match ownable {
                OwnableError::CallerIsNotOwner => Error::Custom(String::from("O::CallerIsNotOwner")),
                OwnableError::NewOwnerIsZero => Error::Custom(String::from("O::NewOwnerIsZero")),
            }
        }
    }

    #[derive(Default, Debug, ink_storage::traits::SpreadLayout, ink_storage::traits::SpreadAllocate)]
    #[cfg_attr(feature = "std", derive(ink_storage::traits::StorageLayout))]
    pub struct EnumerableMapping {
        id_to_index: Mapping<(Option<AccountId>, u64), u64>,
        index_to_id: Mapping<(Option<AccountId>, u64), u64>,
    }

    impl EnumerableMapping {
        pub fn insert(
            &mut self,
            pool_creator: &Option<AccountId>,
            id: &u64,
            index: &u64,
        ) {
            self.id_to_index.insert((pool_creator, id), index);
            self.index_to_id.insert((pool_creator, index), id);
        }

        pub fn remove(
            &mut self,
            pool_creator: &Option<AccountId>,
            id: &u64,
            last_index: &u64,
        ) -> Result<(), Error> {
            let index = self
                .id_to_index
                .get((pool_creator, id))
                .ok_or(Error::Custom(String::from("O::NotExist")))?;
            if last_index != &index {
                let last_id = self
                    .index_to_id
                    .get((pool_creator, last_index))
                    .ok_or(Error::Custom(String::from("O::NotExist")))?;
                self.index_to_id
                    .insert((pool_creator, &index), &last_id);
                self.id_to_index
                    .insert((pool_creator, &last_id), &index);
            }

            self.index_to_id.remove((pool_creator, &last_index));
            self.id_to_index.remove((pool_creator, id));

            Ok(())
        }
        pub fn get_by_index(
            &self,
            pool_creator: &Option<AccountId>,
            index: &u64,
        ) -> Result<u64, Error> {
            self.index_to_id
                .get((pool_creator, index))
                .ok_or(Error::Custom(String::from("O::NotExist")))
        }
        pub fn get_by_id(
            &self,
            pool_creator: &Option<AccountId>,
            id: &u64,
        ) -> Result<u64, Error> {
            self.id_to_index
                .get((pool_creator, id))
                .ok_or(Error::Custom(String::from("O::NotExist")))
        }
    }

    pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Manager);

    #[derive(Default)]
    #[openbrush::upgradeable_storage(STORAGE_KEY)]
    struct Manager {
        pool_hash: Hash,
        admin_address: AccountId,
        pool_count: u64,
        wal_contract: AccountId,
        creation_fee: Balance,
        unstake_fee: Balance,
        pool_list: Mapping<u64, AccountId>,
        pool_ids: EnumerableMapping,                 //(NFT Contract Address, Seller Address)
        pool_ids_last_index: Mapping<Option<AccountId>, u64>,
        _reserved: Option<()>,
    }

    #[derive(Default, SpreadAllocate, Storage)]
    #[ink(storage)]
    pub struct LPPoolGenerator {
        #[storage_field]
        ownable: ownable::Data,
        manager: Manager,
    }

    impl Ownable for LPPoolGenerator {}

    #[openbrush::wrapper]
    pub type Psp22Ref = dyn PSP22;

    impl LPPoolGenerator {
        #[ink(constructor)]
        pub fn new(pool_hash: Hash, wal_contract: AccountId, creation_fee: Balance, unstake_fee: Balance, owner_address: AccountId,) -> Self {
            ink_lang::codegen::initialize_contract(|instance: &mut Self| {
                instance._init_with_owner(owner_address);
                instance.manager.pool_hash = pool_hash;
                instance.manager.creation_fee = creation_fee;
                instance.manager.wal_contract = wal_contract;
                instance.manager.unstake_fee = unstake_fee;
            })
        }

        #[ink(message)]
        pub fn new_pool(
            &mut self,
            contract_owner: AccountId,
            lp_contract_address: AccountId,
            psp22_contract_address: AccountId,
            multiplier: u64,
            duration: u64,
            start_time: u64
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            let fees = self.manager.creation_fee;
            //Collect WAL as transaction Fees
            let allowance = Psp22Ref::allowance(
                &self.manager.wal_contract,
                caller,
                self.env().account_id()
            );
            assert!(allowance >= fees);

            let balance = Psp22Ref::balance_of(
                &self.manager.wal_contract,
                caller
            );
            assert!(balance >= fees,"not enough balance");

            if !Psp22Ref::transfer_from_builder(
                &self.manager.wal_contract,
                caller,
                self.env().account_id(),
                fees,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true))
            .fire()
            .is_ok()
            {
                return Err(Error::CannotTransfer)
            }
            let contract = MyLPPoolRef::new(contract_owner, self.manager.wal_contract.clone(), lp_contract_address, psp22_contract_address, multiplier, duration, start_time, self.manager.unstake_fee.clone())
                .endowment(0)
                .code_hash(self.manager.pool_hash)
                .salt_bytes(self.manager.pool_count.to_le_bytes())
                .instantiate()
                .unwrap_or_else(|error| panic!("failed at instantiating the Pool contract: {:?}", error));
            let contract_account: AccountId = contract.to_account_id();

            self.manager.pool_count += 1;
            self.manager.pool_list.insert(&self.manager.pool_count, &contract_account);

            let mut last_index = 0;
            if self
                .manager
                .pool_ids_last_index
                .get(Some(contract_owner))
                .is_some()
            {
                last_index = self
                    .manager
                    .pool_ids_last_index
                    .get(Some(contract_owner))
                    .unwrap();
            }
            self.manager.pool_ids.insert(
                &Some(contract_owner),
                &self.manager.pool_count,
                &(last_index + 1),
            );
            self.manager
                .pool_ids_last_index
                .insert(Some(contract_owner), &(last_index + 1));

            Ok(())
        }

        #[ink(message)]
        pub fn get_pool_by_owner(
            &self,
            contract_owner: AccountId,
            index: u64,
        ) -> u64 {
            self.manager
                .pool_ids
                .get_by_index(&Some(contract_owner), &index)
                .unwrap()
        }

        #[ink(message)]
        pub fn get_pool_count_by_owner(&self, contract_owner: AccountId) -> u64 {
            return self
                .manager
                .pool_ids_last_index
                .get(Some(contract_owner)).unwrap_or(0);
        }

        #[ink(message)]
        pub fn get_pool(&self, index: u64) -> Option<AccountId> {
            return self.manager.pool_list.get(&index)
        }

        #[ink(message)]
        pub fn get_pool_count(&self) -> u64 {
            self.manager.pool_count
        }

        #[ink(message)]
        pub fn get_creation_fee(&self) -> Balance {
            self.manager.creation_fee
        }

        #[ink(message)]
        pub fn get_unstake_fee(&self) -> Balance {
            self.manager.unstake_fee
        }

        #[ink(message)]
        pub fn get_wal_contract(&self) -> AccountId {
            self.manager.wal_contract
        }

        #[ink(message)]
        pub fn get_pool_hash(&self) -> Hash {
            self.manager.pool_hash
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_pool_hash(&mut self, pool_hash: Hash) -> Result<(), Error> {
            self.manager.pool_hash = pool_hash;
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_wal_contract(&mut self, wal_contract: AccountId) -> Result<(), Error> {
            self.manager.wal_contract = wal_contract;
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error> {
            self.manager.creation_fee = creation_fee;
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_unstake_fee(&mut self, unstake_fee: Balance) -> Result<(), Error> {
            self.manager.unstake_fee = unstake_fee;
            Ok(())
        }

        /// Withdraw Fees - only Owner
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn withdraw_fee(&mut self, value: Balance) -> Result<(), Error> {
            assert!(value <= self.env().balance(), "not enough balance");
            assert!(
                self.env().transfer(self.env().caller(), value).is_ok(),
                "error withdraw_fee"
            );
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn withdraw_wal(&mut self, value: Balance) -> Result<(), Error> {
            assert!(Psp22Ref::transfer(
                &self.manager.wal_contract,
                self.env().caller(),
                value,
                Vec::<u8>::new()
            ).is_ok());
            Ok(())
        }
    }
}
