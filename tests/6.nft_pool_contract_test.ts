import { provider, expect, getSigners, checkAccountsBalance, setGasLimit, delay} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsNftPool from './typed_contracts/constructors/my_nft_pool';
import ContractNftPool from './typed_contracts/contracts/my_nft_pool';

import ConstructorsTokenStandard from './typed_contracts/constructors/token_standard';
import ContractTokenStandard from './typed_contracts/contracts/token_standard';

import ContractNftContract from './typed_contracts/contracts/psp34_nft';

import ConstructorsInw from './typed_contracts/constructors/psp22_standard';
import ContractInw from './typed_contracts/contracts/psp22_standard';

import * as PSP34Args from './typed_contracts/types-arguments/psp34_nft';

import { BN } from '@polkadot/util';

describe('Nft pool contract test', () => {
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

    let nftContract: any;
    let nftCollectionAddress: string;
    let earningTokenAddress: string;
    let maxStakingAmount: string;
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

        // Step 3: Create staking nft pool contract
        nftCollectionAddress = "5H7v8XSTG3nshsNeo7AeriotMcGqwLM6kf9rcNHsrQqwAeYW"; // Praying Mantis Predators (PMP) Collection 
        nftContract = new ContractNftContract(nftCollectionAddress, defaultSigner, api);

        earningTokenAddress = tokenContractAddress; // Token1 address, name AAA
        maxStakingAmount = "1000";
        multiplier = "3000000000000"; // Scaled by 10 ** earning token decimal. Reward 3 earning token/ 1 staking token/ day
        duration = "7776000000";
        startTime = new Date().getTime(); 
        unstakeFee = "10000000000000"; // 10 INW          
        
        // "refTime: 709849174"
	    // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 1_400_000_000, 36_000);
        
        const contractFactory = new ConstructorsNftPool(api, defaultSigner);
        
        contractAddress = (
            await contractFactory.new(
                defaultSigner.address,
                inwContractAddress,
                nftCollectionAddress,
                tokenContractAddress,
                maxStakingAmount,
                multiplier,
                duration,
                startTime,
                unstakeFee,
                {gasLimit}
            )
        ).address;

        // console.log("contractAddress =", contractAddress);

        contract = new ContractNftPool(contractAddress, defaultSigner, api);    
        query = contract.query;
        tx = contract.tx;        
    };

    before(async () => {
        // console.log("Start");
        await setup();
    });
    
    it('Add reward, stake, claim, unstake work', async () => {
        // Step 1: Owner approves and topups reward pool
        let minRewardAmount = Math.floor(parseFloat(maxStakingAmount) * parseFloat(duration) * parseFloat(multiplier) / (24 * 60 * 60 * 1000));
        // console.log("minRewardAmount = ", minRewardAmount);

        await tokenContract.tx.approve(
            contractAddress,
            minRewardAmount.toString()
        );

        await tx.topupRewardPool(
            minRewardAmount.toString()
        );
        
        // let addedRewardAmountAft = (await query.rewardPool()).value.ok!.rawNumber.toString();  
        // console.log("addedRewardAmount after =", addedRewardAmountAft);
 
        let isTopupEnoughReward = (await query.isTopupEnoughReward()).value.ok!;
        // console.log("isTopupEnoughReward = ", isTopupEnoughReward);
        expect(isTopupEnoughReward).to.equal(true);
        
        // Step 2: Charlie - Default signer operates  
        // Stake

        const defaultSignerStakedTokenId = PSP34Args.IdBuilder.U64(12); // Nft id 12
        await nftContract.withSigner(defaultSigner).tx.approve(
            contractAddress,
            defaultSignerStakedTokenId,
            true
        );

        await contract.withSigner(defaultSigner).tx.stake(defaultSignerStakedTokenId);

        let stakeInfo = (await query.getStakeInfo(defaultSigner.address)).value.ok;

        expect(stakeInfo.stakedValue.toString()).to.equal("1");
        
        // Claim rewards
        await delay(3000);

        let defaultSignerTokenBalance = (await tokenContract.query.balanceOf(defaultSigner.address)).value.ok!.rawNumber.toString();
        // console.log("defaultSignerTokenBalance =", defaultSignerTokenBalance);

        await contract.withSigner(defaultSigner).tx.claimReward();

        stakeInfo = (await query.getStakeInfo(defaultSigner.address)).value.ok;
        // console.log("stakeInfo after claiming reward = ", stakeInfo);

        let defaultSignerTokenBalanceAft = (await tokenContract.query.balanceOf(defaultSigner.address)).value.ok!.rawNumber.toString();
        
        const gain = new BN(defaultSignerTokenBalanceAft).sub(new BN(defaultSignerTokenBalance));
        // console.log("gain =", gain.toString());
        expect(gain.cmp(new BN(0))).to.equal(1);

        // Unstake
        // defaultSigner mint INW, approve unstake fee in INW and unstake
        await inwContract.withSigner(defaultSigner).tx.mint(
            defaultSigner.address,
            unstakeFee,
        );
   
        await inwContract.withSigner(defaultSigner).tx.approve(
            contractAddress,
            unstakeFee
        );
    
        await contract.withSigner(defaultSigner).tx.unstake(defaultSignerStakedTokenId);

        let stakeInfoAftUnstaking = (await query.getStakeInfo(defaultSigner.address)).value.ok;
        // console.log("stakeInfoAftUnstaking = ", stakeInfoAftUnstaking);
        expect(stakeInfoAftUnstaking.stakedValue.toString()).to.equal("0");
    });

    after(async () => {
        // api.disconnect();
        // console.log("End");
    });
});