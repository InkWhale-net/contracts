#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
pub use self::my_nft_pool::{
    MyNFTPool,
    MyNFTPoolRef,
};

#[openbrush::contract]
pub mod my_nft_pool {
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
            traits::psp34::*,
        },
        storage::{
            MultiMapping,
            ValueGuard,
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
        last_reward_update: u64,
        staked_value: u64,
        unclaimed_reward: Balance,
    }

    #[ink(storage)]
    #[derive(Default, SpreadAllocate, Storage)]
    pub struct MyNFTPool {
        #[storage_field]
        ownable: ownable::Data,
        psp34_contract_address: AccountId,
        psp22_contract_address: AccountId,
        wal_contract: AccountId,
        multiplier: Balance,
        stakers: Mapping<AccountId, StakeInformation>,
        staking_list: MultiMapping<AccountId, Id, ValueGuard<AccountId>>,
        reward_pool: Balance,
        total_staked: u64,
        duration: u64,
        start_time: u64,
        unstake_fee: Balance
    }

    impl Ownable for MyNFTPool {}

    #[openbrush::wrapper]
    pub type Psp22Ref = dyn PSP22;

    #[openbrush::wrapper]
    pub type Psp34Ref = dyn PSP34;

    impl MyNFTPool {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, wal_contract: AccountId, psp34_contract_address: AccountId, psp22_contract_address: AccountId, multiplier: Balance, duration: u64, start_time: u64, unstake_fee: Balance) -> Self {
            assert!(multiplier > 0,"multiplier must > 0");
            assert!(duration > 0,"duration must > 0");
            ink_lang::codegen::initialize_contract(|instance: &mut MyNFTPool| {
                instance._init_with_owner(contract_owner);
                instance.psp34_contract_address = psp34_contract_address;
                instance.psp22_contract_address = psp22_contract_address;
                instance.multiplier = multiplier;
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
        pub fn stake(&mut self, token_id: Id) -> Result<(), Error>  {
            assert!(self.start_time <= self.env().block_timestamp(),"not time to stake");
            assert!(self.start_time.checked_add(self.duration).unwrap() >= self.env().block_timestamp(),"not time to stake");
            let caller = self.env().caller();

            let token_owner =
                Psp34Ref::owner_of(&self.psp34_contract_address, token_id.clone()).unwrap();
            assert!(caller == token_owner);

            let allowance = Psp34Ref::allowance(
                &self.psp34_contract_address,
                caller,
                self.env().account_id(),
                Some(token_id.clone()),
            );
            assert!(allowance);

            self.staking_list.insert(caller, &token_id.clone());

            let staker = self.stakers.get(caller);
            if staker.is_none() {
                let stake_info = StakeInformation{
                    last_reward_update: self.env().block_timestamp(),
                    staked_value: 1,
                    unclaimed_reward: 0
                };
                self.stakers
                    .insert(&caller, &stake_info);
            }else{
                //calculate Reward
                // reward = total_NFT * staked_time_in_days * multiplier
                // 30 days reward for 1 NFT = 30 * multiplier
                let mut stake_info = staker.unwrap();
                let time_length = self.env().block_timestamp() - stake_info.last_reward_update; //second
                let unclaimed_reward_365 = (stake_info.staked_value as u128).checked_mul(time_length as u128).unwrap().checked_mul(self.multiplier).unwrap();
                let unclaimed_reward = (unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap() ) as u128;

                stake_info.staked_value = stake_info.staked_value.checked_add(1).unwrap();
                stake_info.last_reward_update = self.env().block_timestamp();
                stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

                self.stakers
                    .insert(&caller, &stake_info);
            }
            self.total_staked = self.total_staked.checked_add(1).unwrap();

            if !PSP34Ref::transfer_builder(
                &self.psp34_contract_address,
                self.env().account_id(),
                token_id,
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
        pub fn unstake(&mut self, token_id: Id) -> Result<(), Error>  {
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

            let token_owner =
                Psp34Ref::owner_of(&self.psp34_contract_address, token_id.clone()).unwrap();
            assert!(self.env().account_id() == token_owner);
            // Setp 2 - Check staker
            assert_eq!(self.staking_list.contains_value(caller, &token_id.clone()), true);
            // Step 3 - Remove token on staking_list
            self.staking_list.remove_value(caller, &token_id);

            let staker = self.stakers.get(caller);
            assert!(staker.is_some(),"no staker found");
            let mut stake_info = staker.unwrap();

            assert!(stake_info.staked_value >= 1,"invalid staked amount");
            let mut reward_time = self.env().block_timestamp();
            if reward_time > self.start_time + self.duration{
                reward_time = self.start_time + self.duration;
            }
            let time_length = reward_time - stake_info.last_reward_update; //second
            let unclaimed_reward_365 = (stake_info.staked_value as u128).checked_mul(time_length as u128).unwrap().checked_mul(self.multiplier).unwrap();
            let unclaimed_reward = (unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap() ) as u128;

            stake_info.staked_value = stake_info.staked_value.checked_sub(1).unwrap();
            stake_info.last_reward_update = self.env().block_timestamp();
            stake_info.unclaimed_reward = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

            self.stakers.insert(&caller, &stake_info);
            self.total_staked = self.total_staked.checked_sub(1).unwrap();

            // transfer token to caller
            assert!(Psp34Ref::transfer(
                &self.psp34_contract_address,
                caller,
                token_id.clone(),
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
            let unclaimed_reward_365 = (stake_info.staked_value as u128).checked_mul(time_length as u128).unwrap().checked_mul(self.multiplier).unwrap();
            let unclaimed_reward = (unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap() ) as u128;
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
        pub fn multiplier(&self) -> Balance {
            self.multiplier.clone()
        }

        #[ink(message)]
        pub fn get_total_staked_by_account(&self, account: AccountId) -> u64 {
            return self.staking_list.count(account) as u64;
        }

        #[ink(message)]
        pub fn get_staked_id(&self, account: AccountId, index: u64) -> Option<Id> {
            return self.staking_list.get_value(account, &(index as u128));
        }

        #[ink(message)]
        pub fn duration(&self) -> u64 {
            self.duration.clone()
        }

        #[ink(message)]
        pub fn start_time(&self) -> u64 {
            self.start_time.clone()
        }

        #[ink(message)]
        pub fn reward_pool(&self) -> Balance {
            self.reward_pool.clone()
        }

        // /// Transfer NFT token
        // #[ink(message)]
        // #[modifiers(only_owner)]
        // pub fn tranfer_nft(&mut self, token_id: Id, receiver: AccountId) -> Result<(), Error> {
        //     assert!(Psp34Ref::transfer(
        //         &self.psp34_contract_address,
        //         receiver,
        //         token_id.clone(),
        //         Vec::<u8>::new()
        //     )
        //     .is_ok());
        //     Ok(())
        // }

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
        pub fn total_staked(&self) -> u64 {
            self.total_staked.clone()
        }

        #[ink(message)]
        pub fn psp22_contract_address(&self) -> AccountId {
            self.psp22_contract_address.clone()
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
        pub fn psp34_contract_address(&self) -> AccountId {
            self.psp34_contract_address.clone()
        }

        #[ink(message)]
        pub fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation> {
            self.stakers.get(&staker)
        }
    }
}
