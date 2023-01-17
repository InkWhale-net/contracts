/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/token_generator';
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
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "newToken", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [mintTo, totalSupply, name, symbol, decimal], __options);
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
			return decodeEvents(events, this.__nativeContract, "token_generator");
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
			return decodeEvents(events, this.__nativeContract, "token_generator");
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
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [], __options);
	}

	/**
	* getContractHash
	*
	*/
	"getContractHash" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::getContractHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [], __options);
	}

	/**
	* setWalContract
	*
	* @param { ArgumentTypes.AccountId } walContract,
	*/
	"setWalContract" (
		walContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::setWalContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [walContract], __options);
	}

	/**
	* getTokenInfo
	*
	* @param { (number | string | BN) } index,
	*/
	"getTokenInfo" (
		index: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::getTokenInfo", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [index], __options);
	}

	/**
	* getWalContract
	*
	*/
	"getWalContract" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::getWalContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [], __options);
	}

	/**
	* setContractHash
	*
	* @param { ArgumentTypes.Hash } psp22Hash,
	*/
	"setContractHash" (
		psp22Hash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::setContractHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [psp22Hash], __options);
	}

	/**
	* getCreationFee
	*
	*/
	"getCreationFee" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::getCreationFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [], __options);
	}

	/**
	* withdrawFee
	*
	* @param { (string | number | BN) } value,
	*/
	"withdrawFee" (
		value: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [value], __options);
	}

	/**
	* getTokenCount
	*
	*/
	"getTokenCount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::getTokenCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [], __options);
	}

	/**
	* withdrawWal
	*
	* @param { (string | number | BN) } value,
	*/
	"withdrawWal" (
		value: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::withdrawWal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [value], __options);
	}

}