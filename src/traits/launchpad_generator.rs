#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    contracts::traits::psp22::{extensions::burnable::*, *},
    traits::{AccountId, Balance, Hash},
};

use ink::prelude::vec::Vec;

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable;

#[openbrush::wrapper]
pub type LaunchpadGeneratorRef = dyn LaunchpadGeneratorTrait;

#[openbrush::trait_definition]
pub trait LaunchpadGeneratorTrait {
    // Getters

    #[ink(message)]
    fn get_launchpad_hash(&self) -> Hash;

    #[ink(message)]
    fn get_inw_contract(&self) -> AccountId;

    #[ink(message)]
    fn get_creation_fee(&self) -> Balance;

    #[ink(message)]
    fn get_tx_rate(&self) -> u32;

    #[ink(message)]
    fn get_launchpad_count(&self) -> u64;

    #[ink(message)]
    fn get_launchpad_by_id(&self, id: u64) -> Option<AccountId>;

    #[ink(message)]
    fn get_launchpad_by_owner(&self, owner_address: AccountId) -> Vec<AccountId>;

    #[ink(message)]
    fn get_active_launchpad_count(&self) -> u64;

    #[ink(message)]
    fn get_is_active_launchpad(&self, address: AccountId) -> Option<bool>;

    // Setters

    #[ink(message)]
    fn set_launchpad_hash(&mut self, launchpad_hash: Hash) -> Result<(), Error>;

    #[ink(message)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_tx_rate(&mut self, tx_rate: u32) -> Result<(), Error>;

    #[ink(message)]
    fn set_is_active_launchpad(&mut self, address: AccountId, is_active: bool)
        -> Result<(), Error>;
}
