import { provider, expect, getSigners, checkAccountsBalance, setGasLimit, delay} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsMyPool from './typed_contracts/constructors/my_pool';
import ContractMyPool from './typed_contracts/contracts/my_pool';

import ConstructorsTokenStandard from './typed_contracts/constructors/token_standard';
import ContractTokenStandard from './typed_contracts/contracts/token_standard';

import ConstructorsInw from './typed_contracts/constructors/psp22_standard';
import ContractInw from './typed_contracts/contracts/psp22_standard';

import { BN } from '@polkadot/util';

describe('Pool contract test', () => {
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

    let tokenContractAddress: any;
    let tokenContract: any;
    let tokenQuery: any;
    let tokenTx: any;

    let tokenMintTo; 
    let tokenCap;
    let tokenName;
    let tokenSymbol; 
    let tokenDecimal;

    let contractAddress: any;
    let contract: any;
    let query: any;
    let tx: any;

    let psp22ContractAddress: string;
    let maxStakingAmount: string;
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

        // Step 2: Create a token contract
        tokenMintTo = defaultSigner;
        tokenCap = "200000000000000000000"; // 200M
        tokenName = "AAA";
        tokenSymbol = "AAA";
        tokenDecimal = 12;      
        
        // "refTime: 599049714"
        // "proofSize: 19456"
        let tokenGasLimit = setGasLimit(api, 1_200_000_000, 40_000);
        
        const tokenContractFactory = new ConstructorsTokenStandard(api, defaultSigner);
        
        tokenContractAddress = (
            await tokenContractFactory.new(
                defaultSigner.address,
                tokenMintTo.address,
                tokenCap,
                tokenName as unknown as string[],
                tokenSymbol as unknown as string[],
                tokenDecimal,
                {gasLimit: tokenGasLimit}
            )
        ).address;

        // console.log("tokenContractAddress =", tokenContractAddress);

        tokenContract = new ContractTokenStandard(tokenContractAddress, defaultSigner, api);    
        tokenQuery = tokenContract.query;
        tokenTx = tokenContract.tx;

        // Step 3: Create staking pool contract
        psp22ContractAddress = tokenContractAddress; // AAA token 
        apy = "1000"; // 10%. Scaled by 100
        maxStakingAmount = "1000000000000000"; // 1000 AAA token       
        duration = "5184000000"; // 60 days
        startTime = new Date().getTime(); // Current time
        unstakeFee = "8000000000000"; // 8 INW      
        
        // "refTime: 640544751"
        // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 1_400_000_000, 36_000);
        
        const contractFactory = new ConstructorsMyPool(api, defaultSigner);
        
        contractAddress = (
            await contractFactory.new(
                defaultSigner.address,
                inwContractAddress,
                psp22ContractAddress,
                maxStakingAmount,
                apy,
                duration,
                startTime,
                unstakeFee,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractMyPool(contractAddress, defaultSigner, api);    
        query = contract.query;
        tx = contract.tx;

        tokenContract = new ContractTokenStandard(psp22ContractAddress, defaultSigner, api);
        inwContract = new ContractInw(inwContractAddress, defaultSigner, api);        
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Add reward, stake, claim, unstake work', async () => {
        // Step 1: Owner approves and topups reward pool
        let minRewardAmount = Math.floor(parseFloat(maxStakingAmount) * parseFloat(duration) * parseFloat(apy) / (365 * 24 * 60 * 60 * 1000 * 10000));
        // console.log("minRewardAmount = ", minRewardAmount);

        await tokenContract.tx.approve(
            contractAddress,
            minRewardAmount
        );

        await tx.topupRewardPool(
            minRewardAmount
        );

        // let addedRewardAmountAft = (await query.rewardPool()).value.ok!.rawNumber.toString();  
        // console.log("addedRewardAmount after =", addedRewardAmountAft);

        let isTopupEnoughReward = (await query.isTopupEnoughReward()).value.ok!;
        // console.log("isTopupEnoughReward = ", isTopupEnoughReward);
        expect(isTopupEnoughReward).to.equal(true);
        
        // Step 2: Owner transfer for Bob 100 token AAA
        let bobStakeAmount = "100000000000000"; // 100 Token 
        await tokenContract.tx.transfer(
            bob.address,
            bobStakeAmount,
            []
        );            

        let bobTokenBalance = (await tokenContract.query.balanceOf(bob.address)).value.ok!.rawNumber.toString();
        // console.log("bobTokenBalance ", bobTokenBalance);
              
        // Step 3: Bob stakes, claims reward, unstakes  
        // Stake        
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
        // Owner mint INW for Bob, Bob approves unstake fee in INW and unstake
        await inwContract.tx.mint(
            bob.address,
            unstakeFee
        );

        await inwContract.withSigner(bob).tx.approve(
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