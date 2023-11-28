pub use crate::{
    impls::interest_distribution::{data, data::Data, data::*},
    traits::{error::Error, interest_distribution::*, azero_staking::AzeroStakingRef},
};

use ink::prelude::vec::Vec;
use openbrush::{
    contracts::{access_control::*, ownable::*},
    modifiers,
    traits::{AccountId, Balance, Storage},
};

pub trait InterestDistributionTrait:
    access_control::Internal
    + access_control::MembersManager
    + Storage<access_control::Data>
    + Storage<Data>
    + Storage<ownable::Data>  
{
    #[modifiers(only_role(ADMINER))]
    fn distribute_azero(&mut self) -> Result<(), Error> {
        let total = Self::env().balance().checked_sub(Self::env().minimum_balance()).ok_or(Error::CheckedOperations)?;
        if total > 0 {
            let interest_account_amount = total.checked_mul(self.data::<Data>().interest_account_rate.into()).ok_or(Error::CheckedOperations)?
                                            .checked_div(self.data::<Data>().total_rate.into()).ok_or(Error::CheckedOperations)?;
            
            let master_account_amount = total.checked_sub(interest_account_amount).ok_or(Error::CheckedOperations)?;
        
            // Transfer to azero staking and update azero interest account 
            if interest_account_amount > 0 {                
                if Self::env().transfer(self.data::<Data>().azero_staking_contract, interest_account_amount).is_err() {
                    return Err(Error::CannotTransferToInterestAccount);
                }

                // Update azero interest account 
                let result = AzeroStakingRef::topup_azero_interest_account(&self.data::<Data>().azero_staking_contract, interest_account_amount);
                if result.is_err() {                    
                    return result;
                }
            }

            // Transfer to master account
            if master_account_amount > 0 {
                if Self::env().transfer(self.data::<Data>().master_account, master_account_amount).is_err() {
                    return Err(Error::CannotTransferToMasterAccount);
                }
            }

            Ok(())
        } else {
            return Err(Error::NoAzeroToDistribute);
        }
    }

    // From azero staking, need to check caller first
    fn distribute_inw_reward(&mut self, amount: Balance) -> Result<(), Error> {
        if Self::env().caller() != self.data::<Data>().azero_staking_contract {
            return Err(Error::NotAzeroStakingContract);
        }

        let balance = Psp22Ref::balance_of(
            &self.data::<Data>().inw_contract,
            Self::env().account_id(),
        );

        if balance < amount {
            return Err(Error::NotEnoughBalance);
        }

        // Transfer immediate tokens to caller 
        let caller = Self::env().caller();

        let builder = Psp22Ref::transfer_builder(
            &self.data::<Data>().inw_contract,
            caller,
            amount,
            Vec::<u8>::new(),
        );
        
        match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        }  
    }

    // Getters
    fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    fn get_azero_staking_contract(&self) -> AccountId {
        self.data::<Data>().azero_staking_contract
    }

    fn get_master_account(&self) -> AccountId {
        self.data::<Data>().master_account
    }

    fn get_total_rate(&self) -> u64 {
        self.data::<Data>().total_rate
    }

    fn get_interest_account_rate(&self) -> u64 {
        self.data::<Data>().interest_account_rate
    }

    fn get_azero_balance(&self) -> Balance {
        Self::env().balance()
    }

    fn get_azero_minimum_balance(&self) -> Balance {
        Self::env().minimum_balance()
    }

    // Setters
    #[modifiers(only_owner)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_azero_staking_contract(&mut self, azero_staking_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().azero_staking_contract = azero_staking_contract;
        Ok(())
    } 

    #[modifiers(only_owner)]
    fn set_master_account(&mut self, master_account: AccountId) -> Result<(), Error> {
        self.data::<Data>().master_account = master_account;
        Ok(())
    } 

    #[modifiers(only_owner)]
    fn set_total_rate(&mut self, total_rate: u64) -> Result<(), Error> {
        if total_rate == 0 || self.data::<Data>().interest_account_rate > total_rate {
            return Err(Error::InvalidTotalRate);
        }
        self.data::<Data>().total_rate = total_rate;
        Ok(())
    }   

    #[modifiers(only_owner)]
    fn set_interest_account_rate(&mut self, interest_account_rate: u64) -> Result<(), Error> {
        if interest_account_rate > self.data::<Data>().total_rate {
            return Err(Error::InvalidInterestAccountRate);
        }    
        
        self.data::<Data>().interest_account_rate = interest_account_rate;
        Ok(())
    }    
}