import { provider, expect, getSigners, checkAccountsBalance, decodeToBytes, toString, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsTokenStandard from './typed_contracts/constructors/token_standard';
import ContractTokenStandard from './typed_contracts/contracts/token_standard';

import { BN } from '@polkadot/util';

describe('Token contract test', () => {
    let api: any;
    let signers: any;
    let defaultSigner: any;
    let alice: any;
    let bob: any;
    
    let contractAddress: any;
    let contract: any;
    let query: any;
    let tx: any;

    let mintTo: any;
    let cap: string;
    let name: string;
    let symbol: string;
    let decimal: number;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        alice = signers[0];
        bob = signers[1];

        await checkAccountsBalance(signers, api);

        defaultSigner = alice;
        mintTo = bob;
        cap = "200000000000000000000"; // 200M
        name = "ABC";
        symbol = "ABC";
        decimal = 12;      
        
        // "refTime: 599049714"
        // "proofSize: 19456"
        let gasLimit = setGasLimit(api, 1_200_000_000, 40_000);
        
        const contractFactory = new ConstructorsTokenStandard(api, defaultSigner);
        
        contractAddress = (
            await contractFactory.new(
                defaultSigner.address,
                mintTo.address,
                cap,
                name as unknown as string[],
                symbol as unknown as string[],
                decimal,
                {gasLimit}
            )
        ).address;

        console.log("contractAddress =", contractAddress);

        contract = new ContractTokenStandard(contractAddress, defaultSigner, api);    
        query = contract.query;
        tx = contract.tx;
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Check metadata and balance of receiver', async () => {   
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
        
        let rCap = (await query.cap()).value.ok!.rawNumber.toString();
        expect(rCap).to.equal(cap);

        let rTotalSupply = (await query.totalSupply()).value.ok!.rawNumber.toString();
        expect(rTotalSupply).to.equal(cap);

        let balance = (await query.balanceOf(mintTo.address)).value.ok!.rawNumber.toString();
        expect(balance).to.equal(cap);     
    });

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});