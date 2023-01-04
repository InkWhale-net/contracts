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
    };
    use openbrush::{
        contracts::{
            ownable::*,
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

    use my_psp22::my_psp22::MyPsp22Ref;

    use inkwhale_project::impls::token_manager::*;

    #[derive(Default, SpreadAllocate, Storage)]
    #[ink(storage)]
    pub struct TokenGenerator {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        manager: token_manager::data::Data
    }   

    impl Ownable for TokenGenerator {}

    impl TokenManagerTrait for TokenGenerator {}

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
    }
}