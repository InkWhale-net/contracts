#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    contracts::traits::psp22::{extensions::burnable::*, extensions::metadata::*, *},
    traits::{AccountId, Balance, Hash},
};

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Metadata;

#[openbrush::wrapper]
pub type GenericPoolGeneratorRef = dyn GenericPoolGeneratorTrait;

#[openbrush::trait_definition]
pub trait GenericPoolGeneratorTrait {
    // Getters

    #[ink(message)]
    fn get_pool_hash(&self) -> Hash;

    #[ink(message)]
    fn get_pool_count(&self) -> u64;

    #[ink(message)]
    fn get_inw_contract(&self) -> AccountId;

    #[ink(message)]
    fn get_creation_fee(&self) -> Balance;

    #[ink(message)]
    fn get_unstake_fee(&self) -> Balance;

    #[ink(message)]
    fn get_pool(&self, index: u64) -> Option<AccountId>;

    #[ink(message)]
    fn get_pool_by_owner(&self, contract_owner: AccountId, index: u64) -> Option<u64>;

    #[ink(message)]
    fn get_pool_count_by_owner(&self, contract_owner: AccountId) -> u64;

    // Setters

    #[ink(message)]
    fn set_pool_hash(&mut self, pool_hash: Hash) -> Result<(), Error>;

    #[ink(message)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_unstake_fee(&mut self, unstake_fee: Balance) -> Result<(), Error>;
}