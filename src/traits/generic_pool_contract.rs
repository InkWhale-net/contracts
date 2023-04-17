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
        traits::psp34::*,
    },
};

use crate::traits::error::Error;
use crate::impls::generic_pool_contract::data::StakeInformation;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable;

#[openbrush::wrapper]
pub type Psp34Ref = dyn PSP34;

#[openbrush::wrapper]
pub type GenericPoolContractRef = dyn GenericPoolContractTrait;

#[openbrush::trait_definition]
pub trait GenericPoolContractTrait {
    // Getters

    // lp_contract_address/psp34_contract_address 
    #[ink(message)]
    fn staking_contract_address(&self) -> AccountId; 

    #[ink(message)]
    fn psp22_contract_address(&self) -> AccountId;

    #[ink(message)]
    fn inw_contract(&self) -> AccountId;
   
    #[ink(message)]
    fn multiplier(&self) -> Balance;

    #[ink(message)]
    fn get_stake_info(&self, staker: AccountId) -> Option<StakeInformation>;

    #[ink(message)]
    fn reward_pool(&self) -> Balance;

    #[ink(message)]
    fn max_staking_amount(&self) -> Balance;

    #[ink(message)]
    fn total_staked(&self) -> Balance;

    #[ink(message)]
    fn duration(&self) -> u64;

    #[ink(message)]
    fn start_time(&self) -> u64;

    #[ink(message)]
    fn unstake_fee(&self) -> Balance;
 
    // Setters

    #[ink(message)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>;
    
    // Rewards funcs
    #[ink(message)]
    fn withdraw_reward_pool(&mut self, amount: Balance) -> Result<(), Error>;
}