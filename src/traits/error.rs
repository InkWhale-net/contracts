use openbrush::{
    contracts::ownable::*,
    contracts::access_control::*,
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
    OnlyOwner,
    OnlyAdmin,
    InvalidCaller,
    InvalidFee,
    TokenOwnerNotMatch,
    NotApproved,
    CannotTransfer,
    CannotMint,
    NotPublicMint,
    NotEnoughBalance,
    MaxSupply,
    AlreadyInit,
    NotOwner,
    NotTokenOwner,
    ProjectNotExist,
    ProjectOwnerAndAdmin,
    InvalidStartTimeAndEndTime,
    InvalidPhaseCount,
    CollectionOwnerAndAdmin,
    CollectionNotActive,
    CollectionNotExist,
    InvalidInput,
    InvalidType,
    ClaimedAll,
    TokenLimitReached,
    UpdatePhase,
    PhaseNotExist,
    PhaseExpired,
    PhaseDeactivate,
    WhitelistNotExist,
    WithdrawFeeError,
    WithdrawNFTError,
    WithdrawPSP22Error,
    NotListed,
    BidAlreadyExist,
    BidNotExist,
    NotInMarket,
    NotForSale,
    NotInSaleList,
    InvalidBidLength,
    InvalidCollectionOwner,
    InvalidTime,
    RewardStarted,
    RewardNotStarted,
    RewardNotAdded,
    ClaimMustBeFalse,
    HoldAmountBidderNotExist,
    OwnableError(OwnableError),
    AccessControlError(AccessControlError),
    PSP22Error(PSP22Error),
    PSP34Error(PSP34Error),
    CheckedOperations
}

impl From<OwnableError> for Error {
    fn from(ownable: OwnableError) -> Self {
        Error::OwnableError(ownable)
    }
}


impl From<AccessControlError> for Error {
    fn from(access: AccessControlError) -> Self {
        Error::AccessControlError(access)
    }
}

impl From<PSP22Error> for Error {
    fn from(error: PSP22Error) -> Self {
        Error::PSP22Error(error)
    }
}
