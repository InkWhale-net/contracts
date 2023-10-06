/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_launchpad_op4';
import type * as ReturnTypes from '../types-returns/my_launchpad_op4';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/my_launchpad_op4.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_launchpad_op4.json';


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
	* addNewPhase
	*
	* @param { ArgumentTypes.PhaseInput } phase,
	* @returns { void }
	*/
	"addNewPhase" (
		phase: ArgumentTypes.PhaseInput,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "addNewPhase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phase], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, vestingUnit], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, accounts, whitelistAmounts, whitelistPrices], __options);
	}

	/**
	* getGeneratorContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getGeneratorContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getGeneratorContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, isActive], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, price], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getVestingDuration", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, amount], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistSaleTotalPurchasedAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistSaleInfo", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicBuyer", [phaseId, account], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, accounts, whitelistAmounts, whitelistPrices], __options);
	}

	/**
	* getTxRate
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTxRate" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getTxRate", [], __options, (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [tokenAddress], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [value, receiver], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [amount], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistAccount", [phaseId, accountIndex], __options, (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getStartTime", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, totalAmount], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, amount], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getEndTime", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAvailableTokenAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getAvailableTokenAmount" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getAvailableTokenAmount", [], __options, (result) => { return handleReturnType(result, getTypeDescription(38, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getIsActive", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, vestingDuration], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, immediateReleaseRate], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSalePrice", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalPhase
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTotalPhase" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getTotalPhase", [], __options, (result) => { return handleReturnType(result, getTypeDescription(41, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSaleInfo", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getName", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(45, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getVestingUnit", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSaleTotalAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, name], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistBuyer", [phaseId, account], __options, (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPhase", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(50, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistAccountCount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(53, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSaleTotalClaimedAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, startTime, endTime], __options);
	}

	/**
	* setTotalSupply
	*
	* @param { (string | number | BN) } totalSupply,
	* @returns { void }
	*/
	"setTotalSupply" (
		totalSupply: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setTotalSupply", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [totalSupply], __options);
	}

	/**
	* setPhase
	*
	* @param { (number | string | BN) } phaseId,
	* @param { boolean } isActive,
	* @param { ArgumentTypes.PhaseInput } phaseInput,
	* @returns { void }
	*/
	"setPhase" (
		phaseId: (number | string | BN),
		isActive: boolean,
		phaseInput: ArgumentTypes.PhaseInput,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setPhase", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, isActive, phaseInput], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getPublicSaleTotalPurchasedAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [txRate], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [receiver], __options);
	}

	/**
	* getProjectInfoUri
	*
	* @returns { Result<string, ReturnTypes.LangError> }
	*/
	"getProjectInfoUri" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getProjectInfoUri", [], __options, (result) => { return handleReturnType(result, getTypeDescription(54, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [generatorContract], __options);
	}

	/**
	* getProjectEndTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getProjectEndTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getProjectEndTime", [], __options, (result) => { return handleReturnType(result, getTypeDescription(53, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistSaleTotalAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMultiPhases
	*
	* @param { Array<(number | string | BN)> } phaseId,
	* @param { Array<boolean> } isActive,
	* @param { Array<ArgumentTypes.PhaseInput> } phases,
	* @returns { void }
	*/
	"setMultiPhases" (
		phaseId: Array<(number | string | BN)>,
		isActive: Array<boolean>,
		phases: Array<ArgumentTypes.PhaseInput>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setMultiPhases", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, isActive, phases], __options);
	}

	/**
	* getProjectStartTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getProjectStartTime" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getProjectStartTime", [], __options, (result) => { return handleReturnType(result, getTypeDescription(53, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalSupply
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalSupply" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getTotalSupply", [], __options, (result) => { return handleReturnType(result, getTypeDescription(38, DATA_TYPE_DESCRIPTIONS)); });
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [projectInfoUri], __options);
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getWhitelistSaleTotalClaimedAmount", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getImmediateReleaseRate", [phaseId], __options, (result) => { return handleReturnType(result, getTypeDescription(57, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setIsPublic
	*
	* @param { (number | string | BN) } phaseId,
	* @param { boolean } isPublic,
	* @returns { void }
	*/
	"setIsPublic" (
		phaseId: (number | string | BN),
		isPublic: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "launchpadContractTrait::setIsPublic", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [phaseId, isPublic], __options);
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
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getTokenAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getTokenAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadContractTrait::getTokenAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
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
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options, (result) => { return handleReturnType(result, getTypeDescription(61, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMember", [role, index], __options, (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMemberCount", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
	}

}