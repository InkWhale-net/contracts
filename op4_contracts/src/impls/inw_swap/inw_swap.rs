pub use crate::{
    impls::inw_swap::{data, data::Data, data::*},
    traits::{error::Error, inw_swap::*},
};

use ink::prelude::vec::Vec;

use openbrush::{
    contracts::{ownable::*, psp22::*, pausable::*},
    modifiers,
    traits::{AccountId, Balance, Storage},
};

pub trait InwSwapTrait:
      Storage<Data>
    + Storage<ownable::Data>  
    + Storage<psp22::Data>
    + Storage<openbrush::contracts::psp22::extensions::capped::Data>
    + Storage<pausable::Data>
{
    // Event func
    fn _emit_swap_event(&self, _user: AccountId, _amount: Balance) {
    }

    fn _emit_swap_v2_to_v1_event(&self, _user: AccountId, _amount: Balance) {
    }
    
    // Funcs
    #[modifiers(when_not_paused)]
    fn swap(&mut self, amount: Balance) -> Result<(), Error> {
        let caller = Self::env().caller();

        // Check Inw v1 balance and allowance
        let allowance_v1 = Psp22Ref::allowance(
            &self.data::<Data>().inw_contract_v1,
            caller,
            Self::env().account_id(),
        );

        let balance_v1 = Psp22Ref::balance_of(&self.data::<Data>().inw_contract_v1, caller);

        if allowance_v1 < amount || balance_v1 < amount {
            return Err(Error::InvalidBalanceAndAllowance);
        }

        // Check if exceed cap of Inw v2
        let balance_v2 = Psp22Ref::total_supply(&self.data::<Data>().inw_contract_v2);
        let cap_v2 = Psp22Ref::cap(&self.data::<Data>().inw_contract_v2);

        if balance_v2.checked_add(amount).ok_or(Error::CheckedOperations)? > cap_v2 {
            return Err(Error::CapExceeded); 
        }  

        // Collect Inw v1
        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Data>().inw_contract_v1,
            caller,
            Self::env().account_id(),
            amount,
            Vec::<u8>::new(),
        );

        let result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        };

        if result.is_ok() {
            // Mint Inw v2
            if Psp22Ref::mint(&self.data::<Data>().inw_contract_v2, caller, amount).is_err() {
                return Err(Error::CannotMintInwV2);
            } else {
                self._emit_swap_event(caller, amount);
            }
        } else {
            return Err(Error::CannotCollectInwV1);
        }        

        Ok(())
    }

    fn swap_inw_v2_to_v1(&mut self, amount: Balance) -> Result<(), Error> {
        let caller = Self::env().caller();

        // Check Inw v2 balance and allowance
        let allowance_v2 = Psp22Ref::allowance(
            &self.data::<Data>().inw_contract_v2,
            caller,
            Self::env().account_id(),
        );

        let balance_v2 = Psp22Ref::balance_of(&self.data::<Data>().inw_contract_v2, caller);

        if allowance_v2 < amount || balance_v2 < amount {
            return Err(Error::InvalidBalanceAndAllowance);
        }
       
        // Collect Inw v2
        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Data>().inw_contract_v2,
            caller,
            Self::env().account_id(),
            amount,
            Vec::<u8>::new(),
        );

        let result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        };

        if result.is_err() {
            return Err(Error::CannotCollectInwV2);
        }

        // Transfer Inw v1 to caller
        let builder = Psp22Ref::transfer_builder(
            &self.data::<Data>().inw_contract_v1,
            caller,
            amount,
            Vec::<u8>::new(),
        );
        
        let transfer_result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        }; 

        if transfer_result.is_err() { 
            return Err(Error::CannotTransferInwV1);
        } 
                 
        // Burn Inw v2
        if Psp22Ref::burn(&self.data::<Data>().inw_contract_v2, Self::env().account_id(), amount).is_err() {
            return Err(Error::CannotBurn);
        }  
    
        // Emit event
        self._emit_swap_v2_to_v1_event(caller, amount);          

        Ok(())
    }

    #[modifiers(only_owner)]
    fn burn_inw_v1(&mut self, amount: Balance) -> Result<(), Error> {
        let balance = Psp22Ref::balance_of(&self.data::<Data>().inw_contract_v1, Self::env().account_id());

        if balance < amount {
            return Err(Error::NotEnoughBalance);
        }

        if Psp22Ref::burn(&self.data::<Data>().inw_contract_v1, Self::env().account_id(), amount).is_err() {
            return Err(Error::CannotBurn);
        }

        Ok(())
    }

    // Getters
    fn get_inw_contract_v1(&self) -> AccountId {
        self.data::<Data>().inw_contract_v1
    }

    fn get_inw_contract_v2(&self) -> AccountId {
        self.data::<Data>().inw_contract_v2
    }

    // Setters
    #[modifiers(only_owner)]
    fn set_inw_contract_v1(&mut self, inw_contract_v1: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract_v1 = inw_contract_v1;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_inw_contract_v2(&mut self, inw_contract_v2: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract_v2 = inw_contract_v2;
        Ok(())
    }     
}
