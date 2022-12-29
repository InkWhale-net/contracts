use openbrush::{
    traits::{
        Balance,
        String
    }
};

use openbrush::{
    contracts::traits::psp22::PSP22Error
};

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type TokenRef = dyn TokenTrait;

#[openbrush::trait_definition]
pub trait TokenTrait {
    #[ink(message)]
    fn burn(&mut self, amount: Balance) -> Result<(), PSP22Error>;

    #[ink(message)]
    fn token_name(&self) -> String;

    #[ink(message)]
    fn token_symbol(&self) -> String;

    #[ink(message)]
    fn token_decimals(&self) -> u8;
}