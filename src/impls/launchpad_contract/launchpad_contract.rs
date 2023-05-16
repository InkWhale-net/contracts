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
        if let Some(phase_info) = self.data::<Data>().phase.get(&phase_id) {
            let current_time = Self::env().block_timestamp();
            if current_time >= phase_info.end_time {
                return Err(Error::InvalidTime);
            }

            let whitelist_count = accounts.len();
            if whitelist_count == 0 ||
            whitelist_count != whitelist_amounts.len() ||
            whitelist_count != whitelist_prices.len() {
                return Err(Error::InvalidWhitelistData);            
            }  

            let mut total_amount: Balance = 0;

            for i in 0..whitelist_count {
                if self.data::<Data>().whitelist_buyer.get(&(&phase_id, &accounts[i])).is_some() {
                    return Err(Error::WhitelistBuyerInfoExist);   
                }
            
                let whitelist_buyer_info = WhitelistBuyerInfo {
                    amount: whitelist_amounts[i],
                    price: whitelist_prices[i],
                    purchased_amount: 0,
                    vesting_amount: 0,
                    claimed_amount: 0,
                    last_updated_time: 0
                };

                self.data::<Data>().whitelist_buyer.insert(&(&phase_id, &accounts[i]), &whitelist_buyer_info); 
                
                total_amount = total_amount.checked_add(whitelist_amounts[i]).ok_or(Error::CheckedOperations)?;
                self.data::<Data>().whitelist_account.insert(phase_id, &accounts[i]);     
            }
        
            // Add whitelist_sale_info
            if let Some(mut whitelist_sale_info) = self.data::<Data>().whitelist_sale_info.get(&phase_id) {
                whitelist_sale_info.total_amount = whitelist_sale_info.total_amount.checked_add(total_amount).ok_or(Error::CheckedOperations)?;

                self.data::<Data>().whitelist_sale_info.insert(&phase_id, &whitelist_sale_info);
            } else { // Add multi whitelists the first time
                let whitelist_sale_info = WhitelistSaleInfo {
                    total_amount,
                    total_purchased_amount: 0,
                    total_claimed_amount: 0,
                    is_burned: false
                };

                self.data::<Data>().whitelist_sale_info.insert(&phase_id, &whitelist_sale_info);
            }    

            // Transfer total_amount of token to launchpad contract
            // Note: Need to approve >= total amount before calling topup func
            self.topup(total_amount)
        } else {
            return Err(Error::PhaseNotExist);
        }        
    }

    #[modifiers(only_owner)]
    default fn update_multi_whitelists(
        &mut self,
        phase_id: u8,
        accounts: Vec<AccountId>,
        whitelist_amounts: Vec<Balance>,
        whitelist_prices: Vec<Balance>
    ) -> Result<(), Error> {
        if let Some(phase_info) = self.data::<Data>().phase.get(&phase_id) {
            let current_time = Self::env().block_timestamp();
            if current_time >= phase_info.end_time {
                return Err(Error::InvalidTime);
            }
            
            let whitelist_count = accounts.len();
            if  whitelist_count == 0 ||
                whitelist_count != whitelist_amounts.len() ||
                whitelist_count != whitelist_prices.len() {
                return Err(Error::InvalidWhitelistData);            
            }  
            
            let total_in = whitelist_amounts.iter().sum();
            let mut total_out: Balance = 0;

            for i in 0..whitelist_count {
                if let Some(mut whitelist_buyer_info) = self.data::<Data>().whitelist_buyer.get(&(&phase_id, &accounts[i])) {
                    // User already purchased, cannot update
                    if whitelist_buyer_info.purchased_amount > 0 {
                        return Err(Error::WhitelistBuyerPurchased);
                    }

                    // Get total out 
                    total_out = total_out.checked_add(whitelist_buyer_info.amount).ok_or(Error::CheckedOperations)?;

                    // Update new white list info
                    whitelist_buyer_info.amount = whitelist_amounts[i];
                    whitelist_buyer_info.price = whitelist_prices[i];

                    self.data::<Data>().whitelist_buyer.insert(&(&phase_id, &accounts[i]), &whitelist_buyer_info);
                } else {
                    return Err(Error::WhitelistBuyerInfoNotExist);
                }
            }

            // Update whitelist sale info total amount
            if let Some(mut whitelist_sale_info) = self.data::<Data>().whitelist_sale_info.get(&phase_id) {
                whitelist_sale_info.total_amount = whitelist_sale_info.total_amount
                                                    .checked_add(total_in).ok_or(Error::CheckedOperations)?
                                                    .checked_sub(total_out).ok_or(Error::CheckedOperations)?;

                self.data::<Data>().whitelist_sale_info.insert(&phase_id, &whitelist_sale_info);
            } else {
                return Err(Error::WhitelistSaleInfoNotExist);
            }
            
            if total_in > total_out {
                // Transfer (total_in - total_out) tokens to launchpad contract
                // Note: Need to approve >= (total_in - total_out) before calling topup func
                return self.topup(
                    total_in.checked_sub(total_out).ok_or(Error::CheckedOperations)?
                );
            } 
            
            if total_in < total_out { // Transfer (total_out - total_in) tokens to owner

                let builder = Psp22Ref::transfer_builder(
                    &self.data::<Data>().token_address,
                    Self::env().caller(),
                    total_out.checked_sub(total_in).ok_or(Error::CheckedOperations)?,
                    Vec::<u8>::new(),
                ).call_flags(CallFlags::default().set_allow_reentry(true));
    
                let result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => {
                        Err(Error::CannotTransfer)
                    }
                };
                
                return result;
            }  
            
            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }     
    }
}