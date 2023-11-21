use ink::prelude::{vec::Vec};

use openbrush::{
    contracts::{
        traits::psp22::{
            extensions::{burnable::*, metadata::*},
            *,
        },
        access_control::*,
    },
    traits::{AccountId, Balance, Timestamp},
};

use crate::impls::azero_staking::data::{
    StakeInformation, 
    // OngoingExpiredWaitingList, 
    WithdrawalRequestInformation
};

use crate::traits::error::Error;

// ADMINER RoleType = 3739740293
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

// WITHDRAW_TO_STAKE RoleType = 3333445727
pub const WITHDRAWAL_MANAGER: RoleType = ink::selector_id!("WITHDRAWAL_MANAGER");

// UPDATING MANAGER RoleType = 3403046946
pub const UPDATING_MANAGER: RoleType = ink::selector_id!("UPDATING_MANAGER");

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
        _request_id: u128,
        _user: AccountId,        
        _amount: Balance,
        _azero_reward: Balance,
        _inw_reward: Balance, 
        _time: u64
    );

    fn _emit_claim_event(
        &self,
        _request_id: u128,
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
    fn withdrawal_request(&mut self, amount: Balance) -> Result<(), Error>;
       
    #[ink(message)]
    fn claim(&mut self, request_index: u128) -> Result<(), Error>;

    #[ink(message)]
    fn get_withdrawable_azero_to_stake_to_validator(&self, expiration_duration: u64) -> Result<Balance, Error>;

    #[ink(message)]
    fn get_azero_balance(&self) -> Balance;

    #[ink(message)]
    fn get_payable_azero(&self) -> Result<Balance, Error>;

    #[ink(message)]
    fn get_withdrawable_inw(&self) -> Result<Balance, Error>;

    #[ink(message)]
    fn withdraw_azero_to_stake(&mut self, expiration_duration: u64, receiver: AccountId) -> Result<(), Error>;

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
    fn get_stake_info(&mut self, staker: AccountId) -> Result<Option<StakeInformation>, Error>;

    #[ink(message)]
    fn get_staker_list(&self) -> Vec<AccountId>;

    #[ink(message)]
    fn get_total_stakers(&self) -> u128;
    
    #[ink(message)]
    fn get_withdrawal_request_count(&self) -> u128;

    #[ink(message)]
    fn get_withdrawal_request_list(&self) -> Vec<WithdrawalRequestInformation>;
    
    #[ink(message)]
    fn get_withdrawal_request(&self, index: u128) -> Option<WithdrawalRequestInformation>;
    
    #[ink(message)]
    fn get_withdrawal_request_count_by_user(&self, user: AccountId) -> u128;

    #[ink(message)]
    fn get_withdrawal_request_list_by_user(&self, user: AccountId) -> Vec<WithdrawalRequestInformation>;
    
    #[ink(message)]
    fn get_withdrawal_request_index_list_by_user(&self, user: AccountId) -> Vec<u128>;
    
    #[ink(message)]
    fn get_withdrawal_request_index_by_user(&self, user: AccountId, index: u128) -> Option<u128>;

    #[ink(message)]
    fn get_waiting_withdrawal_count(&self) -> u128;

    #[ink(message)]
    fn get_waiting_withdrawal_list(&self) -> Vec<u128>;

    #[ink(message)]
    fn get_waiting_withdrawal_index(&self, index: u128) -> Option<u128>;

    #[ink(message)]
    fn get_total_azero_staked(&self) -> Balance;

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

    #[ink(message)]
    fn get_is_withdrawable(&self) -> bool;

    #[ink(message)]
    fn get_is_locked(&self) -> bool;

    #[ink(message)]
    fn get_block_timestamp(&self) -> Timestamp;

    // Setters
    #[ink(message)]
    fn set_min_staking_amount(&mut self, min_staking_amount: Balance) -> Result<(), Error>;   

    #[ink(message)]
    fn set_max_total_staking_amount(&mut self, max_total_staking_amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_is_locked(&mut self, is_locked: bool) -> Result<(), Error>;

    #[ink(message)]
    fn update_unclaimed_rewards_when_locked(&mut self, staker: AccountId, current_time: u64) -> Result<(), Error>; 

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

    #[ink(message)]
    fn set_total_azero_reserved_for_withdrawals(&mut self, total_azero_reserved_for_withdrawals: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_total_inw_reserved_for_withdrawals(&mut self, total_inw_reserved_for_withdrawals: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_withdrawal_request_info_status(&mut self, request_index: u128, status: u8) -> Result<(), Error>;
    
    #[ink(message)]
    fn remove_request_index_in_withdrawal_waiting_list(&mut self, request_index: u128) -> Result<(), Error>;

    #[ink(message)]
    fn set_is_withdrawable(&mut self, is_withdrawable: bool) -> Result<(), Error>;
}