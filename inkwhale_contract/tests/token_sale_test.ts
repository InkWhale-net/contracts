//import { PROVIDER_URL } from "./constants";
import { expect, getSigners, provider } from './helpers';
import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import ConstructorsTokenSale from './typed_contracts/constructors/my_psp22_sale';
import ContractTokenSale from './typed_contracts/contracts/my_psp22_sale';

import ConstructorsToken from './typed_contracts/constructors/my_psp22';
import ContractToken from './typed_contracts/contracts/my_psp22';

import BN from 'bn.js';

describe('TOKEN_SALE', () => {
  async function setup() {
    const api = await ApiPromise.create();
    await api.isReady;
    
    console.log("genesisHash", api.genesisHash.toHex());
    console.log("methods", api.rpc.rpc.methods);
    
    const signers = getSigners();
    const defaultSigner = signers[2];
    const alice = signers[0];
    const bob = signers[1];

    let totalSupplyValue = 100000000;
    let totalSupply = new BN(totalSupplyValue * 10 ** 6).mul(new BN(10 ** 6)).toString();

    let name = "ABC";
    let symbol = "ABC";
    let decimal = 12;

    const contractFactory = new ConstructorsToken(api, defaultSigner);
    //console.log("contractFactory", contractFactory);
    const contractAddress = (await contractFactory.new(defaultSigner.address, totalSupply, [name], [symbol], decimal)).address;
    console.log("contractAddress", contractAddress);
    const contract = new ContractToken(contractAddress, defaultSigner, api);
    
    return {
      api,
      defaultSigner,
      alice,
      bob,
      contract,
      contractAddress,
      query: contract.query,
      tx: contract.tx,
      close: async () => {
        await api.disconnect()
      }
    }
  }

  it('Init', async () => {   
    const { api, query, defaultSigner: sender, close } = await setup();
    expect(100).to.equal(100);
    await close();
  })
})


// const init = async () => {
//   console.log("Before");
//   //const provider = new WsProvider("ws://127.0.0.1:9944");
//   //const api = new ApiPromise({provider, rpc: jsonrpc});
 
//   const api = await ApiPromise.create();
//   await api.isReady;

//   console.log("After ", api.genesisHash.toHex());

//   api.on("connected", () => {
//     api.isReady.then((api) => {
//       console.log("Testnet AZERO Connected");
//     });
//   });

//   api.on("ready", async () => {
//     console.log("Testnet AZERO Ready. Running Test Now...");
//   });

//   api.on("error", (err) => {
//     console.log('error', err );
//   });
  
// };

// const init_testnet = async () => {
//   console.log("Before");
//   const api = new ApiPromise({
//     provider,
//     rpc: jsonrpc
//   });

//   console.log("After");

//   api.on("connected", () => {
//     api.isReady.then((api) => {
//       console.log("Testnet AZERO Connected");
//     });
//   });

//   api.on("ready", async () => {
//     console.log("Testnet AZERO Ready. Running Test Now...");
//   });

//   api.on("error", (err) => {
//     console.log('error', err );
//   });
// };


// init();
// init_testnet();
