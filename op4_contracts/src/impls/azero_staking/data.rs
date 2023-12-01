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
    pub last_updated: u64, // The latest update info, includes the view action 
    
    pub last_unclaimed_azero_reward: Balance,
    pub last_unclaimed_inw_reward: Balance,
    pub last_anchored: u64, // Not include view action, only for stake/unstake azero/claim rewards  

    pub last_rewards_claimed: u64 // Last time to claim rewards
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct WithdrawalRequestInformation {
    pub request_index: u128,
    pub user: AccountId,
    pub amount: Balance, // azero amount
    pub request_time: u64,
    pub status: u8 // 0: waiting, 1: is claimable, 2: claimed
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct OngoingExpiredWaitingList {
    pub waiting_list: Vec<u128>,
    pub total_azero: Balance,
}

#[derive(Clone, Debug, Ord, PartialOrd, Eq, PartialEq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
pub struct UnclaimedRewardAtLastTopup {
    pub azero_reward: Balance,
    pub inw_reward: Balance,
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
    pub total_withdrawal_request_claimed: Mapping<AccountId, u128>, 

    pub total_azero_staked: Balance,
    pub total_azero_claimed: Balance,
    pub total_inw_claimed: Balance,
    pub total_azero_for_waiting_withdrawals: Balance,
    pub total_azero_reserved_for_withdrawals: Balance,

    pub azero_stake_account: Balance, // Total amount of azero for staking/unstaking activites 
    pub azero_interest_account: Balance, // Total amount of azero to pay for interest  
    pub inw_interest_account: Balance, // Total amount of inw to pay for interest
    
    pub last_azero_interest_topup: u64, // Timestamp
    pub rewards_claim_waiting_duration: u64, 

    pub is_withdrawable: bool,
    pub is_locked: bool,

    pub interest_distribution_contract: AccountId
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
            total_withdrawal_request_claimed: Default::default(),

            total_azero_staked: Default::default(),
            total_azero_claimed: Default::default(),
            total_inw_claimed: Default::default(),
            total_azero_for_waiting_withdrawals: Default::default(),
            total_azero_reserved_for_withdrawals: Default::default(),

            azero_stake_account: Default::default(),
            azero_interest_account: Default::default(),
            inw_interest_account: Default::default(),

            last_azero_interest_topup: Default::default(),
            rewards_claim_waiting_duration: Default::default(), 
         
            is_withdrawable: Default::default(),
            is_locked: Default::default(),

            interest_distribution_contract: [0u8; 32].into()
        }
    }
}