#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    contracts::traits::psp22::{
        extensions::{burnable::*, metadata::*},
        *,
    },
    traits::{AccountId, Balance},
};

use ink::prelude::{string::String, vec::Vec};

use crate::impls::launchpad_contract::data::{
    BuyerInformation, PhaseInput, PhaseInfo, PublicSaleInfo, WhitelistBuyerInfo, WhitelistSaleInfo,
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
    fn get_total_supply(&self) -> Balance;

    #[ink(message)]
    fn get_available_token_amount(&self) -> Balance;

    #[ink(message)]
    fn get_generator_contract(&self) -> AccountId;

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
    fn get_public_sale_total_purchased_amount(&self, phase_id: u8) -> Option<Balance>;

    #[ink(message)]
    fn get_public_sale_total_claimed_amount(&self, phase_id: u8) -> Option<Balance>;

    #[ink(message)]
    fn get_public_buyer(&self, phase_id: u8, account: AccountId) -> Option<BuyerInformation>;

    #[ink(message)]
    fn get_whitelist_sale_info(&self, phase_id: u8) -> Option<WhitelistSaleInfo>;

    #[ink(message)]
    fn get_whitelist_sale_total_amount(&self, phase_id: u8) -> Option<Balance>;

    #[ink(message)]
    fn get_whitelist_sale_total_purchased_amount(&self, phase_id: u8) -> Option<Balance>;

    #[ink(message)]
    fn get_whitelist_sale_total_claimed_amount(&self, phase_id: u8) -> Option<Balance>;

    #[ink(message)]
    fn get_whitelist_account(&self, phase_id: u8, account_index: u64) -> Option<AccountId>;

    #[ink(message)]
    fn get_whitelist_account_count(&self, phase_id: u8) -> u64;

    #[ink(message)]
    fn get_whitelist_buyer(&self, phase_id: u8, account: AccountId) -> Option<WhitelistBuyerInfo>;

    #[ink(message)]
    fn get_balance(&mut self) -> Result<Balance, Error>;

    // Setters
    #[ink(message)]
    fn set_project_info_uri(&mut self, project_info_uri: String) -> Result<(), Error>;

    #[ink(message)]
    fn set_token_address(&mut self, token_address: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_total_supply(&mut self, total_supply: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_generator_contract(&mut self, generator_contract: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn set_tx_rate(&mut self, tx_rate: u32) -> Result<(), Error>;

    #[ink(message)]
    fn set_is_active(&mut self, phase_id: u8, is_active: bool) -> Result<(), Error>;

    #[ink(message)]
    fn set_name(&mut self, phase_id: u8, name: String) -> Result<(), Error>;

    #[ink(message)]
    fn set_start_and_end_time(
        &mut self,
        phase_id: u8,
        start_time: u64,
        end_time: u64,
    ) -> Result<(), Error>;

    #[ink(message)]
    fn set_immediate_release_rate(
        &mut self,
        phase_id: u8,
        immediate_release_rate: u32,
    ) -> Result<(), Error>;

    #[ink(message)]
    fn set_vesting_duration(&mut self, phase_id: u8, vesting_duration: u64) -> Result<(), Error>;

    #[ink(message)]
    fn set_vesting_unit(&mut self, phase_id: u8, vesting_unit: u64) -> Result<(), Error>;

    #[ink(message)]
    fn set_is_public(&mut self, phase_id: u8, is_public: bool) -> Result<(), Error>;

    #[ink(message)]
    fn set_public_total_amount(&mut self, phase_id: u8, total_amount: Balance)
        -> Result<(), Error>;

    #[ink(message)]
    fn set_public_sale_price(&mut self, phase_id: u8, price: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn set_phase(
        &mut self,
        phase_id: u8,
        is_active: bool,
        phase_input: PhaseInput
        // name: String,
        // start_time: u64,
        // end_time: u64,
        // immediate_release_rate: u32,
        // vesting_duration: u64,
        // vesting_unit: u64,
        // is_public: bool,
        // total_amount: Balance,
        // price: Balance,
    ) -> Result<(), Error>;

    #[ink(message)]
    fn set_multi_phases(
        &mut self,
        phase_id: Vec<u8>,
        is_active: Vec<bool>,
        phases: Vec<PhaseInput>
        // name: Vec<String>,
        // start_time: Vec<u64>,
        // end_time: Vec<u64>,
        // immediate_release_rate: Vec<u32>,
        // vesting_duration: Vec<u64>,
        // vesting_unit: Vec<u64>,
        // is_public: Vec<bool>,
        // total_amount: Vec<Balance>,
        // price: Vec<Balance>,
    ) -> Result<(), Error>;

    // Funcs
    #[ink(message)]
    fn topup(&mut self, amount: Balance) -> Result<(), Error>;

    fn _emit_public_purchase_event(
        &self,
        _launchpad_contract: AccountId,
        _token_contract: AccountId,
        _buyer: AccountId,
        _amount: Balance,
    );

    fn _emit_public_claim_event(
        &self,
        _launchpad_contract: AccountId,
        _token_contract: AccountId,
        _buyer: AccountId,
        _amount: Balance,
    );

    fn _emit_whitelist_purchase_event(
        &self,
        _launchpad_contract: AccountId,
        _token_contract: AccountId,
        _buyer: AccountId,
        _amount: Balance,
    );

    fn _emit_whitelist_claim_event(
        &self,
        _launchpad_contract: AccountId,
        _token_contract: AccountId,
        _buyer: AccountId,
        _amount: Balance,
    );

    #[ink(message, payable)]
    fn public_purchase(&mut self, phase_id: u8, amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn public_claim(&mut self, phase_id: u8) -> Result<(), Error>;

    // Whitelist

    #[ink(message)]
    fn add_multi_whitelists(
        &mut self,
        phase_id: u8,
        accounts: Vec<AccountId>,
        whitelist_amounts: Vec<Balance>,
        whitelist_prices: Vec<Balance>,
    ) -> Result<(), Error>;

    #[ink(message)]
    fn update_multi_whitelists(
        &mut self,
        phase_id: u8,
        accounts: Vec<AccountId>,
        whitelist_amounts: Vec<Balance>,
        whitelist_prices: Vec<Balance>,
    ) -> Result<(), Error>;

    #[ink(message, payable)]
    fn whitelist_purchase(&mut self, phase_id: u8, amount: Balance) -> Result<(), Error>;

    #[ink(message)]
    fn whitelist_claim(&mut self, phase_id: u8) -> Result<(), Error>;

    #[ink(message)]
    fn burn_unsold_tokens(&mut self) -> Result<(), Error>;

    #[ink(message)]
    fn withdraw_unsold_tokens(&mut self, receiver: AccountId) -> Result<(), Error>;

    #[ink(message)]
    fn withdraw(&mut self, value: Balance, receiver: AccountId) -> Result<(), Error>;
}
