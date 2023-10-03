import { provider, expect, getSigners, checkAccountsBalance, setGasLimit} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsLaunchpadGenerator from './typed_contracts/constructors/launchpad_generator_op4';
import ContractLaunchpadGenerator from './typed_contracts/contracts/launchpad_generator_op4';

import ConstructorsTokenGenerator from './typed_contracts/constructors/token_generator';
import ContractTokenGenerator from './typed_contracts/contracts/token_generator';

import ContractTokenStandard from './typed_contracts/contracts/token_standard';

import ConstructorsInw from './typed_contracts/constructors/psp22_standard';
import ContractInw from './typed_contracts/contracts/psp22_standard';

import TokenStandard from './artifacts/token_standard.json';
import MyLaunchpad from './artifacts/my_launchpad_op4.json';
import { PhaseInput } from './typed_contracts/types-arguments/launchpad_generator_op4';

describe('Launchpad generator test', () => {
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

    let launchpadHash: string;
    let creationFee: string;
    let txRate: number;
    let adminAddress: string;

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

        // Step 3: Create a launchpad generator contract
        launchpadHash = MyLaunchpad.source.hash;
        creationFee = "4000000000000"; // 4 INW      
        txRate = 500; // 8 INW      
        adminAddress = defaultSigner.address;
        // "refTime: 626966182"
	    // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 3_600_000_000, 36_000);
                
        const contractFactory = new ConstructorsLaunchpadGenerator(api, defaultSigner);

        contractAddress = (
            await contractFactory.new(                
                launchpadHash,
                inwContractAddress,
                creationFee,
                txRate,
                adminAddress,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractLaunchpadGenerator(contractAddress, defaultSigner, api);    
  
        query = contract.query;
        tx = contract.tx;
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });   
 
    it('Can create launchpad', async () => {   
        /// A. Use token generator to create a token
        // Step A1: Onwer mints tgCreationFee in INW to Alice 
        await inwContract.tx.mint(
            alice.address,
            tgCreationFee
        ); 
        let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        // console.log("aliceBalance before =", aliceBalance);
        expect(aliceBalance).to.equal(tgCreationFee);
        
        // Step A2: Alice approves tgCreationFee in INW for token generator contract
        // console.log("Approve tgCreationFee for gen contract ...");
        await inwContract.withSigner(alice).tx.approve(
            tgContractAddress,
            tgCreationFee,
        );
        
        // Step A3: Alice creates their tokens, check if INW is burnt after creating token
        // console.log("Create token...");
        // Token1: LNPD, 200M, minto: Alice
        let cap = "200000000000000000000"; // 200M
        let name = "LAUNCHPAD";
        let symbol = "LNPD";
        let decimal = 12;
        await tgContract.withSigner(alice).tx.newToken(
            alice.address,
            cap,
            name as unknown as string[],
            symbol as unknown as string[],
            decimal
        );

        let tgContractBalance = (await inwContract.query.balanceOf(tgContractAddress)).value.ok!.rawNumber.toString();
        // console.log("tgContractBalance =", tgContractBalance);
        expect(+tgContractBalance).to.equal(0);

        aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        // console.log("aliceBalance aft =", aliceBalance);
        expect(+aliceBalance).to.equal(0);

        // Step A4: Check token count
        let tokenCount = (await tgQuery.getTokenCount()).value.ok;
        expect(tokenCount).to.equal(1);

        let tokenAddress = (await tgQuery.getTokenContractAddress(1)).value.ok;
        // console.log("token ", tokenAddress); 
        let tokenContract = new ContractTokenStandard(tokenAddress, alice, api); 

        /// B. Create launchpad  
        // Step B1: Onwer mints creation fee in INW to Alice
        await inwContract.tx.mint(
            alice.address,
            creationFee
        ); 

        aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        // console.log("aliceBalance before =", aliceBalance);
        expect(aliceBalance).to.equal(creationFee);

        // Step B2: Alice approves creationFee in INW for launchpad generator contract
        // console.log("Approve creationFee for gen contract ...");
        await inwContract.withSigner(alice).tx.approve(
            contractAddress,
            creationFee,
        );
                
        // Step B3: Alice approves total supply of token and create a launchpad
        console.log("Create launchpad...");
        // Alice approve total supply of token
        let totalSupply = "700000000000000000"; // 700k        
        await tokenContract.withSigner(alice).tx.approve(
            contractAddress,
            totalSupply,
        );
  
        // Alice creates launchpad for token LNPD    
        let projectInfoUri = "Launchpad test"; // 1000 token AAA
        let startTime = new Date().getTime();
                
        let phase1: PhaseInput = {
            name: "Phase 1",
            startTime: startTime,
            endTime: startTime + 3 * 86400000,
            immediateReleaseRate: 500,
            vestingDuration: 1800000, 
            vestingUnit: 300000,
            isPublic: true,
            publicAmount: "100000000000000000",
            publicPrice: "500000000000"
        };

        let phase2: PhaseInput = {
            name: "Phase 2",
            startTime: startTime + 4 * 86400000,
            endTime: startTime + 5 * 86400000,
            immediateReleaseRate: 1500,
            vestingDuration: 1800000, 
            vestingUnit: 300000,
            isPublic: true,
            publicAmount: "500000000000000000",
            publicPrice: "1000000000000"
        };

        await contract.withSigner(alice).tx.newLaunchpad(
            projectInfoUri,
            tokenAddress,
            totalSupply,
            [phase1, phase2]
        );
        
        // Step B5: Check launchpad count
        let launchpadCount = (await query.getLaunchpadCount()).value.ok;
        expect(launchpadCount).to.equal(1);

        let launchpad = (await query.getLaunchpadById(1)).value.ok;
        console.log("launchpad ", launchpad); 
    });
    
    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});