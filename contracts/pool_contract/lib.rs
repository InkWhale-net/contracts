#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]

pub use self::my_pool::{
    MyPool,
    MyPoolRef,
};

#[openbrush::contract]
pub mod my_pool {
    use ink::prelude::{
        vec::Vec,
    };
    use ink::env::CallFlags;

    use openbrush::{
        contracts::{
            ownable::*,
        },
        traits::{
            Storage,
        },
        modifiers
    };

    use inkwhale_project::traits::generic_pool_contract::Psp22Ref;
    use inkwhale_project::impls::{
        generic_pool_contract::*,
        upgradeable::*
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MyPool {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: generic_pool_contract::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    #[ink(event)]
    pub struct PoolStakeEvent {
        pool_contract: AccountId,
        token_contract: AccountId,
        staker: AccountId,
        amount: Balance
    }

    #[ink(event)]
    pub struct PoolUnstakeEvent {
        pool_contract: AccountId,
        token_contract: AccountId,
        staker: AccountId,
        amount: Balance
    }

    #[ink(event)]
    pub struct PoolClaimEvent {
        pool_contract: AccountId,
        token_contract: AccountId,
        staker: AccountId,
        amount: Balance
    }

    impl Ownable for MyPool {}
    impl GenericPoolContractTrait for MyPool {}
    impl UpgradeableTrait for MyPool {}

    impl MyPool {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, inw_contract: AccountId, psp22_contract_address: AccountId, max_staking_amount: Balance, apy: u32, duration: u64, start_time: u64, unstake_fee: Balance) -> Result<Self, Error> {
            let mut instance = Self::default();
                    
            instance._init_with_owner(contract_owner);
            
            match instance.create_pool(
                inw_contract,
                psp22_contract_address,
                max_staking_amount, 
                apy, 
                duration, 
                start_time, 
                unstake_fee
            ) {
                Ok(()) => Ok(instance),
                Err(e) => Err(e),
            }
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, inw_contract: AccountId, psp22_contract_address: AccountId, max_staking_amount: Balance, apy: u32, duration: u64, start_time: u64, unstake_fee: Balance
        ) -> Result<(), Error> {
            self.create_pool(
                inw_contract,
                psp22_contract_address,
                max_staking_amount, 
                apy, 
                duration, 
                start_time, 
                unstake_fee
            ) 
        }
        
        fn create_pool(&mut self, inw_contract: AccountId, psp22_contract_address: AccountId, max_staking_amount: Balance, apy: u32, duration: u64, start_time: u64, unstake_fee: Balance
        ) -> Result<(), Error> {
            if self.data.max_staking_amount > 0 {
                return Err(Error::AlreadyInit);
            }

            if max_staking_amount == 0 {
                return Err(Error::InvalidMaxStakingAmount);
            }

            if duration == 0 {
                return Err(Error::InvalidDuration);
            }

            if apy == 0 {
                return Err(Error::InvalidApy);
            }

            if start_time == 0 {
                return Err(Error::InvalidTime);
            }

            let min_reward_amount = max_staking_amount.checked_mul(duration as u128).ok_or(Error::CheckedOperations)?
                                    .checked_mul(apy as u128).ok_or(Error::CheckedOperations)?
                                    .checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
            
            // Add data
            self.data.staking_contract_address = psp22_contract_address;
            self.data.psp22_contract_address = psp22_contract_address;
            self.data.max_staking_amount = max_staking_amount;
            self.data.min_reward_amount = min_reward_amount;
            self.data.multiplier = apy as u128;
            self.data.duration = duration;
            self.data.start_time = start_time;
            self.data.unstake_fee = unstake_fee;
            self.data.inw_contract = inw_contract;
            self.data.total_unclaimed_reward = 0;
            self.data.is_topup_enough_reward = false;
            self.data.reward_pool = 0;   
            
            Ok(())
        }

        #[ink(message)]
        pub fn stake(&mut self, amount: Balance) -> Result<(), Error>  {
            if !self.data.is_topup_enough_reward {
                return Err(Error::NotTopupEnoughReward);
            }

            if amount == 0 {
                return Err(Error::NoAmount);
            }

            let end_time = self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?;
            let current_time = self.env().block_timestamp();

            // Check staking time
            if self.data.start_time > current_time || end_time < current_time {
                return Err(Error::NotTimeToStake);
            }

            // Check psp22 balance and allowance of caller 
            let caller = self.env().caller();
            let allowance = Psp22Ref::allowance(
                &self.data.psp22_contract_address,
                caller,
                self.env().account_id()
            );
            
            let balance = Psp22Ref::balance_of(
                &self.data.psp22_contract_address,
                caller
            );

            if allowance < amount || balance < amount {
                return Err(Error::InvalidBalanceAndAllowance);
            }

            // Check if total stake < max_staking_amount
            if self.data.max_staking_amount < self.data.total_staked.checked_add(amount).ok_or(Error::CheckedOperations)? {
                return Err(Error::ExceedTotalStakingAmount);
            }

            let staker = self.data.stakers.get(&caller);
            
            if let Some(mut stake_info) = staker {
                let time_length = current_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?; // ms
                let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).ok_or(Error::CheckedOperations)?;

                stake_info.staked_value = stake_info.staked_value.checked_add(amount).ok_or(Error::CheckedOperations)?;
                stake_info.last_reward_update = current_time;
                stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;
                
                // Calculate future reward
                let future_time_length = end_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?;
                let future_reward_365 = stake_info.staked_value.checked_mul(future_time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                let future_reward = future_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).ok_or(Error::CheckedOperations)?;

                // Recalculate total unclaimed amount
                self.data.total_unclaimed_reward = self.data.total_unclaimed_reward
                                                    .checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?
                                                    .checked_add(future_reward).ok_or(Error::CheckedOperations)?
                                                    .checked_sub(stake_info.future_reward).ok_or(Error::CheckedOperations)?;
                stake_info.future_reward = future_reward;

                self.data.stakers
                    .insert(&caller, &stake_info);
            } else {
                let mut stake_info = StakeInformation{
                    last_reward_update: current_time,
                    staked_value: amount,
                    unclaimed_reward: 0,
                    future_reward: 0
                };

                // Calculate future reward
                let future_time_length = end_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?;
                let future_reward_365 = stake_info.staked_value.checked_mul(future_time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                let future_reward = future_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).ok_or(Error::CheckedOperations)?;

                // Calculate total unclaimed amount
                self.data.total_unclaimed_reward = self.data.total_unclaimed_reward.checked_add(future_reward).ok_or(Error::CheckedOperations)?;
                stake_info.future_reward = future_reward;
                
                self.data.stakers
                    .insert(&caller, &stake_info);
            }            
            
            self.data.total_staked = self.data.total_staked.checked_add(amount).ok_or(Error::CheckedOperations)?;

            let builder = Psp22Ref::transfer_from_builder(
                &self.data.psp22_contract_address,
                caller,
                self.env().account_id(),
                amount,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true));
            
            let result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => {
                    Err(Error::CannotTransfer)
                }
            }; 
            
