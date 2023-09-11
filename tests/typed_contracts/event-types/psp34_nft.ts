import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/psp34_nft';

export interface Transfer {
	from: ReturnTypes.AccountId | null;
	to: ReturnTypes.AccountId | null;
	id: ReturnTypes.Id;
}

export interface Approval {
	from: ReturnTypes.AccountId | null;
	to: ReturnTypes.AccountId | null;
	id: ReturnTypes.Id;
	approved: boolean;
}

