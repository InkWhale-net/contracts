use ink::prelude::{
    vec::Vec,
    string::{
        String,
    },
};
use openbrush::{
    contracts::psp22::extensions::{
        metadata::*
    },
    traits::{
        AccountId
    }
};

#[openbrush::wrapper]
pub type Psp22Ref = dyn Psp22Traits + PSP22 + PSP22Metadata;

#[openbrush::trait_definition]
pub trait Psp22Traits {
    #[ink(message)]
    fn get_last_token_id(&self) -> u64;
}
