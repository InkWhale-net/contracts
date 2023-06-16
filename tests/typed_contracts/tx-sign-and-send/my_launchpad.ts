/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_launchpad';
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
	* initialize
	*
	* @param { string } projectInfoUri,
	* @param { ArgumentTypes.AccountId } tokenAddress,
	* @param { (string | number | BN) } totalSupply,
	* @param { ArgumentTypes.AccountId } generatorContract,
	* @param { (number | string | BN) } txRate,
	* @param { Array<string> } phaseName,
	* @param { Array<(number | string | BN)> } phaseStartTime,
	* @param { Array<(number | string | BN)> } phaseEndTime,
	* @param { Array<(number | string | BN)> } phaseImmediateReleaseRate,
	* @param { Array<(number | string | BN)> } phaseVestingDuration,
	* @param { Array<(number | string | BN)> } phaseVestingUnit,
	* @param { Array<boolean> } phaseIsPublic,
	* @param { Array<(string | number | BN)> } phasePublicAmount,
	* @param { Array<(string | number | BN)> } phasePublicPrice,
	*/
	"initialize" (
		projectInfoUri: string,
		tokenAddress: ArgumentTypes.AccountId,
		totalSupply: (string | number | BN),
		generatorContract: ArgumentTypes.AccountId,
		txRate: (number | string | BN),
		phaseName: Array<string>,
		phaseStartTime: Array<(number | string | BN)>,
		phaseEndTime: Array<(number | string | BN)>,
		phaseImmediateReleaseRate: Array<(number | string | BN)>,
		phaseVestingDuration: Array<(number | string | BN)>,
		phaseVestingUnit: Array<(number | string | BN)>,
		phaseIsPublic: Array<boolean>,
		phasePublicAmount: Array<(string | number | BN)>,
		phasePublicPrice: Array<(string | number | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [projectInfoUri, tokenAddress, totalSupply, generatorContract, txRate, phaseName, phaseStartTime, phaseEndTime, phaseImmediateReleaseRate, phaseVestingDuration, phaseVestingUnit, phaseIsPublic, phasePublicAmount, phasePublicPrice], __options);
	}

	/**
	* addNewPhase
	*
	* @param { string } name,
	* @param { (number | string | BN) } startTime,
	* @param { (number | string | BN) } endTime,
	* @param { (number | string | BN) } immediateReleaseRate,
	* @param { (number | string | BN) } vestingDuration,
	* @param { (number | string | BN) } vestingUnit,
	* @param { boolean } isPublic,
	* @param { (string | number | BN) } publicAmount,
	* @param { (string | number | BN) } publicPrice,
	*/
	"addNewPhase" (
		name: string,
		startTime: (number | string | BN),
		endTime: (number | string | BN),
		immediateReleaseRate: (number | string | BN),
		vestingDuration: (number | string | BN),
		vestingUnit: (number | string | BN),
		isPublic: boolean,
		publicAmount: (string | number | BN),
		publicPrice: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "addNewPhase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [name, startTime, endTime, immediateReleaseRate, vestingDuration, vestingUnit, isPublic, publicAmount, publicPrice], __options);
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
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [newOwner], __options);
	}

	/**
	* renounceOwnership
	*
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* owner
	*
	*/
	"owner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::owner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* setPhase
	*
	* @param { (number | string | BN) } phaseId,
	* @param { boolean } isActive,
	* @param { string } name,
	* @param { (number | string | BN) } startTime,
	* @param { (number | string | BN) } endTime,
	* @param { (number | string | BN) } immediateReleaseRate,
	* @param { (number | string | BN) } vestingDuration,
	* @param { (number | string | BN) } vestingUnit,
	* @param { boolean } isPublic,
	* @param { (string | number | BN) } totalAmount,
	* @param { (string | number | BN) } price,
	*/
	"setPhase" (
		phaseId: (number | string | BN),
		isActive: boolean,
		name: string,
		startTime: (number | string | BN),
		endTime: (number | string | BN),
		immediateReleaseRate: (number | string | BN),
		vestingDuration: (number | string | BN),
		vestingUnit: (number | string | BN),
		isPublic: boolean,
		totalAmount: (string | number | BN),
		price: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setPhase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, isActive, name, startTime, endTime, immediateReleaseRate, vestingDuration, vestingUnit, isPublic, totalAmount, price], __options);
	}

	/**
	* updateMultiWhitelists
	*
	* @param { (number | string | BN) } phaseId,
	* @param { Array<ArgumentTypes.AccountId> } accounts,
	* @param { Array<(string | number | BN)> } whitelistAmounts,
	* @param { Array<(string | number | BN)> } whitelistPrices,
	*/
	"updateMultiWhitelists" (
		phaseId: (number | string | BN),
		accounts: Array<ArgumentTypes.AccountId>,
		whitelistAmounts: Array<(string | number | BN)>,
		whitelistPrices: Array<(string | number | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::updateMultiWhitelists", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, accounts, whitelistAmounts, whitelistPrices], __options);
	}

	/**
	* whitelistClaim
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"whitelistClaim" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::whitelistClaim", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getName
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getName" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getName", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getPublicSaleInfo
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getPublicSaleInfo" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getPublicSaleInfo", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* setIsPublic
	*
	* @param { (number | string | BN) } phaseId,
	* @param { boolean } isPublic,
	*/
	"setIsPublic" (
		phaseId: (number | string | BN),
		isPublic: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setIsPublic", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, isPublic], __options);
	}

	/**
	* getWhitelistSaleTotalPurchasedAmount
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistSaleTotalPurchasedAmount" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getWhitelistSaleTotalPurchasedAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* setName
	*
	* @param { (number | string | BN) } phaseId,
	* @param { string } name,
	*/
	"setName" (
		phaseId: (number | string | BN),
		name: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setName", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, name], __options);
	}

	/**
	* publicClaim
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"publicClaim" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::publicClaim", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* withdraw
	*
	* @param { (string | number | BN) } value,
	* @param { ArgumentTypes.AccountId } receiver,
	*/
	"withdraw" (
		value: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::withdraw", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [value, receiver], __options);
	}

	/**
	* setMultiPhases
	*
	* @param { Array<(number | string | BN)> } phaseId,
	* @param { Array<boolean> } isActive,
	* @param { Array<string> } name,
	* @param { Array<(number | string | BN)> } startTime,
	* @param { Array<(number | string | BN)> } endTime,
	* @param { Array<(number | string | BN)> } immediateReleaseRate,
	* @param { Array<(number | string | BN)> } vestingDuration,
	* @param { Array<(number | string | BN)> } vestingUnit,
	* @param { Array<boolean> } isPublic,
	* @param { Array<(string | number | BN)> } totalAmount,
	* @param { Array<(string | number | BN)> } price,
	*/
	"setMultiPhases" (
		phaseId: Array<(number | string | BN)>,
		isActive: Array<boolean>,
		name: Array<string>,
		startTime: Array<(number | string | BN)>,
		endTime: Array<(number | string | BN)>,
		immediateReleaseRate: Array<(number | string | BN)>,
		vestingDuration: Array<(number | string | BN)>,
		vestingUnit: Array<(number | string | BN)>,
		isPublic: Array<boolean>,
		totalAmount: Array<(string | number | BN)>,
		price: Array<(string | number | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setMultiPhases", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, isActive, name, startTime, endTime, immediateReleaseRate, vestingDuration, vestingUnit, isPublic, totalAmount, price], __options);
	}

	/**
	* setTotalSupply
	*
	* @param { (string | number | BN) } totalSupply,
	*/
	"setTotalSupply" (
		totalSupply: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setTotalSupply", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [totalSupply], __options);
	}

	/**
	* getProjectInfoUri
	*
	*/
	"getProjectInfoUri" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getProjectInfoUri", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* setTxRate
	*
	* @param { (number | string | BN) } txRate,
	*/
	"setTxRate" (
		txRate: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setTxRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [txRate], __options);
	}

	/**
	* getTotalSupply
	*
	*/
	"getTotalSupply" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getTotalSupply", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* getImmediateReleaseRate
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getImmediateReleaseRate" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getImmediateReleaseRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* setVestingDuration
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } vestingDuration,
	*/
	"setVestingDuration" (
		phaseId: (number | string | BN),
		vestingDuration: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setVestingDuration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, vestingDuration], __options);
	}

	/**
	* burnUnsoldTokens
	*
	*/
	"burnUnsoldTokens" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::burnUnsoldTokens", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* setVestingUnit
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } vestingUnit,
	*/
	"setVestingUnit" (
		phaseId: (number | string | BN),
		vestingUnit: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setVestingUnit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, vestingUnit], __options);
	}

	/**
	* getPublicBuyer
	*
	* @param { (number | string | BN) } phaseId,
	* @param { ArgumentTypes.AccountId } account,
	*/
	"getPublicBuyer" (
		phaseId: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getPublicBuyer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, account], __options);
	}

	/**
	* getWhitelistAccountCount
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistAccountCount" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getWhitelistAccountCount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getPublicSaleTotalPurchasedAmount
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getPublicSaleTotalPurchasedAmount" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getPublicSaleTotalPurchasedAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getVestingDuration
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getVestingDuration" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getVestingDuration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getPublicSaleTotalClaimedAmount
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getPublicSaleTotalClaimedAmount" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getPublicSaleTotalClaimedAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getTokenAddress
	*
	*/
	"getTokenAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* setTokenAddress
	*
	* @param { ArgumentTypes.AccountId } tokenAddress,
	*/
	"setTokenAddress" (
		tokenAddress: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [tokenAddress], __options);
	}

	/**
	* getWhitelistSaleTotalClaimedAmount
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistSaleTotalClaimedAmount" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getWhitelistSaleTotalClaimedAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* setIsActive
	*
	* @param { (number | string | BN) } phaseId,
	* @param { boolean } isActive,
	*/
	"setIsActive" (
		phaseId: (number | string | BN),
		isActive: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setIsActive", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, isActive], __options);
	}

	/**
	* getWhitelistBuyer
	*
	* @param { (number | string | BN) } phaseId,
	* @param { ArgumentTypes.AccountId } account,
	*/
	"getWhitelistBuyer" (
		phaseId: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getWhitelistBuyer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, account], __options);
	}

	/**
	* getWhitelistSaleTotalAmount
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistSaleTotalAmount" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getWhitelistSaleTotalAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* setImmediateReleaseRate
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } immediateReleaseRate,
	*/
	"setImmediateReleaseRate" (
		phaseId: (number | string | BN),
		immediateReleaseRate: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setImmediateReleaseRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, immediateReleaseRate], __options);
	}

	/**
	* getIsActive
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getIsActive" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getIsActive", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* withdrawUnsoldTokens
	*
	* @param { ArgumentTypes.AccountId } receiver,
	*/
	"withdrawUnsoldTokens" (
		receiver: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::withdrawUnsoldTokens", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [receiver], __options);
	}

	/**
	* setGeneratorContract
	*
	* @param { ArgumentTypes.AccountId } generatorContract,
	*/
	"setGeneratorContract" (
		generatorContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setGeneratorContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [generatorContract], __options);
	}

	/**
	* getWhitelistSaleInfo
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistSaleInfo" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getWhitelistSaleInfo", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getWhitelistAccount
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } accountIndex,
	*/
	"getWhitelistAccount" (
		phaseId: (number | string | BN),
		accountIndex: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getWhitelistAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, accountIndex], __options);
	}

	/**
	* addMultiWhitelists
	*
	* @param { (number | string | BN) } phaseId,
	* @param { Array<ArgumentTypes.AccountId> } accounts,
	* @param { Array<(string | number | BN)> } whitelistAmounts,
	* @param { Array<(string | number | BN)> } whitelistPrices,
	*/
	"addMultiWhitelists" (
		phaseId: (number | string | BN),
		accounts: Array<ArgumentTypes.AccountId>,
		whitelistAmounts: Array<(string | number | BN)>,
		whitelistPrices: Array<(string | number | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::addMultiWhitelists", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, accounts, whitelistAmounts, whitelistPrices], __options);
	}

	/**
	* getEndTime
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getEndTime" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getEndTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* setProjectInfoUri
	*
	* @param { string } projectInfoUri,
	*/
	"setProjectInfoUri" (
		projectInfoUri: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setProjectInfoUri", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [projectInfoUri], __options);
	}

	/**
	* getStartTime
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getStartTime" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getStartTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* whitelistPurchase
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (string | number | BN) } amount,
	*/
	"whitelistPurchase" (
		phaseId: (number | string | BN),
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::whitelistPurchase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, amount], __options);
	}

	/**
	* setPublicTotalAmount
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (string | number | BN) } totalAmount,
	*/
	"setPublicTotalAmount" (
		phaseId: (number | string | BN),
		totalAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setPublicTotalAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, totalAmount], __options);
	}

	/**
	* getVestingUnit
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getVestingUnit" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getVestingUnit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* topup
	*
	* @param { (string | number | BN) } amount,
	*/
	"topup" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::topup", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [amount], __options);
	}

	/**
	* getProjectStartTime
	*
	*/
	"getProjectStartTime" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getProjectStartTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* getAvailableTokenAmount
	*
	*/
	"getAvailableTokenAmount" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getAvailableTokenAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* getPublicSaleTotalAmount
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getPublicSaleTotalAmount" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getPublicSaleTotalAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* publicPurchase
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (string | number | BN) } amount,
	*/
	"publicPurchase" (
		phaseId: (number | string | BN),
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::publicPurchase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, amount], __options);
	}

	/**
	* getProjectEndTime
	*
	*/
	"getProjectEndTime" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getProjectEndTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* getTotalPhase
	*
	*/
	"getTotalPhase" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getTotalPhase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* getPhase
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getPhase" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getPhase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getGeneratorContract
	*
	*/
	"getGeneratorContract" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getGeneratorContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* setPublicSalePrice
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (string | number | BN) } price,
	*/
	"setPublicSalePrice" (
		phaseId: (number | string | BN),
		price: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setPublicSalePrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, price], __options);
	}

	/**
	* getPublicSalePrice
	*
	* @param { (number | string | BN) } phaseId,
	*/
	"getPublicSalePrice" (
		phaseId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getPublicSalePrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getBalance
	*
	*/
	"getBalance" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* getTxRate
	*
	*/
	"getTxRate" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getTxRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* setStartAndEndTime
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } startTime,
	* @param { (number | string | BN) } endTime,
	*/
	"setStartAndEndTime" (
		phaseId: (number | string | BN),
		startTime: (number | string | BN),
		endTime: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setStartAndEndTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, startTime, endTime], __options);
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
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [codeHash], __options);
	}

	/**
	* hasRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } address,
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::hasRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role, address], __options);
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::revokeRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role, account], __options);
	}

	/**
	* renounceRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::renounceRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role, account], __options);
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
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role], __options);
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::grantRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role, account], __options);
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
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role], __options);
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
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role, index], __options);
	}

}