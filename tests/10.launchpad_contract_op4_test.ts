import {checkAccountsBalance, delay, expect, getSigners, provider, setGasLimit} from "./helpers";
import {ApiPromise} from "@polkadot/api";

import { BN } from '@polkadot/util';

import ConstructorsInw from "./typed_contracts/constructors/psp22_standard_op4";
import ContractInw from "./typed_contracts/contracts/psp22_standard_op4";

import ConstructorsTokenGenerator from "./typed_contracts/constructors/token_generator";
import ContractTokenGenerator from "./typed_contracts/contracts/token_generator";

import ConstructorsLaunchpadGenerator from "./typed_contracts/constructors/launchpad_generator_op4";
import ContractLaunchpadGenerator from "./typed_contracts/contracts/launchpad_generator_op4";

import MyLaunchpad from "./artifacts/my_launchpad_op4.json";
import ContractMyLaunchpad from "./typed_contracts/contracts/my_launchpad_op4";

import TokenStandard from "./artifacts/token_standard_op4.json";
import ConstructorsTokenStandard from "./typed_contracts/constructors/token_standard_op4";
import ContractTokenStandard from "./typed_contracts/contracts/token_standard_op4";
import { NORMAL_WAITING_TIME } from "./constants";

// const refTime = 40_000_000_000; // 256_000_000_000
// const proofSize = 70_000;              // 5_000_000_000_000

