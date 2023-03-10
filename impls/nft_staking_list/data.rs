use openbrush::{
    contracts::{
        traits::psp34::*,
    },
    traits::AccountId,
    storage::{
        MultiMapping,
        ValueGuard
    }
};

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Default, Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub staking_list: MultiMapping<AccountId, Id, ValueGuard<AccountId>>,
    pub _reserved: Option<()>
}