#![allow(clippy::inline_fn_without_body)]

use crate::traits::error::Error;

#[openbrush::wrapper]
pub type UpgradeableRef = dyn UpgradeableTrait;

#[openbrush::trait_definition]
pub trait UpgradeableTrait {
    /// This function allow contract owner modifies the code which is used to execute calls to this contract address (`AccountId`).
    #[ink(message)]
    fn set_code(&mut self, code_hash: [u8; 32]) -> Result<(), Error>;
}