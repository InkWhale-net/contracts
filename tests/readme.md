
## Introduction

This is the location of all files to test Ink Whale Contract using typechain-polkadot

Examples and information can be found at

https://github.com/Supercolony-net/typechain-polkadot (examples folder)
https://github.com/727-Ventures/openbrush-contracts/tree/main/tests/e2e


## Quick Guide:

1. Copy **.contract and .json** files from target/ink folders for each contract into **artifacts** folder
2. Rename **metadata.json** to **<contract_name>.json** to match .contract file
3. Run **npx @727-ventures/typechain-polkadot --in artifacts --out typed_contracts** to let typechain-polkadot convert ABI to typescript files
4. Import the files to .ts and start using
For example:
import Contract from "./typed_contracts/contracts/psp34_nft";
import Constructors from "./typed_contracts/constructors/psp34_nft";
5. Create test file in .ts
6. Run all tests **npm run test:mocha**

## Test Files
1. File "1.token_sale_test.ts": Test token sale contract (Contract for INW token)
2. File "2.token_contract_test.ts": Test token contract
3. File "3.token_generator_test.ts": Test token generator contract
4. File "4.pool_contract_test.ts": Test pool contract
5. File "5.pool_generator_test.ts": Test pool generator contract
6. File "6.lp_pool_contract_test.ts": Test lp pool contract
7. File "7.lp_pool_generator.ts": Test lp pool generator contract 
8. File "8.nft_pool_contract_test": Test nft pool contract
9. File "9.nft_pool_generator_test.ts": Test nft pool generator contract