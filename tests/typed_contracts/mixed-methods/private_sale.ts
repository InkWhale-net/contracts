/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/private_sale';
import type * as ReturnTypes from '../types-returns/private_sale';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
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
	* @returns { void }
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [startTime, endTime, totalAmount, inwContract, inwPrice, immediateBuyingRate, vestingDuration], __options);
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(16, 'private_sale')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { void }
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [], __options);
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	* @returns { void }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [newOwner], __options);
	}

	/**
	* getBuyerInfo
	*
	* @param { ArgumentTypes.AccountId } buyer,
	* @returns { Result<ReturnTypes.BuyerInformation | null, ReturnTypes.LangError> }
	*/
	"getBuyerInfo" (
		buyer: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.BuyerInformation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::getBuyerInfo", [buyer], __options, (result) => { return handleReturnType(result, getTypeDescription(19, 'private_sale')); });
	}

	/**
	* setVestingDuration
	*
	* @param { (number | string | BN) } vestingDuration,
	* @returns { void }
	*/
	"setVestingDuration" (
		vestingDuration: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setVestingDuration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [vestingDuration], __options);
	}

	/**
	* setInwPrice
	*
	* @param { (string | number | BN) } inwPrice,
	* @returns { void }
	*/
	"setInwPrice" (
		inwPrice: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setInwPrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [inwPrice], __options);
	}

	/**
	* totalAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::totalAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'private_sale')); });
	}

	/**
	* genericTokenSaleTrait::getBalance
	*
	* @returns { void }
	*/
	"genericTokenSaleTrait::getBalance" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::getBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [], __options);
	}

	/**
	* totalPurchasedAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalPurchasedAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::totalPurchasedAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'private_sale')); });
	}

	/**
	* setImmediateBuyingRate
	*
	* @param { (number | string | BN) } immediateBuyingRate,
	* @returns { void }
	*/
	"setImmediateBuyingRate" (
		immediateBuyingRate: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setImmediateBuyingRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [immediateBuyingRate], __options);
	}

	/**
	* startTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"startTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::startTime", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, 'private_sale')); });
	}

	/**
	* setTotalAmount
	*
	* @param { (string | number | BN) } totalAmount,
	* @returns { void }
	*/
	"setTotalAmount" (
		totalAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setTotalAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [totalAmount], __options);
	}

	/**
	* setStartTime
	*
	* @param { (number | string | BN) } startTime,
	* @returns { void }
	*/
	"setStartTime" (
		startTime: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setStartTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [startTime], __options);
	}

	/**
	* setEndTime
	*
	* @param { (number | string | BN) } endTime,
	* @returns { void }
	*/
	"setEndTime" (
		endTime: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setEndTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [endTime], __options);
	}

	/**
	* topup
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"topup" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::topup", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [amount], __options);
	}

	/**
	* vestingDuration
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"vestingDuration" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::vestingDuration", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, 'private_sale')); });
	}

	/**
	* burn
	*
	* @returns { void }
	*/
	"burn" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::burn", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [], __options);
	}

	/**
	* claim
	*
	* @returns { void }
	*/
	"claim" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::claim", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [], __options);
	}

	/**
	* inwPrice
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"inwPrice" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::inwPrice", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'private_sale')); });
	}

	/**
	* immediateBuyingRate
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"immediateBuyingRate" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::immediateBuyingRate", [], __options, (result) => { return handleReturnType(result, getTypeDescription(26, 'private_sale')); });
	}

	/**
	* inwContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"inwContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::inwContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(16, 'private_sale')); });
	}

	/**
	* endTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"endTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::endTime", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, 'private_sale')); });
	}

	/**
	* totalClaimedAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalClaimedAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::totalClaimedAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'private_sale')); });
	}

	/**
	* isBurned
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isBurned" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::isBurned", [], __options, (result) => { return handleReturnType(result, getTypeDescription(27, 'private_sale')); });
	}

	/**
	* setInwContract
	*
	* @param { ArgumentTypes.AccountId } inwContract,
	* @returns { void }
	*/
	"setInwContract" (
		inwContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::setInwContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [inwContract], __options);
	}

	/**
	* purchase
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"purchase" (
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::purchase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [amount], __options);
	}

	/**
	* getUnclaimedAmount
	*
	* @returns { void }
	*/
	"getUnclaimedAmount" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericTokenSaleTrait::getUnclaimedAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [], __options);
	}

	/**
	* withdrawFee
	*
	* @param { (string | number | BN) } value,
	* @param { ArgumentTypes.AccountId } receiver,
	* @returns { void }
	*/
	"withdrawFee" (
		value: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [value, receiver], __options);
	}

	/**
	* adminTrait::getBalance
	*
	* @returns { void }
	*/
	"adminTrait::getBalance" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::getBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [], __options);
	}

	/**
	* tranferPsp22
	*
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (string | number | BN) } amount,
	* @param { ArgumentTypes.AccountId } receiver,
	* @returns { void }
	*/
	"tranferPsp22" (
		psp22ContractAddress: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::tranferPsp22", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [psp22ContractAddress, amount, receiver], __options);
	}

	/**
	* setCode
	*
	* @param { Array<(number | string | BN)> } codeHash,
	* @returns { void }
	*/
	"setCode" (
		codeHash: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "upgradeableTrait::setCode", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "private_sale");
		}, [codeHash], __options);
	}

}