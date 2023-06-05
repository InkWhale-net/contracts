/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pool_generator';
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
	 * @param { ArgumentTypes.AccountId } walContract,
	 * @param { (string | number | BN) } creationFee,
	 * @param { (string | number | BN) } unstakeFee,
	*/
	"initialize" (
		poolHash: ArgumentTypes.Hash,
		walContract: ArgumentTypes.AccountId,
		creationFee: (string | number | BN),
		unstakeFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [poolHash, walContract, creationFee, unstakeFee], __options);
	}

	/**
	 * newPool
	 *
	 * @param { ArgumentTypes.AccountId } contractOwner,
	 * @param { ArgumentTypes.AccountId } psp22ContractAddress,
	 * @param { (number | string | BN) } apy,
	 * @param { (number | string | BN) } duration,
	 * @param { (number | string | BN) } startTime,
	*/
	"newPool" (
		contractOwner: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		apy: (number | string | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "newPool", [contractOwner, psp22ContractAddress, apy, duration, startTime], __options);
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
	 * getCreationFee
	 *
	*/
	"getCreationFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getCreationFee", [], __options);
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
	 * genericPoolGeneratorTrait::withdrawFee
	 *
	 * @param { (string | number | BN) } value,
	*/
	"genericPoolGeneratorTrait::withdrawFee" (
		value: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::withdrawFee", [value], __options);
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
	 * getWalContract
	 *
	*/
	"getWalContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolGeneratorTrait::getWalContract", [], __options);
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
	 * adminTrait::withdrawFee
	 *
	 * @param { (string | number | BN) } value,
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"adminTrait::withdrawFee" (
		value: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::withdrawFee", [value, receiver], __options);
	}

	/**
	 * tranferNft
	 *
	 * @param { ArgumentTypes.AccountId } nftContractAddress,
	 * @param { ArgumentTypes.Id } tokenId,
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"tranferNft" (
		nftContractAddress: ArgumentTypes.AccountId,
		tokenId: ArgumentTypes.Id,
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::tranferNft", [nftContractAddress, tokenId, receiver], __options);
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