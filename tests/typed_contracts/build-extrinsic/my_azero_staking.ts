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
	 * initialize
	 *
	 * @param { (string | number | BN) } minStakingAmount,
	 * @param { (string | number | BN) } maxTotalStakingAmount,
	 * @param { (string | number | BN) } apy,
	 * @param { (number | string | BN) } maxWaitingTime,
	 * @param { ArgumentTypes.AccountId } inwContract,
	 * @param { (string | number | BN) } inwMultiplier,
	 * @param { (string | number | BN) } unstakingFee,
	*/
	"initialize" (
		minStakingAmount: (string | number | BN),
		maxTotalStakingAmount: (string | number | BN),
		apy: (string | number | BN),
		maxWaitingTime: (number | string | BN),
		inwContract: ArgumentTypes.AccountId,
		inwMultiplier: (string | number | BN),
		unstakingFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [minStakingAmount, maxTotalStakingAmount, apy, maxWaitingTime, inwContract, inwMultiplier, unstakingFee], __options);
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
	 * selectRequestsToPay
	 *
	 * @param { (number | string | BN) } expirationDuration,
	*/
	"selectRequestsToPay" (
		expirationDuration: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::selectRequestsToPay", [expirationDuration], __options);
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
	 * getTotalInwReservedForWithdrawals
	 *
	*/
	"getTotalInwReservedForWithdrawals" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalInwReservedForWithdrawals", [], __options);
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
	 * getTotalInwClaimed
	 *
	*/
	"getTotalInwClaimed" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalInwClaimed", [], __options);
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
	 * withdrawAzeroToStake
	 *
	 * @param { (number | string | BN) } expirationDuration,
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"withdrawAzeroToStake" (
		expirationDuration: (number | string | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawAzeroToStake", [expirationDuration, receiver], __options);
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
	 * getTotalAzeroForWaitingWithdrawals
	 *
	*/
	"getTotalAzeroForWaitingWithdrawals" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalAzeroForWaitingWithdrawals", [], __options);
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
	 * getMaxWaitingTime
	 *
	*/
	"getMaxWaitingTime" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getMaxWaitingTime", [], __options);
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
	 * getWithdrawableInw
	 *
	*/
	"getWithdrawableInw" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWithdrawableInw", [], __options);
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
	 * getPayableAzero
	 *
	*/
	"getPayableAzero" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getPayableAzero", [], __options);
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
	 * withdrawAzero
	 *
	 * @param { ArgumentTypes.AccountId } receiver,
	 * @param { (string | number | BN) } amount,
	*/
	"withdrawAzero" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawAzero", [receiver, amount], __options);
	}

	/**
	 * claim
	 *
	 * @param { (number | string | BN) } requestIndex,
	*/
	"claim" (
		requestIndex: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::claim", [requestIndex], __options);
	}

	/**
	 * getWaitingListWithinExpirationDuration
	 *
	 * @param { (number | string | BN) } expirationDuration,
	*/
	"getWaitingListWithinExpirationDuration" (
		expirationDuration: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getWaitingListWithinExpirationDuration", [expirationDuration], __options);
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
	 * withdrawInw
	 *
	 * @param { ArgumentTypes.AccountId } receiver,
	 * @param { (string | number | BN) } amount,
	*/
	"withdrawInw" (
		receiver: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawInw", [receiver, amount], __options);
	}

	/**
	 * getRoleWithdrawalManager
	 *
	*/
	"getRoleWithdrawalManager" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getRoleWithdrawalManager", [], __options);
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
	 * getTotalInwForWaitingWithdrawals
	 *
	*/
	"getTotalInwForWaitingWithdrawals" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getTotalInwForWaitingWithdrawals", [], __options);
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
	 * withdrawRequest
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"withdrawRequest" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::withdrawRequest", [amount], __options);
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
	 * getMaxTotalStakingAmount
	 *
	*/
	"getMaxTotalStakingAmount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "azeroStakingTrait::getMaxTotalStakingAmount", [], __options);
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
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::owner", [], __options);
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

}