#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]

pub use self::private_sale::{
    PrivateSale,
    PrivateSaleRef,
};

#[openbrush::contract]
pub mod private_sale {
    use ink::prelude::{
        vec::Vec,
    };
    use ink::env::CallFlags;

    use openbrush::{
        contracts::{
            ownable::*,
        },
        traits::{
            Storage,
        },
        modifiers
    };

    use inkwhale_project::traits::generic_token_sale::Psp22Ref;
    use inkwhale_project::impls::{
        generic_token_sale::*,
        upgradeable::*
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct PrivateSale {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: generic_token_sale::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    impl Ownable for PrivateSale {}
    impl GenericTokenSaleTrait for PrivateSale {}
    impl UpgradeableTrait for PrivateSale {}

    impl PrivateSale {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, start_time: u64, end_time: u64, total_amount: Balance, inw_contract: AccountId, inw_price: Balance, rate_at_tge: u32) -> Self {
            let mut instance = Self::default();

            instance._init_with_owner(contract_owner);
            instance.initialize(
                start_time,
                end_time,
                total_amount,
                inw_contract,
                inw_price,
                rate_at_tge
            )
            .ok()
            .unwrap();

            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, start_time: u64, end_time: u64, total_amount: Balance, inw_contract: AccountId, inw_price: Balance, rate_at_tge: u32
        ) -> Result<(), Error> {
            self.data.start_time = start_time;
            self.data.end_time = end_time;
            self.data.total_amount = total_amount;
            self.data.inw_contract = inw_contract;
            self.data.inw_price = inw_price;
            self.data.rate_at_tge = rate_at_tge;

            Ok(())
        }
    }
}
    