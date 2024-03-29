import { provider, expect, getSigners, checkAccountsBalance, setGasLimit, delay} from './helpers';
import { ApiPromise } from '@polkadot/api';

import ConstructorsNftPool from './typed_contracts/constructors/my_nft_pool';
import ContractNftPool from './typed_contracts/contracts/my_nft_pool';

import ContractTokenContract from './typed_contracts/contracts/my_psp22';
import ContractNftContract from './typed_contracts/contracts/psp34_nft';
import ContractWalContract from './typed_contracts/contracts/my_psp22_sale';

import * as PSP34Args from './typed_contracts/types-arguments/psp34_nft';

import { BN } from '@polkadot/util';

describe('Nft pool contract test', () => {
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
    let nftContract: any;
    let earningTokenContract: any;

    let walContractAddress: string;
    let nftCollectionAddress: string;
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

        walContractAddress = "5GiYkqRjQ5JXSvHzYwQZh9RHSrpqq6yPhCewPnpNbCBt2Psq"; // INW contract address
        nftCollectionAddress = "5H7v8XSTG3nshsNeo7AeriotMcGqwLM6kf9rcNHsrQqwAeYW"; // Praying Mantis Predators (PMP) Collection 
        earningTokenAddress = "5CbcaQLoCu8ZFX7tLHCgzW8LKVTcwYw79Z3sxEecCqCz5b8c"; // Token1 address, name AAA
        multiplier = "3000000000000"; // Scaled by 10 ** earning token decimal. Reward 3 earning token/ 1 staking token/ day
        duration = "7776000000";
        startTime = new Date().getTime(); 
        unstakeFee = "20000000000000"; // 20 INW          
        
        // "refTime: 709849174"
	    // "proofSize: 17408"
        let gasLimit = setGasLimit(api, 1_400_000_000, 36_000);
        
        const contractFactory = new ConstructorsNftPool(api, defaultSigner);
        
        contractAddress = (
            await contractFactory.new(
                defaultSigner.address,
                walContractAddress,
                nftCollectionAddress,
                earningTokenAddress,
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

        nftContract = new ContractNftContract(nftCollectionAddress, defaultSigner, api);
        earningTokenContract = new ContractTokenContract(earningTokenAddress, defaultSigner, api);
        
        walContract = new ContractWalContract(walContractAddress, defaultSigner, api);
    };

    before(async () => {
        console.log("Start");
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
 
        // Charlie - Default signer operates  
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

        let defaultSignerTokenBalance = (await earningTokenContract.query.balanceOf(defaultSigner.address)).value.ok!.rawNumber.toString();
        // console.log("defaultSignerTokenBalance =", defaultSignerTokenBalance);

        await contract.withSigner(defaultSigner).tx.claimReward();

        stakeInfo = (await query.getStakeInfo(defaultSigner.address)).value.ok;
        // console.log("stakeInfo after claiming reward = ", stakeInfo);

        let defaultSignerTokenBalanceAft = (await earningTokenContract.query.balanceOf(defaultSigner.address)).value.ok!.rawNumber.toString();
        
        const gain = new BN(defaultSignerTokenBalanceAft).sub(new BN(defaultSignerTokenBalance));
        // console.log("gain =", gain.toString());
        expect(gain.cmp(new BN(0))).to.equal(1);

        // Unstake
        // defaultSigner public mint INW, approve unstake fee in INW and unstake
        let mintingFee = (await walContract.query.mintingFee()).value.ok!.rawNumber.toString();
        let fee = new BN(unstakeFee).mul(new BN(mintingFee)).div(new BN(10 ** 12));
        await walContract.withSigner(defaultSigner).tx.publicMint(
            unstakeFee,
            {value: fee.toString()}
        );
   
        await walContract.withSigner(defaultSigner).tx.approve(
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