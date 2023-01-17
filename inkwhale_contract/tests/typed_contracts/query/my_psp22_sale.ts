/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_psp22_sale';
import type * as ReturnTypes from '../types-returns/my_psp22_sale';
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
	* increaseAllowance
	*
	* @param { ArgumentTypes.AccountId } spender,
	* @param { (string | number | BN) } deltaValue,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"increaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::increaseAllowance", [spender, deltaValue], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @returns { ReturnNumber }
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::balanceOf", [owner], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* decreaseAllowance
	*
	* @param { ArgumentTypes.AccountId } spender,
	* @param { (string | number | BN) } deltaValue,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"decreaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::decreaseAllowance", [spender, deltaValue], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* transferFrom
	*
	* @param { ArgumentTypes.AccountId } from,
	* @param { ArgumentTypes.AccountId } to,
	* @param { (string | number | BN) } value,
	* @param { Array<(number | string | BN)> } data,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"transferFrom" (
		from: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::transferFrom", [from, to, value, data], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } spender,
	* @param { (string | number | BN) } value,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"approve" (
		spender: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::approve", [spender, value], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* totalSupply
	*
	* @returns { ReturnNumber }
	*/
	"totalSupply" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::totalSupply", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* allowance
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { ArgumentTypes.AccountId } spender,
	* @returns { ReturnNumber }
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		spender: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::allowance", [owner, spender], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { (string | number | BN) } value,
	* @param { Array<(number | string | BN)> } data,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::transfer", [to, value, data], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<null, ReturnTypes.OwnableError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.OwnableError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'my_psp22_sale')); });
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(2, 'my_psp22_sale')); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'my_psp22_sale')); });
	}

	/**
	* tokenDecimals
	*
	* @returns { number }
	*/
	"tokenDecimals" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenDecimals", [], __options );
	}

	/**
	* tokenName
	*
	* @returns { Array<number> | null }
	*/
	"tokenName" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Array<number> | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenName", [], __options , (result) => { return handleReturnType(result, getTypeDescription(17, 'my_psp22_sale')); });
	}

	/**
	* tokenSymbol
	*
	* @returns { Array<number> | null }
	*/
	"tokenSymbol" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Array<number> | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenSymbol", [], __options , (result) => { return handleReturnType(result, getTypeDescription(17, 'my_psp22_sale')); });
	}

	/**
	* burn
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { (string | number | BN) } amount,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"burn" (
		account: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22Burnable::burn", [account, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* cap
	*
	* @returns { ReturnNumber }
	*/
	"cap" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::cap", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* publicMint
	*
	* @param { (string | number | BN) } amount,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"publicMint" (
		amount: (string | number | BN),
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::publicMint", [amount], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* totalMinted
	*
	* @returns { ReturnNumber }
	*/
	"totalMinted" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::totalMinted", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* setMintingFee
	*
	* @param { (string | number | BN) } mintingFee,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"setMintingFee" (
		mintingFee: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::setMintingFee", [mintingFee], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* ownerMint
	*
	* @param { ArgumentTypes.AccountId } mintTo,
	* @param { (string | number | BN) } amount,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"ownerMint" (
		mintTo: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::ownerMint", [mintTo, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

	/**
	* mintingFee
	*
	* @returns { ReturnNumber }
	*/
	"mintingFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::mintingFee", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::withdrawFee", [value], __options , (result) => { return handleReturnType(result, getTypeDescription(18, 'my_psp22_sale')); });
	}

	/**
	* mintingCap
	*
	* @returns { ReturnNumber }
	*/
	"mintingCap" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::mintingCap", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* setCap
	*
	* @param { (string | number | BN) } cap,
	* @returns { Result<null, ReturnTypes.PSP22Error> }
	*/
	"setCap" (
		cap: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.PSP22Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "tokenMintCapTrait::setCap", [cap], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'my_psp22_sale')); });
	}

}