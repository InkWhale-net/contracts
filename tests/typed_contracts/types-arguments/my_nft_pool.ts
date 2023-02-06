import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface Error {
	custom ? : Array<(number | string | BN)>,
	psp22Error ? : PSP22Error,
	psp34Error ? : PSP34Error,
	ownableError ? : OwnableError,
	cannotTransfer ? : null,
	notEnoughBalance ? : null,
	withdrawFeeError ? : null,
	withdrawNftError ? : null,
	withdrawPsp22Error ? : null
}

export class ErrorBuilder {
	static Custom(value: Array<(number | string | BN)>): Error {
		return {
			custom: value,
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
	static OwnableError(value: OwnableError): Error {
		return {
			ownableError: value,
		};
	}
	static CannotTransfer(): Error {
		return {
			cannotTransfer: null,
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

export interface PSP34Error {
	custom ? : Array<(number | string | BN)>,
	selfApprove ? : null,
	notApproved ? : null,
	tokenExists ? : null,
	tokenNotExists ? : null,
	safeTransferCheckFailed ? : Array<(number | string | BN)>
}

export class PSP34ErrorBuilder {
	static Custom(value: Array<(number | string | BN)>): PSP34Error {
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
	static SafeTransferCheckFailed(value: Array<(number | string | BN)>): PSP34Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsZero = 'NewOwnerIsZero'
}

export interface Id {
	u8 ? : (number | string | BN),
	u16 ? : (number | string | BN),
	u32 ? : (number | string | BN),
	u64 ? : (number | string | BN),
	u128 ? : (string | number | BN),
	bytes ? : Array<(number | string | BN)>
}

export class IdBuilder {
	static U8(value: (number | string | BN)): Id {
		return {
			u8: value,
		};
	}
	static U16(value: (number | string | BN)): Id {
		return {
			u16: value,
		};
	}
	static U32(value: (number | string | BN)): Id {
		return {
			u32: value,
		};
	}
	static U64(value: (number | string | BN)): Id {
		return {
			u64: value,
		};
	}
	static U128(value: (string | number | BN)): Id {
		return {
			u128: value,
		};
	}
	static Bytes(value: Array<(number | string | BN)>): Id {
		return {
			bytes: value,
		};
	}
}

export type StakeInformation = {
	lastRewardUpdate: (number | string | BN),
	stakedValue: (string | number | BN),
	unclaimedReward: (string | number | BN)
}

