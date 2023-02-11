#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    contracts::{
        traits::psp34::*,
    },
    traits::AccountId
};

#[openbrush::wrapper]
pub type NftStakingListRef = dyn NftStakingListTrait;

#[openbrush::trait_definition]
pub trait NftStakingListTrait {
    #[ink(message)]
    fn get_total_staked_by_account(&self, account: AccountId) -> u64;

    #[ink(message)]
    fn get_staked_id(&self, account: AccountId, index: u64) -> Option<Id>;
}