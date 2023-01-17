/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lp_pool_generator';
import type * as ReturnTypes from '../types-returns/lp_pool_generator';
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
	* newPool
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @param { ArgumentTypes.AccountId } lpContractAddress,
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (number | string | BN) } multiplier,
	* @param { (number | string | BN) } duration,
	* @param { (number | string | BN) } startTime,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"newPool" (
		contractOwner: ArgumentTypes.AccountId,
		lpContractAddress: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		multiplier: (number | string | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "newPool", [contractOwner, lpContractAddress, psp22ContractAddress, multiplier, duration, startTime], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'lp_pool_generator')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(20, 'lp_pool_generator')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<null, ReturnTypes.OwnableError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.OwnableError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(20, 'lp_pool_generator')); });
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'lp_pool_generator')); });
	}

	/**
	* setUnstakeFee
	*
	* @param { (string | number | BN) } unstakeFee,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"setUnstakeFee" (
		unstakeFee: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::setUnstakeFee", [unstakeFee], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'lp_pool_generator')); });
	}

	/**
	* withdrawFee
	*
	* @param { (string | number | BN) } value,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"withdrawFee" (
		value: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::withdrawFee", [value], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'lp_pool_generator')); });
	}

	/**
	* getPoolHash
	*
	* @returns { ReturnTypes.Hash }
	*/
	"getPoolHash" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.Hash > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolHash", [], __options , (result) => { return handleReturnType(result, getTypeDescription(4, 'lp_pool_generator')); });
	}

	/**
	* getPool
	*
	* @param { (number | string | BN) } index,
	* @returns { ReturnTypes.AccountId | null }
	*/
	"getPool" (
		index: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPool", [index], __options , (result) => { return handleReturnType(result, getTypeDescription(11, 'lp_pool_generator')); });
	}

	/**
	* withdrawWal
	*
	* @param { (string | number | BN) } value,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"withdrawWal" (
		value: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::withdrawWal", [value], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'lp_pool_generator')); });
	}

	/**
	* getUnstakeFee
	*
	* @returns { ReturnNumber }
	*/
	"getUnstakeFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getUnstakeFee", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* getPoolCount
	*
	* @returns { number }
	*/
	"getPoolCount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolCount", [], __options );
	}

	/**
	* getPoolCountByOwner
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @returns { number }
	*/
	"getPoolCountByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolCountByOwner", [contractOwner], __options );
	}

	/**
	* setCreationFee
	*
	* @param { (string | number | BN) } creationFee,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"setCreationFee" (
		creationFee: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::setCreationFee", [creationFee], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'lp_pool_generator')); });
	}

	/**
	* getPoolByOwner
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @param { (number | string | BN) } index,
	* @returns { number }
	*/
	"getPoolByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		index: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolByOwner", [contractOwner, index], __options );
	}

	/**
	* setPoolHash
	*
	* @param { ArgumentTypes.Hash } poolHash,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"setPoolHash" (
		poolHash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::setPoolHash", [poolHash], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'lp_pool_generator')); });
	}

	/**
	* getWalContract
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"getWalContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getWalContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'lp_pool_generator')); });
	}

	/**
	* getCreationFee
	*
	* @returns { ReturnNumber }
	*/
	"getCreationFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getCreationFee", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* setWalContract
	*
	* @param { ArgumentTypes.AccountId } walContract,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"setWalContract" (
		walContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::setWalContract", [walContract], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'lp_pool_generator')); });
	}

}