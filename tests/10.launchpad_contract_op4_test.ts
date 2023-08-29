import {checkAccountsBalance, expect, getSigners, provider, setGasLimit} from "./helpers";
import {ApiPromise} from "@polkadot/api";

import ConstructorsInw from "./typed_contracts/constructors/psp22_standard_op4";
import ContractInw from "./typed_contracts/contracts/psp22_standard_op4";

import ConstructorsTokenGenerator from "./typed_contracts/constructors/token_generator";
import ContractTokenGenerator from "./typed_contracts/contracts/token_generator";

import TokenStandard from "./artifacts/token_standard_op4.json";

import ConstructorsLaunchpadGenerator from "./typed_contracts/constructors/launchpad_generator_op4";
import ContractLaunchpadGenerator from "./typed_contracts/contracts/launchpad_generator_op4";

import MyLaunchpad from "./artifacts/my_launchpad_op4.json";
import ContractMyLaunchpad from "./typed_contracts/contracts/my_launchpad_op4";

import ConstructorsTokenStandard from "./typed_contracts/constructors/token_standard_op4";
import ContractTokenStandard from "./typed_contracts/contracts/token_standard_op4";

const refTime = 40_000_000_000; // 256_000_000_000
const proofSize = 70_000;              // 5_000_000_000_000

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

    let projectInfoUri;
    let phaseName;
    let startTime;
    let phaseStartTime;
    let phaseEndTime;
    let phaseImmediateReleaseRate;
    let phaseVestingDuration;
    let phaseVestingUnit;
    let phaseIsPublic;
    let phasePublicAmount;
    let phasePublicPrice;

    async function setup() {
        api = await ApiPromise.create({ provider });
        let gasLimit = setGasLimit(api, refTime, proofSize);
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
        const inwContractFactory = new ConstructorsInw(api, defaultSigner);
        inwContractAddress = (
            await inwContractFactory.new(
                inwCap,
                inwName,
                inwSymbol,
                inwDecimal,
                {gasLimit: gasLimit}
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
        const tokenContractFactory = new ConstructorsTokenStandard(api, alice);
        tokenContractAddress = (
            await tokenContractFactory.new(
                alice.address,
                alice.address,
                cap,
                name,
                symbol,
                decimal,
                {gasLimit: gasLimit}
            )
        ).address;

        // Step 3: Create a launchpad generator contract
        console.log(`===========Create new launchpadContractAddress=============`);
        launchpadHash = MyLaunchpad.source.hash;
        creationFee = "4000000000000";  // 4 INW
        txRate = 500;                   // 500 INW
        adminAddress = defaultSigner.address;
        const lpgContractFactory = new ConstructorsLaunchpadGenerator(api, defaultSigner);
        lpgContractAddress = (
            await lpgContractFactory.new(
                launchpadHash,
                inwContractAddress,
                creationFee,
                txRate,
                adminAddress,
                {gasLimit: gasLimit}
            )
        ).address;
        console.log({lpgContractAddress: lpgContractAddress});
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
        let tokenContract = new ContractTokenStandard(tokenContractAddress, alice, api);
        await tokenContract.withSigner(alice).tx.approve(lpgContractAddress, totalSupply);

        // Step B4: Alice creates launchpad for token LNPD
        console.log(`===========Step B4=============`);
        projectInfoUri = "Launchpad test"; // 1000 token AAA
        phaseName = ["Phase 1", "Phase 2"];
        startTime = new Date().getTime() + 10000; // now + 10s
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
        let lpContractAddress = (await lpgQuery.getLaunchpadById(1)).value.ok;
        console.log({lpContractAddress: lpContractAddress});

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
        // Case 1: newTotalSupply is 500k -> will fail because public sale uses 600k 
        // let newTotalSupply = "500000000000000000"; 

        // Case 2: newTotalSupply is 650k < the original 700k, don't need to approve 
        let receivedOwner = (await lpQuery.owner()).value.ok;
        console.log({receivedOwner: receivedOwner});

        let receivedTotalSupply = (await lpQuery.getTotalSupply()).value.ok;
        console.log({receivedTotalSupply: receivedTotalSupply.toString()});

        let receivedAvailableTokenAmount = (await lpQuery.getAvailableTokenAmount()).value.ok;
        console.log({receivedAvailableTokenAmount: receivedAvailableTokenAmount.toString()});

        let receivedProjectStartTime = (await lpQuery.getProjectStartTime()).value.ok;
        console.log({receivedProjectStartTime: receivedProjectStartTime.toString()});

        console.log({currentTime: new Date().getTime()});
        
        let newTotalSupply = "650000000000000000"; 
        await lpContract.tx.setTotalSupply(newTotalSupply);        
        // .withSigner(alice)
        // let receivedNewTotalSupply = (await lpQuery.getTotalSupply()).value.ok;
        // console.log({receivedNewTotalSupply: receivedNewTotalSupply.toString()});

        // Case 3: newTotalSupply is 700k
        // newTotalSupply = "700000000000000000";        

    })

    after(async () => {
    });
})