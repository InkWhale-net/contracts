/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_lp_pool';
import type * as ReturnTypes from '../types-returns/my_lp_pool';
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
	* @param { (string | number | BN) } amount,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"stake" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "stake", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_lp_pool')); });
	}

	/**
	* unstake
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"unstake" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "unstake", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_lp_pool')); });
	}

	/**
	* claimReward
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"claimReward" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "claimReward", [], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_lp_pool')); });
	}

	/**
	* lpContractAddress
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"lpContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "lpContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_lp_pool')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<null, ReturnTypes.OwnableError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.OwnableError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'my_lp_pool')); });
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_lp_pool')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'my_lp_pool')); });
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
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::getStakeInfo", [staker], __options , (result) => { return handleReturnType(result, getTypeDescription(17, 'my_lp_pool')); });
	}

	/**
	* psp22ContractAddress
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"psp22ContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::psp22ContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_lp_pool')); });
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
	* withdrawRewardPool
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"withdrawRewardPool" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::withdrawRewardPool", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_lp_pool')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::topupRewardPool", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_lp_pool')); });
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
	* walContract
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"walContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::walContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_lp_pool')); });
	}

	/**
	* stakingContractAddress
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"stakingContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::stakingContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'my_lp_pool')); });
	}

}