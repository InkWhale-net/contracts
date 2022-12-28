#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp22_sale {
    use openbrush::{
        contracts::ownable::*,
        contracts::psp22::*,
        modifiers,
        traits::{
            Storage,
            String,
        },
    };
    use ink_storage::{
        traits::{
            SpreadAllocate,
        },
    };

    #[ink(storage)]
    #[derive(Default, SpreadAllocate, Storage)]
    pub struct MyPsp22 {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        ownable: ownable::Data,
        name: String,
        symbol: String,
        decimals: u8,
        cap: Balance,
        minting_fee: Balance,
        minting_cap: Balance,
        total_minted: Balance
    }

    impl PSP22 for MyPsp22 {}
    impl Ownable for MyPsp22 {}

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        Custom(String)
    }

    impl From<OwnableError> for Error {
        fn from(ownable: OwnableError) -> Self {
            match ownable {
                OwnableError::CallerIsNotOwner => Error::Custom(String::from("O::CallerIsNotOwner")),
                OwnableError::NewOwnerIsZero => Error::Custom(String::from("O::NewOwnerIsZero")),
            }
        }
    }

    impl MyPsp22 {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, cap: Balance, minting_fee: Balance, minting_cap: Balance, name: String, symbol: String, decimal: u8) -> Self {
            assert!(cap >= minting_cap,"invalid input cap");

            ink_lang::codegen::initialize_contract(|instance: &mut MyPsp22| {
                instance._init_with_owner(contract_owner);
                instance.name = name;
                instance.symbol = symbol;
                instance.decimals = decimal;
                instance.cap = cap;
                instance.minting_fee = minting_fee;
                instance.minting_cap = minting_cap;
            })
        }
        #[ink(message)]
        #[ink(payable)]
        pub fn public_mint(&mut self, amount: Balance)-> Result<(), PSP22Error> {
            let caller = self.env().caller();
            let total_fee = (self.minting_fee as u128)
                .checked_mul(amount as u128).unwrap()
                .checked_div(1000000000000)
                .unwrap();
            assert!(
                total_fee <= self.env().transferred_value(),
                "invalid fee"
            );
            self.total_minted = self.total_minted.checked_add(amount).unwrap();
            assert!(self.total_minted.checked_add(amount).unwrap() <= self.minting_cap, "minting cap reached");
            self._mint_to(caller, amount)
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn owner_mint(&mut self, mint_to: AccountId, amount: Balance) -> Result<(), PSP22Error>  {
            assert!(self.total_supply().checked_add(amount).unwrap() <= self.cap, "minting cap reached");
            self._mint_to(mint_to, amount)
        }

        // #[ink(message)]
        // pub fn free_mint(&mut self)-> Result<(), PSP22Error> {
        //     let caller = self.env().caller();
        //     let amount = 100 * 1000000000000;
        //
        //     let is_minted = self.is_minted.get(&caller);
        //     assert!(is_minted.is_none(),"account already minted");
        //     assert!(self.total_free_minted + amount <= self.free_cap, "free cap reached");
        //     self.total_free_minted = self.total_free_minted.checked_add(amount).unwrap();
        //     self.is_minted.insert(&caller, &true);
        //     self._mint_to(caller, amount)
        // }

        #[ink(message)]
        pub fn burn(&mut self, amount: Balance) -> Result<(), PSP22Error> {
            let caller = self.env().caller();
            self._burn_from(caller, amount)
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_cap(&mut self, cap: Balance) -> Result<(), PSP22Error>  {
            self.cap = cap;
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn set_minting_fee(&mut self, minting_fee: Balance) -> Result<(), PSP22Error>  {
            self.minting_fee = minting_fee;
            Ok(())
        }

        #[ink(message)]
        pub fn cap(&self) -> Balance {
            self.cap.clone()
        }

        #[ink(message)]
        pub fn minting_cap(&self) -> Balance {
            self.minting_cap.clone()
        }

        #[ink(message)]
        pub fn total_minted(&self) -> Balance {
            self.total_minted.clone()
        }

        #[ink(message)]
        pub fn minting_fee(&self) -> Balance {
            self.minting_fee.clone()
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

        /// Withdraw Fees - only Owner
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn withdraw_fee(&mut self, value: Balance) -> Result<(), Error> {
            assert!(value <= self.env().balance(), "not enough balance");
            assert!(
                self.env().transfer(self.env().caller(), value).is_ok(),
                "error withdraw_fee"
            );
            Ok(())
        }
    }
}
