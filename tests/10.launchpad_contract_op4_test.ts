import {checkAccountsBalance, expect, getSigners, provider, setGasLimit} from "./helpers";
import {ApiPromise} from "@polkadot/api";

import ConstructorsInw from "./typed_contracts/constructors/psp22_standard_op4";
import ContractInw from "./typed_contracts/contracts/psp22_standard_op4";

import ConstructorsTokenGenerator from "./typed_contracts/constructors/token_generator";
import ContractTokenGenerator from "./typed_contracts/contracts/token_generator";
import TokenStandard from "./artifacts/token_standard_op4.json";

import ConstructorsLaunchpadGenerator from "./typed_contracts/constructors/launchpad_generator_op4";
import ContractLaunchpadGenerator from "./typed_contracts/contracts/launchpad_generator_op4";
import MyLaunchpad from "./artifacts/launchpad_contract_op4.json";

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

    let tgContractAddress: any; // Token generator
    let tgContract: any;
    let tgQuery: any;
    let tgTx: any;

    let tgPsp22Hash: string;
    let tgCreationFee: string;

    let launchpadContractAddress: any;
    let lpContract: any;
    let lpQuery: any;
    let lpTx: any;

    let launchpadHash: string;
    let creationFee: string;
    let launchpadFee: string;
    let txRate: number;
    let adminAddress: string;
    let tokenContractAddress: string;
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

        // Step 2-1: Create token generator contract
        console.log(`===========Create new tgContractAddress=============`);
        tgPsp22Hash = TokenStandard.source.hash;
        tgCreationFee = "3000000000000"; // 3 INW
        const tgContractFactory = new ConstructorsTokenGenerator(api, defaultSigner);
        tgContractAddress = (
            await tgContractFactory.new(
                tgPsp22Hash,
                inwContractAddress,
                tgCreationFee,
                defaultSigner.address,
                {gasLimit: gasLimit}
            )
        ).address;
        tgContract = new ContractTokenGenerator(tgContractAddress, defaultSigner, api);
        tgQuery = tgContract.query;
        tgTx = tgContract.tx;

        // Step 2-2: Create token contract
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
        const launchpadContractFactory = new ConstructorsLaunchpadGenerator(api, defaultSigner);
        launchpadContractAddress = (
            await launchpadContractFactory.new(
                launchpadHash,
                inwContractAddress,
                creationFee,
                txRate,
                adminAddress,
                {gasLimit: gasLimit}
            )
        ).address;
        lpContract = new ContractLaunchpadGenerator(launchpadContractAddress, defaultSigner, api);
        lpQuery = lpContract.query;
        lpTx = lpContract.tx;
    }

    before(async () => {
        await setup();
    });

    it('Can create launchpad', async () => {
        /// TODO: A. Use token generator to create a token
        // Step A1: Onwer mints tgCreationFee in INW to Alice
        // console.log(`===========Step A1=============`);
        // await inwContract.tx.mint(alice.address, tgCreationFee);
        // console.log({inwContract: inwContract.query});
        // console.log({alice: alice.address});
        // const x = await inwContract.query.balanceOf(alice.address);
        // console.log({x: x});

        // let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        // console.log({aliceBalance: aliceBalance});
        // expect(aliceBalance).to.equal(tgCreationFee);

        // Step A2: Alice approves tgCreationFee in INW for token generator contract
        // console.log(`===========Step A2: approve=============`);
        // await inwContract.withSigner(alice).tx.approve(tgContractAddress, tgCreationFee);

        /// TODO: B. Create launchpad
        // Step B1: Onwer mints creation fee in INW to Alice
        console.log(`===========Step B1=============`);
        await inwContract.tx.mint(alice.address, creationFee);
        let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        expect(aliceBalance).to.equal(creationFee);

        // Step B2: Alice approves creationFee in INW for launchpad generator contract
        console.log(`===========Step B2=============`);
        await inwContract.withSigner(alice).tx.approve(launchpadContractAddress, creationFee);

        // Step B3: Alice approves total supply of token and create a launchpad
        console.log(`===========Step B3=============`);
        let totalSupply = "700000000000000000"; // 700k
        let tokenContract = new ContractTokenStandard(tokenContractAddress, alice, api);
        await tokenContract.withSigner(alice).tx.approve(launchpadContractAddress, totalSupply);

        // Step B4: Alice creates launchpad for token LNPD
        console.log(`===========Step B4=============`);
        let projectInfoUri = "Launchpad test"; // 1000 token AAA
        let phaseName = ["Phase 1", "Phase 2"];
        let startTime = new Date().getTime();
        let phaseStartTime = [startTime, startTime + 4 * 86400000];
        let phaseEndTime = [startTime + 3 * 86400000, startTime + 5 * 86400000];
        let phaseImmediateReleaseRate = [500, 1500];
        let phaseVestingDuration = [1800000, 1800000];
        let phaseVestingUnit = [300000, 300000];
        let phaseIsPublic = [true, true];
        let phasePublicAmount = ["100000000000000000", "500000000000000000"];
        let phasePublicPrice = ["500000000000", "1000000000000"];
        await lpContract.withSigner(alice).tx.newLaunchpad(
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

        // Step B5: Check launchpad count
        console.log(`===========Step B5=============`);
        let launchpadCount = (await lpQuery.getLaunchpadCount()).value.ok;
        expect(launchpadCount).to.equal(1);
        let launchpad = (await lpQuery.getLaunchpadById(1)).value.ok;
        console.log("launchpad ", launchpad);
    })

    after(async () => {
    });
})