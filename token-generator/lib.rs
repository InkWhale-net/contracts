#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod token_generator {
    use ink_prelude::{
        vec::Vec,
    };
    use ink_lang::ToAccountId;
    use ink_env::CallFlags;
    use ink_storage::{
        traits::{
            PackedLayout,
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
    use my_psp22::my_psp22::MyPsp22Ref;

    #[derive(
        Clone, Debug, Ord, PartialOrd, Eq, PartialEq, PackedLayout, SpreadLayout, scale::Encode, scale::Decode,
    )]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct Token {
        name: String,
        symbol: String,
        decimal: u8,
        contract_address: AccountId,
        creator: AccountId,
        mint_to: AccountId,
        total_supply: Balance
    }

    pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(TokenGenerator);

    #[derive(Default)]
    #[openbrush::upgradeable_storage(STORAGE_KEY)]
    struct Manager {
        standard_psp22_hash: Hash,
        admin_address: AccountId,
        token_count: u64,
        wal_contract: AccountId,
        creation_fee: Balance,
        token_list: Mapping<u64, Token>,
        _reserved: Option<()>,
    }

    #[derive(Default, SpreadAllocate, Storage)]
    #[ink(storage)]
    pub struct TokenGenerator {
        #[storage_field]
        ownable: ownable::Data,
        manager: Manager,
    }

    impl Ownable for TokenGenerator {}

    #[openbrush::wrapper]
    pub type Psp22Ref = dyn PSP22;

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

    impl TokenGenerator {
        #[ink(constructor)]
        pub fn new(psp22_hash: Hash, wal_contract: AccountId, creation_fee: Balance, owner_address: AccountId) -> Self {
            ink_lang::codegen::initialize_contract(|instance: &mut Self| {
                instance._init_with_owner(owner_address);
                instance.manager.standard_psp22_hash = psp22_hash;
                instance.manager.creation_fee = creation_fee;
                instance.manager.wal_contract = wal_contract;
            })
        }

        #[ink(message)]
        #[ink(payable)]
        pub fn new_token(
            &mut self,
            mint_to: AccountId,
            total_supply: Balance,
            name: String,
            symbol: String,
            decimal: u8
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

            //create contract
            let contract = MyPsp22Ref::new(mint_to, total_supply, name.clone(), symbol.clone(), decimal.clone())
                .endowment(0)
                .code_hash(self.manager.standard_psp22_hash)
                .salt_bytes(self.manager.token_count.to_le_bytes())
                .instantiate()
                .unwrap_or_else(|error| panic!("failed at instantiating the PSP22 contract: {:?}", error));
            let contract_account: AccountId = contract.to_account_id();

            let new_token = Token {
                name,
                symbol,
                decimal,
                contract_address: contract_account,
                creator: caller,
                mint_to,
                total_supply
            };
            self.manager.token_count += 1;
            self.manager.token_list.insert(&self.manager.token_count, &new_token);
            Ok(())
        }

        #[ink(message)]
        pub fn get_token_info(&self, index: u64) -> Option<Token> {
            return self.manager.token_list.get(&index)
        }

        #[ink(message)]
        pub fn get_token_count(&self) -> u64 {
            self.manager.token_count
        }

        #[ink(message)]
        pub fn get_creation_fee(&self) -> Balance {
            self.manager.creation_fee
        }

        #[ink(message)]
        pub fn get_contract_hash(&self) -> Hash {
            self.manager.standard_psp22_hash
        }

        #[ink(message)]
        pub fn get_wal_contract(&self) -> AccountId {
            self.manager.wal_contract
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_contract_hash(&mut self, psp22_hash: Hash) -> Result<(), Error> {
            self.manager.standard_psp22_hash = psp22_hash;
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_wal_contract(&mut self, wal_contract: AccountId) -> Result<(), Error> {
            self.manager.wal_contract = wal_contract;
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
