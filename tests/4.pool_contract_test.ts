import { provider, expect, getSigners, checkAccountsBalance, setGasLimit, delay} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsMyPool from './typed_contracts/constructors/my_pool';
import ContractMyPool from './typed_contracts/contracts/my_pool';

import ContractTokenContract from './typed_contracts/contracts/my_psp22';
import ContractWalContract from './typed_contracts/contracts/my_psp22_sale';

import myPsp22 from './artifacts/my_psp22.json'; 

import { BN } from '@polkadot/util';

describe('Pool contract test', () => {
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
    let tokenContract: any;

    let walContractAddress: string;
    let psp22ContractAddress: string;
    let apy: string;
    let duration: string;
    let startTime: number;
    let unstakeFee: string;

    async function setup() {
        api = await ApiPromise.create({ provider });

        signers = getSigners();
        defaultSigner = signers[2];
        alice = signers[0];
        bob = signers[1];

        await checkAccountsBalance(signers, api);

        walContractAddress = "5GiYkqRjQ5JXSvHzYwQZh9RHSrpqq6yPhCewPnpNbCBt2Psq"; // INW contract address
        psp22ContractAddress = "5CbcaQLoCu8ZFX7tLHCgzW8LKVTcwYw79Z3sxEecCqCz5b8c"; // AAA token 
        apy = "2000"; // 20%. Scaled by 100
        duration = "5184000000"; // 60 days
        startTime = new Date().getTime(); // Current time
        unstakeFee = "12000000000000"; // 12 INW      
        
        // "refTime: 640544751"
        // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 1_400_000_000, 36_000);
        
        const contractFactory = new ConstructorsMyPool(api, defaultSigner);
        
        contractAddress = (
            await contractFactory.new(
                defaultSigner.address,
                walContractAddress,
                psp22ContractAddress,
                apy,
                duration,
                startTime,
                unstakeFee,
                {gasLimit}
            )
        ).address;

        console.log("contractAddress =", contractAddress);

        contract = new ContractMyPool(contractAddress, defaultSigner, api);    
        query = contract.query;
        tx = contract.tx;

        tokenContract = new ContractTokenContract(psp22ContractAddress, defaultSigner, api);
        walContract = new ContractWalContract(walContractAddress, defaultSigner, api);
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Add reward, stake, claim, unstake work', async () => {
        // Faucet 1000 token for Bob if needed
        let bobTokenBalance = (await tokenContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();
        // console.log("bobTokenBalance ", bobTokenBalance);

        if (new BN(bobTokenBalance).cmp(new BN("100000000000000")) == -1) { // Compare with 100 token
            await tokenContract.withSigner(bob).tx.faucet(); 
        
            bobTokenBalance = (await tokenContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();
            // console.log("bobTokenBalanceAft = ", bobTokenBalance);
        }        

        // Alice approves and topups reward
        let rewardAmount = "1000000000000000" // 1000 token
        // Approve
        await tokenContract.withSigner(alice).tx.approve(
            contractAddress,
            rewardAmount
        );

        // Topup
        await contract.withSigner(alice).tx.topupRewardPool(rewardAmount);
        
        let addedRewardAmountAft = (await query.rewardPool()).value.ok!.rawNumber.toString();  
        // console.log("addedRewardAmount after =", addedRewardAmountAft);
 
        // Bob operates  
        // Stake
        let bobStakeAmount = "100000000000000"; // 100 Token
        await tokenContract.withSigner(bob).tx.approve(
            contractAddress,
            bobStakeAmount
        );

        await contract.withSigner(bob).tx.stake(bobStakeAmount);

        let stakeInfo = (await query.getStakeInfo(bob.address)).value.ok;
        // console.log("stakeInfo = ", stakeInfo);

        expect(stakeInfo.stakedValue.toString()).to.equal(bobStakeAmount);
        
        // Claim rewards
        await delay(3000);

        bobTokenBalance = (await tokenContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();
        await contract.withSigner(bob).tx.claimReward();
        stakeInfo = (await query.getStakeInfo(bob.address)).value.ok;
        // console.log("stakeInfo after claiming reward = ", stakeInfo);

        let bobTokenBalanceAft = (await tokenContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();
        
        const gain = new BN(bobTokenBalanceAft).sub(new BN(bobTokenBalance));
        // console.log("gain =", gain.toString());
        expect(gain.cmp(new BN(0))).to.equal(1);

        // Unstake
        // Bob public mint INW, approve unstake fee in INW and unstake
        let mintingFee = (await walContract.query.mintingFee()).value.ok!.rawNumber.toString();
        let fee = new BN(unstakeFee).div(new BN(10 ** 12)).mul(new BN(mintingFee));
        console.log("mintingFee = ", mintingFee);
        console.log("fee = ", fee.toString());
        await walContract.withSigner(bob).tx.publicMint(
            unstakeFee,
            {value: fee.toString()}
        );

        await walContract.withSigner(bob).tx.approve(
            contractAddress,
            unstakeFee
        )

        let bobUnstakeAmount = "40000000000000"; // 40 Token
        await contract.withSigner(bob).tx.unstake(bobUnstakeAmount);

        let stakeInfoAftUnstaking = (await query.getStakeInfo(bob.address)).value.ok;
        // console.log("stakeInfo = ", stakeInfoAftUnstaking);
        expect(stakeInfoAftUnstaking.stakedValue.toString()).to.equal(new BN(bobStakeAmount).sub(new BN(bobUnstakeAmount)).toString());
    });

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});