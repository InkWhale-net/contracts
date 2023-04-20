#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    traits::{
        Balance,
        AccountId
    },
    contracts::{
        traits::psp22::{
            extensions::burnable::*,
            *,
        },
    },
};

use crate::traits::error::Error;
use crate::impls::generic_token_sale::data::BuyerInformation;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable;

#[openbrush::wrapper]
pub type GenericTokenSaleRef = dyn GenericTokenSaleTrait;

#[openbrush::trait_definition]
pub trait GenericTokenSaleTrait {    
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
    fn total_purchased_amount(&self) -> Balance;

    #[ink(message)]
    fn total_claimed_amount(&self) -> Balance;

    #[ink(message)]
    fn get_buyer_info(&self, buyer: AccountId) -> Option<BuyerInformation>;
    
    #[ink(message)]
    fn purchase(&self, amount: Balance) -> Result<(), Error>;
}