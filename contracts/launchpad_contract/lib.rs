#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]
#![allow(clippy::large_enum_variant)]
#![allow(clippy::question_mark)]

pub use self::my_launchpad::{
    MyLaunchpad,
    MyLaunchpadRef,
};

#[openbrush::contract]
pub mod my_launchpad {
    use ink::prelude::{
        string::String,
        vec::Vec,
    };

    use openbrush::{
        contracts::{
            ownable::*,
        },
        traits::{
            Storage,
            ZERO_ADDRESS
        },
        modifiers
    };
   
    use inkwhale_project::impls::{
        launchpad_contract::*,
        upgradeable::*
    };

    use ink::{
        codegen::{Env, EmitEvent},
        reflect::ContractEventBase
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MyLaunchpad {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: launchpad_contract::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    #[ink(event)]
    pub struct PublicPurchaseEvent {
        launchpad_contract: AccountId,
        token_contract: AccountId,
        buyer: AccountId,
        amount: Balance
    }

    #[ink(event)]
    pub struct PublicClaimEvent {
        launchpad_contract: AccountId,
        token_contract: AccountId,
        buyer: AccountId,
        amount: Balance
    }

    #[ink(event)]
    pub struct WhitelistPurchaseEvent {
        launchpad_contract: AccountId,
        token_contract: AccountId,
        buyer: AccountId,
        amount: Balance
    }

    #[ink(event)]
    pub struct WhitelistClaimEvent {
        launchpad_contract: AccountId,
        token_contract: AccountId,
        buyer: AccountId,
        amount: Balance
    }

    pub type Event = <MyLaunchpad as ContractEventBase>::Type;

    impl Ownable for MyLaunchpad {}
    impl LaunchpadContractTrait for MyLaunchpad {
        fn _emit_public_purchase_event(&self, _launchpad_contract: AccountId, _token_contract: AccountId, _buyer: AccountId, _amount: Balance) {
            MyLaunchpad::emit_event(
                self.env(),
                Event::PublicPurchaseEvent(PublicPurchaseEvent{
                    launchpad_contract: _launchpad_contract,
                    token_contract: _token_contract,
                    buyer: _buyer,
                    amount: _amount
                })
            );
        }
    
        fn _emit_public_claim_event(&self, _launchpad_contract: AccountId, _token_contract: AccountId, _buyer: AccountId, _amount: Balance) {
            MyLaunchpad::emit_event(
                self.env(),
                Event::PublicClaimEvent(PublicClaimEvent{
                    launchpad_contract: _launchpad_contract,
                    token_contract: _token_contract,
                    buyer: _buyer,
                    amount: _amount
                })
            );
        }

        fn _emit_whitelist_purchase_event(&self, _launchpad_contract: AccountId, _token_contract: AccountId, _buyer: AccountId, _amount: Balance) {
            MyLaunchpad::emit_event(
                self.env(),
                Event::WhitelistPurchaseEvent(WhitelistPurchaseEvent{
                    launchpad_contract: _launchpad_contract,
                    token_contract: _token_contract,
                    buyer: _buyer,
                    amount: _amount
                })
            );
        }
        
        fn _emit_whitelist_claim_event(&self, _launchpad_contract: AccountId, _token_contract: AccountId, _buyer: AccountId, _amount: Balance) {
            MyLaunchpad::emit_event(
                self.env(),
                Event::WhitelistClaimEvent(WhitelistClaimEvent{
                    launchpad_contract: _launchpad_contract,
                    token_contract: _token_contract,
                    buyer: _buyer,
                    amount: _amount
                })
            );
        }
    }

    impl UpgradeableTrait for MyLaunchpad {}

    impl MyLaunchpad {
        #[ink(constructor)]
        pub fn new(
            contract_owner: AccountId, 
            project_info_uri: String,
            token_address: AccountId,
            inw_contract: AccountId,
            tx_rate: u32,
            
            phase_name: Vec<String>,
            phase_start_time: Vec<u64>,
            phase_end_time: Vec<u64>,
            phase_immediate_release_rate: Vec<u32>,
            phase_vesting_duration: Vec<u64>,
            phase_vesting_unit: Vec<u64>,
            
            phase_is_public: Vec<bool>,
            phase_public_amount: Vec<Balance>,
            phase_public_price: Vec<Balance>            
        ) -> Result<Self, Error> {

            let mut instance = Self::default();

            instance._init_with_owner(contract_owner);

            match instance.create_launchpad(
                project_info_uri,
                token_address,
                inw_contract,
                tx_rate,
                
                phase_name,
                phase_start_time,
                phase_end_time,
                phase_immediate_release_rate,
                phase_vesting_duration,
                phase_vesting_unit,
                
                phase_is_public,
                phase_public_amount,
                phase_public_price
            ) {
                Ok(()) => Ok(instance),
                Err(e) => Err(e),
            }
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(
            &mut self, 
            project_info_uri: String,
            token_address: AccountId,
            inw_contract: AccountId,
            tx_rate: u32,
            
            phase_name: Vec<String>,
            phase_start_time: Vec<u64>,
            phase_end_time: Vec<u64>,
            phase_immediate_release_rate: Vec<u32>,
            phase_vesting_duration: Vec<u64>,
            phase_vesting_unit: Vec<u64>,
            
            phase_is_public: Vec<bool>,
            phase_public_amount: Vec<Balance>,
            phase_public_price: Vec<Balance>  
        ) -> Result<(), Error> {
            self.create_launchpad(
                project_info_uri,
                token_address,
                inw_contract,
                tx_rate,
                
                phase_name,
                phase_start_time,
                phase_end_time,
                phase_immediate_release_rate,
                phase_vesting_duration,
                phase_vesting_unit,
                
                phase_is_public,
                phase_public_amount,
                phase_public_price
            )
        }

        fn create_launchpad(
            &mut self, 
            project_info_uri: String,
            token_address: AccountId,
            inw_contract: AccountId,
            tx_rate: u32,
            
            phase_name: Vec<String>,
            phase_start_time: Vec<u64>,
            phase_end_time: Vec<u64>,
            phase_immediate_release_rate: Vec<u32>,
            phase_vesting_duration: Vec<u64>,
            phase_vesting_unit: Vec<u64>,
            
            phase_is_public: Vec<bool>,
            phase_public_amount: Vec<Balance>,
            phase_public_price: Vec<Balance>  
        ) -> Result<(), Error> {
            if self.data.inw_contract != ZERO_ADDRESS.into() {
                return Err(Error::AlreadyInit);
            }

            self.data.project_info_uri = project_info_uri;
            self.data.token_address = token_address;
            self.data.inw_contract = inw_contract;
            self.data.tx_rate = tx_rate;

            // Check length of data in phase
            let phase_length = phase_name.len();
            if phase_length == 0 || 
               phase_length != phase_start_time.len() ||
               phase_length != phase_end_time.len() ||
               phase_length != phase_immediate_release_rate.len() ||
               phase_length != phase_vesting_duration.len() ||
               phase_length != phase_vesting_unit.len() ||
               phase_length != phase_vesting_unit.len() ||
               phase_length != phase_is_public.len() ||
               phase_length != phase_public_amount.len() ||
               phase_length != phase_public_price.len() {

               return Err(Error::InvalidPhaseData); 
            }

            for i in 0..phase_length {
                let result = self.add_new_phase(
                    phase_name[i].clone(),
                    phase_start_time[i],
                    phase_end_time[i],
                    phase_immediate_release_rate[i],
                    phase_vesting_duration[i],
                    phase_vesting_unit[i],
                                
                    phase_is_public[i],
                    phase_public_amount[i],
                    phase_public_price[i]
                );

                if result.is_err() {
                    return result;
                }
            }
                 
            Ok(())
        }

        #[ink(message)]
        pub fn add_new_phase(
            &mut self,
            name: String,
            start_time: u64,
            end_time: u64,
            immediate_release_rate: u32,
            vesting_duration: u64,
            vesting_unit: u64,

            is_public: bool,
            public_amount: Balance,
            public_price: Balance  
        ) -> Result<(), Error> {
            if !self.validate_phase_schedule(&start_time, &end_time) {
                return Err(Error::InvalidStartTimeAndEndTime);
            }

            if immediate_release_rate > 10000 {
                return Err(Error::InvalidPercentage);
            }

            if vesting_unit == 0 {
                return Err(Error::InvalidDuration);
            }

            if self.data.project_start_time == 0 || start_time < self.data.project_start_time {
                self.data.project_start_time = start_time; 
            } 

            if end_time > self.data.project_end_time {
                self.data.project_end_time = end_time; 
            }

            let end_vesting_time = end_time.checked_add(vesting_duration).ok_or(Error::CheckedOperations)?;
            
            let mut total_vesting_units = vesting_duration.checked_div(vesting_unit).ok_or(Error::CheckedOperations)?;  
            if total_vesting_units.checked_mul(vesting_unit).ok_or(Error::CheckedOperations)? < vesting_duration {
                total_vesting_units = total_vesting_units.checked_add(1).ok_or(Error::CheckedOperations)?;
            }
            
            let phase = PhaseInfo {
                is_active: true,
                name,
                start_time,
                end_time,
                immediate_release_rate,
                vesting_duration,
                end_vesting_time,
                vesting_unit,
                total_vesting_units
            };
            
            self.data.phase.insert(&self.data.total_phase, &phase);

            // Check if has public sale 
            if is_public {
                let pulic_sale = PublicSaleInfo {
                    total_amount: public_amount,
                    price: public_price,
                    total_purchased_amount: 0,
                    total_claimed_amount: 0,
                    is_burned: false
                };

                self.data.public_sale_info.insert(&self.data.total_phase, &pulic_sale);
            }

            self.data.total_phase = self.data.total_phase.checked_add(1).ok_or(Error::InvalidPhaseCount)?;
            
            Ok(())
        }

        fn validate_phase_schedule(&self, start_time: &u64, end_time: &u64) -> bool {
            if *start_time >= *end_time || *start_time == 0 {
                return false;
            }

            for i in 0..self.data.total_phase {
                if let Some(phase) = self.data.phase.get(&i) {
                    if phase.is_active && ( ((phase.start_time <= *start_time) && (*start_time <= phase.end_time))
                        || ((phase.start_time <= *end_time) && (*end_time <= phase.end_time))
                        || ((*start_time <= phase.start_time) && (phase.start_time <= *end_time))
                        || ((*start_time <= phase.end_time) && (phase.end_time <= *end_time))
                    ) {
                        return false;
                    }
                }
            }
            
            true
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }       
}