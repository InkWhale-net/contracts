/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/nft_pool_generator';
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
	 * initialize
	 *
	 * @param { ArgumentTypes.Hash } poolHash,
	 * @param { ArgumentTypes.AccountId } inwContract,
	 * @param { (string | number | BN) } creationFee,
	 * @param { (string | number | BN) } unstakeFee,
	*/
	"initialize" (
		poolHash: ArgumentTypes.Hash,
		inwContract: ArgumentTypes.AccountId,
		creationFee: (string | number | BN),
		unstakeFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [poolHash, inwContract, creationFee, unstakeFee], __options);
	}

	/**
	 * newPool
	 *
	 * @param { ArgumentTypes.AccountId } contractOwner,
	 * @param { ArgumentTypes.AccountId } psp34ContractAddress,
	 * @param { ArgumentTypes.AccountId } psp22ContractAddress,
	 * @param { (string | number | BN) } maxStakingAmount,
	 * @param { (string | number | BN) } multiplier,
	 * @param { (number | string | BN) } duration,
	 * @param { (number | string | BN) } startTime,
	*/
	"newPool" (
		contractOwner: ArgumentTypes.AccountId,
		psp34ContractAddress: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		maxStakingAmount: (string | number | BN),
		multiplier: (string | number | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "newPool", [contractOwner, psp34ContractAddress, psp22ContractAddress, maxStakingAmount, multiplier, duration, startTime], __options);
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
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
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
	 * setInwContract
	 *
	 * @param { ArgumentTypes.AccountId } inwContract,
	*/
	"setInwContract" (
		inwContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::setInwContract", [inwContract], __options);
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
	 * getPoolCount
	 *
	*/
	"getPoolCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getPoolCount", [], __options);
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
	 * getInwContract
	 *
	*/
	"getInwContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getInwContract", [], __options);
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
	 * getUnstakeFee
	 *
	*/
	"getUnstakeFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getUnstakeFee", [], __options);
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
	 * tranferPsp22
	 *
	 * @param { ArgumentTypes.AccountId } psp22ContractAddress,
	 * @param { (string | number | BN) } amount,
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"tranferPsp22" (
		psp22ContractAddress: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::tranferPsp22", [psp22ContractAddress, amount, receiver], __options);
	}

	/**
	 * getBalance
	 *
	*/
	"getBalance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::getBalance", [], __options);
	}

	/**
	 * withdrawFee
	 *
	 * @param { (string | number | BN) } value,
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"withdrawFee" (
		value: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::withdrawFee", [value, receiver], __options);
	}

	/**
	 * setCode
	 *
	 * @param { Array<(number | string | BN)> } codeHash,
	*/
	"setCode" (
		codeHash: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "upgradeableTrait::setCode", [codeHash], __options);
	}

}