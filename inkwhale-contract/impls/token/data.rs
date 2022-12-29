use openbrush::traits::String;

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Default, Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Data {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub _reserved: Option<()>
}