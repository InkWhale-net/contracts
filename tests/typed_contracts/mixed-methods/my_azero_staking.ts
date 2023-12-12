/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_azero_staking';
import type * as ReturnTypes from '../types-returns/my_azero_staking';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/my_azero_staking.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_azero_staking.json';


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
	* withdrawInwFromInterestAccount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawInwFromInterestAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawInwFromInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* getWithdrawalRequest
	*
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnTypes.WithdrawalRequestInformation | null, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequest" (
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WithdrawalRequestInformation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequest", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setInterestDistributionContract
	*
	* @param { ArgumentTypes.AccountId } interestDistributionContract,
	* @returns { void }
	*/
	"setInterestDistributionContract" (
		interestDistributionContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setInterestDistributionContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [interestDistributionContract], __options);
	}

	/**
	* getWithdrawalRequestIndexListByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<Array<ReturnNumber>, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestIndexListByUser" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnNumber>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestIndexListByUser", [user], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMaxTotalStakingAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getMaxTotalStakingAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getMaxTotalStakingAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* claim
	*
	* @param { (string | number | BN) } requestIndex,
	* @returns { void }
	*/
	"claim" (
		requestIndex: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::claim", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestIndex], __options);
	}

	/**
	* getUnstakingFee
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getUnstakingFee" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getUnstakingFee", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPayableAzero
	*
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getPayableAzero" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getPayableAzero", [], __options, (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* topupInwInterestAccount
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"topupInwInterestAccount" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::topupInwInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setInwContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [inwContract], __options);
	}

	/**
	* setUnstakingFee
	*
	* @param { (string | number | BN) } unstakingFee,
	* @returns { void }
	*/
	"setUnstakingFee" (
		unstakingFee: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setUnstakingFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [unstakingFee], __options);
	}

	/**
	* getMaxWaitingTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMaxWaitingTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getMaxWaitingTime", [], __options, (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInwMultiplier
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getInwMultiplier" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getInwMultiplier", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInterestDistributionContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getInterestDistributionContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getInterestDistributionContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setTotalAzeroReservedForWithdrawals
	*
	* @param { (string | number | BN) } totalAzeroReservedForWithdrawals,
	* @returns { void }
	*/
	"setTotalAzeroReservedForWithdrawals" (
		totalAzeroReservedForWithdrawals: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setTotalAzeroReservedForWithdrawals", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [totalAzeroReservedForWithdrawals], __options);
	}

	/**
	* getAzeroBalance
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getAzeroBalance" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getAzeroBalance", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalAzeroClaimed
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroClaimed" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroClaimed", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setApy
	*
	* @param { (string | number | BN) } apy,
	* @returns { void }
	*/
	"setApy" (
		apy: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setApy", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [apy], __options);
	}

	/**
	* withdrawAzeroFromStakeAccount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawAzeroFromStakeAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroFromStakeAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* getTotalWithdrawalRequestCancelled
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getTotalWithdrawalRequestCancelled" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalWithdrawalRequestCancelled", [user], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWaitingWithdrawalList
	*
	* @returns { Result<Array<ReturnNumber>, ReturnTypes.LangError> }
	*/
	"getWaitingWithdrawalList" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnNumber>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWaitingWithdrawalList", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequestListByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<Array<ReturnTypes.WithdrawalRequestInformation>, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestListByUser" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.WithdrawalRequestInformation>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestListByUser", [user], __options, (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setIsLocked
	*
	* @param { boolean } isLocked,
	* @returns { void }
	*/
	"setIsLocked" (
		isLocked: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setIsLocked", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [isLocked], __options);
	}

	/**
	* getWaitingWithdrawalCount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getWaitingWithdrawalCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWaitingWithdrawalCount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAzeroInterestAccount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getAzeroInterestAccount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getAzeroInterestAccount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setIsSelectingRequestsToPay
	*
	* @param { boolean } isSelectingRequestsToPay,
	* @returns { void }
	*/
	"setIsSelectingRequestsToPay" (
		isSelectingRequestsToPay: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setIsSelectingRequestsToPay", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [isSelectingRequestsToPay], __options);
	}

	/**
	* withdrawAzeroToStake
	*
	* @param { (number | string | BN) } expirationDuration,
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawAzeroToStake" (
		expirationDuration: (number | string | BN),
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroToStake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [expirationDuration, receiver, amount], __options);
	}

	/**
	* getTotalAzeroReservedForWithdrawals
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroReservedForWithdrawals" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroReservedForWithdrawals", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequestList
	*
	* @returns { Result<Array<ReturnTypes.WithdrawalRequestInformation>, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestList" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.WithdrawalRequestInformation>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestList", [], __options, (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getIsLocked
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"getIsLocked" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getIsLocked", [], __options, (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMinStakingAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getMinStakingAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getMinStakingAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getStakeInfo
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @returns { void }
	*/
	"getStakeInfo" (
		staker: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getStakeInfo", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [staker], __options);
	}

	/**
	* setWithdrawalRequestInfoStatus
	*
	* @param { (string | number | BN) } requestIndex,
	* @param { (number | string | BN) } status,
	* @returns { void }
	*/
	"setWithdrawalRequestInfoStatus" (
		requestIndex: (string | number | BN),
		status: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setWithdrawalRequestInfoStatus", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestIndex, status], __options);
	}

	/**
	* getWithdrawalRequestCount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestCount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestCount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequestIndexByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestIndexByUser" (
		user: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestIndexByUser", [user, index], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawAzeroFromInterestAccount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawAzeroFromInterestAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroFromInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* getStakerList
	*
	* @returns { Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> }
	*/
	"getStakerList" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getStakerList", [], __options, (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMaxWaitingTime
	*
	* @param { (number | string | BN) } maxWaitingTime,
	* @returns { void }
	*/
	"setMaxWaitingTime" (
		maxWaitingTime: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setMaxWaitingTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxWaitingTime], __options);
	}

	/**
	* setMinStakingAmount
	*
	* @param { (string | number | BN) } minStakingAmount,
	* @returns { void }
	*/
	"setMinStakingAmount" (
		minStakingAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setMinStakingAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [minStakingAmount], __options);
	}

	/**
	* getWithdrawalRequestCountByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestCountByUser" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestCountByUser", [user], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalAzeroStaked
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroStaked" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroStaked", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalStakers
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalStakers" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalStakers", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateUnclaimedRewardsWhenLocked
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @param { (number | string | BN) } currentTime,
	* @returns { void }
	*/
	"updateUnclaimedRewardsWhenLocked" (
		staker: ArgumentTypes.AccountId,
		currentTime: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::updateUnclaimedRewardsWhenLocked", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [staker, currentTime], __options);
	}

	/**
	* withdrawAzeroNotInAccounts
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawAzeroNotInAccounts" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroNotInAccounts", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* setInwMultiplier
	*
	* @param { (string | number | BN) } inwMultiplier,
	* @returns { void }
	*/
	"setInwMultiplier" (
		inwMultiplier: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setInwMultiplier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [inwMultiplier], __options);
	}

	/**
	* getAzeroStakeAccount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getAzeroStakeAccount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getAzeroStakeAccount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMaxTotalStakingAmount
	*
	* @param { (string | number | BN) } maxTotalStakingAmount,
	* @returns { void }
	*/
	"setMaxTotalStakingAmount" (
		maxTotalStakingAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setMaxTotalStakingAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxTotalStakingAmount], __options);
	}

	/**
	* getTotalAzeroWithdrawnToStake
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroWithdrawnToStake" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroWithdrawnToStake", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalInwClaimed
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalInwClaimed" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalInwClaimed", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawableAzeroToStakeToValidator
	*
	* @param { (number | string | BN) } expirationDuration,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getWithdrawableAzeroToStakeToValidator" (
		expirationDuration: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawableAzeroToStakeToValidator", [expirationDuration], __options, (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getIsSelectingRequestsToPay
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"getIsSelectingRequestsToPay" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getIsSelectingRequestsToPay", [], __options, (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* removeRequestIndexInWithdrawalWaitingList
	*
	* @param { (string | number | BN) } requestIndex,
	* @returns { void }
	*/
	"removeRequestIndexInWithdrawalWaitingList" (
		requestIndex: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::removeRequestIndexInWithdrawalWaitingList", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestIndex], __options);
	}

	/**
	* getBlockTimestamp
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getBlockTimestamp" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getBlockTimestamp", [], __options, (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* claimRewards
	*
	* @returns { void }
	*/
	"claimRewards" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::claimRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTotalWithdrawalRequestClaimed
	*
	* @param { ArgumentTypes.AccountId } claimer,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getTotalWithdrawalRequestClaimed" (
		claimer: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalWithdrawalRequestClaimed", [claimer], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInwInterestAccount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getInwInterestAccount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getInwInterestAccount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInwContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getInwContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getInwContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getApy
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getApy" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getApy", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawalRequest
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawalRequest" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawalRequest", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* getTotalAzeroForWaitingWithdrawals
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroForWaitingWithdrawals" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroForWaitingWithdrawals", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* stake
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"stake" (
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::stake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* getWaitingWithdrawalIndex
	*
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getWaitingWithdrawalIndex" (
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWaitingWithdrawalIndex", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getUnclaimedRewardAtLastTopup
	*
	* @returns { Result<Result<ReturnTypes.UnclaimedRewardAtLastTopup, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getUnclaimedRewardAtLastTopup" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.UnclaimedRewardAtLastTopup, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getUnclaimedRewardAtLastTopup", [], __options, (result) => { return handleReturnType(result, getTypeDescription(40, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawAzeroEmergency
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawAzeroEmergency" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroEmergency", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* getLastAzeroInterestTopup
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getLastAzeroInterestTopup" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getLastAzeroInterestTopup", [], __options, (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawInwNotInAccounts
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawInwNotInAccounts" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawInwNotInAccounts", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* cancel
	*
	* @param { (string | number | BN) } requestIndex,
	* @returns { void }
	*/
	"cancel" (
		requestIndex: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::cancel", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestIndex], __options);
	}

	/**
	* topupAzeroInterestAccount
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"topupAzeroInterestAccount" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::topupAzeroInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* topupAzeroStakeAccount
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"topupAzeroStakeAccount" (
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::topupAzeroStakeAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
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

	/**
	* hasRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } address,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options, (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { void }
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::revokeRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { void }
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::grantRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* renounceRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { void }
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::renounceRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* getRoleMember
	*
	* @param { (number | string | BN) } role,
	* @param { (number | string | BN) } index,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getRoleMember" (
		role: (number | string | BN),
		index: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMember", [role, index], __options, (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleMemberCount
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleMemberCount" (
		role: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMemberCount", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
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
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId | null } newOwner,
	* @returns { void }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newOwner], __options);
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
	}

}