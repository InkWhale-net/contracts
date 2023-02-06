/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_pool';
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
	 * initialize
	 *
	 * @param { ArgumentTypes.AccountId } walContract,
	 * @param { ArgumentTypes.AccountId } psp22ContractAddress,
	 * @param { (number | string | BN) } apy,
	 * @param { (number | string | BN) } duration,
	 * @param { (number | string | BN) } startTime,
	 * @param { (string | number | BN) } unstakeFee,
	*/
	"initialize" (
		walContract: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		apy: (number | string | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		unstakeFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [walContract, psp22ContractAddress, apy, duration, startTime, unstakeFee], __options);
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
	 * apy
	 *
	*/
	"apy" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "apy", [], __options);
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
	 * multiplier
	 *
	*/
	"multiplier" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::multiplier", [], __options);
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
	 * totalStaked
	 *
	*/
	"totalStaked" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::totalStaked", [], __options);
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
	 * rewardPool
	 *
	*/
	"rewardPool" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "genericPoolContractTrait::rewardPool", [], __options);
	}

	/**
	 * tranferPsp22
	 *
	 * @param { ArgumentTypes.AccountId } psp22ContractAddress,
	 * @param { (string | number | BN) } amount,
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"tranferPsp22" (
		psp22ContractAddress: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::tranferPsp22", [psp22ContractAddress, amount, receiver], __options);
	}

	/**
	 * tranferNft
	 *
	 * @param { ArgumentTypes.AccountId } nftContractAddress,
	 * @param { ArgumentTypes.Id } tokenId,
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"tranferNft" (
		nftContractAddress: ArgumentTypes.AccountId,
		tokenId: ArgumentTypes.Id,
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::tranferNft", [nftContractAddress, tokenId, receiver], __options);
	}

	/**
	 * withdrawFee
	 *
	 * @param { (string | number | BN) } value,
	 * @param { ArgumentTypes.AccountId } receiver,
	*/
	"withdrawFee" (
		value: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::withdrawFee", [value, receiver], __options);
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

}