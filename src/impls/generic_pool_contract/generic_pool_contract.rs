pub use crate::{
    impls::generic_pool_contract::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        generic_pool_contract::*,
        error::Error
    }
};

use ink::prelude::{
    vec::Vec,
};
use ink::env::CallFlags;
use openbrush::{
    modifiers,
    contracts::ownable::*,
    traits::{
        Storage,
        Balance,
        AccountId
    }
};

impl<T> GenericPoolContractTrait for T 
where 
    T:  Storage<Data> + 
        Storage<ownable::Data>
{
    // Getters

    // lp_contract_address/psp34_contract_address 
    default fn staking_contract_address(&self) -> AccountId {
        self.data::<Data>().staking_contract_address
    }

    default fn psp22_contract_address(&self) -> AccountId {
        self.data::<Data>().psp22_contract_address
    }

    default fn inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    default fn multiplier(&self) -> Balance {
        self.data::<Data>().multiplier
    }

    default fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation> {
        self.data::<Data>().stakers.get(&staker)
    }

    default fn reward_pool(&self) -> Balance {
        self.data::<Data>().reward_pool
    }

    default fn total_unclaimed_reward(&self) -> Balance {
        self.data::<Data>().total_unclaimed_reward
    }
    
    default fn max_staking_amount(&self) -> Balance {
        self.data::<Data>().max_staking_amount
    }

    default fn total_staked(&self) -> Balance {
        self.data::<Data>().total_staked
    }

    default fn duration(&self) -> u64 {
        self.data::<Data>().duration
    }

    default fn start_time(&self) -> u64 {
        self.data::<Data>().start_time
    }   

    default fn unstake_fee(&self) -> Balance {
        self.data::<Data>().unstake_fee
    }    

    // Setters

    #[modifiers(only_owner)]
    default fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }

    // Rewards funcs 
    #[modifiers(only_owner)]
    default fn withdraw_reward_pool(&mut self, amount: Balance) -> Result<(), Error> {
        let end_time = self.data::<Data>().start_time.checked_add(self.data::<Data>().duration).ok_or(Error::CheckedOperations)?;
        
        if Self::env().block_timestamp() <= end_time {
            return Err(Error::NotTimeToWithdraw);
        }

        let max_withdraw_amount = self.data::<Data>().reward_pool.checked_sub(self.data::<Data>().total_unclaimed_reward).ok_or(Error::CheckedOperations)?;

        if max_withdraw_amount < amount {
            return Err(Error::NotEnoughRewardToWithdraw);
        }
        
        self.data::<Data>().reward_pool = self.data::<Data>().reward_pool.checked_sub(amount).ok_or(Error::CheckedOperations)?;

        // Transfer token to caller       
        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Data>().psp22_contract_address,
            Self::env().account_id(),
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
            _ => {
                Err(Error::CannotTransfer)
            }
        }
    }
}