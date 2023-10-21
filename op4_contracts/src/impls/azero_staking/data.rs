use openbrush::{
    storage::{Mapping, MultiMapping, ValueGuard},
    traits::{AccountId, Balance},
};

use ink::prelude::{vec::Vec};

#[cfg(feature = "std")]
use ink::storage::traits::StorageLayout;

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct StakeInformation {
    pub staking_amount: Balance,
    pub unclaimed_azero_reward: Balance,				
    pub claimed_azero_reward: Balance,
    pub unclaimed_inw_reward: Balance,	
    pub claimed_inw_reward: Balance,						
    pub last_updated: u64
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct WithdrawalRequestInformation {
    pub request_index: u128,
    pub user: AccountId,
    pub amount: Balance,
    pub azero_reward: Balance,
    pub total_azero: Balance,
    pub inw_reward: Balance,
    pub request_time: u64,
    pub status: u8 // 0: waiting, 1: is claimable, 2: claimed
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct OngoingExpiredWaitingList {
    pub waiting_list: Vec<u128>,
    pub total_azero: Balance,
    pub total_inw: Balance
}

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub min_staking_amount: Balance,
    pub max_total_staking_amount: Balance,
    pub apy: Balance, // scaled 10000
    pub max_waiting_time: u64,

    pub inw_contract: AccountId,
    pub inw_multiplier: Balance, // number of inw per day
    pub unstaking_fee: Balance, // By inw

    pub stake_info_by_staker: Mapping<AccountId, StakeInformation>,
    pub staker_list: Vec<AccountId>,
    
    pub withdrawal_request_count: u128,
    pub withdrawal_request_list: Mapping<u128, WithdrawalRequestInformation>,
    pub withdrawal_request_by_user: MultiMapping<AccountId, u128, ValueGuard<AccountId>>,
    pub withdrawal_waiting_list: MultiMapping<u8, u128, ValueGuard<u8>>, // request with waiting status

    pub total_azero_claimed: Balance,
    pub total_inw_claimed: Balance,
    pub total_azero_for_waiting_withdrawals: Balance,
    pub total_inw_for_waiting_withdrawals: Balance,
    pub total_azero_reserved_for_withdrawals: Balance,
    pub total_inw_reserved_for_withdrawals: Balance,
}

impl Default for Data {
    fn default() -> Self {
        Self {
            min_staking_amount: Default::default(),
            max_total_staking_amount: Default::default(),
            apy: Default::default(),
            max_waiting_time: Default::default(),

            inw_contract: [0u8; 32].into(),
            inw_multiplier: Default::default(),
            unstaking_fee: Default::default(),

            stake_info_by_staker: Default::default(),
            staker_list: Default::default(),

            withdrawal_request_count: Default::default(),
            withdrawal_request_list: Default::default(),
            withdrawal_request_by_user: Default::default(),
            withdrawal_waiting_list: Default::default(),

            total_azero_claimed: Default::default(),
            total_inw_claimed: Default::default(),
            total_azero_for_waiting_withdrawals: Default::default(),
            total_inw_for_waiting_withdrawals: Default::default(),
            total_azero_reserved_for_withdrawals: Default::default(),
            total_inw_reserved_for_withdrawals: Default::default(),
        }
    }
}
