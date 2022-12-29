use openbrush::traits::Balance;

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Default, Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub cap: Balance,
    pub minting_fee: Balance,
    pub minting_cap: Balance,
    pub total_minted: Balance,
    pub _reserved: Option<()>
}