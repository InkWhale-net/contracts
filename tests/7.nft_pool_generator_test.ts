import { provider, expect, getSigners, checkAccountsBalance, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsNftPoolGenerator from './typed_contracts/constructors/nft_pool_generator';
import ContractNftPoolGenerator from './typed_contracts/contracts/nft_pool_generator';

import ConstructorsTokenGenerator from './typed_contracts/constructors/token_generator';
import ContractTokenGenerator from './typed_contracts/contracts/token_generator';

import ContractTokenStandard from './typed_contracts/contracts/token_standard';

import ConstructorsInw from './typed_contracts/constructors/psp22_standard';
import ContractInw from './typed_contracts/contracts/psp22_standard';

import TokenStandard from './artifacts/token_standard.json';
import MyNftPool from './artifacts/my_nft_pool.json';

describe('Nft pool generator test', () => {
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

    let tgContractAddress: any; // Token generator
    let tgContract: any;
    let tgQuery: any;
    let tgTx: any;
    
    let tgPsp22Hash: string;
    let tgCreationFee: string;

    let contractAddress: any;
    let contract: any;
    let query: any;
    let tx: any;

    let poolHash: string;
    let creationFee: string;
    let unstakeFee: string;

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

        // console.log("inwContractAddress =", inwContractAddress);

        inwContract = new ContractInw(inwContractAddress, defaultSigner, api);    
  
        inwQuery = inwContract.query;
        inwTx = inwContract.tx;

        // Step 2: Create token generator contract
        tgPsp22Hash = TokenStandard.source.hash;
        tgCreationFee = "3000000000000"; // 3 INW      

        // "refTime: 607483492"
        // "proofSize: 17408"
        let tgGasLimit = setGasLimit(api, 1_200_000_000, 36_000);
                
        const tgContractFactory = new ConstructorsTokenGenerator(api, defaultSigner);

        tgContractAddress = (
            await tgContractFactory.new(                
                tgPsp22Hash,
                inwContractAddress,
                tgCreationFee,
                defaultSigner.address,
                {gasLimit: tgGasLimit}
            )
        ).address;

        // console.log("tgContractAddress =", tgContractAddress);

        tgContract = new ContractTokenGenerator(tgContractAddress, defaultSigner, api);    
  
        tgQuery = tgContract.query;
        tgTx = tgContract.tx;         

        // Step 3: Create a nft pool generator contract
        poolHash = MyNftPool.source.hash;
        creationFee = "5000000000000"; // 5 INW      
        unstakeFee = "10000000000000"; // 10 INW      
        
        // "refTime: 626966182"
	    // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 1_400_000_000, 36_000);
                
        const contractFactory = new ConstructorsNftPoolGenerator(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(                
                poolHash,
                inwContractAddress,
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
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Check general info of nft pool generator', async () => {
        let rPoolHash = (await query.getPoolHash()).value.ok;       
        expect(rPoolHash).to.equal(poolHash);
        
        let rInwAddress = (await query.getInwContract()).value.ok;     
        expect(rInwAddress).to.equal(inwContractAddress);

        let rCreationFee = (await query.getCreationFee()).value.ok.toString();
        expect(rCreationFee).to.equal(creationFee);
        
        let rUnstakeFee = (await query.getUnstakeFee()).value.ok.toString();
        expect(rUnstakeFee).to.equal(unstakeFee);
    });

    it('Can create nft pools', async () => {   
        /// A. Use token generator to create 2 tokens  
        // Step A1: Onwer mints tgCreationFee in INW to Alice, Bob 
        await inwContract.tx.mint(
            alice.address,
            tgCreationFee
        ); 

        await inwContract.tx.mint(
            bob.address,
            tgCreationFee
        ); 

        let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        let bobBalance = (await inwContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();

        // console.log("aliceBalance before =", aliceBalance);
        // console.log("bobBalance before =", bobBalance);
        expect(aliceBalance).to.equal(tgCreationFee);
        expect(bobBalance).to.equal(tgCreationFee);
        
        // Step A2: Alice, Bob approve tgCreationFee in INW for token generator contract
        // console.log("Approve tgCreationFee for gen contract ...");
        await inwContract.withSigner(alice).tx.approve(
            tgContractAddress,
            tgCreationFee,
        );

        await inwContract.withSigner(bob).tx.approve(
            tgContractAddress,
            tgCreationFee
        );
        
        // Step A3: Alice, Bob create their tokens, check if INW is burnt after creating token
        // console.log("Create tokens...");
        // Token1: AAA, 200M, minto: Alice
        let cap1 = "200000000000000000000"; // 200M
        let name1 = "AAA";
        let symbol1 = "AAA";
        let decimal1 = 12;
        await tgContract.withSigner(alice).tx.newToken(
            alice.address,
            cap1,
            name1 as unknown as string[],
            symbol1 as unknown as string[],
            decimal1
        );

        let tgContractBalance = (await inwContract.query.balanceOf(tgContractAddress)).value.ok!.rawNumber.toString();
        // console.log("tgContractBalance =", tgContractBalance);
        expect(+tgContractBalance).to.equal(0);

        // Token2: XYZ, 10M, minto: Bob
        let cap2 = "10000000000000000000"; // 10M
        let name2 = "XYZ";
        let symbol2 = "XYZ";
        let decimal2 = 12;
        await tgContract.withSigner(bob).tx.newToken(
            bob.address,
            cap2,
            name2 as unknown as string[],
            symbol2 as unknown as string[],
            decimal2
        );

        tgContractBalance = (await inwContract.query.balanceOf(tgContractAddress)).value.ok!.rawNumber.toString();
        // console.log("tgContractBalance =", tgContractBalance);
        expect(+tgContractBalance).to.equal(0);

        aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        bobBalance = (await inwContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();

        // console.log("aliceBalance aft =", aliceBalance);
        // console.log("bobBalance aft =", bobBalance);    
        expect(+aliceBalance).to.equal(0);
        expect(+bobBalance).to.equal(0);

        // Step A4: Check token count
        let tokenCount = (await tgQuery.getTokenCount()).value.ok;
        expect(tokenCount).to.equal(2);

        let tokenAddress1 = (await tgQuery.getTokenContractAddress(1)).value.ok;
        // console.log("token1 ", tokenAddress1); 
        
        let tokenAddress2 = (await tgQuery.getTokenContractAddress(2)).value.ok;
        // console.log("token2 ", tokenAddress2);  
        
        /// B. Create pools   
        // Step B1: Onwer mints creation fee in INW to Alice, Bob 
        await inwContract.tx.mint(
            alice.address,
            creationFee
        ); 

        await inwContract.tx.mint(
            bob.address,
            creationFee
        ); 

        aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        bobBalance = (await inwContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();

        // console.log("aliceBalance before =", aliceBalance);
        // console.log("bobBalance before =", bobBalance);
        expect(aliceBalance).to.equal(creationFee);
        expect(bobBalance).to.equal(creationFee);

        // Step B2: Alice, Bob approve creationFee in INW for pool generator contract
        // console.log("Approve creationFee for gen contract ...");
        await inwContract.withSigner(alice).tx.approve(
            contractAddress,
            creationFee,
        );

        await inwContract.withSigner(bob).tx.approve(
            contractAddress,
            creationFee
        );
                
        // Step B3: Alice, Bob approve rewards and create their nft pools
        // console.log("Create pools...");
        // Alice creates nft pool with token1: AAA            
        let nftCollectionAddress1 = "5CHcjyWFExjwyBMGrmMLqL7v8codcXSak9n3DU3bXyHP3z9D"; // White Shark Collection
        let maxStakingAmount1 = "1000";
        let multiplier1 = "3000000000000"; // Scaled by 10 ** earningToken decimal. Reward 3 earning token/ 1 staking token/ day
        let duration1 = "7776000000";
        let startTime1 = new Date().getTime();
        
        // Alice approves rewards
        let minRewardAmount1 = Math.floor(parseFloat(maxStakingAmount1) * parseFloat(duration1) * parseFloat(multiplier1) / (24 * 60 * 60 * 1000));
        // console.log("minRewardAmount1 = ", minRewardAmount1);

        let tokenContract1 = new ContractTokenStandard(tokenAddress1, alice, api);
        await tokenContract1.withSigner(alice).tx.approve(
            contractAddress,
            minRewardAmount1.toString()
        );

        // let aliceToken1Allowance = await tokenContract1.query.allowance(
        //     alice.address,
        //     contractAddress,
        // );
        // console.log("aliceToken1Allowance = ", aliceToken1Allowance.value.ok!.rawNumber.toString());

        // let aliceToken1Balance = (await tokenContract1.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        // console.log("aliceToken1Balance = ", aliceToken1Balance);

        // Alice creates a nft pool
        await contract.withSigner(alice).tx.newPool(
            alice.address,
            nftCollectionAddress1,
            tokenAddress1,
            maxStakingAmount1,
            multiplier1,
            duration1,
            startTime1
        );

        // Bob creates nft pool with token2: XYZ      
        let nftCollectionAddress2 = "5H7v8XSTG3nshsNeo7AeriotMcGqwLM6kf9rcNHsrQqwAeYW"; // Praying Mantis Predators (PMP) Collection
        let maxStakingAmount2 = "2000";
        let multiplier2 = "4000000000000"; // Scaled by 10 ** earningToken decimal. Reward 4 earning token/ 1 staking token/ day
        let duration2 = "5184000000";
        let startTime2 = new Date().getTime();

        // Bob approves rewards
        let minRewardAmount2 = Math.floor(parseFloat(maxStakingAmount2) * parseFloat(duration2) * parseFloat(multiplier2) / (24 * 60 * 60 * 1000));
        // console.log("minRewardAmount2 = ", minRewardAmount2);

        let tokenContract2 = new ContractTokenStandard(tokenAddress2, bob, api);
        await tokenContract2.withSigner(bob).tx.approve(
            contractAddress,
            minRewardAmount2.toString()
        );

        // Bob creates a nft pool
        await contract.withSigner(bob).tx.newPool(
            bob.address,
            nftCollectionAddress2,
            tokenAddress2,
            maxStakingAmount2,
            multiplier2,
            duration2,
            startTime2
        );
        
        // Step 5: Check pool count
        let poolCount = (await query.getPoolCount()).value.ok;
        expect(poolCount).to.equal(2);

        // let pool1 = (await query.getPool(1)).value.ok;
        // console.log("pool1 ", pool1); 
        
        // let pool2 = (await query.getPool(2)).value.ok;
        // console.log("pool2 ", pool2);   
    });
    
    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});