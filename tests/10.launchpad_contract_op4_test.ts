import { showAZBalance, checkAccountsBalance, delay, expect, getSigners, provider, setGasLimit } from "./helpers";
import { ApiPromise } from "@polkadot/api";

import { BN } from '@polkadot/util';

import ConstructorsInw from "./typed_contracts/constructors/psp22_standard";
import ContractInw from "./typed_contracts/contracts/psp22_standard";

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
import { PhaseInput } from "./typed_contracts/types-arguments/launchpad_generator_op4";

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

    let phases: any; 

    let projectInfoUri;
    let startTime: any;    

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
                { gasLimit: inwGasLimit }
            )
        ).address;
        inwContract = new ContractInw(inwContractAddress, defaultSigner, api);
        inwQuery = inwContract.query;
        inwTx = inwContract.tx;

        console.log({ inwContractAddress: inwContractAddress })

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
                { gasLimit: tokenGasLimit }
            )
        ).address;
        tokenContract = new ContractTokenStandard(tokenContractAddress, alice, api);
        tokenQuery = tokenContract.query;
        tokenTx = tokenContract.tx;

        console.log({ tokenContractAddress: tokenContractAddress })

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
                { gasLimit: lpgGasLimit }
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
        startTime = new Date().getTime() + 70000; // now + 20s
       
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
        
        phases = [phase1, phase2];

        const txNewLaunchpad = await lpgContract.withSigner(alice).tx.newLaunchpad(
            projectInfoUri,
            tokenContractAddress,
            totalSupply,
            phases
        );
        // console.log({txNewLaunchpad: txNewLaunchpad});

        // Step B5: Check launchpad count
        console.log(`===========Step B5=============`);
        let launchpadCount = (await lpgQuery.getLaunchpadCount()).value.ok;
        expect(launchpadCount).to.equal(1);
        lpContractAddress = (await lpgQuery.getLaunchpadById(1)).value.ok;
        console.log({ lpContractAddress: lpContractAddress });

        // Step B6: Get contract and active launchpad
        lpContract = new ContractMyLaunchpad(lpContractAddress, alice, api);
        lpQuery = lpContract.query;
        lpTx = lpContract.tx;

        let isActiveLaunchpad = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(isActiveLaunchpad).to.equal(false);

        await lpgTx.setIsActiveLaunchpad(lpContractAddress, true);
        isActiveLaunchpad = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(isActiveLaunchpad).to.equal(true);

        let receivedPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;
        let receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;

        let currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        let currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;
        console.log({ currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime });

        console.log({ startTime: receivedPhaseInfo0.startTime, endTime: receivedPhaseInfo0.endTime });
        console.log({ startTimeP1: receivedPhaseInfo1.startTime, endTimeP1: receivedPhaseInfo1.endTime });
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
        // let newPhaseName = "New phase 1";
        // let newStartTime = new Date().getTime() + 20000; // now + 20s
        // let newPhaseStartTime = newStartTime;
        // let newPhaseEndTime = newStartTime + 3 * 86400000;
        // let newPhaseImmediateReleaseRate = 600;
        // let newPhaseVestingDuration = 2400000;
        // let newPhaseVestingUnit = 600000;
        // let newPhaseIsPublic = false;
        // let newPhasePublicAmount = "200000000000000000"; // 200k - avail amount = 100k = public amount increasement from 100k to 200k
        // let newPhasePublicPrice = "500000000000"; // 0.5 - 1A

        let newPhase: PhaseInput = {
            name: "New phase 1",
            startTime: new Date().getTime() + 20000, // now + 20s
            endTime: startTime + 3 * 86400000,
            immediateReleaseRate: 600,
            vestingDuration: 2400000, 
            vestingUnit: 600000,
            isPublic: false,
            publicAmount: "200000000000000000", // 200k - avail amount = 100k = public amount increasement from 100k to 200k
            publicPrice: "500000000000" // 0.5A 
        };

        await lpContract.tx.setPhase(
            phaseId,
            newIsActive,
            newPhase
        );

        let receivedPublicInfo = (await lpQuery.getPhase(phaseId)).value.ok;
        // console.log({receivedPublicInfo: receivedPublicInfo});
        expect(receivedPublicInfo.isActive).to.equal(true);

        let receivedPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;
        let receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;

        let currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        let currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime});

        console.log({startTime: receivedPhaseInfo0.startTime, endTime: receivedPhaseInfo0.endTime}); 
        console.log({startTimeP1: receivedPhaseInfo1.startTime, endTimeP1: receivedPhaseInfo1.endTime});

        // Case 2: Set back to origin
        console.log(`===========Set phase - Case 2=============`);        
        await lpContract.tx.setPhase(
            phaseId,
            newIsActive,
            phases[phaseId]
        );

        receivedPublicInfo = (await lpQuery.getPhase(phaseId)).value.ok;
        // console.log({receivedPublicInfo: receivedPublicInfo});
        expect(receivedPublicInfo.endTime).to.equal(phases[phaseId].endTime);

        // receivedPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;
        // receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;

        // currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime});

        // console.log({startTime: receivedPhaseInfo0.startTime, endTime: receivedPhaseInfo0.endTime}); 
        // console.log({startTimeP1: receivedPhaseInfo1.startTime, endTimeP1: receivedPhaseInfo1.endTime});
    })

    it('Can set multi phases', async () => {
        let availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        console.log({ availableTokenAmount: availableTokenAmount.toString() });

        // Case 1: Set new data for 2 phases
        console.log(`===========Set multi phases - Case 1=============`);
        let phaseId = [0, 1];
        let newIsActive = [true, true];
        let newStartTime = new Date().getTime() + 20000; // now + 20s
        
        let phase1: PhaseInput = {
            name: "New phase 1",
            startTime: newStartTime,
            endTime: newStartTime + 3 * 86400000,
            immediateReleaseRate: 600,
            vestingDuration: 2400000, 
            vestingUnit: 600000,
            isPublic: true,
            publicAmount: "150000000000000000",
            publicPrice: "600000000000" // 0.6A
        };

        let phase2: PhaseInput = {
            name: "New phase 2",
            startTime: newStartTime + 4 * 86400000,
            endTime: newStartTime + 5 * 86400000,
            immediateReleaseRate: 1600,
            vestingDuration: 2400000, 
            vestingUnit: 600000,
            isPublic: true,
            publicAmount: "550000000000000000",
            publicPrice: "1200000000000" // 1.2A
        };
        
        let newPhases = [phase1, phase2];

        await lpContract.tx.setMultiPhases(
            phaseId,
            newIsActive,
            newPhases
        );

        let receivedPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;
        // console.log({receivedPhaseInfo0: receivedPhaseInfo0});
        expect(receivedPhaseInfo0.endTime).to.equal(newPhases[0].endTime);

        let receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;
        // console.log({receivedPhaseInfo1: receivedPhaseInfo1});
        expect(receivedPhaseInfo1.endTime).to.equal(newPhases[1].endTime);

        availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        console.log({ availableTokenAmount: availableTokenAmount.toString() });
        // Case 2: Set new data but total newPhasePublicAmount is > Alice balance -> Fail
        console.log(`===========Set multi phases - Case 2=============`);
        phaseId = [0, 1];
        newIsActive = [true, true];
        newStartTime = new Date().getTime() + 20000; // now + 20s

        let currentPhasePublicAmount = [newPhases[0].publicAmount, newPhases[1].publicAmount]; // Over balance of Alice
        
        phase1 = {
            name: "New phase 1",
            startTime: newStartTime,
            endTime: newStartTime + 3 * 86400000,
            immediateReleaseRate: 600,
            vestingDuration: 2400000, 
            vestingUnit: 600000,
            isPublic: true,
            publicAmount: "160000000000000000",
            publicPrice: "600000000000" // 0.6A
        };

        phase2 = {
            name: "New phase 2",
            startTime: newStartTime + 4 * 86400000,
            endTime: newStartTime + 5 * 86400000,
            immediateReleaseRate: 1600,
            vestingDuration: 2400000, 
            vestingUnit: 600000,
            isPublic: true,
            publicAmount: "600000000000000000",
            publicPrice: "1200000000000" // 1.2A
        };
        
        newPhases = [phase1, phase2];           

        try {
            await lpContract.tx.setMultiPhases(
                phaseId,
                newIsActive,
                newPhases
            );
        } catch (error) {
        }

        let receivedPublicSaleTotalAmountHex0 = (await lpQuery.getPublicSaleTotalAmount(0)).value.ok;
        let receivedPublicSaleTotalAmount0 = (new BN(receivedPublicSaleTotalAmountHex0.substring(2), 16)).toString(10);
        // console.log({receivedPublicSaleTotalAmount0: receivedPublicSaleTotalAmount0});
        expect(receivedPublicSaleTotalAmount0).to.equal(currentPhasePublicAmount[0]);

        let receivedPublicSaleTotalAmountHex1 = (await lpQuery.getPublicSaleTotalAmount(1)).value.ok;
        let receivedPublicSaleTotalAmount1 = (new BN(receivedPublicSaleTotalAmountHex1.substring(2), 16)).toString(10);
        // console.log({receivedPublicSaleTotalAmount1: receivedPublicSaleTotalAmount1});
        expect(receivedPublicSaleTotalAmount1).to.equal(currentPhasePublicAmount[1]);

        availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        console.log({ availableTokenAmount: availableTokenAmount.toString() });
        // Case 3: Phase 1 set not public Phase 2 inactive total newPhasePublicAmount is > Alice balance -> success
        console.log(`===========Set multi phases - Case 3=============`);
        phaseId = [0, 1];
        newIsActive = [true, false];
        newStartTime = new Date().getTime() + 20000; // now + 20s
        
        phase1 = {
            name: "New phase 1",
            startTime: newStartTime,
            endTime: newStartTime + 3 * 86400000,
            immediateReleaseRate: 600,
            vestingDuration: 2400000, 
            vestingUnit: 600000,
            isPublic: false,
            publicAmount: "160000000000000000",
            publicPrice: "600000000000" // 0.6A
        };

        phase2 = {
            name: "New phase 2",
            startTime: newStartTime + 4 * 86400000,
            endTime: newStartTime + 5 * 86400000,
            immediateReleaseRate: 1600,
            vestingDuration: 2400000, 
            vestingUnit: 600000,
            isPublic: true,
            publicAmount: "600000000000000000",
            publicPrice: "1200000000000" // 1.2A
        };
        
        newPhases = [phase1, phase2]; 

        await lpContract.tx.setMultiPhases(
            phaseId,
            newIsActive,
            newPhases,
        );

        receivedPublicSaleTotalAmountHex0 = (await lpQuery.getPublicSaleTotalAmount(0)).value.ok;
        receivedPublicSaleTotalAmount0 = (new BN(receivedPublicSaleTotalAmountHex0.substring(2), 16)).toString(10);
        // console.log({receivedPublicSaleTotalAmount0: receivedPublicSaleTotalAmount0});
        expect(receivedPublicSaleTotalAmount0).to.equal(currentPhasePublicAmount[0]);

        receivedPublicSaleTotalAmountHex1 = (await lpQuery.getPublicSaleTotalAmount(1)).value.ok;
        receivedPublicSaleTotalAmount1 = (new BN(receivedPublicSaleTotalAmountHex1.substring(2), 16)).toString(10);
        // console.log({receivedPublicSaleTotalAmount1: receivedPublicSaleTotalAmount1});
        expect(receivedPublicSaleTotalAmount1).to.equal(currentPhasePublicAmount[1]);

        // availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        // console.log({availableTokenAmount: availableTokenAmount.toString()});

        // let tokenBalance = (await tokenQuery.balanceOf(lpContractAddress)).value.ok;
        // console.log({tokenBalance: tokenBalance.toString()});

        // Case 4: Set back to origin but with new phase start end time
        console.log(`===========Set multi phases - Case 4=============`);
        try {
            newStartTime = new Date().getTime() + 5000; // now + 5000s
            
            phase1 = phases[0];
            phase1.startTime = newStartTime;
            phase1.endTime = newStartTime + 3 * 86400000;

            phase2 = phases[1];
            phase2.startTime = newStartTime + 4 * 86400000;
            phase2.endTime = newStartTime + 5 * 86400000;            
            
            newPhases = [phase1, phase2]; 

            await lpContract.tx.setMultiPhases(
                [0, 1],
                [true, true],
                newPhases                
            );
        } catch (error) {
            console.log("error", error);
        }

        receivedPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;
        // console.log({receivedPhaseInfo0: receivedPhaseInfo0});
        expect(receivedPhaseInfo0.endTime).to.equal(newPhases[0].endTime);

        receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;
        // console.log({receivedPhaseInfo1: receivedPhaseInfo1});
        expect(receivedPhaseInfo1.endTime).to.equal(newPhases[1].endTime);
    })

    it('Can set vesting duration', async () => {
        // Wait to the phase 0 starting time       
        let phaseId = 0;

        let currentTime = new Date().getTime();
        let receivedPhaseInfo0 = (await lpQuery.getPhase(phaseId)).value.ok;
        // console.log({receivedPhaseInfo0StartTime: receivedPhaseInfo0.startTime});       

        if (receivedPhaseInfo0.startTime > currentTime) {
            await delay(receivedPhaseInfo0.startTime - currentTime + 2000); // Delay + 2s
            console.log({ delayTime: receivedPhaseInfo0.startTime - currentTime + 2000 });
        }

        // Case 1: Set new vesting duration for phase 0
        console.log(`===========Set vesting duration - Case 1=============`);
        let newPhaseVestingDuration = 1200000;
        await lpContract.tx.setVestingDuration(phaseId, newPhaseVestingDuration);

        let receivedVestingDuration = (await lpQuery.getVestingDuration(phaseId)).value.ok;
        // console.log({receivedVestingDuration: receivedVestingDuration});     
        expect(receivedVestingDuration).to.equal(newPhaseVestingDuration);

        // Case 2: Set back to origin
        console.log(`===========Set vesting duration - Case 2=============`);
        newPhaseVestingDuration = phases[phaseId].vestingDuration;
        await lpContract.tx.setVestingDuration(phaseId, newPhaseVestingDuration);

        receivedVestingDuration = (await lpQuery.getVestingDuration(phaseId)).value.ok;
        // console.log({receivedVestingDuration: receivedVestingDuration});     
        expect(receivedVestingDuration).to.equal(newPhaseVestingDuration);
    })

    it('Can set vesting unit', async () => {
        let phaseId = 1;

        // Case 1: Set to 0 -> fail
        console.log(`===========Set vesting unit - Case 1=============`);
        let newPhaseVestingUnit = 0;

        try {
            await lpContract.tx.setVestingUnit(phaseId, newPhaseVestingUnit);
        } catch (error) {

        }

        let receivedVestingUnit = (await lpQuery.getVestingUnit(phaseId)).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedVestingUnit).to.gt(newPhaseVestingUnit);

        // Case 2: Set to > 0 -> sucess
        console.log(`===========Set vesting unit - Case 2=============`);
        newPhaseVestingUnit = 100000;
        await lpContract.tx.setVestingUnit(phaseId, newPhaseVestingUnit);
        receivedVestingUnit = (await lpQuery.getVestingUnit(phaseId)).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedVestingUnit).to.equal(newPhaseVestingUnit);

        // Case 3: Set back to origin
        console.log(`===========Set vesting unit - Case 3=============`);
        newPhaseVestingUnit = phases[phaseId].vestingUnit;
        await lpContract.tx.setVestingUnit(phaseId, newPhaseVestingUnit);
        receivedVestingUnit = (await lpQuery.getVestingUnit(phaseId)).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedVestingUnit).to.equal(newPhaseVestingUnit);
    })

    it('Can set transaction rate ', async () => {
        let currentReceivedTxRate = (await lpQuery.getTxRate()).value.ok;

        // Case 1: Set to new tx rate 
        console.log(`===========Set transaction rate - Case 1=============`);
        let newTxRate = 200; // 2%
        await lpContract.tx.setTxRate(newTxRate);

        let receivedTxRate = (await lpQuery.getTxRate()).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedTxRate).to.equal(newTxRate);

        // Case 2: Set back to origin
        console.log(`===========Set transaction rate - Case 2=============`);
        newTxRate = currentReceivedTxRate;
        await lpContract.tx.setTxRate(newTxRate);

        receivedTxRate = (await lpQuery.getTxRate()).value.ok;
        // console.log({receivedVestingUnit: receivedVestingUnit});     
        expect(receivedTxRate).to.equal(newTxRate);
    })

    it('Can set start and end time', async () => {
        // let currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // let currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime});

        let phaseId = 0;

        let currentTime = new Date().getTime();
        let currentPhaseInfo0 = (await lpQuery.getPhase(phaseId)).value.ok;
        let currentPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;
        // console.log({startTime: currentPhaseInfo0.startTime, endTime: currentPhaseInfo0.endTime, currentTime: currentTime}); 
        // console.log({startTimeP1: currentPhaseInfo1.startTime, endTimeP1: currentPhaseInfo1.endTime}); 

        // Case 1: Set new start_time > current start time -> failed
        console.log(`===========Set start and end time - Case 1=============`);
        let newPhaseStartTime = currentTime + 2000; // Current time + 2s
        let newPhaseEndTime = currentPhaseInfo0.endTime;

        try {
            await lpContract.tx.setStartAndEndTime(phaseId, newPhaseStartTime, newPhaseEndTime);
        } catch (error) {
            // console.log(error);
        }

        let receivedPhaseInfo0 = (await lpQuery.getPhase(phaseId)).value.ok;
        let receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;

        // currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime});

        // console.log({startTime: receivedPhaseInfo0.startTime, endTime: receivedPhaseInfo0.endTime}); 
        // console.log({startTimeP1: receivedPhaseInfo1.startTime, endTimeP1: receivedPhaseInfo1.endTime}); 

        expect(receivedPhaseInfo0.startTime).to.equal(currentPhaseInfo0.startTime);
        expect(receivedPhaseInfo0.endTime).to.equal(currentPhaseInfo0.endTime);

        // Case 2: Set phase 1 overlap with phase 2 -> failed
        console.log(`===========Set start and end time - Case 2=============`);
        newPhaseStartTime = currentPhaseInfo0.startTime;
        newPhaseEndTime = currentPhaseInfo1.startTime + 2000; // 2s

        try {
            await lpContract.tx.setStartAndEndTime(phaseId, newPhaseStartTime, newPhaseEndTime);
        } catch (error) {
            // console.log(error);
        }

        receivedPhaseInfo0 = (await lpQuery.getPhase(phaseId)).value.ok;
        receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;

        // currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime});

        // console.log({startTime: receivedPhaseInfo0.startTime, endTime: receivedPhaseInfo0.endTime}); 
        // console.log({startTimeP1: receivedPhaseInfo1.startTime, endTimeP1: receivedPhaseInfo1.endTime});

        expect(receivedPhaseInfo0.startTime).to.equal(currentPhaseInfo0.startTime);
        expect(receivedPhaseInfo0.endTime).to.equal(currentPhaseInfo0.endTime);

        // Case 3: Set a new data for phase -> success 
        console.log(`===========Set start and end time - Case 3=============`);
        newPhaseStartTime = currentPhaseInfo0.startTime; //
        newPhaseEndTime = currentPhaseInfo0.endTime + 2000; // +2s

        try {
            await lpContract.tx.setStartAndEndTime(phaseId, newPhaseStartTime, newPhaseEndTime);
        } catch (error) {
            console.log(error);
        }

        receivedPhaseInfo0 = (await lpQuery.getPhase(phaseId)).value.ok;
        receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;

        // currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime});

        // console.log({startTime: receivedPhaseInfo0.startTime, endTime: receivedPhaseInfo0.endTime}); 
        // console.log({startTimeP1: receivedPhaseInfo1.startTime, endTimeP1: receivedPhaseInfo1.endTime});

        expect(receivedPhaseInfo0.startTime).to.equal(newPhaseStartTime);
        expect(receivedPhaseInfo0.endTime).to.equal(newPhaseEndTime);

        // Case 4: Set back to origin
        console.log(`===========Set start and end time - Case 4=============`);
        newPhaseStartTime = currentPhaseInfo0.startTime;
        newPhaseEndTime = currentPhaseInfo0.endTime;

        try {
            await lpContract.tx.setStartAndEndTime(phaseId, newPhaseStartTime, newPhaseEndTime);
        } catch (error) {
            console.log(error);
        }

        receivedPhaseInfo0 = (await lpQuery.getPhase(phaseId)).value.ok;
        receivedPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;

        // currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime});

        // console.log({startTime: receivedPhaseInfo0.startTime, endTime: receivedPhaseInfo0.endTime}); 
        // console.log({startTimeP1: receivedPhaseInfo1.startTime, endTimeP1: receivedPhaseInfo1.endTime});

        expect(receivedPhaseInfo0.startTime).to.equal(newPhaseStartTime);
        expect(receivedPhaseInfo0.endTime).to.equal(newPhaseEndTime);
    })

    it('Can set active', async () => {
        // Case 1: Set phase 1 inactive
        console.log(`===========Set active - Case 1=============`);
        let phaseId = 0;
        let newIsActive = false;

        // let currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // let currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        let currentAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);

        let currentPublicSaleTotalAmountHex0 = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;
        let currentPublicSaleTotalAmount0 = Number(new BN(currentPublicSaleTotalAmountHex0.substring(2), 16));

        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime, currentAvailableTokenAmount: currentAvailableTokenAmount, currentPublicSaleTotalAmount0: currentPublicSaleTotalAmount0}); 

        // let currentPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;
        let currentPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;
        // console.log({currentPhaseInfo0StartTime: currentPhaseInfo0.startTime, currentPhaseInfo0EndTime: currentPhaseInfo0.endTime, currentPhaseInfo1StartTime: currentPhaseInfo1.startTime, currentPhaseInfo1EndTime: currentPhaseInfo1.endTime}); 

        await lpContract.tx.setIsActive(phaseId, newIsActive);

        let receivedPhaseInfo0 = (await lpQuery.getPhase(phaseId)).value.ok;
        let receivedProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        let receivedProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;
        let receivedAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);

        // console.log({isActive: receivedPhaseInfo0.isActive, receivedProjectStartTime: receivedProjectStartTime, receivedProjectEndTime: receivedProjectEndTime, receivedAvailableTokenAmount: receivedAvailableTokenAmount}); 

        expect(receivedPhaseInfo0.isActive).to.equal(newIsActive);
        expect(receivedProjectStartTime).to.equal(currentPhaseInfo1.startTime);
        expect(receivedProjectEndTime).to.equal(currentPhaseInfo1.endTime);
        expect(receivedAvailableTokenAmount).to.equal(currentAvailableTokenAmount + currentPublicSaleTotalAmount0);

        // Case 2: Set phase 1 back to origin (true)
        console.log(`===========Set active - Case 2=============`);
        phaseId = 0;
        newIsActive = true;

        // let currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // let currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        currentAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);
        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime, currentAvailableTokenAmount: currentAvailableTokenAmount}); 
        currentPhaseInfo1 = (await lpQuery.getPhase(1)).value.ok;

        await lpContract.tx.setIsActive(phaseId, newIsActive);

        let receivedPublicSaleTotalAmountHex0 = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;
        let receivedPublicSaleTotalAmount0 = Number(new BN(receivedPublicSaleTotalAmountHex0.substring(2), 16));

        receivedPhaseInfo0 = (await lpQuery.getPhase(phaseId)).value.ok;
        receivedProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        receivedProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;
        receivedAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);

        // console.log({isActive: receivedPhaseInfo0.isActive, receivedProjectStartTime: receivedProjectStartTime, receivedProjectEndTime: receivedProjectEndTime, receivedAvailableTokenAmount: receivedAvailableTokenAmount}); 

        expect(receivedPhaseInfo0.isActive).to.equal(newIsActive);
        expect(receivedProjectStartTime).to.equal(receivedPhaseInfo0.startTime);
        expect(receivedProjectEndTime).to.equal(currentPhaseInfo1.endTime);
        expect(currentAvailableTokenAmount).to.equal(receivedAvailableTokenAmount + receivedPublicSaleTotalAmount0);

        // Case 3: Set phase 2 inactive
        console.log(`===========Set active - Case 3=============`);
        phaseId = 1;
        newIsActive = false;

        // let currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // let currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        currentAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);

        let currentPublicSaleTotalAmountHex1 = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;
        let currentPublicSaleTotalAmount1 = Number(new BN(currentPublicSaleTotalAmountHex1.substring(2), 16));

        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime, currentAvailableTokenAmount: currentAvailableTokenAmount, currentPublicSaleTotalAmount0: currentPublicSaleTotalAmount0}); 

        // let currentPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;
        let currentPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;
        // console.log({currentPhaseInfo0StartTime: currentPhaseInfo0.startTime, currentPhaseInfo0EndTime: currentPhaseInfo0.endTime, currentPhaseInfo1StartTime: currentPhaseInfo1.startTime, currentPhaseInfo1EndTime: currentPhaseInfo1.endTime}); 

        await lpContract.tx.setIsActive(phaseId, newIsActive);

        let receivedPhaseInfo1 = (await lpQuery.getPhase(phaseId)).value.ok;
        receivedProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        receivedProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;
        receivedAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);

        // console.log({isActive: receivedPhaseInfo0.isActive, receivedProjectStartTime: receivedProjectStartTime, receivedProjectEndTime: receivedProjectEndTime, receivedAvailableTokenAmount: receivedAvailableTokenAmount}); 

        expect(receivedPhaseInfo1.isActive).to.equal(newIsActive);
        expect(receivedProjectStartTime).to.equal(currentPhaseInfo0.startTime);
        expect(receivedProjectEndTime).to.equal(currentPhaseInfo0.endTime);
        expect(receivedAvailableTokenAmount).to.equal(currentAvailableTokenAmount + currentPublicSaleTotalAmount1);

        // Case 4: Set phase 2 back to origin (true)
        console.log(`===========Set active - Case 4=============`);
        phaseId = 1;
        newIsActive = true;

        // let currentProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        // let currentProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;  
        currentAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);
        // console.log({currentProjectStartTime: currentProjectStartTime, currentProjectEndTime: currentProjectEndTime, currentAvailableTokenAmount: currentAvailableTokenAmount}); 
        currentPhaseInfo0 = (await lpQuery.getPhase(0)).value.ok;

        await lpContract.tx.setIsActive(phaseId, newIsActive);

        let receivedPublicSaleTotalAmountHex1 = (await lpQuery.getPublicSaleTotalAmount(phaseId)).value.ok;
        let receivedPublicSaleTotalAmount1 = Number(new BN(receivedPublicSaleTotalAmountHex1.substring(2), 16));

        receivedPhaseInfo1 = (await lpQuery.getPhase(phaseId)).value.ok;
        receivedProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        receivedProjectEndTime = (await lpQuery.getProjectEndTime()).value.ok;
        receivedAvailableTokenAmount = Number((await lpQuery.getAvailableTokenAmount()).value.ok);

        // console.log({isActive: receivedPhaseInfo0.isActive, receivedProjectStartTime: receivedProjectStartTime, receivedProjectEndTime: receivedProjectEndTime, receivedAvailableTokenAmount: receivedAvailableTokenAmount}); 

        expect(receivedPhaseInfo1.isActive).to.equal(newIsActive);
        expect(receivedProjectStartTime).to.equal(currentPhaseInfo0.startTime);
        expect(receivedProjectEndTime).to.equal(receivedPhaseInfo1.endTime);
        expect(currentAvailableTokenAmount).to.equal(receivedAvailableTokenAmount + receivedPublicSaleTotalAmount1);
    })

    it('Can set public sale price', async () => {
        // Case 1: Set to new price for phase 1
        let phaseId = 0;
        let newPhasePublicPrice = "600000000000";

        await lpContract.tx.setPublicSalePrice(phaseId, newPhasePublicPrice);

        let receivedPublicSalePrice = (await lpQuery.getPublicSalePrice()).value.ok;
        console.log({ receivedPublicSalePrice: receivedPublicSalePrice.toString() });
        expect(receivedPublicSalePrice.toString()).to.equal(newPhasePublicPrice);

        // Case 2: Set to origin for phase 1
        phaseId = 0;
        newPhasePublicPrice = phases[phaseId].publicPrice;

        await lpContract.tx.setPublicSalePrice(phaseId, newPhasePublicPrice);

        receivedPublicSalePrice = (await lpQuery.getPublicSalePrice()).value.ok;
        console.log({ receivedPublicSalePrice: receivedPublicSalePrice.toString() });
        expect(receivedPublicSalePrice.toString()).to.equal(newPhasePublicPrice);
    })

    it('can add multi whitelists', async () => {
        console.log(`===========Create launchpad 2=============`);
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
        let totalSupply = "700000000000000"; // 700
        await tokenContract.withSigner(alice).tx.approve(lpgContractAddress, totalSupply);

        // Step B4: Alice creates launchpad for token LNPD
        console.log(`===========Step B4=============`);
        projectInfoUri = "Launchpad test 2"; // 1000 token AAA
        startTime = new Date().getTime() + 20000; // now + 20s

        // phaseName = ["Phase 1", "Phase 2"];
        // phaseStartTime = [startTime, startTime + 100000];
        // phaseEndTime = [startTime + 40000, startTime + 180000];
        // phaseImmediateReleaseRate = [500, 1500]; // 5%; 15%
        // phaseVestingDuration = [50000, 50000];
        // phaseVestingUnit = [20000, 20000];
        // phaseIsPublic = [true, true];
        // phasePublicAmount = ["100000000000000", "500000000000000"];  
        // phasePublicPrice = ["500000000000", "1000000000000"]; 

        let phase1: PhaseInput = {
            name: "Phase 1",
            startTime: startTime,
            endTime: startTime + 40000,
            immediateReleaseRate: 500,
            vestingDuration: 50000, 
            vestingUnit: 20000,
            isPublic: true,
            publicAmount: "100000000000000", // 100
            publicPrice: "500000000000" // 0.5A
        };

        let phase2: PhaseInput = {
            name: "Phase 2",
            startTime: startTime + 100000,
            endTime: startTime + 180000,
            immediateReleaseRate: 1500,
            vestingDuration: 50000, 
            vestingUnit: 20000,
            isPublic: true,
            publicAmount: "500000000000000", // 500
            publicPrice: "1000000000000" // 1A
        };

        phases = [phase1, phase2];

        const txNewLaunchpad = await lpgContract.withSigner(alice).tx.newLaunchpad(
            projectInfoUri,
            tokenContractAddress,
            totalSupply,
            [phase1, phase2]
        );
        // console.log({ txNewLaunchpad: txNewLaunchpad });

        // Step B5: Check launchpad count and set active
        console.log(`===========Step B5=============`);
        let launchpadCount = (await lpgQuery.getLaunchpadCount()).value.ok;
        expect(launchpadCount).to.equal(2);
        lpContractAddress = (await lpgQuery.getLaunchpadById(2)).value.ok;
        console.log({ lpContractAddress: lpContractAddress });

        lpContract = new ContractMyLaunchpad(lpContractAddress, alice, api);
        lpQuery = lpContract.query;
        lpTx = lpContract.tx;

        await lpgTx.setIsActiveLaunchpad(lpContractAddress, true);
        let isActiveLaunchpad = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(isActiveLaunchpad).to.equal(true);

        // Step B6: add multi whitelists
        console.log(`===========Add multi whitelists=============`);
        let phaseId = 1;
        let accounts = [alice.address, bob.address]; // 2 account
        let whitelistAmounts = ['10000000000000', '20000000000000']; // 10 20
        let whitelistPrices = ['1000000000000', '2000000000000'];  // 1 2

        /// check phase isActive
        let phaseIsActive = (await lpQuery.getIsActive(phaseId)).value.ok;
        if (!phaseIsActive) {
            await lpContract.tx.setIsActive(phaseId, true);
        }

        await lpTx.addMultiWhitelists(phaseId, accounts, whitelistAmounts, whitelistPrices);

        /// Check Whitelist Account Count
        let whitelistAccountCount = (await lpQuery.getWhitelistAccountCount(phaseId)).value.ok;
        expect(whitelistAccountCount).to.equal(accounts.length);

        /// Check whitelist info
        let whitelistBuyer = (await lpQuery.getWhitelistBuyer(phaseId, alice.address)).value.ok; // signer
        expect(whitelistBuyer.amount.toString()).to.equal((whitelistAmounts[0]));
        expect(whitelistBuyer.price.toString()).to.equal((whitelistPrices[0]));
        whitelistBuyer = (await lpQuery.getWhitelistBuyer(phaseId, bob.address)).value.ok; // bob
        expect(whitelistBuyer.amount.toString()).to.equal(whitelistAmounts[1]);
        expect(whitelistBuyer.price.toString()).to.equal((whitelistPrices[1]));
    })

    it('can update multi whitelists', async () => {
        // case 1:  whitelistAmount > availableTokenAmount
        console.log('===========Update multi whitelists - Case 2=============');
        let availableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        let phaseId = 1;
        let accounts = [alice.address, bob.address]; // 2 account
        let whitelistAmountsNew = [availableTokenAmount + 1, availableTokenAmount + 2];
        let whitelistPricesNew = ['5000000000000', '6000000000000'];

        try {
            await lpTx.updateMultiWhitelists(phaseId, accounts, whitelistAmountsNew, whitelistPricesNew);
        } catch (error) {

        }

        // Check whitelist info
        let whitelistBuyer = (await lpQuery.getWhitelistBuyer(phaseId, alice.address)).value.ok; // alice
        expect(whitelistBuyer.amount.toString()).to.equal((whitelistAmountsNew[0]));
        expect(whitelistBuyer.price.toString()).to.equal((whitelistPricesNew[0]));
        whitelistBuyer = (await lpQuery.getWhitelistBuyer(phaseId, bob.address)).value.ok; // bob
        expect(whitelistBuyer.amount.toString()).to.equal(whitelistAmountsNew[1]);
        expect(whitelistBuyer.price.toString()).to.equal((whitelistPricesNew[1]));

        // case 2:  whitelistAmount < availableTokenAmount
        console.log('===========Update multi whitelists - Case 1=============');     
        let whitelistAmounts = ['20000000000000', '30000000000000']; // 20 30
        let whitelistPrices = ['2000000000000', '3000000000000'];  // 2 3

        await lpTx.updateMultiWhitelists(phaseId, accounts, whitelistAmounts, whitelistPrices);

        // Check whitelist info
        whitelistBuyer = (await lpQuery.getWhitelistBuyer(phaseId, alice.address)).value.ok; // alice
        expect(whitelistBuyer.amount.toString()).to.equal((whitelistAmounts[0]));
        expect(whitelistBuyer.price.toString()).to.equal((whitelistPrices[0]));
        whitelistBuyer = (await lpQuery.getWhitelistBuyer(phaseId, bob.address)).value.ok; // bob
        expect(whitelistBuyer.amount.toString()).to.equal(whitelistAmounts[1]);
        expect(whitelistBuyer.price.toString()).to.equal((whitelistPrices[1]));
    })

    it('Can public purchase', async () => {
        // startTime < currentTime < endTime
        let phaseId = 0;
        let endTime = (await lpQuery.getEndTime(phaseId)).value.ok;
        let startTime = (await lpQuery.getStartTime(phaseId)).value.ok;
        let currentTime = new Date().getTime();
        if (currentTime < startTime) {
            let deyTime = startTime - currentTime + 10000; // delay + 10s
            console.log('Await', deyTime, 'to get to the start time ...')
            await delay(deyTime); // delay + 2s;
        }
        const blockHash = await api.rpc.chain.getBlockHash();
        const blockHashHex = blockHash.toHex();
        const blockTimestamp = await api.query.timestamp.now.at(blockHashHex);
        console.log('Start time:', startTime, 'Current timestamp:', Number(blockTimestamp), 'End Time:', endTime);

        let amount;
        let publicSaleInfo = (await lpQuery.getPublicSaleInfo(phaseId)).value.ok;
        let decimal = 12;
        let price;
        let value;
        let totalAmount = parseInt(publicSaleInfo.totalAmount);
        let totalPurchasedAmount = publicSaleInfo.totalPurchasedAmount;
        let publicSaleTotalClaimedAmountBefor = (await lpQuery.getPublicSaleTotalClaimedAmount(phaseId)).value.ok;
        let publicSaleTotalPurchasedAmountBefor = (await lpQuery.getPublicSaleTotalPurchasedAmount(phaseId)).value.ok;

        console.log('===============================public Sale Total Befor=================================');
        console.log('publicSaleTotalClaimedAmount:', publicSaleTotalClaimedAmountBefor);
        console.log('publicSaleTotalPurchasedAmount:', publicSaleTotalPurchasedAmountBefor);

        // case 1: amount < totalAmount && value < price => fail
        console.log('===========Public purchase - Case 1=============');
        amount = 2000000000000;
        expect(totalAmount - (amount + totalPurchasedAmount) > 0).to.equal(true);
        price = publicSaleInfo.price * amount / (Number(new BN(10)) ** decimal);
        value = price - 500000000000; // + 0.5A

        try {
            await lpTx.publicPurchase(phaseId, amount, { value });
        } catch (error) {
        }

        let publicSaleTotalClaimedAmountAfter = (await lpQuery.getPublicSaleTotalClaimedAmount(phaseId)).value.ok;
        let publicSaleTotalPurchasedAmountAfter = (await lpQuery.getPublicSaleTotalPurchasedAmount(phaseId)).value.ok;
        expect(publicSaleTotalPurchasedAmountBefor).to.equal(publicSaleTotalPurchasedAmountAfter);
        expect(publicSaleTotalClaimedAmountBefor).to.equal(publicSaleTotalClaimedAmountAfter);

        // case 2: amount > totalAmount && value < price => fail
        console.log('===========Public purchase - Case 2=============');
        amount = totalAmount + 1;
        expect(totalAmount - (amount + totalPurchasedAmount) > 0).to.equal(false);
        price = publicSaleInfo.price * amount / (Number(new BN(10)) ** decimal);
        value = price + 500000000000 // + 0.5A

        try {
            await lpTx.publicPurchase(phaseId, amount, { value });
        } catch (error) {
        }

        publicSaleTotalClaimedAmountAfter = (await lpQuery.getPublicSaleTotalClaimedAmount(phaseId)).value.ok;
        publicSaleTotalPurchasedAmountAfter = (await lpQuery.getPublicSaleTotalPurchasedAmount(phaseId)).value.ok;
        expect(publicSaleTotalPurchasedAmountBefor).to.equal(publicSaleTotalPurchasedAmountAfter);
        expect(publicSaleTotalClaimedAmountBefor).to.equal(publicSaleTotalClaimedAmountAfter);


        // case 3: amount < totalAmount && value <= price => success
        console.log('===========Public purchase - Case 3=============');
        amount = 2000000000000;
        expect(totalAmount - (amount + totalPurchasedAmount) > 0).to.equal(true);
        price = publicSaleInfo.price * amount / (Number(new BN(10)) ** decimal);
        value = price;

        await lpTx.publicPurchase(phaseId, amount, { value });

        publicSaleTotalClaimedAmountAfter = (await lpQuery.getPublicSaleTotalClaimedAmount(phaseId)).value.ok;
        publicSaleTotalPurchasedAmountAfter = (await lpQuery.getPublicSaleTotalPurchasedAmount(phaseId)).value.ok;
        console.log('===============================public Sale Total After=================================');
        console.log('publicSaleTotalClaimedAmount:', publicSaleTotalClaimedAmountAfter);
        console.log('publicSaleTotalPurchasedAmount:', publicSaleTotalPurchasedAmountAfter);
    })

    it('Can public claim', async () => {
        // endTime < currentTime
        let phaseId = 0;
        let phaseInfo = (await lpQuery.getPhase(phaseId, alice.address)).value.ok;
        let vestingUnit = phaseInfo.vestingUnit;
        let vestingDuration = phaseInfo.vestingDuration;
        let balance = (await tokenQuery.balanceOf(alice.address)).value.ok;
        let delayTime;
        let endTime = (await lpQuery.getEndTime(phaseId)).value.ok;

        // is_active_launchpad = false || phase_info.is_active => claim success
        await lpTx.setIsActive(phaseId, false);
        let phaseIsActive = (await lpQuery.getIsActive(phaseId)).value.ok;
        expect(phaseIsActive).to.equal(false);
        await lpgTx.setIsActiveLaunchpad(lpContractAddress, false);
        let lpIsActive = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(lpIsActive).to.equal(false)

        let currentTime = new Date().getTime();
        if (currentTime < endTime) {
            delayTime = endTime - currentTime + 2000; // delay + 10s
            console.log('Await', delayTime, 'to get to the end time ...');
            await delay(delayTime); // delay + 2s;
        }

        const blockHash = await api.rpc.chain.getBlockHash();
        const blockHashHex = blockHash.toHex();
        let blockTimestamp = await api.query.timestamp.now.at(blockHashHex);
        endTime = (await lpQuery.getEndTime(phaseId)).value.ok;
        console.log('timeStamp: ', Number(blockTimestamp), 'endTime: ', endTime);

        // Case 1: await vestingUnit => claim => balance alice changed
        console.log('===========Public claim - Case 1=============');
        delayTime = vestingUnit + 2000;
        console.log('Await', delayTime);
        await delay(delayTime); // delay + 2s;

        await lpTx.publicClaim(phaseId);

        let balanceAfer = (await tokenQuery.balanceOf(alice.address)).value.ok;
        expect(balanceAfer - balance > 0).to.equal(true);

        // Case 2: await vestingduration => purchased_amount = claimed_amount
        console.log('===========Public claim - Case 2=============');
        delayTime = vestingDuration + 2000;
        console.log('Await', delayTime);
        await delay(delayTime); // delay + 2s;

        await lpTx.publicClaim(phaseId);

        let publicBuyer = (await lpQuery.getPublicBuyer(phaseId, alice.address)).value.ok;
        expect(publicBuyer.purchasedAmount).to.equal(publicBuyer.claimedAmount);
        console.log('publicBuyer after whitelist claim', publicBuyer);

        // back
        await lpgTx.setIsActiveLaunchpad(lpContractAddress, true);
        lpIsActive = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(lpIsActive).to.equal(true)
    })

    it('Can whitelist purchase', async () => {
        // startTime < currentTime < endTime
        let phaseId = 1;
        let endTime = (await lpQuery.getEndTime(phaseId)).value.ok;
        let startTime = (await lpQuery.getStartTime(phaseId)).value.ok;
        let currentTime = new Date().getTime();
        if (currentTime < startTime) {
            let delayTime = startTime - currentTime + 10000; // delay + 10s
            console.log('Await', delayTime, 'to get to the start time ...')
            await delay(delayTime); // delay + 2s;
        }
        const blockHash = await api.rpc.chain.getBlockHash();
        const blockHashHex = blockHash.toHex();
        const blockTimestamp = await api.query.timestamp.now.at(blockHashHex);
        console.log('Start time:', startTime, 'Current timestamp:', Number(blockTimestamp), 'End Time:', endTime);

        let amount;
        let whitelistBuyer = (await lpQuery.getWhitelistBuyer(phaseId, bob.address)).value.ok; // bob
        let decimal = 12;
        let price;
        let value;
        let Amount = whitelistBuyer.amount;
        let purchasedAmount = whitelistBuyer.purchasedAmount;
        let whitelistSaleTotalAmountBefor = (await lpQuery.getWhitelistSaleTotalAmount(phaseId)).value.ok;
        let whitelistSaleTotalClaimedAmountBefor = (await lpQuery.getWhitelistSaleTotalClaimedAmount(phaseId)).value.ok;

        console.log('===============================whitelist Sale Total Befor=================================');
        console.log('whitelistSaleTotalAmount:', whitelistSaleTotalAmountBefor);
        console.log('whitelistSaleTotalClaimedAmount:', whitelistSaleTotalClaimedAmountBefor);

        // case 1: amount < Amount && value < price => fail
        console.log('===========whitelist purchase - Case 1=============');
        amount = 2000000000000;
        expect(Amount - (amount + purchasedAmount) > 0).to.equal(true);
        price = whitelistBuyer.price * amount / (Number(new BN(10)) ** decimal);
        value = price - 500000000000; // + 0.5A

        try {
            await lpContract.withSigner(bob).tx.whitelistPurchase(phaseId, amount, { value });
        } catch (error) {

        }

        let whitelistSaleTotalAmountAfter = (await lpQuery.getWhitelistSaleTotalAmount(phaseId)).value.ok;
        let whitelistSaleTotalClaimedAmountAfter = (await lpQuery.getWhitelistSaleTotalClaimedAmount(phaseId)).value.ok;
        expect(whitelistSaleTotalAmountBefor).to.equal(whitelistSaleTotalAmountAfter);
        expect(whitelistSaleTotalClaimedAmountBefor).to.equal(whitelistSaleTotalClaimedAmountAfter);

        // case 2: amount > Amount && value > price => fail
        console.log('===========whitelist purchase - Case 2=============');
        amount = 2000000000000 + Amount;
        expect(Amount - (amount + purchasedAmount) > 0).to.equal(false);
        price = whitelistBuyer.price * amount / (Number(new BN(10)) ** decimal);
        value = price + 500000000000; // + 0.5A

        try {
            await lpContract.withSigner(bob).tx.whitelistPurchase(phaseId, amount, { value }); //
        } catch (error) {

        }

        whitelistSaleTotalAmountAfter = (await lpQuery.getWhitelistSaleTotalAmount(phaseId)).value.ok;
        whitelistSaleTotalClaimedAmountAfter = (await lpQuery.getWhitelistSaleTotalClaimedAmount(phaseId)).value.ok;
        expect(whitelistSaleTotalAmountBefor).to.equal(whitelistSaleTotalAmountAfter);
        expect(whitelistSaleTotalClaimedAmountBefor).to.equal(whitelistSaleTotalClaimedAmountAfter);

        // case 3:  amount < Amount && value > price => success
        console.log('===========whitelist purchase - Case 3=============');
        amount = 2000000000000;
        expect(Amount - (amount + purchasedAmount) > 0).to.equal(true);
        price = whitelistBuyer.price * amount / (Number(new BN(10)) ** decimal);
        value = price;

        await lpContract.withSigner(bob).tx.whitelistPurchase(phaseId, amount, { value }); //

        whitelistSaleTotalAmountAfter = (await lpQuery.getWhitelistSaleTotalAmount(phaseId)).value.ok;
        whitelistSaleTotalClaimedAmountAfter = (await lpQuery.getWhitelistSaleTotalClaimedAmount(phaseId)).value.ok;
        console.log('===============================whitelist Sale Total After=================================');
        console.log('whitelistSaleTotalAmount:', whitelistSaleTotalAmountAfter);
        console.log('whitelistSaleTotalClaimedAmount:', whitelistSaleTotalClaimedAmountAfter);
    })

    it('Can whitelist claim', async () => {
        // endTime < currentTime
        let phaseId = 1;
        let phaseInfo = (await lpQuery.getPhase(phaseId, alice.address)).value.ok;
        let vestingUnit = phaseInfo.vestingUnit;
        let vestingDuration = phaseInfo.vestingDuration;
        let balance = (await tokenQuery.balanceOf(bob.address)).value.ok;
        let delayTime;
        let endTime = (await lpQuery.getEndTime(phaseId)).value.ok;
       
        // is_active_launchpad = false || phase_info.is_active => claim success
        // let isActive = (await lpQuery.getIsActive(phaseId)).value.ok;
        // console.log("isActive =", isActive);
        try { await lpContract.tx.setIsActive(phaseId, false); } catch (error) { console.log(error) }
        let phaseIsActive = (await lpQuery.getIsActive(phaseId)).value.ok;
        expect(phaseIsActive).to.equal(false);
        try { await lpgTx.setIsActiveLaunchpad(lpContractAddress, false); } catch (error) { console.log(error) }
        let lpIsActive = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(lpIsActive).to.equal(false)

        let currentTime = new Date().getTime();
        if (currentTime < endTime) {
            delayTime = phaseInfo.endTime - currentTime + 2000;
            console.log('Await', delayTime, 'to get to the end time ...');
            await delay(delayTime); // delay + 10s;
        }     
        
        const blockHash = await api.rpc.chain.getBlockHash();
        const blockHashHex = blockHash.toHex();
        let blockTimestamp = await api.query.timestamp.now.at(blockHashHex);
        console.log('timeStamp: ', Number(blockTimestamp), 'endTime: ', endTime, 'endVestingTime', phaseInfo.endVestingTime);

        // Case 1: await vestingUnit => claim => balance alice changed
        console.log('===========Whitelist claim - Case 1=============');
        delayTime = vestingUnit + 2000;
        console.log('Await', delayTime);
        await delay(delayTime); // delay + 2s;

        await lpContract.withSigner(bob).tx.whitelistClaim(phaseId);

        let balanceAfer = (await tokenQuery.balanceOf(bob.address)).value.ok;
        expect(balanceAfer - balance > 0).to.equal(true);

        // Case 2: await vestingduration => purchased_amount = claimed_amount
        console.log('===========Whitelist claim - Case 2=============');
        delayTime = vestingDuration + 2000;
        console.log('Await', delayTime);
        await delay(delayTime); // delay + 2s;

        await lpContract.withSigner(bob).tx.whitelistClaim(phaseId);

        balanceAfer = (await tokenQuery.balanceOf(bob.address)).value.ok;
        expect(balanceAfer - balance > 0).to.equal(true);

        let whitelistBuyer = (await lpQuery.getWhitelistBuyer(phaseId, bob.address)).value.ok;
        expect(whitelistBuyer.purchasedAmount).to.equal(whitelistBuyer.claimedAmount);
        console.log('whitelistBuyer after whitelist claim', whitelistBuyer);

        // back lp active
        await lpgTx.setIsActiveLaunchpad(lpContractAddress, true);
        lpIsActive = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(lpIsActive).to.equal(true)
    })

    it('Can withdraw', async () => {
        let receiver = bob.address;
        let value = new BN(1000000000000); // 1A
        let balanceContract = await showAZBalance(api, lpContractAddress);
        console.log({ balanceContract: balanceContract });

        await lpTx.withdraw(value, receiver);
        let balanceContractAfter = await showAZBalance(api, lpContractAddress);
        console.log({ balanceContractAfter: balanceContractAfter });
        expect(balanceContract - balanceContractAfter > 0).to.equal(true);
    })

    it('Can burn unsold tokens', async () => {
        console.log(`===========Create launchpad 3=============`);
        // Step B1: Onwer mints creation fee in INW to alice
        console.log(`===========Step B1=============`);
        await inwContract.tx.mint(alice.address, creationFee);
        let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        expect(aliceBalance).to.equal(creationFee);

        // Step B2: alice approves creationFee in INW for launchpad generator contract
        console.log(`===========Step B2=============`);
        await inwContract.withSigner(alice).tx.approve(lpgContractAddress, creationFee);

        // Step B3: alice approves total supply of token and create a launchpad 3
        console.log(`===========Step B3=============`);
        let totalSupply = "700000000000000"; // 700
        await tokenContract.withSigner(alice).tx.approve(lpgContractAddress, totalSupply);

        // Step B4: alice creates launchpad for token LNPD
        console.log(`===========Step B4=============`);
        projectInfoUri = "Launchpad test 3"; //
        startTime = new Date().getTime() + 20000; // now + 20s
        
        // phaseName = ["Phase 1", "Phase 2"];
        // startTime = new Date().getTime() + 20000; // now + 20s
        // phaseStartTime = [startTime, startTime + 20000];
        // phaseEndTime = [startTime + 10000, startTime + 30000];
        // phaseImmediateReleaseRate = [500, 1500]; // 5%; 15%
        // phaseVestingDuration = [20000, 20000];
        // phaseVestingUnit = [10000, 10000];
        // phaseIsPublic = [true, true];
        // phasePublicAmount = ["100000000000000", "200000000000000"]; // 100 - 200
        // phasePublicPrice = ["1000000000000", "1000000000000"]; // 1A

        let phase1: PhaseInput = {
            name: "Phase 1",
            startTime: startTime,
            endTime: startTime + 10000,
            immediateReleaseRate: 500,
            vestingDuration: 20000, 
            vestingUnit: 10000,
            isPublic: true,
            publicAmount: "100000000000000", // 100
            publicPrice: "1000000000000" // 1A
        };

        let phase2: PhaseInput = {
            name: "Phase 2",
            startTime: startTime + 20000,
            endTime: startTime + 30000,
            immediateReleaseRate: 1500,
            vestingDuration: 20000, 
            vestingUnit: 10000,
            isPublic: true,
            publicAmount: "200000000000000", // 200
            publicPrice: "1000000000000" // 1A
        };

        phases = [phase1, phase2];

        await lpgContract.withSigner(alice).tx.newLaunchpad(
            projectInfoUri,
            tokenContractAddress,
            totalSupply,
            [phase1, phase2]
        );

        // Step B5: Check launchpad count
        console.log(`===========Step B5=============`);
        let launchpadCount = (await lpgQuery.getLaunchpadCount()).value.ok;
        expect(launchpadCount).to.equal(3);
        lpContractAddress = (await lpgQuery.getLaunchpadById(3)).value.ok;
        // console.log({ lpContractAddress: lpContractAddress });

        // Step B6: Get contract and active launchpad 3
        console.log(`===========Step B6=============`);
        lpContract = new ContractMyLaunchpad(lpContractAddress, alice, api);
        lpQuery = lpContract.query;
        lpTx = lpContract.tx;

        await lpgTx.setIsActiveLaunchpad(lpContractAddress, true);
        let isActiveLaunchpad = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(isActiveLaunchpad).to.equal(true);

        // endTime < currentTime
        console.log('===========Burn unsold tokens=============')
        let projectEndTime = (await lpQuery.getProjectEndTime()).value.ok;
        let currentTime = new Date().getTime();
        if (currentTime < projectEndTime) {
            let delayTime = projectEndTime - currentTime + 3000; // delay + 3s
            console.log('Await', delayTime, 'to get to the project end time ...');
            await delay(delayTime);
        }
        const blockHash = await api.rpc.chain.getBlockHash();
        const blockHashHex = blockHash.toHex();
        const blockTimestamp = await api.query.timestamp.now.at(blockHashHex);
        console.log('timeStamp: ', Number(blockTimestamp), 'endTime: ', projectEndTime);

        await lpTx.burnUnsoldTokens();

        let phaseId = 0;

        let publicSaleInfo = (await lpQuery.getPublicSaleInfo(phaseId)).value.ok;
        expect(publicSaleInfo.isBurned).equal(true);
        expect(publicSaleInfo.isWithdrawn).equal(false);

        phaseId = 1;

        publicSaleInfo = (await lpQuery.getPublicSaleInfo(phaseId)).value.ok;
        expect(publicSaleInfo.isBurned).equal(true);
        expect(publicSaleInfo.isWithdrawn).equal(false);
    })

    it('Can withdraw unsold tokens', async () => {
        console.log(`===========Create launchpad 4=============`);
        // Step B1: Onwer mints creation fee in INW to alice
        console.log(`===========Step B1=============`);
        await inwContract.tx.mint(alice.address, creationFee);
        let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        expect(aliceBalance).to.equal(creationFee);

        // Step B2: alice approves creationFee in INW for launchpad generator contract
        console.log(`===========Step B2=============`);
        await inwContract.withSigner(alice).tx.approve(lpgContractAddress, creationFee);

        // Step B3: alice approves total supply of token and create a launchpad 4
        console.log(`===========Step B3=============`);
        let totalSupply = "700000000000000"; // 700
        await tokenContract.withSigner(alice).tx.approve(lpgContractAddress, totalSupply);

        // Step B4: alice creates launchpad for token LNPD
        console.log(`===========Step B4=============`);
        projectInfoUri = "Launchpad test 4"; //
        startTime = new Date().getTime() + 20000; // now + 20s

        // phaseName = ["Phase 1"];
        // phaseStartTime = [startTime];
        // phaseEndTime = [startTime + 20000];
        // phaseImmediateReleaseRate = [500]; // 5%
        // phaseVestingDuration = [20000];
        // phaseVestingUnit = [10000];
        // phaseIsPublic = [true];
        // phasePublicAmount = ["100000000000000"]; // 100 
        // phasePublicPrice = ["1000000000000"]; // 1A

        let phase1: PhaseInput = {
            name: "Phase 1",
            startTime: startTime,
            endTime: startTime + 20000,
            immediateReleaseRate: 500,
            vestingDuration: 20000, 
            vestingUnit: 10000,
            isPublic: true,
            publicAmount: "100000000000000", // 100
            publicPrice: "1000000000000" // 1A
        };        

        phases = [phase1];

        await lpgContract.withSigner(alice).tx.newLaunchpad(
            projectInfoUri,
            tokenContractAddress,
            totalSupply,
            [phase1]
        );

        // Step B5: Check launchpad count
        console.log(`===========Step B5=============`);
        let launchpadCount = (await lpgQuery.getLaunchpadCount()).value.ok;
        expect(launchpadCount).to.equal(4);
        lpContractAddress = (await lpgQuery.getLaunchpadById(4)).value.ok;
        // console.log({ lpContractAddress: lpContractAddress });

        // Step B6: Get contract and active launchpad 4
        console.log(`===========Step B6=============`);
        lpContract = new ContractMyLaunchpad(lpContractAddress, alice, api);
        lpQuery = lpContract.query;
        lpTx = lpContract.tx;

        await lpgTx.setIsActiveLaunchpad(lpContractAddress, true);
        let isActiveLaunchpad = (await lpgQuery.getIsActiveLaunchpad(lpContractAddress)).value.ok;
        expect(isActiveLaunchpad).to.equal(true);

        // Step B7: withdraw unsold tokens
        console.log(`===========With draw unsold tokens=============`);
        /// endTime < currentTime
        let phaseId = 0;
        let projectEndTime = (await lpQuery.getProjectEndTime()).value.ok;
        let currentTime = new Date().getTime();
        if (currentTime < projectEndTime) {
            let delayTime = projectEndTime - currentTime + 10000;
            console.log('Await', delayTime, 'to get to the project end time ...');
            await delay(delayTime); // delay + 10s;
        }
        const blockHash = await api.rpc.chain.getBlockHash();
        const blockHashHex = blockHash.toHex();
        const blockTimestamp = await api.query.timestamp.now.at(blockHashHex);
        console.log('timeStamp: ', Number(blockTimestamp), 'endTime: ', projectEndTime);

        let receiver = defaultSigner.address;
        await lpTx.withdrawUnsoldTokens(receiver);

        let publicSaleInfo = (await lpQuery.getPublicSaleInfo(phaseId)).value.ok;
        expect(publicSaleInfo.isWithdrawn).equal(true);
        expect(publicSaleInfo.isBurned).equal(false);
    })

    after(async () => {
    });
})