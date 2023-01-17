/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/nft_pool_generator';
import type * as ReturnTypes from '../types-returns/nft_pool_generator';
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
	* newPool
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @param { ArgumentTypes.AccountId } psp34ContractAddress,
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (string | number | BN) } multiplier,
	* @param { (number | string | BN) } duration,
	* @param { (number | string | BN) } startTime,
	* @returns { void }
	*/
	"newPool" (
		contractOwner: ArgumentTypes.AccountId,
		psp34ContractAddress: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		multiplier: (string | number | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "newPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [contractOwner, psp34ContractAddress, psp22ContractAddress, multiplier, duration, startTime], __options);
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'nft_pool_generator')); });
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
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
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
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [newOwner], __options);
	}

	/**
	* getPool
	*
	* @param { (number | string | BN) } index,
	* @returns { ReturnTypes.AccountId | null }
	*/
	"getPool" (
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPool", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(11, 'nft_pool_generator')); });
	}

	/**
	* getPoolCount
	*
	* @returns { number }
	*/
	"getPoolCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolCount", [], __options);
	}

	/**
	* getWalContract
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"getWalContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getWalContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'nft_pool_generator')); });
	}

	/**
	* getPoolByOwner
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @param { (number | string | BN) } index,
	* @returns { number }
	*/
	"getPoolByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolByOwner", [contractOwner, index], __options);
	}

	/**
	* setPoolHash
	*
	* @param { ArgumentTypes.Hash } poolHash,
	* @returns { void }
	*/
	"setPoolHash" (
		poolHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::setPoolHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [poolHash], __options);
	}

	/**
	* getUnstakeFee
	*
	* @returns { ReturnNumber }
	*/
	"getUnstakeFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getUnstakeFee", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* getPoolCountByOwner
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @returns { number }
	*/
	"getPoolCountByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolCountByOwner", [contractOwner], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::setWalContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [walContract], __options);
	}

	/**
	* setCreationFee
	*
	* @param { (string | number | BN) } creationFee,
	* @returns { void }
	*/
	"setCreationFee" (
		creationFee: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::setCreationFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [creationFee], __options);
	}

	/**
	* setUnstakeFee
	*
	* @param { (string | number | BN) } unstakeFee,
	* @returns { void }
	*/
	"setUnstakeFee" (
		unstakeFee: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::setUnstakeFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [unstakeFee], __options);
	}

	/**
	* getPoolHash
	*
	* @returns { ReturnTypes.Hash }
	*/
	"getPoolHash" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.Hash > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolHash", [], __options, (result) => { return handleReturnType(result, getTypeDescription(4, 'nft_pool_generator')); });
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [value], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::withdrawWal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [value], __options);
	}

	/**
	* getCreationFee
	*
	* @returns { ReturnNumber }
	*/
	"getCreationFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getCreationFee", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

}