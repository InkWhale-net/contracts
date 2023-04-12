#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]

#[openbrush::contract]
pub mod token_sale {
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

    use inkwhale_project::traits::token_manager::Psp22Ref;
    use inkwhale_project::impls::{
        token_sale::*,
        admin::*,
        upgradeable::*
    };
    use inkwhale_project::{
        traits::{
            admin::*,
            upgradeable::*
        }
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct TokenSale {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        admin_data: inkwhale_project::impls::admin::data::Data,
        #[storage_field]
        upgradeable_data: inkwhale_project::impls::upgradeable::data::Data,
        #[storage_field]
        manager: token_sale::data::Data,
    }   

    impl Ownable for TokenSale {}
    impl AdminTrait for TokenSale {}
    impl UpgradeableTrait for TokenSale {}

    impl TokenSale {
        #[ink(constructor)]
        pub fn new(inw_contract: AccountId, inw_price: Balance, owner_address: AccountId) -> Self {
            let mut instance = Self::default();
            instance._init_with_owner(owner_address);
            instance.initialize(
                inw_contract,
                inw_price
            )
            .ok()
            .unwrap();
            
            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, inw_contract: AccountId, inw_price: Balance) -> Result<(), Error> {
            if self.manager.inw_price > 0 {
                return Err(Error::AlreadyInit);
            }
            self.manager.inw_contract = inw_contract;
            self.manager.inw_price = inw_price;

            Ok(())
        }

        #[ink(message)]
        #[ink(payable)]
        pub fn buy_inkwhale(
            &mut self,
            amount: Balance
        ) -> Result<(), Error> {
            let caller = Self::env().caller();
            let balance = Psp22Ref::balance_of(
                &self.manager.inw_contract,
                caller
            );
            if amount > balance {
                return Err(Error::InvalidBuyAmount)
            }
            let total_fee = (self.manager.inw_price)
                .checked_mul(amount).unwrap()
                .checked_div(1000000000000)
                .unwrap();
            if total_fee != Self::env().transferred_value() {
                return Err(Error::InvalidTransferAmount)
            }

            let builder = Psp22Ref::transfer_from_builder(
                &self.manager.inw_contract,
                self.env().account_id(),
                caller,
                amount,
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
            Ok(())
        }
    }
}
