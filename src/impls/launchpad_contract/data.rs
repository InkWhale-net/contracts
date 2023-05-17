use openbrush::{
    traits::{
        AccountId,
        Balance,
        ZERO_ADDRESS
    },
    storage::{
        Mapping,
        TypeGuard,
        MultiMapping,
        ValueGuard
    }
};

use ink::prelude::{
    string::String,
};

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

#[derive(
    Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode,
)]
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
    pub total_vesting_units: u64
}

#[derive(
    Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct PublicSaleInfo {
    pub total_amount: Balance, 
    pub price: Balance, 
    pub total_purchased_amount: Balance,
    pub total_claimed_amount: Balance,
    pub is_burned: bool
}

#[derive(
    Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct BuyerInformation {
    pub purchased_amount: Balance,
    pub vesting_amount: Balance,
    pub claimed_amount: Balance,
    pub last_updated_time: u64
}

#[derive(
    Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct WhitelistSaleInfo {
    pub total_amount: Balance, 
    pub total_purchased_amount: Balance,
    pub total_claimed_amount: Balance,
    pub is_burned: bool
}

#[derive(
    Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct WhitelistBuyerInfo {
    pub amount: Balance, 
    pub price: Balance, 
    pub purchased_amount: Balance,
    pub vesting_amount: Balance,
    pub claimed_amount: Balance,
    pub last_updated_time: u64
}

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);
#[derive(Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    // Genernal info
    pub project_info_uri: String,
    pub token_address: AccountId,
    pub inw_contract: AccountId,
    pub tx_rate: u32,
    // Project start end time will get from phases' start, end time
    pub project_start_time: u64,
    pub project_end_time: u64,
    // Phase info
    pub total_phase: u8,
    pub phase: Mapping<u8, PhaseInfo>,
    // Phase sale
    pub public_sale_info: Mapping<u8, PublicSaleInfo>,
    pub public_buyer: Mapping<(u8, AccountId), BuyerInformation, PublicBuyerKey>,
    // Whitelist sale
    pub whitelist_sale_info: Mapping<u8, WhitelistSaleInfo>,  
    pub whitelist_account: MultiMapping<u8, AccountId, ValueGuard<u8>>, 
    pub whitelist_buyer: Mapping<(u8, AccountId), WhitelistBuyerInfo, WhitelistBuyerKey>,  

    pub _reserved: Option<()>
}

impl Default for Data {
    fn default() -> Self {
        Self {
            project_info_uri: Default::default(),
            token_address: ZERO_ADDRESS.into(),
            inw_contract: ZERO_ADDRESS.into(),
            tx_rate: Default::default(),

            project_start_time: Default::default(),
            project_end_time: Default::default(),

            total_phase: Default::default(),
            phase: Default::default(),

            public_sale_info: Default::default(),
            public_buyer: Default::default(),

            whitelist_sale_info: Default::default(),
            whitelist_account: Default::default(),
            whitelist_buyer: Default::default(),
            
            _reserved: Default::default()   
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