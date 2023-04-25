use openbrush::{
    traits::{
        AccountId,
        Balance,
        ZERO_ADDRESS
    },
    storage::{
        Mapping
    }
};

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

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

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub start_time: u64,
    pub end_time: u64,
    pub total_amount: Balance,
    pub inw_contract: AccountId,
    pub inw_price: Balance,
    pub immediate_buying_rate: u32, // scaled 10000
    pub vesting_duration: u64,
    pub end_vesting_time: u64,
    pub vesting_days: u64,
    pub total_purchased_amount: Balance,
    pub total_claimed_amount: Balance,
    pub buyers: Mapping<AccountId, BuyerInformation>,
    pub is_burned: bool,
    pub _reserved: Option<()>
}

impl Default for Data {
    fn default() -> Self {
        Self {
            start_time: Default::default(),
            end_time: Default::default(),
            total_amount: Default::default(),
            inw_contract: ZERO_ADDRESS.into(),
            inw_price: Default::default(),
            immediate_buying_rate: Default::default(),
            vesting_duration: Default::default(),
            end_vesting_time: Default::default(),
            vesting_days: Default::default(),
            total_purchased_amount: Default::default(),
            total_claimed_amount: Default::default(),
            buyers: Default::default(),
            is_burned: Default::default(),
            _reserved: Default::default()   
        }
    }
}