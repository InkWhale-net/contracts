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

    impl Ownable for MyPool {}
    impl GenericPoolContractTrait for MyPool {}
    impl UpgradeableTrait for MyPool {}

    impl MyPool {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, inw_contract: AccountId, psp22_contract_address: AccountId, max_staking_amount: Balance, apy: u32, duration: u64, start_time: u64, unstake_fee: Balance) -> Result<Self, Error> {
            // Check psp22 balance and allowance
            let mut instance = Self::default();
            let caller = instance.env().caller();

            let max_reward_amount = max_staking_amount.checked_mul(duration as u128).ok_or(Error::CheckedOperations)?
                                    .checked_mul(apy as u128).ok_or(Error::CheckedOperations)?
                                    .checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;

            let allowance = Psp22Ref::allowance(
                &psp22_contract_address,
                caller,
                instance.env().account_id()
            );

            let balance = Psp22Ref::balance_of(
                &psp22_contract_address,
                caller
            );

            if allowance < max_reward_amount || balance < max_reward_amount {
                return Err(Error::InvalidBalanceAndAllowance)
            }

            // Add data           
            instance._init_with_owner(contract_owner);
            instance.data.staking_contract_address = psp22_contract_address;
            instance.data.psp22_contract_address = psp22_contract_address;
            instance.data.max_staking_amount = max_staking_amount;
            instance.data.multiplier = apy as u128;
            instance.data.duration = duration;
            instance.data.start_time = start_time;
            instance.data.unstake_fee = unstake_fee;
            instance.data.inw_contract = inw_contract;
            instance.data.reward_pool = max_reward_amount;

            let builder = Psp22Ref::transfer_from_builder(
                &psp22_contract_address,
                caller,
                instance.env().account_id(),
                max_reward_amount,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true));
            
            match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(instance),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(instance),
                Err(ink::env::Error::NotCallable) => Ok(instance),
                _ => {
                    Err(Error::CannotTransfer)
                }
            }
        }

        #[ink(message)]
        pub fn initialize(&mut self, inw_contract: AccountId, psp22_contract_address: AccountId, max_staking_amount: Balance, apy: u32, duration: u64, start_time: u64, unstake_fee: Balance
        ) -> Result<(), Error> {
            // Check psp22 balance and allowance
            let caller = self.env().caller();

            let max_reward_amount = max_staking_amount.checked_mul(duration as u128).ok_or(Error::CheckedOperations)?
                                    .checked_mul(apy as u128).ok_or(Error::CheckedOperations)?
                                    .checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;
            
            let allowance = Psp22Ref::allowance(
                &psp22_contract_address,
                caller,
                self.env().account_id()
            );

            let balance = Psp22Ref::balance_of(
                &psp22_contract_address,
                caller
            );
            
            if allowance < max_reward_amount || balance < max_reward_amount {
                return Err(Error::InvalidBalanceAndAllowance)
            }

            // Add data
            self.data.staking_contract_address = psp22_contract_address;
            self.data.psp22_contract_address = psp22_contract_address;
            self.data.max_staking_amount = max_staking_amount;
            self.data.multiplier = apy as u128;
            self.data.duration = duration;
            self.data.start_time = start_time;
            self.data.unstake_fee = unstake_fee;
            self.data.inw_contract = inw_contract;
            self.data.reward_pool = max_reward_amount;

            let builder = Psp22Ref::transfer_from_builder(
                &self.data.psp22_contract_address,
                caller,
                self.env().account_id(),
                max_reward_amount,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true));
            
            match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => {
                    Err(Error::CannotTransfer)
                }
            }
        }   

        #[ink(message)]
        pub fn stake(&mut self, amount: Balance) -> Result<(), Error>  {
            if let Some(end_time) = self.data.start_time.checked_add(self.data.duration) {
                if self.data.start_time > self.env().block_timestamp() || end_time < self.env().block_timestamp() {
                    return Err(Error::NotTimeToStake);
                }

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

                let staker = self.data.stakers.get(&caller);
                
                if let Some(mut stake_info) = staker {
                    let time_length = self.env().block_timestamp().checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?; // ms
                    let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                    let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).ok_or(Error::CheckedOperations)?;

                    stake_info.staked_value = stake_info.staked_value.checked_add(amount).ok_or(Error::CheckedOperations)?;
                    stake_info.last_reward_update = self.env().block_timestamp();
                    stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

                    self.data.stakers
                        .insert(&caller, &stake_info);
                } else {
                    let stake_info = StakeInformation{
                        last_reward_update: self.env().block_timestamp(),
                        staked_value: amount,
                        unclaimed_reward: 0
                    };
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
                
                match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => {
                        Err(Error::CannotTransfer)
                    }
                }
            } else {
                return Err(Error::CheckedOperations)
            }
        }

        #[ink(message)]
        pub fn unstake(&mut self, amount: Balance) -> Result<(), Error>  {
            let caller = self.env().caller();
            let fees = self.data.unstake_fee;
            
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
                if Psp22Ref::burn(&self.data.inw_contract, self.env().account_id(), fees).is_ok() {
                    if let Some(mut stake_info) = self.data.stakers.get(&caller) {                       
                        if stake_info.staked_value < amount {
                            return Err(Error::InvalidUnstakedAmount);
                        }
                 
                        let mut reward_time = self.env().block_timestamp();
                        if reward_time > self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?{
                            reward_time = self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?;
                        }
                        let time_length = reward_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?; // ms
                        let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                        let unclaimed_reward = unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;

                        stake_info.staked_value = stake_info.staked_value.checked_sub(amount).ok_or(Error::CheckedOperations)?;
                        stake_info.last_reward_update = self.env().block_timestamp();
                        stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

                        self.data.stakers.insert(&caller, &stake_info);
                        self.data.total_staked = self.data.total_staked.checked_sub(amount).ok_or(Error::CheckedOperations)?;

                        let builder = Psp22Ref::transfer_from_builder(
                            &self.data.psp22_contract_address,
                            self.env().account_id(),
                            caller,
                            amount,
                            Vec::<u8>::new(),
                        )
                        .call_flags(CallFlags::default().set_allow_reentry(true));
                        
                        return match builder.try_invoke() {
                            Ok(Ok(Ok(_))) => Ok(()),
                            Ok(Ok(Err(e))) => Err(e.into()),
                            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                            Err(ink::env::Error::NotCallable) => Ok(()),
                            _ => {
                                Err(Error::CannotTransfer)
                            }
                        };
                    } else {
                        return Err(Error::NoStakerFound);
                    }
                } else {
                    return Err(Error::CannotBurn);
                } 
            }

            result
        }

        #[ink(message)]
        pub fn claim_reward(&mut self) -> Result<(), Error>  {
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

                stake_info.last_reward_update = self.env().block_timestamp();
                stake_info.unclaimed_reward = 0;

                self.data.stakers.insert(&caller, &stake_info);
                if to_claim > self.data.reward_pool {
                    return Err(Error::NotEnoughReward);
                }
                
                self.data.reward_pool = self.data.reward_pool.checked_sub(to_claim).ok_or(Error::CheckedOperations)?;

                let builder = Psp22Ref::transfer_from_builder(
                    &self.data.psp22_contract_address,
                    self.env().account_id(),
                    caller,
                    to_claim,
                    Vec::<u8>::new(),
                )
                .call_flags(CallFlags::default().set_allow_reentry(true));
                
                match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => {
                        Err(Error::CannotTransfer)
                    }
                }
            } else {
                return Err(Error::NoStakerFound);
            }
        }

        #[ink(message)]
        pub fn apy(&self) -> u32 {
            self.data.multiplier as u32
        }
    }
}