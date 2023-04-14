use openbrush::{
    traits::{
        AccountId,
        Balance,
        Hash,
        ZERO_ADDRESS
    },
    storage::{
        Mapping,
        MultiMapping,
        ValueGuard
    }
};

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub pool_hash: Hash,
    pub admin_address: AccountId,
    pub pool_count: u64,
    pub inw_contract: AccountId,
    pub creation_fee: Balance,
    pub unstake_fee: Balance,
    pub pool_list: Mapping<u64, AccountId>,
    pub pool_ids: MultiMapping<Option<AccountId>, u64, ValueGuard<AccountId>>,                
    pub pool_ids_last_index: Mapping<Option<AccountId>, u64>,
    pub _reserved: Option<()>
}

impl Default for Data {
    fn default() -> Self {
        Self {
            pool_hash: Default::default(),
            admin_address: ZERO_ADDRESS.into(),
            pool_count: Default::default(),
            inw_contract: ZERO_ADDRESS.into(),
            creation_fee: Default::default(),
            unstake_fee: Default::default(),
            pool_list: Default::default(),
            pool_ids: Default::default(),
            pool_ids_last_index: Default::default(),
            _reserved: Default::default(),
        }
    }
}