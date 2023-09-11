import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/private_sale';

export interface PrivatePurchaseEvent {
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

export interface PrivateClaimEvent {
	buyer: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

