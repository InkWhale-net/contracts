import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export interface Error {
	custom ? : string,
	ownableError ? : OwnableError,
	accessControlError ? : AccessControlError,
	psp22Error ? : PSP22Error,
	psp34Error ? : PSP34Error,
	pausableError ? : PausableError,
	notEnoughBalance ? : null,
	withdrawFeeError ? : null,
	notCallable ? : null,
	cannotTransfer ? : null,
	cannotBurn ? : null,
	checkedOperations ? : null,
	invalidBalanceAndAllowance ? : null,
	alreadyInit ? : null,
	invalidBuyAmount ? : null,
	invalidTransferAmount ? : null,
	cannotCreatePool ? : null,
	notTimeToStake ? : null,
	noStakerFound ? : null,
	invalidUnstakedAmount ? : null,
	notEnoughReward ? : null,
	notTokenOwner ? : null,
	allowanceNotSet ? : null,
	tokenNotFound ? : null,
	userNotStake ? : null,
	noTokenOwner ? : null,
	exceedTotalStakingAmount ? : null,
	noClaimAmount ? : null,
	notTimeToWithdraw ? : null,
	notEnoughRewardToWithdraw ? : null,
	notTopupEnoughReward ? : null,
	noAmount ? : null,
	invalidTokenBalanceAndAllowance ? : null,
	cannotApprove ? : null,
	cannotTopupRewardPool ? : null,
	notTimeToPurchase ? : null,
	notTimeToClaim ? : null,
	notTimeToBurn ? : null,
	noTokenPurchased ? : null,
	alreadyBurnt ? : null,
	invalidTime ? : null,
	invalidPercentage ? : null,
	invalidDuration ? : null,
	invalidVestingUnit ? : null,
	invalidTopupAmount ? : null,
	launchpadNotExist ? : null,
	invalidIsActiveInput ? : null,
	invalidCreationFee ? : null,
	invalidTxRate ? : null,
	invalidPhaseData ? : null,
	cannotTopupToken ? : null,
	invalidStartTimeAndEndTime ? : null,
	invalidPhaseCount ? : null,
	invalidMaxStakingAmount ? : null,
	invalidApy ? : null,
	invalidMultiplier ? : null,
	invalidWhitelistData ? : null,
	phaseNotExist ? : null,
	phaseNotActive ? : null,
	whitelistBuyerInfoNotExist ? : null,
	whitelistBuyerInfoExist ? : null,
	whitelistBuyerPurchased ? : null,
	whitelistSaleInfoNotExist ? : null,
	whitelistPhaseAccountNotExist ? : null,
	publicSaleInfoNotExist ? : null,
	invalidSetActive ? : null,
	invalidTotalAmount ? : null,
	cannotTransferTxFee ? : null,
	activeLaunchpadStatusNotFound ? : null,
	launchpadNotActive ? : null,
	invalidCaller ? : null,
	noPhaseActive ? : null,
	invalidTotalSupply ? : null,
	phaseNotPublic ? : null,
	invalidSetPublic ? : null,
	invalidMinStakingAmount ? : null,
	invalidMaxWaitingTime ? : null,
	invalidUnstakingFee ? : null,
	belowMinStakingMount ? : null,
	exceedMaxTotalStakingMount ? : null,
	withdrawalRequestIsNotClaimable ? : null,
	withdrawalRequestIsNotCancellable ? : null,
	withdrawError ? : null,
	requestNotForClaimer ? : null,
	requestNotForCaller ? : null,
	noWithdrawalRequestInfo ? : null,
	noStakeInfoFound ? : null,
	cannotGetWaitingList ? : null,
	cannotGetWithdrawableAmount ? : null,
	invalidWithdrawalAmount ? : null,
	cannotUpdateUnclaimedRewards ? : null,
	cannotUpdateLastUnclaimedRewards ? : null,
	invalidCapAmount ? : null,
	invalidWhitelistAmount ? : null,
	capExceeded ? : null,
	cannotCollectInwV1 ? : null,
	invalidWithdrawalRequestStatus ? : null,
	invalidWaitingRequestIndex ? : null,
	isNotWithdrawable ? : null,
	cannotCollectInwV2 ? : null,
	cannotMintInwV2 ? : null,
	cannotTransferInwV1 ? : null,
	invalidIsLockedInput ? : null,
	invalidTimeToClaimRewards ? : null,
	notEnoughAzeroReward ? : null,
	notEnoughInwReward ? : null,
	requestToClaimRewardsFirst ? : null,
	invalidTotalRate ? : null,
	invalidInterestAccountRate ? : null,
	noAzeroToDistribute ? : null,
	cannotTopupAzeroInterestAccount ? : null,
	noNewAzeroTopup ? : null,
	notInterestDistributionContract ? : null,
	notAzeroStakingContract ? : null,
	cannotTransferToInterestAccount ? : null,
	cannotTransferToMasterAccount ? : null,
	checkedOperationsTimeLength ? : null,
	checkedOperationsAzeroInterestAccount ? : null,
	checkedOperationsInwInterestAccount ? : null,
	checkedOperationsUnclaimedAzeroReward ? : null,
	checkedOperationsUnclaimedInwReward ? : null,
	isSelectingRequestsToPay ? : null
}

