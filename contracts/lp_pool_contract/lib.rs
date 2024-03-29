#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]

pub use self::my_lp_pool::{
    MyLPPool,
    MyLPPoolRef,
};

#[openbrush::contract]
pub mod my_lp_pool {
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
        modifiers,
    };

    use inkwhale_project::traits::generic_pool_contract::Psp22Ref;
    use inkwhale_project::impls::{
        generic_pool_contract::*,
        admin::*,
        upgradeable::*
    };
    
    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MyLPPool {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: generic_pool_contract::data::Data,
        #[storage_field]
        admin_data: admin::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    impl Ownable for MyLPPool {}
    impl GenericPoolContractTrait for MyLPPool {}
    impl AdminTrait for MyLPPool {}
    impl UpgradeableTrait for MyLPPool {}

    impl MyLPPool {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, wal_contract: AccountId, lp_contract_address: AccountId, psp22_contract_address: AccountId, multiplier: u64, duration: u64, start_time: u64, unstake_fee: Balance) -> Self {
            assert!(multiplier > 0,"multiplier must > 0");
            assert!(duration > 0,"duration must > 0");
            let mut instance = Self::default();

            instance._init_with_owner(contract_owner);
            instance.data.staking_contract_address = lp_contract_address;
            instance.data.psp22_contract_address = psp22_contract_address;
            instance.data.multiplier = multiplier as u128;
            instance.data.duration = duration;
            instance.data.start_time = start_time;
            instance.data.unstake_fee = unstake_fee;
            instance.data.wal_contract = wal_contract;

            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, wal_contract: AccountId, lp_contract_address: AccountId, psp22_contract_address: AccountId, multiplier: u64, duration: u64, start_time: u64, unstake_fee: Balance
        ) -> Result<(), Error> {
            self.data.staking_contract_address = lp_contract_address;
            self.data.psp22_contract_address = psp22_contract_address;
            self.data.multiplier = multiplier as u128;
            self.data.duration = duration;
            self.data.start_time = start_time;
            self.data.unstake_fee = unstake_fee;
            self.data.wal_contract = wal_contract;

            Ok(())
        }

        #[ink(message)]
        pub fn stake(&mut self, amount: Balance) -> Result<(), Error>  {
            assert!(self.data.start_time <= self.env().block_timestamp(),"not time to stake");
            assert!(self.data.start_time.checked_add(self.data.duration).unwrap() >= self.env().block_timestamp(),"not time to stake");
            let caller = self.env().caller();

            let allowance = Psp22Ref::allowance(
                &self.data.staking_contract_address,
                caller,
                self.env().account_id()
            );
            assert!(allowance >= amount);

            let balance = Psp22Ref::balance_of(
                &self.data.staking_contract_address,
                caller
            );
            assert!(balance >= amount,"not enough balance");

            let staker = self.data.stakers.get(&caller);
            
            if let Some(mut stake_info) = staker {
                //calculate Reward
                // reward = total_NFT * staked_time_in_days * multiplier
                // 30 days reward for 1 NFT = 30 * multiplier
                let time_length = self.env().block_timestamp() - stake_info.last_reward_update; //second
                let unclaimed_reward_365 = (stake_info.staked_value).checked_mul(time_length as u128).unwrap().checked_mul(self.data.multiplier).unwrap().checked_div(1000000).unwrap();
                let unclaimed_reward = unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap();

                stake_info.staked_value = stake_info.staked_value.checked_add(amount).unwrap();
                stake_info.last_reward_update = self.env().block_timestamp();
                stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

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

            self.data.total_staked = self.data.total_staked.checked_add(amount).unwrap();

            if Psp22Ref::transfer_from_builder(
                &self.data.staking_contract_address,
                caller,
                self.env().account_id(),
                amount,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true))
            .fire()
            .is_err()
            {
                return Err(Error::CannotTransfer)
            }
            Ok(())
        }

        #[ink(message)]
        pub fn unstake(&mut self, amount: Balance) -> Result<(), Error>  {
            let caller = self.env().caller();
            let fees = self.data.unstake_fee;
            //Collect WAL as transaction Fees
            let allowance = Psp22Ref::allowance(
                &self.data.wal_contract,
                caller,
                self.env().account_id()
            );
            assert!(allowance >= fees);

            let balance = Psp22Ref::balance_of(
                &self.data.wal_contract,
                caller
            );
            assert!(balance >= fees,"not enough balance");

            if Psp22Ref::transfer_from_builder(
                &self.data.wal_contract,
                caller,
                self.env().account_id(),
                fees,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true))
            .fire()
            .is_err()
            {
                return Err(Error::CannotTransfer)
            }

            let staker = self.data.stakers.get(&caller);
            assert!(staker.is_some(),"no staker found");
            let mut stake_info = staker.unwrap();

            assert!(stake_info.staked_value >= amount,"invalid staked amount");
            let mut reward_time = self.env().block_timestamp();
            if reward_time > self.data.start_time + self.data.duration{
                reward_time = self.data.start_time + self.data.duration;
            }
            let time_length = reward_time - stake_info.last_reward_update; //second
            let unclaimed_reward_365 = (stake_info.staked_value).checked_mul(time_length as u128).unwrap().checked_mul(self.data.multiplier).unwrap().checked_div(1000000).unwrap();
            let unclaimed_reward = unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap();

            stake_info.staked_value = stake_info.staked_value.checked_sub(amount).unwrap();
            stake_info.last_reward_update = self.env().block_timestamp();
            stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

            self.data.stakers.insert(&caller, &stake_info);
            self.data.total_staked = self.data.total_staked.checked_sub(amount).unwrap();

            // transfer token to caller
            assert!(Psp22Ref::transfer(
                &self.data.staking_contract_address,
                caller,
                amount,
                Vec::<u8>::new()
            )
            .is_ok());

            Ok(())
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
            let unclaimed_reward_365 = (stake_info.staked_value).checked_mul(time_length as u128).unwrap().checked_mul(self.data.multiplier).unwrap().checked_div(1000000).unwrap();
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
        pub fn lp_contract_address(&self) -> AccountId {
            self.data.staking_contract_address
        }
    }
}