import {checkAccountsBalance, expect, getSigners, provider, setGasLimit} from "./helpers";
import {ApiPromise} from "@polkadot/api";
import ConstructorsInw from "./typed_contracts/constructors/psp22_standard";
import ContractInw from "./typed_contracts/contracts/psp22_standard";
import TokenStandard from "./artifacts/token_standard.json";
import ConstructorsTokenGenerator from "./typed_contracts/constructors/token_generator";
import ContractTokenGenerator from "./typed_contracts/contracts/token_generator";
import MyLaunchpad from "./artifacts/my_launchpad.json";
import ConstructorsLaunchpadGenerator from "./typed_contracts/constructors/launchpad_generator";
import ContractLaunchpadGenerator from "./typed_contracts/contracts/launchpad_generator";
import ContractTokenStandard from "./typed_contracts/contracts/token_standard";

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
        tgPsp22Hash = TokenStandard.source.hash;
        tgCreationFee = "3000000000000"; // 3 INW
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
        tgContract = new ContractTokenGenerator(tgContractAddress, defaultSigner, api);
        tgQuery = tgContract.query;
        tgTx = tgContract.tx;

        // Step 3: Create a launchpad generator contract
        launchpadHash = MyLaunchpad.source.hash;
        creationFee = "4000000000000"; // 4 INW
        txRate = 500; // 8 INW
        adminAddress = defaultSigner.address;
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
        contract = new ContractLaunchpadGenerator(contractAddress, defaultSigner, api);
        query = contract.query;
        tx = contract.tx;
    }

    before(async () => {
        await setup();
    });

    it('Can create launchpad', async () => {
        /// TODO: A. Use token generator to create a token
        // Step A1: Onwer mints tgCreationFee in INW to Alice
        await inwContract.tx.mint(
            alice.address,
            tgCreationFee
        );
        let aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        expect(aliceBalance).to.equal(tgCreationFee);

        // Step A2: Alice approves tgCreationFee in INW for token generator contract
        await inwContract.withSigner(alice).tx.approve(
            tgContractAddress,
            tgCreationFee,
        );

        // Step A3: Alice creates their tokens, check if INW is burnt after creating token
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
        expect(+tgContractBalance).to.equal(0);
        aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        expect(+aliceBalance).to.equal(0);

        // Step A4: Check token count
        let tokenCount = (await tgQuery.getTokenCount()).value.ok;
        expect(tokenCount).to.equal(1);
        let tokenAddress = (await tgQuery.getTokenContractAddress(1)).value.ok;
        let tokenContract = new ContractTokenStandard(tokenAddress, alice, api);

        /// TODO: B. Create launchpad
        // Step B1: Onwer mints creation fee in INW to Alice
        await inwContract.tx.mint(
            alice.address,
            creationFee
        );
        aliceBalance = (await inwContract.query.balanceOf(alice.address)).value.ok!.rawNumber.toString();
        expect(aliceBalance).to.equal(creationFee);

        // Step B2: Alice approves creationFee in INW for launchpad generator contract
        await inwContract.withSigner(alice).tx.approve(
            contractAddress,
            creationFee,
        );

        // Step B3: Alice approves total supply of token and create a launchpad
        // Alice approve total supply of token
        let totalSupply = "700000000000000000"; // 700k
        await tokenContract.withSigner(alice).tx.approve(
            contractAddress,
            totalSupply,
        );

        // Step B4: Alice creates launchpad for token LNPD
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
        await contract.withSigner(alice).tx.newLaunchpad(
            projectInfoUri,
            tokenAddress,
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
        let launchpadCount = (await query.getLaunchpadCount()).value.ok;
        expect(launchpadCount).to.equal(1);
        let launchpad = (await query.getLaunchpadById(1)).value.ok;
        console.log("launchpad ", launchpad);
    })

    after(async () => {
    });
})