import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/my_nft_pool';

export interface NFTPoolStakeEvent {
	poolContract: ReturnTypes.AccountId;
	nftContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	tokenId: ReturnTypes.Id;
}

export interface NFTPoolUnstakeEvent {
	poolContract: ReturnTypes.AccountId;
	nftContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	tokenId: ReturnTypes.Id;
}

export interface NFTPoolClaimEvent {
	poolContract: ReturnTypes.AccountId;
	tokenContract: ReturnTypes.AccountId;
	staker: ReturnTypes.AccountId;
	amount: ReturnNumber;
}

