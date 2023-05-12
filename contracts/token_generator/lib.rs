#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]

#[openbrush::contract]
pub mod token_generator {
    use ink::prelude::{
        vec::Vec,
    };
    use ink::ToAccountId;
    use ink::env::CallFlags;

    use openbrush::{
        contracts::{
            ownable::*,
        },
        modifiers,
        traits::{
            Storage,
            String
        },
    };

    use token_standard::token_standard::TokenStandardRef;

    use inkwhale_project::traits::token_manager::Psp22Ref;
    use inkwhale_project::impls::{
        token_manager::*,
        upgradeable::*
    };
    use inkwhale_project::{
        traits::{
            admin::*
        }
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct TokenGenerator {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        manager: token_manager::data::Data,
        #[storage_field]
        admin_data: inkwhale_project::impls::admin::data::Data,
        #[storage_field]
        upgradeable_data: inkwhale_project::impls::upgradeable::data::Data,
    }

    impl Ownable for TokenGenerator {}
    impl TokenManagerTrait for TokenGenerator {}
    impl AdminTrait for TokenGenerator {}
    impl UpgradeableTrait for TokenGenerator {}

    impl TokenGenerator {
        #[ink(constructor)]
        pub fn new(psp22_hash: Hash, inw_contract: AccountId, creation_fee: Balance, owner_address: AccountId) -> Self {
            let mut instance = Self::default();
            instance._init_with_owner(owner_address);
            instance.initialize(
                psp22_hash,
                inw_contract,
                creation_fee
            )
            .ok()
            .unwrap();
            
            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, psp22_hash: Hash, inw_contract: AccountId, creation_fee: Balance
        ) -> Result<(), Error> {
            if self.manager.creation_fee > 0 {
                return Err(Error::AlreadyInit);
            }
            self.manager.standard_psp22_hash = psp22_hash;
            self.manager.creation_fee = creation_fee;
            self.manager.inw_contract = inw_contract;

            Ok(())
        }

        #[ink(message)]
        #[ink(payable)]
        pub fn new_token(
            &mut self,
            mint_to: AccountId,
            cap: Balance,
            name: String,
            symbol: String,
            decimal: u8
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            let fees = self.manager.creation_fee;
            let allowance = Psp22Ref::allowance(
                &self.manager.inw_contract,
                caller,
                self.env().account_id()
            );
            let balance = Psp22Ref::balance_of(
                &self.manager.inw_contract,
                caller
            );

            if allowance < fees || balance < fees {
                return Err(Error::InvalidBalanceAndAllowance)
            }

            let builder = Psp22Ref::transfer_from_builder(
                &self.manager.inw_contract,
                caller,
                self.env().account_id(),
                fees,
                Vec::<u8>::new(),
            ).call_flags(CallFlags::default().set_allow_reentry(true));
            let result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => {
                    Err(Error::CannotTransfer)
                }
            };
            
            if result.is_ok() {
                if Psp22Ref::burn(&self.manager.inw_contract, self.env().account_id(), fees).is_ok() {
                    //create contract
                    let contract = TokenStandardRef::new(caller, mint_to, cap, name, symbol, decimal)
                        .endowment(0)
                        .code_hash(self.manager.standard_psp22_hash)
                        .salt_bytes(self.manager.token_count.to_le_bytes())
                        .instantiate();  
                    let contract_address: AccountId = contract.to_account_id();
                    if let Some(token_count_tmp) = self.manager.token_count.checked_add(1) {
                        self.manager.token_count = token_count_tmp;
                        self.manager.token_list.insert(&self.manager.token_count, &contract_address);
                    } else {
                        return Err(Error::CheckedOperations)
                    }
                } else {
                    return Err(Error::CannotBurn)
                } 
            }
            Ok(())
        }
    }
}
