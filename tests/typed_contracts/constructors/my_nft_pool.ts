import {CodePromise} from "@polkadot/api-contract";
import type {KeyringPair} from "@polkadot/keyring/types";
import Files from "fs";
import type {ApiPromise} from "@polkadot/api";
import {_genValidGasLimitAndValue, _signAndSend, SignAndSendSuccessResponse} from "@727-ventures/typechain-types";
import type {ConstructorOptions} from "@727-ventures/typechain-types";
import type {WeightV2} from "@polkadot/types/interfaces";
import type * as ArgumentTypes from '../types-arguments/my_nft_pool';
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
	* @param { ArgumentTypes.AccountId } contractOwner,
	* @param { ArgumentTypes.AccountId } inwContract,
	* @param { ArgumentTypes.AccountId } psp34ContractAddress,
	* @param { ArgumentTypes.AccountId } psp22ContractAddress,
	* @param { (string | number | BN) } maxStakingAmount,
	* @param { (string | number | BN) } multiplier,
	* @param { (number | string | BN) } duration,
	* @param { (number | string | BN) } startTime,
	* @param { (string | number | BN) } unstakeFee,
	*/
   	async "new" (
		contractOwner: ArgumentTypes.AccountId,
		inwContract: ArgumentTypes.AccountId,
		psp34ContractAddress: ArgumentTypes.AccountId,
		psp22ContractAddress: ArgumentTypes.AccountId,
		maxStakingAmount: (string | number | BN),
		multiplier: (string | number | BN),
		duration: (number | string | BN),
		startTime: (number | string | BN),
		unstakeFee: (string | number | BN),
		__options ? : ConstructorOptions,
   	) {
   		const __contract = JSON.parse(Files.readFileSync("./artifacts/my_nft_pool.contract").toString());
		const code = new CodePromise(this.nativeAPI, __contract, __contract.source.wasm);
		const gasLimit = (await _genValidGasLimitAndValue(this.nativeAPI, __options)).gasLimit as WeightV2;

		const storageDepositLimit = __options?.storageDepositLimit;
			const tx = code.tx["new"]!({ gasLimit, storageDepositLimit, value: __options?.value }, contractOwner, inwContract, psp34ContractAddress, psp22ContractAddress, maxStakingAmount, multiplier, duration, startTime, unstakeFee);
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