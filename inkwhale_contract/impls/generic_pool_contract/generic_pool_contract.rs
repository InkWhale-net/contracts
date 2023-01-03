pub use crate::{
    impls::generic_pool_contract::{
        data,
        data::*,
    },
    traits::{
        generic_pool_contract::*,
        error::Error
    }
};

use crate::my_pool::my_pool

use openbrush::{
    traits::{
        Storage,
        Balance,
        AccountId
    }
};

impl<T> GenericPoolContractTrait for T 
    where 
        T: Storage<Data> 
{
    default fn is_my_pool() -> bool {
        TypeId::of::<PoolGenerator>() == TypeId::of::<T>()
    }

    default fn topup_reward_pool(&mut self, amount: Balance) -> Result<(), Error> {
        let caller = Self::env().caller();
        let allowance = Psp22Ref::allowance(
            &self.data::<Data>().psp22_contract_address,
            caller,
            Self::env().account_id()
        );
        assert!(allowance >= amount);

        let balance = Psp22Ref::balance_of(
            &self.data::<Data>().psp22_contract_address,
            caller
        );
        assert!(balance >= amount,"not enough balance");

        self.data::<Data>().reward_pool = self.data::<Data>().reward_pool.checked_add(amount).unwrap();

        if !Psp22Ref::transfer_from_builder(
            &self.data::<Data>().psp22_contract_address,
            caller,
            Self::env().account_id(),
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

    default fn claim_reward(&mut self) -> Result<(), Error> {
        let caller = Self::env().caller();

        let staker = self.data::<Data>().stakers.get(caller);
        assert!(staker.is_some(),"no staker found");
        let mut stake_info = staker.unwrap();

        let mut reward_time = Self::env().block_timestamp();
        if reward_time > self.data::<Data>().start_time + self.data::<Data>().duration{
            reward_time = self.data::<Data>().start_time + self.data::<Data>().duration;
        }
        let time_length = reward_time - stake_info.last_reward_update; //second
        let unclaimed_reward_365 = (stake_info.staked_value as u128).checked_mul(time_length as u128).unwrap().checked_mul(self.data::<Data>().multiplier).unwrap();
        let unclaimed_reward = 0;
        if is_my_pool() {
            unclaimed_reward = (unclaimed_reward_365.checked_div(365 * 24 * 60 * 60 * 10000 * 1000).unwrap() ) as u128;
        } else {
            unclaimed_reward = (unclaimed_reward_365.checked_div(24 * 60 * 60 * 1000).unwrap() ) as u128;
        }
        let to_claim = stake_info.unclaimed_reward.checked_add(unclaimed_reward).unwrap();

        stake_info.last_reward_update = Self::env().block_timestamp();
        stake_info.unclaimed_reward = 0;

        self.data::<Data>().stakers.insert(&caller, &stake_info);
        assert!(to_claim <= self.data::<Data>().reward_pool, "not enough reward balance");
        self.data::<Data>().reward_pool = self.data::<Data>().reward_pool.checked_sub(to_claim as u128).unwrap();

        assert!(Psp22Ref::transfer(
            &self.data::<Data>().psp22_contract_address,
            caller,
            to_claim,
            Vec::<u8>::new()
        )
        .is_ok());

        Ok(())
    }

    default fn multiplier(&self) -> Balance {
        self.data::<Data>().multiplier.clone()
    }

    default fn duration(&self) -> u64 {
        self.data::<Data>().duration.clone()
    }

    default fn start_time(&self) -> u64 {
        self.data::<Data>().start_time.clone()
    }

    default fn reward_pool(&self) -> Balance {
        self.data::<Data>().reward_pool.clone()
    }

    default fn withdraw_reward_pool(&mut self, amount: Balance) -> Result<(), Error> {
        assert!(self.data::<Data>().start_time.checked_add(self.data::<Data>().duration).unwrap() <= Self::env().block_timestamp(),"not time to withdraw");
        assert!(amount <= self.data::<Data>().reward_pool, "not enough balance to withdraw");

        assert!(Psp22Ref::transfer(
            &self.data::<Data>().psp22_contract_address,
            Self::env().caller(),
            amount,
            Vec::<u8>::new()
        )
        .is_ok());

        Ok(())
    }

    default fn total_staked(&self) -> Balance {
        self.data::<Data>().total_staked.clone()
    }

    default fn psp22_contract_address(&self) -> AccountId {
        self.data::<Data>().psp22_contract_address.clone()
    }

    default fn unstake_fee(&self) -> Balance {
        self.data::<Data>().unstake_fee.clone()
    }

    default fn wal_contract(&self) -> AccountId {
        self.data::<Data>().wal_contract.clone()
    }

    // lp_contract_address/psp34_contract_address 
    default fn staking_contract_address(&self) -> AccountId {
        self.data::<Data>().staking_contract_address.clone()
    }

    default fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation> {
        self.data::<Data>().stakers.get(&staker)
    }
}