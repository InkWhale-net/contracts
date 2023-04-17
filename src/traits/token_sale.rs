#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    traits::{
        Balance,
        AccountId
    },
};

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type TokenSaleRef = dyn TokenSaleTrait;

#[openbrush::trait_definition]
pub trait TokenSaleTrait {    
    #[ink(message)]
    fn get_inw_price(&self) -> Balance;
    
    #[ink(message)]
    fn get_inw_contract(&self) -> AccountId;

    #[ink(message)]
    fn set_inw_price(&mut self, inw_price: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>;
}
