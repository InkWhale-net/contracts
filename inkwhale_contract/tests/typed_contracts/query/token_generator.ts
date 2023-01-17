/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/token_generator';
import type * as ReturnTypes from '../types-returns/token_generator';
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
	* newToken
	*
	* @param { ArgumentTypes.AccountId } mintTo,
	* @param { (string | number | BN) } totalSupply,
	* @param { Array<(number | string | BN)> } name,
	* @param { Array<(number | string | BN)> } symbol,
	* @param { (number | string | BN) } decimal,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"newToken" (
		mintTo: ArgumentTypes.AccountId,
		totalSupply: (string | number | BN),
		name: Array<(number | string | BN)>,
		symbol: Array<(number | string | BN)>,
		decimal: (number | string | BN),
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "newToken", [mintTo, totalSupply, name, symbol, decimal], __options , (result) => { return handleReturnType(result, getTypeDescription(12, 'token_generator')); });
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	* @returns { Result<null, ReturnTypes.OwnableError> }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.OwnableError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(16, 'token_generator')); });
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'token_generator')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<null, ReturnTypes.OwnableError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.OwnableError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(16, 'token_generator')); });
	}

	/**
	* getContractHash
	*
	* @returns { ReturnTypes.Hash }
	*/
	"getContractHash" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.Hash > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getContractHash", [], __options , (result) => { return handleReturnType(result, getTypeDescription(4, 'token_generator')); });
	}

	/**
	* setWalContract
	*
	* @param { ArgumentTypes.AccountId } walContract,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"setWalContract" (
		walContract: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::setWalContract", [walContract], __options , (result) => { return handleReturnType(result, getTypeDescription(12, 'token_generator')); });
	}

	/**
	* getTokenInfo
	*
	* @param { (number | string | BN) } index,
	* @returns { ReturnTypes.Token | null }
	*/
	"getTokenInfo" (
		index: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.Token | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getTokenInfo", [index], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'token_generator')); });
	}

	/**
	* getWalContract
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"getWalContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getWalContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'token_generator')); });
	}

	/**
	* setContractHash
	*
	* @param { ArgumentTypes.Hash } psp22Hash,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"setContractHash" (
		psp22Hash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::setContractHash", [psp22Hash], __options , (result) => { return handleReturnType(result, getTypeDescription(12, 'token_generator')); });
	}

	/**
	* getCreationFee
	*
	* @returns { ReturnNumber }
	*/
	"getCreationFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getCreationFee", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* withdrawFee
	*
	* @param { (string | number | BN) } value,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"withdrawFee" (
		value: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::withdrawFee", [value], __options , (result) => { return handleReturnType(result, getTypeDescription(12, 'token_generator')); });
	}

	/**
	* getTokenCount
	*
	* @returns { number }
	*/
	"getTokenCount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::getTokenCount", [], __options );
	}

	/**
	* withdrawWal
	*
	* @param { (string | number | BN) } value,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"withdrawWal" (
		value: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenManagerTrait::withdrawWal", [value], __options , (result) => { return handleReturnType(result, getTypeDescription(12, 'token_generator')); });
	}

}