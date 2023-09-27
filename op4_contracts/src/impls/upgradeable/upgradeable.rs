pub use crate::{
    traits::{error::Error, upgradeable::*},
};

use openbrush::{contracts::ownable::*, modifiers, traits::Storage};

pub trait UpgradeableTrait: Storage<ownable::Data> {
    #[modifiers(only_owner)]
    fn set_code(&mut self, code_hash: [u8; 32]) -> Result<(), Error> {
        ink::env::set_code_hash(&code_hash).unwrap_or_else(|err| {
            panic!(
                "Failed to `set_code_hash` to {:?} due to {:?}",
                code_hash, err
            )
        });
        Ok(())
    }
}
