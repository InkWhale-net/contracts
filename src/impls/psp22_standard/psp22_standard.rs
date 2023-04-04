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
    },
};
use ink::prelude::{
    string::{
        String,
        ToString,
    },
    vec::Vec,
};
impl<T: Storage<Manager>> Psp22Traits for T
where
    T: PSP22 + psp22::Internal +
    Storage<psp22::extensions::metadata::Data> +
    Storage<openbrush::contracts::ownable::Data>
{
    /// Get owner address
    default fn get_owner(&self) -> AccountId {
        self.owner()
    }
}
