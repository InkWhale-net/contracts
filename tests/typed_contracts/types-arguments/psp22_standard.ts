import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
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

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsZero = 'NewOwnerIsZero'
}

export interface Error {
	custom ? : string,
	onlyOwner ? : null,
	onlyAdmin ? : null,
	invalidCaller ? : null,
	invalidFee ? : null,
	tokenOwnerNotMatch ? : null,
	notApproved ? : null,
	cannotTransfer ? : null,
	cannotMint ? : null,
	notPublicMint ? : null,
	notEnoughBalance ? : null,
	maxSupply ? : null,
	alreadyInit ? : null,
	notOwner ? : null,
	notTokenOwner ? : null,
	projectNotExist ? : null,
	projectOwnerAndAdmin ? : null,
	invalidStartTimeAndEndTime ? : null,
	invalidPhaseCount ? : null,
	collectionOwnerAndAdmin ? : null,
	collectionNotActive ? : null,
	collectionNotExist ? : null,
	invalidInput ? : null,
	invalidType ? : null,
	claimedAll ? : null,
	tokenLimitReached ? : null,
	updatePhase ? : null,
	phaseNotExist ? : null,
	phaseExpired ? : null,
	phaseDeactivate ? : null,
	whitelistNotExist ? : null,
	withdrawFeeError ? : null,
	withdrawNftError ? : null,
	withdrawPsp22Error ? : null,
	notListed ? : null,
	bidAlreadyExist ? : null,
	bidNotExist ? : null,
	notInMarket ? : null,
	notForSale ? : null,
	notInSaleList ? : null,
	invalidBidLength ? : null,
	invalidCollectionOwner ? : null,
	invalidTime ? : null,
	rewardStarted ? : null,
	rewardNotStarted ? : null,
	rewardNotAdded ? : null,
	claimMustBeFalse ? : null,
	holdAmountBidderNotExist ? : null,
	ownableError ? : OwnableError,
	psp22Error ? : PSP22Error,
	checkedOperations ? : null
}

export class ErrorBuilder {
	static Custom(value: string): Error {
		return {
			custom: value,
		};
	}
	static OnlyOwner(): Error {
		return {
			onlyOwner: null,
		};
	}
	static OnlyAdmin(): Error {
		return {
			onlyAdmin: null,
		};
	}
	static InvalidCaller(): Error {
		return {
			invalidCaller: null,
		};
	}
	static InvalidFee(): Error {
		return {
			invalidFee: null,
		};
	}
	static TokenOwnerNotMatch(): Error {
		return {
			tokenOwnerNotMatch: null,
		};
	}
	static NotApproved(): Error {
		return {
			notApproved: null,
		};
	}
	static CannotTransfer(): Error {
		return {
			cannotTransfer: null,
		};
	}
	static CannotMint(): Error {
		return {
			cannotMint: null,
		};
	}
	static NotPublicMint(): Error {
		return {
			notPublicMint: null,
		};
	}
	static NotEnoughBalance(): Error {
		return {
			notEnoughBalance: null,
		};
	}
	static MaxSupply(): Error {
		return {
			maxSupply: null,
		};
	}
	static AlreadyInit(): Error {
		return {
			alreadyInit: null,
		};
	}
	static NotOwner(): Error {
		return {
			notOwner: null,
		};
	}
	static NotTokenOwner(): Error {
		return {
			notTokenOwner: null,
		};
	}
	static ProjectNotExist(): Error {
		return {
			projectNotExist: null,
		};
	}
	static ProjectOwnerAndAdmin(): Error {
		return {
			projectOwnerAndAdmin: null,
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
	static CollectionOwnerAndAdmin(): Error {
		return {
			collectionOwnerAndAdmin: null,
		};
	}
	static CollectionNotActive(): Error {
		return {
			collectionNotActive: null,
		};
	}
	static CollectionNotExist(): Error {
		return {
			collectionNotExist: null,
		};
	}
	static InvalidInput(): Error {
		return {
			invalidInput: null,
		};
	}
	static InvalidType(): Error {
		return {
			invalidType: null,
		};
	}
	static ClaimedAll(): Error {
		return {
			claimedAll: null,
		};
	}
	static TokenLimitReached(): Error {
		return {
			tokenLimitReached: null,
		};
	}
	static UpdatePhase(): Error {
		return {
			updatePhase: null,
		};
	}
	static PhaseNotExist(): Error {
		return {
			phaseNotExist: null,
		};
	}
	static PhaseExpired(): Error {
		return {
			phaseExpired: null,
		};
	}
	static PhaseDeactivate(): Error {
		return {
			phaseDeactivate: null,
		};
	}
	static WhitelistNotExist(): Error {
		return {
			whitelistNotExist: null,
		};
	}
	static WithdrawFeeError(): Error {
		return {
			withdrawFeeError: null,
		};
	}
	static WithdrawNFTError(): Error {
		return {
			withdrawNftError: null,
		};
	}
	static WithdrawPSP22Error(): Error {
		return {
			withdrawPsp22Error: null,
		};
	}
	static NotListed(): Error {
		return {
			notListed: null,
		};
	}
	static BidAlreadyExist(): Error {
		return {
			bidAlreadyExist: null,
		};
	}
	static BidNotExist(): Error {
		return {
			bidNotExist: null,
		};
	}
	static NotInMarket(): Error {
		return {
			notInMarket: null,
		};
	}
	static NotForSale(): Error {
		return {
			notForSale: null,
		};
	}
	static NotInSaleList(): Error {
		return {
			notInSaleList: null,
		};
	}
	static InvalidBidLength(): Error {
		return {
			invalidBidLength: null,
		};
	}
	static InvalidCollectionOwner(): Error {
		return {
			invalidCollectionOwner: null,
		};
	}
	static InvalidTime(): Error {
		return {
			invalidTime: null,
		};
	}
	static RewardStarted(): Error {
		return {
			rewardStarted: null,
		};
	}
	static RewardNotStarted(): Error {
		return {
			rewardNotStarted: null,
		};
	}
	static RewardNotAdded(): Error {
		return {
			rewardNotAdded: null,
		};
	}
	static ClaimMustBeFalse(): Error {
		return {
			claimMustBeFalse: null,
		};
	}
	static HoldAmountBidderNotExist(): Error {
		return {
			holdAmountBidderNotExist: null,
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
	static CheckedOperations(): Error {
		return {
			checkedOperations: null,
		};
	}
}

