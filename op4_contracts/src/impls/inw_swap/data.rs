use openbrush::{
    traits::AccountId
};

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub inw_contract_v1: AccountId,
    pub inw_contract_v2: AccountId,
}

impl Default for Data {
    fn default() -> Self {
        Self {
            inw_contract_v1: [0u8; 32].into(),
            inw_contract_v2: [0u8; 32].into()
        }
    }
}