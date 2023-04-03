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
        admin_data: inkwhale_project::impls::admin::data::Data,
    }

    impl PSP22 for Psp22Nft {}
    impl PSP22Metadata for Psp22Nft {}
    impl PSP22Mintable for Psp22Nft {}
    impl Psp22Traits for Psp22Nft {}
    impl Ownable for Psp22Nft {}
    impl AdminTrait for Psp34Nft {}

    impl Psp22Nft {
        #[ink(constructor)]
        pub fn new(contract_owner: AccountId, name: String, symbol: String) -> Self {
            let mut instance = Self::default();
            instance._init_with_owner(contract_owner);
            instance
        }
    }
}
