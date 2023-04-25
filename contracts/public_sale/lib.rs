#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]

pub use self::public_sale::{
    PublicSale,
    PublicSaleRef,
};

#[openbrush::contract]
pub mod public_sale {
    use openbrush::{
        contracts::{
            ownable::*,
        },
        traits::{
            Storage,
        },
        modifiers
    };

    use inkwhale_project::impls::{
        generic_token_sale::*,
        admin::*,
        upgradeable::*
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct PublicSale {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: generic_token_sale::data::Data,
        #[storage_field]
        admin_data: admin::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    impl Ownable for PublicSale {}
    impl GenericTokenSaleTrait for PublicSale {}
    impl AdminTrait for PublicSale {}
    impl UpgradeableTrait for PublicSale {}

    impl PublicSale {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, start_time: u64, end_time: u64, total_amount: Balance, inw_contract: AccountId, inw_price: Balance) -> Result<Self, Error> {
            let mut instance = Self::default();

            instance._init_with_owner(contract_owner);
            match instance.initialize(
                start_time,
                end_time,
                total_amount,
                inw_contract,
                inw_price
            ) {
                Ok(()) => Ok(instance),
                Err(e) => Err(e),
            }
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, start_time: u64, end_time: u64, total_amount: Balance, inw_contract: AccountId, inw_price: Balance
        ) -> Result<(), Error> {
            self.data.start_time = start_time;
            
            if end_time <= start_time {
                return Err(Error::InvalidTime);
            }
            self.data.end_time = end_time;

            self.data.total_amount = total_amount;
            self.data.inw_contract = inw_contract;
            self.data.inw_price = inw_price;
            self.data.immediate_buying_rate = 0;
            self.data.vesting_duration = 0;
            self.data.end_vesting_time = end_time;           
            self.data.vesting_days = 0;            
            self.data.total_purchased_amount = 0;
            self.data.total_claimed_amount = 0;
            self.data.is_burned = false;
            
            Ok(())
        }
    }
}    