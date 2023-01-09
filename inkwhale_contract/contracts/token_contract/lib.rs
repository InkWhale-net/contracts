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
        contracts::psp22::{
            extensions::{
                burnable::*,
                metadata::*,
            }
        },
        traits::{
            Storage,
            String,
        },
    };

    #[derive(Default, SpreadAllocate, Storage)]
    #[ink(storage)]    
    pub struct MyPsp22 {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        metadata: metadata::Data,
    }

    impl PSP22 for MyPsp22 {}

    impl PSP22Metadata for MyPsp22 {}
    impl PSP22Burnable for MyPsp22 {}

    impl MyPsp22 {
        #[ink(constructor)]
        pub fn new(mint_to: AccountId, total_supply: Balance, name: String, symbol: String, decimal: u8) -> Self {
            ink_lang::codegen::initialize_contract(|instance: &mut MyPsp22| {
                instance
                    ._mint_to(mint_to, total_supply)
                    .expect("Should mint");
                instance.metadata.name = Some(name);
                instance.metadata.symbol = Some(symbol);
                instance.metadata.decimals = decimal;
            })
        }

        #[ink(message)]
        pub fn faucet(&mut self) -> Result<(), PSP22Error> {
            let caller = self.env().caller();
            self._mint_to(caller, 1000 * ((10 as u64).pow(self.metadata.decimals as u32) as u128)).expect("Should mint");
            Ok(())
        }
    }
}