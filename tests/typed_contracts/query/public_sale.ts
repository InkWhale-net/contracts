/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/public_sale';
import type * as ReturnTypes from '../types-returns/public_sale';
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
	* @param { (number | string | BN) } startTime,
	* @param { (number | string | BN) } endTime,
	* @param { (string | number | BN) } totalAmount,
	* @param { ArgumentTypes.AccountId } inwContract,
	* @param { (string | number | BN) } inwPrice,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"initialize" (
		startTime: (number | string | BN),
		endTime: (number | string | BN),
		totalAmount: (string | number | BN),
		inwContract: ArgumentTypes.AccountId,
		inwPrice: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "initialize", [startTime, endTime, totalAmount, inwContract, inwPrice], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(16, 'public_sale')); });
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'public_sale')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(16, 'public_sale')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::setInwContract", [inwContract], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* purchase
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"purchase" (
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::purchase", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* setVestingDuration
	*
	* @param { (number | string | BN) } vestingDuration,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setVestingDuration" (
		vestingDuration: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::setVestingDuration", [vestingDuration], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* totalAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalAmount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::totalAmount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(19, 'public_sale')); });
	}

	/**
	* setImmediateBuyingRate
	*
	* @param { (number | string | BN) } immediateBuyingRate,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setImmediateBuyingRate" (
		immediateBuyingRate: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::setImmediateBuyingRate", [immediateBuyingRate], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* claim
	*
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"claim" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::claim", [], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* isBurned
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isBurned" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::isBurned", [], __options , (result) => { return handleReturnType(result, getTypeDescription(20, 'public_sale')); });
	}

	/**
	* setInwPrice
	*
	* @param { (string | number | BN) } inwPrice,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setInwPrice" (
		inwPrice: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::setInwPrice", [inwPrice], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* totalPurchasedAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalPurchasedAmount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::totalPurchasedAmount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(19, 'public_sale')); });
	}

	/**
	* setEndTime
	*
	* @param { (number | string | BN) } endTime,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setEndTime" (
		endTime: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::setEndTime", [endTime], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* startTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"startTime" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::startTime", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'public_sale')); });
	}

	/**
	* getBuyerInfo
	*
	* @param { ArgumentTypes.AccountId } buyer,
	* @returns { Result<ReturnTypes.BuyerInformation | null, ReturnTypes.LangError> }
	*/
	"getBuyerInfo" (
		buyer: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.BuyerInformation | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::getBuyerInfo", [buyer], __options , (result) => { return handleReturnType(result, getTypeDescription(22, 'public_sale')); });
	}

	/**
	* inwPrice
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"inwPrice" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::inwPrice", [], __options , (result) => { return handleReturnType(result, getTypeDescription(19, 'public_sale')); });
	}

	/**
	* inwContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"inwContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::inwContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'public_sale')); });
	}

	/**
	* endTime
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"endTime" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::endTime", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'public_sale')); });
	}

	/**
	* setStartTime
	*
	* @param { (number | string | BN) } startTime,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setStartTime" (
		startTime: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::setStartTime", [startTime], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* setTotalAmount
	*
	* @param { (string | number | BN) } totalAmount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setTotalAmount" (
		totalAmount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::setTotalAmount", [totalAmount], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* burn
	*
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"burn" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::burn", [], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* immediateBuyingRate
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"immediateBuyingRate" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::immediateBuyingRate", [], __options , (result) => { return handleReturnType(result, getTypeDescription(25, 'public_sale')); });
	}

	/**
	* genericTokenSaleTrait::getBalance
	*
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"genericTokenSaleTrait::getBalance" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::getBalance", [], __options , (result) => { return handleReturnType(result, getTypeDescription(26, 'public_sale')); });
	}

	/**
	* totalClaimedAmount
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalClaimedAmount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::totalClaimedAmount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(19, 'public_sale')); });
	}

	/**
	* getUnclaimedAmount
	*
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getUnclaimedAmount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::getUnclaimedAmount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(26, 'public_sale')); });
	}

	/**
	* topup
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"topup" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::topup", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* vestingDuration
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"vestingDuration" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "genericTokenSaleTrait::vestingDuration", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, 'public_sale')); });
	}

	/**
	* withdrawFee
	*
	* @param { (string | number | BN) } value,
	* @param { ArgumentTypes.AccountId } receiver,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"withdrawFee" (
		value: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminTrait::withdrawFee", [value, receiver], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

	/**
	* adminTrait::getBalance
	*
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"adminTrait::getBalance" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminTrait::getBalance", [], __options , (result) => { return handleReturnType(result, getTypeDescription(26, 'public_sale')); });
	}

	/**
	* tranferPsp22
	*
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (string | number | BN) } amount,
	* @param { ArgumentTypes.AccountId } receiver,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"tranferPsp22" (
		psp22ContractAddress: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		receiver: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminTrait::tranferPsp22", [psp22ContractAddress, amount, receiver], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "upgradeableTrait::setCode", [codeHash], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'public_sale')); });
	}

}