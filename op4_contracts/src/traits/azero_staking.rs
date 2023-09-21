use openbrush::{
    contracts::access_control::*,
    traits::{Balance},
};

use crate::traits::error::Error;

// ADMINER RoleType = 3739740293
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

// Withdrawal request status
pub const WITHDRAWAL_REQUEST_WAITING: u8 = 0;
pub const WITHDRAWAL_REQUEST_CLAIMABLE: u8 = 1;
pub const WITHDRAWAL_REQUEST_CLAIMED: u8 = 2;

#[openbrush::wrapper]
pub type AzeroStakingRef = dyn AzeroStakingTrait;

#[openbrush::trait_definition]
pub trait AzeroStakingTrait {
    /// Getters
    #[ink(message)]
    fn get_min_staking_amount(&self) -> Balance;

    /// Setters
    #[ink(message)]
    fn set_min_staking_amount(&mut self, min_staking_amount: Balance) -> Result<(), Error>;   
}