pub use crate::{
    impls::generic_pool_contract::{data, data::Data, data::*},
    traits::{error::Error, generic_pool_contract::*},
};

use ink::prelude::{string::String, vec::Vec};

use ink::storage::traits::{AutoStorableHint, ManualKey, Storable, StorableHint};

use ink::env::CallFlags;
use openbrush::{
    contracts::{access_control::*, ownable::*},
    modifiers,
    traits::{AccountId, Balance, Storage},
};

pub trait GenericPoolContractTrait:
    Storable
    + StorableHint<ManualKey<{ STORAGE_KEY }>>
    + AutoStorableHint<ManualKey<3218979580, ManualKey<{ STORAGE_KEY }>>>
    + Storage<Data>
    + Storage<ownable::Data>
{
    // Getters

    // lp_contract_address/psp34_contract_address
    fn staking_contract_address(&self) -> AccountId {
        self.data::<Data>().staking_contract_address
    }

    fn psp22_contract_address(&self) -> AccountId {
        self.data::<Data>().psp22_contract_address
    }

    fn inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    fn multiplier(&self) -> u128 {
        self.data::<Data>().multiplier
    }

    fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation> {
        self.data::<Data>().stakers.get(&staker)
    }

    fn is_topup_enough_reward(&self) -> bool {
        self.data::<Data>().is_topup_enough_reward
    }

    fn reward_pool(&self) -> Balance {
        self.data::<Data>().reward_pool
    }

    fn total_unclaimed_reward(&self) -> Balance {
        self.data::<Data>().total_unclaimed_reward
    }

    fn max_staking_amount(&self) -> Balance {
        self.data::<Data>().max_staking_amount
    }

    fn min_reward_amount(&self) -> Balance {
        self.data::<Data>().min_reward_amount
    }

    fn total_staked(&self) -> Balance {
        self.data::<Data>().total_staked
    }

    fn duration(&self) -> u64 {
        self.data::<Data>().duration
    }

    fn start_time(&self) -> u64 {
        self.data::<Data>().start_time
    }

    fn unstake_fee(&self) -> Balance {
        self.data::<Data>().unstake_fee
    }

    // Setters

    #[modifiers(only_owner)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }

    // Rewards funcs
    fn topup_reward_pool(&mut self, amount: Balance) -> Result<(), Error> {
        if self.data::<Data>().is_topup_enough_reward {
            return Ok(());
        }

        let caller = Self::env().caller();

        let allowance = Psp22Ref::allowance(
            &self.data::<Data>().psp22_contract_address,
            caller,
            Self::env().account_id(),
        );

        let balance = Psp22Ref::balance_of(&self.data::<Data>().psp22_contract_address, caller);

        if allowance < amount || balance < amount || amount < self.data::<Data>().min_reward_amount
        {
            return Err(Error::InvalidBalanceAndAllowance);
        }

        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Data>().psp22_contract_address,
            caller,
            Self::env().account_id(),
            amount,
            Vec::<u8>::new(),
        )
        .call_flags(CallFlags::default().set_allow_reentry(true));

        let result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        };

        if result.is_ok() {
            self.data::<Data>().reward_pool = self
                .data::<Data>()
                .reward_pool
                .checked_add(amount)
                .ok_or(Error::CheckedOperations)?;
            self.data::<Data>().is_topup_enough_reward = true;
        }

        result
    }

    #[modifiers(only_owner)]
    fn withdraw_reward_pool(&mut self, amount: Balance) -> Result<(), Error> {
        let end_time = self
            .data::<Data>()
            .start_time
            .checked_add(self.data::<Data>().duration)
            .ok_or(Error::CheckedOperations)?;

        if Self::env().block_timestamp() <= end_time {
            return Err(Error::NotTimeToWithdraw);
        }

        let max_withdraw_amount = self
            .data::<Data>()
            .reward_pool
            .checked_sub(self.data::<Data>().total_unclaimed_reward)
            .ok_or(Error::CheckedOperations)?;

        if max_withdraw_amount < amount {
            return Err(Error::NotEnoughRewardToWithdraw);
        }

        self.data::<Data>().reward_pool = self
            .data::<Data>()
            .reward_pool
            .checked_sub(amount)
            .ok_or(Error::CheckedOperations)?;

        // Transfer token to caller
        let builder = Psp22Ref::transfer_builder(
            &self.data::<Data>().psp22_contract_address,
            Self::env().caller(),
            amount,
            Vec::<u8>::new(),
        )
        .call_flags(CallFlags::default().set_allow_reentry(true));

        match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        }

        // if Psp22Ref::transfer(
        //     &self.data::<Data>().psp22_contract_address,
        //     Self::env().caller(),
        //     amount,
        //     Vec::<u8>::new()
        // )
        // .is_err() {
        //     return Err(Error::CannotTransfer);
        // }

        // Ok(())
    }
}