            if result.is_ok() {
                self.env().emit_event(PoolStakeEvent {
                    pool_contract: self.env().account_id(),
                    token_contract: self.data.psp22_contract_address,
                    staker: caller, 
                    amount
                });
            }

            result
        }

        #[ink(message)]
        pub fn unstake(&mut self, amount: Balance) -> Result<(), Error>  {
            if !self.data.is_topup_enough_reward {
                return Err(Error::NotTopupEnoughReward);
            }

            if amount == 0 {
                return Err(Error::NoAmount);
            }

            let caller = self.env().caller();
            let fees = self.data.unstake_fee;
            
            // Check allowance and balance of caller 
            let allowance = Psp22Ref::allowance(
                &self.data.inw_contract,
                caller,
                self.env().account_id()
            );
            
            let balance = Psp22Ref::balance_of(
                &self.data.inw_contract,
                caller
            );

            if allowance < fees || balance < fees {
                return Err(Error::InvalidBalanceAndAllowance)
            }

            if let Some(mut stake_info) = self.data.stakers.get(&caller) { 
                // Check if amount exceeds the staked value of caller                      
                if stake_info.staked_value < amount {
                    return Err(Error::InvalidUnstakedAmount);
                }

                // Collect INW as transaction Fees
                let builder = Psp22Ref::transfer_from_builder(
                    &self.data.inw_contract,
                    caller,
                    self.env().account_id(),
                    fees,
                    Vec::<u8>::new(),
                )
                .call_flags(CallFlags::default().set_allow_reentry(true));
                
                let result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => {
                        Err(Error::CannotTransfer)
                    }
                };

                if result.is_ok() {                                
                    let mut reward_time = self.env().block_timestamp();
                    if reward_time > self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?{
                        reward_time = self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?;
                    }
                    let time_length = reward_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?; // ms
                    let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                    let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;

                    stake_info.staked_value = stake_info.staked_value.checked_sub(amount).ok_or(Error::CheckedOperations)?;
                    stake_info.last_reward_update = reward_time;
                    stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

                    // Calculate future reward
                    let end_time = self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?;
                    let future_time_length = end_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?;
                    let future_reward_365 = stake_info.staked_value.checked_mul(future_time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                    let future_reward = future_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).ok_or(Error::CheckedOperations)?;

                    // Recalculate total unclaimed amount
                    self.data.total_unclaimed_reward = self.data.total_unclaimed_reward
                                                        .checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?
                                                        .checked_add(future_reward).ok_or(Error::CheckedOperations)?
                                                        .checked_sub(stake_info.future_reward).ok_or(Error::CheckedOperations)?;
                    stake_info.future_reward = future_reward;

                    self.data.stakers.insert(&caller, &stake_info);
                    self.data.total_staked = self.data.total_staked.checked_sub(amount).ok_or(Error::CheckedOperations)?;

                    // Transfer token to caller
                    let builder = Psp22Ref::transfer_builder(
                        &self.data.psp22_contract_address,
                        caller,
                        amount,
                        Vec::<u8>::new(),
                    ).call_flags(CallFlags::default().set_allow_reentry(true));
        
                    let transfer_result = match builder.try_invoke() {
                        Ok(Ok(Ok(_))) => Ok(()),
                        Ok(Ok(Err(e))) => Err(e.into()),
                        Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                        Err(ink::env::Error::NotCallable) => Ok(()),
                        _ => {
                            Err(Error::CannotTransfer)
                        }
                    };
                    
                    if transfer_result.is_ok() {
                        if Psp22Ref::burn(&self.data.inw_contract, self.env().account_id(), fees).is_err() { 
                            return Err(Error::CannotBurn);
                        }
                            
                        self.env().emit_event(PoolUnstakeEvent {
                            pool_contract: self.env().account_id(),
                            token_contract: self.data.psp22_contract_address,
                            staker: caller, 
                            amount
                        });
                    }    

                    return transfer_result;
                }
                result
            } else {
                Err(Error::NoStakerFound)
            }             
        }

        #[ink(message)]
        pub fn claim_reward(&mut self) -> Result<(), Error>  {
            if !self.data.is_topup_enough_reward {
                return Err(Error::NotTopupEnoughReward);
            }

            let caller = self.env().caller();

            if let Some(mut stake_info) = self.data.stakers.get(&caller) {                       
                let mut reward_time = self.env().block_timestamp();
                if reward_time > self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?{
                    reward_time = self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?;
                }
                let time_length = reward_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?; //second
                let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).ok_or(Error::CheckedOperations)?;
                let to_claim = stake_info.unclaimed_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

                stake_info.last_reward_update = reward_time;
                stake_info.unclaimed_reward = 0;
                stake_info.future_reward = stake_info.future_reward.checked_sub(unclaimed_reward).ok_or(Error::CheckedOperations)?; 

                self.data.stakers.insert(&caller, &stake_info);
                if to_claim > self.data.reward_pool {
                    return Err(Error::NotEnoughReward);
                }

                if to_claim == 0 {
                    return Err(Error::NoClaimAmount);
                }
                
                // Update reward pool and total unclaimed reward
                self.data.reward_pool = self.data.reward_pool.checked_sub(to_claim).ok_or(Error::CheckedOperations)?;
                self.data.total_unclaimed_reward = self.data.total_unclaimed_reward.checked_sub(to_claim).ok_or(Error::CheckedOperations)?;

                let builder = Psp22Ref::transfer_builder(
                    &self.data.psp22_contract_address,
                    caller,
                    to_claim,
                    Vec::<u8>::new(),
                ).call_flags(CallFlags::default().set_allow_reentry(true));
    
                let result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => {
                        Err(Error::CannotTransfer)
                    }
                };     
                
                if result.is_ok() {
                    self.env().emit_event(PoolClaimEvent {
                        pool_contract: self.env().account_id(),
                        token_contract: self.data.psp22_contract_address,
                        staker: caller, 
                        amount: to_claim
                    });
                }
    
                result
            } else {
                Err(Error::NoStakerFound)
            }
        }

        #[ink(message)]
        pub fn apy(&self) -> u32 {
            self.data.multiplier as u32
        }
    }
}