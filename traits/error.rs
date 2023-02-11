#![allow(clippy::inline_fn_without_body)]

use openbrush::{
    contracts::traits::{
        psp22::PSP22Error,
        psp34::PSP34Error
    },
    contracts::ownable::*
};

use openbrush::traits::String;

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Error {
    Custom(String),
    PSP22Error(PSP22Error),
    PSP34Error(PSP34Error),
    OwnableError(OwnableError),
    CannotTransfer,
    NotEnoughBalance,
    WithdrawFeeError,
    WithdrawNFTError,
    WithdrawPSP22Error
}

impl From<OwnableError> for Error {
    fn from(ownable: OwnableError) -> Self {
        Error::OwnableError(ownable)
    }
}

impl From<PSP22Error> for Error {
    fn from(error: PSP22Error) -> Self {
        Error::PSP22Error(error)
    }
}

impl From<PSP34Error> for Error {
    fn from(error: PSP34Error) -> Self {
        Error::PSP34Error(error)
    }
}