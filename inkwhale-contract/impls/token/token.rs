pub use crate::{
    impls::token::{
        data,
        data::*,
    },
    traits::{
        token::*,
        error::Error
    }
};

use openbrush::{
    contracts::{
        psp22,
        traits::{
            psp22::PSP22Error
        }
    },
    traits::{
        Storage,
        Balance,
        String
    }
};

impl<T> TokenTrait for T 
where 
    T: psp22::Internal +
       Storage<Data>
{
    default fn burn(&mut self, amount: Balance) -> Result<(), PSP22Error> {
        let caller = Self::env().caller();
        self._burn_from(caller, amount)
    }

    default fn token_name(&self) -> String {
        self.data::<data::Data>()
            .name.clone()
    }

    default fn token_symbol(&self) -> String {
        self.data::<Data>()
            .symbol.clone()
    }

    default fn token_decimals(&self) -> u8 {
        self.data::<Data>()
            .decimals.clone()
    }
}