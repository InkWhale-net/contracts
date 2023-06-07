import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/my_pool';

export interface PoolStakeEvent {
	poolContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface PoolUnstakeEvent {
	poolContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface PoolClaimEvent {
	poolContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

