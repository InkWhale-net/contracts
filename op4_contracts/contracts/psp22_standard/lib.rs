#![cfg_attr(not(feature = "std"), no_std)]
// #![feature(min_specialization)]
pub use self::psp22_standard::{Psp22Nft, Psp22NftRef};

#[allow(clippy::let_unit_value)]
#[allow(clippy::inline_fn_without_body)]
#[allow(clippy::too_many_arguments)]
#[openbrush::implementation(
    PSP22,
    PSP22Capped,
    PSP22Metadata,
    PSP22Mintable,
    PSP22Burnable,
    Ownable
)]
#[openbrush::contract]
pub mod psp22_standard {
    use ink::{
        codegen::{EmitEvent, Env},
        prelude::string::String,
        reflect::ContractEventBase,
    };
    use inkwhale_project::impls::admin::*;
    use openbrush::{
        contracts::ownable::*,
        contracts::{
            ownable,
            psp22::extensions::{burnable::*, capped::*, metadata::*, mintable::*},
        },
        modifiers,
        traits::{DefaultEnv, Storage},
    };

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        value: Balance,
    }

    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        spender: AccountId,
        value: Balance,
    }

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
        cap: capped::Data,
        #[storage_field]
        admin_data: admin::data::Data,
    }

    pub type Event = <Psp22Nft as ContractEventBase>::Type;

    // impl PSP22 for Psp22Nft {}
    // impl PSP22Metadata for Psp22Nft {}
    // impl PSP22Capped for Psp22Nft {}
    // impl Ownable for Psp22Nft {}
    impl AdminTrait for Psp22Nft {}

    #[overrider(psp22::Internal)]
    fn _emit_transfer_event(
        &self,
        _from: Option<AccountId>,
        _to: Option<AccountId>,
        _amount: Balance,
    ) {
        Psp22Nft::emit_event(
            self.env(),
            Event::Transfer(Transfer {
                from,
                to,
                value: amount,
            }),
        );
    }

    #[overrider(psp22::Internal)]
    fn _emit_approval_event(&self, _owner: AccountId, _spender: AccountId, _amount: Balance) {
        Psp22Nft::emit_event(
            self.env(),
            Event::Approval(Approval {
                owner,
                spender,
                value: amount,
            }),
        );
    }

    #[overrider(psp22::Internal)]
    fn _before_token_transfer(
        &mut self,
        _from: Option<&AccountId>,
        _to: Option<&AccountId>,
        _amount: &Balance,
    ) -> Result<(), PSP22Error> {
        if from.is_none() && self._is_cap_exceeded(amount) {
            return Err(PSP22Error::Custom(String::from("Cap exceeded").into()));
        }
        Ok(())
    }

    #[default_impl(PSP22Burnable)]
    #[modifiers(only_owner)]
    fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
        let caller = Self::env().caller();
        if account == caller {
            self._burn_from(account, amount)
        } else {
            Err(PSP22Error::Custom(
                String::from("Your are not owner").into_bytes(),
            ))
        }
    }

    #[default_impl(PSP22Mintable)]
    #[modifiers(only_owner)]
    fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
        let caller = Self::env().caller();
        if caller == self.owner() {
            self._mint_to(account, amount)
        } else {
            Err(PSP22Error::Custom(
                String::from("Your are not owner").into_bytes(),
            ))
        }
    }

    impl Psp22Nft {
        #[ink(constructor)]
        pub fn new(cap: Balance, name: String, symbol: String, decimal: u8) -> Self {
            let mut instance = Self::default();
            let caller = <Self as DefaultEnv>::env().caller();
            ownable::Internal::_init_with_owner(&mut instance, caller);
            assert!(instance._init_cap(cap).is_ok());
            instance.metadata.name.set(&Some(name.into()));
            instance.metadata.symbol.set(&Some(symbol.into()));
            instance.metadata.decimals.set(&decimal);
            instance
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
