use openbrush::{
    traits::{
        Balance,
        AccountId,
        Hash,
        ZERO_ADDRESS
    },
    storage::{
        Mapping
    }
};

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub standard_psp22_hash: Hash,
    pub token_count: u64,
    pub inw_contract: AccountId,
    pub creation_fee: Balance,
    pub token_list: Mapping<u64, AccountId>,
    pub _reserved: Option<()>
}

impl Default for Data {
    fn default() -> Self {
        Self {
            standard_psp22_hash: Default::default(),
            token_count: Default::default(),
            inw_contract: ZERO_ADDRESS.into(),
            creation_fee: Default::default(),
            token_list: Default::default(),
            _reserved: Default::default(),
        }
    }
}