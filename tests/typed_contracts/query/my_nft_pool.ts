/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_nft_pool';
import type * as ReturnTypes from '../types-returns/my_nft_pool';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;
	private __callerAddress : string;

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
	* initialize
	*
	* @param { ArgumentTypes.AccountId } inwContract,
	* @param { ArgumentTypes.AccountId } psp34ContractAddress,
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (string | number | BN) } maxStakingAmount,
	* @param { (string | number | BN) } multiplier,
	* @param { (number | string | BN) } duration,
	* @param { (number | string | BN) } startTime,
	* @param { (string | number | BN) } unstakeFee,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"initialize" (
		inwContract: ArgumentTypes.AccountId,
		psp34ContractAddress: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		maxStakingAmount: (string | number | BN),
		multiplier: (string | number | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		unstakeFee: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "initialize", [inwContract, psp34ContractAddress, psp22ContractAddress, maxStakingAmount, multiplier, duration, startTime, unstakeFee], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_nft_pool')); });
	}

	/**
	* stake
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"stake" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "stake", [tokenId], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_nft_pool')); });
	}

	/**
	* unstake
	*
	* @param { ArgumentTypes.Id } tokenId,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"unstake" (
		tokenId: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "unstake", [tokenId], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_nft_pool')); });
	}

	/**
	* claimReward
	*
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"claimReward" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "claimReward", [], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_nft_pool')); });
	}

	/**
	* psp34ContractAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"psp34ContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34ContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'my_nft_pool')); });
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'my_nft_pool')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(19, 'my_nft_pool')); });
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(19, 'my_nft_pool')); });
	}

	/**
	* rewardPool
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"rewardPool" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::rewardPool", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
	}

	/**
	* inwContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"inwContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::inwContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'my_nft_pool')); });
	}

	/**
	* startTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"startTime" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::startTime", [], __options , (result) => { return handleReturnType(result, getTypeDescription(22, 'my_nft_pool')); });
	}

	/**
	* psp22ContractAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"psp22ContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::psp22ContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'my_nft_pool')); });
	}

	/**
	* maxStakingAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"maxStakingAmount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::maxStakingAmount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
	}

	/**
	* totalStaked
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalStaked" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::totalStaked", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
	}

	/**
	* unstakeFee
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"unstakeFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::unstakeFee", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::setInwContract", [inwContract], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_nft_pool')); });
	}

	/**
	* totalUnclaimedReward
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalUnclaimedReward" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::totalUnclaimedReward", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
	}

	/**
	* getStakeInfo
	*
	* @param { ArgumentTypes.AccountId } staker,
	* @returns { Result<ReturnTypes.StakeInformation | null, ReturnTypes.LangError> }
	*/
	"getStakeInfo" (
		staker: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.StakeInformation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::getStakeInfo", [staker], __options , (result) => { return handleReturnType(result, getTypeDescription(23, 'my_nft_pool')); });
	}

	/**
	* multiplier
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"multiplier" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::multiplier", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
	}

	/**
	* minRewardAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"minRewardAmount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::minRewardAmount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'my_nft_pool')); });
	}

	/**
	* stakingContractAddress
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"stakingContractAddress" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::stakingContractAddress", [], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'my_nft_pool')); });
	}

	/**
	* isTopupEnoughReward
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isTopupEnoughReward" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::isTopupEnoughReward", [], __options , (result) => { return handleReturnType(result, getTypeDescription(26, 'my_nft_pool')); });
	}

	/**
	* duration
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"duration" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::duration", [], __options , (result) => { return handleReturnType(result, getTypeDescription(22, 'my_nft_pool')); });
	}

	/**
	* topupRewardPool
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"topupRewardPool" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::topupRewardPool", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_nft_pool')); });
	}

	/**
	* withdrawRewardPool
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawRewardPool" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericPoolContractTrait::withdrawRewardPool", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_nft_pool')); });
	}

	/**
	* getTotalStakedByAccount
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTotalStakedByAccount" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "nftStakingListTrait::getTotalStakedByAccount", [account], __options , (result) => { return handleReturnType(result, getTypeDescription(22, 'my_nft_pool')); });
	}

	/**
	* getStakedId
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { (number | string | BN) } index,
	* @returns { Result<ReturnTypes.Id | null, ReturnTypes.LangError> }
	*/
	"getStakedId" (
		account: ArgumentTypes.AccountId,
		index: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Id | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "nftStakingListTrait::getStakedId", [account, index], __options , (result) => { return handleReturnType(result, getTypeDescription(27, 'my_nft_pool')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "upgradeableTrait::setCode", [codeHash], __options , (result) => { return handleReturnType(result, getTypeDescription(10, 'my_nft_pool')); });
	}

}