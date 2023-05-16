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

    #[modifiers(only_owner)]
    default fn add_multi_whitelists(
        &mut self,
        phase_id: u8,
        accounts: Vec<AccountId>,
        whitelist_amounts: Vec<Balance>,
        whitelist_prices: Vec<Balance>
    ) -> Result<(), Error> {          
        let whitelist_count = accounts.len();
        if whitelist_count == 0 ||
           whitelist_count != whitelist_amounts.len() ||
           whitelist_count != whitelist_prices.len() {
            return Err(Error::InvalidWhitelistData);            
        }  

        if self.data::<Data>().phase.get(&phase_id).is_some() {
            let mut total_amount: Balance = 0;

            for i in 0..whitelist_count {
                total_amount = total_amount.checked_add(whitelist_amounts[i]).ok_or(Error::CheckedOperations)?;
                
                self.data::<Data>().whitelist_account.insert(phase_id, &accounts[i]);
                
                let whitelist_buyer_info = WhitelistBuyerInfo {
                    amount: whitelist_amounts[i],
                    price: whitelist_prices[i],
                    purchased_amount: 0,
                    vesting_amount: 0,
                    claimed_amount: 0,
                    last_updated_time: 0
                };

                self.data::<Data>().whitelist_buyer.insert(&(&phase_id, &accounts[i]), &whitelist_buyer_info); 
            }
        
            // Add whitelist_sale_info
            let whitelist_sale_info = WhitelistSaleInfo {
                total_amount,
                total_purchased_amount: 0,
                total_claimed_amount: 0,
                is_burned: false
            };

            self.data::<Data>().whitelist_sale_info.insert(&phase_id, &whitelist_sale_info);
            
            // Transfer total_amount of token to launchpad contract
            self.topup(total_amount)
        } else {
            return Err(Error::PhaseNotExist);
        }   
    }

    // Update whitelist
    // #[modifiers(only_owner)]
    // pub fn update_multi_whitelist(
    //     &mut self,
    //     phase_id: u8,
    //     accounts: Vec<AccountId>,
    //     whitelist_amounts: Vec<Balance>,
    //     whitelist_prices: Vec<Balance>
    // ) -> Result<(), Error> {
    //     let whitelist_count = accounts.len();
    //     if whitelist_count == 0 ||
    //        whitelist_count != whitelist_amounts.len() ||
    //        whitelist_count != whitelist_prices.len() {
    //         return Err(Error::InvalidWhitelistData);            
    //     }  
        
    //     let mut total_in = 0;
    //     let mut total_out = 0;

    //     for i in 0..whitelist_count {
    //         if let Some(mut whitelist_buyer_info) = self.data::<Data>().whitelist_buyer.get(&(&phase_id, &whitelist_account)) {
    //             if let Some(mut whitelist_sale_info) = self.data::<Data>().whitelist_sale_info.get(&phase_id) {
                    
    //                 if whitelist_buyer_info.amount < whitelist_amount {

    //                 } else if whitelist_buyer_info.amount > whitelist_amount {
                    
    //                 }    
    //             } else {
    //                 return Err(Error::WhitelistSaleInfoNotExist);
    //             }    
    //         } else {
    //             return Err(Error::WhitelistNotExist);
    //         }
    //     }
    // }
}