export class ErrorBuilder {
	static Custom(value: string): Error {
		return {
			custom: value,
		};
	}
	static OwnableError(value: OwnableError): Error {
		return {
			ownableError: value,
		};
	}
	static AccessControlError(value: AccessControlError): Error {
		return {
			accessControlError: value,
		};
	}
	static PSP22Error(value: PSP22Error): Error {
		return {
			psp22Error: value,
		};
	}
	static PSP34Error(value: PSP34Error): Error {
		return {
			psp34Error: value,
		};
	}
	static PausableError(value: PausableError): Error {
		return {
			pausableError: value,
		};
	}
	static NotEnoughBalance(): Error {
		return {
			notEnoughBalance: null,
		};
	}
	static WithdrawFeeError(): Error {
		return {
			withdrawFeeError: null,
		};
	}
	static NotCallable(): Error {
		return {
			notCallable: null,
		};
	}
	static CannotTransfer(): Error {
		return {
			cannotTransfer: null,
		};
	}
	static CannotBurn(): Error {
		return {
			cannotBurn: null,
		};
	}
	static CheckedOperations(): Error {
		return {
			checkedOperations: null,
		};
	}
	static InvalidBalanceAndAllowance(): Error {
		return {
			invalidBalanceAndAllowance: null,
		};
	}
	static AlreadyInit(): Error {
		return {
			alreadyInit: null,
		};
	}
	static InvalidBuyAmount(): Error {
		return {
			invalidBuyAmount: null,
		};
	}
	static InvalidTransferAmount(): Error {
		return {
			invalidTransferAmount: null,
		};
	}
	static CannotCreatePool(): Error {
		return {
			cannotCreatePool: null,
		};
	}
	static NotTimeToStake(): Error {
		return {
			notTimeToStake: null,
		};
	}
	static NoStakerFound(): Error {
		return {
			noStakerFound: null,
		};
	}
	static InvalidUnstakedAmount(): Error {
		return {
			invalidUnstakedAmount: null,
		};
	}
	static NotEnoughReward(): Error {
		return {
			notEnoughReward: null,
		};
	}
	static NotTokenOwner(): Error {
		return {
			notTokenOwner: null,
		};
	}
	static AllowanceNotSet(): Error {
		return {
			allowanceNotSet: null,
		};
	}
	static TokenNotFound(): Error {
		return {
			tokenNotFound: null,
		};
	}
	static UserNotStake(): Error {
		return {
			userNotStake: null,
		};
	}
	static NoTokenOwner(): Error {
		return {
			noTokenOwner: null,
		};
	}
	static ExceedTotalStakingAmount(): Error {
		return {
			exceedTotalStakingAmount: null,
		};
	}
	static NoClaimAmount(): Error {
		return {
			noClaimAmount: null,
		};
	}
	static NotTimeToWithdraw(): Error {
		return {
			notTimeToWithdraw: null,
		};
	}
	static NotEnoughRewardToWithdraw(): Error {
		return {
			notEnoughRewardToWithdraw: null,
		};
	}
	static NotTopupEnoughReward(): Error {
		return {
			notTopupEnoughReward: null,
		};
	}
	static NoAmount(): Error {
		return {
			noAmount: null,
		};
	}
	static InvalidTokenBalanceAndAllowance(): Error {
		return {
			invalidTokenBalanceAndAllowance: null,
		};
	}
	static CannotApprove(): Error {
		return {
			cannotApprove: null,
		};
	}
	static CannotTopupRewardPool(): Error {
		return {
			cannotTopupRewardPool: null,
		};
	}
	static NotTimeToPurchase(): Error {
		return {
			notTimeToPurchase: null,
		};
	}
	static NotTimeToClaim(): Error {
		return {
			notTimeToClaim: null,
		};
	}
	static NotTimeToBurn(): Error {
		return {
			notTimeToBurn: null,
		};
	}
	static NoTokenPurchased(): Error {
		return {
			noTokenPurchased: null,
		};
	}
	static AlreadyBurnt(): Error {
		return {
			alreadyBurnt: null,
		};
	}
	static InvalidTime(): Error {
		return {
			invalidTime: null,
		};
	}
	static InvalidPercentage(): Error {
		return {
			invalidPercentage: null,
		};
	}
	static InvalidDuration(): Error {
		return {
			invalidDuration: null,
		};
	}
	static InvalidVestingUnit(): Error {
		return {
			invalidVestingUnit: null,
		};
	}
	static InvalidTopupAmount(): Error {
		return {
			invalidTopupAmount: null,
		};
	}
	static LaunchpadNotExist(): Error {
		return {
			launchpadNotExist: null,
		};
	}
	static InvalidIsActiveInput(): Error {
		return {
			invalidIsActiveInput: null,
		};
	}
	static InvalidCreationFee(): Error {
		return {
			invalidCreationFee: null,
		};
	}
	static InvalidTxRate(): Error {
		return {
			invalidTxRate: null,
		};
	}
	static InvalidPhaseData(): Error {
		return {
			invalidPhaseData: null,
		};
	}
	static CannotTopupToken(): Error {
		return {
			cannotTopupToken: null,
		};
	}
	static InvalidStartTimeAndEndTime(): Error {
		return {
			invalidStartTimeAndEndTime: null,
		};
	}
	static InvalidPhaseCount(): Error {
		return {
			invalidPhaseCount: null,
		};
	}
	static InvalidMaxStakingAmount(): Error {
		return {
			invalidMaxStakingAmount: null,
		};
	}
	static InvalidApy(): Error {
		return {
			invalidApy: null,
		};
	}
	static InvalidMultiplier(): Error {
		return {
			invalidMultiplier: null,
		};
	}
	static InvalidWhitelistData(): Error {
		return {
			invalidWhitelistData: null,
		};
	}
	static PhaseNotExist(): Error {
		return {
			phaseNotExist: null,
		};
	}
	static PhaseNotActive(): Error {
		return {
			phaseNotActive: null,
		};
	}
	static WhitelistBuyerInfoNotExist(): Error {
		return {
			whitelistBuyerInfoNotExist: null,
		};
	}
	static WhitelistBuyerInfoExist(): Error {
		return {
			whitelistBuyerInfoExist: null,
		};
	}
	static WhitelistBuyerPurchased(): Error {
		return {
			whitelistBuyerPurchased: null,
		};
	}
	static WhitelistSaleInfoNotExist(): Error {
		return {
			whitelistSaleInfoNotExist: null,
		};
	}
	static WhitelistPhaseAccountNotExist(): Error {
		return {
			whitelistPhaseAccountNotExist: null,
		};
	}
	static PublicSaleInfoNotExist(): Error {
		return {
			publicSaleInfoNotExist: null,
		};
	}
	static InvalidSetActive(): Error {
		return {
			invalidSetActive: null,
		};
	}
	static InvalidTotalAmount(): Error {
		return {
			invalidTotalAmount: null,
		};
	}
	static CannotTransferTxFee(): Error {
		return {
			cannotTransferTxFee: null,
		};
	}
	static ActiveLaunchpadStatusNotFound(): Error {
		return {
			activeLaunchpadStatusNotFound: null,
		};
	}
	static LaunchpadNotActive(): Error {
		return {
			launchpadNotActive: null,
		};
	}
	static InvalidCaller(): Error {
		return {
			invalidCaller: null,
		};
	}
	static NoPhaseActive(): Error {
		return {
			noPhaseActive: null,
		};
	}
	static InvalidTotalSupply(): Error {
		return {
			invalidTotalSupply: null,
		};
	}
	static PhaseNotPublic(): Error {
		return {
			phaseNotPublic: null,
		};
	}
	static InvalidSetPublic(): Error {
		return {
			invalidSetPublic: null,
		};
	}
	static InvalidMinStakingAmount(): Error {
		return {
			invalidMinStakingAmount: null,
		};
	}
	static InvalidMaxWaitingTime(): Error {
		return {
			invalidMaxWaitingTime: null,
		};
	}
	static InvalidUnstakingFee(): Error {
		return {
			invalidUnstakingFee: null,
		};
	}
	static BelowMinStakingMount(): Error {
		return {
			belowMinStakingMount: null,
		};
	}
	static ExceedMaxTotalStakingMount(): Error {
		return {
			exceedMaxTotalStakingMount: null,
		};
	}
	static WithdrawalRequestIsNotClaimable(): Error {
		return {
			withdrawalRequestIsNotClaimable: null,
		};
	}
	static WithdrawalRequestIsNotCancellable(): Error {
		return {
			withdrawalRequestIsNotCancellable: null,
		};
	}
	static WithdrawError(): Error {
		return {
			withdrawError: null,
		};
	}
	static RequestNotForClaimer(): Error {
		return {
			requestNotForClaimer: null,
		};
	}
	static RequestNotForCaller(): Error {
		return {
			requestNotForCaller: null,
		};
	}
	static NoWithdrawalRequestInfo(): Error {
		return {
			noWithdrawalRequestInfo: null,
		};
	}
	static NoStakeInfoFound(): Error {
		return {
			noStakeInfoFound: null,
		};
	}
	static CannotGetWaitingList(): Error {
		return {
			cannotGetWaitingList: null,
		};
	}
	static CannotGetWithdrawableAmount(): Error {
		return {
			cannotGetWithdrawableAmount: null,
		};
	}
	static InvalidWithdrawalAmount(): Error {
		return {
			invalidWithdrawalAmount: null,
		};
	}
	static CannotUpdateUnclaimedRewards(): Error {
		return {
			cannotUpdateUnclaimedRewards: null,
		};
	}
	static CannotUpdateLastUnclaimedRewards(): Error {
		return {
			cannotUpdateLastUnclaimedRewards: null,
		};
	}
	static InvalidCapAmount(): Error {
		return {
			invalidCapAmount: null,
		};
	}
	static InvalidWhitelistAmount(): Error {
		return {
			invalidWhitelistAmount: null,
		};
	}
	static CapExceeded(): Error {
		return {
			capExceeded: null,
		};
	}
	static CannotCollectInwV1(): Error {
		return {
			cannotCollectInwV1: null,
		};
	}
	static InvalidWithdrawalRequestStatus(): Error {
		return {
			invalidWithdrawalRequestStatus: null,
		};
	}
	static InvalidWaitingRequestIndex(): Error {
		return {
			invalidWaitingRequestIndex: null,
		};
	}
	static IsNotWithdrawable(): Error {
		return {
			isNotWithdrawable: null,
		};
	}
	static CannotCollectInwV2(): Error {
		return {
			cannotCollectInwV2: null,
		};
	}
	static CannotMintInwV2(): Error {
		return {
			cannotMintInwV2: null,
		};
	}
	static CannotTransferInwV1(): Error {
		return {
			cannotTransferInwV1: null,
		};
	}
	static InvalidIsLockedInput(): Error {
		return {
			invalidIsLockedInput: null,
		};
	}
	static InvalidTimeToClaimRewards(): Error {
		return {
			invalidTimeToClaimRewards: null,
		};
	}
	static NotEnoughAzeroReward(): Error {
		return {
			notEnoughAzeroReward: null,
		};
	}
	static NotEnoughInwReward(): Error {
		return {
			notEnoughInwReward: null,
		};
	}
	static RequestToClaimRewardsFirst(): Error {
		return {
			requestToClaimRewardsFirst: null,
		};
	}
	static InvalidTotalRate(): Error {
		return {
			invalidTotalRate: null,
		};
	}
	static InvalidInterestAccountRate(): Error {
		return {
			invalidInterestAccountRate: null,
		};
	}
	static NoAzeroToDistribute(): Error {
		return {
			noAzeroToDistribute: null,
		};
	}
	static CannotTopupAzeroInterestAccount(): Error {
		return {
			cannotTopupAzeroInterestAccount: null,
		};
	}
	static NoNewAzeroTopup(): Error {
		return {
			noNewAzeroTopup: null,
		};
	}
	static NotInterestDistributionContract(): Error {
		return {
			notInterestDistributionContract: null,
		};
	}
	static NotAzeroStakingContract(): Error {
		return {
			notAzeroStakingContract: null,
		};
	}
	static CannotTransferToInterestAccount(): Error {
		return {
			cannotTransferToInterestAccount: null,
		};
	}
	static CannotTransferToMasterAccount(): Error {
		return {
			cannotTransferToMasterAccount: null,
		};
	}
	static CheckedOperationsTimeLength(): Error {
		return {
			checkedOperationsTimeLength: null,
		};
	}
	static CheckedOperationsAzeroInterestAccount(): Error {
		return {
			checkedOperationsAzeroInterestAccount: null,
		};
	}
	static CheckedOperationsInwInterestAccount(): Error {
		return {
			checkedOperationsInwInterestAccount: null,
		};
	}
	static CheckedOperationsUnclaimedAzeroReward(): Error {
		return {
			checkedOperationsUnclaimedAzeroReward: null,
		};
	}
	static CheckedOperationsUnclaimedInwReward(): Error {
		return {
			checkedOperationsUnclaimedInwReward: null,
		};
	}
	static IsSelectingRequestsToPay(): Error {
		return {
			isSelectingRequestsToPay: null,
		};
	}
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsNotSet = 'NewOwnerIsNotSet'
}

