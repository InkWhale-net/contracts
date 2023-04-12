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

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub inw_contract: AccountId,
    pub inw_price: Balance,
    pub _reserved: Option<()>
}

impl Default for Data {
    fn default() -> Self {
        Self {
            inw_contract: ZERO_ADDRESS.into(),
            inw_price: Default::default(),
            _reserved: Default::default(),
        }
    }
}