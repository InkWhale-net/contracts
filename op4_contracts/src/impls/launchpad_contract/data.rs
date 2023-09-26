use openbrush::{
    contracts::access_control::*,
    storage::{Mapping, MultiMapping, TypeGuard, ValueGuard},
    traits::{AccountId, Balance},
};

use ink::prelude::string::String;

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct PhaseInput {
    pub name: String,
    pub start_time: u64,
    pub end_time: u64,
    pub immediate_release_rate: u32, // scaled 10000
    pub vesting_duration: u64,
    pub vesting_unit: u64,
    pub is_public: bool,
    pub public_amount: Balance,
    pub public_price: Balance
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct PhaseInfo {
    pub is_active: bool,
    pub name: String,
    pub start_time: u64,
    pub end_time: u64,
    pub immediate_release_rate: u32, // scaled 10000
    pub vesting_duration: u64,
    pub end_vesting_time: u64,
    pub vesting_unit: u64,
    pub total_vesting_units: u64,
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct PublicSaleInfo {
    pub is_public: bool,
    pub total_amount: Balance,
    pub price: Balance,
    pub total_purchased_amount: Balance,
    pub total_claimed_amount: Balance,
    pub is_burned: bool,
    pub is_withdrawn: bool,
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct BuyerInformation {
    pub purchased_amount: Balance,
    pub vesting_amount: Balance,
    pub claimed_amount: Balance,
    pub last_updated_time: u64,
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct WhitelistSaleInfo {
    pub total_amount: Balance,
    pub total_purchased_amount: Balance,
    pub total_claimed_amount: Balance,
    pub is_burned: bool,
    pub is_withdrawn: bool,
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct WhitelistBuyerInfo {
    pub amount: Balance,
    pub price: Balance,
    pub purchased_amount: Balance,
    pub vesting_amount: Balance,
    pub claimed_amount: Balance,
    pub last_updated_time: u64,
}

// ADMINER RoleType = 3739740293
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);
#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    // Genernal info
    pub project_info_uri: String,
    pub token_address: AccountId,
    pub total_supply: Balance,
    pub available_token_amount: Balance,
    pub generator_contract: AccountId,
    pub tx_rate: u32,
    // Project start end time will get from phases' start, end time
    pub project_start_time: u64,
    pub project_end_time: u64,
    // Phase info
    pub total_phase: u8,
    pub phase: Mapping<u8, PhaseInfo>,
    // Public sale
    pub public_sale_info: Mapping<u8, PublicSaleInfo>,
    pub public_buyer: Mapping<(u8, AccountId), BuyerInformation, PublicBuyerKey>,
    // Whitelist sale
    pub whitelist_sale_info: Mapping<u8, WhitelistSaleInfo>,
    pub whitelist_account: MultiMapping<u8, AccountId, ValueGuard<u8>>,
    pub whitelist_buyer: Mapping<(u8, AccountId), WhitelistBuyerInfo, WhitelistBuyerKey>,

    pub _reserved: Option<()>,
}

impl Default for Data {
    fn default() -> Self {
        Self {
            project_info_uri: Default::default(),
            token_address: [0u8; 32].into(),
            total_supply: Default::default(),
            available_token_amount: Default::default(),
            generator_contract: [0u8; 32].into(),
            tx_rate: Default::default(),

            project_start_time: Default::default(), // Only for sale, not distribute token
            project_end_time: Default::default(),   // Only for sale, not distribute token

            total_phase: Default::default(),
            phase: Default::default(),

            public_sale_info: Default::default(),
            public_buyer: Default::default(),

            whitelist_sale_info: Default::default(),
            whitelist_account: Default::default(),
            whitelist_buyer: Default::default(),

            _reserved: Default::default(),
        }
    }
}

pub struct PublicBuyerKey;
impl<'a> TypeGuard<'a> for PublicBuyerKey {
    type Type = &'a (&'a u8, &'a AccountId);
}

pub struct WhitelistBuyerKey;
impl<'a> TypeGuard<'a> for WhitelistBuyerKey {
    type Type = &'a (&'a u8, &'a AccountId);
}
