/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/token_generator';
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
	 * newToken
	 *
	 * @param { ArgumentTypes.AccountId } mintTo,
	 * @param { (string | number | BN) } totalSupply,
	 * @param { Array<(number | string | BN)> } name,
	 * @param { Array<(number | string | BN)> } symbol,
	 * @param { (number | string | BN) } decimal,
	*/
	"newToken" (
		mintTo: ArgumentTypes.AccountId,
		totalSupply: (string | number | BN),
		name: Array<(number | string | BN)>,
		symbol: Array<(number | string | BN)>,
		decimal: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "newToken", [mintTo, totalSupply, name, symbol, decimal], __options);
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
	 * getContractHash
	 *
	*/
	"getContractHash" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::getContractHash", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::setWalContract", [walContract], __options);
	}

	/**
	 * getTokenInfo
	 *
	 * @param { (number | string | BN) } index,
	*/
	"getTokenInfo" (
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::getTokenInfo", [index], __options);
	}

	/**
	 * getWalContract
	 *
	*/
	"getWalContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::getWalContract", [], __options);
	}

	/**
	 * setContractHash
	 *
	 * @param { ArgumentTypes.Hash } psp22Hash,
	*/
	"setContractHash" (
		psp22Hash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::setContractHash", [psp22Hash], __options);
	}

	/**
	 * getCreationFee
	 *
	*/
	"getCreationFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::getCreationFee", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::withdrawFee", [value], __options);
	}

	/**
	 * getTokenCount
	 *
	*/
	"getTokenCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::getTokenCount", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::withdrawWal", [value], __options);
	}

}