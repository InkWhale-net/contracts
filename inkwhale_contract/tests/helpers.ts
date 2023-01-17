import BN from 'bn.js'
import { expect } from 'chai'
import { KeyringPair } from '@polkadot/keyring/types'
import { Keyring } from '@polkadot/keyring'
import { WsProvider } from "@polkadot/api";
import { PROVIDER_URL } from "./constants";

export const provider = new WsProvider(PROVIDER_URL);
export { expect } from 'chai'

export const bnArg = (value: number | string | number[] | Uint8Array | Buffer | BN, len = 32) => {
  return new BN(value, undefined, 'le').toArray('le', len)
}

export const oneDay = () => (24 * 60 * 60 * 1000)

export const getSigners = (): KeyringPair[] => {
  const keyring = new Keyring({type: 'sr25519'})

  const UserAlice: KeyringPair = keyring.addFromUri('//Alice_Inkwhale')
  const UserBob: KeyringPair = keyring.addFromUri('//Bob_Inkwhale')
  const UserCharlie: KeyringPair = keyring.addFromUri('//Charlie_Inkwhale')

  return [
    UserAlice, UserBob, UserCharlie
  ]
}

export function bytesToString(bytes: string): string {
  const outputNumber = bytes.substring(2).split('').map(x => parseInt(x as unknown as string, 16))

  const length = outputNumber.length
  let result = ''
  for (let i = 0; i < length; i += 2) {
    result += String.fromCharCode(outputNumber[i] * 16 + outputNumber[i + 1])
  }

  return result
}

export async function showAZBalance(api: any, address: string ) {
    const { data: { free, reserved, miscFrozen } } = await api.query.system.account(address);
    const balance =
      new BN(free).div(new BN(10 ** 6)).toNumber() / 10 ** 6 -
      new BN(miscFrozen).div(new BN(10 ** 6)).toNumber() / 10 ** 6;
  
    return balance;
}