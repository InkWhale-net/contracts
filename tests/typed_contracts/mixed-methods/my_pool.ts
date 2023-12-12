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
import DATA_TYPE_DESCRIPTIONS from '../data/my_pool.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_pool.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

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
	* @param { ArgumentTypes.AccountId } inwContract,
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (string | number | BN) } maxStakingAmount,
	* @param { (number | string | BN) } apy,
	* @param { (number | string | BN) } duration,
	* @param { (number | string | BN) } startTime,
	* @param { (string | number | BN) } unstakeFee,
	* @returns { void }
	*/
	"initialize" (
		inwContract: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		maxStakingAmount: (string | number | BN),
		apy: (number | string | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		unstakeFee: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [inwContract, psp22ContractAddress, maxStakingAmount, apy, duration, startTime, unstakeFee], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* apy
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"apy" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "apy", [], __options, (result) => { return handleReturnType(result, getTypeDescription(16, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* minRewardAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"minRewardAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::minRewardAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* unstakeFee
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"unstakeFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::unstakeFee", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* isTopupEnoughReward
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isTopupEnoughReward" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::isTopupEnoughReward", [], __options, (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* inwContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"inwContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::inwContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* maxStakingAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"maxStakingAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::maxStakingAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* startTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"startTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::startTime", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::setInwContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [inwContract], __options);
	}

	/**
	* rewardPool
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"rewardPool" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::rewardPool", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* duration
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"duration" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::duration", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* stakingContractAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"stakingContractAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::stakingContractAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* multiplier
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"multiplier" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::multiplier", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* psp22ContractAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"psp22ContractAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::psp22ContractAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* totalStaked
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalStaked" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::totalStaked", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* totalUnclaimedReward
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalUnclaimedReward" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::totalUnclaimedReward", [], __options, (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getStakeInfo
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @returns { Result<ReturnTypes.StakeInformation | null, ReturnTypes.LangError> }
	*/
	"getStakeInfo" (
		staker: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.StakeInformation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::getStakeInfo", [staker], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [codeHash], __options);
	}

}