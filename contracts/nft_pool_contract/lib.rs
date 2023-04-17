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
            // Check psp22 balance and allowance
            let mut instance = Self::default();
            let caller = instance.env().caller();

            let max_reward_amount = max_staking_amount.checked_mul(duration as u128).ok_or(Error::CheckedOperations)?
                                    .checked_mul(multiplier).ok_or(Error::CheckedOperations)?
                                    .checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

            let allowance = Psp22Ref::allowance(
                &psp22_contract_address,
                caller,
                instance.env().account_id()
            );

            let balance = Psp22Ref::balance_of(
                &psp22_contract_address,
                caller
            );

            assert!(allowance >= max_reward_amount || balance >= max_reward_amount, "Invalid Balance And Allowance");
            
            // Add data
            instance._init_with_owner(contract_owner);
            instance.data.staking_contract_address = psp34_contract_address;
            instance.data.psp22_contract_address = psp22_contract_address;
            instance.data.max_staking_amount = max_staking_amount;
            instance.data.multiplier = multiplier;
            instance.data.duration = duration;
            instance.data.start_time = start_time;
            instance.data.unstake_fee = unstake_fee;
            instance.data.inw_contract = inw_contract;

            Ok(instance)
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, inw_contract: AccountId, psp34_contract_address: AccountId, psp22_contract_address: AccountId, max_staking_amount: Balance, multiplier: Balance, duration: u64, start_time: u64, unstake_fee: Balance
        ) -> Result<(), Error> {
            // Check psp22 balance and allowance
            let caller = self.env().caller();

            let max_reward_amount = max_staking_amount.checked_mul(duration as u128).ok_or(Error::CheckedOperations)?
                                    .checked_mul(multiplier).ok_or(Error::CheckedOperations)?
                                    .checked_div(24 * 60 * 60 * 1000).ok_or(Error::CheckedOperations)?;

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
            self.data.staking_contract_address = psp34_contract_address;
            self.data.psp22_contract_address = psp22_contract_address;
            self.data.max_staking_amount = max_staking_amount;
            self.data.multiplier = multiplier;
            self.data.duration = duration;
            self.data.start_time = start_time;
            self.data.unstake_fee = unstake_fee;
            self.data.inw_contract = inw_contract;

            Ok(())
        }

        #[ink(message)]
        pub fn stake(&mut self, token_id: Id) -> Result<(), Error>  {
            assert!(self.data.start_time <= self.env().block_timestamp(),"not time to stake");
            assert!(self.data.start_time.checked_add(self.data.duration).unwrap() >= self.env().block_timestamp(),"not time to stake");
            let caller = self.env().caller();

            let token_owner =
                Psp34Ref::owner_of(&self.data.staking_contract_address, token_id.clone()).unwrap();
            assert!(caller == token_owner);

            let allowance = Psp34Ref::allowance(
                &self.data.staking_contract_address,
                caller,
                self.env().account_id(),
                Some(token_id.clone()),
            );
            assert!(allowance);

            self.staking_list_data.staking_list.insert(caller, &token_id);

            let staker = self.data.stakers.get(&caller);
            if let Some(mut stake_info) = staker {
                //calculate Reward
                // reward = total_NFT * staked_time_in_days * multiplier
                // 30 days reward for 1 NFT = 30 * multiplier
                let time_length = self.env().block_timestamp() - stake_info.last_reward_update; //second
                let unclaimed_reward_365 = (stake_info.staked_value).checked_mul(time_length as u128).unwrap().checked_mul(self.data.multiplier).unwrap();
                let unclaimed_reward = unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap();

                stake_info.staked_value = stake_info.staked_value.checked_add(1).unwrap();
                stake_info.last_reward_update = self.env().block_timestamp();
                stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

                self.data.stakers
                    .insert(&caller, &stake_info);
            } else {
                let stake_info = StakeInformation{
                    last_reward_update: self.env().block_timestamp(),
                    staked_value: 1,
                    unclaimed_reward: 0
                };
                self.data.stakers
                    .insert(&caller, &stake_info);
            }

            self.data.total_staked = self.data.total_staked.checked_add(1).unwrap();

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
        }

        #[ink(message)]
        pub fn unstake(&mut self, token_id: Id) -> Result<(), Error>  {
            let caller = self.env().caller();
            let fees = self.data.unstake_fee;
            //Collect INW as transaction Fees
            let allowance = Psp22Ref::allowance(
                &self.data.inw_contract,
                caller,
                self.env().account_id()
            );
            assert!(allowance >= fees);

            let balance = Psp22Ref::balance_of(
                &self.data.inw_contract,
                caller
            );
            assert!(balance >= fees,"not enough balance");

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
                    let token_owner =
                        Psp34Ref::owner_of(&self.data.staking_contract_address, token_id.clone()).unwrap();
                    assert!(self.env().account_id() == token_owner);
                    // Setp 2 - Check staker
                    assert!(self.staking_list_data.staking_list.contains_value(caller, &token_id.clone()));
                    // Step 3 - Remove token on staking_list
                    self.staking_list_data.staking_list.remove_value(caller, &token_id);

                    let staker = self.data.stakers.get(&caller);
                    assert!(staker.is_some(),"no staker found");
                    let mut stake_info = staker.unwrap();

                    assert!(stake_info.staked_value >= 1,"invalid staked amount");
                    let mut reward_time = self.env().block_timestamp();
                    if reward_time > self.data.start_time + self.data.duration{
                        reward_time = self.data.start_time + self.data.duration;
                    }
                    let time_length = reward_time - stake_info.last_reward_update; //second
                    let unclaimed_reward_365 = (stake_info.staked_value).checked_mul(time_length as u128).unwrap().checked_mul(self.data.multiplier).unwrap();
                    let unclaimed_reward = unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap();

                    stake_info.staked_value = stake_info.staked_value.checked_sub(1).unwrap();
                    stake_info.last_reward_update = self.env().block_timestamp();
                    stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

                    self.data.stakers.insert(&caller, &stake_info);
                    self.data.total_staked = self.data.total_staked.checked_sub(1).unwrap();

                    // transfer token to caller
                    assert!(Psp34Ref::transfer(
                        &self.data.staking_contract_address,
                        caller,
                        token_id.clone(),
                        Vec::<u8>::new()
                    )
                    .is_ok());
                } else {
                    return Err(Error::CannotBurn);
                } 
            }

            result
        }

        #[ink(message)]
        pub fn claim_reward(&mut self) -> Result<(), Error>  {
            let caller = self.env().caller();

            let staker = self.data.stakers.get(&caller);
            assert!(staker.is_some(),"no staker found");
            let mut stake_info = staker.unwrap();

            let mut reward_time = self.env().block_timestamp();
            if reward_time > self.data.start_time + self.data.duration{
                reward_time = self.data.start_time + self.data.duration;
            }
            let time_length = reward_time - stake_info.last_reward_update; //second
            let unclaimed_reward_365 = (stake_info.staked_value).checked_mul(time_length as u128).unwrap().checked_mul(self.data.multiplier).unwrap();
            let unclaimed_reward = unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap();
            let to_claim = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

            stake_info.last_reward_update = self.env().block_timestamp();
            stake_info.unclaimed_reward = 0;

            self.data.stakers.insert(&caller, &stake_info);
            assert!(to_claim <= self.data.reward_pool, "not enough reward balance");
            self.data.reward_pool = self.data.reward_pool.checked_sub(to_claim).unwrap();

            assert!(Psp22Ref::transfer(
                &self.data.psp22_contract_address,
                caller,
                to_claim,
                Vec::<u8>::new()
            )
            .is_ok());

            Ok(())
        }

        #[ink(message)]
        pub fn psp34_contract_address(&self) -> AccountId {
            self.data.staking_contract_address
        }
    }
}