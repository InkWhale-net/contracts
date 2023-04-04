#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
pub use self::psp22_standard::{
    Psp22Nft,
    Psp22NftRef,
};

#[allow(clippy::let_unit_value)]
#[allow(clippy::inline_fn_without_body)]
#[allow(clippy::too_many_arguments)]
#[openbrush::contract]
pub mod psp22_standard {
    use ink::{
        codegen::{Env, EmitEvent},
        reflect::ContractEventBase
    };
    use ink::prelude::{
        string::{
            String,
        },
        vec::Vec,
    };
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
            DefaultEnv
        },
        modifiers,
    };
    use inkwhale_project::{
        traits::{
            psp22_standard::*,
            admin::*,
            error::Error,
        }
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct Psp22Nft {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        manager: inkwhale_project::impls::psp22_standard::data::Manager,
        #[storage_field]
        cap: capped::Data,
        #[storage_field]
        admin_data: inkwhale_project::impls::admin::data::Data,
    }

    impl PSP22 for Psp22Nft {}
    impl PSP22Metadata for Psp22Nft {}
    impl PSP22Capped for Psp22Nft {}
    impl PSP22Burnable for Psp22Nft {}
    impl Psp22Traits for Psp22Nft {}
    impl Ownable for Psp22Nft {}
    impl AdminTrait for Psp22Nft {}

    impl psp22::Transfer for Psp22Nft {
        fn _before_token_transfer(
            &mut self,
            _from: Option<&AccountId>,
            _to: Option<&AccountId>,
            _amount: &Balance,
        ) -> Result<(), PSP22Error> {
            if _from.is_none() && self._is_cap_exceeded(_amount) {
                return Err(PSP22Error::Custom(String::from("Cap exceeded").into()))
            }
            Ok(())
        }
    }

    impl PSP22Mintable for Psp22Nft {
        #[ink(message)]
        fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            
            let caller = Self::env().caller();

            if caller == self.owner() {
                self._mint_to(account, amount)
            } else {
                return Err(PSP22Error::Custom(String::from("Your are not owner").into_bytes()));
            }
        }
    }

    impl Psp22Nft {
        #[ink(constructor)]
        pub fn new(cap: Balance, decimal: u8) -> Self {
            let mut instance = Self::default();
            let caller = <Self as DefaultEnv>::env().caller();
            instance._init_with_owner(caller);
            assert!(instance._init_cap(cap).is_ok());
            instance.metadata.name = Some(String::from("Ink Whale Token").into());
            instance.metadata.symbol = Some(String::from("INW").into());
            instance.metadata.decimals = decimal;
            instance
        }
    }
}
