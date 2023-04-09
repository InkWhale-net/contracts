#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    traits::{
        Balance,
        AccountId,
        Hash,
    },
    contracts::{
        traits::psp22::{
            *,
        },
    },
};

use crate::traits::error::Error;
use crate::impls::token_manager::data::Token;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22;

#[openbrush::wrapper]
pub type TokenManagerRef = dyn TokenManagerTrait;

#[openbrush::trait_definition]
pub trait TokenManagerTrait {    
    #[ink(message)]
    fn get_token_info(&self, index: u64) -> Option<Token>;

    #[ink(message)]
    fn get_token_count(&self) -> u64;

    #[ink(message)]
    fn get_creation_fee(&self) -> Balance;

    #[ink(message)]
    fn get_contract_hash(&self) -> Hash;

    #[ink(message)]
    fn get_wal_contract(&self) -> AccountId;

    #[ink(message)]    
    fn set_contract_hash(&mut self, psp22_hash: Hash) -> Result<(), Error>;

    #[ink(message)]    
    fn set_wal_contract(&mut self, wal_contract: AccountId) -> Result<(), Error>;

    #[ink(message)] 
    fn withdraw_wal(&mut self, value: Balance) -> Result<(), Error>;
}
