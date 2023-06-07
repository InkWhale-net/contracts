import { provider, expect, getSigners, checkAccountsBalance, decodeToBytes, toString, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsInw from './typed_contracts/constructors/psp22_standard';
import ContractInw from './typed_contracts/contracts/psp22_standard';

import { BN } from '@polkadot/util';

describe('Inw token test', () => {
    let api: any;
    let signers: any;
    let defaultSigner: any;
    let alice: any;
    let bob: any;

    let contractAddress: any;
    let contract: any;
    let query: any;
    let tx: any;

    let cap: string;
    let name: string;
    let symbol: string;
    let decimal: number;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        defaultSigner = signers[2];
        alice = signers[0];
        bob = signers[1];

        await checkAccountsBalance(signers, api);

        cap = "1000000000000000000000"; // 1B    
        name = "Ink Whale Token";
        symbol = "INW";
        decimal = 12;

        // "refTime: 470289652"
        // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 960_000_000, 36_000);
                
        const contractFactory = new ConstructorsInw(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(
                cap,
                name,
                symbol,
                decimal,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractInw(contractAddress, defaultSigner, api);    
  
        query = contract.query;
        tx = contract.tx;
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Check metadata', async () => {   
        let rCap = (await query.cap()).value.ok!.rawNumber.toString();
        expect(rCap).to.equal(cap);

        let encodedName = (await query.tokenName()).value.ok!.toString();
        let nameBytes: number[] = decodeToBytes(encodedName);
        let rName: string = toString(nameBytes);         
        expect(rName).to.equal(name);

        let encodedSymbol = (await query.tokenSymbol()).value.ok!.toString();
        let symbolBytes: number[] = decodeToBytes(encodedSymbol);
        let rSymbol: string = toString(symbolBytes);         
        expect(rSymbol).to.equal(symbol);

        let rDecimal = (await query.tokenDecimals()).value.ok;         
        expect(rDecimal).to.equal(decimal);    
    });

    it('Can mint', async () => {   
        let balance1 = (await query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        
        let amount = "400000000000000"; // 400 INW
        
        // Onwer mints to Alice
        await contract.tx.mint(
            alice.address,
            amount
        ); 
        
        let balance2 = (await query.balanceOf(alice.address)).value.ok!.rawNumber.toString();

        // console.log("balance1 = ", balance1, "balance2 = ", balance2);
        const gain = new BN(balance2).sub(new BN(balance1));
        
        expect(gain.toString()).to.equal(amount);
    });
    
    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});