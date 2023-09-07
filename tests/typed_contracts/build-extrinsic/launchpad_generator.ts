/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/launchpad_generator';
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
	 * @param { ArgumentTypes.Hash } launchpadHash,
	 * @param { ArgumentTypes.AccountId } inwContract,
	 * @param { (string | number | BN) } creationFee,
	 * @param { (number | string | BN) } txRate,
	 * @param { ArgumentTypes.AccountId } adminAddress,
	*/
	"initialize" (
		launchpadHash: ArgumentTypes.Hash,
		inwContract: ArgumentTypes.AccountId,
		creationFee: (string | number | BN),
		txRate: (number | string | BN),
		adminAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "initialize", [launchpadHash, inwContract, creationFee, txRate, adminAddress], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "newLaunchpad", [projectInfoUri, tokenAddress, totalSupply, phaseName, phaseStartTime, phaseEndTime, phaseImmediateReleaseRate, phaseVestingDuration, phaseVestingUnit, phaseIsPublic, phasePublicAmount, phasePublicPrice], __options);
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
	 * setTxRate
	 *
	 * @param { (number | string | BN) } txRate,
	*/
	"setTxRate" (
		txRate: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::setTxRate", [txRate], __options);
	}

	/**
	 * getCreationFee
	 *
	*/
	"getCreationFee" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getCreationFee", [], __options);
	}

	/**
	 * getLaunchpadCount
	 *
	*/
	"getLaunchpadCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getLaunchpadCount", [], __options);
	}

	/**
	 * getLaunchpadById
	 *
	 * @param { (number | string | BN) } id,
	*/
	"getLaunchpadById" (
		id: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getLaunchpadById", [id], __options);
	}

	/**
	 * getActiveLaunchpadCount
	 *
	*/
	"getActiveLaunchpadCount" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getActiveLaunchpadCount", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::setInwContract", [inwContract], __options);
	}

	/**
	 * getLaunchpadHash
	 *
	*/
	"getLaunchpadHash" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getLaunchpadHash", [], __options);
	}

	/**
	 * setLaunchpadHash
	 *
	 * @param { ArgumentTypes.Hash } launchpadHash,
	*/
	"setLaunchpadHash" (
		launchpadHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::setLaunchpadHash", [launchpadHash], __options);
	}

	/**
	 * setCreationFee
	 *
	 * @param { (string | number | BN) } creationFee,
	*/
	"setCreationFee" (
		creationFee: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::setCreationFee", [creationFee], __options);
	}

	/**
	 * setIsActiveLaunchpad
	 *
	 * @param { ArgumentTypes.AccountId } address,
	 * @param { boolean } isActive,
	*/
	"setIsActiveLaunchpad" (
		address: ArgumentTypes.AccountId,
		isActive: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::setIsActiveLaunchpad", [address, isActive], __options);
	}

	/**
	 * getInwContract
	 *
	*/
	"getInwContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getInwContract", [], __options);
	}

	/**
	 * getTxRate
	 *
	*/
	"getTxRate" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getTxRate", [], __options);
	}

	/**
	 * getLaunchpadByOwner
	 *
	 * @param { ArgumentTypes.AccountId } ownerAddress,
	*/
	"getLaunchpadByOwner" (
		ownerAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getLaunchpadByOwner", [ownerAddress], __options);
	}

	/**
	 * getIsActiveLaunchpad
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"getIsActiveLaunchpad" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "launchpadGeneratorTrait::getIsActiveLaunchpad", [address], __options);
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
	 * getBalance
	 *
	*/
	"getBalance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminTrait::getBalance", [], __options);
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
	 * hasRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::hasRole", [role, address], __options);
	}

	/**
	 * grantRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::grantRole", [role, account], __options);
	}

	/**
	 * revokeRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::revokeRole", [role, account], __options);
	}

	/**
	 * renounceRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
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

}