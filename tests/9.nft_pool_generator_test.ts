import { provider, expect, getSigners, checkAccountsBalance, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsNftPoolGenerator from './typed_contracts/constructors/nft_pool_generator';
import ContractNftPoolGenerator from './typed_contracts/contracts/nft_pool_generator';

import ContractWalContract from './typed_contracts/contracts/my_psp22_sale';
import myNftPool from './artifacts/my_nft_pool.json';

import { BN } from '@polkadot/util';

describe('Nft pool generator test', () => {
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

        poolHash = myNftPool.source.hash;
        walContractAddress = "5GiYkqRjQ5JXSvHzYwQZh9RHSrpqq6yPhCewPnpNbCBt2Psq"; // INW contract address
        creationFee = "10000000000000"; // 10 INW      
        unstakeFee = "20000000000000"; // 20 INW      
        
        // "refTime: 626966182"
	    // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 1_400_000_000, 36_000);
                
        const contractFactory = new ConstructorsNftPoolGenerator(api, defaultSigner);

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

        contract = new ContractNftPoolGenerator(contractAddress, defaultSigner, api);    
  
        query = contract.query;
        tx = contract.tx;

        walContract = new ContractWalContract(walContractAddress, defaultSigner, api);    
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Check general info of nft pool generator', async () => {
        let rPoolHash = (await query.getPoolHash()).value.ok;       
        expect(rPoolHash).to.equal(poolHash);
        
        let rWalContractAddress = (await query.getWalContract()).value.ok;     
        expect(rWalContractAddress).to.equal(walContractAddress);

        let rCreationFee = (await query.getCreationFee()).value.ok.toString();
        expect(rCreationFee).to.equal(creationFee);
        
        let rUnstakeFee = (await query.getUnstakeFee()).value.ok.toString();
        expect(rUnstakeFee).to.equal(unstakeFee);
    });

    it('Can create nft pools', async () => {   
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
        
        // Step 4: Alice, Bob create their nft pools
        // console.log("Create pools...");
        // Alice creates nft pool with earning token: XYZ
    
        let nftCollectionAddress1 = "5CHcjyWFExjwyBMGrmMLqL7v8codcXSak9n3DU3bXyHP3z9D"; // White Shark Collection
        let earningTokenAddress1 = "5CbcaQLoCu8ZFX7tLHCgzW8LKVTcwYw79Z3sxEecCqCz5b8c"; // Token1 address, name AAA
        let multiplier1 = "3000000000000"; // Scaled by 10 ** earningToken decimal. Reward 3 earning token/ 1 staking token/ day
        let duration1 = "7776000000";
        let startTime1 = new Date().getTime();
        
        await contract.withSigner(alice).tx.newPool(
            alice.address,
            nftCollectionAddress1,
            earningTokenAddress1,
            multiplier1,
            duration1,
            startTime1
        );

        // Bob creates pool for token2: XYZ
        let nftCollectionAddress2 = "5H7v8XSTG3nshsNeo7AeriotMcGqwLM6kf9rcNHsrQqwAeYW"; // Praying Mantis Predators (PMP) Collection
        let earningTokenAddress2 = "5Dm9HWq5ma2M7HcogqPcvpwHFgD5AW8FxuZgxqc6u1yEMhz7"; // Token2 address, name XYZ
        let multiplier2 = "4000000000000"; // Scaled by 10 ** earningToken decimal. Reward 4 earning token/ 1 staking token/ day
        let duration2 = "5184000000";
        let startTime2 = new Date().getTime();

        await contract.withSigner(bob).tx.newPool(
            bob.address,
            nftCollectionAddress2,
            earningTokenAddress2,
            multiplier2,
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