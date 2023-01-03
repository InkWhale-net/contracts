use openbrush::{
    traits::{
        AccountId,
        Balance
    },
    storage::{
        Mapping
    }
};

#[derive(
    Clone, Debug, Ord, PartialOrd, Eq, PartialEq, PackedLayout, SpreadLayout, scale::Encode, scale::Decode,
)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub struct StakeInformation {
    pub last_reward_update: u64,
    pub staked_value: Balance,
    pub unclaimed_reward: Balance
}

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Default, Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub staking_contract_address: AccountId, // lp_contract_address/psp34_contract_address 
    pub psp22_contract_address: AccountId,
    pub wal_contract: AccountId,
    pub multiplier: u64,
    pub stakers: Mapping<AccountId, StakeInformation>,
    pub reward_pool: Balance,
    pub total_staked: Balance,
    pub duration: u64,
    pub start_time: u64,
    pub unstake_fee: Balance,
    pub _reserved: Option<()>
}