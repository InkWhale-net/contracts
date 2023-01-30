use openbrush::{
    traits::{
        Balance,
        AccountId,
        Hash
    },
    contracts::{
        traits::psp22::{
            *,
        },
    },
};

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22;

#[openbrush::wrapper]
pub type GenericPoolGeneratorRef = dyn GenericPoolGeneratorTrait;

#[openbrush::trait_definition]
pub trait GenericPoolGeneratorTrait {
    #[ink(message)]
    fn get_pool_by_owner(
        &self,
        contract_owner: AccountId,
        index: u64,
    ) -> u64;

    #[ink(message)]
    fn get_pool_count_by_owner(&self, contract_owner: AccountId) -> u64;

    #[ink(message)]
    fn get_pool(&self, index: u64) -> Option<AccountId>;

    #[ink(message)]
    fn get_pool_count(&self) -> u64;

    #[ink(message)]
    fn get_creation_fee(&self) -> Balance;

    #[ink(message)]
    fn get_unstake_fee(&self) -> Balance;

    #[ink(message)]
    fn get_wal_contract(&self) -> AccountId;
        
    #[ink(message)]
    fn get_pool_hash(&self) -> Hash;

    #[ink(message)]    
    fn set_pool_hash(&mut self, pool_hash: Hash) -> Result<(), Error>;

    #[ink(message)]    
    fn set_wal_contract(&mut self, wal_contract: AccountId) -> Result<(), Error>;
    
    #[ink(message)]    
    fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error>;
      
    #[ink(message)]    
    fn set_unstake_fee(&mut self, unstake_fee: Balance) -> Result<(), Error>;

    /// Withdraw Fees - only Owner
    #[ink(message)]    
    fn withdraw_fee(&mut self, value: Balance) -> Result<(), Error>;

    #[ink(message)]    
    fn withdraw_wal(&mut self, value: Balance) -> Result<(), Error>;
}