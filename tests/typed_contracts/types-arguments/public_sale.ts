import type BN from 'bn.js';

export type AccountId = string | number[]

export interface Error {
	custom ? : string,
	ownableError ? : OwnableError,
	psp22Error ? : PSP22Error,
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
	invalidTopupAmount ? : null,
	launchpadNotExist ? : null,
	invalidIsActiveInput ? : null,
	invalidCreationFee ? : null,
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
	invalidPhaseForPublicSale ? : null,
	invalidPhaseForWhitelistSale ? : null,
	invalidSetActive ? : null,
	invalidTotalAmount ? : null,
	cannotTransferTxFee ? : null,
	activeLaunchpadStatusNotFound ? : null,
	launchpadNotActive ? : null
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
	static PSP22Error(value: PSP22Error): Error {
		return {
			psp22Error: value,
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
	static InvalidPhaseForPublicSale(): Error {
		return {
			invalidPhaseForPublicSale: null,
		};
	}
	static InvalidPhaseForWhitelistSale(): Error {
		return {
			invalidPhaseForWhitelistSale: null,
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
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsZero = 'NewOwnerIsZero'
}

export interface PSP22Error {
	custom ? : Array<(number | string | BN)>,
	insufficientBalance ? : null,
	insufficientAllowance ? : null,
	zeroRecipientAddress ? : null,
	zeroSenderAddress ? : null,
	safeTransferCheckFailed ? : Array<(number | string | BN)>
}

export class PSP22ErrorBuilder {
	static Custom(value: Array<(number | string | BN)>): PSP22Error {
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
	static ZeroRecipientAddress(): PSP22Error {
		return {
			zeroRecipientAddress: null,
		};
	}
	static ZeroSenderAddress(): PSP22Error {
		return {
			zeroSenderAddress: null,
		};
	}
	static SafeTransferCheckFailed(value: Array<(number | string | BN)>): PSP22Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type BuyerInformation = {
	purchasedAmount: (string | number | BN),
	vestingAmount: (string | number | BN),
	claimedAmount: (string | number | BN),
	lastUpdatedTime: (number | string | BN)
}

