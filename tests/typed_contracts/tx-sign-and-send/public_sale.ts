/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/public_sale';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* initialize
	*
	* @param { (number | string | BN) } startTime,
	* @param { (number | string | BN) } endTime,
	* @param { (string | number | BN) } totalAmount,
	* @param { ArgumentTypes.AccountId } inwContract,
	* @param { (string | number | BN) } inwPrice,
	*/
	"initialize" (
		startTime: (number | string | BN),
		endTime: (number | string | BN),
		totalAmount: (string | number | BN),
		inwContract: ArgumentTypes.AccountId,
		inwPrice: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [startTime, endTime, totalAmount, inwContract, inwPrice], __options);
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [newOwner], __options);
	}

	/**
	* owner
	*
	*/
	"owner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::owner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* renounceOwnership
	*
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* setInwContract
	*
	* @param { ArgumentTypes.AccountId } inwContract,
	*/
	"setInwContract" (
		inwContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setInwContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [inwContract], __options);
	}

	/**
	* purchase
	*
	* @param { (string | number | BN) } amount,
	*/
	"purchase" (
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::purchase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [amount], __options);
	}

	/**
	* setVestingDuration
	*
	* @param { (number | string | BN) } vestingDuration,
	*/
	"setVestingDuration" (
		vestingDuration: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setVestingDuration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [vestingDuration], __options);
	}

	/**
	* totalAmount
	*
	*/
	"totalAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::totalAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* setImmediateBuyingRate
	*
	* @param { (number | string | BN) } immediateBuyingRate,
	*/
	"setImmediateBuyingRate" (
		immediateBuyingRate: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setImmediateBuyingRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [immediateBuyingRate], __options);
	}

	/**
	* claim
	*
	*/
	"claim" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::claim", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* isBurned
	*
	*/
	"isBurned" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::isBurned", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* setInwPrice
	*
	* @param { (string | number | BN) } inwPrice,
	*/
	"setInwPrice" (
		inwPrice: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setInwPrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [inwPrice], __options);
	}

	/**
	* totalPurchasedAmount
	*
	*/
	"totalPurchasedAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::totalPurchasedAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* setEndTime
	*
	* @param { (number | string | BN) } endTime,
	*/
	"setEndTime" (
		endTime: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setEndTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [endTime], __options);
	}

	/**
	* startTime
	*
	*/
	"startTime" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::startTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* getBuyerInfo
	*
	* @param { ArgumentTypes.AccountId } buyer,
	*/
	"getBuyerInfo" (
		buyer: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::getBuyerInfo", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [buyer], __options);
	}

	/**
	* inwPrice
	*
	*/
	"inwPrice" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::inwPrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* inwContract
	*
	*/
	"inwContract" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::inwContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* endTime
	*
	*/
	"endTime" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::endTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* setStartTime
	*
	* @param { (number | string | BN) } startTime,
	*/
	"setStartTime" (
		startTime: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setStartTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [startTime], __options);
	}

	/**
	* setTotalAmount
	*
	* @param { (string | number | BN) } totalAmount,
	*/
	"setTotalAmount" (
		totalAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setTotalAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [totalAmount], __options);
	}

	/**
	* burn
	*
	*/
	"burn" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::burn", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* immediateBuyingRate
	*
	*/
	"immediateBuyingRate" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::immediateBuyingRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* genericTokenSaleTrait::getBalance
	*
	*/
	"genericTokenSaleTrait::getBalance" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::getBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* totalClaimedAmount
	*
	*/
	"totalClaimedAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::totalClaimedAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* getUnclaimedAmount
	*
	*/
	"getUnclaimedAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::getUnclaimedAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
	}

	/**
	* topup
	*
	* @param { (string | number | BN) } amount,
	*/
	"topup" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::topup", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [amount], __options);
	}

	/**
	* vestingDuration
	*
	*/
	"vestingDuration" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::vestingDuration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [value, receiver], __options);
	}

	/**
	* adminTrait::getBalance
	*
	*/
	"adminTrait::getBalance" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::getBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::tranferPsp22", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [psp22ContractAddress, amount, receiver], __options);
	}

	/**
	* setCode
	*
	* @param { Array<(number | string | BN)> } codeHash,
	*/
	"setCode" (
		codeHash: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "upgradeableTrait::setCode", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "public_sale");
		}, [codeHash], __options);
	}

}