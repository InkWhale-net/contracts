import { provider, expect, getSigners, checkAccountsBalance, setGasLimit, delay} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsLpPool from './typed_contracts/constructors/my_lp_pool';
import ContractLpPool from './typed_contracts/contracts/my_lp_pool';

import ContractTokenContract from './typed_contracts/contracts/my_psp22';
import ContractWalContract from './typed_contracts/contracts/my_psp22_sale';

import myPsp22 from './artifacts/my_psp22.json'; 

import { BN } from '@polkadot/util';

describe('Lp pool contract test', () => {
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
    let stakingTokenContract: any;
    let earningTokenContract: any;

    let walContractAddress: string;
    let stakingTokenAddress: string;
    let earningTokenAddress: string;
    let multiplier: string;
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

        walContractAddress = "5FKxWQhAwpmkZG9gUDZKwGDeUuhjKkzMaCcs8qcWXJ5vegyd"; // INW contract address
        stakingTokenAddress = "5CxpxW9V6RnYhkZdfBk1GoFNAS3U7SDbRC2oHpazP2V8LxMd"; // Token2 address, name XYZ
        earningTokenAddress = "5DeopAuxKedXM7YrYrN6NJWU3oykFYLaMJGbWCJPnvXTEW7S"; // Token1 address, name AAA
        multiplier = "3000000"; // Scaled by 10^6. Reward 3 earning token/ 1 staking token/ day
        duration = "7776000000";
        startTime = new Date().getTime(); 
        unstakeFee = "10000000000000"; // 10 INW          
             
        let gasLimit = setGasLimit(api, 1_200_000_000, 0);
        
        const contractFactory = new ConstructorsLpPool(api, defaultSigner);
        
        contractAddress = (
            await contractFactory.new(
                defaultSigner.address,
                walContractAddress,
                stakingTokenAddress,
                earningTokenAddress,
                multiplier,
                duration,
                startTime,
                unstakeFee,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractLpPool(contractAddress, defaultSigner, api);    
        query = contract.query;
        tx = contract.tx;

        stakingTokenContract = new ContractTokenContract(stakingTokenAddress, defaultSigner, api);
        earningTokenContract = new ContractTokenContract(earningTokenAddress, defaultSigner, api);
        
        walContract = new ContractWalContract(walContractAddress, defaultSigner, api);
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Add reward, stake, claim, unstake work', async () => {
        // Alice approves and topups reward
        let rewardAmount = "1000000000000000" // 1000 earning token (AAA)
        // Approve
        await earningTokenContract.withSigner(alice).tx.approve(
            contractAddress,
            rewardAmount
        );

        // Topup
        await contract.withSigner(alice).tx.topupRewardPool(rewardAmount);
        
        let addedRewardAmountAft = (await query.rewardPool()).value.ok!.rawNumber.toString();  
        // console.log("addedRewardAmount after =", addedRewardAmountAft);
 
        // Bob operates  
        // Stake
        let bobStakeAmount = "100000000000000"; // 100 staking token
        await stakingTokenContract.withSigner(bob).tx.approve(
            contractAddress,
            bobStakeAmount
        );

        await contract.withSigner(bob).tx.stake(bobStakeAmount);

        let stakeInfo = (await query.getStakeInfo(bob.address)).value.ok;
        // console.log("stakeInfo = ", stakeInfo);

        expect(stakeInfo.stakedValue.toString()).to.equal(bobStakeAmount);
        
        // Claim rewards
        await delay(3000);

        let bobTokenBalance = (await earningTokenContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();
        // console.log("bobTokenBalance =", bobTokenBalance);

        await contract.withSigner(bob).tx.claimReward();

        stakeInfo = (await query.getStakeInfo(bob.address)).value.ok;
        // console.log("stakeInfo after claiming reward = ", stakeInfo);

        let bobTokenBalanceAft = (await earningTokenContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();
        
        const gain = new BN(bobTokenBalanceAft).sub(new BN(bobTokenBalance));
        // console.log("gain =", gain.toString());
        expect(gain.cmp(new BN(0))).to.equal(1);

        // Unstake
        // Bob public mint INW, approve unstake fee in INW and unstake
        let mintingFee = (await walContract.query.mintingFee()).value.ok!.rawNumber.toString();
        let fee = new BN(unstakeFee).div(new BN(10 ** 12)).mul(new BN(mintingFee));
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