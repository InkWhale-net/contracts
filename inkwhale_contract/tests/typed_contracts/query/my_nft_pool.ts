/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_nft_pool';
import type * as ReturnTypes from '../types-returns/my_nft_pool';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* stake
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"stake" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "stake", [tokenId], __options , (result) => { return handleReturnType(result, getTypeDescription(17, 'my_nft_pool')); });
	}

	/**
	* unstake
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"unstake" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "unstake", [tokenId], __options , (result) => { return handleReturnType(result, getTypeDescription(17, 'my_nft_pool')); });
	}

	/**
	* claimReward
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"claimReward" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "claimReward", [], __options , (result) => { return handleReturnType(result, getTypeDescription(17, 'my_nft_pool')); });
	}

	/**
	* psp34ContractAddress
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"psp34ContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34ContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_nft_pool')); });
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_nft_pool')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<null, ReturnTypes.OwnableError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.OwnableError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	* @returns { Result<null, ReturnTypes.OwnableError> }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.OwnableError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
	}

	/**
	* duration
	*
	* @returns { number }
	*/
	"duration" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::duration", [], __options );
	}

	/**
	* unstakeFee
	*
	* @returns { ReturnNumber }
	*/
	"unstakeFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::unstakeFee", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* topupRewardPool
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"topupRewardPool" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::topupRewardPool", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(17, 'my_nft_pool')); });
	}

	/**
	* withdrawRewardPool
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"withdrawRewardPool" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::withdrawRewardPool", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(17, 'my_nft_pool')); });
	}

	/**
	* multiplier
	*
	* @returns { ReturnNumber }
	*/
	"multiplier" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::multiplier", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* walContract
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"walContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::walContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_nft_pool')); });
	}

	/**
	* stakingContractAddress
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"stakingContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::stakingContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_nft_pool')); });
	}

	/**
	* getStakeInfo
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @returns { ReturnTypes.StakeInformation | null }
	*/
	"getStakeInfo" (
		staker: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.StakeInformation | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::getStakeInfo", [staker], __options , (result) => { return handleReturnType(result, getTypeDescription(23, 'my_nft_pool')); });
	}

	/**
	* startTime
	*
	* @returns { number }
	*/
	"startTime" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::startTime", [], __options );
	}

	/**
	* totalStaked
	*
	* @returns { ReturnNumber }
	*/
	"totalStaked" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::totalStaked", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* psp22ContractAddress
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"psp22ContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::psp22ContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_nft_pool')); });
	}

	/**
	* rewardPool
	*
	* @returns { ReturnNumber }
	*/
	"rewardPool" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::rewardPool", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* getStakedId
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { (number | string | BN) } index,
	* @returns { ReturnTypes.Id | null }
	*/
	"getStakedId" (
		account: ArgumentTypes.AccountId,
		index: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.Id | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "nftStakingListTrait::getStakedId", [account, index], __options , (result) => { return handleReturnType(result, getTypeDescription(24, 'my_nft_pool')); });
	}

	/**
	* getTotalStakedByAccount
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { number }
	*/
	"getTotalStakedByAccount" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "nftStakingListTrait::getTotalStakedByAccount", [account], __options );
	}

}