pub use crate::{
    impls::launchpad_generator::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        launchpad_generator::*,
        error::Error
    }
};

use ink::prelude::{
    vec::Vec
};

use ink::storage::traits::{
    AutoStorableHint,
    ManualKey,
    Storable,
    StorableHint,
};

use openbrush::{
    modifiers,
    contracts::{
        ownable::*,
        access_control::*,
    },
    traits::{
        Storage,
        Balance,
        AccountId,
        Hash,
        OccupiedStorage
    }
};

impl<T, M> LaunchpadGeneratorTrait for T 
where 
    M: members::MembersManager,
    M: Storable
        + StorableHint<ManualKey<{ access_control::STORAGE_KEY }>>
        + AutoStorableHint<ManualKey<3218979580, ManualKey<{ access_control::STORAGE_KEY }>>, Type = M>,
    T: Storage<access_control::Data<M>>,
    T: OccupiedStorage<{ access_control::STORAGE_KEY }, WithData = access_control::Data<M>>,
    T:  Storage<Data> + 
        Storage<ownable::Data>
{
    // Getters

    default fn get_launchpad_hash(&self) -> Hash {
        self.data::<Data>().launchpad_hash
    }

    default fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    default fn get_creation_fee(&self) -> Balance {
        self.data::<Data>().creation_fee
    }

    default fn get_tx_rate(&self) -> u32 {
        self.data::<Data>().tx_rate
    }

    default fn get_launchpad_count(&self) -> u64 {
        self.data::<Data>().launchpad_count
    }

    default fn get_launchpad_by_id(&self, id: u64) -> Option<AccountId> {
        self.data::<Data>().launchpad_by_id.get(&id)
    }

    default fn get_launchpad_by_owner(&self, owner_address: AccountId) -> Vec<AccountId> {
        self.data::<Data>().launchpad_by_owner.get(&owner_address).unwrap_or_default()
    }

    default fn get_active_launchpad_count(&self) -> u64 {
        self.data::<Data>().active_launchpad_count
    }

    default fn get_is_active_launchpad(&self, address: AccountId) -> Option<bool> {
        self.data::<Data>().is_active_launchpad.get(&address)
    }

    // Setters
  
    #[modifiers(only_owner)]
    default fn set_launchpad_hash(&mut self, launchpad_hash: Hash) -> Result<(), Error> {
        self.data::<Data>().launchpad_hash = launchpad_hash;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }
    
    #[modifiers(only_role(ADMINER))]
    default fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error> {
        if creation_fee == 0 {
            return Err(Error::InvalidCreationFee);
        }
        
        self.data::<Data>().creation_fee = creation_fee;
        Ok(()) 
    }

    #[modifiers(only_role(ADMINER))]
    default fn set_tx_rate(&mut self, tx_rate: u32) -> Result<(), Error> {
        self.data::<Data>().tx_rate = tx_rate;
        Ok(()) 
    }

    #[modifiers(only_role(ADMINER))]
    default fn set_is_active_launchpad(&mut self, address: AccountId, is_active: bool) -> Result<(), Error> {
        if let Some(current_is_active) = self.data::<Data>().is_active_launchpad.get(&address) {
            if is_active == current_is_active {
                return Err(Error::InvalidIsActiveInput);
            }

            self.data::<Data>().is_active_launchpad.insert(&address, &is_active);
            
            if is_active {
                self.data::<Data>().active_launchpad_count = self.data::<Data>().active_launchpad_count.checked_add(1).ok_or(Error::CheckedOperations)?;
            } else {
                self.data::<Data>().active_launchpad_count = self.data::<Data>().active_launchpad_count.checked_sub(1).ok_or(Error::CheckedOperations)?;
            } 

            Ok(())
        } else {
            Err(Error::LaunchpadNotExist)
        }
    }
}