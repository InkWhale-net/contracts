#![cfg_attr(not(feature = "std"), no_std, no_main)]
pub use self::inw_swap::{InwSwap, InwSwapRef};

#[openbrush::implementation(
    Ownable, 
    PSP22, 
    PSP22Capped,
    Pausable
)]
#[openbrush::contract]
pub mod inw_swap {
    use ink::{
        codegen::{EmitEvent, Env},
        reflect::ContractEventBase
    };
    use inkwhale_project::impls::admin::*;
    use openbrush::{
        contracts::ownable::*,
        contracts::{
            ownable,
            psp22::extensions::{capped::*},
        },
        traits::{DefaultEnv, Storage},
    };

    use inkwhale_project::impls::{inw_swap::*, upgradeable::*};
    
    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct InwSwap {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        manager: inw_swap::data::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        cap: capped::Data,
        #[storage_field]
        pause: pausable::Data,
    }

    #[ink(event)]
    pub struct Swap {
        #[ink(topic)]
        user: AccountId,
        value: Balance,
    }

    #[ink(event)]
    pub struct SwapV2ToV1 {
        #[ink(topic)]
        user: AccountId,
        value: Balance,
    }

    pub type Event = <InwSwap as ContractEventBase>::Type;

    impl UpgradeableTrait for InwSwap {}
    impl AdminTrait for InwSwap {}
    impl InwSwapTrait for InwSwap {
        fn _emit_swap_event(&self, _user: AccountId, _amount: Balance) {
            InwSwap::emit_event(
                self.env(),
                Event::Swap(Swap {
                    user: _user,
                    value: _amount,
                }),
            );
        }

        fn _emit_swap_v2_to_v1_event(&self, _user: AccountId, _amount: Balance) {
            InwSwap::emit_event(
                self.env(),
                Event::SwapV2ToV1(SwapV2ToV1 {
                    user: _user,
                    value: _amount,
                }),
            );
        }
    }    

    impl InwSwap {
        #[ink(constructor)]
        pub fn new(inw_contract_v1: AccountId, inw_contract_v2: AccountId) -> Self {
            let mut instance = Self::default();

            let caller = <Self as DefaultEnv>::env().caller();
            ownable::Internal::_init_with_owner(&mut instance, caller);
                        
            instance.manager.inw_contract_v1 = inw_contract_v1;
            instance.manager.inw_contract_v2 = inw_contract_v2;
            
            instance
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }

        #[ink(message)]
        pub fn pause(&mut self) -> Result<(), PausableError> {                        
            if let Some(owner) = Ownable::owner(self) {
                let caller = self.env().caller();
                if caller == owner {
                    pausable::Internal::_pause(self)
                } else {
                    Err(PausableError::NotPaused)
                }
            } else {
                Err(PausableError::NotPaused)
            }
        }

        #[ink(message)]
        pub fn unpause(&mut self) -> Result<(), PausableError> {
            if let Some(owner) = Ownable::owner(self) {
                let caller = self.env().caller();
                if caller == owner {
                    pausable::Internal::_unpause(self)
                } else {
                    Err(PausableError::Paused)
                }
            } else {
                Err(PausableError::Paused)
            }              
        }

        #[ink(message)]
        pub fn change_state(&mut self) -> Result<(), PausableError> {
            if let Some(owner) = Ownable::owner(self) {
                let caller = self.env().caller();
                if caller == owner {
                    pausable::Internal::_switch_pause(self)
                } else {
                    Err(PausableError::Paused)
                }
            } else {
                Err(PausableError::Paused)
            }          
        }
    }
}