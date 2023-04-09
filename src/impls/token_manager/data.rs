use openbrush::{
    traits::{
        Balance,
        AccountId,
        Hash,
        String,
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
pub struct Token {
    pub name: String,
    pub symbol: String,
    pub decimal: u8,
    pub contract_address: AccountId,
    pub creator: AccountId,
    pub mint_to: AccountId,
    pub total_supply: Balance
}

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub standard_psp22_hash: Hash,
    pub admin_address: AccountId,
    pub token_count: u64,
    pub wal_contract: AccountId,
    pub creation_fee: Balance,
    pub token_list: Mapping<u64, Token>,
    pub _reserved: Option<()>
}

impl Default for Data {
    fn default() -> Self {
        Self {
            standard_psp22_hash: Default::default(),
            admin_address: ZERO_ADDRESS.into(),
            token_count: Default::default(),
            wal_contract: ZERO_ADDRESS.into(),
            creation_fee: Default::default(),
            token_list: Default::default(),
            _reserved: Default::default(),
        }
    }
}