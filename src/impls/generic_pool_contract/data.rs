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
pub struct StakeInformation {
    pub last_reward_update: u64,
    pub staked_value: Balance,
    pub unclaimed_reward: Balance,
    pub future_reward: Balance
}

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub staking_contract_address: AccountId, // lp_contract_address/psp34_contract_address 
    pub psp22_contract_address: AccountId,
    pub inw_contract: AccountId,
    pub multiplier: Balance,
    pub stakers: Mapping<AccountId, StakeInformation>,
    pub is_topup_enough_reward: bool,
    pub reward_pool: Balance,
    pub total_unclaimed_reward: Balance,
    pub max_staking_amount: Balance,
    pub max_reward_amount: Balance,
    pub total_staked: Balance,
    pub duration: u64,
    pub start_time: u64,
    pub unstake_fee: Balance,
    pub _reserved: Option<()>
}

impl Default for Data {
    fn default() -> Self {
        Self {
            staking_contract_address: ZERO_ADDRESS.into(),
            psp22_contract_address: ZERO_ADDRESS.into(),
            inw_contract: ZERO_ADDRESS.into(),
            multiplier: Default::default(),
            stakers: Default::default(),
            is_topup_enough_reward: Default::default(),
            reward_pool: Default::default(),
            total_unclaimed_reward: Default::default(),
            max_staking_amount: Default::default(),
            max_reward_amount: Default::default(),
            total_staked: Default::default(),
            duration: Default::default(),
            start_time: Default::default(),
            unstake_fee: Default::default(),
            _reserved: Default::default(),
        }
    }
}
