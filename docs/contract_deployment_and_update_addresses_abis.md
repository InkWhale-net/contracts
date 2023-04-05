
# Contract deployment

## Build contracts

Contracts are built to run on Aleph Zero blockchain.

To build the contract:
1. Go to each contract folder. i.e. "contracts/token_sale"
2. Run the below command to build a contract:

```
cargo +nightly contract build --release" 
```
3. After building, we will have .contract and .json files in target/ink folder for each contract. We will use these file to deploy contracts, update addresses and abis in next steps. 

## Deloy contracts

1. Some contracts are related to other contracts, **use an account as a deloyment account (it will also be the admin account)** to deploy contracts in the following order:

   - token_sale
   - token_contract
   - token_generator
   - pool_contract
   - pool_generator
   - lp_pool_contract
   - lp_pool_generator
   - nft_pool_contract
   - nft_pool_generator

2. token_sale
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select my_psp22_sale.contract file in Upload Contract Bundle part and click Next
   - In Upload and Instantiate Contract
     - contractOwner: input deloyment account
     - cap: input cap of INW token , i.e. 1000000000
     - mintingFee: The price of INW in TZERO for public mint, i.e. 2
     - mintingCap: The cap for public mint, i.e. 100000000
     - name: Name of INW token, i.e. Ink Whale Token
     - symbol: Its symbol, i.e. INW
     - decimal: Its decimal, i.e. 12 
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from" 
  
3. token_contract
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select my_psp22.contract file in Upload Contract Bundle part and click Next 
   - In Upload and Instantiate Contract
     - mintTo: input deloyment account
     - totalSupply: totalSupply mint to address mintTo, i.e. 100000000
     - name: name of token, i.e. TEST
     - symbol: symbol of token, i.e. TEST
     - decimal: Its decimal, i.e. 12
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from" 
   - Open my_psp22.contract file and record its hash in the following part
   ```
    {"source":
        {"hash": "...",
         ...
        }
    } 
   ``` 
   i.e.
   ```
    {"source":
        {"hash":"0xdf0fc8c29fecf6e219084db71b1459e68fd5384ec7bfd550146e1cf7ffd3ad0d",
         ...
        }
    } 
   ``` 

4. token_generator
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select token_generator.contract file in Upload Contract Bundle part and click Next 
   - In Upload and Instantiate Contract
     - psp22Hash: input the hash of token_contract above, i.e. 0xdf0fc8c29fecf6e219084db71b1459e68fd5384ec7bfd550146e1cf7ffd3ad0d
     - walContract: input the address of INW token in the token_sale contract above, i.e. 5DVswx19dAJYAZhXTRVrnuzys5MPSs3z6fmQ8N9ZPgbmwUSg
     - creationFee: fee in TZERO to create new token, i.e. 4
     - ownerAddress: input deloyment account     
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from"

5. pool_contract
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select my_pool.contract file in Upload Contract Bundle part and click Next 
   - In Upload and Instantiate Contract
     - contractOwner: input deloyment account
     - walContract: input the address of INW token in the token_sale contract above
     - psp22ContractAddress: input the above token_contract address
     - apy: apy is scaled with 10000. i.e. 500 ~ 5%
     - duration: duration in milisecond, i.e. 2592000000 ~ 30 days
     - startTime: input current time in milisecond, i.e. 1680679487000
     - unstakeFee: in TZERO, i.e. 12
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from"
   - Open my_pool.contract file and record its hash in the similar way with token_contract above
  
6. pool_generator
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select pool_generator.contract file in Upload Contract Bundle part and click Next 
   - In Upload and Instantiate Contract
     - poolHash: input the hash of pool_contract above, i.e. 0x910fdb7f21be35dd7e5e85065130d86b12c30c0572434c7dfc01118e6aa1cdb1
     - walContract: input the address of INW token in the token_sale contract above
     - creationFee: creation fee in TZERO, i.e. 6
     - unstakeFee: unstake fee in TZERO, i.e. 12
     - ownerAddress: input deloyment account
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from"

7. lp_pool_contract
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select my_lp_pool.contract file in Upload Contract Bundle part and click Next 
   - In Upload and Instantiate Contract
     - contractOwner: input deloyment account
     - walContract: input the address of INW token in the token_sale contract above
     - lpContractAddress: input token_contract address above
     - psp22ContractAddress: input token_contract address above
     - multiplier: number of lp token per day as rewards scaled with 10**6, i.e. 5000000 ~ reward 5 lp token/day
     - duration: duration in milisecond, i.e. 5184000000 ~ 30 days
     - startTime: input current time in milisecond, i.e. 1680684231000 
     - unstakeFee: in TZERO, i.e. 16
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from"
   - Open my_lp_pool.contract file and record its hash in the similar way with token_contract above

8. lp_pool_generator
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select lp_pool_generator.contract file in Upload Contract Bundle part and click Next 
   - In Upload and Instantiate Contract
     - poolHash: input the hash of lp_pool_contract above, i.e. 
     - walContract: input the address of INW token in the token_sale contract above
     - creationFee: creation fee in TZERO, i.e. 8
     - unstakeFee: unstake fee in TZERO, i.e. 16
     - ownerAddress: input deloyment account
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from"

9. nft_pool_contract
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select my_nft_pool.contract file in Upload Contract Bundle part and click Next 
   - In Upload and Instantiate Contract
     - contractOwner: input deloyment account
     - walContract: input the address of INW token in the token_sale contract above
     - psp34ContractAddress: any psp34 address, i.e. the PMP PSP34 contract address of Artzero, 5H7v8XSTG3nshsNeo7AeriotMcGqwLM6kf9rcNHsrQqwAeYW
     - psp22ContractAddress: input token_contract address above
     - multiplier: number of psp22 token per day in TZERO as rewards, i.e. 4 ~ 4 psp22 token/day 
     - duration: duration in milisecond, i.e. 2592000000 ~ 30 days
     - startTime: input current time in milisecond, i.e. 1680687837000
     - unstakeFee: 20
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from"
   - Open my_nft_pool.contract file and record its hash in the similar way with token_contract above

10. nft_pool_generator
   - In contract UI, go to Add New Contract / Upload New Contract Code, choose deployment account for Account part and select nft_pool_generator.contract file in Upload Contract Bundle part and click Next 
   - In Upload and Instantiate Contract
     - poolHash: input the hash of nft_pool_contract above, i.e. 0x22ec1e9629f824dd86cc5e484c74bb1aa9cbe9ff6352b6da6ea60815e66b2590
     - walContract: input the address of INW token in the token_sale contract above
     - creationFee: creation fee in TZERO, i.e. 10
     - unstakeFee: unstake fee in TZERO, i.e. 20
     - ownerAddress: input deloyment account
   - Click Next / Upload and Instantiate to upload the contract
   - Record contract address in the part "You instantiated this contract ... from" 

# Update addresses and abis for FE

Use json files and contract addresses in the contract deployment part to create abi files for FE  

