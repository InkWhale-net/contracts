#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp22_sale {
    use openbrush::{
        contracts::ownable::*,
        contracts::psp22::{
            extensions::{
                burnable::*,
                metadata::*,
            }
        },
        modifiers,
        traits::{
            Storage,
            String
        },
    };
    use ink_storage::{
        traits::{
            SpreadAllocate,
        },
    };

    use inkwhale_project::impls::{
        token::*,
        token_mint_cap::*
    };

    #[ink(storage)]
    #[derive(Default, SpreadAllocate, Storage)]
    pub struct MyPsp22 {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        token_mint_cap: token_mint_cap::data::Data
    }

    impl PSP22 for MyPsp22 {}
    impl Ownable for MyPsp22 {}

    //impl TokenTrait for MyPsp22 {}
    impl PSP22Metadata for MyPsp22 {}
    // Don't override anything so just use the trait directly
    impl PSP22Burnable for MyPsp22 {}

    impl TokenMintCapTrait for MyPsp22 {}

    impl MyPsp22 {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, cap: Balance, minting_fee: Balance, minting_cap: Balance, name: String, symbol: String, decimal: u8) -> Self {
            assert!(cap >= minting_cap,"invalid input cap");

            ink_lang::codegen::initialize_contract(|instance: &mut MyPsp22| {
                instance._init_with_owner(contract_owner);
                instance.metadata.name = Some(name);
                instance.metadata.symbol = Some(symbol);
                instance.metadata.decimals = decimal;
                instance.token_mint_cap.cap = cap;
                instance.token_mint_cap.minting_fee = minting_fee;
                instance.token_mint_cap.minting_cap = minting_cap;
            })
        }
    }
}