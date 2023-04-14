use openbrush::{
    contracts::ownable::*
};
use ink::prelude::{
    string::String,
};

use openbrush::{
    contracts::traits::{
        psp22::PSP22Error
    }
};


#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Error {
    Custom(String),
    OwnableError(OwnableError),
    PSP22Error(PSP22Error),
    NotEnoughBalance,
    WithdrawFeeError,
    NotCallable,
    CannotTransfer,
    CannotBurn,
    CheckedOperations,
    InvalidBalanceAndAllowance,
    AlreadyInit,
    InvalidBuyAmount,
    InvalidTransferAmount
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