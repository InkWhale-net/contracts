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
            _ => {
                Err(Error::CannotTransfer)
            }
        };

        result
    }    

    default fn multiplier(&self) -> Balance {
        self.data::<Data>().multiplier
    }

    default fn duration(&self) -> u64 {
        self.data::<Data>().duration
    }

    default fn start_time(&self) -> u64 {
        self.data::<Data>().start_time
    }

    default fn reward_pool(&self) -> Balance {
        self.data::<Data>().reward_pool
    }

    #[modifiers(only_owner)]
    default fn withdraw_reward_pool(&mut self, amount: Balance) -> Result<(), Error> {
        assert!(self.data::<Data>().start_time.checked_add(self.data::<Data>().duration).unwrap() <= Self::env().block_timestamp(),"not time to withdraw");
        assert!(amount <= self.data::<Data>().reward_pool, "not enough balance to withdraw");

        self.data::<Data>().reward_pool = self.data::<Data>().reward_pool.checked_sub(amount).unwrap();

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
        self.data::<Data>().total_staked
    }

    default fn psp22_contract_address(&self) -> AccountId {
        self.data::<Data>().psp22_contract_address
    }

    default fn unstake_fee(&self) -> Balance {
        self.data::<Data>().unstake_fee
    }

    default fn wal_contract(&self) -> AccountId {
        self.data::<Data>().wal_contract
    }

    // lp_contract_address/psp34_contract_address 
    default fn staking_contract_address(&self) -> AccountId {
        self.data::<Data>().staking_contract_address
    }

    default fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation> {
        self.data::<Data>().stakers.get(&staker)
    }
}