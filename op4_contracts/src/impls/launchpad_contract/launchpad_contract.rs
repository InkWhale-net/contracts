pub use crate::{
    impls::launchpad_contract::{data, data::Data, data::*},
    traits::{error::Error, launchpad_contract::*, launchpad_generator::LaunchpadGeneratorRef},
};

use ink::prelude::{string::String, vec::Vec};

use ink::storage::traits::{AutoStorableHint, ManualKey, Storable, StorableHint};

use ink::env::CallFlags;
use openbrush::{
    contracts::{access_control::*, ownable::*},
    modifiers,
    traits::{AccountId, Balance, Storage},
};

pub trait LaunchpadContractTrait:
    access_control::Internal
    + access_control::MembersManager
    + Storable
    + StorableHint<ManualKey<{ STORAGE_KEY }>>
    + AutoStorableHint<ManualKey<3218979580, ManualKey<{ STORAGE_KEY }>>>
    + Storage<access_control::Data>
    + Storage<Data>
    + Storage<ownable::Data>
{
    // Getters
    fn get_project_info_uri(&self) -> String {
        self.data::<Data>().project_info_uri.clone()
    }

    fn get_token_address(&self) -> AccountId {
        self.data::<Data>().token_address
    }

    fn get_total_supply(&self) -> Balance {
        self.data::<Data>().total_supply
    }

    fn get_available_token_amount(&self) -> Balance {
        self.data::<Data>().available_token_amount
    }

    fn get_generator_contract(&self) -> AccountId {
        self.data::<Data>().generator_contract
    }

    fn get_tx_rate(&self) -> u32 {
        self.data::<Data>().tx_rate
    }

    fn get_project_start_time(&self) -> u64 {
        self.data::<Data>().project_start_time
    }

    fn get_project_end_time(&self) -> u64 {
        self.data::<Data>().project_end_time
    }

    fn get_total_phase(&self) -> u8 {
        self.data::<Data>().total_phase
    }

    fn get_phase(&self, phase_id: u8) -> Option<PhaseInfo> {
        self.data::<Data>().phase.get(&phase_id)
    }

    fn get_is_active(&self, phase_id: u8) -> Option<bool> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            return Some(phase.is_active);
        } else {
            return None;
        }
    }

    fn get_name(&self, phase_id: u8) -> Option<String> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            return Some(phase.name);
        } else {
            return None;
        }
    }

    fn get_start_time(&self, phase_id: u8) -> Option<u64> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            return Some(phase.start_time);
        } else {
            return None;
        }
    }

    fn get_end_time(&self, phase_id: u8) -> Option<u64> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            return Some(phase.end_time);
        } else {
            return None;
        }
    }

    fn get_immediate_release_rate(&self, phase_id: u8) -> Option<u32> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            return Some(phase.immediate_release_rate);
        } else {
            return None;
        }
    }

    fn get_vesting_duration(&self, phase_id: u8) -> Option<u64> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            return Some(phase.vesting_duration);
        } else {
            return None;
        }
    }

    fn get_vesting_unit(&self, phase_id: u8) -> Option<u64> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            return Some(phase.vesting_unit);
        } else {
            return None;
        }
    }

    fn get_public_sale_info(&self, phase_id: u8) -> Option<PublicSaleInfo> {
        self.data::<Data>().public_sale_info.get(&phase_id)
    }

    fn get_public_sale_total_amount(&self, phase_id: u8) -> Option<Balance> {
        if let Some(public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id) {
            return Some(public_sale_info.total_amount);
        } else {
            return None;
        }
    }

    fn get_public_sale_price(&self, phase_id: u8) -> Option<Balance> {
        if let Some(public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id) {
            return Some(public_sale_info.price);
        } else {
            return None;
        }
    }

    fn get_public_sale_total_purchased_amount(&self, phase_id: u8) -> Option<Balance> {
        if let Some(public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id) {
            return Some(public_sale_info.total_purchased_amount);
        } else {
            return None;
        }
    }

    fn get_public_sale_total_claimed_amount(&self, phase_id: u8) -> Option<Balance> {
        if let Some(public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id) {
            return Some(public_sale_info.total_claimed_amount);
        } else {
            return None;
        }
    }

    fn get_public_buyer(&self, phase_id: u8, account: AccountId) -> Option<BuyerInformation> {
        self.data::<Data>().public_buyer.get(&(&phase_id, &account))
    }

    fn get_whitelist_sale_info(&self, phase_id: u8) -> Option<WhitelistSaleInfo> {
        self.data::<Data>().whitelist_sale_info.get(&phase_id)
    }

    fn get_whitelist_sale_total_amount(&self, phase_id: u8) -> Option<Balance> {
        if let Some(whitelist_sale_info) = self.data::<Data>().whitelist_sale_info.get(&phase_id) {
            return Some(whitelist_sale_info.total_amount);
        } else {
            return None;
        }
    }

    fn get_whitelist_sale_total_purchased_amount(&self, phase_id: u8) -> Option<Balance> {
        if let Some(whitelist_sale_info) = self.data::<Data>().whitelist_sale_info.get(&phase_id) {
            return Some(whitelist_sale_info.total_purchased_amount);
        } else {
            return None;
        }
    }

    fn get_whitelist_sale_total_claimed_amount(&self, phase_id: u8) -> Option<Balance> {
        if let Some(whitelist_sale_info) = self.data::<Data>().whitelist_sale_info.get(&phase_id) {
            return Some(whitelist_sale_info.total_claimed_amount);
        } else {
            return None;
        }
    }

    fn get_whitelist_account(&self, phase_id: u8, account_index: u64) -> Option<AccountId> {
        self.data::<Data>()
            .whitelist_account
            .get_value(phase_id, &(account_index as u128))
    }

    fn get_whitelist_account_count(&self, phase_id: u8) -> u64 {
        self.data::<Data>().whitelist_account.count(phase_id) as u64
    }

    fn get_whitelist_buyer(&self, phase_id: u8, account: AccountId) -> Option<WhitelistBuyerInfo> {
        self.data::<Data>()
            .whitelist_buyer
            .get(&(&phase_id, &account))
    }

    #[modifiers(only_owner)]
    fn get_balance(&mut self) -> Result<Balance, Error> {
        Ok(Self::env().balance())
    }

    // Setters
    #[modifiers(only_role(ADMINER))]
    fn set_project_info_uri(&mut self, project_info_uri: String) -> Result<(), Error> {
        self.data::<Data>().project_info_uri = project_info_uri;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_token_address(&mut self, token_address: AccountId) -> Result<(), Error> {
        self.data::<Data>().token_address = token_address;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_total_supply(&mut self, total_supply: Balance) -> Result<(), Error> {
        let current_time: u64 = Self::env().block_timestamp();

        if current_time >= self.data::<Data>().project_start_time {
            return Err(Error::InvalidTime);
        }

        if total_supply == 0 {
            return Err(Error::InvalidTotalSupply);
        }

        if total_supply > self.data::<Data>().total_supply {
            let total_changed = total_supply
                .checked_sub(self.data::<Data>().total_supply)
                .ok_or(Error::CheckedOperations)?;
            self.data::<Data>().available_token_amount = self
                .data::<Data>()
                .available_token_amount
                .checked_add(total_changed)
                .ok_or(Error::CheckedOperations)?;
            self.data::<Data>().total_supply = total_supply;

            // Note: Need to approve the additional tokens before topup
            let topup_result = self.topup(total_changed);
            if topup_result.is_err() {
                return Err(Error::CannotTopupToken);
            }
        }

        if total_supply < self.data::<Data>().total_supply {
            let total_changed = self
                .data::<Data>()
                .total_supply
                .checked_sub(total_supply)
                .ok_or(Error::CheckedOperations)?;

            self.data::<Data>().available_token_amount = self
                .data::<Data>()
                .available_token_amount
                .checked_sub(total_changed)
                .ok_or(Error::CheckedOperations)?;
            self.data::<Data>().total_supply = total_supply;

            let caller = Self::env().caller();

            let builder = Psp22Ref::transfer_builder(
                &self.data::<Data>().token_address,
                caller,
                total_changed,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true));

            let token_transfer_result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => Err(Error::CannotTransfer),
            };
                   
            if token_transfer_result.is_err() {
                return Err(Error::CannotTransfer);
            }
        }

        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_generator_contract(&mut self, generator_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().generator_contract = generator_contract;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn set_tx_rate(&mut self, tx_rate: u32) -> Result<(), Error> {
        self.data::<Data>().tx_rate = tx_rate;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn set_is_active(&mut self, phase_id: u8, is_active: bool) -> Result<(), Error> {
        if let Some(mut phase) = self.data::<Data>().phase.get(&phase_id) {
            // Check time condition
            let current_time = Self::env().block_timestamp();

            if current_time >= phase.end_time {
                return Err(Error::InvalidTime);
            }

            if phase.is_active == is_active {
                return Err(Error::InvalidSetActive);
            }

            if is_active {
                // If set phase active, start_time and end_time must not overlap others.
                // Should use set_start_and_end_time to make sure them not overlap before using this func

                for i in 0..self.data::<Data>().total_phase {
                    if i != phase_id {
                        if let Some(phase_info) = self.data::<Data>().phase.get(&i) {
                            if phase_info.is_active
                                && ((phase_info.start_time <= phase.start_time
                                    && phase.start_time <= phase_info.end_time)
                                    || (phase_info.start_time <= phase.end_time
                                        && phase.end_time <= phase_info.end_time)
                                    || (phase.start_time <= phase_info.start_time
                                        && phase_info.start_time <= phase.end_time)
                                    || (phase.start_time <= phase_info.end_time
                                        && phase_info.end_time <= phase.end_time))
                            {
                                return Err(Error::InvalidStartTimeAndEndTime);
                            }
                        }
                    }
                }

                // Update project_start_time and project_end_time
                if self.data::<Data>().project_start_time > phase.start_time {
                    self.data::<Data>().project_start_time = phase.start_time;
                }

                if self.data::<Data>().project_end_time < phase.end_time {
                    self.data::<Data>().project_end_time = phase.end_time;
                }

                // Update available_token_amount
                if let Some(public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id)
                {
                    if public_sale_info.is_public {
                        let public_total_changed = public_sale_info
                            .total_amount
                            .checked_sub(public_sale_info.total_purchased_amount)
                            .ok_or(Error::CheckedOperations)?;
                        self.data::<Data>().available_token_amount = self
                            .data::<Data>()
                            .available_token_amount
                            .checked_sub(public_total_changed)
                            .ok_or(Error::CheckedOperations)?;
                    }
                }

                if let Some(whitelist_sale_info) =
                    self.data::<Data>().whitelist_sale_info.get(&phase_id)
                {
                    let whitelist_total_changed = whitelist_sale_info
                        .total_amount
                        .checked_sub(whitelist_sale_info.total_purchased_amount)
                        .ok_or(Error::CheckedOperations)?;
                    self.data::<Data>().available_token_amount = self
                        .data::<Data>()
                        .available_token_amount
                        .checked_sub(whitelist_total_changed)
                        .ok_or(Error::CheckedOperations)?;
                }
            } else {
                // Update project_start_time and project_end_time
                if self.data::<Data>().project_start_time == phase.start_time {
                    let mut project_start_time = 0;
                    for i in 0..self.data::<Data>().total_phase {
                        if i != phase_id {
                            if let Some(phase_info) = self.data::<Data>().phase.get(&i) {
                                if phase_info.is_active
                                    && (project_start_time > phase_info.start_time
                                        || project_start_time == 0)
                                {
                                    project_start_time = phase_info.start_time;
                                }
                            }
                        }
                    }

                    if project_start_time != 0 {
                        // return Err(Error::NoPhaseActive);
                        self.data::<Data>().project_start_time = project_start_time;
                    }                    
                }

                if self.data::<Data>().project_end_time == phase.end_time {
                    let mut project_end_time = 0;
                    for i in 0..self.data::<Data>().total_phase {
                        if i != phase_id {
                            if let Some(phase_info) = self.data::<Data>().phase.get(&i) {
                                if phase_info.is_active && (project_end_time < phase_info.end_time)
                                {
                                    project_end_time = phase_info.end_time;
                                }
                            }
                        }
                    }

                    if project_end_time != 0 {
                        // return Err(Error::NoPhaseActive);
                        self.data::<Data>().project_end_time = project_end_time;
                    }                    
                }

                // Update available_token_amount
                if let Some(public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id)
                {
                    if public_sale_info.is_public {
                        let public_total_changed = public_sale_info
                            .total_amount
                            .checked_sub(public_sale_info.total_purchased_amount)
                            .ok_or(Error::CheckedOperations)?;
                        self.data::<Data>().available_token_amount = self
                            .data::<Data>()
                            .available_token_amount
                            .checked_add(public_total_changed)
                            .ok_or(Error::CheckedOperations)?;
                    }
                }

                if let Some(whitelist_sale_info) =
                    self.data::<Data>().whitelist_sale_info.get(&phase_id)
                {
                    let whitelist_total_changed = whitelist_sale_info
                        .total_amount
                        .checked_sub(whitelist_sale_info.total_purchased_amount)
                        .ok_or(Error::CheckedOperations)?;
                    self.data::<Data>().available_token_amount = self
                        .data::<Data>()
                        .available_token_amount
                        .checked_add(whitelist_total_changed)
                        .ok_or(Error::CheckedOperations)?;
                }
            }

            phase.is_active = is_active;

            self.data::<Data>().phase.insert(&phase_id, &phase);
            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn set_name(&mut self, phase_id: u8, name: String) -> Result<(), Error> {
        if let Some(mut phase) = self.data::<Data>().phase.get(&phase_id) {
            phase.name = name;
            self.data::<Data>().phase.insert(&phase_id, &phase);
            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn set_start_and_end_time(
        &mut self,
        phase_id: u8,
        start_time: u64,
        end_time: u64,
    ) -> Result<(), Error> {
        if let Some(mut phase) = self.data::<Data>().phase.get(&phase_id) {
            // Check time condition
            let current_time = Self::env().block_timestamp();

            if current_time > end_time || start_time >= end_time || start_time == 0 {
                return Err(Error::InvalidTime);
            }

            // If the current time is already in the sale time, the new start time must be <= current start time. Otherwise there may be some purchases within [phase.start_time, new start time) which are not in the new sale time  
            if phase.start_time > 0 && current_time >= phase.start_time && start_time > phase.start_time {
                return Err(Error::InvalidTime);
            }

            let mut min_time = start_time;
            let mut max_time = end_time;

            // Check if it is overlapped
            for i in 0..self.data::<Data>().total_phase {
                if i != phase_id {
                    if let Some(phase_info) = self.data::<Data>().phase.get(&i) {
                        if phase_info.is_active { 
                            if  (phase_info.start_time <= start_time && start_time <= phase_info.end_time) ||
                                (phase_info.start_time <= end_time && end_time <= phase_info.end_time) || 
                                (start_time <= phase_info.start_time && phase_info.start_time <= end_time) ||
                                (start_time <= phase_info.end_time && phase_info.end_time <= end_time)  
                            {
                                return Err(Error::InvalidTime);
                            }  

                            if phase.is_active && min_time > phase_info.start_time {
                                min_time = phase_info.start_time;
                            }

                            if phase.is_active && max_time < phase_info.end_time {
                                max_time = phase_info.end_time;
                            }
                        }
                    }
                }
            }

            // Update project_start_time and project_end_time if phase is active
            if phase.is_active {
                self.data::<Data>().project_start_time = min_time; 
                self.data::<Data>().project_end_time = max_time;  
            }

            phase.start_time = start_time;
            phase.end_time = end_time;

            // Update end_vesting_time
            phase.end_vesting_time = phase
                .end_time
                .checked_add(phase.vesting_duration)
                .ok_or(Error::CheckedOperations)?;

            self.data::<Data>().phase.insert(&phase_id, &phase);

            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn set_immediate_release_rate(
        &mut self,
        phase_id: u8,
        immediate_release_rate: u32,
    ) -> Result<(), Error> {
        if let Some(mut phase) = self.data::<Data>().phase.get(&phase_id) {
            // Check time condition
            let current_time = Self::env().block_timestamp();

            if current_time >= phase.start_time {
                return Err(Error::InvalidTime);
            }

            if immediate_release_rate > 10000 {
                return Err(Error::InvalidPercentage);
            }

            phase.immediate_release_rate = immediate_release_rate;
            self.data::<Data>().phase.insert(&phase_id, &phase);
            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn set_vesting_duration(&mut self, phase_id: u8, vesting_duration: u64) -> Result<(), Error> {
        if let Some(mut phase) = self.data::<Data>().phase.get(&phase_id) {
            // Check time condition
            let current_time = Self::env().block_timestamp();

            if current_time >= phase.end_time {
                return Err(Error::InvalidTime);
            }

            phase.vesting_duration = vesting_duration;
            phase.end_vesting_time = phase
                .end_time
                .checked_add(phase.vesting_duration)
                .ok_or(Error::CheckedOperations)?;

            phase.total_vesting_units = phase
                .vesting_duration
                .checked_div(phase.vesting_unit)
                .ok_or(Error::CheckedOperations)?;
            if phase
                .total_vesting_units
                .checked_mul(phase.vesting_unit)
                .ok_or(Error::CheckedOperations)?
                < phase.vesting_duration
            {
                phase.total_vesting_units = phase
                    .total_vesting_units
                    .checked_add(1)
                    .ok_or(Error::CheckedOperations)?;
            }

            self.data::<Data>().phase.insert(&phase_id, &phase);
            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn set_vesting_unit(&mut self, phase_id: u8, vesting_unit: u64) -> Result<(), Error> {
        if let Some(mut phase) = self.data::<Data>().phase.get(&phase_id) {
            // Check time condition
            let current_time = Self::env().block_timestamp();

            if current_time >= phase.end_time {
                return Err(Error::InvalidTime);
            }

            if vesting_unit == 0 {
                return Err(Error::InvalidDuration);
            }

            phase.vesting_unit = vesting_unit;

            phase.total_vesting_units = phase
                .vesting_duration
                .checked_div(phase.vesting_unit)
                .ok_or(Error::CheckedOperations)?;
            if phase
                .total_vesting_units
                .checked_mul(phase.vesting_unit)
                .ok_or(Error::CheckedOperations)?
                < phase.vesting_duration
            {
                phase.total_vesting_units = phase
                    .total_vesting_units
                    .checked_add(1)
                    .ok_or(Error::CheckedOperations)?;
            }

            self.data::<Data>().phase.insert(&phase_id, &phase);
            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    // Note: Can only set before phase start time and when phase is active
    #[modifiers(only_role(ADMINER))]
    fn set_is_public(&mut self, phase_id: u8, is_public: bool) -> Result<(), Error> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            // Check time condition
            let current_time = Self::env().block_timestamp();

            if current_time >= phase.start_time {
                return Err(Error::InvalidTime);
            }

            if !phase.is_active {
                return Err(Error::PhaseNotActive);
            }

            if let Some(mut public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id)
            {
                if public_sale_info.is_public == is_public {
                    return Err(Error::InvalidSetPublic);
                }

                if is_public {
                    self.data::<Data>().available_token_amount = self
                        .data::<Data>()
                        .available_token_amount
                        .checked_sub(public_sale_info.total_amount)
                        .ok_or(Error::CheckedOperations)?;
                } else {
                    self.data::<Data>().available_token_amount = self
                        .data::<Data>()
                        .available_token_amount
                        .checked_add(public_sale_info.total_amount)
                        .ok_or(Error::CheckedOperations)?;
                }

                public_sale_info.is_public = is_public;
                self.data::<Data>()
                    .public_sale_info
                    .insert(&phase_id, &public_sale_info);
            } else {
                return Err(Error::PublicSaleInfoNotExist);
            }

            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn set_public_total_amount(
        &mut self,
        phase_id: u8,
        total_amount: Balance,
    ) -> Result<(), Error> {
        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            // Check time condition
            let current_time = Self::env().block_timestamp();

            if current_time >= phase.start_time {
                return Err(Error::InvalidTime);
            }

            if !phase.is_active {
                return Err(Error::PhaseNotActive);
            }

            if let Some(mut public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id)
            {
                if !public_sale_info.is_public {
                    return Err(Error::PhaseNotPublic);
                }

                if total_amount == 0 {
                    return Err(Error::InvalidTotalAmount);
                }

                self.data::<Data>().available_token_amount = self
                    .data::<Data>()
                    .available_token_amount
                    .checked_add(public_sale_info.total_amount)
                    .ok_or(Error::CheckedOperations)?
                    .checked_sub(total_amount)
                    .ok_or(Error::CheckedOperations)?;

                public_sale_info.total_amount = total_amount;
                self.data::<Data>()
                    .public_sale_info
                    .insert(&phase_id, &public_sale_info);
            } else {
                return Err(Error::PublicSaleInfoNotExist);
            }

            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn set_public_sale_price(&mut self, phase_id: u8, price: Balance) -> Result<(), Error> {
        if let Some(mut public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id) {
            if !public_sale_info.is_public {
                return Err(Error::PhaseNotPublic);
            }

            public_sale_info.price = price;
            self.data::<Data>()
                .public_sale_info
                .insert(&phase_id, &public_sale_info);
            Ok(())
        } else {
            return Err(Error::PublicSaleInfoNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn set_phase(
        &mut self,
        phase_id: u8,
        is_active: bool,
        name: String,
        start_time: u64,
        end_time: u64,
        immediate_release_rate: u32,
        vesting_duration: u64,
        vesting_unit: u64,
        is_public: bool,
        total_amount: Balance,
        price: Balance,
    ) -> Result<(), Error> {
        let set_is_active_result = self.set_is_active(phase_id, is_active);
        if set_is_active_result.is_err() && set_is_active_result != Err(Error::InvalidSetActive) {
            return set_is_active_result;
        }

        if let Some(phase) = self.data::<Data>().phase.get(&phase_id) {
            if phase.is_active {
                let set_name_result = self.set_name(phase_id, name);
                if set_name_result.is_err() {
                    return set_name_result;
                }

                let set_start_and_end_time_result =
                    self.set_start_and_end_time(phase_id, start_time, end_time);
                if set_start_and_end_time_result.is_err() {
                    return set_start_and_end_time_result;
                }

                let set_immediate_release_rate_result =
                    self.set_immediate_release_rate(phase_id, immediate_release_rate);
                if set_immediate_release_rate_result.is_err() {
                    return set_immediate_release_rate_result;
                }

                let set_vesting_duration_result = self.set_vesting_duration(phase_id, vesting_duration);
                if set_vesting_duration_result.is_err() {
                    return set_vesting_duration_result;
                }

                let set_vesting_unit_result = self.set_vesting_unit(phase_id, vesting_unit);
                if set_vesting_unit_result.is_err() {
                    return set_vesting_unit_result;
                }

                let set_is_public_result = self.set_is_public(phase_id, is_public);
                if set_is_public_result.is_err() && set_is_public_result != Err(Error::InvalidSetPublic) {
                    return set_is_public_result;
                }

                if let Some(public_sale_info) = self.data::<Data>().public_sale_info.get(&phase_id) {
                    if public_sale_info.is_public {                    
                        let set_public_total_amount_result = self.set_public_total_amount(phase_id, total_amount);
                        if set_public_total_amount_result.is_err() {
                            return set_public_total_amount_result;
                        }

                        let set_public_sale_price_result = self.set_public_sale_price(phase_id, price);
                        if set_public_sale_price_result.is_err() {
                            return set_public_sale_price_result;
                        }
                    } 
                }   
            } 
        }       

        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn set_multi_phases(
        &mut self,
        phase_id: Vec<u8>,
        is_active: Vec<bool>,
        name: Vec<String>,
        start_time: Vec<u64>,
        end_time: Vec<u64>,
        immediate_release_rate: Vec<u32>,
        vesting_duration: Vec<u64>,
        vesting_unit: Vec<u64>,
        is_public: Vec<bool>,
        total_amount: Vec<Balance>,
        price: Vec<Balance>,
    ) -> Result<(), Error> {
        let len = phase_id.len();

        if len == 0
            || len != is_active.len()
            || len != name.len()
            || len != start_time.len()
            || len != end_time.len()
            || len != immediate_release_rate.len()
            || len != vesting_duration.len()
            || len != vesting_unit.len()
            || len != is_public.len()
            || len != total_amount.len()
            || len != price.len()
        {
            return Err(Error::InvalidPhaseData);
        }

        for i in 0..len {
            let set_phase_result = self.set_phase(
                phase_id[i],
                is_active[i],
                name[i].clone(),
                start_time[i],
                end_time[i],
                immediate_release_rate[i],
                vesting_duration[i],
                vesting_unit[i],
                is_public[i],
                total_amount[i],
                price[i],
            );

            if set_phase_result.is_err() {
                return set_phase_result;
            }
        }

        Ok(())
    }

    // Funcs

    // Note: Need to approve >= amount before calling topup func
    fn topup(&mut self, amount: Balance) -> Result<(), Error> {
        let caller = Self::env().caller();

        let allowance = Psp22Ref::allowance(
            &self.data::<Data>().token_address,
            caller,
            Self::env().account_id(),
        );

        let balance = Psp22Ref::balance_of(&self.data::<Data>().token_address, caller);

        if allowance < amount || balance < amount {
            return Err(Error::InvalidBalanceAndAllowance);
        }

        // Transfer token to launchpad contract
        let builder = Psp22Ref::transfer_from_builder(
            &self.data::<Data>().token_address,
            caller,
            Self::env().account_id(),
            amount,
            Vec::<u8>::new(),
        );
        // .call_flags(CallFlags::default().set_allow_reentry(true));

        match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => Err(Error::CannotTransfer),
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn add_multi_whitelists(
        &mut self,
        phase_id: u8,
        accounts: Vec<AccountId>,
        whitelist_amounts: Vec<Balance>,
        whitelist_prices: Vec<Balance>,
    ) -> Result<(), Error> {
        if let Some(phase_info) = self.data::<Data>().phase.get(&phase_id) {
            if !phase_info.is_active {
                return Err(Error::PhaseNotActive);
            }

            let current_time = Self::env().block_timestamp();
            if current_time >= phase_info.end_time {
                return Err(Error::InvalidTime);
            }

            let whitelist_count = accounts.len();
            if whitelist_count == 0
                || whitelist_count != whitelist_amounts.len()
                || whitelist_count != whitelist_prices.len()
            {
                return Err(Error::InvalidWhitelistData);
            }

            let mut total_amount: Balance = 0;

            for i in 0..whitelist_count {
                if self
                    .data::<Data>()
                    .whitelist_buyer
                    .get(&(&phase_id, &accounts[i]))
                    .is_some()
                {
                    return Err(Error::WhitelistBuyerInfoExist);
                }

                self.data::<Data>().available_token_amount = self
                    .data::<Data>()
                    .available_token_amount
                    .checked_sub(whitelist_amounts[i])
                    .ok_or(Error::CheckedOperations)?;
                total_amount = total_amount
                    .checked_add(whitelist_amounts[i])
                    .ok_or(Error::CheckedOperations)?;

                let whitelist_buyer_info = WhitelistBuyerInfo {
                    amount: whitelist_amounts[i],
                    price: whitelist_prices[i],
                    purchased_amount: 0,
                    vesting_amount: 0,
                    claimed_amount: 0,
                    last_updated_time: 0,
                };

                self.data::<Data>()
                    .whitelist_buyer
                    .insert(&(&phase_id, &accounts[i]), &whitelist_buyer_info);
                self.data::<Data>()
                    .whitelist_account
                    .insert(phase_id, &accounts[i]);
            }

            // Add whitelist_sale_info
            if let Some(mut whitelist_sale_info) =
                self.data::<Data>().whitelist_sale_info.get(&phase_id)
            {
                whitelist_sale_info.total_amount = whitelist_sale_info
                    .total_amount
                    .checked_add(total_amount)
                    .ok_or(Error::CheckedOperations)?;

                self.data::<Data>()
                    .whitelist_sale_info
                    .insert(&phase_id, &whitelist_sale_info);
            } else {
                // Add multi whitelists the first time
                let whitelist_sale_info = WhitelistSaleInfo {
                    total_amount,
                    total_purchased_amount: 0,
                    total_claimed_amount: 0,
                    is_burned: false,
                    is_withdrawn: false,
                };

                self.data::<Data>()
                    .whitelist_sale_info
                    .insert(&phase_id, &whitelist_sale_info);
            }

            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    #[modifiers(only_role(ADMINER))]
    fn update_multi_whitelists(
        &mut self,
        phase_id: u8,
        accounts: Vec<AccountId>,
        whitelist_amounts: Vec<Balance>,
        whitelist_prices: Vec<Balance>,
    ) -> Result<(), Error> {
        if let Some(phase_info) = self.data::<Data>().phase.get(&phase_id) {
            if !phase_info.is_active {
                return Err(Error::PhaseNotActive);
            }

            let current_time = Self::env().block_timestamp();
            if current_time >= phase_info.end_time {
                return Err(Error::InvalidTime);
            }

            let whitelist_count = accounts.len();
            if whitelist_count == 0
                || whitelist_count != whitelist_amounts.len()
                || whitelist_count != whitelist_prices.len()
            {
                return Err(Error::InvalidWhitelistData);
            }

            let total_in = whitelist_amounts.iter().sum();
            let mut total_out: Balance = 0;

            for i in 0..whitelist_count {
                if let Some(mut whitelist_buyer_info) = self
                    .data::<Data>()
                    .whitelist_buyer
                    .get(&(&phase_id, &accounts[i]))
                {
                    // User already purchased, cannot update
                    if whitelist_buyer_info.purchased_amount > 0 {
                        return Err(Error::WhitelistBuyerPurchased);
                    }

                    // Get total out
                    total_out = total_out
                        .checked_add(whitelist_buyer_info.amount)
                        .ok_or(Error::CheckedOperations)?;

                    // Update new white list info
                    whitelist_buyer_info.amount = whitelist_amounts[i];
                    whitelist_buyer_info.price = whitelist_prices[i];

                    self.data::<Data>()
                        .whitelist_buyer
                        .insert(&(&phase_id, &accounts[i]), &whitelist_buyer_info);
                } else {
                    return Err(Error::WhitelistBuyerInfoNotExist);
                }
            }

            // Update whitelist sale info total amount
            if let Some(mut whitelist_sale_info) =
                self.data::<Data>().whitelist_sale_info.get(&phase_id)
            {
                self.data::<Data>().available_token_amount = self
                    .data::<Data>()
                    .available_token_amount
                    .checked_add(total_out)
                    .ok_or(Error::CheckedOperations)?
                    .checked_sub(total_in)
                    .ok_or(Error::CheckedOperations)?;

                whitelist_sale_info.total_amount = whitelist_sale_info
                    .total_amount
                    .checked_add(total_in)
                    .ok_or(Error::CheckedOperations)?
                    .checked_sub(total_out)
                    .ok_or(Error::CheckedOperations)?;

                self.data::<Data>()
                    .whitelist_sale_info
                    .insert(&phase_id, &whitelist_sale_info);
            } else {
                return Err(Error::WhitelistSaleInfoNotExist);
            }

            Ok(())
        } else {
            return Err(Error::PhaseNotExist);
        }
    }

    fn _emit_public_purchase_event(
        &self,
        _launchpad_contract: AccountId,
        _token_contract: AccountId,
        _buyer: AccountId,
        _amount: Balance,
    ) {
    }

    fn _emit_public_claim_event(
        &self,
        _launchpad_contract: AccountId,
        _token_contract: AccountId,
        _buyer: AccountId,
        _amount: Balance,
    ) {
    }

    fn _emit_whitelist_purchase_event(
        &self,
        _launchpad_contract: AccountId,
        _token_contract: AccountId,
        _buyer: AccountId,
        _amount: Balance,
    ) {
    }

    fn _emit_whitelist_claim_event(
        &self,
        _launchpad_contract: AccountId,
        _token_contract: AccountId,
        _buyer: AccountId,
        _amount: Balance,
    ) {
    }

    fn public_purchase(&mut self, phase_id: u8, amount: Balance) -> Result<(), Error> {
        if let Some(is_active_launchpad) = LaunchpadGeneratorRef::get_is_active_launchpad(
            &self.data::<Data>().generator_contract,
            Self::env().account_id(),
        ) {
            if !is_active_launchpad {
                return Err(Error::LaunchpadNotActive);
            }

            if let Some(phase_info) = self.data::<Data>().phase.get(&phase_id) {
                // Check if phase is active
                if !phase_info.is_active {
                    return Err(Error::PhaseNotActive);
                }

                // Check purchased time
                let current_time = Self::env().block_timestamp();

                if phase_info.start_time > current_time || phase_info.end_time < current_time {
                    return Err(Error::NotTimeToPurchase);
                }

                if let Some(mut public_sale_info) =
                    self.data::<Data>().public_sale_info.get(&phase_id)
                {
                    if !public_sale_info.is_public {
                        return Err(Error::PhaseNotPublic);
                    }

                    // Check amount to buy
                    if amount == 0
                        || public_sale_info
                            .total_purchased_amount
                            .checked_add(amount)
                            .ok_or(Error::CheckedOperations)?
                            > public_sale_info.total_amount
                    {
                        return Err(Error::InvalidBuyAmount);
                    }

                    let decimal = Psp22Ref::token_decimals(&self.data::<Data>().token_address);

                    // price to buy amount of token
                    let price = public_sale_info
                        .price
                        .checked_mul(amount)
                        .ok_or(Error::CheckedOperations)?
                        .checked_div(10_u128.pow(decimal as u32))
                        .ok_or(Error::CheckedOperations)?;

                    if price > Self::env().transferred_value() {
                        return Err(Error::InvalidTransferAmount);
                    }

                    // tx fee
                    let tx_fee = price
                        .checked_mul(self.data::<Data>().tx_rate as u128)
                        .ok_or(Error::CheckedOperations)?
                        .checked_div(10000)
                        .ok_or(Error::CheckedOperations)?;

                    // Transfer tx fee to generator_contract
                    if Self::env()
                        .transfer(self.data::<Data>().generator_contract, tx_fee)
                        .is_err()
                    {
                        return Err(Error::CannotTransferTxFee);
                    };

                    // Return immediately tokens within release rate
                    let claim = amount
                        .checked_mul(phase_info.immediate_release_rate as u128)
                        .ok_or(Error::CheckedOperations)?
                        .checked_div(10000)
                        .ok_or(Error::CheckedOperations)?;

                    // Check if contract has enough token to transfer
                    let balance = Psp22Ref::balance_of(
                        &self.data::<Data>().token_address,
                        Self::env().account_id(),
                    );

                    if balance < claim {
                        return Err(Error::NotEnoughBalance);
                    }

                    // Transfer token to caller
                    let caller = Self::env().caller();
                    let builder = Psp22Ref::transfer_builder(
                        &self.data::<Data>().token_address,
                        caller,
                        claim,
                        Vec::<u8>::new(),
                    )
                    .call_flags(CallFlags::default().set_allow_reentry(true));

                    let result = match builder.try_invoke() {
                        Ok(Ok(Ok(_))) => Ok(()),
                        Ok(Ok(Err(e))) => Err(e.into()),
                        Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                        Err(ink::env::Error::NotCallable) => Ok(()),
                        _ => Err(Error::CannotTransfer),
                    };

                    if result.is_err() {
                        return result;
                        // return Err(Error::CannotTransfer);
                    }

                    // Save data
                    let buyer_data = self.data::<Data>().public_buyer.get(&(&phase_id, &caller));

                    if let Some(mut buy_info) = buyer_data {
                        buy_info.purchased_amount = buy_info
                            .purchased_amount
                            .checked_add(amount)
                            .ok_or(Error::CheckedOperations)?;
                        buy_info.claimed_amount = buy_info
                            .claimed_amount
                            .checked_add(claim)
                            .ok_or(Error::CheckedOperations)?;
                        buy_info.last_updated_time = current_time;

                        self.data::<Data>()
                            .public_buyer
                            .insert(&(&phase_id, &caller), &buy_info);
                    } else {
                        let buy_info = BuyerInformation {
                            purchased_amount: amount,
                            vesting_amount: 0,
                            claimed_amount: claim,
                            last_updated_time: current_time,
                        };

                        self.data::<Data>()
                            .public_buyer
                            .insert(&(&phase_id, &caller), &buy_info);
                    }

                    public_sale_info.total_purchased_amount = public_sale_info
                        .total_purchased_amount
                        .checked_add(amount)
                        .ok_or(Error::CheckedOperations)?;
                    public_sale_info.total_claimed_amount = public_sale_info
                        .total_claimed_amount
                        .checked_add(claim)
                        .ok_or(Error::CheckedOperations)?;
                    self.data::<Data>()
                        .public_sale_info
                        .insert(&phase_id, &public_sale_info);

                    let token_address = self.data::<Data>().token_address.clone();
                    self._emit_public_purchase_event(
                        Self::env().account_id(),
                        token_address,
                        caller,
                        amount,
                    );

                    self._emit_public_claim_event(
                        Self::env().account_id(),
                        token_address,
                        caller,
                        claim,
                    );

                    Ok(())
                } else {
                    return Err(Error::PublicSaleInfoNotExist);
                }
            } else {
                return Err(Error::PhaseNotExist);
            }
        } else {
            return Err(Error::ActiveLaunchpadStatusNotFound);
        }
    }

    // Note: User can claim even launchpad or phase is not active because they bought tokens and need to collect
    fn public_claim(&mut self, phase_id: u8) -> Result<(), Error> {
        // if let Some (is_active_launchpad) = LaunchpadGeneratorRef::get_is_active_launchpad(
        //                                         &self.data::<Data>().generator_contract,
        //                                         Self::env().account_id()) {

        //     if !is_active_launchpad {
        //         return Err(Error::LaunchpadNotActive);
        //     }

        if let Some(phase_info) = self.data::<Data>().phase.get(&phase_id) {
            // // Check if phase is active
            // if !phase_info.is_active {
            //     return Err(Error::PhaseNotActive);
            // }

            // Check claim time
            let current_time = Self::env().block_timestamp();

            if phase_info.end_time >= current_time {
                return Err(Error::NotTimeToClaim);
            }

            let caller = Self::env().caller();
            let buyer_data = self.data::<Data>().public_buyer.get(&(&phase_id, &caller));

            if let Some(mut buy_info) = buyer_data {
                // Check if have unclaimed token
                if buy_info.purchased_amount == buy_info.claimed_amount {
                    return Err(Error::NoClaimAmount);
                }

                let mut claim = 0;

                // If it is the last claim
                if current_time >= phase_info.end_vesting_time {
                    claim = buy_info
                        .purchased_amount
                        .checked_sub(buy_info.claimed_amount)
                        .ok_or(Error::CheckedOperations)?;

                    buy_info.last_updated_time = phase_info.end_vesting_time;
                } else {
                    // If it is the first time to claim in the vesting time, get the vesting_amount
                    if buy_info.vesting_amount == 0 {
                        buy_info.vesting_amount = buy_info
                            .purchased_amount
                            .checked_sub(buy_info.claimed_amount)
                            .ok_or(Error::CheckedOperations)?;
                        buy_info.last_updated_time = phase_info.end_time;
                    }

                    // If still have unclaimed token
                    if buy_info.vesting_amount > 0 && phase_info.total_vesting_units > 0 {
                        let units = (current_time
                            .checked_sub(buy_info.last_updated_time)
                            .ok_or(Error::CheckedOperations)?)
                        .checked_div(phase_info.vesting_unit)
                        .ok_or(Error::CheckedOperations)?;

                        claim = buy_info
                            .vesting_amount
                            .checked_mul(units as u128)
                            .ok_or(Error::CheckedOperations)?
                            .checked_div(phase_info.total_vesting_units as u128)
                            .ok_or(Error::CheckedOperations)?;

                        buy_info.last_updated_time = buy_info
                            .last_updated_time
                            .checked_add(
                                units
                                    .checked_mul(phase_info.vesting_unit)
                                    .ok_or(Error::CheckedOperations)?,
                            )
                            .ok_or(Error::CheckedOperations)?;
                    }
                }

                if claim > 0 {
                    // Check if contract has enough token to transfer
                    let balance = Psp22Ref::balance_of(
                        &self.data::<Data>().token_address,
                        Self::env().account_id(),
                    );

                    if balance < claim {
                        return Err(Error::NotEnoughBalance);
                    }

                    // Transfer token to caller
                    let builder = Psp22Ref::transfer_builder(
                        &self.data::<Data>().token_address,
                        caller,
                        claim,
                        Vec::<u8>::new(),
                    )
                    .call_flags(CallFlags::default().set_allow_reentry(true));

                    let result = match builder.try_invoke() {
                        Ok(Ok(Ok(_))) => Ok(()),
                        Ok(Ok(Err(e))) => Err(e.into()),
                        Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                        Err(ink::env::Error::NotCallable) => Ok(()),
                        _ => Err(Error::CannotTransfer),
                    };

                    if result.is_err() {
                        return result;
                        // return Err(Error::CannotTransfer);
                    }

                    // Save data
                    buy_info.claimed_amount = buy_info
                        .claimed_amount
                        .checked_add(claim)
                        .ok_or(Error::CheckedOperations)?;

                    self.data::<Data>()
                        .public_buyer
                        .insert(&(&phase_id, &caller), &buy_info);

                    if let Some(mut public_sale_info) =
                        self.data::<Data>().public_sale_info.get(&phase_id)
                    {
                        public_sale_info.total_claimed_amount = public_sale_info
                            .total_claimed_amount
                            .checked_add(claim)
                            .ok_or(Error::CheckedOperations)?;
                        self.data::<Data>()
                            .public_sale_info
                            .insert(&phase_id, &public_sale_info);
                    } else {
                        return Err(Error::PublicSaleInfoNotExist);
                    }

                    let token_address = self.data::<Data>().token_address.clone();
                    self._emit_public_claim_event(
                        Self::env().account_id(),
                        token_address,
                        caller,
                        claim,
                    );
                } else {
                    return Err(Error::NoClaimAmount);
                }

                Ok(())
            } else {
                return Err(Error::NoTokenPurchased);
            }
        } else {
            return Err(Error::PhaseNotExist);
        }
        // } else {
        //     return Err(Error::ActiveLaunchpadStatusNotFound);
        // }
    }

    fn whitelist_purchase(&mut self, phase_id: u8, amount: Balance) -> Result<(), Error> {
        if let Some(is_active_launchpad) = LaunchpadGeneratorRef::get_is_active_launchpad(
            &self.data::<Data>().generator_contract,
            Self::env().account_id(),
        ) {
            if !is_active_launchpad {
                return Err(Error::LaunchpadNotActive);
            }

            if let Some(phase_info) = self.data::<Data>().phase.get(&phase_id) {
                // Check if phase is active
                if !phase_info.is_active {
                    return Err(Error::PhaseNotActive);
                }

                // Check purchased time
                let current_time = Self::env().block_timestamp();

                if phase_info.start_time > current_time || phase_info.end_time < current_time {
                    return Err(Error::NotTimeToPurchase);
                }

                let caller = Self::env().caller();

                if let Some(mut buy_info) = self
                    .data::<Data>()
                    .whitelist_buyer
                    .get(&(&phase_id, &caller))
                {
                    // Check amount to buy
                    if amount == 0
                        || buy_info
                            .purchased_amount
                            .checked_add(amount)
                            .ok_or(Error::CheckedOperations)?
                            > buy_info.amount
                    {
                        return Err(Error::InvalidBuyAmount);
                    }

                    let decimal = Psp22Ref::token_decimals(&self.data::<Data>().token_address);

                    // price to buy amount of token
                    let price = buy_info
                        .price
                        .checked_mul(amount)
                        .ok_or(Error::CheckedOperations)?
                        .checked_div(10_u128.pow(decimal as u32))
                        .ok_or(Error::CheckedOperations)?;

                    if price > Self::env().transferred_value() {
                        return Err(Error::InvalidTransferAmount);
                    }

                    // tx fee
                    let tx_fee = price
                        .checked_mul(self.data::<Data>().tx_rate as u128)
                        .ok_or(Error::CheckedOperations)?
                        .checked_div(10000)
                        .ok_or(Error::CheckedOperations)?;

                    // Transfer tx fee to generator_contract
                    if Self::env()
                        .transfer(self.data::<Data>().generator_contract, tx_fee)
                        .is_err()
                    {
                        return Err(Error::CannotTransferTxFee);
                    };

                    // Return immediately tokens within release rate
                    let claim = amount
                        .checked_mul(phase_info.immediate_release_rate as u128)
                        .ok_or(Error::CheckedOperations)?
                        .checked_div(10000)
                        .ok_or(Error::CheckedOperations)?;

                    // Check if contract has enough token to transfer
                    let balance = Psp22Ref::balance_of(
                        &self.data::<Data>().token_address,
                        Self::env().account_id(),
                    );

                    if balance < claim {
                        return Err(Error::NotEnoughBalance);
                    }

                    // Transfer token to caller
                    let builder = Psp22Ref::transfer_builder(
                        &self.data::<Data>().token_address,
                        caller,
                        claim,
                        Vec::<u8>::new(),
                    )
                    .call_flags(CallFlags::default().set_allow_reentry(true));

                    let result = match builder.try_invoke() {
                        Ok(Ok(Ok(_))) => Ok(()),
                        Ok(Ok(Err(e))) => Err(e.into()),
                        Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                        Err(ink::env::Error::NotCallable) => Ok(()),
                        _ => Err(Error::CannotTransfer),
                    };

                    if result.is_err() {
                        return result;
                        // return Err(Error::CannotTransfer);
                    }

                    // Save data
                    buy_info.purchased_amount = buy_info
                        .purchased_amount
                        .checked_add(amount)
                        .ok_or(Error::CheckedOperations)?;
                    buy_info.claimed_amount = buy_info
                        .claimed_amount
                        .checked_add(claim)
                        .ok_or(Error::CheckedOperations)?;
                    buy_info.last_updated_time = current_time;

                    self.data::<Data>()
                        .whitelist_buyer
                        .insert(&(&phase_id, &caller), &buy_info);

                    if let Some(mut whitelist_sale_info) =
                        self.data::<Data>().whitelist_sale_info.get(&phase_id)
                    {
                        whitelist_sale_info.total_purchased_amount = whitelist_sale_info
                            .total_purchased_amount
                            .checked_add(amount)
                            .ok_or(Error::CheckedOperations)?;
                        whitelist_sale_info.total_claimed_amount = whitelist_sale_info
                            .total_claimed_amount
                            .checked_add(claim)
                            .ok_or(Error::CheckedOperations)?;
                        self.data::<Data>()
                            .whitelist_sale_info
                            .insert(&phase_id, &whitelist_sale_info);
                    } else {
                        return Err(Error::WhitelistSaleInfoNotExist);
                    }

                    let token_address = self.data::<Data>().token_address.clone();
                    self._emit_whitelist_purchase_event(
                        Self::env().account_id(),
                        token_address,
                        caller,
                        amount,
                    );

                    self._emit_whitelist_claim_event(
                        Self::env().account_id(),
                        token_address,
                        caller,
                        claim,
                    );

                    Ok(())
                } else {
                    return Err(Error::WhitelistPhaseAccountNotExist);
                }
            } else {
                return Err(Error::PhaseNotExist);
            }
        } else {
            return Err(Error::ActiveLaunchpadStatusNotFound);
        }
    }

    // Note: User can claim even launchpad or phase is not active because they bought tokens and need to collect
    fn whitelist_claim(&mut self, phase_id: u8) -> Result<(), Error> {
        // if let Some (is_active_launchpad) = LaunchpadGeneratorRef::get_is_active_launchpad(
        //                                         &self.data::<Data>().generator_contract,
        //                                         Self::env().account_id()) {

        //     if !is_active_launchpad {
        //         return Err(Error::LaunchpadNotActive);
        //     }

        if let Some(phase_info) = self.data::<Data>().phase.get(&phase_id) {
            // Check if phase is active
            // if !phase_info.is_active {
            //     return Err(Error::PhaseNotActive);
            // }

            // Check claim time
            let current_time = Self::env().block_timestamp();

            if phase_info.end_time >= current_time {
                return Err(Error::NotTimeToClaim);
            }

            let caller = Self::env().caller();

            if let Some(mut buy_info) = self
                .data::<Data>()
                .whitelist_buyer
                .get(&(&phase_id, &caller))
            {
                // Check if have unclaimed token
                if buy_info.purchased_amount == buy_info.claimed_amount {
                    return Err(Error::NoClaimAmount);
                }

                let mut claim = 0;

                // If it is the last claim
                if current_time >= phase_info.end_vesting_time {
                    claim = buy_info
                        .purchased_amount
                        .checked_sub(buy_info.claimed_amount)
                        .ok_or(Error::CheckedOperations)?;

                    buy_info.last_updated_time = phase_info.end_vesting_time;
                } else {
                    // If it is the first time to claim in the vesting time, get the vesting_amount
                    if buy_info.vesting_amount == 0 {
                        buy_info.vesting_amount = buy_info
                            .purchased_amount
                            .checked_sub(buy_info.claimed_amount)
                            .ok_or(Error::CheckedOperations)?;
                        buy_info.last_updated_time = phase_info.end_time;
                    }

                    // If still have unclaimed token
                    if buy_info.vesting_amount > 0 && phase_info.total_vesting_units > 0 {
                        let units = (current_time
                            .checked_sub(buy_info.last_updated_time)
                            .ok_or(Error::CheckedOperations)?)
                        .checked_div(phase_info.vesting_unit)
                        .ok_or(Error::CheckedOperations)?;

                        claim = buy_info
                            .vesting_amount
                            .checked_mul(units as u128)
                            .ok_or(Error::CheckedOperations)?
                            .checked_div(phase_info.total_vesting_units as u128)
                            .ok_or(Error::CheckedOperations)?;

                        buy_info.last_updated_time = buy_info
                            .last_updated_time
                            .checked_add(
                                units
                                    .checked_mul(phase_info.vesting_unit)
                                    .ok_or(Error::CheckedOperations)?,
                            )
                            .ok_or(Error::CheckedOperations)?;
                    }
                }

                if claim > 0 {
                    // Check if contract has enough token to transfer
                    let balance = Psp22Ref::balance_of(
                        &self.data::<Data>().token_address,
                        Self::env().account_id(),
                    );

                    if balance < claim {
                        return Err(Error::NotEnoughBalance);
                    }

                    // Transfer token to caller
                    let builder = Psp22Ref::transfer_builder(
                        &self.data::<Data>().token_address,
                        caller,
                        claim,
                        Vec::<u8>::new(),
                    )
                    .call_flags(CallFlags::default().set_allow_reentry(true));

                    let result = match builder.try_invoke() {
                        Ok(Ok(Ok(_))) => Ok(()),
                        Ok(Ok(Err(e))) => Err(e.into()),
                        Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                        Err(ink::env::Error::NotCallable) => Ok(()),
                        _ => Err(Error::CannotTransfer),
                    };

                    if result.is_err() {
                        return result;
                        // return Err(Error::CannotTransfer);
                    }

                    // Save data
                    buy_info.claimed_amount = buy_info
                        .claimed_amount
                        .checked_add(claim)
                        .ok_or(Error::CheckedOperations)?;

                    self.data::<Data>()
                        .whitelist_buyer
                        .insert(&(&phase_id, &caller), &buy_info);

                    if let Some(mut whitelist_sale_info) =
                        self.data::<Data>().whitelist_sale_info.get(&phase_id)
                    {
                        whitelist_sale_info.total_claimed_amount = whitelist_sale_info
                            .total_claimed_amount
                            .checked_add(claim)
                            .ok_or(Error::CheckedOperations)?;
                        self.data::<Data>()
                            .whitelist_sale_info
                            .insert(&phase_id, &whitelist_sale_info);
                    } else {
                        return Err(Error::WhitelistSaleInfoNotExist);
                    }

                    let token_address = self.data::<Data>().token_address.clone();
                    self._emit_whitelist_claim_event(
                        Self::env().account_id(),
                        token_address,
                        caller,
                        claim,
                    );
                } else {
                    return Err(Error::NoClaimAmount);
                }

                Ok(())
            } else {
                return Err(Error::WhitelistPhaseAccountNotExist);
            }
        } else {
            return Err(Error::PhaseNotExist);
        }
        // } else {
        //     return Err(Error::ActiveLaunchpadStatusNotFound);
        // }
    }

    // Burn all public and whitelisted unsold tokens in contract
    #[modifiers(only_owner)]
    fn burn_unsold_tokens(&mut self) -> Result<(), Error> {
        // Check burning time
        let current_time = Self::env().block_timestamp();

        if self.data::<Data>().project_end_time >= current_time {
            return Err(Error::NotTimeToBurn);
        }

        // Check the unsold and burn
        let mut total_burned: Balance = 0;

        for i in 0..self.data::<Data>().total_phase {
            if let Some(phase_info) = self.data::<Data>().phase.get(&i) {
                // Check if phase is active
                if phase_info.is_active {
                    // Check public sale info
                    if let Some(mut public_sale_info) = self.data::<Data>().public_sale_info.get(&i) {
                        if public_sale_info.is_public && !public_sale_info.is_burned {
                            if public_sale_info.total_purchased_amount < public_sale_info.total_amount {
                                total_burned = total_burned
                                    .checked_add(
                                        public_sale_info
                                            .total_amount
                                            .checked_sub(public_sale_info.total_purchased_amount)
                                            .ok_or(Error::CheckedOperations)?,
                                    )
                                    .ok_or(Error::CheckedOperations)?;
                            }

                            public_sale_info.is_burned = true;

                            self.data::<Data>()
                                .public_sale_info
                                .insert(&i, &public_sale_info);
                        }
                    }

                    // Check whitelist sale info
                    if let Some(mut whitelist_sale_info) = self.data::<Data>().whitelist_sale_info.get(&i) {
                        if !whitelist_sale_info.is_burned {
                            if whitelist_sale_info.total_purchased_amount < whitelist_sale_info.total_amount {
                                total_burned = total_burned
                                    .checked_add(
                                        whitelist_sale_info
                                            .total_amount
                                            .checked_sub(whitelist_sale_info.total_purchased_amount)
                                            .ok_or(Error::CheckedOperations)?,
                                    )
                                    .ok_or(Error::CheckedOperations)?;
                            }
                                
                            whitelist_sale_info.is_burned = true;

                            self.data::<Data>()
                                .whitelist_sale_info
                                .insert(&i, &whitelist_sale_info);                            
                        }
                    }
                }
            }
        }

        // Add available_token_amount
        total_burned = total_burned
            .checked_add(self.data::<Data>().available_token_amount)
            .ok_or(Error::CheckedOperations)?;

        // Burn the unsold token
        if total_burned > 0 {
            if Psp22Ref::burn(
                &self.data::<Data>().token_address,
                Self::env().account_id(),
                total_burned,
            )
            .is_err()
            {
                return Err(Error::CannotBurn);
            }
        }

        Ok(())
    }

    // Withdraw all public and whitelisted unsold tokens in contract
    #[modifiers(only_owner)]
    fn withdraw_unsold_tokens(&mut self, receiver: AccountId) -> Result<(), Error> {
        // Check withdrawing time
        let current_time = Self::env().block_timestamp();

        if self.data::<Data>().project_end_time >= current_time {
            return Err(Error::NotTimeToWithdraw);
        }

        // Check the unsold and withdraw
        let mut total_withdraw: Balance = 0;

        for i in 0..self.data::<Data>().total_phase {
            if let Some(phase_info) = self.data::<Data>().phase.get(&i) {
                // Check if phase is active
                if phase_info.is_active {
                    // Check public sale info
                    if let Some(mut public_sale_info) = self.data::<Data>().public_sale_info.get(&i) {
                        if public_sale_info.is_public && !public_sale_info.is_withdrawn {
                            if public_sale_info.total_purchased_amount < public_sale_info.total_amount {
                                total_withdraw = total_withdraw
                                    .checked_add(
                                        public_sale_info
                                            .total_amount
                                            .checked_sub(public_sale_info.total_purchased_amount)
                                            .ok_or(Error::CheckedOperations)?,
                                    )
                                    .ok_or(Error::CheckedOperations)?;
                            }
                            
                            public_sale_info.is_withdrawn = true;

                            self.data::<Data>()
                                .public_sale_info
                                .insert(&i, &public_sale_info);
                        }
                    }

                    // Check whitelist sale info
                    if let Some(mut whitelist_sale_info) = self.data::<Data>().whitelist_sale_info.get(&i) {
                        if !whitelist_sale_info.is_withdrawn {
                            if whitelist_sale_info.total_purchased_amount < whitelist_sale_info.total_amount {
                                total_withdraw = total_withdraw
                                    .checked_add(
                                        whitelist_sale_info
                                            .total_amount
                                            .checked_sub(whitelist_sale_info.total_purchased_amount)
                                            .ok_or(Error::CheckedOperations)?,
                                    )
                                    .ok_or(Error::CheckedOperations)?;                                
                            }

                            whitelist_sale_info.is_withdrawn = true;

                            self.data::<Data>()
                                .whitelist_sale_info
                                .insert(&i, &whitelist_sale_info);
                        }                        
                    }
                }
            }
        }

        // Add available_token_amount
        total_withdraw = total_withdraw
            .checked_add(self.data::<Data>().available_token_amount)
            .ok_or(Error::CheckedOperations)?;

        // Withdraw the unsold token
        if total_withdraw > 0 {
            let builder = Psp22Ref::transfer_builder(
                &self.data::<Data>().token_address,
                receiver,
                total_withdraw,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true));

            let result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => Err(Error::CannotTransfer),
            };

            return result;
        }

        Ok(())
    }

    #[modifiers(only_owner)]
    fn withdraw(&mut self, value: Balance, receiver: AccountId) -> Result<(), Error> {
        if value > Self::env().balance() {
            return Err(Error::NotEnoughBalance);
        }
        if Self::env().transfer(receiver, value).is_err() {
            return Err(Error::WithdrawFeeError);
        }
        Ok(())
    }
}
