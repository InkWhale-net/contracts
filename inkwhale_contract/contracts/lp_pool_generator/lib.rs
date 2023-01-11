#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::let_unit_value)]
#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]
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
        }
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
        },
        storage::{
            Mapping
        }
    };
    use my_lp_pool::my_lp_pool::MyLPPoolRef;

    use inkwhale_project::impls::generic_pool_generator::*;
    use inkwhale_project::traits::{
        admin::*,
        generic_pool_generator::*
    };

    #[derive(Default, SpreadAllocate, Storage)]
    #[ink(storage)]
    pub struct LPPoolGenerator {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        manager: generic_pool_generator::data::Data,
        #[storage_field]
        admin_data: admin::data::Data
    }

    impl Ownable for LPPoolGenerator {}
    impl GenericPoolGeneratorTrait for LPPoolGenerator {}
    impl AdminTrait for LPPoolGenerator {}

    impl LPPoolGenerator {
        #[ink(constructor)]
        pub fn new(pool_hash: Hash, wal_contract: AccountId, creation_fee: Balance, unstake_fee: Balance, owner_address: AccountId,) -> Self {
            ink_lang::codegen::initialize_contract(|instance: &mut Self| {
                instance._init_with_owner(owner_address);
                instance.initialize(
                    pool_hash,
                    wal_contract,
                    creation_fee,
                    unstake_fee
                )
                .ok()
                .unwrap();
            })
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, pool_hash: Hash, wal_contract: AccountId, creation_fee: Balance, unstake_fee: Balance
        ) -> Result<(), Error> {
            self.manager.pool_hash = pool_hash;
            self.manager.creation_fee = creation_fee;
            self.manager.wal_contract = wal_contract;
            self.manager.unstake_fee = unstake_fee;

            Ok(())
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
                .get(&Some(contract_owner))
                .is_some()
            {
                last_index = self
                    .manager
                    .pool_ids_last_index
                    .get(&Some(contract_owner))
                    .unwrap();
            }
            self.manager.pool_ids.insert(
                contract_owner,
                &self.manager.pool_count
            );
            self.manager
                .pool_ids_last_index
                .insert(&Some(contract_owner), &(last_index + 1));

            Ok(())
        }
    }
}