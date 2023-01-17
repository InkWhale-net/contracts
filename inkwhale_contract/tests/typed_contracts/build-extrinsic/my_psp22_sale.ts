/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_psp22_sale';
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
	 * increaseAllowance
	 *
	 * @param { ArgumentTypes.AccountId } spender,
	 * @param { (string | number | BN) } deltaValue,
	*/
	"increaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::increaseAllowance", [spender, deltaValue], __options);
	}

	/**
	 * balanceOf
	 *
	 * @param { ArgumentTypes.AccountId } owner,
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::balanceOf", [owner], __options);
	}

	/**
	 * decreaseAllowance
	 *
	 * @param { ArgumentTypes.AccountId } spender,
	 * @param { (string | number | BN) } deltaValue,
	*/
	"decreaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::decreaseAllowance", [spender, deltaValue], __options);
	}

	/**
	 * transferFrom
	 *
	 * @param { ArgumentTypes.AccountId } from,
	 * @param { ArgumentTypes.AccountId } to,
	 * @param { (string | number | BN) } value,
	 * @param { Array<(number | string | BN)> } data,
	*/
	"transferFrom" (
		from: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::transferFrom", [from, to, value, data], __options);
	}

	/**
	 * approve
	 *
	 * @param { ArgumentTypes.AccountId } spender,
	 * @param { (string | number | BN) } value,
	*/
	"approve" (
		spender: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::approve", [spender, value], __options);
	}

	/**
	 * totalSupply
	 *
	*/
	"totalSupply" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::totalSupply", [], __options);
	}

	/**
	 * allowance
	 *
	 * @param { ArgumentTypes.AccountId } owner,
	 * @param { ArgumentTypes.AccountId } spender,
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		spender: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::allowance", [owner, spender], __options);
	}

	/**
	 * transfer
	 *
	 * @param { ArgumentTypes.AccountId } to,
	 * @param { (string | number | BN) } value,
	 * @param { Array<(number | string | BN)> } data,
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::transfer", [to, value, data], __options);
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
	 * tokenDecimals
	 *
	*/
	"tokenDecimals" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22Metadata::tokenDecimals", [], __options);
	}

	/**
	 * tokenName
	 *
	*/
	"tokenName" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22Metadata::tokenName", [], __options);
	}

	/**
	 * tokenSymbol
	 *
	*/
	"tokenSymbol" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22Metadata::tokenSymbol", [], __options);
	}

	/**
	 * burn
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (string | number | BN) } amount,
	*/
	"burn" (
		account: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22Burnable::burn", [account, amount], __options);
	}

	/**
	 * cap
	 *
	*/
	"cap" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::cap", [], __options);
	}

	/**
	 * publicMint
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"publicMint" (
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::publicMint", [amount], __options);
	}

	/**
	 * totalMinted
	 *
	*/
	"totalMinted" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::totalMinted", [], __options);
	}

	/**
	 * setMintingFee
	 *
	 * @param { (string | number | BN) } mintingFee,
	*/
	"setMintingFee" (
		mintingFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::setMintingFee", [mintingFee], __options);
	}

	/**
	 * ownerMint
	 *
	 * @param { ArgumentTypes.AccountId } mintTo,
	 * @param { (string | number | BN) } amount,
	*/
	"ownerMint" (
		mintTo: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::ownerMint", [mintTo, amount], __options);
	}

	/**
	 * mintingFee
	 *
	*/
	"mintingFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::mintingFee", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::withdrawFee", [value], __options);
	}

	/**
	 * mintingCap
	 *
	*/
	"mintingCap" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::mintingCap", [], __options);
	}

	/**
	 * setCap
	 *
	 * @param { (string | number | BN) } cap,
	*/
	"setCap" (
		cap: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "tokenMintCapTrait::setCap", [cap], __options);
	}

}