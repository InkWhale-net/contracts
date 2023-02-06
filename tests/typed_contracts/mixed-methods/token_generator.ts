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
	* initialize
	*
	* @param { ArgumentTypes.Hash } psp22Hash,
	* @param { ArgumentTypes.AccountId } walContract,
	* @param { (string | number | BN) } creationFee,
	* @returns { void }
	*/
	"initialize" (
		psp22Hash: ArgumentTypes.Hash,
		walContract: ArgumentTypes.AccountId,
		creationFee: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [psp22Hash, walContract, creationFee], __options);
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
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(18, 'token_generator')); });
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
	* getTokenCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTokenCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getTokenCount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(19, 'token_generator')); });
	}

	/**
	* getContractHash
	*
	* @returns { Result<ReturnTypes.Hash, ReturnTypes.LangError> }
	*/
	"getContractHash" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Hash, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getContractHash", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, 'token_generator')); });
	}

	/**
	* getCreationFee
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getCreationFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getCreationFee", [], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'token_generator')); });
	}

	/**
	* getWalContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getWalContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getWalContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(18, 'token_generator')); });
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
	* tokenManagerTrait::withdrawFee
	*
	* @param { (string | number | BN) } value,
	* @returns { void }
	*/
	"tokenManagerTrait::withdrawFee" (
		value: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "tokenManagerTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [value], __options);
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
	* @returns { Result<ReturnTypes.Token | null, ReturnTypes.LangError> }
	*/
	"getTokenInfo" (
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Token | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getTokenInfo", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'token_generator')); });
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

	/**
	* tranferNft
	*
	* @param { ArgumentTypes.AccountId } nftContractAddress,
	* @param { ArgumentTypes.Id } tokenId,
	* @param { ArgumentTypes.AccountId } receiver,
	* @returns { void }
	*/
	"tranferNft" (
		nftContractAddress: ArgumentTypes.AccountId,
		tokenId: ArgumentTypes.Id,
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::tranferNft", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [nftContractAddress, tokenId, receiver], __options);
	}

	/**
	* adminTrait::withdrawFee
	*
	* @param { (string | number | BN) } value,
	* @param { ArgumentTypes.AccountId } receiver,
	* @returns { void }
	*/
	"adminTrait::withdrawFee" (
		value: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [value, receiver], __options);
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
			return decodeEvents(events, this.__nativeContract, "token_generator");
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
			return decodeEvents(events, this.__nativeContract, "token_generator");
		}, [codeHash], __options);
	}

}