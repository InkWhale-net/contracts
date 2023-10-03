use openbrush::{
    contracts::{
        traits::psp22::{
            extensions::{burnable::*, metadata::*},
            *,
        },
        access_control::*,
    },
    traits::{AccountId, Balance},
};

use ink::prelude::{vec::Vec};

use crate::impls::azero_staking::data::{
    StakeInformation, 
};

use crate::traits::error::Error;

// ADMINER RoleType = 3739740293
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

// WITHDRAW_TO_STAKE RoleType = 
pub const WITHDRAWAL_MANAGER: RoleType = ink::selector_id!("WITHDRAWAL_MANAGER");

// Withdrawal request status
pub const WITHDRAWAL_REQUEST_WAITING: u8 = 0;
pub const WITHDRAWAL_REQUEST_CLAIMABLE: u8 = 1;
pub const WITHDRAWAL_REQUEST_CLAIMED: u8 = 2;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Metadata;

#[openbrush::wrapper]
pub type AzeroStakingRef = dyn AzeroStakingTrait;

#[openbrush::trait_definition]
pub trait AzeroStakingTrait {   
    // Emit funcs
    fn _emit_stake_event(
        &self,
        _staker: AccountId,
        _amount: Balance,
        _time: u64
    );

    fn _emit_withrawal_request_event(
        &self,
        _request_id: u64,
        _user: AccountId,        
        _amount: Balance,
        _azero_reward: Balance,
        _inw_reward: Balance, 
        _time: u64
    );

    fn _emit_claim_event(
        &self,
        _request_id: u64,
        _user: AccountId,  
        _azero_amount: Balance,
        _inw_amount: Balance,
        _time: u64  
    );

    fn _emit_withdraw_azero_to_stake_event(
        &self,
        _caller: AccountId, 
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    );

    fn _emit_withdraw_azero_event(
        &self,
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    );

    fn _emit_withdraw_inw_event(
        &self,
        _receiver: AccountId,
        _amount: Balance,
        _time: u64 
    );
    
    // Main funcs
    #[ink(message, payable)]
    fn stake(&mut self, amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn update_unclaimed_rewards(&mut self, staker: AccountId, current_time: u64) -> Result<(), Error>;
    
    #[ink(message)]
    fn withdraw_request(&mut self, amount: Balance) -> Result<(), Error>;
    
    #[ink(message)]
    fn get_waiting_list_within_expiration_duration(&mut self, expiration_duration: u64) -> Result<Vec<u64>, Error>;
    
    #[ink(message)]
    fn select_requests_to_pay(&mut self, expiration_duration: u64) -> Result<(), Error>;
    
    #[ink(message)]
    fn claim(&mut self, request_index: u64) -> Result<(), Error>;

    #[ink(message)]
    fn get_withdrawable_azero_to_stake_to_validator(&self) -> Result<Balance, Error>;

    #[ink(message)]
    fn get_withdrawable_inw(&self) -> Result<Balance, Error>;

    #[ink(message)]
    fn get_role_withdrawal_manager(&self) -> RoleType;

    #[ink(message)]
    fn withdraw_azero_to_stake(&mut self, receiver: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn withdraw_azero(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error>;

    #[ink(message)] 
    fn withdraw_inw(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error>;

    // Getters
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
    fn get_withdrawal_request_count(&self) -> u64;

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

    // Setters
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