/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/launchpad_generator_op4';
import type * as ReturnTypes from '../types-returns/launchpad_generator_op4';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/launchpad_generator_op4.json';


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
	* initialize
	*
	* @param { ArgumentTypes.Hash } launchpadHash,
	* @param { ArgumentTypes.AccountId } inwContract,
	* @param { (string | number | BN) } creationFee,
	* @param { (number | string | BN) } txRate,
	* @param { ArgumentTypes.AccountId } adminAddress,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"initialize" (
		launchpadHash: ArgumentTypes.Hash,
		inwContract: ArgumentTypes.AccountId,
		creationFee: (string | number | BN),
		txRate: (number | string | BN),
		adminAddress: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "initialize", [launchpadHash, inwContract, creationFee, txRate, adminAddress], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* newLaunchpad
	*
	* @param { string } projectInfoUri,
	* @param { ArgumentTypes.AccountId } tokenAddress,
	* @param { (string | number | BN) } totalSupply,
	* @param { Array<string> } phaseName,
	* @param { Array<(number | string | BN)> } phaseStartTime,
	* @param { Array<(number | string | BN)> } phaseEndTime,
	* @param { Array<(number | string | BN)> } phaseImmediateReleaseRate,
	* @param { Array<(number | string | BN)> } phaseVestingDuration,
	* @param { Array<(number | string | BN)> } phaseVestingUnit,
	* @param { Array<boolean> } phaseIsPublic,
	* @param { Array<(string | number | BN)> } phasePublicAmount,
	* @param { Array<(string | number | BN)> } phasePublicPrice,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"newLaunchpad" (
		projectInfoUri: string,
		tokenAddress: ArgumentTypes.AccountId,
		totalSupply: (string | number | BN),
		phaseName: Array<string>,
		phaseStartTime: Array<(number | string | BN)>,
		phaseEndTime: Array<(number | string | BN)>,
		phaseImmediateReleaseRate: Array<(number | string | BN)>,
		phaseVestingDuration: Array<(number | string | BN)>,
		phaseVestingUnit: Array<(number | string | BN)>,
		phaseIsPublic: Array<boolean>,
		phasePublicAmount: Array<(string | number | BN)>,
		phasePublicPrice: Array<(string | number | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "newLaunchpad", [projectInfoUri, tokenAddress, totalSupply, phaseName, phaseStartTime, phaseEndTime, phaseImmediateReleaseRate, phaseVestingDuration, phaseVestingUnit, phaseIsPublic, phasePublicAmount, phasePublicPrice], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setCreationFee
	*
	* @param { (string | number | BN) } creationFee,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setCreationFee" (
		creationFee: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::setCreationFee", [creationFee], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getIsActiveLaunchpad
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { Result<boolean | null, ReturnTypes.LangError> }
	*/
	"getIsActiveLaunchpad" (
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getIsActiveLaunchpad", [address], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setTxRate
	*
	* @param { (number | string | BN) } txRate,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setTxRate" (
		txRate: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::setTxRate", [txRate], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLaunchpadHash
	*
	* @returns { Result<ReturnTypes.Hash, ReturnTypes.LangError> }
	*/
	"getLaunchpadHash" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Hash, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getLaunchpadHash", [], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getTxRate
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getTxRate" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getTxRate", [], __options , (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::setInwContract", [inwContract], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getInwContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getInwContract" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getInwContract", [], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLaunchpadCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getLaunchpadCount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getLaunchpadCount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setLaunchpadHash
	*
	* @param { ArgumentTypes.Hash } launchpadHash,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setLaunchpadHash" (
		launchpadHash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::setLaunchpadHash", [launchpadHash], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setIsActiveLaunchpad
	*
	* @param { ArgumentTypes.AccountId } address,
	* @param { boolean } isActive,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setIsActiveLaunchpad" (
		address: ArgumentTypes.AccountId,
		isActive: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::setIsActiveLaunchpad", [address, isActive], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLaunchpadById
	*
	* @param { (number | string | BN) } id,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"getLaunchpadById" (
		id: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getLaunchpadById", [id], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getActiveLaunchpadCount
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getActiveLaunchpadCount" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getActiveLaunchpadCount", [], __options , (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getCreationFee
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getCreationFee" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getCreationFee", [], __options , (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLaunchpadByOwner
	*
	* @param { ArgumentTypes.AccountId } ownerAddress,
	* @returns { Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> }
	*/
	"getLaunchpadByOwner" (
		ownerAddress: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "launchpadGeneratorTrait::getLaunchpadByOwner", [ownerAddress], __options , (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getBalance
	*
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getBalance" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminTrait::getBalance", [], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminTrait::withdrawFee", [value, receiver], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminTrait::tranferPsp22", [psp22ContractAddress, amount, receiver], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "upgradeableTrait::setCode", [codeHash], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options , (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options , (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::grantRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(37, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::revokeRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(37, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::renounceRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(37, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMember", [role, index], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControlEnumerable::getRoleMemberCount", [role], __options , (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

}