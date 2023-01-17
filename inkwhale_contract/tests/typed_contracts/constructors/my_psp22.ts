import {CodePromise} from "@polkadot/api-contract";
import type {KeyringPair} from "@polkadot/keyring/types";
import Files from "fs";
import type {ApiPromise} from "@polkadot/api";
import {_genValidGasLimitAndValue, _signAndSend, SignAndSendSuccessResponse} from "@727-ventures/typechain-types";
import type {ConstructorOptions} from "@727-ventures/typechain-types";
import type {WeightV2} from "@polkadot/types/interfaces";
import type * as ArgumentTypes from '../types-arguments/my_psp22';
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
	* @param { ArgumentTypes.AccountId } mintTo,
	* @param { (string | number | BN) } totalSupply,
	* @param { Array<(number | string | BN)> } name,
	* @param { Array<(number | string | BN)> } symbol,
	* @param { (number | string | BN) } decimal,
	*/
   	async "new" (
   		mintTo: ArgumentTypes.AccountId,
   		totalSupply: (string | number | BN),
   		name: Array<(number | string | BN)>,
   		symbol: Array<(number | string | BN)>,
   		decimal: (number | string | BN),
   		__options ? : ConstructorOptions,
   	) {
   		const __contract = JSON.parse(Files.readFileSync("./artifacts/my_psp22.contract").toString());
		//console.log(__contract);
		const code = new CodePromise(this.nativeAPI, __contract, __contract.source.wasm);
		const gasLimit = (await _genValidGasLimitAndValue(this.nativeAPI, __options)).gasLimit as WeightV2;

		const storageDepositLimit = __options?.storageDepositLimit;
		console.log("gasLimit =", gasLimit);
		console.log("storageDepositLimit =", storageDepositLimit);
		console.log("value =", __options?.value);
		//const tx = code.tx["new"]!({ gasLimit, storageDepositLimit, value: __options?.value }, mintTo, totalSupply, name, symbol, decimal);
		const tx = code.tx["new"]!({ gasLimit, storageDepositLimit, value: __options?.value }, mintTo, totalSupply, name, symbol, decimal);
			let response;
		console.log("tx =", tx);
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
		}
   	}
}