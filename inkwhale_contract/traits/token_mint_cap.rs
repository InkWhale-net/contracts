use openbrush::{
    traits::{
        Balance,
        AccountId
    }
};

use openbrush::{
    contracts::traits::psp22::PSP22Error
};

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type TokenMintCapRef = dyn TokenMintCapTrait;

#[openbrush::trait_definition]
pub trait TokenMintCapTrait {
    #[ink(message)]
    #[ink(payable)]
    fn public_mint(&mut self, amount: Balance)-> Result<(), PSP22Error>;

    #[ink(message)]
    fn owner_mint(&mut self, mint_to: AccountId, amount: Balance) -> Result<(), PSP22Error>;

    #[ink(message)]
    fn set_cap(&mut self, cap: Balance) -> Result<(), PSP22Error>;

    #[ink(message)]    
    fn set_minting_fee(&mut self, minting_fee: Balance) -> Result<(), PSP22Error>;

    #[ink(message)]
    fn cap(&self) -> Balance;

    #[ink(message)]
    fn minting_cap(&self) -> Balance;

    #[ink(message)]
    fn total_minted(&self) -> Balance;

    #[ink(message)]
    fn minting_fee(&self) -> Balance;
        
    /// Withdraw Fees - only Owner
    #[ink(message)]    
    fn withdraw_fee(&mut self, value: Balance) -> Result<(), Error>;
}