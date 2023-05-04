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

    use ink::{
        codegen::{Env, EmitEvent},
        reflect::ContractEventBase
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

    #[ink(event)]
    pub struct PublicPurchaseEvent {
        buyer: AccountId, 
        amount: Balance
    }

    #[ink(event)]
    pub struct PublicClaimEvent {
        buyer: AccountId, 
        amount: Balance
    }

    pub type Event = <PublicSale as ContractEventBase>::Type;

    impl Ownable for PublicSale {}
    
    impl GenericTokenSaleTrait for PublicSale {
        fn _emit_purchase_event(&self, _buyer: AccountId, _amount: Balance) {
            PublicSale::emit_event(
                self.env(),
                Event::PublicPurchaseEvent(PublicPurchaseEvent {
                    buyer: _buyer,
                    amount: _amount
                })
            );
        }

        fn _emit_claim_event(&self, _buyer: AccountId, _amount: Balance) {
            PublicSale::emit_event(
                self.env(),
                Event::PublicClaimEvent(PublicClaimEvent {
                    buyer: _buyer,
                    amount: _amount
                })
            );
        }
    }

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
            self.data.immediate_buying_rate = 10000;
            self.data.vesting_duration = 0;
            self.data.end_vesting_time = end_time;           
            self.data.vesting_days = 0;            
            self.data.total_purchased_amount = 0;
            self.data.total_claimed_amount = 0;
            self.data.is_burned = false;
            
            Ok(())
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}    