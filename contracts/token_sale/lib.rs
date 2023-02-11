#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]

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
            String,
            DefaultEnv
        },
    };

    use inkwhale_project::impls::{
        token_mint_cap::*,
        admin::*,
        upgradeable::*
    };        
    
    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MyPsp22 {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        token_mint_cap: token_mint_cap::data::Data,
        #[storage_field]
        admin_data: admin::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    impl PSP22 for MyPsp22 {}
    impl Ownable for MyPsp22 {}

    impl PSP22Metadata for MyPsp22 {}
    impl PSP22Burnable for MyPsp22 {
        #[ink(message)]
        fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            let caller = Self::env().caller();

            let allowance = self.allowance(caller, account);

            if caller == account || allowance >= amount {
                self._burn_from(account, amount)
            }
            else{
                return Err(PSP22Error::Custom(String::from("Caller is not token owner or approved")))
            }
        }
    }

    impl TokenMintCapTrait for MyPsp22 {}  
    impl AdminTrait for MyPsp22 {}
    impl UpgradeableTrait for MyPsp22 {}
    
    impl MyPsp22 {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, cap: Balance, minting_fee: Balance, minting_cap: Balance, name: String, symbol: String, decimal: u8) -> Self {
            assert!(cap >= minting_cap,"invalid input cap");

            let mut instance = Self::default();

            instance._init_with_owner(contract_owner);
            instance.initialize(
                cap,
                minting_fee,
                minting_cap,
                name,
                symbol,
                decimal
            )
            .ok()
            .unwrap();
            
            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, cap: Balance, minting_fee: Balance, minting_cap: Balance, name: String, symbol: String, decimal: u8
        ) -> Result<(), Error> {
            self.metadata.name = Some(name);
            self.metadata.symbol = Some(symbol);
            self.metadata.decimals = decimal;
            self.token_mint_cap.cap = cap;
            self.token_mint_cap.minting_fee = minting_fee;
            self.token_mint_cap.minting_cap = minting_cap;

            Ok(())
        }
    }
}