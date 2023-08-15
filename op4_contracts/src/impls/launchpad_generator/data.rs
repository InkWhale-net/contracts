use openbrush::{
    contracts::access_control::*,
    storage::Mapping,
    traits::{AccountId, Balance, Hash},
};

use ink::prelude::vec::Vec;

// ADMINER RoleType = 3739740293
pub const ADMINER: RoleType = ink::selector_id!("ADMINER");

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);
#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub launchpad_hash: Hash,
    pub inw_contract: AccountId,
    pub creation_fee: Balance,
    pub tx_rate: u32, // scaled 10000
    pub launchpad_count: u64,
    pub launchpad_by_id: Mapping<u64, AccountId>,
    pub launchpad_by_owner: Mapping<AccountId, Vec<AccountId>>,
    pub active_launchpad_count: u64,
    pub is_active_launchpad: Mapping<AccountId, bool>,
    pub _reserved: Option<()>,
}

impl Default for Data {
    fn default() -> Self {
        Self {
            launchpad_hash: Default::default(),
            inw_contract: [0u8; 32].into(),
            creation_fee: Default::default(),
            tx_rate: Default::default(),
            launchpad_count: Default::default(),
            launchpad_by_id: Default::default(),
            launchpad_by_owner: Default::default(),
            active_launchpad_count: Default::default(),
            is_active_launchpad: Default::default(),
            _reserved: Default::default(),
        }
    }
}
