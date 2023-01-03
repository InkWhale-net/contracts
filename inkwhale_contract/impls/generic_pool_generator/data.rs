use openbrush::{
    traits::{
        AccountId,
        Balance,
        Hash
    },
    storage::{
        Mapping,
        MultiMapping,
        ValueGuard
    }
};

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Default, Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub pool_hash: Hash,
    pub admin_address: AccountId,
    pub pool_count: u64,
    pub wal_contract: AccountId,
    pub creation_fee: Balance,
    pub unstake_fee: Balance,
    pub pool_list: Mapping<u64, AccountId>,
    pub pool_ids: MultiMapping<Option<AccountId>, u64, ValueGuard<AccountId>>,                
    pub pool_ids_last_index: Mapping<Option<AccountId>, u64>,
    pub _reserved: Option<()>
}