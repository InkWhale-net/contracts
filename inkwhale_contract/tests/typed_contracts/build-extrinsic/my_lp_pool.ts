/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_lp_pool';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;


	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * stake
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"stake" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "stake", [amount], __options);
	}

	/**
	 * unstake
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"unstake" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "unstake", [amount], __options);
	}

	/**
	 * claimReward
	 *
	*/
	"claimReward" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "claimReward", [], __options);
	}

	/**
	 * lpContractAddress
	 *
	*/
	"lpContractAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "lpContractAddress", [], __options);
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
	 * @param { ArgumentTypes.AccountId } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::transferOwnership", [newOwner], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::getStakeInfo", [staker], __options);
	}

	/**
	 * psp22ContractAddress
	 *
	*/
	"psp22ContractAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::psp22ContractAddress", [], __options);
	}

	/**
	 * unstakeFee
	 *
	*/
	"unstakeFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::unstakeFee", [], __options);
	}

	/**
	 * withdrawRewardPool
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"withdrawRewardPool" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::withdrawRewardPool", [amount], __options);
	}

	/**
	 * topupRewardPool
	 *
	 * @param { (string | number | BN) } amount,
	*/
	"topupRewardPool" (
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::topupRewardPool", [amount], __options);
	}

	/**
	 * duration
	 *
	*/
	"duration" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::duration", [], __options);
	}

	/**
	 * startTime
	 *
	*/
	"startTime" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::startTime", [], __options);
	}

	/**
	 * totalStaked
	 *
	*/
	"totalStaked" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::totalStaked", [], __options);
	}

	/**
	 * multiplier
	 *
	*/
	"multiplier" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::multiplier", [], __options);
	}

	/**
	 * rewardPool
	 *
	*/
	"rewardPool" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::rewardPool", [], __options);
	}

	/**
	 * walContract
	 *
	*/
	"walContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::walContract", [], __options);
	}

	/**
	 * stakingContractAddress
	 *
	*/
	"stakingContractAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::stakingContractAddress", [], __options);
	}

}