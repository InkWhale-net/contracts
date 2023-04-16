pub use crate::{
    impls::token_sale::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        token_sale::*,
        error::Error
    }
};

use ink::prelude::{
    vec::Vec,
};

use openbrush::{
    modifiers,
    contracts::ownable::*,
    traits::{
        Storage,
        Balance,
        AccountId,
        Hash,
    }
};
use ink::env::CallFlags;

impl<T> TokenSaleTrait for T 
where 
    T:  Storage<Data> + 
        Storage<ownable::Data>
{
    default fn get_inw_price(&self) -> Balance {
        self.data::<Data>().inw_price
    }

    default fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    #[modifiers(only_owner)]
    default fn set_inw_price(&mut self, inw_price: Balance) -> Result<(), Error> {
        self.data::<Data>().inw_price = inw_price;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }
}
