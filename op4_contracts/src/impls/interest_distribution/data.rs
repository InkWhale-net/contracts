use openbrush::{
    traits::AccountId
};

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub inw_contract: AccountId,
    pub azero_staking_contract: AccountId,
    pub master_account: AccountId,
    pub total_rate: u64, // 1100 ~ 11%
    pub interest_account_rate: u64 // 700 ~ 7%, the rest will for master account
}

impl Default for Data {
    fn default() -> Self {
        Self {
            inw_contract: [0u8; 32].into(),
            azero_staking_contract: [0u8; 32].into(),
            master_account: [0u8; 32].into(),
            total_rate: Default::default(),  
            interest_account_rate: Default::default()
        }
    }
}