import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/my_launchpad';

export interface PublicPurchaseEvent {
	launchpadContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface PublicClaimEvent {
	launchpadContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface WhitelistPurchaseEvent {
	launchpadContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface WhitelistClaimEvent {
	launchpadContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

