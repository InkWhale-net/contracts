use openbrush::{
    contracts::access_control::*,
    traits::{AccountId, Balance},
};

use crate::impls::azero_staking::data::{
    StakeInformation, 
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

    #[ink(message)]
    fn get_max_total_staking_amount(&self) -> Balance;

    #[ink(message)]
    fn get_apy(&self) -> Balance;

    #[ink(message)]
    fn get_max_waiting_time(&self) -> u64;

    #[ink(message)]
    fn get_inw_contract(&self) -> AccountId;

    #[ink(message)]
    fn get_inw_multiplier(&self) -> Balance;

    #[ink(message)]
    fn get_unstaking_fee(&self) -> Balance;

    #[ink(message)]
    fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation>;

    #[ink(message)]
    fn get_total_azero_claimed(&self) -> Balance;

    #[ink(message)]
    fn get_total_inw_claimed(&self) -> Balance;

    #[ink(message)]
    fn get_total_azero_for_waiting_withdrawals(&self) -> Balance;

    #[ink(message)]
    fn get_total_inw_for_waiting_withdrawals(&self) -> Balance;

    #[ink(message)]
    fn get_total_azero_reserved_for_withdrawals(&self) -> Balance;
    
    #[ink(message)]
    fn get_total_inw_reserved_for_withdrawals(&self) -> Balance;

    /// Setters
    #[ink(message)]
    fn set_min_staking_amount(&mut self, min_staking_amount: Balance) -> Result<(), Error>;   

    #[ink(message)]
    fn set_max_total_staking_amount(&mut self, max_total_staking_amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_apy(&mut self, apy: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_max_waiting_time(&mut self, max_waiting_time: u64) -> Result<(), Error>;

    #[ink(message)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_inw_multiplier(&mut self, inw_multiplier: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_unstaking_fee(&mut self, unstaking_fee: Balance) -> Result<(), Error>;   
}