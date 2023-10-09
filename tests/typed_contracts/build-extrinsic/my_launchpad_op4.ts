/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_launchpad_op4';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * addNewPhase
	 *
	 * @param { ArgumentTypes.PhaseInput } phase,
	*/
	"addNewPhase" (
		phase: ArgumentTypes.PhaseInput,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "addNewPhase", [phase], __options);
	}

	/**
	 * getWhitelistAccountCount
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistAccountCount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getWhitelistAccountCount", [phaseId], __options);
	}

	/**
	 * getProjectInfoUri
	 *
	*/
	"getProjectInfoUri" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getProjectInfoUri", [], __options);
	}

	/**
	 * getWhitelistSaleTotalAmount
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistSaleTotalAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getWhitelistSaleTotalAmount", [phaseId], __options);
	}

	/**
	 * setGeneratorContract
	 *
	 * @param { ArgumentTypes.AccountId } generatorContract,
	*/
	"setGeneratorContract" (
		generatorContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setGeneratorContract", [generatorContract], __options);
	}

	/**
	 * getName
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getName" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getName", [phaseId], __options);
	}

	/**
	 * setTokenAddress
	 *
	 * @param { ArgumentTypes.AccountId } tokenAddress,
	*/
	"setTokenAddress" (
		tokenAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setTokenAddress", [tokenAddress], __options);
	}

	/**
	 * getImmediateReleaseRate
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getImmediateReleaseRate" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getImmediateReleaseRate", [phaseId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setPublicTotalAmount", [phaseId, totalAmount], __options);
	}

	/**
	 * getPublicSaleInfo
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getPublicSaleInfo" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getPublicSaleInfo", [phaseId], __options);
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
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::publicPurchase", [phaseId, amount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::addMultiWhitelists", [phaseId, accounts, whitelistAmounts, whitelistPrices], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getWhitelistAccount", [phaseId, accountIndex], __options);
	}

	/**
	 * getProjectStartTime
	 *
	*/
	"getProjectStartTime" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getProjectStartTime", [], __options);
	}

	/**
	 * getVestingDuration
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getVestingDuration" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getVestingDuration", [phaseId], __options);
	}

	/**
	 * getTxRate
	 *
	*/
	"getTxRate" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getTxRate", [], __options);
	}

	/**
	 * getPhase
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getPhase" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getPhase", [phaseId], __options);
	}

	/**
	 * getVestingUnit
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getVestingUnit" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getVestingUnit", [phaseId], __options);
	}

	/**
	 * getWhitelistSaleTotalClaimedAmount
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistSaleTotalClaimedAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getWhitelistSaleTotalClaimedAmount", [phaseId], __options);
	}

	/**
	 * setTotalSupply
	 *
	 * @param { (string | number | BN) } totalSupply,
	*/
	"setTotalSupply" (
		totalSupply: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setTotalSupply", [totalSupply], __options);
	}

	/**
	 * burnUnsoldTokens
	 *
	*/
	"burnUnsoldTokens" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::burnUnsoldTokens", [], __options);
	}

	/**
	 * getAvailableTokenAmount
	 *
	*/
	"getAvailableTokenAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getAvailableTokenAmount", [], __options);
	}

	/**
	 * setPhase
	 *
	 * @param { (number | string | BN) } phaseId,
	 * @param { boolean } isActive,
	 * @param { ArgumentTypes.PhaseInput } phaseInput,
	*/
	"setPhase" (
		phaseId: (number | string | BN),
		isActive: boolean,
		phaseInput: ArgumentTypes.PhaseInput,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setPhase", [phaseId, isActive, phaseInput], __options);
	}

	/**
	 * getGeneratorContract
	 *
	*/
	"getGeneratorContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getGeneratorContract", [], __options);
	}

	/**
	 * getProjectEndTime
	 *
	*/
	"getProjectEndTime" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getProjectEndTime", [], __options);
	}

	/**
	 * getWhitelistSaleTotalPurchasedAmount
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistSaleTotalPurchasedAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getWhitelistSaleTotalPurchasedAmount", [phaseId], __options);
	}

	/**
	 * getTotalPhase
	 *
	*/
	"getTotalPhase" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getTotalPhase", [], __options);
	}

	/**
	 * setMultiPhases
	 *
	 * @param { Array<(number | string | BN)> } phaseId,
	 * @param { Array<boolean> } isActive,
	 * @param { Array<ArgumentTypes.PhaseInput> } phases,
	*/
	"setMultiPhases" (
		phaseId: Array<(number | string | BN)>,
		isActive: Array<boolean>,
		phases: Array<ArgumentTypes.PhaseInput>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setMultiPhases", [phaseId, isActive, phases], __options);
	}

	/**
	 * getBalance
	 *
	*/
	"getBalance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getBalance", [], __options);
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
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::whitelistPurchase", [phaseId, amount], __options);
	}

	/**
	 * getPublicSalePrice
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getPublicSalePrice" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getPublicSalePrice", [phaseId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getPublicBuyer", [phaseId, account], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setImmediateReleaseRate", [phaseId, immediateReleaseRate], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::updateMultiWhitelists", [phaseId, accounts, whitelistAmounts, whitelistPrices], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setIsActive", [phaseId, isActive], __options);
	}

	/**
	 * getStartTime
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getStartTime" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getStartTime", [phaseId], __options);
	}

	/**
	 * getEndTime
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getEndTime" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getEndTime", [phaseId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setVestingDuration", [phaseId, vestingDuration], __options);
	}

	/**
	 * getPublicSaleTotalClaimedAmount
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getPublicSaleTotalClaimedAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getPublicSaleTotalClaimedAmount", [phaseId], __options);
	}

	/**
	 * setProjectInfoUri
	 *
	 * @param { string } projectInfoUri,
	*/
	"setProjectInfoUri" (
		projectInfoUri: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setProjectInfoUri", [projectInfoUri], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setIsPublic", [phaseId, isPublic], __options);
	}

	/**
	 * getWhitelistSaleInfo
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getWhitelistSaleInfo" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getWhitelistSaleInfo", [phaseId], __options);
	}

	/**
	 * topup
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"topup" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::topup", [amount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setStartAndEndTime", [phaseId, startTime, endTime], __options);
	}

	/**
	 * publicClaim
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"publicClaim" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::publicClaim", [phaseId], __options);
	}

	/**
	 * getPublicSaleTotalPurchasedAmount
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getPublicSaleTotalPurchasedAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getPublicSaleTotalPurchasedAmount", [phaseId], __options);
	}

	/**
	 * whitelistClaim
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"whitelistClaim" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::whitelistClaim", [phaseId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setName", [phaseId, name], __options);
	}

	/**
	 * withdrawUnsoldTokens
	 *
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"withdrawUnsoldTokens" (
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::withdrawUnsoldTokens", [receiver], __options);
	}

	/**
	 * setTxRate
	 *
	 * @param { (number | string | BN) } txRate,
	*/
	"setTxRate" (
		txRate: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setTxRate", [txRate], __options);
	}

	/**
	 * getIsActive
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getIsActive" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getIsActive", [phaseId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setVestingUnit", [phaseId, vestingUnit], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getWhitelistBuyer", [phaseId, account], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::setPublicSalePrice", [phaseId, price], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::withdraw", [value, receiver], __options);
	}

	/**
	 * getPublicSaleTotalAmount
	 *
	 * @param { (number | string | BN) } phaseId,
	*/
	"getPublicSaleTotalAmount" (
		phaseId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getPublicSaleTotalAmount", [phaseId], __options);
	}

	/**
	 * getTokenAddress
	 *
	*/
	"getTokenAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getTokenAddress", [], __options);
	}

	/**
	 * getTotalSupply
	 *
	*/
	"getTotalSupply" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadContractTrait::getTotalSupply", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::hasRole", [role, address], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::grantRole", [role, account], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::revokeRole", [role, account], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::renounceRole", [role, account], __options);
	}

	/**
	 * getRoleAdmin
	 *
	 * @param { (number | string | BN) } role,
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::getRoleAdmin", [role], __options);
	}

	/**
	 * getRoleMemberCount
	 *
	 * @param { (number | string | BN) } role,
	*/
	"getRoleMemberCount" (
		role: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControlEnumerable::getRoleMemberCount", [role], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControlEnumerable::getRoleMember", [role, index], __options);
	}

	/**
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
	}

	/**
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::owner", [], __options);
	}

	/**
	 * transferOwnership
	 *
	 * @param { ArgumentTypes.AccountId | null } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::transferOwnership", [newOwner], __options);
	}

}