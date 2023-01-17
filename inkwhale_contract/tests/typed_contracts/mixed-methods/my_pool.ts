/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_pool';
import type * as ReturnTypes from '../types-returns/my_pool';
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
	* stake
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"stake" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "stake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_pool");
		}, [amount], __options);
	}

	/**
	* unstake
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"unstake" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "unstake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_pool");
		}, [amount], __options);
	}

	/**
	* claimReward
	*
	* @returns { void }
	*/
	"claimReward" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "claimReward", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_pool");
		}, [], __options);
	}

	/**
	* apy
	*
	* @returns { number }
	*/
	"apy" (
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "apy", [], __options);
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'my_pool')); });
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
			return decodeEvents(events, this.__nativeContract, "my_pool");
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
			return decodeEvents(events, this.__nativeContract, "my_pool");
		}, [newOwner], __options);
	}

	/**
	* multiplier
	*
	* @returns { ReturnNumber }
	*/
	"multiplier" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::multiplier", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* duration
	*
	* @returns { number }
	*/
	"duration" (
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::duration", [], __options);
	}

	/**
	* psp22ContractAddress
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"psp22ContractAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::psp22ContractAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'my_pool')); });
	}

	/**
	* stakingContractAddress
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"stakingContractAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::stakingContractAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'my_pool')); });
	}

	/**
	* topupRewardPool
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"topupRewardPool" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::topupRewardPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_pool");
		}, [amount], __options);
	}

	/**
	* unstakeFee
	*
	* @returns { ReturnNumber }
	*/
	"unstakeFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::unstakeFee", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* walContract
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"walContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::walContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'my_pool')); });
	}

	/**
	* getStakeInfo
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @returns { ReturnTypes.StakeInformation | null }
	*/
	"getStakeInfo" (
		staker: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.StakeInformation | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::getStakeInfo", [staker], __options, (result) => { return handleReturnType(result, getTypeDescription(18, 'my_pool')); });
	}

	/**
	* startTime
	*
	* @returns { number }
	*/
	"startTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::startTime", [], __options);
	}

	/**
	* withdrawRewardPool
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawRewardPool" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::withdrawRewardPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_pool");
		}, [amount], __options);
	}

	/**
	* rewardPool
	*
	* @returns { ReturnNumber }
	*/
	"rewardPool" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::rewardPool", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* totalStaked
	*
	* @returns { ReturnNumber }
	*/
	"totalStaked" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::totalStaked", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

}