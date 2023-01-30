use openbrush::{
    traits::{
        Balance,
        AccountId,
        Hash,
        String
    },
    storage::{
        Mapping
    }
};

#[derive(
    Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
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

#[derive(Default, Debug)]
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