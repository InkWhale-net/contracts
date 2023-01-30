# Inkwhale API and BackEnd
- [Inkwhale API and BackEnd](#inkwhale-api-and-backend)
  - [APIs](#apis)
    - [Request to update data for token/staking pool/lp pool/nft pool](#request-to-update-data-for-tokenstaking-poollp-poolnft-pool)
    - [Get list of tokens](#get-list-of-tokens)
    - [Get list of LP pools](#get-list-of-lp-pools)
    - [Get LP pool by address](#get-lp-pool-by-address)
    - [Get LP pool by owner](#get-lp-pool-by-owner)
    - [Get list of staking pools](#get-list-of-staking-pools)
    - [Get pool by address](#get-pool-by-address)
    - [Get pool by owner](#get-pool-by-owner)
    - [Get NFT pools](#get-nft-pools)
    - [Get NFT pool by address](#get-nft-pool-by-address)
    - [Get NFT pool by owner](#get-nft-pool-by-owner)

## APIs

```
Git URL:<https://github.com/InkWhale-net/backend>  
IP:18.138.185.86   
Location: AWS Singapore
```

### Request to update data for token/staking pool/lp pool/nft pool 

```
/update
Method: POST
Inputs:
  poolContract:
    "new": find all items of the below type and update data
    other: address of item 
  type: "token"/"pool"/"lp"/"nft" - request type of item is token/staking pool/lp pool/nft pool  
```

### Get list of tokens 

```
/getTokens
Method: POST
Inputs:
  limit: how many tokens to get
  offset: where to start
  sort: 1 = ASC and -1 = DESC
``` 

### Get list of LP pools

```
/getLPPools
Method: POST
Inputs:
  limit: how many LP pools to get
  offset: where to start
  sort: 1 = ASC and -1 = DESC
  showZeroPool: true/false - get zero-reward LP pool or not
``` 

### Get LP pool by address

```
/getLPPoolByAddress
Method: POST
Inputs:
  poolContract: address of LP pool
``` 

### Get LP pool by owner

```
/getLPPoolByOwner
Method: POST
Inputs:
  owner: address of owner
``` 

### Get list of staking pools

```
/getPools
Method: POST
Inputs:
  limit: how many staking pools to get
  offset: where to start
  sort: 1 = ASC and -1 = DESC
  showZeroPool: true/false - get zero-reward staking pool or not
``` 

### Get pool by address

```
/getPoolByAddress
Method: POST
Inputs:
  poolContract: address of staking pool
``` 

### Get pool by owner

```
/getPoolByOwner
Method: POST
Inputs:
  owner: address of owner
``` 

### Get NFT pools

```
/getNFTPools
Method: POST
Inputs:
  limit: how many NFT pools to get
  offset: where to start
  sort: 1 = ASC and -1 = DESC
  showZeroPool: true/false - get zero-reward NFT pool or not
``` 

### Get NFT pool by address

```
/getNFTPoolByAddress
Method: POST
Inputs:
  poolContract: address of NFT pool
``` 

### Get NFT pool by owner

```
/getNFTPoolByOwner
Method: POST
Inputs:
  owner: address of owner
``` 
