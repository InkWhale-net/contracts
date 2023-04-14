#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    traits::{
        Balance,
        AccountId,
        Hash,
    },
    contracts::{
        traits::psp22::{
            extensions::{
                metadata::*,
                mintable::*,
                burnable::*,
            },
            *,
        },
    },
};

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Mintable + PSP22Burnable + PSP22Metadata;

#[openbrush::wrapper]
pub type TokenManagerRef = dyn TokenManagerTrait;

#[openbrush::trait_definition]
pub trait TokenManagerTrait {    
    #[ink(message)]
    fn get_token_contract_address(&self, index: u64) -> Option<AccountId>;

    #[ink(message)]
    fn get_token_count(&self) -> u64;

    #[ink(message)]
    fn get_creation_fee(&self) -> Balance;

    #[ink(message)]
    fn get_contract_hash(&self) -> Hash;

    #[ink(message)]
    fn get_inw_contract(&self) -> AccountId;

    #[ink(message)]    
    fn set_contract_hash(&mut self, psp22_hash: Hash) -> Result<(), Error>;

    #[ink(message)]    
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>;

    #[ink(message)] 
    fn withdraw_inw(&mut self, value: Balance) -> Result<(), Error>;
}
