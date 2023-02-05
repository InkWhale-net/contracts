import { provider, expect, getSigners, checkAccountsBalance, decodeToBytes, toString, setGasLimit} from '../helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsMyPsp22 from '../typed_contracts/constructors/my_psp22';
import ContractMyPsp22 from '../typed_contracts/contracts/my_psp22';

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

    let totalSupply: string;
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

        totalSupply = "200000000000000000000"; // 200M
        name = "ABC";
        symbol = "ABC";
        decimal = 12;      
        
        // 734697897
        let gasLimit = setGasLimit(api, 6_800_000_000, 0);
        
        const contractFactory = new ConstructorsMyPsp22(api, defaultSigner);
        
        contractAddress = (
            await contractFactory.new(
                defaultSigner.address,
                totalSupply,
                name as unknown as string[],
                symbol as unknown as string[],
                decimal,
                {gasLimit}
            )
        ).address;

        console.log("contractAddress =", contractAddress);

        contract = new ContractMyPsp22(contractAddress, defaultSigner, api);    
        query = contract.query;
        tx = contract.tx;
    };

    before(async () => {
        console.log("Start");
        await setup();
    });
    
    it('Check metadata and receiver balance', async () => {   
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
        
        let rTotalSupply = (await query.totalSupply()).value.ok!.rawNumber.toString();
        expect(rTotalSupply).to.equal(totalSupply);

        let receiver = defaultSigner;
        let balance = (await query.balanceOf(receiver.address)).value.ok!.rawNumber.toString();
        expect(balance).to.equal(totalSupply);     
    });

    it('Faucet works', async () => { 
        let balance1 = (await query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        
        await contract.withSigner(alice).tx.faucet(); 
        
        let balance2 = (await query.balanceOf(alice.address)).value.ok!.rawNumber.toString();

        console.log("balance1 = ", balance1, "balance2 = ", balance2);
        const gain = new BN(balance2).sub(new BN(balance1));

        expect(gain.toString()).to.equal("1000000000000000");
    });

    after(async () => {
        // api.disconnect();
        console.log("End");
    });
});