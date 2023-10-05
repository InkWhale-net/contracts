#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![allow(clippy::too_many_arguments)]

pub use self::my_launchpad::{MyLaunchpad, MyLaunchpadRef};
#[openbrush::implementation(AccessControl, AccessControlEnumerable, Ownable)]
#[openbrush::contract]
pub mod my_launchpad {
    use ink::prelude::{string::String, vec::Vec};

    use openbrush::{contracts::ownable::*, traits::Storage};

    use inkwhale_project::impls::{launchpad_contract::*, upgradeable::*};

    use ink::{
        codegen::{EmitEvent, Env},
        reflect::ContractEventBase,
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MyLaunchpad {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: launchpad_contract::data::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
    }

    #[ink(event)]
    pub struct PublicPurchaseEvent {
        launchpad_contract: AccountId,
        token_contract: AccountId,
        buyer: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct PublicClaimEvent {
        launchpad_contract: AccountId,
        token_contract: AccountId,
        buyer: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct WhitelistPurchaseEvent {
        launchpad_contract: AccountId,
        token_contract: AccountId,
        buyer: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct WhitelistClaimEvent {
        launchpad_contract: AccountId,
        token_contract: AccountId,
        buyer: AccountId,
        amount: Balance,
    }

    pub type Event = <MyLaunchpad as ContractEventBase>::Type;

    // impl Ownable for MyLaunchpad {}
    impl LaunchpadContractTrait for MyLaunchpad {
        fn _emit_public_purchase_event(
            &self,
            _launchpad_contract: AccountId,
            _token_contract: AccountId,
            _buyer: AccountId,
            _amount: Balance,
        ) {
            MyLaunchpad::emit_event(
                self.env(),
                Event::PublicPurchaseEvent(PublicPurchaseEvent {
                    launchpad_contract: _launchpad_contract,
                    token_contract: _token_contract,
                    buyer: _buyer,
                    amount: _amount,
                }),
            );
        }

        fn _emit_public_claim_event(
            &self,
            _launchpad_contract: AccountId,
            _token_contract: AccountId,
            _buyer: AccountId,
            _amount: Balance,
        ) {
            MyLaunchpad::emit_event(
                self.env(),
                Event::PublicClaimEvent(PublicClaimEvent {
                    launchpad_contract: _launchpad_contract,
                    token_contract: _token_contract,
                    buyer: _buyer,
                    amount: _amount,
                }),
            );
        }

        fn _emit_whitelist_purchase_event(
            &self,
            _launchpad_contract: AccountId,
            _token_contract: AccountId,
            _buyer: AccountId,
            _amount: Balance,
        ) {
            MyLaunchpad::emit_event(
                self.env(),
                Event::WhitelistPurchaseEvent(WhitelistPurchaseEvent {
                    launchpad_contract: _launchpad_contract,
                    token_contract: _token_contract,
                    buyer: _buyer,
                    amount: _amount,
                }),
            );
        }

        fn _emit_whitelist_claim_event(
            &self,
            _launchpad_contract: AccountId,
            _token_contract: AccountId,
            _buyer: AccountId,
            _amount: Balance,
        ) {
            MyLaunchpad::emit_event(
                self.env(),
                Event::WhitelistClaimEvent(WhitelistClaimEvent {
                    launchpad_contract: _launchpad_contract,
                    token_contract: _token_contract,
                    buyer: _buyer,
                    amount: _amount,
                }),
            );
        }
    }

    impl UpgradeableTrait for MyLaunchpad {}
    // impl AccessControl for MyLaunchpad {}
    // impl AccessControlEnumerable for MyLaunchpad {}

    impl MyLaunchpad {
        #[ink(constructor)]
        pub fn new(
            contract_owner: AccountId,
            project_info_uri: String,
            token_address: AccountId,
            total_supply: Balance,
            generator_contract: AccountId,
            tx_rate: u32,
            phases: Vec<PhaseInput>
        ) -> Result<Self, Error> {
            let mut instance = Self::default();

            ownable::Internal::_init_with_owner(&mut instance, contract_owner);

            access_control::Internal::_init_with_admin(&mut instance, Some(Self::env().caller()));
            access_control::Internal::_init_with_admin(&mut instance, Some(contract_owner));
            AccessControl::grant_role(&mut instance, ADMINER, Some(contract_owner))
                .expect("Should grant ADMINER role");

            match instance.create_pool(
                project_info_uri,
                token_address,
                total_supply,
                generator_contract,
                tx_rate,
                phases
            ) {
                Ok(()) => Ok(instance),
                Err(e) => Err(e),
            }
        }        

        fn create_pool(
            &mut self,
            project_info_uri: String,
            token_address: AccountId,
            total_supply: Balance,
            generator_contract: AccountId,
            tx_rate: u32,
            phases: Vec<PhaseInput>
        ) -> Result<(), Error> {
            if self.data.generator_contract != [0u8; 32].into() {
                return Err(Error::AlreadyInit);
            }

            self.data.project_info_uri = project_info_uri;
            self.data.token_address = token_address;
            self.data.total_supply = total_supply;
            self.data.available_token_amount = total_supply;
            self.data.generator_contract = generator_contract;
            self.data.tx_rate = tx_rate;

            for i in 0..phases.len() {
                self.add_new_phase(phases[i].clone())?;
            }

            Ok(())
        }

        #[ink(message)]
        pub fn add_new_phase(
            &mut self,
            phase: PhaseInput
        ) -> Result<(), Error> {
            if !AccessControl::has_role(self, ADMINER, Some(self.env().caller()))
                && !AccessControl::has_role(
                    self,
                    <MyLaunchpad as access_control::Internal>::_default_admin(),
                    Some(self.env().caller()),
                )
                && self.env().caller() != self.data.generator_contract
            {
                return Err(Error::InvalidCaller);
            }

            if !self.validate_phase_schedule(&phase.start_time, &phase.end_time) {
                return Err(Error::InvalidStartTimeAndEndTime);
            }

            if phase.immediate_release_rate > 10000 {
                return Err(Error::InvalidPercentage);
            }

            if (phase.immediate_release_rate == 10000 && phase.vesting_duration != 0) || (phase.immediate_release_rate < 10000 && phase.vesting_duration == 0) {
                return Err(Error::InvalidDuration);
            }

            if phase.vesting_unit == 0 {
                return Err(Error::InvalidVestingUnit);
            }

            if self.data.project_start_time == 0 || phase.start_time < self.data.project_start_time {
                self.data.project_start_time = phase.start_time;
            }

            if phase.end_time > self.data.project_end_time {
                self.data.project_end_time = phase.end_time;
            }

            let end_vesting_time = phase.end_time
                .checked_add(phase.vesting_duration)
                .ok_or(Error::CheckedOperations)?;

            let mut total_vesting_units = phase.vesting_duration
                .checked_div(phase.vesting_unit)
                .ok_or(Error::CheckedOperations)?;
            if total_vesting_units
                .checked_mul(phase.vesting_unit)
                .ok_or(Error::CheckedOperations)?
                < phase.vesting_duration
            {
                total_vesting_units = total_vesting_units
                    .checked_add(1)
                    .ok_or(Error::CheckedOperations)?;
            }

            let phase_info = PhaseInfo {
                is_active: true,
                name: phase.name,
                start_time: phase.start_time,
                end_time: phase.end_time,
                immediate_release_rate: phase.immediate_release_rate,
                vesting_duration: phase.vesting_duration,
                end_vesting_time,
                vesting_unit: phase.vesting_unit,
                total_vesting_units,
            };
            self.data.phase.insert(&self.data.total_phase, &phase_info);

            let public_sale = PublicSaleInfo {
                is_public: phase.is_public,
                total_amount: phase.public_amount,
                price: phase.public_price,
                total_purchased_amount: 0,
                total_claimed_amount: 0,
                is_burned: false,
                is_withdrawn: false,
            };
            self.data
                .public_sale_info
                .insert(&self.data.total_phase, &public_sale);

            // Check if has public sale
            if phase.is_public {
                self.data.available_token_amount = self
                    .data
                    .available_token_amount
                    .checked_sub(phase.public_amount)
                    .ok_or(Error::CheckedOperations)?;
            }

            self.data.total_phase = self
                .data
                .total_phase
                .checked_add(1)
                .ok_or(Error::InvalidPhaseCount)?;

            Ok(())
        }

        fn validate_phase_schedule(&self, start_time: &u64, end_time: &u64) -> bool {
            let current_time = self.env().block_timestamp();

            if *start_time >= *end_time || *end_time < current_time || *start_time == 0 {
                return false;
            }

            for i in 0..self.data.total_phase {
                if let Some(phase) = self.data.phase.get(&i) {
                    if phase.is_active
                        && (((phase.start_time <= *start_time) && (*start_time <= phase.end_time))
                            || ((phase.start_time <= *end_time) && (*end_time <= phase.end_time))
                            || ((*start_time <= phase.start_time)
                                && (phase.start_time <= *end_time))
                            || ((*start_time <= phase.end_time) && (phase.end_time <= *end_time)))
                    {
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
