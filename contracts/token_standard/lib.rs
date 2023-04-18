#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
pub use self::token_standard::{
    TokenStandard,
    TokenStandardRef,
};

#[allow(clippy::let_unit_value)]
#[allow(clippy::inline_fn_without_body)]
#[allow(clippy::too_many_arguments)]
#[openbrush::contract]
pub mod token_standard {
    use openbrush::{
        contracts::ownable::*,
        contracts::psp22::{
            extensions::{
                metadata::*,
                mintable::*,
                capped::*,
                burnable::*
            },
            Internal,
        },
        traits::{
            Storage,
            DefaultEnv,
            String
        }
    };
    use inkwhale_project::{
        traits::{
            admin::*
        }
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct TokenStandard {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        cap: capped::Data,
        #[storage_field]
        admin_data: inkwhale_project::impls::admin::data::Data,
    }

    impl PSP22 for TokenStandard {}
    impl PSP22Metadata for TokenStandard {}
    impl PSP22Capped for TokenStandard {}
    impl Ownable for TokenStandard {}
    impl AdminTrait for TokenStandard {}

    impl psp22::Transfer for TokenStandard {
        fn _before_token_transfer(
            &mut self,
            _from: Option<&AccountId>,
            _to: Option<&AccountId>,
            _amount: &Balance,
        ) -> Result<(), PSP22Error> {
            if _from.is_none() && self._is_cap_exceeded(_amount) {
                return Err(PSP22Error::Custom(String::from("Cap exceeded")))
            }
            Ok(())
        }
    }

    impl PSP22Burnable for TokenStandard {
        #[ink(message)]
        fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            let caller = Self::env().caller();
            if account == caller {
                self._burn_from(account, amount)
            } else {
                Err(PSP22Error::Custom(String::from("Your are not owner")))
            }
        }
    }

    impl PSP22Mintable for TokenStandard {
        #[ink(message)]
        fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            let caller = Self::env().caller();
            if caller == self.owner() {
                self._mint_to(account, amount)
            } else {
                Err(PSP22Error::Custom(String::from("Your are not owner")))
            }
        }
    }

    impl TokenStandard {
        #[ink(constructor)]
        pub fn new(mint_to: AccountId, cap: Balance, name: String, symbol: String, decimal: u8) -> Self {
            let mut instance = Self::default();
            let caller = <Self as DefaultEnv>::env().caller();
            instance._init_with_owner(caller);
            assert!(instance._init_cap(cap).is_ok());
            instance
                ._mint_to(mint_to, cap)
                .expect("Should mint");
            instance.metadata.name = Some(name);
            instance.metadata.symbol = Some(symbol);
            instance.metadata.decimals = decimal;

            instance
        }
    }
}