export enum AccessControlError {
	invalidCaller = 'InvalidCaller',
	missingRole = 'MissingRole',
	roleRedundant = 'RoleRedundant'
}

export interface PSP22Error {
	custom ? : string,
	insufficientBalance ? : null,
	insufficientAllowance ? : null,
	recipientIsNotSet ? : null,
	senderIsNotSet ? : null,
	safeTransferCheckFailed ? : string,
	permitInvalidSignature ? : null,
	permitExpired ? : null,
	noncesError ? : NoncesError
}

export class PSP22ErrorBuilder {
	static Custom(value: string): PSP22Error {
		return {
			custom: value,
		};
	}
	static InsufficientBalance(): PSP22Error {
		return {
			insufficientBalance: null,
		};
	}
	static InsufficientAllowance(): PSP22Error {
		return {
			insufficientAllowance: null,
		};
	}
	static RecipientIsNotSet(): PSP22Error {
		return {
			recipientIsNotSet: null,
		};
	}
	static SenderIsNotSet(): PSP22Error {
		return {
			senderIsNotSet: null,
		};
	}
	static SafeTransferCheckFailed(value: string): PSP22Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
	static PermitInvalidSignature(): PSP22Error {
		return {
			permitInvalidSignature: null,
		};
	}
	static PermitExpired(): PSP22Error {
		return {
			permitExpired: null,
		};
	}
	static NoncesError(value: NoncesError): PSP22Error {
		return {
			noncesError: value,
		};
	}
}

