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
	* initialize
	*
	* @param { ArgumentTypes.Hash } poolHash,
	* @param { ArgumentTypes.AccountId } walContract,
	* @param { (string | number | BN) } creationFee,
	* @param { (string | number | BN) } unstakeFee,
	* @returns { void }
	*/
	"initialize" (
		poolHash: ArgumentTypes.Hash,
		walContract: ArgumentTypes.AccountId,
		creationFee: (string | number | BN),
		unstakeFee: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [poolHash, walContract, creationFee, unstakeFee], __options);
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
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(18, 'nft_pool_generator')); });
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
	* genericPoolGeneratorTrait::withdrawFee
	*
	* @param { (string | number | BN) } value,
	* @returns { void }
	*/
	"genericPoolGeneratorTrait::withdrawFee" (
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
	* getPoolHash
	*
	* @returns { Result<ReturnTypes.Hash, ReturnTypes.LangError> }
	*/
	"getPoolHash" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Hash, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolHash", [], __options, (result) => { return handleReturnType(result, getTypeDescription(19, 'nft_pool_generator')); });
	}

	/**
	* getUnstakeFee
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getUnstakeFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getUnstakeFee", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, 'nft_pool_generator')); });
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
	* getPoolCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getPoolCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolCount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'nft_pool_generator')); });
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
	* getPoolCountByOwner
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getPoolCountByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolCountByOwner", [contractOwner], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'nft_pool_generator')); });
	}

	/**
	* getWalContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getWalContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getWalContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(18, 'nft_pool_generator')); });
	}

	/**
	* getPoolByOwner
	*
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @param { (number | string | BN) } index,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getPoolByOwner" (
		contractOwner: ArgumentTypes.AccountId,
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPoolByOwner", [contractOwner, index], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'nft_pool_generator')); });
	}

	/**
	* getPool
	*
	* @param { (number | string | BN) } index,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getPool" (
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getPool", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'nft_pool_generator')); });
	}

	/**
	* getCreationFee
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getCreationFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolGeneratorTrait::getCreationFee", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, 'nft_pool_generator')); });
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
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [psp22ContractAddress, amount, receiver], __options);
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
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
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
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [value, receiver], __options);
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
			return decodeEvents(events, this.__nativeContract, "nft_pool_generator");
		}, [codeHash], __options);
	}

}