use openbrush::{
    storage::{
        Mapping,
    },
    traits::{
        Balance
    }
};

use ink::prelude::{
    vec::Vec,
    string::String,
};
use openbrush::{
    contracts::psp22::extensions::{
        metadata::*
    },
};

pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Manager);

#[derive(Default, Debug)]
#[openbrush::upgradeable_storage(STORAGE_KEY)]
pub struct Manager {
    pub cap: Balance,
    pub _reserved: Option<()>
}
