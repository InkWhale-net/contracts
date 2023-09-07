import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/public_sale';

export interface PublicPurchaseEvent {
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface PublicClaimEvent {
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

