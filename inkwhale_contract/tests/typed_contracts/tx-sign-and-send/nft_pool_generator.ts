/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/nft_pool_generator';
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
	* newPool
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @param { ArgumentTypes.AccountId } psp34ContractAddress,
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (string | number | BN) } multiplier,
	* @param { (number | string | BN) } duration,
	* @param { (number | string | BN) } startTime,
	*/
	"newPool" (
		contractOwner: ArgumentTypes.AccountId,
		psp34ContractAddress: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		multiplier: (string | number | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "newPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [contractOwner, psp34ContractAddress, psp22ContractAddress, multiplier, duration, startTime], __options);
	}

	/**
	* owner
	*
	*/
	"owner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::owner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
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
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [], __options);
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
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [newOwner], __options);
	}

	/**
	* getPool
	*
	* @param { (number | string | BN) } index,
	*/
	"getPool" (
		index: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::getPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [index], __options);
	}

	/**
	* getPoolCount
	*
	*/
	"getPoolCount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::getPoolCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [], __options);
	}

	/**
	* getWalContract
	*
	*/
	"getWalContract" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::getWalContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [], __options);
	}

	/**
	* getPoolByOwner
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @param { (number | string | BN) } index,
	*/
	"getPoolByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		index: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::getPoolByOwner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [contractOwner, index], __options);
	}

	/**
	* setPoolHash
	*
	* @param { ArgumentTypes.Hash } poolHash,
	*/
	"setPoolHash" (
		poolHash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::setPoolHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [poolHash], __options);
	}

	/**
	* getUnstakeFee
	*
	*/
	"getUnstakeFee" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::getUnstakeFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [], __options);
	}

	/**
	* getPoolCountByOwner
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	*/
	"getPoolCountByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::getPoolCountByOwner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [contractOwner], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::setWalContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [walContract], __options);
	}

	/**
	* setCreationFee
	*
	* @param { (string | number | BN) } creationFee,
	*/
	"setCreationFee" (
		creationFee: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::setCreationFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [creationFee], __options);
	}

	/**
	* setUnstakeFee
	*
	* @param { (string | number | BN) } unstakeFee,
	*/
	"setUnstakeFee" (
		unstakeFee: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::setUnstakeFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [unstakeFee], __options);
	}

	/**
	* getPoolHash
	*
	*/
	"getPoolHash" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::getPoolHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [value], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::withdrawWal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [value], __options);
	}

	/**
	* getCreationFee
	*
	*/
	"getCreationFee" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolGeneratorTrait::getCreationFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [], __options);
	}

}