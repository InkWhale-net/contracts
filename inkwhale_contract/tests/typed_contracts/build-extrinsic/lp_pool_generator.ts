/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lp_pool_generator';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;


	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
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
	*/
	"newPool" (
		contractOwner: ArgumentTypes.AccountId,
		lpContractAddress: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		multiplier: (number | string | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "newPool", [contractOwner, lpContractAddress, psp22ContractAddress, multiplier, duration, startTime], __options);
	}

	/**
	 * transferOwnership
	 *
	 * @param { ArgumentTypes.AccountId } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::transferOwnership", [newOwner], __options);
	}

	/**
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
	}

	/**
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::owner", [], __options);
	}

	/**
	 * setUnstakeFee
	 *
	 * @param { (string | number | BN) } unstakeFee,
	*/
	"setUnstakeFee" (
		unstakeFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::setUnstakeFee", [unstakeFee], __options);
	}

	/**
	 * withdrawFee
	 *
	 * @param { (string | number | BN) } value,
	*/
	"withdrawFee" (
		value: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::withdrawFee", [value], __options);
	}

	/**
	 * getPoolHash
	 *
	*/
	"getPoolHash" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getPoolHash", [], __options);
	}

	/**
	 * getPool
	 *
	 * @param { (number | string | BN) } index,
	*/
	"getPool" (
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getPool", [index], __options);
	}

	/**
	 * withdrawWal
	 *
	 * @param { (string | number | BN) } value,
	*/
	"withdrawWal" (
		value: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::withdrawWal", [value], __options);
	}

	/**
	 * getUnstakeFee
	 *
	*/
	"getUnstakeFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getUnstakeFee", [], __options);
	}

	/**
	 * getPoolCount
	 *
	*/
	"getPoolCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getPoolCount", [], __options);
	}

	/**
	 * getPoolCountByOwner
	 *
	 * @param { ArgumentTypes.AccountId } contractOwner,
	*/
	"getPoolCountByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getPoolCountByOwner", [contractOwner], __options);
	}

	/**
	 * setCreationFee
	 *
	 * @param { (string | number | BN) } creationFee,
	*/
	"setCreationFee" (
		creationFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::setCreationFee", [creationFee], __options);
	}

	/**
	 * getPoolByOwner
	 *
	 * @param { ArgumentTypes.AccountId } contractOwner,
	 * @param { (number | string | BN) } index,
	*/
	"getPoolByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getPoolByOwner", [contractOwner, index], __options);
	}

	/**
	 * setPoolHash
	 *
	 * @param { ArgumentTypes.Hash } poolHash,
	*/
	"setPoolHash" (
		poolHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::setPoolHash", [poolHash], __options);
	}

	/**
	 * getWalContract
	 *
	*/
	"getWalContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getWalContract", [], __options);
	}

	/**
	 * getCreationFee
	 *
	*/
	"getCreationFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getCreationFee", [], __options);
	}

	/**
	 * setWalContract
	 *
	 * @param { ArgumentTypes.AccountId } walContract,
	*/
	"setWalContract" (
		walContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::setWalContract", [walContract], __options);
	}

}