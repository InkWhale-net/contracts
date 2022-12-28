#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
pub use self::my_pool::{
    MyPool,
    MyPoolRef,
};

#[openbrush::contract]
pub mod my_pool {
    use ink_prelude::{
        vec::Vec,
    };
    use ink_env::CallFlags;
    use ink_storage::{
        traits::{
            PackedLayout,
            SpreadAllocate,
            SpreadLayout,
        },
        Mapping,
    };
    use openbrush::{
        contracts::{
            ownable::*,
            traits::psp22::*,
        },
        traits::{
            Storage,
            String,
        },
        modifiers,
    };

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        Custom(String),
        CannotTransfer
    }

    impl From<OwnableError> for Error {
        fn from(ownable: OwnableError) -> Self {
            match ownable {
                OwnableError::CallerIsNotOwner => Error::Custom(String::from("O::CallerIsNotOwner")),
                OwnableError::NewOwnerIsZero => Error::Custom(String::from("O::NewOwnerIsZero")),
            }
        }
    }

    #[derive(
        Clone, Debug, Ord, PartialOrd, Eq, PartialEq, PackedLayout, SpreadLayout, scale::Encode, scale::Decode,
    )]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct StakeInformation {
        staker: AccountId,
        last_reward_update: u64,
        staked_value: Balance,
        unclaimed_reward: Balance,
    }

    #[ink(storage)]
    #[derive(Default, SpreadAllocate, Storage)]
    pub struct MyPool {
        #[storage_field]
        ownable: ownable::Data,
        wal_contract: AccountId,
        psp22_contract_address: AccountId,
        apy: u32,
        stakers: Mapping<AccountId, StakeInformation>,
        reward_pool: Balance,
        total_staked: Balance,
        duration: u64,
        start_time: u64,
        unstake_fee: Balance
    }

    impl Ownable for MyPool {}

    #[openbrush::wrapper]
    pub type Psp22Ref = dyn PSP22;

    impl MyPool {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, wal_contract: AccountId, psp22_contract_address: AccountId, apy: u32, duration: u64, start_time: u64, unstake_fee: Balance) -> Self {
            assert!(duration > 0,"duration must > 0");
            ink_lang::codegen::initialize_contract(|instance: &mut MyPool| {
                instance._init_with_owner(contract_owner);
                instance.psp22_contract_address = psp22_contract_address;
                instance.apy = apy;
                instance.duration = duration;
                instance.start_time = start_time;
                instance.unstake_fee = unstake_fee;
                instance.wal_contract = wal_contract;
            })
        }
        #[ink(message)]
        pub fn topup_reward_pool(&mut self, amount: Balance) -> Result<(), Error>  {
            let caller = self.env().caller();
            let allowance = Psp22Ref::allowance(
                &self.psp22_contract_address,
                caller,
                self.env().account_id()
            );
            assert!(allowance >= amount);

            let balance = Psp22Ref::balance_of(
                &self.psp22_contract_address,
                caller
            );
            assert!(balance >= amount,"not enough balance");

            self.reward_pool = self.reward_pool.checked_add(amount).unwrap();

            if !Psp22Ref::transfer_from_builder(
                &self.psp22_contract_address,
                caller,
                self.env().account_id(),
                amount,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true))
            .fire()
            .is_ok()
            {
                return Err(Error::CannotTransfer)
            }
            Ok(())
        }

        #[ink(message)]
        pub fn stake(&mut self, amount: Balance) -> Result<(), Error>  {
            assert!(self.start_time <= self.env().block_timestamp(),"not time to stake");
            assert!(self.start_time.checked_add(self.duration).unwrap() >= self.env().block_timestamp(),"not time to stake");
            let caller = self.env().caller();
            let allowance = Psp22Ref::allowance(
                &self.psp22_contract_address,
                caller,
                self.env().account_id()
            );
            assert!(allowance >= amount);

            let balance = Psp22Ref::balance_of(
                &self.psp22_contract_address,
                caller
            );
            assert!(balance >= amount,"not enough balance");

            let staker = self.stakers.get(caller);
            if staker.is_none() {
                let stake_info = StakeInformation{
                    staker: caller,
                    last_reward_update: self.env().block_timestamp(),
                    staked_value: amount,
                    unclaimed_reward: 0
                };
                self.stakers
                    .insert(&caller, &stake_info);
            }else{
                //calculate Reward
                let mut stake_info = staker.unwrap();
                let time_length = self.env().block_timestamp() - stake_info.last_reward_update; //second
                let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).unwrap().checked_mul(self.apy as u128).unwrap();
                let unclaimed_reward = (unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).unwrap() ) as u128;

                stake_info.staked_value = stake_info.staked_value.checked_add(amount).unwrap();
                stake_info.last_reward_update = self.env().block_timestamp();
                stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

                self.stakers
                    .insert(&caller, &stake_info);
            }
            self.total_staked = self.total_staked.checked_add(amount).unwrap();

            if !Psp22Ref::transfer_from_builder(
                &self.psp22_contract_address,
                caller,
                self.env().account_id(),
                amount,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true))
            .fire()
            .is_ok()
            {
                return Err(Error::CannotTransfer)
            }
            Ok(())
        }
        // #[ink(message)]
        // pub fn get_rewards(&self) -> Balance {
        //     let caller = self.env().caller();
        //
        //     let staker = self.stakers.get(caller);
        //     assert!(staker.is_some(),"no staker found");
        //     let mut stake_info = staker.unwrap();
        //     let time_length = self.env().block_timestamp() - stake_info.last_reward_update; //second
        //     let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).unwrap().checked_mul(self.apy as u128).unwrap();
        //     let unclaimed_reward = (unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).unwrap() ) as u128;
        //     stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap()
        // }

        #[ink(message)]
        pub fn unstake(&mut self, amount: Balance) -> Result<(), Error>  {
            let caller = self.env().caller();
            let fees = self.unstake_fee;
            //Collect WAL as transaction Fees
            let allowance = Psp22Ref::allowance(
                &self.wal_contract,
                caller,
                self.env().account_id()
            );
            assert!(allowance >= fees);

            let balance = Psp22Ref::balance_of(
                &self.wal_contract,
                caller
            );
            assert!(balance >= fees,"not enough balance");

            if !Psp22Ref::transfer_from_builder(
                &self.wal_contract,
                caller,
                self.env().account_id(),
                fees,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true))
            .fire()
            .is_ok()
            {
                return Err(Error::CannotTransfer)
            }

            let staker = self.stakers.get(caller);
            assert!(staker.is_some(),"no staker found");
            let mut stake_info = staker.unwrap();

            assert!(stake_info.staked_value >= amount,"invalid staked amount");

            let mut reward_time = self.env().block_timestamp();
            if reward_time > self.start_time + self.duration{
                reward_time = self.start_time + self.duration;
            }
            let time_length = reward_time - stake_info.last_reward_update; //second
            let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).unwrap().checked_mul(self.apy as u128).unwrap();
            let unclaimed_reward = (unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).unwrap() ) as u128;

            stake_info.staked_value = stake_info.staked_value.checked_sub(amount).unwrap();
            stake_info.last_reward_update = self.env().block_timestamp();
            stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

            self.stakers.insert(&caller, &stake_info);
            self.total_staked = self.total_staked.checked_sub(amount).unwrap();

            assert!(Psp22Ref::transfer(
                &self.psp22_contract_address,
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

            let staker = self.stakers.get(caller);
            assert!(staker.is_some(),"no staker found");
            let mut stake_info = staker.unwrap();
            let mut reward_time = self.env().block_timestamp();
            if reward_time > self.start_time + self.duration{
                reward_time = self.start_time + self.duration;
            }
            let time_length = reward_time - stake_info.last_reward_update; //second
            let unclaimed_reward_365 = stake_info.staked_value.checked_mul(time_length as u128).unwrap().checked_mul(self.apy as u128).unwrap();
            let unclaimed_reward = (unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).unwrap() ) as u128;
            let to_claim = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

            stake_info.last_reward_update = self.env().block_timestamp();
            stake_info.unclaimed_reward = 0;

            self.stakers.insert(&caller, &stake_info);
            assert!(to_claim <= self.reward_pool, "not enough reward balance");
            self.reward_pool = self.reward_pool.checked_sub(to_claim as u128).unwrap();

            assert!(Psp22Ref::transfer(
                &self.psp22_contract_address,
                caller,
                to_claim,
                Vec::<u8>::new()
            )
            .is_ok());

            Ok(())
        }


        #[ink(message)]
        pub fn apy(&self) -> u32 {
            self.apy.clone()
        }

        #[ink(message)]
        pub fn duration(&self) -> u64 {
            self.duration.clone()
        }

        #[ink(message)]
        pub fn start_time(&self) -> u64 {
            self.start_time.clone()
        }

        // #[ink(message)]
        // pub fn current_time(&self) -> u64 {
        //     self.env().block_timestamp()
        // }

        #[ink(message)]
        pub fn reward_pool(&self) -> Balance {
            self.reward_pool.clone()
        }

        #[ink(message)]
        pub fn unstake_fee(&self) -> Balance {
            self.unstake_fee.clone()
        }

        #[ink(message)]
        pub fn wal_contract(&self) -> AccountId {
            self.wal_contract.clone()
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn withdraw_reward_pool(&mut self, amount: Balance) -> Result<(), Error>  {
            assert!(self.start_time.checked_add(self.duration).unwrap() <= self.env().block_timestamp(),"not time to withdraw");
            assert!(amount <= self.reward_pool, "not enough balance to withdraw");

            assert!(Psp22Ref::transfer(
                &self.psp22_contract_address,
                self.env().caller(),
                amount,
                Vec::<u8>::new()
            )
            .is_ok());

            Ok(())
        }

        #[ink(message)]
        pub fn total_staked(&self) -> Balance {
            self.total_staked.clone()
        }



        #[ink(message)]
        pub fn psp22_contract_address(&self) -> AccountId {
            self.psp22_contract_address.clone()
        }

        #[ink(message)]
        pub fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation> {
            self.stakers.get(&staker)
        }
    }
}
