pub use crate::{
    impls::azero_staking::{data, data::Data, data::*},
    traits::{error::Error, azero_staking::*},
};

use ink::prelude::{vec::Vec};

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
        _azero_reward: Balance,
        _inw_reward: Balance, 
        _time: u64
    ) {
    }

    fn _emit_claim_event(
        &self,
        _request_id: u128,
        _user: AccountId,  
        _azero_amount: Balance,
        _inw_amount: Balance,
        _time: u64  
    ) {            
    }

    fn _emit_withdraw_azero_to_stake_event(
        &self,
        _caller: AccountId, 
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    ) {        
    }

    fn _emit_withdraw_azero_event(
        &self,
        _receiver: AccountId,
        _amount: Balance, 
        _time: u64 
    ) {        
    }

    fn _emit_withdraw_inw_event(
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

        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {              
            // Calculate stake info
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

            self.data::<Data>().staker_list.push(staker);
        }

        self._emit_stake_event(
            staker,
            amount,
            current_time
        );

        Ok(())
    }    

    fn withdraw_request(&mut self, amount: Balance) -> Result<(), Error> {
        let staker = Self::env().caller();

        // Update the current unclaimed_amount
        let current_time = Self::env().block_timestamp();
        if self.update_unclaimed_rewards(staker, current_time).is_err() {
            return Err(Error::CannotUpdateUnclaimedRewards);
        }        

        if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&staker) {    
            if amount > stake_info.staking_amount {
                return Err(Error::InvalidUnstakedAmount);
            }
            
            // Add withdrawal request info
            let withdrawal_request_count = self.data::<Data>().withdrawal_request_count;
            let withdrawal_request_info = WithdrawalRequestInformation{
                request_index: withdrawal_request_count,
                user: staker,
                amount: amount,				
                azero_reward: stake_info.unclaimed_azero_reward,
                total_azero: amount.checked_add(stake_info.unclaimed_azero_reward).ok_or(Error::CheckedOperations)?,
                inw_reward: stake_info.unclaimed_inw_reward,	
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
                .checked_add(withdrawal_request_info.amount).ok_or(Error::CheckedOperations)?
                .checked_add(withdrawal_request_info.azero_reward).ok_or(Error::CheckedOperations)?;

            self.data::<Data>().total_inw_for_waiting_withdrawals = 
                self.data::<Data>().total_inw_for_waiting_withdrawals
                .checked_add(withdrawal_request_info.inw_reward).ok_or(Error::CheckedOperations)?;
            
            // Update stake info - last_updated is updated in update_unclaimed_rewards
            stake_info.staking_amount = stake_info.staking_amount
                                        .checked_sub(amount).ok_or(Error::CheckedOperations)?;
            stake_info.unclaimed_azero_reward = 0;
            stake_info.unclaimed_inw_reward = 0;       
            
            self.data::<Data>().stake_info_by_staker
                .insert(&staker, &stake_info);

            self._emit_withrawal_request_event(
                withdrawal_request_count,
                withdrawal_request_info.user,
                withdrawal_request_info.amount,
                withdrawal_request_info.azero_reward,
                withdrawal_request_info.inw_reward,
                withdrawal_request_info.request_time
            );

            Ok(())
        } else {
            Err(Error::NoStakeInfoFound)
        }
    }

    fn get_waiting_list_within_expiration_duration(&self, expiration_duration: u64) -> Result<OngoingExpiredWaitingList, Error> {
        let count = self.data::<Data>().withdrawal_waiting_list.count(1);
        
        let mut waiting_list = Vec::<u128>::new();
        let mut total_azero: Balance = 0;
        let mut total_inw: Balance = 0;

        let current_time = Self::env().block_timestamp();

        for i in 0..count {
            if let Some(request_index) = self.data::<Data>().withdrawal_waiting_list.get_value(1, &i) {
                if let Some(withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&request_index) {
                    if withdrawal_request_info.request_time.checked_add(self.data::<Data>().max_waiting_time).ok_or(Error::CheckedOperations)?
                       <= current_time.checked_add(expiration_duration).ok_or(Error::CheckedOperations)? {
                        waiting_list.push(request_index);
                        total_azero = total_azero.checked_add(withdrawal_request_info.total_azero).ok_or(Error::CheckedOperations)?;
                        total_inw = total_inw.checked_add(withdrawal_request_info.inw_reward).ok_or(Error::CheckedOperations)?;
                    } 
                }
            }
        }

        let ongoing_expired_waiting_list = OngoingExpiredWaitingList {
            waiting_list: waiting_list,
            total_azero: total_azero,
            total_inw: total_inw
        };

        Ok(ongoing_expired_waiting_list)
    }

    #[modifiers(only_role(ADMINER))]
    fn select_requests_to_pay(&mut self, expiration_duration: u64) -> Result<(), Error> {
        if let Ok(ongoing_expired_waiting_list) = self.get_waiting_list_within_expiration_duration(expiration_duration) {
            let mut waiting_list = ongoing_expired_waiting_list.waiting_list; 
            let list_count = waiting_list.len();
            
            // Sort the waiting list 
            if list_count > 1 {
                // Strategy 1: Pay for as many users as possible - Sort the waiting_list in ascending order of amount + azero_reward  
                for i in 0..list_count.checked_sub(1).ok_or(Error::CheckedOperations)? { 
                    for j in (i + 1)..list_count {
                        let request_index_x = waiting_list[i]; 
                        let request_index_y = waiting_list[j]; 

                        if let Some(withdrawal_request_info_x) = self.data::<Data>().withdrawal_request_list.get(&request_index_x) {
                            if let Some(withdrawal_request_info_y) = self.data::<Data>().withdrawal_request_list.get(&request_index_y) {
                                if withdrawal_request_info_x.total_azero > withdrawal_request_info_y.total_azero {
                                    // Swap 2 requests
                                    waiting_list[i] = request_index_y;
                                    waiting_list[j] = request_index_x;
                                }
                            }
                        }           
                    }
                }
                // Strategy 2: (Not recommended) Pay for the most value of withdrawals - Sort the waiting_list in descending order of amount + azero_reward
            }
            
            // Mark requests as claimable if there are enough to pay
            let mut total_azero_claimable: Balance = 0;
            let mut total_inw_claimable: Balance = 0;
            // let mut is_payable = true; 
            
            let total_payable_azero_amount = Self::env().balance().checked_sub(self.data::<Data>().total_azero_reserved_for_withdrawals).ok_or(Error::CheckedOperations)?;
            
            let inw_balance = Psp22Ref::balance_of(
                &self.data::<Data>().inw_contract,
                Self::env().account_id(),
            );
            let total_payable_inw_amount = inw_balance.checked_sub(self.data::<Data>().total_inw_reserved_for_withdrawals).ok_or(Error::CheckedOperations)?;

            for i in 0..list_count {
                let request_index = waiting_list[i]; 

                if let Some(mut withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&request_index) {
                    // Check again if it is really the waiting status
                    if withdrawal_request_info.status == WITHDRAWAL_REQUEST_WAITING {
                        if total_azero_claimable.checked_add(withdrawal_request_info.total_azero).ok_or(Error::CheckedOperations)? <= total_payable_azero_amount {
                            if total_inw_claimable.checked_add(withdrawal_request_info.inw_reward).ok_or(Error::CheckedOperations)? <= total_payable_inw_amount {
                                // Add claimable amount for this selection
                                total_azero_claimable = total_azero_claimable
                                                        .checked_add(withdrawal_request_info.total_azero)
                                                        .ok_or(Error::CheckedOperations)?;

                                total_inw_claimable = total_inw_claimable
                                                        .checked_add(withdrawal_request_info.inw_reward)
                                                        .ok_or(Error::CheckedOperations)?;

                                // Add reserves for withdrawals
                                self.data::<Data>().total_azero_reserved_for_withdrawals = 
                                                        self.data::<Data>().total_azero_reserved_for_withdrawals
                                                        .checked_add(withdrawal_request_info.total_azero)
                                                        .ok_or(Error::CheckedOperations)?;

                                self.data::<Data>().total_inw_reserved_for_withdrawals = 
                                                        self.data::<Data>().total_inw_reserved_for_withdrawals
                                                        .checked_add(withdrawal_request_info.inw_reward)
                                                        .ok_or(Error::CheckedOperations)?;

                                // Update withdrawal request info
                                withdrawal_request_info.status = WITHDRAWAL_REQUEST_CLAIMABLE;
                                self.data::<Data>().withdrawal_request_list.insert(&request_index, &withdrawal_request_info);

                                // Remove request_index in waiting list
                                self.data::<Data>().withdrawal_waiting_list.remove_value(1, &request_index);                              
                            }    
                        } else {    
                            break;
                        }
                    }
                }         
            }

            Ok(())
        } else {
            Err(Error::CannotGetWaitingList)
        }
    }

    fn claim(&mut self, request_index: u128) -> Result<(), Error> {
        let claimer = Self::env().caller();

        // Check if the request_index belongs to the caller 
        if self.data::<Data>().withdrawal_request_by_user.contains_value(claimer, &request_index) {
            if let Some(mut withdrawal_request_info) = self.data::<Data>().withdrawal_request_list.get(&request_index) {
                // Check if request is claimable 
                if withdrawal_request_info.status != WITHDRAWAL_REQUEST_CLAIMABLE {
                    return Err(Error::WithdrawalRequestIsNotClaimable);    
                }

                // Check inw status
                // - Return inw to claimer if inw reward > unstaking_fee
                // - Collect inw if inw reward < unstaking_fee
                let mut inw_in: Balance = 0;
                let mut inw_out: Balance = 0;

                let fees = self.data::<Data>().unstaking_fee;
                if withdrawal_request_info.inw_reward > fees {
                    inw_out = withdrawal_request_info.inw_reward.checked_sub(fees).ok_or(Error::CheckedOperations)?;
                } else {
                    inw_in = fees.checked_sub(withdrawal_request_info.inw_reward).ok_or(Error::CheckedOperations)?;
                }

                // If collect inw, check inw allowance and balance whether they are enough 
                if inw_in > 0 {
                    let allowance = Psp22Ref::allowance(&self.data::<Data>().inw_contract, claimer, Self::env().account_id());
                    let balance = Psp22Ref::balance_of(&self.data::<Data>().inw_contract, claimer);

                    if allowance < inw_in || balance < inw_in {
                        return Err(Error::InvalidBalanceAndAllowance);
                    }
                }                

                // Update total info
                self.data::<Data>().total_azero_for_waiting_withdrawals = 
                    self.data::<Data>().total_azero_for_waiting_withdrawals
                    .checked_sub(withdrawal_request_info.total_azero).ok_or(Error::CheckedOperations)?;

                self.data::<Data>().total_inw_for_waiting_withdrawals = 
                    self.data::<Data>().total_inw_for_waiting_withdrawals
                    .checked_sub(withdrawal_request_info.inw_reward).ok_or(Error::CheckedOperations)?;
                        
                self.data::<Data>().total_azero_reserved_for_withdrawals = 
                    self.data::<Data>().total_azero_reserved_for_withdrawals
                    .checked_sub(withdrawal_request_info.total_azero).ok_or(Error::CheckedOperations)?;
    
                self.data::<Data>().total_inw_reserved_for_withdrawals = 
                    self.data::<Data>().total_inw_reserved_for_withdrawals
                    .checked_sub(withdrawal_request_info.inw_reward).ok_or(Error::CheckedOperations)?;
                                      
                self.data::<Data>().total_azero_claimed = 
                    self.data::<Data>().total_azero_claimed
                    .checked_add(withdrawal_request_info.total_azero).ok_or(Error::CheckedOperations)?;

                self.data::<Data>().total_inw_claimed = 
                    self.data::<Data>().total_inw_claimed
                    .checked_add(withdrawal_request_info.inw_reward).ok_or(Error::CheckedOperations)?;

                // Update stake information
                if let Some(mut stake_info) = self.data::<Data>().stake_info_by_staker.get(&claimer) { 
                    stake_info.claimed_azero_reward =
                        stake_info.claimed_azero_reward
                        .checked_add(withdrawal_request_info.total_azero).ok_or(Error::CheckedOperations)?;

                    stake_info.claimed_inw_reward = 
                        stake_info.claimed_inw_reward
                        .checked_add(withdrawal_request_info.inw_reward).ok_or(Error::CheckedOperations)?;

                    self.data::<Data>().stake_info_by_staker
                        .insert(&claimer, &stake_info);
                }          
                        
                // Update withdrawal_request_info                  
                withdrawal_request_info.status = WITHDRAWAL_REQUEST_CLAIMED; 
                self.data::<Data>().withdrawal_request_list.insert(&request_index, &withdrawal_request_info);

                // Transfer unstaked azero and unclaimed azero
                if Self::env().transfer(claimer, withdrawal_request_info.total_azero).is_err() {
                    return Err(Error::WithdrawError);
                }

                // Return claimer inw amount of reward minus fee if it is > 0 
                if inw_out > 0 {
                    let builder = Psp22Ref::transfer_builder(
                        &self.data::<Data>().inw_contract, 
                        claimer, 
                        inw_out, 
                        Vec::<u8>::new());
                        
                    let result = match builder.try_invoke() {
                        Ok(Ok(Ok(_))) => Ok(()),
                        Ok(Ok(Err(e))) => Err(e.into()),
                        Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                        Err(ink::env::Error::NotCallable) => Ok(()),
                        _ => Err(Error::CannotTransfer),
                    };
                    
                    if result.is_err() {
                        return Err(Error::CannotTransfer);
                    }
                }

                // Collect from user fee minus inw reward if it is > 0 
                if inw_in > 0 {
                    let builder = Psp22Ref::transfer_from_builder(
                        &self.data::<Data>().inw_contract,
                        claimer,
                        Self::env().account_id(),
                        inw_in,
                        Vec::<u8>::new(),
                    );            

                    let result = match builder.try_invoke() {
                        Ok(Ok(Ok(_))) => Ok(()),
                        Ok(Ok(Err(e))) => Err(e.into()),
                        Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                        Err(ink::env::Error::NotCallable) => Ok(()),
                        _ => Err(Error::CannotTransfer),
                    };

                    if result.is_err() {
                        return Err(Error::CannotTransfer);
                    }
                }

                self._emit_claim_event(
                    request_index,
                    claimer,
                    withdrawal_request_info.total_azero,
                    withdrawal_request_info.inw_reward,
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

    fn get_withdrawable_azero_to_stake_to_validator(&self, expiration_duration: u64) -> Result<Balance, Error> {
        if let Ok(ongoing_expired_waiting_list) = self.get_waiting_list_within_expiration_duration(expiration_duration) {
            if Self::env().balance() > ongoing_expired_waiting_list.total_azero.checked_add(self.data::<Data>().total_azero_reserved_for_withdrawals).ok_or(Error::CheckedOperations)? {
                Self::env().balance()
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

    fn get_payable_azero(&self) -> Result<Balance, Error>  {
        Self::env().balance().checked_sub(self.data::<Data>().total_azero_reserved_for_withdrawals).ok_or(Error::CheckedOperations)
    }
    
    fn get_withdrawable_inw(&self) -> Result<Balance, Error>  {
        let inw_balance = Psp22Ref::balance_of(
            &self.data::<Data>().inw_contract,
            Self::env().account_id(),
        );
        inw_balance.checked_sub(self.data::<Data>().total_inw_reserved_for_withdrawals).ok_or(Error::CheckedOperations)
    }

    // fn get_role_withdrawal_manager(&self) -> RoleType {
    //     WITHDRAWAL_MANAGER
    // }

    #[modifiers(only_role(WITHDRAWAL_MANAGER))]
    fn withdraw_azero_to_stake(&mut self, expiration_duration: u64, receiver: AccountId) -> Result<(), Error> {
        if let Ok(max_amount) = self.get_withdrawable_azero_to_stake_to_validator(expiration_duration) {
            if max_amount == 0 {
                return Err(Error::InvalidWithdrawalAmount);
            }

            if Self::env().transfer(receiver, max_amount).is_err() {
                return Err(Error::WithdrawError);
            }

            self._emit_withdraw_azero_to_stake_event(
                Self::env().caller(),
                receiver,
                max_amount,
                Self::env().block_timestamp() 
            );

            Ok(())
        } else {
            Err(Error::CannotGetWithdrawableAmount)
        }
    }

    #[modifiers(only_owner)]
    fn withdraw_azero(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        if let Ok(max_amount) = self.get_payable_azero() {
            if amount > max_amount {
                return Err(Error::InvalidWithdrawalAmount);
            }

            if Self::env().transfer(receiver, amount).is_err() {
                return Err(Error::WithdrawError);
            }

            self._emit_withdraw_azero_event(
                receiver,
                amount,
                Self::env().block_timestamp()                
            );            

            Ok(())
        } else {
            Err(Error::CannotGetWithdrawableAmount)
        } 
    }

    #[modifiers(only_owner)]
    fn withdraw_inw(&mut self, receiver: AccountId, amount: Balance) -> Result<(), Error> {
        if let Ok(max_amount) = self.get_withdrawable_inw() {
            if amount > max_amount {
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

            self._emit_withdraw_inw_event(
                receiver,
                amount,
                Self::env().block_timestamp()                
            );

            return result;
        } else {
            Err(Error::CannotGetWithdrawableAmount)
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

    fn get_stake_info(&mut self, staker: AccountId) -> Result<Option<StakeInformation>, Error> {
        let current_time = Self::env().block_timestamp();

        if self.data::<Data>().stake_info_by_staker.get(&staker).is_some() && self.update_unclaimed_rewards(staker, current_time).is_err() {
            return Err(Error::CannotUpdateUnclaimedRewards);
        }
            
        Ok(self.data::<Data>().stake_info_by_staker.get(&staker))  
    }

    fn get_staker_list(&self) -> Vec<AccountId> {
        self.data::<Data>().staker_list.clone()
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

    fn get_waiting_withdrawal_index(&self, index: u128) -> Option<u128> {
        self.data::<Data>().withdrawal_waiting_list.get_value(1, &index)
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
    fn set_apy(&mut self, apy: Balance) -> Result<(), Error> {
        if apy == 0 {
            return Err(Error::InvalidApy);
        }

        // Update the current unclaimed_amount for all stakers
        let current_time = Self::env().block_timestamp();

        let count = self.data::<Data>().staker_list.len();
        for i in 0..count {
            let staker = self.data::<Data>().staker_list[i];

            if self.update_unclaimed_rewards(staker, current_time).is_err() {
                return Err(Error::CannotUpdateUnclaimedRewards);
            }
        }

        // Update apy
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

        // Update the current unclaimed_amount for all stakers
        let current_time = Self::env().block_timestamp();

        let count = self.data::<Data>().staker_list.len();
        for i in 0..count {
            let staker = self.data::<Data>().staker_list[i];

            if self.update_unclaimed_rewards(staker, current_time).is_err() {
                return Err(Error::CannotUpdateUnclaimedRewards);
            }
        }

        // Update inw_multiplier
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