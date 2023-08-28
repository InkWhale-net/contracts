/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/private_sale';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

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
	 * @param { (number | string | BN) } startTime,
	 * @param { (number | string | BN) } endTime,
	 * @param { (string | number | BN) } totalAmount,
	 * @param { ArgumentTypes.AccountId } inwContract,
	 * @param { (string | number | BN) } inwPrice,
	 * @param { (number | string | BN) } immediateBuyingRate,
	 * @param { (number | string | BN) } vestingDuration,
	*/
	"initialize" (
		startTime: (number | string | BN),
		endTime: (number | string | BN),
		totalAmount: (string | number | BN),
		inwContract: ArgumentTypes.AccountId,
		inwPrice: (string | number | BN),
		immediateBuyingRate: (number | string | BN),
		vestingDuration: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [startTime, endTime, totalAmount, inwContract, inwPrice, immediateBuyingRate, vestingDuration], __options);
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
	 * getBuyerInfo
	 *
	 * @param { ArgumentTypes.AccountId } buyer,
	*/
	"getBuyerInfo" (
		buyer: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::getBuyerInfo", [buyer], __options);
	}

	/**
	 * setVestingDuration
	 *
	 * @param { (number | string | BN) } vestingDuration,
	*/
	"setVestingDuration" (
		vestingDuration: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::setVestingDuration", [vestingDuration], __options);
	}

	/**
	 * setInwPrice
	 *
	 * @param { (string | number | BN) } inwPrice,
	*/
	"setInwPrice" (
		inwPrice: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::setInwPrice", [inwPrice], __options);
	}

	/**
	 * totalAmount
	 *
	*/
	"totalAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::totalAmount", [], __options);
	}

	/**
	 * genericTokenSaleTrait::getBalance
	 *
	*/
	"genericTokenSaleTrait::getBalance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::getBalance", [], __options);
	}

	/**
	 * totalPurchasedAmount
	 *
	*/
	"totalPurchasedAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::totalPurchasedAmount", [], __options);
	}

	/**
	 * setImmediateBuyingRate
	 *
	 * @param { (number | string | BN) } immediateBuyingRate,
	*/
	"setImmediateBuyingRate" (
		immediateBuyingRate: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::setImmediateBuyingRate", [immediateBuyingRate], __options);
	}

	/**
	 * startTime
	 *
	*/
	"startTime" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::startTime", [], __options);
	}

	/**
	 * setTotalAmount
	 *
	 * @param { (string | number | BN) } totalAmount,
	*/
	"setTotalAmount" (
		totalAmount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::setTotalAmount", [totalAmount], __options);
	}

	/**
	 * setStartTime
	 *
	 * @param { (number | string | BN) } startTime,
	*/
	"setStartTime" (
		startTime: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::setStartTime", [startTime], __options);
	}

	/**
	 * setEndTime
	 *
	 * @param { (number | string | BN) } endTime,
	*/
	"setEndTime" (
		endTime: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::setEndTime", [endTime], __options);
	}

	/**
	 * topup
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"topup" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::topup", [amount], __options);
	}

	/**
	 * vestingDuration
	 *
	*/
	"vestingDuration" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::vestingDuration", [], __options);
	}

	/**
	 * burn
	 *
	*/
	"burn" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::burn", [], __options);
	}

	/**
	 * claim
	 *
	*/
	"claim" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::claim", [], __options);
	}

	/**
	 * inwPrice
	 *
	*/
	"inwPrice" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::inwPrice", [], __options);
	}

	/**
	 * immediateBuyingRate
	 *
	*/
	"immediateBuyingRate" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::immediateBuyingRate", [], __options);
	}

	/**
	 * inwContract
	 *
	*/
	"inwContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::inwContract", [], __options);
	}

	/**
	 * endTime
	 *
	*/
	"endTime" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::endTime", [], __options);
	}

	/**
	 * totalClaimedAmount
	 *
	*/
	"totalClaimedAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::totalClaimedAmount", [], __options);
	}

	/**
	 * isBurned
	 *
	*/
	"isBurned" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::isBurned", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::setInwContract", [inwContract], __options);
	}

	/**
	 * purchase
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"purchase" (
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::purchase", [amount], __options);
	}

	/**
	 * getUnclaimedAmount
	 *
	*/
	"getUnclaimedAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericTokenSaleTrait::getUnclaimedAmount", [], __options);
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
	 * adminTrait::getBalance
	 *
	*/
	"adminTrait::getBalance" (
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