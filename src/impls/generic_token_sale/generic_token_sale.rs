pub use crate::{
    impls::generic_token_sale::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        generic_token_sale::*,
        error::Error
    }
};

use ink::prelude::{
    vec::Vec,
};
use ink::env::CallFlags;
use openbrush::{
    modifiers,
    contracts::ownable::*,
    traits::{
        Storage,
        Balance,
        AccountId
    }
};

impl<T> GenericTokenSaleTrait for T 
where 
    T:  Storage<Data> + 
        Storage<ownable::Data>
{
    default fn start_time(&self) -> u64 {
        self.data::<Data>().start_time
    }
    
    default fn end_time(&self) -> u64 {
        self.data::<Data>().end_time
    }

    default fn total_amount(&self) -> Balance {
        self.data::<Data>().total_amount
    }

    default fn inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    default fn inw_price(&self) -> Balance {
        self.data::<Data>().inw_price
    }

    default fn rate_at_tge(&self) -> u32 {
        self.data::<Data>().rate_at_tge
    }

    default fn total_purchased_amount(&self) -> Balance {
        self.data::<Data>().total_purchased_amount
    }

    default fn total_claimed_amount(&self) -> Balance {
        self.data::<Data>().total_claimed_amount
    }

    default fn get_buyer_info(&self, buyer: AccountId) -> Option<BuyerInformation> {
        self.data::<Data>().buyers.get(&buyer)
    }

    default fn purchase(&self, amount: Balance) -> Result<(), Error> {
        Ok(())
    }
}