export interface NoncesError {
	invalidAccountNonce ? : AccountId,
	nonceOverflow ? : null
}

export class NoncesErrorBuilder {
	static InvalidAccountNonce(value: AccountId): NoncesError {
		return {
			invalidAccountNonce: value,
		};
	}
	static NonceOverflow(): NoncesError {
		return {
			nonceOverflow: null,
		};
	}
}

export interface PSP34Error {
	custom ? : string,
	selfApprove ? : null,
	notApproved ? : null,
	tokenExists ? : null,
	tokenNotExists ? : null,
	safeTransferCheckFailed ? : string
}

export class PSP34ErrorBuilder {
	static Custom(value: string): PSP34Error {
		return {
			custom: value,
		};
	}
	static SelfApprove(): PSP34Error {
		return {
			selfApprove: null,
		};
	}
	static NotApproved(): PSP34Error {
		return {
			notApproved: null,
		};
	}
	static TokenExists(): PSP34Error {
		return {
			tokenExists: null,
		};
	}
	static TokenNotExists(): PSP34Error {
		return {
			tokenNotExists: null,
		};
	}
	static SafeTransferCheckFailed(value: string): PSP34Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export enum PausableError {
	paused = 'Paused',
	notPaused = 'NotPaused'
}

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type WithdrawalRequestInformation = {
	requestIndex: ReturnNumber,
	user: AccountId,
	amount: ReturnNumber,
	requestTime: number,
	status: number
}

export type StakeInformation = {
	stakingAmount: ReturnNumber,
	unclaimedAzeroReward: ReturnNumber,
	claimedAzeroReward: ReturnNumber,
	unclaimedInwReward: ReturnNumber,
	claimedInwReward: ReturnNumber,
	lastUpdated: number,
	lastUnclaimedAzeroReward: ReturnNumber,
	lastUnclaimedInwReward: ReturnNumber,
	lastAnchored: number,
	lastRewardsClaimed: number
}

export type UnclaimedRewardAtLastTopup = {
	azeroReward: ReturnNumber,
	inwReward: ReturnNumber
}

