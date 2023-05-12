pub use crate::{
    impls::launchpad_contract::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        launchpad_contract::*,
        error::Error
    }
};

use ink::prelude::{
    string::String,
    vec::Vec
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

impl<T> LaunchpadContractTrait for T 
where 
    T:  Storage<Data> + 
        Storage<ownable::Data>
{
    // Getters
    default fn get_project_info_uri(&self) -> String {
        self.data::<Data>().project_info_uri.clone()
    }

    default fn get_token_address(&self) -> AccountId {
        self.data::<Data>().token_address
    }

    default fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    default fn get_total_phase(&self) -> u8 {
        self.data::<Data>().total_phase
    }

    default fn get_phase(&self, id: u8) -> Option<PhaseInfo> {
        self.data::<Data>().phase.get(&id)
    }

    // Setters
    #[modifiers(only_owner)]
    default fn set_project_info_uri(&mut self, project_info_uri: String) -> Result<(), Error> {
        self.data::<Data>().project_info_uri = project_info_uri;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_token_address(&mut self, token_address: AccountId) -> Result<(), Error> {
        self.data::<Data>().token_address = token_address;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }

    // Funcs
    default fn topup(&mut self, amount: Balance) -> Result<(), Error> {         
        let caller = Self::env().caller();

        let allowance = Psp22Ref::allowance(
            &self.data::<Data>().token_address,
            caller,
            Self::env().account_id()
        );
        
        let balance = Psp22Ref::balance_of(
            &self.data::<Data>().token_address,
            caller
        );
        
        if allowance < amount || balance < amount {
            return Err(Error::InvalidBalanceAndAllowance)
        }

        // Transfer token to launchpad contract
        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Data>().token_address,
            caller,
            Self::env().account_id(),
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