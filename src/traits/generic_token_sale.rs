#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    traits::{
        Balance,
        AccountId
    },
    contracts::{
        traits::psp22::{
            extensions::{
                burnable::*,
                metadata::*,
            },
            *,
        },
    },
};

use crate::traits::error::Error;
use crate::impls::generic_token_sale::data::BuyerInformation;

// pub const CLAIMED_DURATION_UNIT: u64 = 86400000; // 1 day = 24 * 60 * 60 * 1000 ms = 86400000 ms
pub const CLAIMED_DURATION_UNIT: u64 = 300000; // 5' = 5 * 60 * 1000 ms = 300000 ms

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Metadata;

#[openbrush::wrapper]
pub type GenericTokenSaleRef = dyn GenericTokenSaleTrait;

#[openbrush::trait_definition]
pub trait GenericTokenSaleTrait {    
    // Getters 
    
    #[ink(message)]
    fn start_time(&self) -> u64;

    #[ink(message)]
    fn end_time(&self) -> u64;

    #[ink(message)]
    fn total_amount(&self) -> Balance;

    #[ink(message)]
    fn inw_contract(&self) -> AccountId;

    #[ink(message)]
    fn inw_price(&self) -> Balance;

    #[ink(message)]
    fn rate_at_tge(&self) -> u32;

    #[ink(message)]
    fn vesting_duration(&self) -> u64;

    #[ink(message)]
    fn total_purchased_amount(&self) -> Balance;

    #[ink(message)]
    fn total_claimed_amount(&self) -> Balance;

    #[ink(message)]
    fn get_buyer_info(&self, buyer: AccountId) -> Option<BuyerInformation>;
    
    #[ink(message)]
    fn is_burned(&self) -> bool;

    // Setters 

    #[ink(message)]
    fn set_start_time(&mut self, start_time: u64) -> Result<(), Error>;

    #[ink(message)]
    fn set_end_time(&mut self, end_time: u64) -> Result<(), Error>;

    #[ink(message)]
    fn set_total_amount(&mut self, total_amount: Balance) -> Result<(), Error>;
    
    #[ink(message)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_inw_price(&mut self, inw_price: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_rate_at_tge(&mut self, rate_at_tge: u32) -> Result<(), Error>;
    
    #[ink(message)]
    fn set_vesting_duration(&mut self, vesting_duration: u64) -> Result<(), Error>;
    
    // Funcs 

    #[ink(message)]
    fn purchase(&mut self, amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn claim(&mut self) -> Result<(), Error>;

    #[ink(message)]
    fn topup(&mut self, amount: Balance) -> Result<(), Error>;
    
    #[ink(message)]
    fn burn(&mut self) -> Result<(), Error>;
}