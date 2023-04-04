use ink::prelude::{
    vec::Vec,
    string::{
        String,
    },
};
use openbrush::{
    contracts::psp22::extensions::{
        metadata::*,
        mintable::*
    },
    traits::{
        AccountId,
        Balance
    }
};

#[openbrush::wrapper]
pub type Psp22Ref = dyn Psp22Traits + PSP22 + PSP22Metadata + PSP22Mintable;

#[openbrush::trait_definition]
pub trait Psp22Traits {
    #[ink(message)]
    fn get_owner(&self) -> AccountId;
}
