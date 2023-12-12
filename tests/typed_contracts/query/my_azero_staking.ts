/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_azero_staking';
import type * as ReturnTypes from '../types-returns/my_azero_staking';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/my_azero_staking.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;
	readonly __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* withdrawInwFromInterestAccount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawInwFromInterestAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::withdrawInwFromInterestAccount", [receiver, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequest
	*
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnTypes.WithdrawalRequestInformation | null, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequest" (
		index: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WithdrawalRequestInformation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequest", [index], __options , (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setInterestDistributionContract
	*
	* @param { ArgumentTypes.AccountId } interestDistributionContract,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setInterestDistributionContract" (
		interestDistributionContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setInterestDistributionContract", [interestDistributionContract], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequestIndexListByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<Array<ReturnNumber>, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestIndexListByUser" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnNumber>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestIndexListByUser", [user], __options , (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMaxTotalStakingAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getMaxTotalStakingAmount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getMaxTotalStakingAmount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* claim
	*
	* @param { (string | number | BN) } requestIndex,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"claim" (
		requestIndex: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::claim", [requestIndex], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getUnstakingFee
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getUnstakingFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getUnstakingFee", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPayableAzero
	*
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getPayableAzero" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getPayableAzero", [], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* topupInwInterestAccount
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"topupInwInterestAccount" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::topupInwInterestAccount", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setInwContract
	*
	* @param { ArgumentTypes.AccountId } inwContract,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setInwContract" (
		inwContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setInwContract", [inwContract], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setUnstakingFee
	*
	* @param { (string | number | BN) } unstakingFee,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setUnstakingFee" (
		unstakingFee: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setUnstakingFee", [unstakingFee], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMaxWaitingTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getMaxWaitingTime" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getMaxWaitingTime", [], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInwMultiplier
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getInwMultiplier" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getInwMultiplier", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInterestDistributionContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getInterestDistributionContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getInterestDistributionContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setTotalAzeroReservedForWithdrawals
	*
	* @param { (string | number | BN) } totalAzeroReservedForWithdrawals,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setTotalAzeroReservedForWithdrawals" (
		totalAzeroReservedForWithdrawals: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setTotalAzeroReservedForWithdrawals", [totalAzeroReservedForWithdrawals], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAzeroBalance
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getAzeroBalance" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getAzeroBalance", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalAzeroClaimed
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroClaimed" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroClaimed", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setApy
	*
	* @param { (string | number | BN) } apy,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setApy" (
		apy: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setApy", [apy], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawAzeroFromStakeAccount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawAzeroFromStakeAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::withdrawAzeroFromStakeAccount", [receiver, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalWithdrawalRequestCancelled
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getTotalWithdrawalRequestCancelled" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalWithdrawalRequestCancelled", [user], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWaitingWithdrawalList
	*
	* @returns { Result<Array<ReturnNumber>, ReturnTypes.LangError> }
	*/
	"getWaitingWithdrawalList" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnNumber>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWaitingWithdrawalList", [], __options , (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequestListByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<Array<ReturnTypes.WithdrawalRequestInformation>, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestListByUser" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.WithdrawalRequestInformation>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestListByUser", [user], __options , (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setIsLocked
	*
	* @param { boolean } isLocked,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setIsLocked" (
		isLocked: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setIsLocked", [isLocked], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWaitingWithdrawalCount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getWaitingWithdrawalCount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWaitingWithdrawalCount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAzeroInterestAccount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getAzeroInterestAccount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getAzeroInterestAccount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setIsSelectingRequestsToPay
	*
	* @param { boolean } isSelectingRequestsToPay,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setIsSelectingRequestsToPay" (
		isSelectingRequestsToPay: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setIsSelectingRequestsToPay", [isSelectingRequestsToPay], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawAzeroToStake
	*
	* @param { (number | string | BN) } expirationDuration,
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawAzeroToStake" (
		expirationDuration: (number | string | BN),
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::withdrawAzeroToStake", [expirationDuration, receiver, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalAzeroReservedForWithdrawals
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroReservedForWithdrawals" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroReservedForWithdrawals", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequestList
	*
	* @returns { Result<Array<ReturnTypes.WithdrawalRequestInformation>, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestList" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.WithdrawalRequestInformation>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestList", [], __options , (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getIsLocked
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"getIsLocked" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getIsLocked", [], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMinStakingAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getMinStakingAmount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getMinStakingAmount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getStakeInfo
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @returns { Result<Result<ReturnTypes.StakeInformation | null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getStakeInfo" (
		staker: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.StakeInformation | null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getStakeInfo", [staker], __options , (result) => { return handleReturnType(result, getTypeDescription(35, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setWithdrawalRequestInfoStatus
	*
	* @param { (string | number | BN) } requestIndex,
	* @param { (number | string | BN) } status,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setWithdrawalRequestInfoStatus" (
		requestIndex: (string | number | BN),
		status: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setWithdrawalRequestInfoStatus", [requestIndex, status], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequestCount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestCount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestCount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestIndexByUser", [user, index], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawAzeroFromInterestAccount
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawAzeroFromInterestAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::withdrawAzeroFromInterestAccount", [receiver, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getStakerList
	*
	* @returns { Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> }
	*/
	"getStakerList" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getStakerList", [], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMaxWaitingTime
	*
	* @param { (number | string | BN) } maxWaitingTime,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setMaxWaitingTime" (
		maxWaitingTime: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setMaxWaitingTime", [maxWaitingTime], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMinStakingAmount
	*
	* @param { (string | number | BN) } minStakingAmount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setMinStakingAmount" (
		minStakingAmount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setMinStakingAmount", [minStakingAmount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawalRequestCountByUser
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getWithdrawalRequestCountByUser" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawalRequestCountByUser", [user], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalAzeroStaked
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroStaked" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroStaked", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalStakers
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalStakers" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalStakers", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateUnclaimedRewardsWhenLocked
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @param { (number | string | BN) } currentTime,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"updateUnclaimedRewardsWhenLocked" (
		staker: ArgumentTypes.AccountId,
		currentTime: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::updateUnclaimedRewardsWhenLocked", [staker, currentTime], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawAzeroNotInAccounts
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawAzeroNotInAccounts" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::withdrawAzeroNotInAccounts", [receiver, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setInwMultiplier
	*
	* @param { (string | number | BN) } inwMultiplier,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setInwMultiplier" (
		inwMultiplier: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setInwMultiplier", [inwMultiplier], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAzeroStakeAccount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getAzeroStakeAccount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getAzeroStakeAccount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMaxTotalStakingAmount
	*
	* @param { (string | number | BN) } maxTotalStakingAmount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setMaxTotalStakingAmount" (
		maxTotalStakingAmount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::setMaxTotalStakingAmount", [maxTotalStakingAmount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalAzeroWithdrawnToStake
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroWithdrawnToStake" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroWithdrawnToStake", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalInwClaimed
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalInwClaimed" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalInwClaimed", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWithdrawableAzeroToStakeToValidator
	*
	* @param { (number | string | BN) } expirationDuration,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getWithdrawableAzeroToStakeToValidator" (
		expirationDuration: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWithdrawableAzeroToStakeToValidator", [expirationDuration], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getIsSelectingRequestsToPay
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"getIsSelectingRequestsToPay" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getIsSelectingRequestsToPay", [], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* removeRequestIndexInWithdrawalWaitingList
	*
	* @param { (string | number | BN) } requestIndex,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"removeRequestIndexInWithdrawalWaitingList" (
		requestIndex: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::removeRequestIndexInWithdrawalWaitingList", [requestIndex], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getBlockTimestamp
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getBlockTimestamp" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getBlockTimestamp", [], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* claimRewards
	*
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"claimRewards" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::claimRewards", [], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalWithdrawalRequestClaimed
	*
	* @param { ArgumentTypes.AccountId } claimer,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getTotalWithdrawalRequestClaimed" (
		claimer: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalWithdrawalRequestClaimed", [claimer], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInwInterestAccount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getInwInterestAccount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getInwInterestAccount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInwContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getInwContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getInwContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getApy
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getApy" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getApy", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawalRequest
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawalRequest" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::withdrawalRequest", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTotalAzeroForWaitingWithdrawals
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getTotalAzeroForWaitingWithdrawals" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getTotalAzeroForWaitingWithdrawals", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* stake
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"stake" (
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::stake", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getWaitingWithdrawalIndex
	*
	* @param { (string | number | BN) } index,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getWaitingWithdrawalIndex" (
		index: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getWaitingWithdrawalIndex", [index], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getUnclaimedRewardAtLastTopup
	*
	* @returns { Result<Result<ReturnTypes.UnclaimedRewardAtLastTopup, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getUnclaimedRewardAtLastTopup" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.UnclaimedRewardAtLastTopup, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getUnclaimedRewardAtLastTopup", [], __options , (result) => { return handleReturnType(result, getTypeDescription(40, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawAzeroEmergency
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawAzeroEmergency" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::withdrawAzeroEmergency", [receiver, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLastAzeroInterestTopup
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getLastAzeroInterestTopup" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::getLastAzeroInterestTopup", [], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawInwNotInAccounts
	*
	* @param { ArgumentTypes.AccountId } receiver,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawInwNotInAccounts" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::withdrawInwNotInAccounts", [receiver, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* cancel
	*
	* @param { (string | number | BN) } requestIndex,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"cancel" (
		requestIndex: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::cancel", [requestIndex], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* topupAzeroInterestAccount
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"topupAzeroInterestAccount" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::topupAzeroInterestAccount", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* topupAzeroStakeAccount
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"topupAzeroStakeAccount" (
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "azeroStakingTrait::topupAzeroStakeAccount", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setCode
	*
	* @param { Array<(number | string | BN)> } codeHash,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setCode" (
		codeHash: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "upgradeableTrait::setCode", [codeHash], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options , (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::revokeRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(45, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::grantRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(45, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::renounceRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(45, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMember", [role, index], __options , (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleMemberCount
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleMemberCount" (
		role: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMemberCount", [role], __options , (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(48, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId | null } newOwner,
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(48, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
	}

}