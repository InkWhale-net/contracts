#![cfg_attr(not(feature = "std"), no_std, no_main)]
pub use self::token_standard::{TokenStandard, TokenStandardRef};

#[openbrush::implementation(
    PSP22,
    PSP22Capped,
    PSP22Metadata,
    PSP22Mintable,
    Ownable
)]
#[openbrush::contract]
pub mod token_standard {
    use inkwhale_project::impls::admin::*;
    use ink::{
        codegen::{EmitEvent, Env},
        reflect::ContractEventBase,
    };
    use openbrush::{
        contracts::ownable::*,
        contracts::psp22::extensions::{
            burnable::*,
            capped::*,
            metadata::*,
        },
        traits::{DefaultEnv, Storage, String},
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
    pub struct TokenStandard {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        cap: capped::Data,
    }

    pub type Event = <TokenStandard as ContractEventBase>::Type;

    #[overrider(psp22::Internal)]
    fn _emit_transfer_event(
        &self,
        _from: Option<AccountId>,
        _to: Option<AccountId>,
        _amount: Balance,
    ) {
        TokenStandard::emit_event(
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
        TokenStandard::emit_event(
            self.env(),
            Event::Approval(Approval {
                owner,
                spender,
                value: amount,
            }),
        );
    }

    // impl PSP22 for TokenStandard {}
    // impl PSP22Metadata for TokenStandard {}
    // impl PSP22Capped for TokenStandard {}
    // impl Ownable for TokenStandard {}
    impl AdminTrait for TokenStandard {}

    #[overrider(psp22::Internal)]
    fn _before_token_transfer(
        &mut self,
        _from: Option<&AccountId>,
        _to: Option<&AccountId>,
        _amount: &Balance,
    ) -> Result<(), PSP22Error> {
        if from.is_none() && self._is_cap_exceeded(amount) {
            return Err(PSP22Error::Custom(String::from("Cap exceeded")));
        }
        Ok(())
    }

    impl PSP22Burnable for TokenStandard {
        #[ink(message)]
        fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            let caller = Self::env().caller();
            if account == caller {
                psp22::Internal::_burn_from(self, account, amount)
            } else {
                Err(PSP22Error::Custom(String::from("Your are not owner")))
            }
        }
    }

    // impl PSP22Mintable for TokenStandard {
    //     #[ink(message)]
    //     fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
    //         let caller = Self::env().caller();
    //         if caller == self.owner() {
    //             self._mint_to(account, amount)
    //         } else {
    //             Err(PSP22Error::Custom(String::from("Your are not owner")))
    //         }
    //     }
    // }

    impl TokenStandard {
        #[ink(constructor)]
        pub fn new(
            contract_owner: AccountId,
            mint_to: AccountId,
            cap: Balance,
            name: String,
            symbol: String,
            decimal: u8,
        ) -> Self {
            let mut instance = Self::default();

            ownable::Internal::_init_with_owner(&mut instance, contract_owner);

            assert!(instance._init_cap(cap).is_ok());
            psp22::Internal::_mint_to(&mut instance, mint_to, cap).expect("Should mint");
            instance.metadata.name.set(&Some(name));
            instance.metadata.symbol.set(&Some(symbol));
            instance.metadata.decimals.set(&decimal);

            instance
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}
