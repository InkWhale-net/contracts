pub use crate::{
    impls::launchpad_generator::{data, data::Data, data::*},
    traits::{error::Error, launchpad_generator::*},
};

use ink::prelude::vec::Vec;

use ink::storage::traits::{AutoStorableHint, ManualKey, Storable, StorableHint};

use openbrush::{
    contracts::{access_control::*, ownable::*},
    modifiers,
    traits::{AccountId, Balance, Hash, Storage},
};

pub trait LaunchpadGeneratorTrait:
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
    fn get_launchpad_hash(&self) -> Hash {
        self.data::<Data>().launchpad_hash
    }

    fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    fn get_creation_fee(&self) -> Balance {
        self.data::<Data>().creation_fee
    }

    fn get_tx_rate(&self) -> u32 {
        self.data::<Data>().tx_rate
    }

    fn get_launchpad_count(&self) -> u64 {
        self.data::<Data>().launchpad_count
    }

    fn get_launchpad_by_id(&self, id: u64) -> Option<AccountId> {
        self.data::<Data>().launchpad_by_id.get(&id)
    }

    fn get_launchpad_by_owner(&self, owner_address: AccountId) -> Vec<AccountId> {
        self.data::<Data>()
            .launchpad_by_owner
            .get(&owner_address)
            .unwrap_or_default()
    }

    fn get_active_launchpad_count(&self) -> u64 {
        self.data::<Data>().active_launchpad_count
    }

    fn get_is_active_launchpad(&self, address: AccountId) -> Option<bool> {
        self.data::<Data>().is_active_launchpad.get(&address)
    }

    // Setters
    #[modifiers(only_owner)]
    fn set_launchpad_hash(&mut self, launchpad_hash: Hash) -> Result<(), Error> {
        self.data::<Data>().launchpad_hash = launchpad_hash;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error> {
        if creation_fee == 0 {
            return Err(Error::InvalidCreationFee);
        }

        self.data::<Data>().creation_fee = creation_fee;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn set_tx_rate(&mut self, tx_rate: u32) -> Result<(), Error> {
        if tx_rate > 10000 {
            return Err(Error::InvalidTxRate);
        }

        self.data::<Data>().tx_rate = tx_rate;
        Ok(())
    }

    #[modifiers(only_role(ADMINER))]
    fn set_is_active_launchpad(
        &mut self,
        address: AccountId,
        is_active: bool,
    ) -> Result<(), Error> {
        if let Some(current_is_active) = self.data::<Data>().is_active_launchpad.get(&address) {
            if is_active == current_is_active {
                return Err(Error::InvalidIsActiveInput);
            }

            self.data::<Data>()
                .is_active_launchpad
                .insert(&address, &is_active);

            if is_active {
                self.data::<Data>().active_launchpad_count = self
                    .data::<Data>()
                    .active_launchpad_count
                    .checked_add(1)
                    .ok_or(Error::CheckedOperations)?;
            } else {
                self.data::<Data>().active_launchpad_count = self
                    .data::<Data>()
                    .active_launchpad_count
                    .checked_sub(1)
                    .ok_or(Error::CheckedOperations)?;
            }

            Ok(())
        } else {
            Err(Error::LaunchpadNotExist)
        }
    }
}
