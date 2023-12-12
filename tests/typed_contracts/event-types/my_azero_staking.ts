import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/my_azero_staking';

export interface StakeEvent {
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawalRequestEvent {
	requestId: ReturnNumber;
	user: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface CancelEvent {
	requestId: ReturnNumber;
	user: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface ClaimEvent {
	requestId: ReturnNumber;
	user: ReturnTypes.AccountId;
	azeroAmount: ReturnNumber;
	time: number;
}

export interface ClaimRewardsEvent {
	user: ReturnTypes.AccountId;
	azeroAmount: ReturnNumber;
	inwAmount: ReturnNumber;
	time: number;
}

export interface WithdrawAzeroToStakeEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawAzeroFromStakeAccountEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawAzeroFromInterestAccountEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawAzeroNotInAccountsEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawAzeroEmergencyEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawInwFromInterestAccountEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

export interface WithdrawInwNotInAccountsEvent {
	receiver: ReturnTypes.AccountId;
	amount: ReturnNumber;
	time: number;
}

