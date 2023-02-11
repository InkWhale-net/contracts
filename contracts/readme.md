
## Introduction

This is the location of all Ink Whale contracts 

## Build contract

Contracts are built to run on Aleph Zero blockchain.

To build the contract:
1. Go to each contract folder. i.e. "token_sale"
2. As per the Compiling part of the doc https://docs.alephzero.org/aleph-zero/build/creating-your-first-contract and the Rust part of the link https://docs.alephzero.org/aleph-zero/build/installing-required-tools, run the below cargo +nightly command for each contract: 

```
cargo +nightly contract build --release" 
```