describe('Launchpad contract test', () => {
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

    let lpgContractAddress: any; 
    let lpgContract: any;
    let lpgQuery: any;
    let lpgTx: any;

    let lpContractAddress: any;
    let lpContract: any;
    let lpQuery: any;
    let lpTx: any;

    let launchpadHash: string;
    let creationFee: string;
    let launchpadFee: string;
    let txRate: number;
    let adminAddress: string;

    let tokenContractAddress: string;
    let tokenContract: any;
    let tokenQuery: any;
    let tokenTx: any;

    let projectInfoUri;
    let phaseName: any;
    let startTime: any;
    let phaseStartTime: any;
    let phaseEndTime: any;
    let phaseImmediateReleaseRate: any;
    let phaseVestingDuration: any;
    let phaseVestingUnit: any;
    let phaseIsPublic: any;
    let phasePublicAmount: any;
    let phasePublicPrice: any;

    async function setup() {
        api = await ApiPromise.create({ provider });
        signers = getSigners();
        defaultSigner = signers[2];
        alice = signers[0];
        bob = signers[1];
        await checkAccountsBalance(signers, api);

        // Step 0: Get current network's status
        const chain = await api.rpc.system.chain();
        const header = await api.rpc.chain.getHeader();
        console.log(`${chain}: last block #${header.number} has hash ${header.hash}`);

        // Step 1: Create inw contract
        console.log(`===========Create new inwContractAddress=============`);
        inwCap = "1000000000000000000000"; // 1B
        inwName = "Ink Whale Token";
        inwSymbol = "INW";
        inwDecimal = 12;

        // "refTime: 1051644047" "proofSize: 22528"
        let inwGasLimit = setGasLimit(api, 2_000_000_000, 44_000);

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

        // Step 2: Create token contract
        console.log(`===========Create new tokenContractAddress=============`);
        let cap = "200000000000000000000"; // 200M
        let name = "LAUNCHPAD";
        let symbol = "LNPD";
        let decimal = 12;

        // "refTime: 2096906375" "proofSize: 28688"
        let tokenGasLimit = setGasLimit(api, 4_000_000_000, 56_000);
        
        const tokenContractFactory = new ConstructorsTokenStandard(api, alice);
        tokenContractAddress = (
            await tokenContractFactory.new(
                alice.address,
                alice.address,
                cap,
                name,
                symbol,
                decimal,
                {gasLimit: tokenGasLimit}
            )
        ).address;   
        tokenContract = new ContractTokenStandard(tokenContractAddress, alice, api);
        tokenQuery = tokenContract.query;
        tokenTx = tokenContract.tx;   
        
        // Step 3: Create a launchpad generator contract
        console.log(`===========Create new launchpadContractAddress=============`);
        launchpadHash = MyLaunchpad.source.hash;
        creationFee = "4000000000000";  // 4 INW
        txRate = 500;                   // 500 INW
        adminAddress = defaultSigner.address;
        
        // "refTime: 2344630275" "proofSize: 34881"
        let lpgGasLimit = setGasLimit(api, 4_600_000_000, 68_000);
        
        const lpgContractFactory = new ConstructorsLaunchpadGenerator(api, defaultSigner);
        lpgContractAddress = (
            await lpgContractFactory.new(
                launchpadHash,
                inwContractAddress,
                creationFee,
                txRate,
                adminAddress,
                {gasLimit: lpgGasLimit}
            )
        ).address;
        // console.log({lpgContractAddress: lpgContractAddress});
        lpgContract = new ContractLaunchpadGenerator(lpgContractAddress, defaultSigner, api);
        lpgQuery = lpgContract.query;
        lpgTx = lpgContract.tx;
    }

    before(async () => {
        await setup();
    });

    it('Can create launchpad', async () => {      
        /// TODO: B. Create launchpad
        // Step B1: Onwer mints creation fee in INW to Alice
        console.log(`===========Step B1=============`);
        await inwContract.tx.mint(alice.address, creationFee);
        let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        expect(aliceBalance).to.equal(creationFee);

        // Step B2: Alice approves creationFee in INW for launchpad generator contract
        console.log(`===========Step B2=============`);
        await inwContract.withSigner(alice).tx.approve(lpgContractAddress, creationFee);

        // Step B3: Alice approves total supply of token and create a launchpad
        console.log(`===========Step B3=============`);    
        let totalSupply = "700000000000000000"; // 700k
        await tokenContract.withSigner(alice).tx.approve(lpgContractAddress, totalSupply);
        
        // Step B4: Alice creates launchpad for token LNPD
        console.log(`===========Step B4=============`);
        projectInfoUri = "Launchpad test"; // 1000 token AAA
        phaseName = ["Phase 1", "Phase 2"];
        startTime = new Date().getTime() + 20000; // now + 20s
        phaseStartTime = [startTime, startTime + 4 * 86400000]; // 86400000 ~ 1 day
        phaseEndTime = [startTime + 3 * 86400000, startTime + 5 * 86400000];
        phaseImmediateReleaseRate = [500, 1500]; // 5%; 15%
        phaseVestingDuration = [1800000, 1800000]; 
        phaseVestingUnit = [300000, 300000];
        phaseIsPublic = [true, true];
        phasePublicAmount = ["100000000000000000", "500000000000000000"]; // 100k - 500k
        phasePublicPrice = ["500000000000", "1000000000000"]; // 0.5 - 1A
        const txNewLaunchpad = await lpgContract.withSigner(alice).tx.newLaunchpad(
            projectInfoUri,
            tokenContractAddress,
            totalSupply,
            phaseName,
            phaseStartTime,
            phaseEndTime,
            phaseImmediateReleaseRate,
            phaseVestingDuration,
            phaseVestingUnit,
            phaseIsPublic,
            phasePublicAmount,
            phasePublicPrice
        );
        // console.log({txNewLaunchpad: txNewLaunchpad});

        // Step B5: Check launchpad count
        console.log(`===========Step B5=============`);
        let launchpadCount = (await lpgQuery.getLaunchpadCount()).value.ok;
        expect(launchpadCount).to.equal(1);
        lpContractAddress = (await lpgQuery.getLaunchpadById(1)).value.ok;
        // console.log({lpContractAddress: lpContractAddress});

        // Step B6: Get contract and active launchpad
        lpContract = new ContractMyLaunchpad(lpContractAddress, alice, api);
        lpQuery = lpContract.query;
        lpTx = lpContract.tx;
        
        let isActiveLaunchpad = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(isActiveLaunchpad).to.equal(false);

        await lpgTx.setIsActiveLaunchpad(lpContractAddress, true);
        isActiveLaunchpad = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(isActiveLaunchpad).to.equal(true);
    })

    it('Can change launchpad total supply', async () => {      
        let currentTotalSupply = (await lpQuery.getTotalSupply()).value.ok;
        // console.log({currentTotalSupply: currentTotalSupply.toString()});
        
        // Case 1: newTotalSupply is 500k -> will fail because public sale uses 600k 
        console.log(`===========Change total supply - Case 1=============`);
        let newTotalSupply = "500000000000000000"; 
        try {
            await lpContract.tx.setTotalSupply(newTotalSupply);    
        } catch (error: any) {

        }         
        
        let receivedTotalSupply = (await lpQuery.getTotalSupply()).value.ok;
        // console.log({receivedTotalSupply: receivedTotalSupply.toString()});
        expect(receivedTotalSupply.toString()).to.equal(currentTotalSupply.toString());

        // Case 2: newTotalSupply is 650k < the current supply 700k, don't need to approve      
        console.log(`===========Change total supply - Case 2=============`);
        newTotalSupply = "650000000000000000"; 
        await lpContract.tx.setTotalSupply(newTotalSupply); 
        
        receivedTotalSupply = (await lpQuery.getTotalSupply()).value.ok;
        // console.log({receivedTotalSupply: receivedTotalSupply.toString()});
        expect(receivedTotalSupply.toString()).to.equal(newTotalSupply);

        // Case 3: newTotalSupply is 700k > the current supply 650k, need to approve token to lp
        console.log(`===========Change total supply - Case 3=============`);
        newTotalSupply = "700000000000000000";    
        
        await tokenContract.withSigner(alice).tx.approve(lpContractAddress, new BN(newTotalSupply).sub(new BN(receivedTotalSupply.toString())));
        
        await lpContract.tx.setTotalSupply(newTotalSupply); 
        
        receivedTotalSupply = (await lpQuery.getTotalSupply()).value.ok;
        // console.log({receivedTotalSupply: receivedTotalSupply.toString()});
        expect(receivedTotalSupply.toString()).to.equal(newTotalSupply);
    
    })

    it('Can change immediate release rate', async () => {      
        // Case 1: Set > 10000 -> failed
        console.log(`===========Change immediate release rate - Case 1=============`);
        let newImmediateReleaseRate = 10001;
        let phaseId = 0;
        try {
            await lpContract.tx.setImmediateReleaseRate(phaseId, newImmediateReleaseRate);    
        } catch (error: any) {

        }         

        let receivedImmediateReleaseRate = (await lpQuery.getImmediateReleaseRate(phaseId)).value.ok;
        // console.log({receivedImmediateReleaseRate: receivedImmediateReleaseRate});
        expect(receivedImmediateReleaseRate).to.lt(newImmediateReleaseRate);

        // Case 2: Phase 1 set 800 -> success
        console.log(`===========Change immediate release rate - Case 2=============`);
        newImmediateReleaseRate = 800;
        phaseId = 1;

        await lpContract.tx.setImmediateReleaseRate(phaseId, newImmediateReleaseRate);    
     
        receivedImmediateReleaseRate = (await lpQuery.getImmediateReleaseRate(phaseId)).value.ok;
        // console.log({receivedImmediateReleaseRate: receivedImmediateReleaseRate});
        expect(receivedImmediateReleaseRate).to.equal(newImmediateReleaseRate);

        // Case 3: Phase 1 set back to origin -> success
        // phaseId = 1;
        // newImmediateReleaseRate = phaseImmediateReleaseRate[phaseId];        

        // await lpContract.tx.setImmediateReleaseRate(phaseId, newImmediateReleaseRate);    
     
        // receivedImmediateReleaseRate = (await lpQuery.getImmediateReleaseRate(phaseId)).value.ok;
        // console.log({receivedImmediateReleaseRate: receivedImmediateReleaseRate});
        // expect(receivedImmediateReleaseRate).to.equal(newImmediateReleaseRate);        
    })

    it('Can change public total amount', async () => {
        // Case 1: set publicAmount "300000000000000000" -> fail > avail amount
        console.log(`===========Change public total amount - Case 1=============`);
        let publicAmount = "300000000000000000";
        let phaseId = 0;
        
        let publicSaleTotalAmount = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;

        try {
            await lpContract.tx.setPublicTotalAmount(phaseId, publicAmount);    
        } catch (error) {
            
        }

        let receivedPublicSaleTotalAmount = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;
        expect(receivedPublicSaleTotalAmount).to.equal(publicSaleTotalAmount.toString());
        
        // Case 2: set publicAmount "200000000000000000" -> success increasement = avail amount
        console.log(`===========Change public total amount - Case 2=============`);
        publicAmount = "200000000000000000";
        await lpContract.tx.setPublicTotalAmount(phaseId, publicAmount);    
  
        let receivedPublicSaleTotalAmountHex = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;
        receivedPublicSaleTotalAmount = (new BN(receivedPublicSaleTotalAmountHex.substring(2), 16)).toString(10);
       
        // console.log({receivedPublicSaleTotalAmount: receivedPublicSaleTotalAmount});
        expect(receivedPublicSaleTotalAmount.toString()).to.equal(publicAmount);
        
        // Case 3: back to original publicAmount "100000000000000000" -> 
        console.log(`===========Change public total amount - Case 3=============`);
        publicAmount = "100000000000000000";
        await lpContract.tx.setPublicTotalAmount(phaseId, publicAmount);    
  
        receivedPublicSaleTotalAmountHex = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;
        receivedPublicSaleTotalAmount = (new BN(receivedPublicSaleTotalAmountHex.substring(2), 16)).toString(10);
       
        // console.log({receivedPublicSaleTotalAmount: receivedPublicSaleTotalAmount});
        expect(receivedPublicSaleTotalAmount.toString()).to.equal(publicAmount);
    })

    it('Can set public', async () => {
        // Case 1: Phase is set not active, cannot set public -> still the same: public is true 
        console.log(`===========Set public - Case 1=============`);
        let phaseId = 0;
        let isActive = false;        
        await lpContract.tx.setIsActive(phaseId, isActive);

        let receivedIsActive = (await lpQuery.getIsActive(phaseId)).value.ok;
        // console.log({receivedIsActive: receivedIsActive});

        let isPublic = false;  
        try {
            await lpContract.tx.setIsPublic(phaseId, isPublic);    
        } catch (error) {
            
        }

        let receivedPublicSaleInfo = (await lpQuery.getPublicSaleInfo(phaseId)).value.ok;
        // console.log({receivedPublicSaleInfo: receivedPublicSaleInfo});
        expect(receivedPublicSaleInfo.isPublic).to.equal(true);

        // Case 2: Phase is set active, can set public to false
        console.log(`===========Set public - Case 2=============`);   
        isActive = true;        
        await lpContract.tx.setIsActive(phaseId, isActive);

        receivedIsActive = (await lpQuery.getIsActive(phaseId)).value.ok;
        // console.log({receivedIsActive: receivedIsActive});

        isPublic = false;  
        await lpContract.tx.setIsPublic(phaseId, isPublic);    
 
        receivedPublicSaleInfo = (await lpQuery.getPublicSaleInfo(phaseId)).value.ok;
        // console.log({receivedPublicSaleInfo: receivedPublicSaleInfo});
        expect(receivedPublicSaleInfo.isPublic).to.equal(false);

        // Case 3: Phase is active, set back public to original (true)
        console.log(`===========Set public - Case 3=============`);
        isPublic = true;  
        await lpContract.tx.setIsPublic(phaseId, isPublic);    
 
        receivedPublicSaleInfo = (await lpQuery.getPublicSaleInfo(phaseId)).value.ok;
        // console.log({receivedPublicSaleInfo: receivedPublicSaleInfo});
        expect(receivedPublicSaleInfo.isPublic).to.equal(true);
    })

    it('Can set phase', async () => {
        // Case 1: Set phase 0 to new phase data
        console.log(`===========Set phase - Case 1=============`);
        let phaseId = 0;
        let newIsActive = true;
        let newPhaseName = "New phase 1";
        let newStartTime = new Date().getTime() + 20000; // now + 20s
        let newPhaseStartTime = newStartTime; 
        let newPhaseEndTime = newStartTime + 3 * 86400000;
        let newPhaseImmediateReleaseRate = 600;
        let newPhaseVestingDuration = 2400000; 
        let newPhaseVestingUnit = 600000;
        let newPhaseIsPublic = false;
        let newPhasePublicAmount = "200000000000000000"; // 200k - avail amount = 100k = public amount increasement from 100k to 200k
        let newPhasePublicPrice = "500000000000"; // 0.5 - 1A
        
        await lpContract.tx.setPhase(
            phaseId,
            newIsActive,
            newPhaseName,
            newPhaseStartTime,
            newPhaseEndTime,
            newPhaseImmediateReleaseRate,
            newPhaseVestingDuration,
            newPhaseVestingUnit,
            newPhaseIsPublic,
            newPhasePublicAmount,
            newPhasePublicPrice
        );  
        
        let receivedPublicInfo = (await lpQuery.getPhase(phaseId)).value.ok;
        // console.log({receivedPublicInfo: receivedPublicInfo});
        expect(receivedPublicInfo.isActive).to.equal(true);

        // Case 2: Set back to origin
        console.log(`===========Set phase - Case 2=============`);
        await lpContract.tx.setPhase(
            phaseId,
            newIsActive,
            phaseName[phaseId],
            phaseStartTime[phaseId],
            phaseEndTime[phaseId],
            phaseImmediateReleaseRate[phaseId],
            phaseVestingDuration[phaseId],
            phaseVestingUnit[phaseId],
            phaseIsPublic[phaseId],
            phasePublicAmount[phaseId],
            phasePublicPrice[phaseId]
        );

        receivedPublicInfo = (await lpQuery.getPhase(phaseId)).value.ok;
        // console.log({receivedPublicInfo: receivedPublicInfo});
        expect(receivedPublicInfo.endTime).to.equal(phaseEndTime[phaseId]);
    })

    it('Can set multi phases', async () => {
        let availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        console.log({availableTokenAmount: availableTokenAmount.toString()});

        // Case 1: Set new data for 2 phases
        console.log(`===========Set multi phases - Case 1=============`);
        let phaseId = [0, 1];
        let newIsActive = [true, true];
        let newPhaseName = ["New phase 1", "New phase 2"];
        let newStartTime = new Date().getTime() + 20000; // now + 20s
        let newPhaseStartTime = [newStartTime, newStartTime + 4 * 86400000]; // 86400000 ~ 1 day 
        let newPhaseEndTime = [newStartTime + 3 * 86400000, newStartTime + 5 * 86400000];
        let newPhaseImmediateReleaseRate = [600, 1600];
        let newPhaseVestingDuration = [2400000, 2400000]; 
        let newPhaseVestingUnit = [600000, 600000];
        let newPhaseIsPublic = [true, true];
        let newPhasePublicAmount = ["150000000000000000", "550000000000000000"]; // equal balance of Alice
        let newPhasePublicPrice = ["600000000000", "1200000000000"]; // 0.6 - 1.2A
        
        await lpContract.tx.setMultiPhases(
            phaseId,
            newIsActive,
            newPhaseName,
            newPhaseStartTime,
            newPhaseEndTime,
            newPhaseImmediateReleaseRate,
            newPhaseVestingDuration,
            newPhaseVestingUnit,
            newPhaseIsPublic,
            newPhasePublicAmount,
            newPhasePublicPrice
        );  

        let receivedPublicInfoPhase0 = (await lpQuery.getPhase(0)).value.ok;
        // console.log({receivedPublicInfoPhase0: receivedPublicInfoPhase0});
        expect(receivedPublicInfoPhase0.endTime).to.equal(newPhaseEndTime[0]);

        let receivedPublicInfoPhase1 = (await lpQuery.getPhase(1)).value.ok;
        // console.log({receivedPublicInfoPhase1: receivedPublicInfoPhase1});
        expect(receivedPublicInfoPhase1.endTime).to.equal(newPhaseEndTime[1]);
    
        availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        console.log({availableTokenAmount: availableTokenAmount.toString()});
        // Case 2: Set new data but total newPhasePublicAmount is > Alice balance -> Fail
        console.log(`===========Set multi phases - Case 2=============`);
        phaseId = [0, 1];
        newIsActive = [true, true];
        newPhaseName = ["New phase 1", "New phase 2"];
        newStartTime = new Date().getTime() + 20000; // now + 20s
        newPhaseStartTime = [newStartTime, newStartTime + 4 * 86400000]; // 86400000 ~ 1 day 
        newPhaseEndTime = [newStartTime + 3 * 86400000, newStartTime + 5 * 86400000];
        newPhaseImmediateReleaseRate = [600, 1600];
        newPhaseVestingDuration = [2400000, 2400000]; 
        newPhaseVestingUnit = [600000, 600000];
        newPhaseIsPublic = [true, true];
        let newPhasePublicAmount1 = ["160000000000000000", "600000000000000000"]; // Over balance of Alice
        newPhasePublicPrice = ["600000000000", "1200000000000"]; // 0.6 - 1.2A
        
        try {
            await lpContract.tx.setMultiPhases(
                phaseId,
                newIsActive,
                newPhaseName,
                newPhaseStartTime,
                newPhaseEndTime,
                newPhaseImmediateReleaseRate,
                newPhaseVestingDuration,
                newPhaseVestingUnit,
                newPhaseIsPublic,
                newPhasePublicAmount1,
                newPhasePublicPrice
            );    
        } catch (error) {
            
        }        

        let receivedPublicSaleTotalAmountHex0 = (await lpQuery.getPublicSaleTotalAmount(0)).value.ok;
        let receivedPublicSaleTotalAmount0 = (new BN(receivedPublicSaleTotalAmountHex0.substring(2), 16)).toString(10);
        // console.log({receivedPublicSaleTotalAmount0: receivedPublicSaleTotalAmount0});
        expect(receivedPublicSaleTotalAmount0).to.equal(newPhasePublicAmount[0]);

        let receivedPublicSaleTotalAmountHex1 = (await lpQuery.getPublicSaleTotalAmount(1)).value.ok;
        let receivedPublicSaleTotalAmount1 = (new BN(receivedPublicSaleTotalAmountHex1.substring(2), 16)).toString(10);
        // console.log({receivedPublicSaleTotalAmount1: receivedPublicSaleTotalAmount1});
        expect(receivedPublicSaleTotalAmount1).to.equal(newPhasePublicAmount[1]);

        availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        console.log({availableTokenAmount: availableTokenAmount.toString()});
        // Case 3: Phase 1 set not public Phase 2 inactive total newPhasePublicAmount is > Alice balance -> success
        console.log(`===========Set multi phases - Case 3=============`);
        phaseId = [0, 1];
        newIsActive = [true, false];
        newPhaseName = ["New phase 1", "New phase 2"];
        newStartTime = new Date().getTime() + 20000; // now + 20s
        newPhaseStartTime = [newStartTime, newStartTime + 4 * 86400000]; // 86400000 ~ 1 day 
        newPhaseEndTime = [newStartTime + 3 * 86400000, newStartTime + 5 * 86400000];
        newPhaseImmediateReleaseRate = [600, 1600];
        newPhaseVestingDuration = [2400000, 2400000]; 
        newPhaseVestingUnit = [600000, 600000];
        newPhaseIsPublic = [false, true];
        newPhasePublicAmount1 = ["160000000000000000", "600000000000000000"]; // Over balance of Alice
        newPhasePublicPrice = ["600000000000", "1200000000000"]; // 0.6 - 1.2A
       
        await lpContract.tx.setMultiPhases(
            phaseId,
            newIsActive,
            newPhaseName,
            newPhaseStartTime,
            newPhaseEndTime,
            newPhaseImmediateReleaseRate,
            newPhaseVestingDuration,
            newPhaseVestingUnit,
            newPhaseIsPublic,
            newPhasePublicAmount1,
            newPhasePublicPrice
        );  

        receivedPublicSaleTotalAmountHex0 = (await lpQuery.getPublicSaleTotalAmount(0)).value.ok;
        receivedPublicSaleTotalAmount0 = (new BN(receivedPublicSaleTotalAmountHex0.substring(2), 16)).toString(10);
        // console.log({receivedPublicSaleTotalAmount0: receivedPublicSaleTotalAmount0});
        expect(receivedPublicSaleTotalAmount0).to.equal(newPhasePublicAmount[0]);

        receivedPublicSaleTotalAmountHex1 = (await lpQuery.getPublicSaleTotalAmount(1)).value.ok;
        receivedPublicSaleTotalAmount1 = (new BN(receivedPublicSaleTotalAmountHex1.substring(2), 16)).toString(10);
        // console.log({receivedPublicSaleTotalAmount1: receivedPublicSaleTotalAmount1});
        expect(receivedPublicSaleTotalAmount1).to.equal(newPhasePublicAmount[1]);
        
        // availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        // console.log({availableTokenAmount: availableTokenAmount.toString()});
        
        // let tokenBalance = (await tokenQuery.balanceOf(lpContractAddress)).value.ok;
        // console.log({tokenBalance: tokenBalance.toString()});
        
        // Case 4: Set back to origin but with new phase start end time
        console.log(`===========Set multi phases - Case 4=============`);
        try {
            newStartTime = new Date().getTime() + 5000; // now + 5000s
            newPhaseStartTime = [newStartTime, newStartTime + 4 * 86400000]; // 86400000 ~ 1 day 
            newPhaseEndTime = [newStartTime + 3 * 86400000, newStartTime + 5 * 86400000];
  
            await lpContract.tx.setMultiPhases(
                [0, 1],
                [true, true],
                phaseName,
                newPhaseStartTime,
                newPhaseEndTime,
                phaseImmediateReleaseRate,
                phaseVestingDuration,
                phaseVestingUnit,
                phaseIsPublic,
                phasePublicAmount,
                phasePublicPrice
            );    
        } catch (error) {
            console.log("error", error);
        }
          
        receivedPublicInfoPhase0 = (await lpQuery.getPhase(0)).value.ok;
        // console.log({receivedPublicInfoPhase0: receivedPublicInfoPhase0});
        expect(receivedPublicInfoPhase0.endTime).to.equal(newPhaseEndTime[0]);

        receivedPublicInfoPhase1 = (await lpQuery.getPhase(1)).value.ok;
        // console.log({receivedPublicInfoPhase1: receivedPublicInfoPhase1});
        expect(receivedPublicInfoPhase1.endTime).to.equal(newPhaseEndTime[1]);         
    })

    it('Can set vesting duration', async () => {
        // Wait to the phase 0 starting time       
        let phaseId = 0;

        let currentTime = new Date().getTime();
        let receivedPublicInfoPhase0 = (await lpQuery.getPhase(phaseId)).value.ok;
        // console.log({receivedPublicInfoPhase0StartTime: receivedPublicInfoPhase0.startTime});       

        if (receivedPublicInfoPhase0.startTime > currentTime) { 
            await delay(receivedPublicInfoPhase0.startTime - currentTime + 2000); // Delay + 2s
            console.log({delayTime: receivedPublicInfoPhase0.startTime - currentTime + 2000});    
        }

        // Case 1: Set new vesting duration for phase 0
        let newPhaseVestingDuration = 1200000;
        await lpContract.tx.setVestingDuration(phaseId, newPhaseVestingDuration);

        let receivedVestingDuration = (await lpQuery.getVestingDuration(phaseId)).value.ok;
        // console.log({receivedVestingDuration: receivedVestingDuration});     
        expect(receivedVestingDuration).to.equal(newPhaseVestingDuration);

        // Case 2: Set back to origin
        newPhaseVestingDuration = phaseVestingDuration[phaseId];
        await lpContract.tx.setVestingDuration(phaseId, newPhaseVestingDuration);

        receivedVestingDuration = (await lpQuery.getVestingDuration(phaseId)).value.ok;
        // console.log({receivedVestingDuration: receivedVestingDuration});     
        expect(receivedVestingDuration).to.equal(newPhaseVestingDuration);
    })

    it('Can set vesting unit', async () => {
        let phaseId = 1;

        // Case 1: Set to 0 -> fail
        let newPhaseVestingUnit = 0;

        try {
            await lpContract.tx.setVestingUnit(phaseId, newPhaseVestingUnit);    
        } catch (error) {
            
        }
        
        let receivedVestingUnit = (await lpQuery.getVestingUnit(phaseId)).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedVestingUnit).to.gt(newPhaseVestingUnit);

        // Case 2: Set to > 0 -> sucess
        newPhaseVestingUnit = 100000;        
        await lpContract.tx.setVestingUnit(phaseId, newPhaseVestingUnit);
        receivedVestingUnit = (await lpQuery.getVestingUnit(phaseId)).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedVestingUnit).to.equal(newPhaseVestingUnit);

        // Case 3: Set back to origin
        newPhaseVestingUnit = phaseVestingUnit[phaseId];
        await lpContract.tx.setVestingUnit(phaseId, newPhaseVestingUnit);       
        receivedVestingUnit = (await lpQuery.getVestingUnit(phaseId)).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedVestingUnit).to.equal(newPhaseVestingUnit);
    }) 

    it('Can set transaction rate ', async () => {
        let currentReceivedTxRate = (await lpQuery.getTxRate()).value.ok;
        
        // Case 1: Set to new tx rate 
        let newTxRate = 200; // 2%
        await lpContract.tx.setTxRate(newTxRate);  

        let receivedTxRate = (await lpQuery.getTxRate()).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedTxRate).to.equal(newTxRate);

        // Case 2: Set back to origin
        newTxRate = currentReceivedTxRate; 
        await lpContract.tx.setTxRate(newTxRate);  

        receivedTxRate = (await lpQuery.getTxRate()).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedTxRate).to.equal(newTxRate);
    })

    it('Can set start and end time', async () => {
        let phaseId = 0;

        let currentTime = new Date().getTime();  
        let currentPublicInfoPhase0 = (await lpQuery.getPhase(phaseId)).value.ok;
        let currentPublicInfoPhase1 = (await lpQuery.getPhase(phaseId)).value.ok;
        console.log({startTime: currentPublicInfoPhase0.startTime, endTime: currentPublicInfoPhase0.endTime, currentTime: currentTime}); 
  
        // Case 1: Set new start_time > current start time -> failed
        let newPhaseStartTime = currentTime + 2000; // Current time + 2s
        let newPhaseEndTime = currentPublicInfoPhase0.endTime;

        try {
            await lpContract.tx.setStartAndEndTime(phaseId, newPhaseStartTime, newPhaseEndTime);    
        } catch (error) {
            // console.log(error);
        }
        
        let receivedPublicInfoPhase0 = (await lpQuery.getPhase(phaseId)).value.ok;
        // console.log({startTime: receivedPublicInfoPhase0.startTime, endTime: receivedPublicInfoPhase0.endTime}); 
        
        expect(receivedPublicInfoPhase0.startTime).to.equal(currentPublicInfoPhase0.startTime);       
        expect(receivedPublicInfoPhase0.endTime).to.equal(currentPublicInfoPhase0.endTime);

        // Case 2: Set phase 1 overlap with phase 2 -> failed
        newPhaseStartTime = currentPublicInfoPhase0.startTime;
        newPhaseEndTime = currentPublicInfoPhase1.startTime + 2000; // 2s

        try {
            await lpContract.tx.setStartAndEndTime(phaseId, newPhaseStartTime, newPhaseEndTime);    
        } catch (error) {
            // console.log(error);
        }
        
        receivedPublicInfoPhase0 = (await lpQuery.getPhase(phaseId)).value.ok;
        // console.log({startTime: receivedPublicInfoPhase0.startTime, endTime: receivedPublicInfoPhase0.endTime}); 
        
        expect(receivedPublicInfoPhase0.startTime).to.equal(currentPublicInfoPhase0.startTime);       
        expect(receivedPublicInfoPhase0.endTime).to.equal(currentPublicInfoPhase0.endTime);         
      
        // Case 3: Set a new data for phase -> success 
        newPhaseStartTime = currentPublicInfoPhase0.startTime; //
        newPhaseEndTime = currentPublicInfoPhase0.endTime + 2000; // +2s

        try {
            await lpContract.tx.setStartAndEndTime(phaseId, newPhaseStartTime, newPhaseEndTime);    
        } catch (error) {
            console.log(error);
        }
        
        receivedPublicInfoPhase0 = (await lpQuery.getPhase(phaseId)).value.ok;
        console.log({startTime: receivedPublicInfoPhase0.startTime, endTime: receivedPublicInfoPhase0.endTime}); 
        
        expect(receivedPublicInfoPhase0.startTime).to.equal(newPhaseStartTime);       
        expect(receivedPublicInfoPhase0.endTime).to.equal(newPhaseEndTime);
        
        // Case 4: Set back to origin
        newPhaseStartTime = currentPublicInfoPhase0.startTime;
        newPhaseEndTime = currentPublicInfoPhase0.endTime;

        try {
            await lpContract.tx.setStartAndEndTime(phaseId, newPhaseStartTime, newPhaseEndTime);    
        } catch (error) {
            console.log(error);
        }
        
        receivedPublicInfoPhase0 = (await lpQuery.getPhase(phaseId)).value.ok;
        console.log({startTime: receivedPublicInfoPhase0.startTime, endTime: receivedPublicInfoPhase0.endTime}); 
        
        expect(receivedPublicInfoPhase0.startTime).to.equal(newPhaseStartTime);       
        expect(receivedPublicInfoPhase0.endTime).to.equal(newPhaseEndTime);
    })

    it('Can set active', async () => {
        // Case 1: Set phase 1 inactive
        let phaseId = 0;
        let newIsActive = false;

        let currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        let currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        let currentAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);
    
        let currentPublicSaleTotalAmountHex0 = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;
        let currentPublicSaleTotalAmount0 = Number(new BN(currentPublicSaleTotalAmountHex0.substring(2), 16));
        
        console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime, currentAvailableTokenAmount: currentAvailableTokenAmount, currentPublicSaleTotalAmount0: currentPublicSaleTotalAmount0}); 

        let currentPublicInfoPhase1 = (await lpQuery.getPhase(1)).value.ok;
        console.log({currentPublicInfoPhase1StartTime: currentPublicInfoPhase1.startTime, currentPublicInfoPhase1EndTime: currentPublicInfoPhase1.endTime}); 
                
        await lpContract.tx.setIsActive(phaseId, newIsActive);
        
        let receivedProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        let receivedProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        let receivedAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok); 

        console.log({receivedProjectStartTime: receivedProjectStartTime, receivedProjectEndTime: receivedProjectEndTime, receivedAvailableTokenAmount: receivedAvailableTokenAmount}); 
    
        // expect(receivedProjectStartTime).to.equal(currentPublicInfoPhase1.startTime);
        // expect(receivedProjectEndTime).to.equal(currentPublicInfoPhase1.endTime);
        // expect(receivedAvailableTokenAmount).to.equal(currentAvailableTokenAmount + currentPublicSaleTotalAmount0);
    })

    after(async () => {
    });
})