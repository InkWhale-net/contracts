pub use crate::{
    impls::generic_token_sale::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        generic_token_sale::*,
        error::Error
    }
};

use ink::prelude::{
    vec::Vec,
};
use ink::env::CallFlags;

use openbrush::{
    contracts::ownable::*,
    traits::{
        Storage,
        Balance,
        AccountId
    },
    modifiers
};

impl<T> GenericTokenSaleTrait for T 
where 
    T:  Storage<Data> + 
        Storage<ownable::Data>
{
    // Getters

    default fn start_time(&self) -> u64 {
        self.data::<Data>().start_time
    }
    
    default fn end_time(&self) -> u64 {
        self.data::<Data>().end_time
    }

    default fn total_amount(&self) -> Balance {
        self.data::<Data>().total_amount
    }

    default fn inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    default fn inw_price(&self) -> Balance {
        self.data::<Data>().inw_price
    }

    default fn rate_at_tge(&self) -> u32 {
        self.data::<Data>().rate_at_tge
    }

    default fn vesting_duration(&self) -> u64 {
        self.data::<Data>().vesting_duration
    }

    default fn total_purchased_amount(&self) -> Balance {
        self.data::<Data>().total_purchased_amount
    }

    default fn total_claimed_amount(&self) -> Balance {
        self.data::<Data>().total_claimed_amount
    }

    default fn get_buyer_info(&self, buyer: AccountId) -> Option<BuyerInformation> {
        self.data::<Data>().buyers.get(&buyer)
    }

    default fn is_burned(&self) -> bool {
        self.data::<Data>().is_burned
    }

    // Setters

    #[modifiers(only_owner)]
    default fn set_start_time(&mut self, start_time: u64) -> Result<(), Error> {
        // Check time condition
        let current_time = Self::env().block_timestamp();

        if current_time >= self.data::<Data>().start_time {
            return Err(Error::InvalidTime);
        }

        self.data::<Data>().start_time = start_time;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_end_time(&mut self, end_time: u64) -> Result<(), Error> {
        // Check time condition
        let current_time = Self::env().block_timestamp();

        if current_time > self.data::<Data>().end_time || current_time > end_time || end_time <= self.data::<Data>().start_time {
            return Err(Error::InvalidTime);
        }

        self.data::<Data>().end_time = end_time;
        self.data::<Data>().end_vesting_time = end_time.checked_add(self.data::<Data>().vesting_duration).ok_or(Error::CheckedOperations)?;

        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_total_amount(&mut self, total_amount: Balance) -> Result<(), Error> {
        // Check time condition
        let current_time = Self::env().block_timestamp();

        if current_time >= self.data::<Data>().start_time {
            return Err(Error::InvalidTime);
        }

        self.data::<Data>().total_amount = total_amount;
         
        Ok(())
    }
   
    #[modifiers(only_owner)]
    default fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        // Check time condition
        let current_time = Self::env().block_timestamp();

        if current_time >= self.data::<Data>().start_time {
            return Err(Error::InvalidTime);
        }

        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_inw_price(&mut self, inw_price: Balance) -> Result<(), Error> {
        // Check time condition
        let current_time = Self::env().block_timestamp();
        
        if current_time >= self.data::<Data>().start_time {
            return Err(Error::InvalidTime);
        }
        
        self.data::<Data>().inw_price = inw_price;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_rate_at_tge(&mut self, rate_at_tge: u32) -> Result<(), Error> {
        // Check time condition
        let current_time = Self::env().block_timestamp();

        if current_time >= self.data::<Data>().start_time {
            return Err(Error::InvalidTime);
        }

        self.data::<Data>().rate_at_tge = rate_at_tge;
        
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_vesting_duration(&mut self, vesting_duration: u64) -> Result<(), Error> {
        // Check time condition
        let current_time = Self::env().block_timestamp();

        if current_time >= self.data::<Data>().end_time {
            return Err(Error::InvalidTime);
        }

        self.data::<Data>().vesting_duration = vesting_duration;
        self.data::<Data>().end_vesting_time = self.data::<Data>().end_time.checked_add(vesting_duration).ok_or(Error::CheckedOperations)?;
        
        self.data::<Data>().vesting_days = self.data::<Data>().vesting_duration.checked_div(CLAIMED_DURATION_UNIT).ok_or(Error::CheckedOperations)?;  
        if self.data::<Data>().vesting_days.checked_mul(CLAIMED_DURATION_UNIT).ok_or(Error::CheckedOperations)? < self.data::<Data>().vesting_duration {
            self.data::<Data>().vesting_days = self.data::<Data>().vesting_days.checked_add(1).ok_or(Error::CheckedOperations)?;
        }
        
        Ok(())
    }

    // Funcs 
    
    default fn purchase(&mut self, amount: Balance) -> Result<(), Error> {
        // Check purchased time
        let current_time = Self::env().block_timestamp();
       
        if self.data::<Data>().start_time > current_time || self.data::<Data>().end_time < current_time {
            return Err(Error::NotTimeToPurchase);
        }

        // Check amount to buy
        if self.data::<Data>().total_purchased_amount.checked_add(amount).ok_or(Error::CheckedOperations)? > self.data::<Data>().total_amount {
            return Err(Error::InvalidBuyAmount);
        }
        
        // Check if transfer enough AZERO
        let decimal = Psp22Ref::token_decimals(&self.data::<Data>().inw_contract);
        let price = self.data::<Data>().inw_price
                    .checked_mul(amount).ok_or(Error::CheckedOperations)?
                    .checked_div(10_u128.pow(decimal as u32)).ok_or(Error::CheckedOperations)?;

        if price > Self::env().transferred_value() {
            return Err(Error::InvalidTransferAmount)
        }

        // Save data
        let caller = Self::env().caller();
        let buyer_data = self.data::<Data>().buyers.get(&caller);
        
        if let Some(mut buy_info) = buyer_data {
            buy_info.purchased_amount = buy_info.purchased_amount.checked_add(amount).ok_or(Error::CheckedOperations)?;        
            
            self.data::<Data>().buyers
                .insert(&caller, &buy_info);
        } else {
            let buy_info = BuyerInformation{
                purchased_amount: amount,
                claimed_amount: 0,
                last_updated_time: 0,
            };

            self.data::<Data>().buyers
                .insert(&caller, &buy_info);
        }

        self.data::<Data>().total_purchased_amount = self.data::<Data>().total_purchased_amount.checked_add(amount).ok_or(Error::CheckedOperations)?;

        Ok(())
    }

    default fn get_unclaimed_amount(&mut self) -> Result<Balance, Error> {
        // Check claim time
        let current_time = Self::env().block_timestamp();
       
        if self.data::<Data>().end_time >= current_time {
            return Err(Error::NotTimeToClaim);
        }

        let caller = Self::env().caller();
        let buyer_data = self.data::<Data>().buyers.get(&caller);

        if let Some(mut buy_info) = buyer_data {
            // Check if have unclaimed token
            if buy_info.purchased_amount == buy_info.claimed_amount {
                return Err(Error::NoClaimAmount);
            }

            let mut claim = 0;

            // If it is the last claim
            if current_time >= self.data::<Data>().end_vesting_time {
                claim = buy_info.purchased_amount.checked_sub(buy_info.claimed_amount).ok_or(Error::CheckedOperations)?;
            
                // buy_info.last_updated_time = self.data::<Data>().end_vesting_time;
            } else {
                // If haven't claimed anytime
                if buy_info.claimed_amount == 0 {
                    claim = buy_info.purchased_amount
                            .checked_mul(self.data::<Data>().rate_at_tge as u128).ok_or(Error::CheckedOperations)?
                            .checked_div(10000).ok_or(Error::CheckedOperations)?;
                
                    buy_info.last_updated_time = self.data::<Data>().end_time; 
                }

                // If still have unclaimed token
                if self.data::<Data>().rate_at_tge < 10000 && self.data::<Data>().vesting_days > 0 {
                    let days = (current_time.checked_sub(buy_info.last_updated_time).ok_or(Error::CheckedOperations)?)
                            .checked_div(CLAIMED_DURATION_UNIT).ok_or(Error::CheckedOperations)?; 

                    let total = buy_info.purchased_amount.checked_sub(claim).ok_or(Error::CheckedOperations)?; // Subtract amount at tge       
                    
                    claim = claim.checked_add(
                                total.checked_mul(days as u128).ok_or(Error::CheckedOperations)?
                                    .checked_div(self.data::<Data>().vesting_days as u128).ok_or(Error::CheckedOperations)?
                            ).ok_or(Error::CheckedOperations)?;          
                            
                    // buy_info.last_updated_time = buy_info.last_updated_time.checked_add(
                    //                                     days.checked_mul(CLAIMED_DURATION_UNIT).ok_or(Error::CheckedOperations)?
                    //                                 ).ok_or(Error::CheckedOperations)?;
                }
            }
            
            Ok(claim)
        } else {
            return Err(Error::NoTokenPurchased);
        }
    }

    default fn claim(&mut self) -> Result<(), Error> {
        // Check claim time
        let current_time = Self::env().block_timestamp();
       
        if self.data::<Data>().end_time >= current_time {
            return Err(Error::NotTimeToClaim);
        }

        let caller = Self::env().caller();
        let buyer_data = self.data::<Data>().buyers.get(&caller);

        if let Some(mut buy_info) = buyer_data {
            // Check if have unclaimed token
            if buy_info.purchased_amount == buy_info.claimed_amount {
                return Err(Error::NoClaimAmount);
            }

            let mut claim = 0;

            // If it is the last claim
            if current_time >= self.data::<Data>().end_vesting_time {
                claim = buy_info.purchased_amount.checked_sub(buy_info.claimed_amount).ok_or(Error::CheckedOperations)?;
            
                buy_info.last_updated_time = self.data::<Data>().end_vesting_time;
            } else {
                // If haven't claimed anytime
                if buy_info.claimed_amount == 0 {
                    claim = buy_info.purchased_amount
                            .checked_mul(self.data::<Data>().rate_at_tge as u128).ok_or(Error::CheckedOperations)?
                            .checked_div(10000).ok_or(Error::CheckedOperations)?;
                
                    buy_info.last_updated_time = self.data::<Data>().end_time; 
                }

                // If still have unclaimed token
                if self.data::<Data>().rate_at_tge < 10000 && self.data::<Data>().vesting_days > 0 {
                    let days = (current_time.checked_sub(buy_info.last_updated_time).ok_or(Error::CheckedOperations)?)
                            .checked_div(CLAIMED_DURATION_UNIT).ok_or(Error::CheckedOperations)?; 

                    let total = buy_info.purchased_amount.checked_sub(claim).ok_or(Error::CheckedOperations)?; // Subtract amount at tge       
                    
                    claim = claim.checked_add(
                                total.checked_mul(days as u128).ok_or(Error::CheckedOperations)?
                                    .checked_div(self.data::<Data>().vesting_days as u128).ok_or(Error::CheckedOperations)?
                            ).ok_or(Error::CheckedOperations)?;          
                            
                    buy_info.last_updated_time = buy_info.last_updated_time.checked_add(
                                                        days.checked_mul(CLAIMED_DURATION_UNIT).ok_or(Error::CheckedOperations)?
                                                    ).ok_or(Error::CheckedOperations)?;
                }
            }

            // Check if contract has enough token to transfer
            let balance = Psp22Ref::balance_of(
                &self.data::<Data>().inw_contract,
                Self::env().account_id()
            );

            if balance < claim {
                return Err(Error::NotEnoughBalance);
            }
            
            // Transfer token to caller 
            let builder = Psp22Ref::transfer_builder(
                &self.data::<Data>().inw_contract,
                caller,
                claim,
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

            if result.is_err() {
                return result;
                // return Err(Error::CannotTransfer);
            }

            // Save data
            buy_info.claimed_amount = buy_info.claimed_amount.checked_add(claim).ok_or(Error::CheckedOperations)?;
          
            self.data::<Data>().buyers.insert(&caller, &buy_info);
            self.data::<Data>().total_claimed_amount = self.data::<Data>().total_claimed_amount.checked_add(claim).ok_or(Error::CheckedOperations)?;

            Ok(())
        } else {
            return Err(Error::NoTokenPurchased);
        }
    }

    #[modifiers(only_owner)]
    default fn topup(&mut self, amount: Balance) -> Result<(), Error> {
        if amount != self.data::<Data>().total_amount {
            return Err(Error::InvalidTopupAmount)
        }
        
        let caller = Self::env().caller();

        let allowance = Psp22Ref::allowance(
            &self.data::<Data>().inw_contract,
            caller,
            Self::env().account_id()
        );
        
        let balance = Psp22Ref::balance_of(
            &self.data::<Data>().inw_contract,
            caller
        );
        
        if allowance < amount || balance < amount {
            return Err(Error::InvalidBalanceAndAllowance)
        }

        // Transfer INW to token sale contract
        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Data>().inw_contract,
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
    default fn burn(&mut self) -> Result<(), Error> {
        // Check if burnt or not
        if self.data::<Data>().is_burned {
            return Err(Error::AlreadyBurnt);
        } 

        // Check burning time
        let current_time = Self::env().block_timestamp();
       
        if self.data::<Data>().end_time >= current_time {
            return Err(Error::NotTimeToBurn);
        }

        // Check the unsold and burn
        if self.data::<Data>().total_purchased_amount < self.data::<Data>().total_amount {
            let amount = self.data::<Data>().total_amount.checked_sub(self.data::<Data>().total_purchased_amount).ok_or(Error::CheckedOperations)?;
            
            // Burn the unsold token
            if Psp22Ref::burn(&self.data::<Data>().inw_contract, Self::env().account_id(), amount).is_err() {
                return Err(Error::CannotBurn);
            } 

            self.data::<Data>().is_burned = true;
        }

        Ok(())
    }

    #[modifiers(only_owner)]
    default fn get_balance(&mut self) -> Result<Balance, Error> {
        Ok(Self::env().balance())
    }
}