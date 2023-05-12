#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    traits::{
        Balance,
        AccountId
    },
    contracts::{
        traits::psp22::{
            extensions::burnable::*,
            *,
        },
    },
};

use ink::prelude::{
    string::String,
};

use crate::impls::launchpad_contract::data::PhaseInfo;
use crate::traits::error::Error;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable;

#[openbrush::wrapper]
pub type LaunchpadContractRef = dyn LaunchpadContractTrait;

#[openbrush::trait_definition]
pub trait LaunchpadContractTrait {
    // Getters
    #[ink(message)]
    fn get_project_info_uri(&self) -> String;
    
    #[ink(message)]
    fn get_token_address(&self) -> AccountId;

    #[ink(message)]
    fn get_inw_contract(&self) -> AccountId;

    #[ink(message)]
    fn get_total_phase(&self) -> u8;

    #[ink(message)]
    fn get_phase(&self, id: u8) -> Option<PhaseInfo>;

    // Setters
    #[ink(message)]
    fn set_project_info_uri(&mut self, project_info_uri: String) -> Result<(), Error>;
    
    #[ink(message)]
    fn set_token_address(&mut self, token_address: AccountId) -> Result<(), Error>;
    
    #[ink(message)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>;   

    #[ink(message)]
    fn topup(&mut self, amount: Balance) -> Result<(), Error>;
}