import { provider, expect, getSigners, checkAccountsBalance, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsPoolGenerator from './typed_contracts/constructors/pool_generator';
import ContractPoolGenerator from './typed_contracts/contracts/pool_generator';

import ContractWalContract from './typed_contracts/contracts/my_psp22_sale';
import myPool from './artifacts/my_pool.json';

import { BN } from '@polkadot/util';

describe('Pool generator test', () => {
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

    let poolHash: string;
    let walContractAddress: string;
    let creationFee: string;
    let unstakeFee: string;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        defaultSigner = signers[2];
        alice = signers[0];
        bob = signers[1];

        await checkAccountsBalance(signers, api);

        poolHash = myPool.source.hash;
        walContractAddress = "5FKxWQhAwpmkZG9gUDZKwGDeUuhjKkzMaCcs8qcWXJ5vegyd"; // INW contract address
        creationFee = "4000000000000"; // 4 INW      
        unstakeFee = "8000000000000"; // 8 INW      
        
        let gasLimit = setGasLimit(api, 1_000_000_000, 0);
                
        const contractFactory = new ConstructorsPoolGenerator(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(                
                poolHash,
                walContractAddress,
                creationFee,
                unstakeFee,
                defaultSigner.address,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractPoolGenerator(contractAddress, defaultSigner, api);    
  
        query = contract.query;
        tx = contract.tx;

        walContract = new ContractWalContract(walContractAddress, defaultSigner, api);    
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Check general info of pool generator', async () => {
        let rPoolHash = (await query.getPoolHash()).value.ok;       
        expect(rPoolHash).to.equal(poolHash);
        
        let rWalContractAddress = (await query.getWalContract()).value.ok;     
        expect(rWalContractAddress).to.equal(walContractAddress);

        let rCreationFee = (await query.getCreationFee()).value.ok.toString();
        expect(rCreationFee).to.equal(creationFee);
        
        let rUnstakeFee = (await query.getUnstakeFee()).value.ok.toString();
        expect(rUnstakeFee).to.equal(unstakeFee);
    });

    it('Can create pools', async () => {   
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
        
        // Step 4: Alice, Bob create their pools
        // console.log("Create pools...");
        // Alice creates pool for token1: AAA
    
        let tokenAddress1 = "5DeopAuxKedXM7YrYrN6NJWU3oykFYLaMJGbWCJPnvXTEW7S"; // Token1 address, name AAA
        let apy1 = "3000";
        let duration1 = "7776000000";
        let startTime1 = new Date().getTime();
        await contract.withSigner(alice).tx.newPool(
            alice.address,
            tokenAddress1,
            apy1,
            duration1,
            startTime1
        );

        // Bob creates pool for token2: XYZ
        let tokenAddress2 = "5CxpxW9V6RnYhkZdfBk1GoFNAS3U7SDbRC2oHpazP2V8LxMd"; // 10M
        let apy2 = "2000";
        let duration2 = "2592000000";
        let startTime2 = new Date().getTime();
        await contract.withSigner(bob).tx.newPool(
            bob.address,
            tokenAddress2,
            apy2,
            duration2,
            startTime2
        );
        
        // Step 5: Check pool count
        let poolCount = (await query.getPoolCount()).value.ok;
        expect(poolCount).to.equal(2);

        let pool1 = (await query.getPool(1)).value.ok;
        // console.log("pool1 ", pool1); 
        
        let pool2 = (await query.getPool(2)).value.ok;
        // console.log("pool2 ", pool2);   
    });
    
    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});