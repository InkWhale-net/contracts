#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]

pub use self::my_nft_pool::{
    MyNFTPool,
    MyNFTPoolRef,
};

#[openbrush::contract]
pub mod my_nft_pool {
    use ink::prelude::{
        vec::Vec,
    };
    use ink::env::CallFlags;

    use openbrush::{
        contracts::{
            ownable::*,
            traits::psp34::*,
        },
        traits::{
            Storage,
        },
        modifiers
    };

    use inkwhale_project::traits::generic_pool_contract::Psp22Ref;
    use inkwhale_project::traits::generic_pool_contract::Psp34Ref;
    use inkwhale_project::impls::{
        generic_pool_contract::*,
        nft_staking_list::*,
        upgradeable::*
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MyNFTPool {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: generic_pool_contract::data::Data,
        #[storage_field]
        staking_list_data: nft_staking_list::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    impl Ownable for MyNFTPool {}
    impl GenericPoolContractTrait for MyNFTPool {}
    impl NftStakingListTrait for MyNFTPool {}
    impl UpgradeableTrait for MyNFTPool {}

    impl MyNFTPool {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, inw_contract: AccountId, psp34_contract_address: AccountId, psp22_contract_address: AccountId, max_staking_amount: Balance, multiplier: Balance, duration: u64, start_time: u64, unstake_fee: Balance) -> Result<Self, Error> {
            let mut instance = Self::default();

            let min_reward_amount = max_staking_amount.checked_mul(duration as u128).ok_or(Error::CheckedOperations)?
                                    .checked_mul(multiplier).ok_or(Error::CheckedOperations)?
                                    .checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

            // Add data
            instance._init_with_owner(contract_owner);
            instance.data.staking_contract_address = psp34_contract_address;
            instance.data.psp22_contract_address = psp22_contract_address;
            instance.data.max_staking_amount = max_staking_amount;
            instance.data.min_reward_amount = min_reward_amount;
            instance.data.multiplier = multiplier;
            instance.data.duration = duration;
            instance.data.start_time = start_time;
            instance.data.unstake_fee = unstake_fee;
            instance.data.inw_contract = inw_contract;
            instance.data.total_unclaimed_reward = 0;
            instance.data.is_topup_enough_reward = false;
            instance.data.reward_pool = 0;

            Ok(instance)
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, inw_contract: AccountId, psp34_contract_address: AccountId, psp22_contract_address: AccountId, max_staking_amount: Balance, multiplier: Balance, duration: u64, start_time: u64, unstake_fee: Balance
        ) -> Result<(), Error> {
            let min_reward_amount = max_staking_amount.checked_mul(duration as u128).ok_or(Error::CheckedOperations)?
                                    .checked_mul(multiplier).ok_or(Error::CheckedOperations)?
                                    .checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

            // Add data
            self.data.staking_contract_address = psp34_contract_address;
            self.data.psp22_contract_address = psp22_contract_address;
            self.data.max_staking_amount = max_staking_amount;
            self.data.min_reward_amount = min_reward_amount;
            self.data.multiplier = multiplier;
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
        pub fn stake(&mut self, token_id: Id) -> Result<(), Error>  {
            if !self.data.is_topup_enough_reward {
                return Err(Error::NotTopupEnoughReward);
            }

            let end_time = self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?;
            let current_time = self.env().block_timestamp();
            
            // Check staking time
            if self.data.start_time > current_time || end_time < current_time {
                return Err(Error::NotTimeToStake);
            }

            let caller = self.env().caller();
            if let Some(token_owner) = Psp34Ref::owner_of(&self.data.staking_contract_address, token_id.clone()) {
                // Check token owner
                if caller != token_owner {
                    return Err(Error::NotTokenOwner);
                }

                // Check allowance
                if !Psp34Ref::allowance(
                        &self.data.staking_contract_address,
                        caller,
                        self.env().account_id(),
                        Some(token_id.clone())) {
                    return Err(Error::AllowanceNotSet);
                }

                // Check if total stake < max_staking_amount
                if self.data.max_staking_amount <= self.data.total_staked {
                    return Err(Error::ExceedTotalStakingAmount);
                }

                self.staking_list_data.staking_list.insert(caller, &token_id);

                let staker = self.data.stakers.get(&caller);
                if let Some(mut stake_info) = staker {
                    //calculate Reward
                    // reward = total_NFT * staked_time_in_days * multiplier
                    // 30 days reward for 1 NFT = 30 * multiplier
                    let time_length = current_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?; //second
                    let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                    let unclaimed_reward = unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

                    stake_info.staked_value = stake_info.staked_value.checked_add(1).ok_or(Error::CheckedOperations)?;
                    stake_info.last_reward_update = current_time;
                    stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

                    // Calculate future reward
                    let future_time_length = end_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?;
                    let future_reward_365 = stake_info.staked_value.checked_mul(future_time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                    let future_reward = future_reward_365.checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

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
                        staked_value: 1,
                        unclaimed_reward: 0,
                        future_reward: 0
                    };

                    // Calculate future reward
                    let future_time_length = end_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?;
                    let future_reward_365 = stake_info.staked_value.checked_mul(future_time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                    let future_reward = future_reward_365.checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

                    // Calculate total unclaimed amount
                    self.data.total_unclaimed_reward = self.data.total_unclaimed_reward.checked_add(future_reward).ok_or(Error::CheckedOperations)?;
                    stake_info.future_reward = future_reward;

                    self.data.stakers
                        .insert(&caller, &stake_info);
                }

                self.data.total_staked = self.data.total_staked.checked_add(1).ok_or(Error::CheckedOperations)?;

                let builder = PSP34Ref::transfer_builder(
                    &self.data.staking_contract_address,
                    self.env().account_id(),
                    token_id,
                    Vec::<u8>::new(),
                )
                .call_flags(CallFlags::default().set_allow_reentry(true));

                match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    // Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => {
                        Err(Error::CannotTransfer)
                    }
                }
            } else {
                Err(Error::NoTokenOwner)
            }
        }

        #[ink(message)]
        pub fn unstake(&mut self, token_id: Id) -> Result<(), Error>  {
            if !self.data.is_topup_enough_reward {
                return Err(Error::NotTopupEnoughReward);
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
            
            if let Some(token_owner) = Psp34Ref::owner_of(&self.data.staking_contract_address, token_id.clone()) {
                // Step 1 - Check token owner
                if self.env().account_id() != token_owner {
                    return Err(Error::NotTokenOwner);
                }  
                // Step 2 - Check staker
                if !self.staking_list_data.staking_list.contains_value(caller, &token_id.clone()) {
                    return Err(Error::TokenNotFound);
                }
                // Step 3 - Remove token on staking_list
                self.staking_list_data.staking_list.remove_value(caller, &token_id);
            
                if let Some(mut stake_info) = self.data.stakers.get(&caller) {
                    // Check if there is any staked token
                    if stake_info.staked_value < 1 {
                        return Err(Error::UserNotStake);
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
                        let unclaimed_reward_365 = (stake_info.staked_value).checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                        let unclaimed_reward = unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

                        stake_info.staked_value = stake_info.staked_value.checked_sub(1).ok_or(Error::CheckedOperations)?;
                        stake_info.last_reward_update = reward_time;
                        stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

                        // Calculate future reward
                        let end_time = self.data.start_time.checked_add(self.data.duration).ok_or(Error::CheckedOperations)?;
                        let future_time_length = end_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?;
                        let future_reward_365 = stake_info.staked_value.checked_mul(future_time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                        let future_reward = future_reward_365.checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

                        // Recalculate total unclaimed amount
                        self.data.total_unclaimed_reward = self.data.total_unclaimed_reward
                                                            .checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?
                                                            .checked_add(future_reward).ok_or(Error::CheckedOperations)?
                                                            .checked_sub(stake_info.future_reward).ok_or(Error::CheckedOperations)?;
                        stake_info.future_reward = future_reward;

                        self.data.stakers.insert(&caller, &stake_info);
                        self.data.total_staked = self.data.total_staked.checked_sub(1).ok_or(Error::CheckedOperations)?;

                        // Transfer token to caller
                        if Psp34Ref::transfer(
                            &self.data.staking_contract_address,
                            caller,
                            token_id.clone(),
                            Vec::<u8>::new(),
                        )
                        .is_err() {
                            return Err(Error::CannotTransfer)
                        }
                        
                        if Psp22Ref::burn(&self.data.inw_contract, self.env().account_id(), fees).is_err() { 
                            return Err(Error::CannotBurn);
                        }                     
                        return Ok(());                    
                    }                    
                    result
                } else {
                    Err(Error::NoStakerFound)
                }      
            } else {
                Err(Error::NoTokenOwner)
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
                let time_length = reward_time.checked_sub(stake_info.last_reward_update).ok_or(Error::CheckedOperations)?; // ms
                let unclaimed_reward_365 = (stake_info.staked_value).checked_mul(time_length as u128).ok_or(Error::CheckedOperations)?.checked_mul(self.data.multiplier).ok_or(Error::CheckedOperations)?;
                let unclaimed_reward = unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;
                let to_claim = stake_info.unclaimed_reward.checked_add(unclaimed_reward).ok_or(Error::CheckedOperations)?;

                stake_info.last_reward_update = reward_time;
                stake_info.unclaimed_reward = 0;

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
    
                match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => {
                        Err(Error::CannotTransfer)
                    }
                }
                         
                // if Psp22Ref::transfer(
                //     &self.data.psp22_contract_address,
                //     caller,
                //     to_claim,
                //     Vec::<u8>::new(),
                // ).is_err() {
                //     return Err(Error::CannotTransfer);
                // }                
                // Ok(())                
            } else {
                Err(Error::NoStakerFound)
            }
        }

        #[ink(message)]
        pub fn psp34_contract_address(&self) -> AccountId {
            self.data.staking_contract_address
        }
    }
}