pub use crate::{
    impls::psp22_standard::{
        data,
        data::*,
        psp22_standard,
        *,
    },
    traits::psp22_standard::*,
};
use openbrush::{
    modifiers,
    modifier_definition,
    contracts::ownable::*,
    contracts::psp22::extensions::{
        metadata::*,
    },
    traits::{
        AccountId,
        Storage,
        Balance
    },
};
use ink::prelude::{
    string::{
        String,
        ToString,
    },
    vec::Vec,
};
impl<T: Storage<Manager> + Storage<psp22::Data>> Psp22Traits for T
where
    T: PSP22 + psp22::Internal +
    Storage<psp22::extensions::metadata::Data> +
    Storage<openbrush::contracts::ownable::Data>
{
    /// Get owner address
    default fn get_owner(&self) -> AccountId {
        self.owner()
    }

    default fn get_cap(&self) -> Balance {
        self.data::<Manager>().cap
    }

    #[modifiers(only_owner)]
    default fn mint(&mut self, mint_to: AccountId, amount: Balance) -> Result<(), PSP22Error>{
        assert!(self.data::<psp22::Data>().total_supply().checked_add(amount).unwrap() <= self.data::<Manager>().cap, "minting cap reached");
        self._mint_to(mint_to, amount)
    }
}
