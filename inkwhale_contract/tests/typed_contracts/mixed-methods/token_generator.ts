/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/token_generator';
import type * as ReturnTypes from '../types-returns/token_generator';
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
	* newToken
	*
	* @param { ArgumentTypes.AccountId } mintTo,
	* @param { (string | number | BN) } totalSupply,
	* @param { Array<(number | string | BN)> } name,
	* @param { Array<(number | string | BN)> } symbol,
	* @param { (number | string | BN) } decimal,
	* @returns { void }
	*/
	"newToken" (
		mintTo: ArgumentTypes.AccountId,
		totalSupply: (string | number | BN),
		name: Array<(number | string | BN)>,
		symbol: Array<(number | string | BN)>,
		decimal: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "newToken", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [mintTo, totalSupply, name, symbol, decimal], __options);
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
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [newOwner], __options);
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'token_generator')); });
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
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [], __options);
	}

	/**
	* getContractHash
	*
	* @returns { ReturnTypes.Hash }
	*/
	"getContractHash" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.Hash > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getContractHash", [], __options, (result) => { return handleReturnType(result, getTypeDescription(4, 'token_generator')); });
	}

	/**
	* setWalContract
	*
	* @param { ArgumentTypes.AccountId } walContract,
	* @returns { void }
	*/
	"setWalContract" (
		walContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::setWalContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [walContract], __options);
	}

	/**
	* getTokenInfo
	*
	* @param { (number | string | BN) } index,
	* @returns { ReturnTypes.Token | null }
	*/
	"getTokenInfo" (
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.Token | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getTokenInfo", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(18, 'token_generator')); });
	}

	/**
	* getWalContract
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"getWalContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getWalContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'token_generator')); });
	}

	/**
	* setContractHash
	*
	* @param { ArgumentTypes.Hash } psp22Hash,
	* @returns { void }
	*/
	"setContractHash" (
		psp22Hash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::setContractHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [psp22Hash], __options);
	}

	/**
	* getCreationFee
	*
	* @returns { ReturnNumber }
	*/
	"getCreationFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getCreationFee", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* withdrawFee
	*
	* @param { (string | number | BN) } value,
	* @returns { void }
	*/
	"withdrawFee" (
		value: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [value], __options);
	}

	/**
	* getTokenCount
	*
	* @returns { number }
	*/
	"getTokenCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getTokenCount", [], __options);
	}

	/**
	* withdrawWal
	*
	* @param { (string | number | BN) } value,
	* @returns { void }
	*/
	"withdrawWal" (
		value: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::withdrawWal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [value], __options);
	}

}