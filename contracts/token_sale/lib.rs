#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]

#[openbrush::contract]
pub mod token_sale {
    use ink::prelude::{
        vec::Vec,
    };
    use ink::env::CallFlags;

    use openbrush::{
        contracts::{
            ownable::*,
        },
        modifiers,
        traits::{
            Storage
        },
    };

    use inkwhale_project::traits::token_manager::Psp22Ref;
    use inkwhale_project::impls::{
        token_sale::*,
        upgradeable::*
    };
    use inkwhale_project::{
        traits::{
            admin::*
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
    impl TokenSaleTrait for TokenSale {}

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
                self.env().account_id()
            );
            if amount > balance {
                return Err(Error::InvalidBuyAmount)
            }
            let decimal = Psp22Ref::token_decimals(&self.manager.inw_contract);
            let inw_amount = (self.manager.inw_price).checked_mul(amount).ok_or(Error::CheckedOperations)?;
            let total_fee = inw_amount.checked_div(10_u128.pow(decimal as u32)).ok_or(Error::CheckedOperations)?;
            if total_fee != self.env().transferred_value() {
                return Err(Error::InvalidTransferAmount)
            }

            let builder = Psp22Ref::transfer_builder(
                &self.manager.inw_contract,
                caller,
                amount,
                Vec::<u8>::new(),
            ).call_flags(CallFlags::default().set_allow_reentry(true));

            match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => {
                    Err(Error::CannotTransfer)
                }
            }            
        }
    }
}
