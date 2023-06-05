import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface Error {
	custom ? : Array<number>,
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
	static Custom(value: Array<number>): Error {
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
	custom ? : Array<number>,
	insufficientBalance ? : null,
	insufficientAllowance ? : null,
	zeroRecipientAddress ? : null,
	zeroSenderAddress ? : null,
	safeTransferCheckFailed ? : Array<number>
}

export class PSP22ErrorBuilder {
	static Custom(value: Array<number>): PSP22Error {
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
	static SafeTransferCheckFailed(value: Array<number>): PSP22Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export interface PSP34Error {
	custom ? : Array<number>,
	selfApprove ? : null,
	notApproved ? : null,
	tokenExists ? : null,
	tokenNotExists ? : null,
	safeTransferCheckFailed ? : Array<number>
}

export class PSP34ErrorBuilder {
	static Custom(value: Array<number>): PSP34Error {
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
	static SafeTransferCheckFailed(value: Array<number>): PSP34Error {
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
	u8 ? : number,
	u16 ? : number,
	u32 ? : number,
	u64 ? : number,
	u128 ? : ReturnNumber,
	bytes ? : Array<number>
}

export class IdBuilder {
	static U8(value: number): Id {
		return {
			u8: value,
		};
	}
	static U16(value: number): Id {
		return {
			u16: value,
		};
	}
	static U32(value: number): Id {
		return {
			u32: value,
		};
	}
	static U64(value: number): Id {
		return {
			u64: value,
		};
	}
	static U128(value: ReturnNumber): Id {
		return {
			u128: value,
		};
	}
	static Bytes(value: Array<number>): Id {
		return {
			bytes: value,
		};
	}
}

export type StakeInformation = {
	lastRewardUpdate: number,
	stakedValue: ReturnNumber,
	unclaimedReward: ReturnNumber
}

