#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    traits::{
        Balance,
        AccountId
    },
    contracts::{
        traits::psp22::{
            extensions::{
                metadata::*,
                burnable::*
            },
            *,
        },
    },
};

use ink::prelude::{
    string::String,
    vec::Vec
};

use crate::impls::launchpad_contract::data::{
    PhaseInfo,
    PublicSaleInfo
};

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type Psp22Ref = dyn PSP22 + PSP22Burnable + PSP22Metadata;

#[openbrush::wrapper]
pub type LaunchpadContractRef = dyn LaunchpadContractTrait;

#[openbrush::trait_definition]
pub trait LaunchpadContractTrait {
    /// Getters

    /// Phase Info

    #[ink(message)]
    fn get_project_info_uri(&self) -> String;
    
    #[ink(message)]
    fn get_token_address(&self) -> AccountId;

    #[ink(message)]
    fn get_inw_contract(&self) -> AccountId;

    #[ink(message)]
    fn get_tx_rate(&self) -> u32;

    #[ink(message)]
    fn get_project_start_time(&self) -> u64;

    #[ink(message)]
    fn get_project_end_time(&self) -> u64;

    #[ink(message)]
    fn get_total_phase(&self) -> u8;

    #[ink(message)]
    fn get_phase(&self, phase_id: u8) -> Option<PhaseInfo>;

    #[ink(message)]
    fn get_is_active(&self, phase_id: u8) -> Option<bool>;

    #[ink(message)]
    fn get_name(&self, phase_id: u8) -> Option<String>;

    #[ink(message)]
    fn get_start_time(&self, phase_id: u8) -> Option<u64>;

    #[ink(message)]
    fn get_end_time(&self, phase_id: u8) -> Option<u64>;

    #[ink(message)]
    fn get_immediate_release_rate(&self, phase_id: u8) -> Option<u32>;

    #[ink(message)]
    fn get_vesting_duration(&self, phase_id: u8) -> Option<u64>;

    #[ink(message)]
    fn get_vesting_unit(&self, phase_id: u8) -> Option<u64>;

    /// Public sale
    
    #[ink(message)]
    fn get_public_sale_info(&self, phase_id: u8) -> Option<PublicSaleInfo>;

    #[ink(message)]
    fn get_public_sale_total_amount(&self, phase_id: u8) -> Option<Balance>;

    #[ink(message)]
    fn get_public_sale_price(&self, phase_id: u8) -> Option<Balance>;

    #[ink(message)]
    fn get_balance(&mut self) -> Result<Balance, Error>;
    
    // Setters
    #[ink(message)]
    fn set_project_info_uri(&mut self, project_info_uri: String) -> Result<(), Error>;
    
    #[ink(message)]
    fn set_token_address(&mut self, token_address: AccountId) -> Result<(), Error>;
    
    #[ink(message)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error>; 
    
    #[ink(message)]
    fn set_tx_rate(&mut self, tx_rate: u32) -> Result<(), Error>;

    #[ink(message)]
    fn set_is_active(&mut self, phase_id: u8, is_active: bool) -> Result<(), Error>;

    #[ink(message)]
    fn set_name(&mut self, phase_id: u8, name: String) -> Result<(), Error>;

    #[ink(message)]
    fn set_immediate_release_rate(&mut self, phase_id: u8, immediate_release_rate: u32) -> Result<(), Error>;

    #[ink(message)]
    fn set_vesting_duration(&mut self, phase_id: u8, vesting_duration: u64) -> Result<(), Error>;

    #[ink(message)]
    fn set_vesting_unit(&mut self, phase_id: u8, vesting_unit: u64) -> Result<(), Error>;
    
    // Funcs
    #[ink(message)]
    fn topup(&mut self, amount: Balance) -> Result<(), Error>;

    fn _emit_public_purchase_event(&self, _launchpad_contract: AccountId, _token_contract: AccountId, _buyer: AccountId, _amount: Balance);
    
    fn _emit_public_claim_event(&self, _launchpad_contract: AccountId, _token_contract: AccountId, _buyer: AccountId, _amount: Balance);

    fn _emit_whitelist_purchase_event(&self, _launchpad_contract: AccountId, _token_contract: AccountId, _buyer: AccountId, _amount: Balance);
    
    fn _emit_whitelist_claim_event(&self, _launchpad_contract: AccountId, _token_contract: AccountId, _buyer: AccountId, _amount: Balance);

    #[ink(message, payable)]
    fn public_purchase(&mut self, phase_id: u8, amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn public_claim(&mut self, phase_id: u8) -> Result<(), Error>;

    // Whitelist

    #[ink(message)]
    fn add_multi_whitelists(&mut self, phase_id: u8, accounts: Vec<AccountId>, whitelist_amounts: Vec<Balance>, whitelist_prices: Vec<Balance>) -> Result<(), Error>;

    #[ink(message)]
    fn update_multi_whitelists(&mut self, phase_id: u8, accounts: Vec<AccountId>, whitelist_amounts: Vec<Balance>, whitelist_prices: Vec<Balance>) -> Result<(), Error>;

    #[ink(message, payable)]
    fn whitelist_purchase(&mut self, phase_id: u8, amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn whitelist_claim(&mut self, phase_id: u8) -> Result<(), Error>;
}