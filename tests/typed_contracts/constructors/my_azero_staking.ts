import {CodePromise} from "@polkadot/api-contract";
import type {KeyringPair} from "@polkadot/keyring/types";
import type {ApiPromise} from "@polkadot/api";
import {_genValidGasLimitAndValue, _signAndSend, SignAndSendSuccessResponse} from "@727-ventures/typechain-types";
import type {ConstructorOptions} from "@727-ventures/typechain-types";
import type {WeightV2} from "@polkadot/types/interfaces";
import type * as ArgumentTypes from '../types-arguments/my_azero_staking';
import { ContractFile } from '../contract-info/my_azero_staking';
import type BN from 'bn.js';

export default class Constructors {
	readonly nativeAPI: ApiPromise;
	readonly signer: KeyringPair;

	constructor(
		nativeAPI: ApiPromise,
		signer: KeyringPair,
	) {
		this.nativeAPI = nativeAPI;
		this.signer = signer;
	}

	/**
	* new
	*
	* @param { (string | number | BN) } minStakingAmount,
	* @param { (string | number | BN) } maxTotalStakingAmount,
	* @param { (string | number | BN) } apy,
	* @param { (number | string | BN) } maxWaitingTime,
	* @param { ArgumentTypes.AccountId } inwContract,
	* @param { (string | number | BN) } inwMultiplier,
	* @param { (string | number | BN) } unstakingFee,
	*/
   	async "new" (
		minStakingAmount: (string | number | BN),
		maxTotalStakingAmount: (string | number | BN),
		apy: (string | number | BN),
		maxWaitingTime: (number | string | BN),
		inwContract: ArgumentTypes.AccountId,
		inwMultiplier: (string | number | BN),
		unstakingFee: (string | number | BN),
		__options ? : ConstructorOptions,
   	) {
   		const __contract = JSON.parse(ContractFile);
		const code = new CodePromise(this.nativeAPI, __contract, __contract.source.wasm);
		const gasLimit = (await _genValidGasLimitAndValue(this.nativeAPI, __options)).gasLimit as WeightV2;

		const storageDepositLimit = __options?.storageDepositLimit;
			const tx = code.tx["new"]!({ gasLimit, storageDepositLimit, value: __options?.value }, minStakingAmount, maxTotalStakingAmount, apy, maxWaitingTime, inwContract, inwMultiplier, unstakingFee);
			let response;

			try {
				response = await _signAndSend(this.nativeAPI.registry, tx, this.signer, (event: any) => event);
			}
			catch (error) {
				console.log(error);
			}

		return {
			result: response as SignAndSendSuccessResponse,
			// @ts-ignore
			address: (response as SignAndSendSuccessResponse)!.result!.contract.address.toString(),
		};
	}
}