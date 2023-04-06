
- [Contract deployment](#contract-deployment)
  - [Build contracts](#build-contracts)
  - [Deloy contracts](#deloy-contracts)
- [Update addresses and abis for FE](#update-addresses-and-abis-for-fe)
- [Update addresses and abis for BE](#update-addresses-and-abis-for-be)

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

1. azt_contract.js
   - Copy metadata json file of token_sale to a place and change name to azt_contract.js
   - Open azt_contract.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const azt_contract = {
         CONTRACT_ADDRESS: "Address of the azt_contract contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const azt_contract = {
         CONTRACT_ADDRESS: "5DVswx19dAJYAZhXTRVrnuzys5MPSs3z6fmQ8N9ZPgbmwUSg",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of azt_contract.js 
     ```
      };

      export default azt_contract;
     ``` 

2. psp22_contract.js
   - Copy metadata json file of token_contract to a place and change name to psp22_contract.js
   - Open psp22_contract.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const psp22_contract = {
         CONTRACT_ADDRESS: "Address of the psp22_contract contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const psp22_contract = {
         CONTRACT_ADDRESS: "5ERKJQLnfTDUYDPqDQu8YSwt9y2XS2GMQ8hwhZ6Y2L2ECSBm",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of psp22_contract.js 
     ```
      };

      export default psp22_contract;
     ``` 

3. core_contract.js
   - Copy metadata json file of token_generator to a place and change name to core_contract.js
   - Open core_contract.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const core_contract = {
         CONTRACT_ADDRESS: "Address of the core_contract contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const core_contract = {
         CONTRACT_ADDRESS: "5HKkHC3NfJLeySHdjFuEMmDQgHKxtLGoWJMw78DFvgT8y9hS",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of core_contract.js 
     ```
      };

      export default core_contract;
     ``` 

4. pool_contract.js
   - Copy metadata json file of pool_contract to a place and change name to pool_contract.js
   - Open pool_contract.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const pool_contract = {
         CONTRACT_ADDRESS: "Address of the pool_contract contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const pool_contract = {
         CONTRACT_ADDRESS: "5ESCyq24S7EGdqgfmDXriSQpL3GAi2bhaRvofRCcjP45HuT3",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of pool_contract.js 
     ```
      };

      export default pool_contract;
     ``` 

5. pool_generator.js
   - Copy metadata json file of pool_generator to a place and change name to pool_generator.js
   - Open pool_generator.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const pool_generator_contract = {
         CONTRACT_ADDRESS: "Address of the pool_generator contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const pool_generator_contract = {
         CONTRACT_ADDRESS: "5CE1KDXicdpFwUxzcxP7QJzvcJnpV5d6ATRwzumyr5Dg1PNo",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of pool_generator.js 
     ```
      };

      export default pool_generator_contract;
     ``` 

6. lp_pool_contract.js
   - Copy metadata json file of lp_pool_contract to a place and change name to lp_pool_contract.js
   - Open lp_pool_contract.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const lp_pool_contract = {
         CONTRACT_ADDRESS: "Address of the lp_pool contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const lp_pool_contract = {
         CONTRACT_ADDRESS: "5CJpYhjrtMB99UGLWnh8zxFDSQTX1MezDRsfTTbGnb7jZAbA",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of lp_pool_contract.js 
     ```
      };

      export default lp_pool_contract;
     ``` 

7. lp_pool_generator_contract.js
   - Copy metadata json file of lp_pool_generator to a place and change name to lp_pool_generator_contract.js
   - Open lp_pool_generator_contract.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const lp_pool_generator_contract = {
         CONTRACT_ADDRESS: "Address of the lp_pool_generator contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const lp_pool_generator_contract = {
         CONTRACT_ADDRESS: "5HC5oYauQ76SDqBq417iBbSir3c9ungYUs9Rfiiwd1a8UcFB",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of lp_pool_generator_contract.js 
     ```
      };

      export default lp_pool_generator_contract;
     ``` 

8. nft_pool_contract.js
   - Copy metadata json file of nft_pool_contract to a place and change name to nft_pool_contract.js
   - Open nft_pool_contract.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const nft_pool_contract = {
         CONTRACT_ADDRESS: "Address of the nft_pool_contract contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const nft_pool_contract = {
         CONTRACT_ADDRESS: "5Ep7DjpCp1DLXmX1JKgNyJdxLE23sGeJybw6Feo31SnaBu5F",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of nft_pool_contract.js 
     ```
      };

      export default nft_pool_contract;
     ``` 

9. nft_pool_generator_contract.js
   - Copy metadata json file of nft_pool_generator to a place and change name to nft_pool_generator_contract.js
   - Open nft_pool_generator_contract.js and modify:
     ```
      {
         "source": {
     ```
     to 
     ```
      const nft_pool_generator_contract = {
         CONTRACT_ADDRESS: "Address of the nft_pool_generator contract",
         CONTRACT_ABI: {
            "source": {
     ``` 

     i.e.

     ```
      const nft_pool_generator_contract = {
         CONTRACT_ADDRESS: "5CGHT5oz7EADKiZL5Yx7FcbSNruGnmbvCFBHMS33xdwPrmu1",
         CONTRACT_ABI: {
            "source": {
     ``` 
   - Add at the end of nft_pool_generator_contract.js 
     ```
      };

      export default nft_pool_generator_contract;
     ``` 

10. psp34_standard.js
   - This file is copied from Artzero project to work with NFT PSP34 standard. It can be downloaded from this link https://drive.google.com/file/d/1NQoqS7ulR_v_k428pBofF2PMY6fihiFZ/view?usp=sharing.

11. Copy all js files we've created to src/utils/contracts of FE code
# Update addresses and abis for BE

Abi files for BE are stored in /contracts folder. They are nearly the same as js files for FE, we just do small adjustments as below.  

1. psp22.js
   - Copy psp22_contract.js from FE to a place and rename to psp22.js 
   - Modify the file:
     ```
      export default psp22_contract;
     ```
     to 
     ```
      module.exports = {
         psp22_contract:psp22_contract
      };
     ```

2. token_generator.js
   - Copy core_contract.js from FE to a place and rename to token_generator.js 
   - Modify the file:
     ```
      const core_contract = {
     ```
     to 
     ```
      const token_generator_contract = {
     ```   

     ```
      export default core_contract;
     ```
     to 
     ```
      module.exports = {
         token_generator_contract:token_generator_contract
      };
     ```

3. pool.js
   - Copy pool_contract.js from FE to a place and rename to pool.js 
   - Modify the file:
     ```
      export default pool_contract;
     ```
     to 
     ```
      module.exports = {
         pool_contract:pool_contract
      };
     ```

4. pool_generator.js
   - Copy pool_generator.js from FE to a place 
   - Modify the file:
     ```
      export default pool_generator_contract;
     ```
     to 
     ```
      module.exports = {
         pool_generator_contract:pool_generator_contract
      };
     ```

5. lp_pool.js
   - Copy lp_pool_contract.js from FE to a place and rename to lp_pool.js
   - Modify the file:
     ```
      export default lp_pool_contract;
     ```
     to 
     ```
      module.exports = {
         lp_pool_contract:lp_pool_contract
      };
     ```

6. lp_pool_generator.js
   - Copy lp_pool_generator_contract.js from FE to a place and rename to lp_pool_generator.js
   - Modify the file:
     ```
      export default lp_pool_generator_contract;
     ```
     to 
     ```
      module.exports = {
         lp_pool_generator_contract:lp_pool_generator_contract
      };
     ```
   
7. nft_pool.js
   - Copy nft_pool_contract.js from FE to a place and rename to nft_pool.js
   - Modify the file:
     ```
      export default nft_pool_contract;
     ```
     to 
     ```
      module.exports = {
         nft_pool_contract:nft_pool_contract
      };
     ```

8. nft_pool_generator.js
   - Copy nft_pool_generator_contract.js from FE to a place and rename to nft_pool_generator.js
   - Modify the file:
     ```
      export default nft_pool_generator_contract;
     ```
     to 
     ```
      module.exports = {
         nft_pool_generator_contract:nft_pool_generator_contract
      };
     ```
     
9. Copy all ts files we've created to /contracts of BE code