/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_launchpad';
import type * as ReturnTypes from '../types-returns/my_launchpad';
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
	* @param { string } projectInfoUri,
	* @param { ArgumentTypes.AccountId } tokenAddress,
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
	* @returns { void }
	*/
	"initialize" (
		projectInfoUri: string,
		tokenAddress: ArgumentTypes.AccountId,
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
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [projectInfoUri, tokenAddress, generatorContract, txRate, phaseName, phaseStartTime, phaseEndTime, phaseImmediateReleaseRate, phaseVestingDuration, phaseVestingUnit, phaseIsPublic, phasePublicAmount, phasePublicPrice], __options);
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
	* @returns { void }
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
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "addNewPhase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [name, startTime, endTime, immediateReleaseRate, vestingDuration, vestingUnit, isPublic, publicAmount, publicPrice], __options);
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
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
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
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, 'my_launchpad')); });
	}

	/**
	* getEndTime
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<number | null, ReturnTypes.LangError> }
	*/
	"getEndTime" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getEndTime", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(26, 'my_launchpad')); });
	}

	/**
	* getTokenAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getTokenAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getTokenAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, 'my_launchpad')); });
	}

	/**
	* getWhitelistAccount
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } accountIndex,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getWhitelistAccount" (
		phaseId: (number | string | BN),
		accountIndex: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistAccount", [phaseId, accountIndex], __options, (result) => { return handleReturnType(result, getTypeDescription(28, 'my_launchpad')); });
	}

	/**
	* whitelistPurchase
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"whitelistPurchase" (
		phaseId: (number | string | BN),
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::whitelistPurchase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, amount], __options);
	}

	/**
	* withdrawUnsoldTokens
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @returns { void }
	*/
	"withdrawUnsoldTokens" (
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::withdrawUnsoldTokens", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [receiver], __options);
	}

	/**
	* setPublicTotalAmount
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (string | number | BN) } totalAmount,
	* @returns { void }
	*/
	"setPublicTotalAmount" (
		phaseId: (number | string | BN),
		totalAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setPublicTotalAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, totalAmount], __options);
	}

	/**
	* getPublicSaleTotalPurchasedAmount
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getPublicSaleTotalPurchasedAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSaleTotalPurchasedAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(30, 'my_launchpad')); });
	}

	/**
	* addMultiWhitelists
	*
	* @param { (number | string | BN) } phaseId,
	* @param { Array<ArgumentTypes.AccountId> } accounts,
	* @param { Array<(string | number | BN)> } whitelistAmounts,
	* @param { Array<(string | number | BN)> } whitelistPrices,
	* @returns { void }
	*/
	"addMultiWhitelists" (
		phaseId: (number | string | BN),
		accounts: Array<ArgumentTypes.AccountId>,
		whitelistAmounts: Array<(string | number | BN)>,
		whitelistPrices: Array<(string | number | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::addMultiWhitelists", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, accounts, whitelistAmounts, whitelistPrices], __options);
	}

	/**
	* setStartAndEndTime
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } startTime,
	* @param { (number | string | BN) } endTime,
	* @returns { void }
	*/
	"setStartAndEndTime" (
		phaseId: (number | string | BN),
		startTime: (number | string | BN),
		endTime: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setStartAndEndTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, startTime, endTime], __options);
	}

	/**
	* setName
	*
	* @param { (number | string | BN) } phaseId,
	* @param { string } name,
	* @returns { void }
	*/
	"setName" (
		phaseId: (number | string | BN),
		name: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setName", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, name], __options);
	}

	/**
	* getIsActive
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<boolean | null, ReturnTypes.LangError> }
	*/
	"getIsActive" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getIsActive", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(33, 'my_launchpad')); });
	}

	/**
	* getProjectInfoUri
	*
	* @returns { Result<string, ReturnTypes.LangError> }
	*/
	"getProjectInfoUri" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getProjectInfoUri", [], __options, (result) => { return handleReturnType(result, getTypeDescription(35, 'my_launchpad')); });
	}

	/**
	* getProjectEndTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getProjectEndTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getProjectEndTime", [], __options, (result) => { return handleReturnType(result, getTypeDescription(36, 'my_launchpad')); });
	}

	/**
	* getName
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<string | null, ReturnTypes.LangError> }
	*/
	"getName" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getName", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(37, 'my_launchpad')); });
	}

	/**
	* getWhitelistSaleInfo
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnTypes.WhitelistSaleInfo | null, ReturnTypes.LangError> }
	*/
	"getWhitelistSaleInfo" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WhitelistSaleInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistSaleInfo", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(39, 'my_launchpad')); });
	}

	/**
	* setImmediateReleaseRate
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } immediateReleaseRate,
	* @returns { void }
	*/
	"setImmediateReleaseRate" (
		phaseId: (number | string | BN),
		immediateReleaseRate: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setImmediateReleaseRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, immediateReleaseRate], __options);
	}

	/**
	* getWhitelistSaleTotalPurchasedAmount
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getWhitelistSaleTotalPurchasedAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistSaleTotalPurchasedAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(30, 'my_launchpad')); });
	}

	/**
	* getBalance
	*
	* @returns { void }
	*/
	"getBalance" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::getBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* getPublicSaleTotalAmount
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getPublicSaleTotalAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSaleTotalAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(30, 'my_launchpad')); });
	}

	/**
	* getWhitelistSaleTotalAmount
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getWhitelistSaleTotalAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistSaleTotalAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(30, 'my_launchpad')); });
	}

	/**
	* getVestingUnit
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<number | null, ReturnTypes.LangError> }
	*/
	"getVestingUnit" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getVestingUnit", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(26, 'my_launchpad')); });
	}

	/**
	* getTxRate
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTxRate" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getTxRate", [], __options, (result) => { return handleReturnType(result, getTypeDescription(44, 'my_launchpad')); });
	}

	/**
	* getImmediateReleaseRate
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<number | null, ReturnTypes.LangError> }
	*/
	"getImmediateReleaseRate" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getImmediateReleaseRate", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(45, 'my_launchpad')); });
	}

	/**
	* getStartTime
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<number | null, ReturnTypes.LangError> }
	*/
	"getStartTime" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getStartTime", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(26, 'my_launchpad')); });
	}

	/**
	* setPublicSalePrice
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (string | number | BN) } price,
	* @returns { void }
	*/
	"setPublicSalePrice" (
		phaseId: (number | string | BN),
		price: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setPublicSalePrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, price], __options);
	}

	/**
	* getPublicSaleTotalClaimedAmount
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getPublicSaleTotalClaimedAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSaleTotalClaimedAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(30, 'my_launchpad')); });
	}

	/**
	* updateMultiWhitelists
	*
	* @param { (number | string | BN) } phaseId,
	* @param { Array<ArgumentTypes.AccountId> } accounts,
	* @param { Array<(string | number | BN)> } whitelistAmounts,
	* @param { Array<(string | number | BN)> } whitelistPrices,
	* @returns { void }
	*/
	"updateMultiWhitelists" (
		phaseId: (number | string | BN),
		accounts: Array<ArgumentTypes.AccountId>,
		whitelistAmounts: Array<(string | number | BN)>,
		whitelistPrices: Array<(string | number | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::updateMultiWhitelists", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, accounts, whitelistAmounts, whitelistPrices], __options);
	}

	/**
	* getPublicSalePrice
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getPublicSalePrice" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSalePrice", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(30, 'my_launchpad')); });
	}

	/**
	* getWhitelistAccountCount
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getWhitelistAccountCount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistAccountCount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(36, 'my_launchpad')); });
	}

	/**
	* getVestingDuration
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<number | null, ReturnTypes.LangError> }
	*/
	"getVestingDuration" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getVestingDuration", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(26, 'my_launchpad')); });
	}

	/**
	* getGeneratorContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getGeneratorContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getGeneratorContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(25, 'my_launchpad')); });
	}

	/**
	* getWhitelistSaleTotalClaimedAmount
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getWhitelistSaleTotalClaimedAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistSaleTotalClaimedAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(30, 'my_launchpad')); });
	}

	/**
	* setProjectInfoUri
	*
	* @param { string } projectInfoUri,
	* @returns { void }
	*/
	"setProjectInfoUri" (
		projectInfoUri: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setProjectInfoUri", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [projectInfoUri], __options);
	}

	/**
	* getPublicBuyer
	*
	* @param { (number | string | BN) } phaseId,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<ReturnTypes.BuyerInformation | null, ReturnTypes.LangError> }
	*/
	"getPublicBuyer" (
		phaseId: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.BuyerInformation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicBuyer", [phaseId, account], __options, (result) => { return handleReturnType(result, getTypeDescription(47, 'my_launchpad')); });
	}

	/**
	* setTokenAddress
	*
	* @param { ArgumentTypes.AccountId } tokenAddress,
	* @returns { void }
	*/
	"setTokenAddress" (
		tokenAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setTokenAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [tokenAddress], __options);
	}

	/**
	* topup
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"topup" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::topup", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [amount], __options);
	}

	/**
	* setGeneratorContract
	*
	* @param { ArgumentTypes.AccountId } generatorContract,
	* @returns { void }
	*/
	"setGeneratorContract" (
		generatorContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setGeneratorContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [generatorContract], __options);
	}

	/**
	* burnUnsoldTokens
	*
	* @returns { void }
	*/
	"burnUnsoldTokens" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::burnUnsoldTokens", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [], __options);
	}

	/**
	* getProjectStartTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getProjectStartTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getProjectStartTime", [], __options, (result) => { return handleReturnType(result, getTypeDescription(36, 'my_launchpad')); });
	}

	/**
	* getTotalPhase
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTotalPhase" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getTotalPhase", [], __options, (result) => { return handleReturnType(result, getTypeDescription(50, 'my_launchpad')); });
	}

	/**
	* setVestingDuration
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } vestingDuration,
	* @returns { void }
	*/
	"setVestingDuration" (
		phaseId: (number | string | BN),
		vestingDuration: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setVestingDuration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, vestingDuration], __options);
	}

	/**
	* getPhase
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnTypes.PhaseInfo | null, ReturnTypes.LangError> }
	*/
	"getPhase" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.PhaseInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPhase", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(51, 'my_launchpad')); });
	}

	/**
	* setTxRate
	*
	* @param { (number | string | BN) } txRate,
	* @returns { void }
	*/
	"setTxRate" (
		txRate: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setTxRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [txRate], __options);
	}

	/**
	* setVestingUnit
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (number | string | BN) } vestingUnit,
	* @returns { void }
	*/
	"setVestingUnit" (
		phaseId: (number | string | BN),
		vestingUnit: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setVestingUnit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, vestingUnit], __options);
	}

	/**
	* setIsActive
	*
	* @param { (number | string | BN) } phaseId,
	* @param { boolean } isActive,
	* @returns { void }
	*/
	"setIsActive" (
		phaseId: (number | string | BN),
		isActive: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setIsActive", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, isActive], __options);
	}

	/**
	* getPublicSaleInfo
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { Result<ReturnTypes.PublicSaleInfo | null, ReturnTypes.LangError> }
	*/
	"getPublicSaleInfo" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.PublicSaleInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSaleInfo", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(54, 'my_launchpad')); });
	}

	/**
	* publicPurchase
	*
	* @param { (number | string | BN) } phaseId,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"publicPurchase" (
		phaseId: (number | string | BN),
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::publicPurchase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId, amount], __options);
	}

	/**
	* publicClaim
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { void }
	*/
	"publicClaim" (
		phaseId: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"withdraw" (
		value: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::withdraw", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [value, receiver], __options);
	}

	/**
	* whitelistClaim
	*
	* @param { (number | string | BN) } phaseId,
	* @returns { void }
	*/
	"whitelistClaim" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::whitelistClaim", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [phaseId], __options);
	}

	/**
	* getWhitelistBuyer
	*
	* @param { (number | string | BN) } phaseId,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<ReturnTypes.WhitelistBuyerInfo | null, ReturnTypes.LangError> }
	*/
	"getWhitelistBuyer" (
		phaseId: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WhitelistBuyerInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistBuyer", [phaseId, account], __options, (result) => { return handleReturnType(result, getTypeDescription(57, 'my_launchpad')); });
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
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [codeHash], __options);
	}

	/**
	* hasRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } address,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options, (result) => { return handleReturnType(result, getTypeDescription(60, 'my_launchpad')); });
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::revokeRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role, account], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(44, 'my_launchpad')); });
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::grantRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
		}, [role, account], __options);
	}

	/**
	* renounceRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::renounceRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_launchpad");
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMember", [role, index], __options, (result) => { return handleReturnType(result, getTypeDescription(28, 'my_launchpad')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMemberCount", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(44, 'my_launchpad')); });
	}

}