pub use crate::{
    impls::azero_staking::{data, data::Data, data::*},
    traits::{error::Error, error::LockError, azero_staking::*, interest_distribution::InterestDistributionRef},
};

use ink::prelude::{vec::Vec};
use openbrush::{
    contracts::{access_control::*, ownable::*},
    modifier_definition,
    modifiers,
    traits::{AccountId, Balance, Storage, Timestamp},
};

/// Throws if is_locked is false
#[modifier_definition]
pub fn only_locked<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Data>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<LockError>,
{
    if instance.data().is_locked == false {
        return Err(From::from(LockError::NotLocked))
    }
    body(instance)
}

/// Throws if is_locked is true
#[modifier_definition]
pub fn only_not_locked<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Data>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<LockError>,
{
    if instance.data().is_locked == true {
        return Err(From::from(LockError::Locked))
    }
    body(instance)
}

pub trait AzeroStakingTrait: 
    access_control::Internal
    + access_control::MembersManager
    + Storage<access_control::Data>
    + Storage<Data>
    + Storage<ownable::Data>
{
    // Emit funcs
    fn _emit_stake_event(
        &self,
        _staker: AccountId,
        _amount: Balance,
        _time: u64
    ) {
    }

    fn _emit_withrawal_request_event(
        &self,
        _request_id: u128,
        _user: AccountId,        
        _amount: Balance,
        _time: u64
    ) {
    }

    fn _emit_cancel_event(
        &self,
        _request_id: u128,
        _user: AccountId,        
        _amount: Balance,
        _time: u64
    ) {
    }

    fn _emit_claim_event(
        &self,
        _request_id: u128,
        _user: AccountId,  
        _azero_amount: Balance,
        _time: u64  
    ) {            
    }

    fn _emit_claim_rewards_event(
        &self,
        _user: AccountId,  
        _azero_amount: Balance,
        _inw_amount: Balance,
        _time: u64  
    ) { 
    }

    fn _emit_withdraw_azero_to_stake_event(
        &self, 
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    ) {        
    }

    fn _emit_withdraw_azero_from_stake_account_event(
        &self,
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    ) {        
    }

    fn _emit_withdraw_azero_from_interest_account_event(
        &self,
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    ) {        
    }

    fn _emit_withdraw_azero_not_in_accounts_event(
        &self,
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    ) {        
    }

    fn _emit_withdraw_azero_emergency_event(
        &self,
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    ) {        
    }

    fn _emit_withdraw_inw_from_interest_account_event(
        &self,
        _receiver: AccountId,
        _amount: Balance,
        _time: u64 
    ) {        
    }

    fn _emit_withdraw_inw_not_in_accounts_event(
        &self,
        _receiver: AccountId,
        _amount: Balance,
        _time: u64 
    ) {        
    }
    
    // Main funcs

    // Private func
    fn update_unclaimed_rewards(&mut self, staker: AccountId, current_time: u64) -> Result<(), Error> {
        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {                       
            let time_length = current_time.checked_sub(stake_info.last_updated).ok_or(Error::CheckedOperations)?; // ms
            
            let unclaimed_reward_365 = stake_info.staking_amount.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data::<Data>().apy).ok_or(Error::CheckedOperations)?;
            let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
            stake_info.unclaimed_azero_reward = stake_info.unclaimed_azero_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

            // Assuming azero and imw have the same decimal 12               
            let unclaimed_inw_reward_365 = stake_info.staking_amount.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data::<Data>().inw_multiplier).ok_or(Error::CheckedOperations)?;
            let unclaimed_inw_reward = unclaimed_inw_reward_365.checked_div(24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
            stake_info.unclaimed_inw_reward = stake_info.unclaimed_inw_reward.checked_add(unclaimed_inw_reward).ok_or(Error::CheckedOperations)?;
                         
            stake_info.last_updated = current_time;
            
            self.data::<Data>().stake_info_by_staker
                .insert(&staker, &stake_info);            
        } 

        Ok(())
    }

    // Private func
    fn update_last_unclaimed_rewards(&mut self, staker: AccountId) -> Result<(), Error> {
        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) { 
            stake_info.last_unclaimed_azero_reward = stake_info.unclaimed_azero_reward;
            stake_info.last_unclaimed_inw_reward = stake_info.unclaimed_inw_reward;
            stake_info.last_anchored = stake_info.last_updated;

            self.data::<Data>().stake_info_by_staker
                .insert(&staker, &stake_info);        
        }   

        Ok(())  
    }

    #[modifiers(only_not_locked)]
    fn stake(&mut self, amount: Balance) -> Result<(), Error>  {
        if amount < self.data::<Data>().min_staking_amount {
            return Err(Error::BelowMinStakingMount);
        }

        if amount > Self::env().transferred_value() {
            return Err(Error::InvalidTransferAmount)
        }

        let staker = Self::env().caller();
        let current_time = Self::env().block_timestamp();

        // Update the current unclaimed_amount
        if self.update_unclaimed_rewards(staker, current_time).is_err() {
            return Err(Error::CannotUpdateUnclaimedRewards);
        }

        if let Some(stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {               
            if stake_info.last_rewards_claimed < self.data::<Data>().last_azero_interest_topup {
                let result = self.common_claim_rewards(staker);
                
                if result.is_err() {
                    return result;
                }
            }
        }

        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {   
            if stake_info.staking_amount == 0 && !self.data::<Data>().staker_list.contains(&staker) {  
                self.data::<Data>().staker_list.push(staker);
            }

            // Calculate stake info
            stake_info.staking_amount = stake_info.staking_amount.checked_add(amount).ok_or(Error::CheckedOperations)?;
        
            if stake_info.staking_amount > self.data::<Data>().max_total_staking_amount {
                return Err(Error::ExceedMaxTotalStakingMount);
            }

            // Claim rewards before staking
            if stake_info.last_rewards_claimed < self.data::<Data>().last_azero_interest_topup {
                return Err(Error::RequestToClaimRewardsFirst);
            }
            
            stake_info.last_updated = current_time;
            self.data::<Data>().stake_info_by_staker
                .insert(&staker, &stake_info);

            if self.update_last_unclaimed_rewards(staker).is_err() {
                return Err(Error::CannotUpdateUnclaimedRewards);
            }         
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
                last_updated: current_time,

                last_unclaimed_azero_reward: 0,
                last_unclaimed_inw_reward: 0,
                last_anchored: current_time,

                last_rewards_claimed: 0
            };

            self.data::<Data>().stake_info_by_staker
                .insert(&staker, &stake_info);

            self.data::<Data>().staker_list.push(staker);
        }
        
        self.data::<Data>().total_azero_staked = self.data::<Data>().total_azero_staked
                                                    .checked_add(amount).ok_or(Error::CheckedOperations)?;

        self.data::<Data>().azero_stake_account = self.data::<Data>().azero_stake_account
                                                    .checked_add(amount).ok_or(Error::CheckedOperations)?;                                        
            
        self._emit_stake_event(
            staker,
            amount,
            current_time
        );

        Ok(())
    }    

    // Withdraw principal only, not rewards 
    #[modifiers(only_not_locked)]
    fn withdrawal_request(&mut self, amount: Balance) -> Result<(), Error> {
        let staker = Self::env().caller();

        // Update the current unclaimed_amount
        let current_time = Self::env().block_timestamp();
        if self.update_unclaimed_rewards(staker, current_time).is_err() {
            return Err(Error::CannotUpdateUnclaimedRewards);
        }        

        if let Some(stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {    
            if amount > stake_info.staking_amount {
                return Err(Error::InvalidUnstakedAmount);
            }

            if stake_info.last_rewards_claimed < self.data::<Data>().last_azero_interest_topup {
                let result = self.common_claim_rewards(staker);
                
                if result.is_err() {
                    return result;
                }
            }
        } else {
            return Err(Error::NoStakeInfoFound);
        }

        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {
            if stake_info.last_rewards_claimed < self.data::<Data>().last_azero_interest_topup {
                return Err(Error::RequestToClaimRewardsFirst);
            }

            // Add withdrawal request info
            let withdrawal_request_count = self.data::<Data>().withdrawal_request_count;
            let withdrawal_request_info = WithdrawalRequestInformation{
                request_index: withdrawal_request_count,
                user: staker,
                amount: amount,				
                request_time: current_time,						
                status: WITHDRAWAL_REQUEST_WAITING
            };

            self.data::<Data>().withdrawal_request_list.insert(&withdrawal_request_count, &withdrawal_request_info);
            self.data::<Data>().withdrawal_request_by_user.insert(staker, &withdrawal_request_count);
            self.data::<Data>().withdrawal_waiting_list.insert(1, &withdrawal_request_count);

            self.data::<Data>().withdrawal_request_count = self.data::<Data>().withdrawal_request_count.checked_add(1).ok_or(Error::CheckedOperations)?;

            // Update total for waiting withdrawals
            self.data::<Data>().total_azero_for_waiting_withdrawals = 
                self.data::<Data>().total_azero_for_waiting_withdrawals
                .checked_add(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
             
            // Update stake info - last_updated is updated in update_unclaimed_rewards
            stake_info.staking_amount = stake_info.staking_amount
                                        .checked_sub(amount).ok_or(Error::CheckedOperations)?;
   
            self.data::<Data>().stake_info_by_staker
                .insert(&staker, &stake_info);

            if self.update_last_unclaimed_rewards(staker).is_err() {
                return Err(Error::CannotUpdateUnclaimedRewards);
            }               

            self._emit_withrawal_request_event(
                withdrawal_request_count,
                withdrawal_request_info.user,
                withdrawal_request_info.amount,
                withdrawal_request_info.request_time
            );

            Ok(())
        } else {
            Err(Error::NoStakeInfoFound)
        }
    }

    // Cancel withrawal request
    fn cancel(&mut self, request_index: u128) -> Result<(), Error> {
        let caller = Self::env().caller();

        // Check if the request_index belongs to the caller 
        if self.data::<Data>().withdrawal_request_by_user.contains_value(caller, &request_index) {
            if let Some(mut withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&request_index) { 
                // Check if request is waiting or claimable 
                if withdrawal_request_info.status != WITHDRAWAL_REQUEST_WAITING && withdrawal_request_info.status != WITHDRAWAL_REQUEST_CLAIMABLE {
                    return Err(Error::WithdrawalRequestIsNotCancellable);    
                }

                // Check if it is not in selecting requests to pay period
                if !self.data::<Data>().is_selecting_requests_to_pay {
                    // Update the current unclaimed_amount
                    let current_time = Self::env().block_timestamp();
                    if self.update_unclaimed_rewards(caller, current_time).is_err() {
                        return Err(Error::CannotUpdateUnclaimedRewards);
                    }  
                    
                    // Claim reward before cancellation
                    if let Some(stake_info) = self.data::<Data>().stake_info_by_staker.get(&caller) {               
                        if stake_info.last_rewards_claimed < self.data::<Data>().last_azero_interest_topup {
                            let result = self.common_claim_rewards(caller);
                            
                            if result.is_err() {
                                return result;
                            }
                        }
                    } else {
                        return Err(Error::NoStakeInfoFound);
                    }
            
                    // Process cancellation
                    if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&caller) {
                        if stake_info.last_rewards_claimed < self.data::<Data>().last_azero_interest_topup {
                            return Err(Error::RequestToClaimRewardsFirst);
                        }

                        // 2 prioritized actions: save new status as cancelled and remove the request id if is in the waiting list 
                        // Save previous status and set new status as cancelled
                        let status = withdrawal_request_info.status;
                        withdrawal_request_info.status = WITHDRAWAL_REQUEST_CANCELLED;
                        self.data::<Data>().withdrawal_request_list.insert(&request_index, &withdrawal_request_info);

                        // Remove the request id if is in the waiting list 
                        if self.data::<Data>().withdrawal_waiting_list.contains_value(1, &request_index) {
                            self.data::<Data>().withdrawal_waiting_list.remove_value(1, &request_index);  
                        }

                        // Update total_azero_for_waiting_withdrawals
                        self.data::<Data>().total_azero_for_waiting_withdrawals = 
                            self.data::<Data>().total_azero_for_waiting_withdrawals
                            .checked_sub(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
                        
                        // Update stake amount
                        stake_info.staking_amount = stake_info.staking_amount
                                                    .checked_add(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;

                        self.data::<Data>().stake_info_by_staker
                            .insert(&caller, &stake_info);

                        if status == WITHDRAWAL_REQUEST_CLAIMABLE {
                            // No need to reserve, return back 
                            self.data::<Data>().total_azero_reserved_for_withdrawals = 
                                self.data::<Data>().total_azero_reserved_for_withdrawals
                                .checked_sub(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
                        }

                        // Add total request_cancelled
                        let mut total_count = 1;
                        if let Some(count) = self.data::<Data>().total_withdrawal_request_cancelled.get(&caller) {
                            total_count = count.checked_add(1).ok_or(Error::CheckedOperations)?;                            
                        }                      
                        self.data::<Data>().total_withdrawal_request_cancelled.insert(&caller, &total_count);

                        // Update last unclaimed rewards
                        if self.update_last_unclaimed_rewards(caller).is_err() {
                            return Err(Error::CannotUpdateUnclaimedRewards);
                        }               
            
                        // Emit event
                        self._emit_cancel_event(
                            request_index,
                            caller,
                            withdrawal_request_info.amount,
                            Self::env().block_timestamp() 
                        );
            
                        return Ok(());
                    } else {
                        return Err(Error::NoStakeInfoFound);
                    }                   
                } else {
                    return Err(Error::IsSelectingRequestsToPay); 
                }
            } else {
                return Err(Error::NoWithdrawalRequestInfo); 
            }  
        } else {
            return Err(Error::RequestNotForCaller); 
        }
    }

    // Claim principal only, not rewards
    fn claim(&mut self, request_index: u128) -> Result<(), Error> {
        let claimer = Self::env().caller();

        // Check if the request_index belongs to the caller 
        if self.data::<Data>().withdrawal_request_by_user.contains_value(claimer, &request_index) {
            if let Some(mut withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&request_index) {
                // Check if request is claimable 
                if withdrawal_request_info.status != WITHDRAWAL_REQUEST_CLAIMABLE {
                    return Err(Error::WithdrawalRequestIsNotClaimable);    
                }

                let fees = self.data::<Data>().unstaking_fee;

                let allowance = Psp22Ref::allowance(&self.data::<Data>().inw_contract, claimer, Self::env().account_id());
                let balance = Psp22Ref::balance_of(&self.data::<Data>().inw_contract, claimer);

                if allowance < fees || balance < fees {
                    return Err(Error::InvalidBalanceAndAllowance);
                }

                // Collect INW as transaction Fees 
                let builder = Psp22Ref::transfer_from_builder(
                    &self.data::<Data>().inw_contract,
                    claimer,
                    Self::env().account_id(),
                    fees,
                    Vec::<u8>::new(),
                );                

                let result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => {
                        Err(Error::CannotTransfer)
                    }
                };

                if result.is_err() {
                    return result;
                }              

                // Update azero stake account
                self.data::<Data>().azero_stake_account = 
                    self.data::<Data>().azero_stake_account
                    .checked_sub(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
           
                // Update total info
                self.data::<Data>().total_azero_staked = 
                    self.data::<Data>().total_azero_staked
                    .checked_sub(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
           
                self.data::<Data>().total_azero_for_waiting_withdrawals = 
                    self.data::<Data>().total_azero_for_waiting_withdrawals
                    .checked_sub(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
                          
                self.data::<Data>().total_azero_reserved_for_withdrawals = 
                    self.data::<Data>().total_azero_reserved_for_withdrawals
                    .checked_sub(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
                                            
                self.data::<Data>().total_azero_claimed = 
                    self.data::<Data>().total_azero_claimed
                    .checked_add(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
                     
                // Update withdrawal_request_info                  
                withdrawal_request_info.status = WITHDRAWAL_REQUEST_CLAIMED; 
                self.data::<Data>().withdrawal_request_list.insert(&request_index, &withdrawal_request_info);
                
                let mut claimed_count = 1;
                if let Some(count) = self.data::<Data>().total_withdrawal_request_claimed.get(&claimer) {
                    claimed_count = count.checked_add(1).ok_or(Error::CheckedOperations)?;                  
                } 
                self.data::<Data>().total_withdrawal_request_claimed.insert(&claimer, &claimed_count);
                
                let mut cancelled_count = 0;
                if let Some(count) = self.data::<Data>().total_withdrawal_request_cancelled.get(&claimer) {
                    cancelled_count = count;                  
                } 
                // Check if can remove claimer from staker list
                if let Some(stake_info) = self.data::<Data>().stake_info_by_staker.get(&claimer) {   
                    if stake_info.staking_amount == 0 {
                        if claimed_count.checked_add(cancelled_count).ok_or(Error::CheckedOperations)? == self.data::<Data>().withdrawal_request_by_user.count(claimer) {
                            if let Some(pos) = self.data::<Data>().staker_list.iter().position(|x| *x == claimer) {
                                self.data::<Data>().staker_list.remove(pos);
                            }                            
                        }                        
                    }
                }

                // Transfer unstaked azero
                if Self::env().transfer(claimer, withdrawal_request_info.amount).is_err() {
                    return Err(Error::WithdrawError);
                }
                
                // Burn fees
                if Psp22Ref::burn(&self.data::<Data>().inw_contract, Self::env().account_id(), fees).is_err() {
                    return Err(Error::CannotBurn);
                }               

                self._emit_claim_event(
                    request_index,
                    claimer,
                    withdrawal_request_info.amount,
                    Self::env().block_timestamp() 
                );

                return Ok(());
            } else {
                return Err(Error::NoWithdrawalRequestInfo); 
            }
        } else {
            return Err(Error::RequestNotForClaimer); 
        }
    }

    fn common_claim_rewards(&mut self, claimer: AccountId) -> Result<(), Error> {        
        let current_time = Self::env().block_timestamp();

        // Update the current unclaimed_amount
        if self.update_unclaimed_rewards(claimer, current_time).is_err() {
            return Err(Error::CannotUpdateUnclaimedRewards);
        }     

        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&claimer) {   
            // Wait until there is a new topups for azero interest 
            if stake_info.last_rewards_claimed >= self.data::<Data>().last_azero_interest_topup {
                return Err(Error::InvalidTimeToClaimRewards);
            }

            // Calculate unclaimed_azero_reward_at_last_topup and unclaimed_inw_reward_at_last_topup (at last topup time)
            // if (self.data::<Data>().last_azero_interest_topup > stake_info.last_anchored) {
            let time_length = self.data::<Data>().last_azero_interest_topup.checked_sub(stake_info.last_anchored).ok_or(Error::CheckedOperationsTimeLength)?; // ms
            
            let unclaimed_reward_365 = stake_info.staking_amount.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data::<Data>().apy).ok_or(Error::CheckedOperations)?;
            let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
            let unclaimed_azero_reward_at_last_topup = stake_info.last_unclaimed_azero_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

            // Assuming azero and imw have the same decimal 12               
            let unclaimed_inw_reward_365 = stake_info.staking_amount.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data::<Data>().inw_multiplier).ok_or(Error::CheckedOperations)?;
            let unclaimed_inw_reward = unclaimed_inw_reward_365.checked_div(24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
            let unclaimed_inw_reward_at_last_topup = stake_info.last_unclaimed_inw_reward.checked_add(unclaimed_inw_reward).ok_or(Error::CheckedOperations)?;
                    
            // Check if azero_interest_account enough azero to pay
            if self.data::<Data>().azero_interest_account < unclaimed_azero_reward_at_last_topup {
                return Err(Error::NotEnoughAzeroReward);
            }

            // Check if enough inw to pay
            if self.data::<Data>().inw_interest_account < unclaimed_inw_reward_at_last_topup {
                return Err(Error::NotEnoughInwReward);
            }
            
            // Transfer azero to staker                    
            if Self::env().transfer(claimer, unclaimed_azero_reward_at_last_topup).is_err() {
                return Err(Error::WithdrawError);
            }

            // Transfer inw to staker   
            let balance = Psp22Ref::balance_of(
                &self.data::<Data>().inw_contract,
                Self::env().account_id(),
            );
    
            if balance < unclaimed_inw_reward_at_last_topup {
                return Err(Error::NotEnoughBalance);
            }

            let builder = Psp22Ref::transfer_builder(
                &self.data::<Data>().inw_contract,
                claimer,
                unclaimed_inw_reward_at_last_topup,
                Vec::<u8>::new(),
            );
            
            let result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => Err(Error::CannotTransfer),
            }; 

            if result.is_ok() {
                // Update accounts
                self.data::<Data>().azero_interest_account = self.data::<Data>().azero_interest_account
                                                                .checked_sub(unclaimed_azero_reward_at_last_topup).ok_or(Error::CheckedOperationsAzeroInterestAccount)?; 
                self.data::<Data>().inw_interest_account = self.data::<Data>().inw_interest_account
                                                                .checked_sub(unclaimed_inw_reward_at_last_topup).ok_or(Error::CheckedOperationsInwInterestAccount)?; 

                // Update stake info
                stake_info.unclaimed_azero_reward = stake_info.unclaimed_azero_reward
                                                        .checked_sub(unclaimed_azero_reward_at_last_topup).ok_or(Error::CheckedOperationsUnclaimedAzeroReward)?;
                stake_info.claimed_azero_reward = stake_info.claimed_azero_reward
                                                        .checked_add(unclaimed_azero_reward_at_last_topup).ok_or(Error::CheckedOperations)?;                                    
                stake_info.unclaimed_inw_reward = stake_info.unclaimed_inw_reward
                                                        .checked_sub(unclaimed_inw_reward_at_last_topup).ok_or(Error::CheckedOperationsUnclaimedInwReward)?;
                stake_info.claimed_inw_reward = stake_info.claimed_inw_reward
                                                        .checked_add(unclaimed_inw_reward_at_last_topup).ok_or(Error::CheckedOperations)?;                                    
                
                stake_info.last_rewards_claimed = stake_info.last_updated;

                self.data::<Data>().stake_info_by_staker
                    .insert(&claimer, &stake_info);

                if self.update_last_unclaimed_rewards(claimer).is_err() {
                    return Err(Error::CannotUpdateUnclaimedRewards);
                }       

                self._emit_claim_rewards_event(
                    claimer,
                    unclaimed_azero_reward_at_last_topup,
                    unclaimed_inw_reward_at_last_topup,
                    Self::env().block_timestamp() 
                );                     

                Ok(())
            } else { 
                result
            }
            // }                       
        } else {
            return Err(Error::NoStakeInfoFound);
        }                  
    }

    #[modifiers(only_not_locked)]
    fn claim_rewards(&mut self) -> Result<(), Error> {
        let claimer = Self::env().caller();
        self.common_claim_rewards(claimer)
    }

    fn get_unclaimed_reward_at_last_topup(&self) -> Result<UnclaimedRewardAtLastTopup, Error> {
        let claimer = Self::env().caller();
        
        if let Some(stake_info) = self.data::<Data>().stake_info_by_staker.get(&claimer) {   
            // Can only check if there is a new topup for azero interest compared with the last rewards claimed
            if stake_info.last_rewards_claimed >= self.data::<Data>().last_azero_interest_topup {
                return Err(Error::NoNewAzeroTopup);
            }

            // Calculate unclaimed_azero_reward_at_last_topup and unclaimed_inw_reward_at_last_topup (at last topup time)
            if self.data::<Data>().last_azero_interest_topup > stake_info.last_anchored {
                let time_length = self.data::<Data>().last_azero_interest_topup.checked_sub(stake_info.last_anchored).ok_or(Error::CheckedOperationsTimeLength)?; // ms
                
                let unclaimed_reward_365 = stake_info.staking_amount.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data::<Data>().apy).ok_or(Error::CheckedOperations)?;
                let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
                let unclaimed_azero_reward_at_last_topup = stake_info.last_unclaimed_azero_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

                // Assuming azero and imw have the same decimal 12               
                let unclaimed_inw_reward_365 = stake_info.staking_amount.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data::<Data>().inw_multiplier).ok_or(Error::CheckedOperations)?;
                let unclaimed_inw_reward = unclaimed_inw_reward_365.checked_div(24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
                let unclaimed_inw_reward_at_last_topup = stake_info.last_unclaimed_inw_reward.checked_add(unclaimed_inw_reward).ok_or(Error::CheckedOperations)?;

                let unclaimed_reward_at_last_topup = UnclaimedRewardAtLastTopup {
                    azero_reward: unclaimed_azero_reward_at_last_topup,
                    inw_reward: unclaimed_inw_reward_at_last_topup
                };

                Ok(unclaimed_reward_at_last_topup)
            } else {
                return Err(Error::CheckedOperationsTimeLength);
            }
        } else {
            return Err(Error::NoStakeInfoFound);
        }
    }

    // The unsorted expired waiting_list
    fn get_waiting_list_within_expiration_duration(&self, expiration_duration: u64) -> Result<OngoingExpiredWaitingList, Error> {
        let count = self.data::<Data>().withdrawal_waiting_list.count(1);
        
        let mut waiting_list = Vec::<u128>::new();
        let mut total_azero: Balance = 0;

        let current_time = Self::env().block_timestamp();

        for i in 0..count {
            if let Some(request_index) = self.data::<Data>().withdrawal_waiting_list.get_value(1, &i) {
                if let Some(withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&request_index) {
                    if withdrawal_request_info.request_time.checked_add(self.data::<Data>().max_waiting_time).ok_or(Error::CheckedOperations)?
                       <= current_time.checked_add(expiration_duration).ok_or(Error::CheckedOperations)? {
                        waiting_list.push(request_index);

                        total_azero = total_azero.checked_add(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?;
                    } 
                }
            }
        }

        let ongoing_expired_waiting_list = OngoingExpiredWaitingList {
            waiting_list: waiting_list,
            total_azero: total_azero,
        };

        Ok(ongoing_expired_waiting_list)
    }
    
    // Not count for the one reserved and going to expire  
    fn get_withdrawable_azero_to_stake_to_validator(&self, expiration_duration: u64) -> Result<Balance, Error> {
        // Use the unsorted waiting list because it is logN time faster than sorting it 
        if let Ok(ongoing_expired_waiting_list) = self.get_waiting_list_within_expiration_duration(expiration_duration) {
            if self.data::<Data>().azero_stake_account > ongoing_expired_waiting_list.total_azero.checked_add(self.data::<Data>().total_azero_reserved_for_withdrawals).ok_or(Error::CheckedOperations)? {
                self.data::<Data>().azero_stake_account
                    .checked_sub(self.data::<Data>().total_azero_reserved_for_withdrawals).ok_or(Error::CheckedOperations)?
                    .checked_sub(ongoing_expired_waiting_list.total_azero).ok_or(Error::CheckedOperations)                   
            } else {
                Ok(0)
            }
        } else {
            Err(Error::CannotGetWaitingList)
        }
    }

    fn get_azero_balance(&self) -> Balance {
        Self::env().balance()
    }    
   
    // Payable for withdrawal request
    fn get_payable_azero(&self) -> Result<Balance, Error>  {
        self.data::<Data>().azero_stake_account.checked_sub(self.data::<Data>().total_azero_reserved_for_withdrawals).ok_or(Error::CheckedOperations)
    }    
    
    // From stake account
    #[modifiers(only_role(WITHDRAWAL_MANAGER))]
    fn withdraw_azero_to_stake(&mut self, expiration_duration: u64, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        if !self.data::<Data>().is_selecting_requests_to_pay {
            if let Ok(max_amount) = self.get_withdrawable_azero_to_stake_to_validator(expiration_duration) {
                if amount > max_amount || amount == 0 {
                    return Err(Error::InvalidWithdrawalAmount);
                }

                self.data::<Data>().azero_stake_account = self.data::<Data>().azero_stake_account.checked_sub(amount).ok_or(Error::CheckedOperations)?;
                self.data::<Data>().total_azero_withdrawn_to_stake = self.data::<Data>().total_azero_withdrawn_to_stake.checked_add(amount).ok_or(Error::CheckedOperations)?;
                   
                if Self::env().transfer(receiver, amount).is_err() {
                    return Err(Error::WithdrawError);
                }

                self._emit_withdraw_azero_to_stake_event(
                    receiver,
                    amount,
                    Self::env().block_timestamp() 
                );

                Ok(())
            } else {
                Err(Error::CannotGetWithdrawableAmount)
            }
        } else {
            Err(Error::IsNotWithdrawable)
        }
    }

    // From stake account
    #[modifiers(only_owner)]
    fn withdraw_azero_from_stake_account(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        if !self.data::<Data>().is_selecting_requests_to_pay {
            if let Ok(max_amount) = self.get_payable_azero() {
                if amount > max_amount || amount == 0 {
                    return Err(Error::InvalidWithdrawalAmount);
                }

                self.data::<Data>().azero_stake_account = self.data::<Data>().azero_stake_account.checked_sub(amount).ok_or(Error::CheckedOperations)?;
                
                if Self::env().transfer(receiver, amount).is_err() {
                    return Err(Error::WithdrawError);
                }

                self._emit_withdraw_azero_from_stake_account_event(
                    receiver,
                    amount,
                    Self::env().block_timestamp()                
                );            

                Ok(())
            } else {
                Err(Error::CannotGetWithdrawableAmount)
            } 
        } else {
            Err(Error::IsNotWithdrawable)
        }
    }

    // From interest account
    #[modifiers(only_owner)]
    fn withdraw_azero_from_interest_account(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {   
        if amount == 0 {
            return Err(Error::InvalidWithdrawalAmount);
        }

        self.data::<Data>().azero_interest_account = self.data::<Data>().azero_interest_account.checked_sub(amount).ok_or(Error::CheckedOperations)?;
        
        if Self::env().transfer(receiver, amount).is_err() {
            return Err(Error::WithdrawError);
        }

        self._emit_withdraw_azero_from_interest_account_event(
            receiver,
            amount,
            Self::env().block_timestamp()                
        );            

        Ok(())
    }

    // Azero from contract but not in accounts (azero_stake_account and azero_interest_account)
    #[modifiers(only_owner)]
    fn withdraw_azero_not_in_accounts(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        let withdrawable_amount = Self::env().balance()
                                    .checked_sub(self.data::<Data>().azero_stake_account).ok_or(Error::CheckedOperations)?
                                    .checked_sub(self.data::<Data>().azero_interest_account).ok_or(Error::CheckedOperations)?;
        
        if amount > withdrawable_amount || amount == 0 {
            return Err(Error::InvalidWithdrawalAmount);
        }

        if Self::env().transfer(receiver, amount).is_err() {
            return Err(Error::WithdrawError);
        }

        self._emit_withdraw_azero_not_in_accounts_event(
            receiver,
            amount,
            Self::env().block_timestamp()                
        );            

        Ok(())              
    }

    // Azero from contract but not in accounts (azero_stake_account and azero_interest_account)
    #[modifiers(only_owner)]
    fn withdraw_azero_emergency(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        let withdrawable_amount = Self::env().balance();
                                    
        if amount > withdrawable_amount || amount == 0 {
            return Err(Error::InvalidWithdrawalAmount);
        }

        if Self::env().transfer(receiver, amount).is_err() {
            return Err(Error::WithdrawError);
        }

        self._emit_withdraw_azero_emergency_event(
            receiver,
            amount,
            Self::env().block_timestamp()                
        );            

        Ok(())              
    }

    // From interest account
    #[modifiers(only_owner)]
    fn withdraw_inw_from_interest_account(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        if amount == 0 {
            return Err(Error::InvalidWithdrawalAmount);
        }

        self.data::<Data>().inw_interest_account = self.data::<Data>().inw_interest_account.checked_sub(amount).ok_or(Error::CheckedOperations)?;

        let builder =
            Psp22Ref::transfer_builder(
                &self.data::<Data>().inw_contract, 
                receiver, 
                amount, 
                Vec::<u8>::new());
            
        let result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        };

        self._emit_withdraw_inw_from_interest_account_event(
            receiver,
            amount,
            Self::env().block_timestamp()                
        );

        return result;
    }  

    // Inw from contract but not in accounts (inw_interest_account)
    #[modifiers(only_owner)]
    fn withdraw_inw_not_in_accounts(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        let inw_balance = Psp22Ref::balance_of(&self.data::<Data>().inw_contract, Self::env().account_id());
        let withdrawable_amount = inw_balance.checked_sub(self.data::<Data>().inw_interest_account).ok_or(Error::CheckedOperations)?;
        
        if amount > withdrawable_amount || amount == 0 {
            return Err(Error::InvalidWithdrawalAmount);
        }

        let builder =
            Psp22Ref::transfer_builder(
                &self.data::<Data>().inw_contract, 
                receiver, 
                amount, 
                Vec::<u8>::new());
            
        let result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        };

        self._emit_withdraw_inw_not_in_accounts_event(
            receiver,
            amount,
            Self::env().block_timestamp()                
        );

        return result;
    } 

    // From external source, i.e. external wallet, need script to call
    fn topup_azero_stake_account(&mut self, amount: Balance) -> Result<(), Error>  {
        if amount > Self::env().transferred_value() {
            return Err(Error::InvalidTransferAmount)
        }

        self.data::<Data>().azero_stake_account = self.data::<Data>().azero_stake_account
                                                    .checked_add(amount).ok_or(Error::CheckedOperations)?;
        
        Ok(())
    }  

    // From distribution contract, need to check caller first
    fn topup_azero_interest_account(&mut self, amount: Balance) -> Result<(), Error>  {
        if Self::env().caller() != self.data::<Data>().interest_distribution_contract {
            return Err(Error::NotInterestDistributionContract);
        }

        self.data::<Data>().azero_interest_account = self.data::<Data>().azero_interest_account
                                                    .checked_add(amount).ok_or(Error::CheckedOperations)?;
        
        let current_time = Self::env().block_timestamp();
        self.data::<Data>().last_azero_interest_topup = current_time;       
                     
        Ok(())
    }  

    // From external source
    fn topup_inw_interest_account(&mut self, amount: Balance) -> Result<(), Error>  {
        let caller = Self::env().caller();

        // Check INW balance and allowance
        let allowance =
            Psp22Ref::allowance(&self.data::<Data>().inw_contract, caller, Self::env().account_id());

        let balance = Psp22Ref::balance_of(&self.data::<Data>().inw_contract, caller);

        if allowance < amount || balance < amount {
            return Err(Error::InvalidBalanceAndAllowance);
        }

        self.data::<Data>().inw_interest_account = self.data::<Data>().inw_interest_account.checked_add(amount).ok_or(Error::CheckedOperations)?;
    
        // Collect INW 
        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Data>().inw_contract,
            caller,
            Self::env().account_id(),
            amount,
            Vec::<u8>::new(),
        );            

        match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        }     
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

    // View stake info only, not update data to storage
    fn get_stake_info(&mut self, staker: AccountId) -> Result<Option<StakeInformation>, Error> {
        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {
            let current_time = Self::env().block_timestamp();
            let time_length = current_time.checked_sub(stake_info.last_updated).ok_or(Error::CheckedOperations)?; // ms
            
            let unclaimed_reward_365 = stake_info.staking_amount.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data::<Data>().apy).ok_or(Error::CheckedOperations)?;
            let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
            stake_info.unclaimed_azero_reward = stake_info.unclaimed_azero_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

            // Assuming azero and imw have the same decimal 12               
            let unclaimed_inw_reward_365 = stake_info.staking_amount.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data::<Data>().inw_multiplier).ok_or(Error::CheckedOperations)?;
            let unclaimed_inw_reward = unclaimed_inw_reward_365.checked_div(24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
            stake_info.unclaimed_inw_reward = stake_info.unclaimed_inw_reward.checked_add(unclaimed_inw_reward).ok_or(Error::CheckedOperations)?;
                         
            stake_info.last_updated = current_time;
            Ok(Some(stake_info))
        } else {
            return Err(Error::NoStakeInfoFound);
        }
    }

    fn get_staker_list(&self) -> Vec<AccountId> {
        self.data::<Data>().staker_list.clone()
    }

    fn get_total_stakers(&self) -> u128 {
        self.data::<Data>().staker_list.len() as u128
    }

    fn get_withdrawal_request_count(&self) -> u128 {
        self.data::<Data>().withdrawal_request_count
    }

    fn get_withdrawal_request_list(&self) -> Vec<WithdrawalRequestInformation> {
        let count = self.data::<Data>().withdrawal_request_count;
        let mut request_list = Vec::<WithdrawalRequestInformation>::new();

        for i in 0..count {
            if let Some(withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&i) {
                request_list.push(withdrawal_request_info);
            }
        } 

        request_list
    }

    fn get_withdrawal_request(&self, index: u128) -> Option<WithdrawalRequestInformation> {
        self.data::<Data>().withdrawal_request_list.get(&index)
    }

    fn get_withdrawal_request_count_by_user(&self, user: AccountId) -> u128 {
        self.data::<Data>().withdrawal_request_by_user.count(user)
    }

    fn get_withdrawal_request_list_by_user(&self, user: AccountId) -> Vec<WithdrawalRequestInformation> {
        let count = self.data::<Data>().withdrawal_request_by_user.count(user);
        let mut request_list = Vec::<WithdrawalRequestInformation>::new();

        for i in 0..count {
            if let Some(request_index) = self.data::<Data>().withdrawal_request_by_user.get_value(user, &i) {
                if let Some(withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&request_index) {
                    request_list.push(withdrawal_request_info);
                }
            }
        } 

        request_list
    }

    fn get_withdrawal_request_index_list_by_user(&self, user: AccountId) -> Vec<u128> {
        let count = self.data::<Data>().withdrawal_request_by_user.count(user);
        let mut request_index_list = Vec::<u128>::new();

        for i in 0..count {
            if let Some(request_index) = self.data::<Data>().withdrawal_request_by_user.get_value(user, &i) {
                request_index_list.push(request_index);
            }
        } 

        request_index_list
    }

    fn get_withdrawal_request_index_by_user(&self, user: AccountId, index: u128) -> Option<u128> {
        self.data::<Data>().withdrawal_request_by_user.get_value(user, &index)
    }

    fn get_waiting_withdrawal_count(&self) -> u128 {
        self.data::<Data>().withdrawal_waiting_list.count(1)
    }

    fn get_waiting_withdrawal_list(&self) -> Vec<u128> {
        let count = self.data::<Data>().withdrawal_waiting_list.count(1);
        let mut request_index_list = Vec::<u128>::new();

        for i in 0..count {
            if let Some(request_index) = self.data::<Data>().withdrawal_waiting_list.get_value(1, &i) {
                request_index_list.push(request_index);
            }
        } 

        request_index_list
    }

    fn get_total_withdrawal_request_claimed(&self, claimer: AccountId) -> Option<u128> {
        self.data::<Data>().total_withdrawal_request_claimed.get(&claimer)
    }

    fn get_total_withdrawal_request_cancelled(&self, user: AccountId) -> Option<u128> {
        self.data::<Data>().total_withdrawal_request_cancelled.get(&user)
    }

    fn get_waiting_withdrawal_index(&self, index: u128) -> Option<u128> {
        self.data::<Data>().withdrawal_waiting_list.get_value(1, &index)
    }
   
    fn get_total_azero_staked(&self) -> Balance {
        self.data::<Data>().total_azero_staked
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

    fn get_total_azero_reserved_for_withdrawals(&self) -> Balance {
        self.data::<Data>().total_azero_reserved_for_withdrawals
    }

    fn get_total_azero_withdrawn_to_stake(&self) -> Balance {
        self.data::<Data>().total_azero_withdrawn_to_stake
    }

    fn get_azero_stake_account(&self) -> Balance {
        self.data::<Data>().azero_stake_account
    }

    fn get_azero_interest_account(&self) -> Balance {
        self.data::<Data>().azero_interest_account
    }

    fn get_inw_interest_account(&self) -> Balance {
        self.data::<Data>().inw_interest_account
    }

    fn get_last_azero_interest_topup(&self) -> u64 {
        self.data::<Data>().last_azero_interest_topup
    }
   
    fn get_is_selecting_requests_to_pay(&self) -> bool {
        self.data::<Data>().is_selecting_requests_to_pay
    }

    fn get_is_locked(&self) -> bool {
        self.data::<Data>().is_locked
    }

    fn get_interest_distribution_contract(&self) -> AccountId {
        self.data::<Data>().interest_distribution_contract
    }

    fn get_block_timestamp(&self) -> Timestamp {
        Self::env().block_timestamp()
    } 
    
    // Setters
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
    fn set_is_locked(&mut self, is_locked: bool) -> Result<(), Error> {
        if is_locked == self.data::<Data>().is_locked {
            return Err(Error::InvalidIsLockedInput)
        }
        self.data::<Data>().is_locked = is_locked;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    #[modifiers(only_locked)]   
    fn update_unclaimed_rewards_when_locked(&mut self, staker: AccountId, current_time: u64) -> Result<(), Error> {
        if self.update_unclaimed_rewards(staker, current_time).is_err() {
            return Err(Error::CannotUpdateUnclaimedRewards);
        }

        if let Some(stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {               
            if stake_info.last_rewards_claimed < self.data::<Data>().last_azero_interest_topup {
                let result = self.common_claim_rewards(staker);
                
                if result.is_err() {
                    return result;
                }
            }
        }        
        
        if self.update_last_unclaimed_rewards(staker).is_err() {
            return Err(Error::CannotUpdateUnclaimedRewards);
        }   

        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    #[modifiers(only_locked)]    
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
    #[modifiers(only_locked)]
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

    #[modifiers(only_role(UPDATING_MANAGER))]
    fn set_total_azero_reserved_for_withdrawals(&mut self, total_azero_reserved_for_withdrawals: Balance) -> Result<(), Error> {
        self.data::<Data>().total_azero_reserved_for_withdrawals = total_azero_reserved_for_withdrawals;
        Ok(())
    }

    #[modifiers(only_role(UPDATING_MANAGER))]
    fn set_withdrawal_request_info_status(&mut self, request_index: u128, status: u8) -> Result<(), Error> {
        if status > WITHDRAWAL_REQUEST_CANCELLED {
            return Err(Error::InvalidWithdrawalRequestStatus);
        }

        if let Some(mut withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&request_index) {
            withdrawal_request_info.status = status;  
            self.data::<Data>().withdrawal_request_list.insert(&request_index, &withdrawal_request_info);
            Ok(())
        } else {
            return Err(Error::NoWithdrawalRequestInfo); 
        }        
    }

    #[modifiers(only_role(UPDATING_MANAGER))]
    fn remove_request_index_in_withdrawal_waiting_list(&mut self, request_index: u128) -> Result<(), Error> {
        if self.data::<Data>().withdrawal_waiting_list.contains_value(1, &request_index) {
            self.data::<Data>().withdrawal_waiting_list.remove_value(1, &request_index);  
            Ok(())
        } else {
            return Err(Error::InvalidWaitingRequestIndex); 
        }
    }

    #[modifiers(only_role(UPDATING_MANAGER))]
    fn set_is_selecting_requests_to_pay(&mut self, is_selecting_requests_to_pay: bool) -> Result<(), Error> {
        self.data::<Data>().is_selecting_requests_to_pay = is_selecting_requests_to_pay;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn set_interest_distribution_contract(&mut self, interest_distribution_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().interest_distribution_contract = interest_distribution_contract;
        Ok(())
    }   
}