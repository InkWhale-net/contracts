import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/my_azero_staking';

export interface StakeEvent {
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithrawalRequestEvent {
	requestId: number;
	user: ReturnTypes.AccountId;
	amount: ReturnNumber;
	azeroReward: ReturnNumber;
	inwReward: ReturnNumber;
	time: number;
}

export interface ClaimEvent {
	requestId: number;
	user: ReturnTypes.AccountId;
	azeroAmount: ReturnNumber;
	inwAmount: ReturnNumber;
	time: number;
}

export interface WithdrawAzeroToStakeEvent {
	caller: ReturnTypes.AccountId;
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawAzeroEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawInwEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

