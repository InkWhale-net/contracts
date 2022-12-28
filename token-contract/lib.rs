#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
pub use self::my_psp22::{
    MyPsp22,
    MyPsp22Ref,
};

#[openbrush::contract]
pub mod my_psp22 {
    use ink_storage::traits::SpreadAllocate;
    use openbrush::{
        contracts::psp22::*,
        traits::{
            Storage,
            String,
        },
    };

    #[ink(storage)]
    #[derive(Default, SpreadAllocate, Storage)]
    pub struct MyPsp22 {
        #[storage_field]
        psp22: psp22::Data,
        name: String,
        symbol: String,
        decimals: u8,
    }

    impl PSP22 for MyPsp22 {}

    impl MyPsp22 {
        #[ink(constructor)]
        pub fn new(mint_to: AccountId, total_supply: Balance, name: String, symbol: String, decimal: u8) -> Self {
            ink_lang::codegen::initialize_contract(|instance: &mut MyPsp22| {
                instance
                    ._mint_to(mint_to, total_supply)
                    .expect("Should mint");
                instance.name = name;
                instance.symbol = symbol;
                instance.decimals = decimal;
            })
        }

        #[ink(message)]
        pub fn faucet(&mut self) -> Result<(), PSP22Error> {
            let caller = self.env().caller();
            self._mint_to(caller, 1000 * ((10 as u64).pow(self.decimals as u32) as u128)).expect("Should mint");
            Ok(())
        }

        #[ink(message)]
        pub fn burn(&mut self, amount: Balance) -> Result<(), PSP22Error> {
            let caller = self.env().caller();
            self._burn_from(caller, amount)
        }
        #[ink(message)]
        pub fn token_name(&self) -> String {
            self.name.clone()
        }
        #[ink(message)]
        pub fn token_symbol(&self) -> String {
            self.symbol.clone()
        }
        #[ink(message)]
        pub fn token_decimals(&self) -> u8 {
            self.decimals.clone()
        }
    }
}
