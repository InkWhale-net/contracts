#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    contracts::{
        traits::psp22::{
            *
        },
        access_control::*,
    },
    traits::{AccountId, Balance},
};

use crate::traits::error::Error;

// ADMINER RoleType = 3739740293
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22;

#[openbrush::wrapper]
pub type InterestDistributionRef = dyn InterestDistributionTrait;

#[openbrush::trait_definition]
pub trait InterestDistributionTrait {
    // Event func 
    // fn _emit_swap_event(&self, _user: AccountId, _amount: Balance);

    // Funcs
    #[ink(message)]
    fn distribute_azero(&mut self) -> Result<(), Error>;
    
    // Getters
    #[ink(message)]
    fn get_azero_staking_contract(&self) -> AccountId;

    #[ink(message)]
    fn get_master_account(&self) -> AccountId;

    #[ink(message)]
    fn get_total_rate(&self) -> u64;

    #[ink(message)]
    fn get_interest_account_rate(&self) -> u64;

    #[ink(message)]
    fn get_azero_balance(&self) -> Balance;

    // Setters
    #[ink(message)]
    fn set_azero_staking_contract(&mut self, azero_staking_contract: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_master_account(&mut self, master_account: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_total_rate(&mut self, total_rate: u64) -> Result<(), Error>;

    #[ink(message)]
    fn set_interest_account_rate(&mut self, interest_account_rate: u64) -> Result<(), Error>;
}