use ink::prelude::string::String;
use openbrush::contracts::{ownable::*, access_control::*};

use openbrush::contracts::traits::{psp22::PSP22Error, psp34::PSP34Error, pausable::PausableError};

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Error {
    Custom(String),
    OwnableError(OwnableError),
    AccessControlError(AccessControlError),
    PSP22Error(PSP22Error),
    PSP34Error(PSP34Error),
    PausableError(PausableError),
    NotEnoughBalance,
    WithdrawFeeError,
    NotCallable,
    CannotTransfer,
    CannotBurn,
    CheckedOperations,
    InvalidBalanceAndAllowance,
    AlreadyInit,
    InvalidBuyAmount,
    InvalidTransferAmount,
    CannotCreatePool,
    NotTimeToStake,
    NoStakerFound,
    InvalidUnstakedAmount,
    NotEnoughReward,
    NotTokenOwner,
    AllowanceNotSet,
    TokenNotFound,
    UserNotStake,
    NoTokenOwner,
    ExceedTotalStakingAmount,
    NoClaimAmount,
    NotTimeToWithdraw,
    NotEnoughRewardToWithdraw,
    NotTopupEnoughReward,
    NoAmount,
    InvalidTokenBalanceAndAllowance,
    CannotApprove,
    CannotTopupRewardPool,
    NotTimeToPurchase,
    NotTimeToClaim,
    NotTimeToBurn,
    NoTokenPurchased,
    AlreadyBurnt,
    InvalidTime,
    InvalidPercentage,
    InvalidDuration,
    InvalidVestingUnit,
    InvalidTopupAmount,
    LaunchpadNotExist,
    InvalidIsActiveInput,
    InvalidCreationFee,
    InvalidTxRate,
    InvalidPhaseData,
    CannotTopupToken,
    InvalidStartTimeAndEndTime,
    InvalidPhaseCount,
    InvalidMaxStakingAmount,
    InvalidApy,
    InvalidMultiplier,
    InvalidWhitelistData,
    PhaseNotExist,
    PhaseNotActive,
    WhitelistBuyerInfoNotExist,
    WhitelistBuyerInfoExist,
    WhitelistBuyerPurchased,
    WhitelistSaleInfoNotExist,
    WhitelistPhaseAccountNotExist,
    PublicSaleInfoNotExist,
    InvalidSetActive,
    InvalidTotalAmount,
    CannotTransferTxFee,
    ActiveLaunchpadStatusNotFound,
    LaunchpadNotActive,
    InvalidCaller,
    NoPhaseActive,
    InvalidTotalSupply,
    PhaseNotPublic,
    InvalidSetPublic,
    InvalidMinStakingAmount,
    InvalidMaxWaitingTime,
    InvalidUnstakingFee,
    BelowMinStakingMount,
    ExceedMaxTotalStakingMount,
    WithdrawalRequestIsNotClaimable,
    WithdrawalRequestIsNotCancellable,
    WithdrawError,
    RequestNotForClaimer,
    RequestNotForCaller,
    NoWithdrawalRequestInfo,
    NoStakeInfoFound,
    CannotGetWaitingList,
    CannotGetWithdrawableAmount,
    InvalidWithdrawalAmount,
    CannotUpdateUnclaimedRewards,
    CannotUpdateLastUnclaimedRewards,
    InvalidCapAmount,
    InvalidWhitelistAmount,
    CapExceeded,
    CannotCollectInwV1,
    InvalidWithdrawalRequestStatus,
    InvalidWaitingRequestIndex,
    IsNotWithdrawable,
    CannotCollectInwV2,
    CannotMintInwV2,
    CannotTransferInwV1,
    InvalidIsLockedInput,
    InvalidTimeToClaimRewards,
    NotEnoughAzeroReward,
    NotEnoughInwReward,
    RequestToClaimRewardsFirst,
    InvalidTotalRate,
    InvalidInterestAccountRate,
    NoAzeroToDistribute,
    CannotTopupAzeroInterestAccount,
    NoNewAzeroTopup,
    NotInterestDistributionContract,
    NotAzeroStakingContract,
    CannotTransferToInterestAccount,
    CannotTransferToMasterAccount,
    CheckedOperationsTimeLength,
    CheckedOperationsAzeroInterestAccount,
    CheckedOperationsInwInterestAccount,
    CheckedOperationsUnclaimedAzeroReward,
    CheckedOperationsUnclaimedInwReward,
    IsSelectingRequestsToPay
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum LockError {
    NotLocked,
    Locked
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

impl From<PausableError> for Error {
    fn from(access: PausableError) -> Self {
        Error::PausableError(access)
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

impl From<LockError> for Error {
    fn from(locked: LockError) -> Self {
        match locked {
            LockError::Locked => Error::Custom(String::from("O::Locked")),
            LockError::NotLocked => Error::Custom(String::from("O::NotLocked")),
        }
    }
}