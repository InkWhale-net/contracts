/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_azero_staking';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_azero_staking.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __apiPromise: ApiPromise;

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
	* withdrawInwFromInterestAccount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	*/
	"withdrawInwFromInterestAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawInwFromInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* getWithdrawalRequest
	*
	* @param { (string | number | BN) } index,
	*/
	"getWithdrawalRequest" (
		index: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWithdrawalRequest", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [index], __options);
	}

	/**
	* setInterestDistributionContract
	*
	* @param { ArgumentTypes.AccountId } interestDistributionContract,
	*/
	"setInterestDistributionContract" (
		interestDistributionContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setInterestDistributionContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [interestDistributionContract], __options);
	}

	/**
	* getWithdrawalRequestIndexListByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	*/
	"getWithdrawalRequestIndexListByUser" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWithdrawalRequestIndexListByUser", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [user], __options);
	}

	/**
	* getMaxTotalStakingAmount
	*
	*/
	"getMaxTotalStakingAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getMaxTotalStakingAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* claim
	*
	* @param { (string | number | BN) } requestIndex,
	*/
	"claim" (
		requestIndex: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::claim", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestIndex], __options);
	}

	/**
	* getUnstakingFee
	*
	*/
	"getUnstakingFee" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getUnstakingFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getPayableAzero
	*
	*/
	"getPayableAzero" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getPayableAzero", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* topupInwInterestAccount
	*
	* @param { (string | number | BN) } amount,
	*/
	"topupInwInterestAccount" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::topupInwInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* setInwContract
	*
	* @param { ArgumentTypes.AccountId } inwContract,
	*/
	"setInwContract" (
		inwContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setInwContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [inwContract], __options);
	}

	/**
	* setUnstakingFee
	*
	* @param { (string | number | BN) } unstakingFee,
	*/
	"setUnstakingFee" (
		unstakingFee: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setUnstakingFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [unstakingFee], __options);
	}

	/**
	* getMaxWaitingTime
	*
	*/
	"getMaxWaitingTime" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getMaxWaitingTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getInwMultiplier
	*
	*/
	"getInwMultiplier" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getInwMultiplier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getInterestDistributionContract
	*
	*/
	"getInterestDistributionContract" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getInterestDistributionContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setTotalAzeroReservedForWithdrawals
	*
	* @param { (string | number | BN) } totalAzeroReservedForWithdrawals,
	*/
	"setTotalAzeroReservedForWithdrawals" (
		totalAzeroReservedForWithdrawals: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setTotalAzeroReservedForWithdrawals", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [totalAzeroReservedForWithdrawals], __options);
	}

	/**
	* getAzeroBalance
	*
	*/
	"getAzeroBalance" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getAzeroBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTotalAzeroClaimed
	*
	*/
	"getTotalAzeroClaimed" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalAzeroClaimed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setApy
	*
	* @param { (string | number | BN) } apy,
	*/
	"setApy" (
		apy: (string | number | BN),
		__options ? : GasLimit,
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
	*/
	"withdrawAzeroFromStakeAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroFromStakeAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* getTotalWithdrawalRequestCancelled
	*
	* @param { ArgumentTypes.AccountId } user,
	*/
	"getTotalWithdrawalRequestCancelled" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalWithdrawalRequestCancelled", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [user], __options);
	}

	/**
	* getWaitingWithdrawalList
	*
	*/
	"getWaitingWithdrawalList" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWaitingWithdrawalList", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getWithdrawalRequestListByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	*/
	"getWithdrawalRequestListByUser" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWithdrawalRequestListByUser", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [user], __options);
	}

	/**
	* setIsLocked
	*
	* @param { boolean } isLocked,
	*/
	"setIsLocked" (
		isLocked: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setIsLocked", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [isLocked], __options);
	}

	/**
	* getWaitingWithdrawalCount
	*
	*/
	"getWaitingWithdrawalCount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWaitingWithdrawalCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getAzeroInterestAccount
	*
	*/
	"getAzeroInterestAccount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getAzeroInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setIsSelectingRequestsToPay
	*
	* @param { boolean } isSelectingRequestsToPay,
	*/
	"setIsSelectingRequestsToPay" (
		isSelectingRequestsToPay: boolean,
		__options ? : GasLimit,
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
	*/
	"withdrawAzeroToStake" (
		expirationDuration: (number | string | BN),
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroToStake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [expirationDuration, receiver, amount], __options);
	}

	/**
	* getTotalAzeroReservedForWithdrawals
	*
	*/
	"getTotalAzeroReservedForWithdrawals" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalAzeroReservedForWithdrawals", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getWithdrawalRequestList
	*
	*/
	"getWithdrawalRequestList" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWithdrawalRequestList", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getIsLocked
	*
	*/
	"getIsLocked" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getIsLocked", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getMinStakingAmount
	*
	*/
	"getMinStakingAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getMinStakingAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getStakeInfo
	*
	* @param { ArgumentTypes.AccountId } staker,
	*/
	"getStakeInfo" (
		staker: ArgumentTypes.AccountId,
		__options ? : GasLimit,
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
	*/
	"setWithdrawalRequestInfoStatus" (
		requestIndex: (string | number | BN),
		status: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setWithdrawalRequestInfoStatus", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestIndex, status], __options);
	}

	/**
	* getWithdrawalRequestCount
	*
	*/
	"getWithdrawalRequestCount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWithdrawalRequestCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getWithdrawalRequestIndexByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	* @param { (string | number | BN) } index,
	*/
	"getWithdrawalRequestIndexByUser" (
		user: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWithdrawalRequestIndexByUser", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [user, index], __options);
	}

	/**
	* withdrawAzeroFromInterestAccount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	*/
	"withdrawAzeroFromInterestAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroFromInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* getStakerList
	*
	*/
	"getStakerList" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getStakerList", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setMaxWaitingTime
	*
	* @param { (number | string | BN) } maxWaitingTime,
	*/
	"setMaxWaitingTime" (
		maxWaitingTime: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setMaxWaitingTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxWaitingTime], __options);
	}

	/**
	* setMinStakingAmount
	*
	* @param { (string | number | BN) } minStakingAmount,
	*/
	"setMinStakingAmount" (
		minStakingAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setMinStakingAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [minStakingAmount], __options);
	}

	/**
	* getWithdrawalRequestCountByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	*/
	"getWithdrawalRequestCountByUser" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWithdrawalRequestCountByUser", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [user], __options);
	}

	/**
	* getTotalAzeroStaked
	*
	*/
	"getTotalAzeroStaked" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalAzeroStaked", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTotalStakers
	*
	*/
	"getTotalStakers" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalStakers", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateUnclaimedRewardsWhenLocked
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @param { (number | string | BN) } currentTime,
	*/
	"updateUnclaimedRewardsWhenLocked" (
		staker: ArgumentTypes.AccountId,
		currentTime: (number | string | BN),
		__options ? : GasLimit,
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
	*/
	"withdrawAzeroNotInAccounts" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroNotInAccounts", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* setInwMultiplier
	*
	* @param { (string | number | BN) } inwMultiplier,
	*/
	"setInwMultiplier" (
		inwMultiplier: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setInwMultiplier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [inwMultiplier], __options);
	}

	/**
	* getAzeroStakeAccount
	*
	*/
	"getAzeroStakeAccount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getAzeroStakeAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setMaxTotalStakingAmount
	*
	* @param { (string | number | BN) } maxTotalStakingAmount,
	*/
	"setMaxTotalStakingAmount" (
		maxTotalStakingAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::setMaxTotalStakingAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [maxTotalStakingAmount], __options);
	}

	/**
	* getTotalAzeroWithdrawnToStake
	*
	*/
	"getTotalAzeroWithdrawnToStake" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalAzeroWithdrawnToStake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTotalInwClaimed
	*
	*/
	"getTotalInwClaimed" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalInwClaimed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getWithdrawableAzeroToStakeToValidator
	*
	* @param { (number | string | BN) } expirationDuration,
	*/
	"getWithdrawableAzeroToStakeToValidator" (
		expirationDuration: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWithdrawableAzeroToStakeToValidator", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [expirationDuration], __options);
	}

	/**
	* getIsSelectingRequestsToPay
	*
	*/
	"getIsSelectingRequestsToPay" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getIsSelectingRequestsToPay", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* removeRequestIndexInWithdrawalWaitingList
	*
	* @param { (string | number | BN) } requestIndex,
	*/
	"removeRequestIndexInWithdrawalWaitingList" (
		requestIndex: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::removeRequestIndexInWithdrawalWaitingList", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestIndex], __options);
	}

	/**
	* getBlockTimestamp
	*
	*/
	"getBlockTimestamp" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getBlockTimestamp", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* claimRewards
	*
	*/
	"claimRewards" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::claimRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTotalWithdrawalRequestClaimed
	*
	* @param { ArgumentTypes.AccountId } claimer,
	*/
	"getTotalWithdrawalRequestClaimed" (
		claimer: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalWithdrawalRequestClaimed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [claimer], __options);
	}

	/**
	* getInwInterestAccount
	*
	*/
	"getInwInterestAccount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getInwInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getInwContract
	*
	*/
	"getInwContract" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getInwContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getApy
	*
	*/
	"getApy" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getApy", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* withdrawalRequest
	*
	* @param { (string | number | BN) } amount,
	*/
	"withdrawalRequest" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawalRequest", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* getTotalAzeroForWaitingWithdrawals
	*
	*/
	"getTotalAzeroForWaitingWithdrawals" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getTotalAzeroForWaitingWithdrawals", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* stake
	*
	* @param { (string | number | BN) } amount,
	*/
	"stake" (
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::stake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* getWaitingWithdrawalIndex
	*
	* @param { (string | number | BN) } index,
	*/
	"getWaitingWithdrawalIndex" (
		index: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getWaitingWithdrawalIndex", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [index], __options);
	}

	/**
	* getUnclaimedRewardAtLastTopup
	*
	*/
	"getUnclaimedRewardAtLastTopup" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getUnclaimedRewardAtLastTopup", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* withdrawAzeroEmergency
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	*/
	"withdrawAzeroEmergency" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawAzeroEmergency", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* getLastAzeroInterestTopup
	*
	*/
	"getLastAzeroInterestTopup" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::getLastAzeroInterestTopup", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* withdrawInwNotInAccounts
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	*/
	"withdrawInwNotInAccounts" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::withdrawInwNotInAccounts", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver, amount], __options);
	}

	/**
	* cancel
	*
	* @param { (string | number | BN) } requestIndex,
	*/
	"cancel" (
		requestIndex: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::cancel", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestIndex], __options);
	}

	/**
	* topupAzeroInterestAccount
	*
	* @param { (string | number | BN) } amount,
	*/
	"topupAzeroInterestAccount" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::topupAzeroInterestAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* topupAzeroStakeAccount
	*
	* @param { (string | number | BN) } amount,
	*/
	"topupAzeroStakeAccount" (
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "azeroStakingTrait::topupAzeroStakeAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
	}

	/**
	* setCode
	*
	* @param { Array<(number | string | BN)> } codeHash,
	*/
	"setCode" (
		codeHash: Array<(number | string | BN)>,
		__options ? : GasLimit,
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
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::hasRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, address], __options);
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::getRoleAdmin", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role], __options);
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
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
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
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
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
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
	*/
	"getRoleMember" (
		role: (number | string | BN),
		index: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControlEnumerable::getRoleMember", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, index], __options);
	}

	/**
	* getRoleMemberCount
	*
	* @param { (number | string | BN) } role,
	*/
	"getRoleMemberCount" (
		role: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControlEnumerable::getRoleMemberCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role], __options);
	}

	/**
	* renounceOwnership
	*
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId | null } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

}