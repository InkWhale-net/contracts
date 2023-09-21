pub use crate::{
    impls::azero_staking::{data, data::Data, data::*},
    traits::{error::Error, azero_staking::*},
};

use ink::prelude::{string::String, vec::Vec};

use ink::env::CallFlags;
use openbrush::{
    contracts::{access_control::*, ownable::*},
    modifiers,
    traits::{AccountId, Balance, Storage},
};

pub trait AzeroStakingTrait: 
    access_control::Internal
    + access_control::MembersManager
    + Storage<access_control::Data>
    + Storage<Data>
    + Storage<ownable::Data>
{
    // Main funcs
    fn stake(&mut self, amount: Balance) -> Result<(), Error>  {
        if amount < self.data::<Data>().min_staking_amount {
            return Err(Error::BelowMinStakingMount);
        }

        if amount > Self::env().transferred_value() {
            return Err(Error::InvalidTransferAmount)
        }

        let staker = Self::env().caller();
        let current_time = Self::env().block_timestamp();

        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {    
            stake_info.staking_amount = stake_info.staking_amount.checked_add(amount).ok_or(Error::CheckedOperations)?;
            
            if stake_info.staking_amount > self.data::<Data>().max_total_staking_amount {
                return Err(Error::ExceedMaxTotalStakingMount);
            }
            
            stake_info.last_updated = current_time;
            self.data::<Data>().stake_info_by_staker
                .insert(&staker, &stake_info);
        } else { // First time staking
            if amount > self.data::<Data>().max_total_staking_amount {
                return Err(Error::ExceedMaxTotalStakingMount);
            }

            let stake_info = StakeInformation{
                staking_amount: amount,
                unclaimed_azero_reward: 0,				
                claimed_azero_reward: 0,
                unclaimed_inw_reward: 0,	
                claimed_inw_reward: 0,						
                last_updated: current_time
            };

            self.data::<Data>().stake_info_by_staker
                .insert(&staker, &stake_info);
        }

        Ok(())
    }

    // Getters
    fn get_min_staking_amount(&self) -> Balance {
        self.data::<Data>().min_staking_amount
    }

    fn get_max_total_staking_amount(&self) -> Balance {
        self.data::<Data>().max_total_staking_amount
    }

    fn get_apy(&self) -> Balance {
        self.data::<Data>().apy
    }

    fn get_max_waiting_time(&self) -> u64 {
        self.data::<Data>().max_waiting_time
    }

    fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    fn get_inw_multiplier(&self) -> Balance {
        self.data::<Data>().inw_multiplier
    }

    fn get_unstaking_fee(&self) -> Balance {
        self.data::<Data>().unstaking_fee
    }

    fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation> {
        self.data::<Data>().stake_info_by_staker.get(&staker)
    }

    fn get_total_azero_claimed(&self) -> Balance {
        self.data::<Data>().total_azero_claimed
    }

    fn get_total_inw_claimed(&self) -> Balance {
        self.data::<Data>().total_inw_claimed
    }

    fn get_total_azero_for_waiting_withdrawals(&self) -> Balance {
        self.data::<Data>().total_azero_for_waiting_withdrawals
    }

    fn get_total_inw_for_waiting_withdrawals(&self) -> Balance {
        self.data::<Data>().total_inw_for_waiting_withdrawals
    }

    fn get_total_azero_reserved_for_withdrawals(&self) -> Balance {
        self.data::<Data>().total_azero_reserved_for_withdrawals
    }

    fn get_total_inw_reserved_for_withdrawals(&self) -> Balance {
        self.data::<Data>().total_inw_reserved_for_withdrawals
    }

    /// Setters
    #[modifiers(only_role(ADMINER))]
    fn set_min_staking_amount(&mut self, min_staking_amount: Balance) -> Result<(), Error> {
        if min_staking_amount == 0 {
            return Err(Error::InvalidMinStakingAmount);
        }

        self.data::<Data>().min_staking_amount = min_staking_amount;
        Ok(())
    }   

    #[modifiers(only_role(ADMINER))]
    fn set_max_total_staking_amount(&mut self, max_total_staking_amount: Balance) -> Result<(), Error> {
        if max_total_staking_amount < self.data::<Data>().min_staking_amount {
            return Err(Error::InvalidMaxStakingAmount);
        }

        self.data::<Data>().max_total_staking_amount = max_total_staking_amount;
        Ok(())
    }   

    #[modifiers(only_role(ADMINER))]
    fn set_apy(&mut self, apy: Balance) -> Result<(), Error> {
        if apy == 0 {
            return Err(Error::InvalidApy);
        }

        self.data::<Data>().apy = apy;
        Ok(())
    }   

    #[modifiers(only_role(ADMINER))]
    fn set_max_waiting_time(&mut self, max_waiting_time: u64) -> Result<(), Error> {
        if max_waiting_time == 0 {
            return Err(Error::InvalidMaxWaitingTime);
        }

        self.data::<Data>().max_waiting_time = max_waiting_time;
        Ok(())
    }   

    #[modifiers(only_role(ADMINER))]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }   

    #[modifiers(only_role(ADMINER))]
    fn set_inw_multiplier(&mut self, inw_multiplier: Balance) -> Result<(), Error> {
        if inw_multiplier == 0 {
            return Err(Error::InvalidMultiplier);
        }

        self.data::<Data>().inw_multiplier = inw_multiplier;
        Ok(())
    }   

    #[modifiers(only_role(ADMINER))]
    fn set_unstaking_fee(&mut self, unstaking_fee: Balance) -> Result<(), Error> {
        if unstaking_fee == 0 {
            return Err(Error::InvalidUnstakingFee);
        }

        self.data::<Data>().unstaking_fee = unstaking_fee;
        Ok(())
    }  
}