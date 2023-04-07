import { provider, expect, getSigners, checkAccountsBalance, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsTokenGenerator from './typed_contracts/constructors/token_generator';
import ContractTokenGenerator from './typed_contracts/contracts/token_generator';

import ContractWalContract from './typed_contracts/contracts/my_psp22_sale';
import myPsp22 from './artifacts/my_psp22.json';

import { BN } from '@polkadot/util';

describe('Token generator test', () => {
    let api: any;
    let signers: any;
    let defaultSigner: any;
    let alice: any;
    let bob: any;

    let contractAddress: any;
    let contract: any;
    let query: any;
    let tx: any;

    let walContract: any;

    let psp22Hash: string;
    let walContractAddress: string;
    let creationFee: string;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        defaultSigner = signers[2];
        alice = signers[0];
        bob = signers[1];

        await checkAccountsBalance(signers, api);

        psp22Hash = myPsp22.source.hash;
        walContractAddress = "5GiYkqRjQ5JXSvHzYwQZh9RHSrpqq6yPhCewPnpNbCBt2Psq"; // INW contract address
        creationFee = "4000000000000"; // 4 INW      

        // "refTime: 607483492"
        // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 1_200_000_000, 36_000);
                
        const contractFactory = new ConstructorsTokenGenerator(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(                
                psp22Hash,
                walContractAddress,
                creationFee,
                defaultSigner.address,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractTokenGenerator(contractAddress, defaultSigner, api);    
  
        query = contract.query;
        tx = contract.tx;

        walContract = new ContractWalContract(walContractAddress, defaultSigner, api);    
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Check general info of token generator', async () => {
        let rContractHash = (await query.getContractHash()).value.ok;       
        expect(rContractHash).to.equal(psp22Hash);
        
        let rWalContractAddress = (await query.getWalContract()).value.ok;     
        expect(rWalContractAddress).to.equal(walContractAddress);

        let rCreationFee = (await query.getCreationFee()).value.ok.toString();
        expect(rCreationFee).to.equal(creationFee);       
    });

    it('Can create tokens', async () => {   
        // Alice, Bob mint 1000 INW
        
        // Step 1: Get mintingFee
        let mintingFee = (await walContract.query.mintingFee()).value.ok!.rawNumber.toString();
        // console.log("mintingFee =", mintingFee);

        // Step 2: Mint
        // console.log("Mint INW...");
        let aliceBalance = (await walContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        let bobBalance = (await walContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();

        // console.log("aliceBalance before =", aliceBalance);
        // console.log("bobBalance before =", bobBalance);

        // let total = creationFee; 
        let total = "1000000000000000"; // 1000 INW
        
        if ( new BN(aliceBalance).cmp(new BN(total)) == -1)
            await walContract.withSigner(alice).tx.publicMint(
                total,
                { value: new BN(mintingFee).mul(new BN(total).div(new BN(10 ** 12))) }
            );

        if ( new BN(bobBalance).cmp(new BN(total)) == -1)    
            await walContract.withSigner(bob).tx.publicMint(
                total,
                { value: new BN(mintingFee).mul(new BN(total).div(new BN(10 ** 12))) }
            );

        let aliceBalanceAft = (await walContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        let bobBalanceAft = (await walContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();

        // console.log("aliceBalance aft =", aliceBalanceAft);
        // console.log("bobBalance aft =", bobBalanceAft);    
      
        // Step 3: Alice, Bob approve creationFee in INW for token generator contract
        // console.log("Approve creationFee for gen contract ...");
        await walContract.withSigner(alice).tx.approve(
            contractAddress,
            creationFee,
        );

        await walContract.withSigner(bob).tx.approve(
            contractAddress,
            creationFee
        );
        
        // Step 4: Alice, Bob create their tokens
        // console.log("Create tokens...");
        // Token1: AAA, 200M, minto: Alice
        let totalSupply1 = "200000000000000000000"; // 200M
        let name1 = "AAA";
        let symbol1 = "AAA";
        let decimal1 = 12;
        await contract.withSigner(alice).tx.newToken(
            alice.address,
            totalSupply1,
            name1 as unknown as string[],
            symbol1 as unknown as string[],
            decimal1
        );

        // Token2: XYZ, 10M, minto: Bob
        let totalSupply2 = "10000000000000000000"; // 10M
        let name2 = "XYZ";
        let symbol2 = "XYZ";
        let decimal2 = 12;
        await contract.withSigner(bob).tx.newToken(
            bob.address,
            totalSupply2,
            name2 as unknown as string[],
            symbol2 as unknown as string[],
            decimal2
        );
        
        // Step 5: Check token count
        let tokenCount = (await query.getTokenCount()).value.ok;
        expect(tokenCount).to.equal(2);

        let token1 = (await query.getTokenInfo(1)).value.ok;
        // console.log("token1 ", token1); 
        
        let token2 = (await query.getTokenInfo(2)).value.ok;
        // console.log("token2 ", token2);   
    });
    
    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});