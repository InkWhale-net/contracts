import { provider, expect, getSigners, checkAccountsBalance, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsTokenGenerator from './typed_contracts/constructors/token_generator';
import ContractTokenGenerator from './typed_contracts/contracts/token_generator';

import ConstructorsInw from './typed_contracts/constructors/psp22_standard';
import ContractInw from './typed_contracts/contracts/psp22_standard';

import TokenStandard from './artifacts/token_standard.json';

describe('Token generator test', () => {
    let api: any;
    let signers: any;
    let defaultSigner: any;
    let alice: any;
    let bob: any;

    let inwContractAddress: any;
    let inwContract: any;
    let inwQuery: any;
    let inwTx: any;

    let inwCap;
    let inwName;
    let inwSymbol;
    let inwDecimal;

    let contractAddress: any;
    let contract: any;
    let query: any;
    let tx: any;

    let psp22Hash: string;
    let creationFee: string;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        defaultSigner = signers[2];
        alice = signers[0];
        bob = signers[1];

        await checkAccountsBalance(signers, api);

        // Step 1: Create inw contract
        inwCap = "1000000000000000000000"; // 1B    
        inwName = "Ink Whale Token";
        inwSymbol = "INW";
        inwDecimal = 12;

        // "refTime: 470289652"
        // "proofSize: 17408"
        let inwGasLimit = setGasLimit(api, 960_000_000, 36_000);
                
        const inwContractFactory = new ConstructorsInw(api, defaultSigner);

        inwContractAddress = (
            await inwContractFactory.new(
                inwCap,
                inwName,
                inwSymbol,
                inwDecimal,
                {gasLimit: inwGasLimit}
            )
        ).address;

        inwContract = new ContractInw(inwContractAddress, defaultSigner, api);    
  
        inwQuery = inwContract.query;
        inwTx = inwContract.tx;

        // Step 2: Create token generator contract
        psp22Hash = TokenStandard.source.hash;
        creationFee = "3000000000000"; // 3 INW      

        // "refTime: 607483492"
        // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 1_200_000_000, 36_000);
                
        const contractFactory = new ConstructorsTokenGenerator(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(                
                psp22Hash,
                inwContractAddress,
                creationFee,
                defaultSigner.address,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractTokenGenerator(contractAddress, defaultSigner, api);    
  
        query = contract.query;
        tx = contract.tx;
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Check general info of token generator', async () => {
        let rContractHash = (await query.getContractHash()).value.ok;       
        expect(rContractHash).to.equal(psp22Hash);
        
        let rInwAddress = (await query.getInwContract()).value.ok;     
        expect(rInwAddress).to.equal(inwContractAddress);

        let rCreationFee = (await query.getCreationFee()).value.ok.toString();
        expect(rCreationFee).to.equal(creationFee);       
    });

    it('Can create tokens', async () => {   
        // Step 1: Onwer mints creation fee in INW to Alice, Bob 
        await inwContract.tx.mint(
            alice.address,
            creationFee
        ); 

        await inwContract.tx.mint(
            bob.address,
            creationFee
        ); 

        let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        let bobBalance = (await inwContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();

        // console.log("aliceBalance before =", aliceBalance);
        // console.log("bobBalance before =", bobBalance);
        expect(aliceBalance).to.equal(creationFee);
        expect(bobBalance).to.equal(creationFee);
        
        // Step 2: Alice, Bob approve creationFee in INW for token generator contract
        // console.log("Approve creationFee for gen contract ...");
        await inwContract.withSigner(alice).tx.approve(
            contractAddress,
            creationFee,
        );

        await inwContract.withSigner(bob).tx.approve(
            contractAddress,
            creationFee
        );
        
        // Step 3: Alice, Bob create their tokens, check if INW is burnt after creating token
        // console.log("Create tokens...");
        // Token1: AAA, 200M, minto: Alice
        let cap1 = "200000000000000000000"; // 200M
        let name1 = "AAA";
        let symbol1 = "AAA";
        let decimal1 = 12;
        await contract.withSigner(alice).tx.newToken(
            alice.address,
            cap1,
            name1 as unknown as string[],
            symbol1 as unknown as string[],
            decimal1
        );

        let contractBalance = (await inwContract.query.balanceOf(contractAddress)).value.ok!.rawNumber.toString();
        // console.log("contractBalance =", contractBalance);
        expect(+contractBalance).to.equal(0);

        // Token2: XYZ, 10M, minto: Bob
        let cap2 = "10000000000000000000"; // 10M
        let name2 = "XYZ";
        let symbol2 = "XYZ";
        let decimal2 = 12;
        await contract.withSigner(bob).tx.newToken(
            bob.address,
            cap2,
            name2 as unknown as string[],
            symbol2 as unknown as string[],
            decimal2
        );

        contractBalance = (await inwContract.query.balanceOf(contractAddress)).value.ok!.rawNumber.toString();
        // console.log("contractBalance =", contractBalance);
        expect(+contractBalance).to.equal(0);

        let aliceBalanceAft = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        let bobBalanceAft = (await inwContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();

        // console.log("aliceBalance aft =", aliceBalanceAft);
        // console.log("bobBalance aft =", bobBalanceAft);    
        expect(+aliceBalanceAft).to.equal(0);
        expect(+bobBalanceAft).to.equal(0);

        // Step 4: Check token count
        let tokenCount = (await query.getTokenCount()).value.ok;
        expect(tokenCount).to.equal(2);

        // let token1 = (await query.getTokenContractAddress(1)).value.ok;
        // console.log("token1 ", token1); 
        
        // let token2 = (await query.getTokenContractAddress(2)).value.ok;
        // console.log("token2 ", token2);   
    });
    
    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});