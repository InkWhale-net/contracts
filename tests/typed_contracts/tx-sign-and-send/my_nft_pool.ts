/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_nft_pool';
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
	* @param { ArgumentTypes.AccountId } walContract,
	* @param { ArgumentTypes.AccountId } psp34ContractAddress,
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (string | number | BN) } multiplier,
	* @param { (number | string | BN) } duration,
	* @param { (number | string | BN) } startTime,
	* @param { (string | number | BN) } unstakeFee,
	*/
	"initialize" (
		walContract: ArgumentTypes.AccountId,
		psp34ContractAddress: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		multiplier: (string | number | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		unstakeFee: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initialize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [walContract, psp34ContractAddress, psp22ContractAddress, multiplier, duration, startTime, unstakeFee], __options);
	}

	/**
	* stake
	*
	* @param { ArgumentTypes.Id } tokenId,
	*/
	"stake" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "stake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [tokenId], __options);
	}

	/**
	* unstake
	*
	* @param { ArgumentTypes.Id } tokenId,
	*/
	"unstake" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "unstake", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [tokenId], __options);
	}

	/**
	* claimReward
	*
	*/
	"claimReward" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "claimReward", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* psp34ContractAddress
	*
	*/
	"psp34ContractAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34ContractAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
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
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
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
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
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
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* multiplier
	*
	*/
	"multiplier" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::multiplier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* topupRewardPool
	*
	* @param { (string | number | BN) } amount,
	*/
	"topupRewardPool" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::topupRewardPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [amount], __options);
	}

	/**
	* unstakeFee
	*
	*/
	"unstakeFee" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::unstakeFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* startTime
	*
	*/
	"startTime" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::startTime", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* stakingContractAddress
	*
	*/
	"stakingContractAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::stakingContractAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* walContract
	*
	*/
	"walContract" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::walContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::getStakeInfo", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [staker], __options);
	}

	/**
	* withdrawRewardPool
	*
	* @param { (string | number | BN) } amount,
	*/
	"withdrawRewardPool" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::withdrawRewardPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [amount], __options);
	}

	/**
	* psp22ContractAddress
	*
	*/
	"psp22ContractAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::psp22ContractAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* rewardPool
	*
	*/
	"rewardPool" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::rewardPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* duration
	*
	*/
	"duration" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::duration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* totalStaked
	*
	*/
	"totalStaked" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "genericPoolContractTrait::totalStaked", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [], __options);
	}

	/**
	* getTotalStakedByAccount
	*
	* @param { ArgumentTypes.AccountId } account,
	*/
	"getTotalStakedByAccount" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "nftStakingListTrait::getTotalStakedByAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [account], __options);
	}

	/**
	* getStakedId
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { (number | string | BN) } index,
	*/
	"getStakedId" (
		account: ArgumentTypes.AccountId,
		index: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "nftStakingListTrait::getStakedId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [account, index], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::tranferPsp22", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [psp22ContractAddress, amount, receiver], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::tranferNft", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [nftContractAddress, tokenId, receiver], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminTrait::withdrawFee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [value, receiver], __options);
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
			return decodeEvents(events, this.__nativeContract, "my_nft_pool");
		}, [codeHash], __options);
	}

}