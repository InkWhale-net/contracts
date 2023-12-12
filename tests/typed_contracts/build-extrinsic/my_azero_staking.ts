/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_azero_staking';
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
	 * withdrawInwFromInterestAccount
	 *
	 * @param { ArgumentTypes.AccountId } receiver,
	 * @param { (string | number | BN) } amount,
	*/
	"withdrawInwFromInterestAccount" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawInwFromInterestAccount", [receiver, amount], __options);
	}

	/**
	 * getWithdrawalRequest
	 *
	 * @param { (string | number | BN) } index,
	*/
	"getWithdrawalRequest" (
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawalRequest", [index], __options);
	}

	/**
	 * setInterestDistributionContract
	 *
	 * @param { ArgumentTypes.AccountId } interestDistributionContract,
	*/
	"setInterestDistributionContract" (
		interestDistributionContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setInterestDistributionContract", [interestDistributionContract], __options);
	}

	/**
	 * getWithdrawalRequestIndexListByUser
	 *
	 * @param { ArgumentTypes.AccountId } user,
	*/
	"getWithdrawalRequestIndexListByUser" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawalRequestIndexListByUser", [user], __options);
	}

	/**
	 * getMaxTotalStakingAmount
	 *
	*/
	"getMaxTotalStakingAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getMaxTotalStakingAmount", [], __options);
	}

	/**
	 * claim
	 *
	 * @param { (string | number | BN) } requestIndex,
	*/
	"claim" (
		requestIndex: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::claim", [requestIndex], __options);
	}

	/**
	 * getUnstakingFee
	 *
	*/
	"getUnstakingFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getUnstakingFee", [], __options);
	}

	/**
	 * getPayableAzero
	 *
	*/
	"getPayableAzero" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getPayableAzero", [], __options);
	}

	/**
	 * topupInwInterestAccount
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"topupInwInterestAccount" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::topupInwInterestAccount", [amount], __options);
	}

	/**
	 * setInwContract
	 *
	 * @param { ArgumentTypes.AccountId } inwContract,
	*/
	"setInwContract" (
		inwContract: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setInwContract", [inwContract], __options);
	}

	/**
	 * setUnstakingFee
	 *
	 * @param { (string | number | BN) } unstakingFee,
	*/
	"setUnstakingFee" (
		unstakingFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setUnstakingFee", [unstakingFee], __options);
	}

	/**
	 * getMaxWaitingTime
	 *
	*/
	"getMaxWaitingTime" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getMaxWaitingTime", [], __options);
	}

	/**
	 * getInwMultiplier
	 *
	*/
	"getInwMultiplier" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getInwMultiplier", [], __options);
	}

	/**
	 * getInterestDistributionContract
	 *
	*/
	"getInterestDistributionContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getInterestDistributionContract", [], __options);
	}

	/**
	 * setTotalAzeroReservedForWithdrawals
	 *
	 * @param { (string | number | BN) } totalAzeroReservedForWithdrawals,
	*/
	"setTotalAzeroReservedForWithdrawals" (
		totalAzeroReservedForWithdrawals: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setTotalAzeroReservedForWithdrawals", [totalAzeroReservedForWithdrawals], __options);
	}

	/**
	 * getAzeroBalance
	 *
	*/
	"getAzeroBalance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getAzeroBalance", [], __options);
	}

	/**
	 * getTotalAzeroClaimed
	 *
	*/
	"getTotalAzeroClaimed" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalAzeroClaimed", [], __options);
	}

	/**
	 * setApy
	 *
	 * @param { (string | number | BN) } apy,
	*/
	"setApy" (
		apy: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setApy", [apy], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawAzeroFromStakeAccount", [receiver, amount], __options);
	}

	/**
	 * getTotalWithdrawalRequestCancelled
	 *
	 * @param { ArgumentTypes.AccountId } user,
	*/
	"getTotalWithdrawalRequestCancelled" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalWithdrawalRequestCancelled", [user], __options);
	}

	/**
	 * getWaitingWithdrawalList
	 *
	*/
	"getWaitingWithdrawalList" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWaitingWithdrawalList", [], __options);
	}

	/**
	 * getWithdrawalRequestListByUser
	 *
	 * @param { ArgumentTypes.AccountId } user,
	*/
	"getWithdrawalRequestListByUser" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawalRequestListByUser", [user], __options);
	}

	/**
	 * setIsLocked
	 *
	 * @param { boolean } isLocked,
	*/
	"setIsLocked" (
		isLocked: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setIsLocked", [isLocked], __options);
	}

	/**
	 * getWaitingWithdrawalCount
	 *
	*/
	"getWaitingWithdrawalCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWaitingWithdrawalCount", [], __options);
	}

	/**
	 * getAzeroInterestAccount
	 *
	*/
	"getAzeroInterestAccount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getAzeroInterestAccount", [], __options);
	}

	/**
	 * setIsSelectingRequestsToPay
	 *
	 * @param { boolean } isSelectingRequestsToPay,
	*/
	"setIsSelectingRequestsToPay" (
		isSelectingRequestsToPay: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setIsSelectingRequestsToPay", [isSelectingRequestsToPay], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawAzeroToStake", [expirationDuration, receiver, amount], __options);
	}

	/**
	 * getTotalAzeroReservedForWithdrawals
	 *
	*/
	"getTotalAzeroReservedForWithdrawals" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalAzeroReservedForWithdrawals", [], __options);
	}

	/**
	 * getWithdrawalRequestList
	 *
	*/
	"getWithdrawalRequestList" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawalRequestList", [], __options);
	}

	/**
	 * getIsLocked
	 *
	*/
	"getIsLocked" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getIsLocked", [], __options);
	}

	/**
	 * getMinStakingAmount
	 *
	*/
	"getMinStakingAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getMinStakingAmount", [], __options);
	}

	/**
	 * getStakeInfo
	 *
	 * @param { ArgumentTypes.AccountId } staker,
	*/
	"getStakeInfo" (
		staker: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getStakeInfo", [staker], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setWithdrawalRequestInfoStatus", [requestIndex, status], __options);
	}

	/**
	 * getWithdrawalRequestCount
	 *
	*/
	"getWithdrawalRequestCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawalRequestCount", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawalRequestIndexByUser", [user, index], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawAzeroFromInterestAccount", [receiver, amount], __options);
	}

	/**
	 * getStakerList
	 *
	*/
	"getStakerList" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getStakerList", [], __options);
	}

	/**
	 * setMaxWaitingTime
	 *
	 * @param { (number | string | BN) } maxWaitingTime,
	*/
	"setMaxWaitingTime" (
		maxWaitingTime: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setMaxWaitingTime", [maxWaitingTime], __options);
	}

	/**
	 * setMinStakingAmount
	 *
	 * @param { (string | number | BN) } minStakingAmount,
	*/
	"setMinStakingAmount" (
		minStakingAmount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setMinStakingAmount", [minStakingAmount], __options);
	}

	/**
	 * getWithdrawalRequestCountByUser
	 *
	 * @param { ArgumentTypes.AccountId } user,
	*/
	"getWithdrawalRequestCountByUser" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawalRequestCountByUser", [user], __options);
	}

	/**
	 * getTotalAzeroStaked
	 *
	*/
	"getTotalAzeroStaked" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalAzeroStaked", [], __options);
	}

	/**
	 * getTotalStakers
	 *
	*/
	"getTotalStakers" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalStakers", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::updateUnclaimedRewardsWhenLocked", [staker, currentTime], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawAzeroNotInAccounts", [receiver, amount], __options);
	}

	/**
	 * setInwMultiplier
	 *
	 * @param { (string | number | BN) } inwMultiplier,
	*/
	"setInwMultiplier" (
		inwMultiplier: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setInwMultiplier", [inwMultiplier], __options);
	}

	/**
	 * getAzeroStakeAccount
	 *
	*/
	"getAzeroStakeAccount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getAzeroStakeAccount", [], __options);
	}

	/**
	 * setMaxTotalStakingAmount
	 *
	 * @param { (string | number | BN) } maxTotalStakingAmount,
	*/
	"setMaxTotalStakingAmount" (
		maxTotalStakingAmount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::setMaxTotalStakingAmount", [maxTotalStakingAmount], __options);
	}

	/**
	 * getTotalAzeroWithdrawnToStake
	 *
	*/
	"getTotalAzeroWithdrawnToStake" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalAzeroWithdrawnToStake", [], __options);
	}

	/**
	 * getTotalInwClaimed
	 *
	*/
	"getTotalInwClaimed" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalInwClaimed", [], __options);
	}

	/**
	 * getWithdrawableAzeroToStakeToValidator
	 *
	 * @param { (number | string | BN) } expirationDuration,
	*/
	"getWithdrawableAzeroToStakeToValidator" (
		expirationDuration: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawableAzeroToStakeToValidator", [expirationDuration], __options);
	}

	/**
	 * getIsSelectingRequestsToPay
	 *
	*/
	"getIsSelectingRequestsToPay" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getIsSelectingRequestsToPay", [], __options);
	}

	/**
	 * removeRequestIndexInWithdrawalWaitingList
	 *
	 * @param { (string | number | BN) } requestIndex,
	*/
	"removeRequestIndexInWithdrawalWaitingList" (
		requestIndex: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::removeRequestIndexInWithdrawalWaitingList", [requestIndex], __options);
	}

	/**
	 * getBlockTimestamp
	 *
	*/
	"getBlockTimestamp" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getBlockTimestamp", [], __options);
	}

	/**
	 * claimRewards
	 *
	*/
	"claimRewards" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::claimRewards", [], __options);
	}

	/**
	 * getTotalWithdrawalRequestClaimed
	 *
	 * @param { ArgumentTypes.AccountId } claimer,
	*/
	"getTotalWithdrawalRequestClaimed" (
		claimer: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalWithdrawalRequestClaimed", [claimer], __options);
	}

	/**
	 * getInwInterestAccount
	 *
	*/
	"getInwInterestAccount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getInwInterestAccount", [], __options);
	}

	/**
	 * getInwContract
	 *
	*/
	"getInwContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getInwContract", [], __options);
	}

	/**
	 * getApy
	 *
	*/
	"getApy" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getApy", [], __options);
	}

	/**
	 * withdrawalRequest
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"withdrawalRequest" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawalRequest", [amount], __options);
	}

	/**
	 * getTotalAzeroForWaitingWithdrawals
	 *
	*/
	"getTotalAzeroForWaitingWithdrawals" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalAzeroForWaitingWithdrawals", [], __options);
	}

	/**
	 * stake
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"stake" (
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::stake", [amount], __options);
	}

	/**
	 * getWaitingWithdrawalIndex
	 *
	 * @param { (string | number | BN) } index,
	*/
	"getWaitingWithdrawalIndex" (
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWaitingWithdrawalIndex", [index], __options);
	}

	/**
	 * getUnclaimedRewardAtLastTopup
	 *
	*/
	"getUnclaimedRewardAtLastTopup" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getUnclaimedRewardAtLastTopup", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawAzeroEmergency", [receiver, amount], __options);
	}

	/**
	 * getLastAzeroInterestTopup
	 *
	*/
	"getLastAzeroInterestTopup" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getLastAzeroInterestTopup", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawInwNotInAccounts", [receiver, amount], __options);
	}

	/**
	 * cancel
	 *
	 * @param { (string | number | BN) } requestIndex,
	*/
	"cancel" (
		requestIndex: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::cancel", [requestIndex], __options);
	}

	/**
	 * topupAzeroInterestAccount
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"topupAzeroInterestAccount" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::topupAzeroInterestAccount", [amount], __options);
	}

	/**
	 * topupAzeroStakeAccount
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"topupAzeroStakeAccount" (
		amount: (string | number | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::topupAzeroStakeAccount", [amount], __options);
	}

	/**
	 * setCode
	 *
	 * @param { Array<(number | string | BN)> } codeHash,
	*/
	"setCode" (
		codeHash: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "upgradeableTrait::setCode", [codeHash], __options);
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
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
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

	/**
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::owner", [], __options);
	}

}