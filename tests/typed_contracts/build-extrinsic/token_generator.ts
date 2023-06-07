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
	 * initialize
	 *
	 * @param { ArgumentTypes.Hash } psp22Hash,
	 * @param { ArgumentTypes.AccountId } inwContract,
	 * @param { (string | number | BN) } creationFee,
	*/
	"initialize" (
		psp22Hash: ArgumentTypes.Hash,
		inwContract: ArgumentTypes.AccountId,
		creationFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [psp22Hash, inwContract, creationFee], __options);
	}

	/**
	 * newToken
	 *
	 * @param { ArgumentTypes.AccountId } mintTo,
	 * @param { (string | number | BN) } cap,
	 * @param { Array<(number | string | BN)> } name,
	 * @param { Array<(number | string | BN)> } symbol,
	 * @param { (number | string | BN) } decimal,
	*/
	"newToken" (
		mintTo: ArgumentTypes.AccountId,
		cap: (string | number | BN),
		name: Array<(number | string | BN)>,
		symbol: Array<(number | string | BN)>,
		decimal: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "newToken", [mintTo, cap, name, symbol, decimal], __options);
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
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::owner", [], __options);
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
	 * getTokenContractAddress
	 *
	 * @param { (number | string | BN) } index,
	*/
	"getTokenContractAddress" (
		index: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::getTokenContractAddress", [index], __options);
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
	 * getInwContract
	 *
	*/
	"getInwContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::getInwContract", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::setCreationFee", [creationFee], __options);
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
	 * getTokenCount
	 *
	*/
	"getTokenCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::getTokenCount", [], __options);
	}

	/**
	 * withdrawInw
	 *
	 * @param { (string | number | BN) } value,
	*/
	"withdrawInw" (
		value: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::withdrawInw", [value], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenManagerTrait::setInwContract", [inwContract], __options);
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
	 * getBalance
	 *
	*/
	"getBalance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::getBalance", [], __options);
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