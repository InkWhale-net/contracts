#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    contracts::traits::psp22::{
        extensions::burnable::*, 
        extensions::capped::*, 
        extensions::mintable::*,
        *
    },
    traits::{AccountId, Balance},
};

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Capped + PSP22Mintable;

#[openbrush::wrapper]
pub type InwSwapRef = dyn InwSwapTrait;

#[openbrush::trait_definition]
pub trait InwSwapTrait {
    // Event func 
    fn _emit_swap_event(&self, _user: AccountId, _amount: Balance);

    // Funcs
    #[ink(message)]
    fn swap(&mut self, amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn burn_inw_v1(&mut self, amount: Balance) -> Result<(), Error>;
    
    // Getters
    #[ink(message)]
    fn get_inw_contract_v1(&self) -> AccountId;

    #[ink(message)]
    fn get_inw_contract_v2(&self) -> AccountId;

    // Setters
    #[ink(message)]
    fn set_inw_contract_v1(&mut self, inw_contract_v1: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_inw_contract_v2(&mut self, inw_contract_v2: AccountId) -> Result<(), Error>;
}
