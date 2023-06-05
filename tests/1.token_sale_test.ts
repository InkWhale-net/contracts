import { provider, expect, getSigners, checkAccountsBalance, decodeToBytes, toString, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsMyPsp22Sale from './typed_contracts/constructors/my_psp22_sale';
import ContractMyPsp22Sale from './typed_contracts/contracts/my_psp22_sale';

import { BN } from '@polkadot/util';

describe('Token sale test', () => {
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
    let mintingFee: string;
    let mintingCap: string;
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

        cap = "100000000000000000000"; // 100M
        mintingFee = "20000000000"; // 0.02 ZERO
        mintingCap = "10000000000000000000"; // 10M       
        name = "INW";
        symbol = "INW";
        decimal = 12;

        // "refTime: 470289652"
        // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 960_000_000, 36_000);
                
        const contractFactory = new ConstructorsMyPsp22Sale(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(
                defaultSigner.address,
                cap,
                mintingFee,
                mintingCap,
                name as unknown as string[],
                symbol as unknown as string[],
                decimal,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractMyPsp22Sale(contractAddress, defaultSigner, api);    
  
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

        let rMintingFee = (await query.mintingFee()).value.ok!.rawNumber.toString();
        expect(rMintingFee).to.equal(mintingFee);

        let rMintingCap = (await query.mintingCap()).value.ok!.rawNumber.toString();
        expect(rMintingCap).to.equal(mintingCap);

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

    it('Can publish mint', async () => {   
        let balance1 = (await query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        
        let amount = "400000000000000"; // 400 INW
        let fee = new BN(amount).div(new BN(10 ** 12)).mul(new BN(mintingFee));
        // console.log("fee = ", fee.toString());
        
        // console.log("contract = ", contract);
        await contract.withSigner(alice).tx.publicMint(
            amount,
            {value: fee.toString()}
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