pub use crate::{
    impls::generic_pool_generator::{data, data::Data, data::*},
    traits::{error::Error, generic_pool_generator::*},
};

use ink::prelude::{string::String, vec::Vec};

use ink::storage::traits::{AutoStorableHint, ManualKey, Storable, StorableHint};

use openbrush::{
    contracts::ownable::*,
    modifiers,
    traits::{AccountId, Balance, Hash, Storage},
};

pub trait GenericPoolGeneratorTrait:
    Storable
    + StorableHint<ManualKey<{ STORAGE_KEY }>>
    + AutoStorableHint<ManualKey<3218979580, ManualKey<{ STORAGE_KEY }>>>
    + Storage<Data>
    + Storage<ownable::Data>
{
    // Getters

    fn get_pool_hash(&self) -> Hash {
        self.data::<Data>().pool_hash
    }

    fn get_pool_count(&self) -> u64 {
        self.data::<Data>().pool_count
    }

    fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    fn get_creation_fee(&self) -> Balance {
        self.data::<Data>().creation_fee
    }

    fn get_unstake_fee(&self) -> Balance {
        self.data::<Data>().unstake_fee
    }

    fn get_pool(&self, index: u64) -> Option<AccountId> {
        return self.data::<Data>().pool_list.get(&index);
    }

    fn get_pool_by_owner(&self, contract_owner: AccountId, index: u64) -> Option<u64> {
        self.data::<Data>()
            .pool_ids
            .get_value(contract_owner, &(index as u128))
    }

    fn get_pool_count_by_owner(&self, contract_owner: AccountId) -> u64 {
        return self
            .data::<Data>()
            .pool_ids_last_index
            .get(&Some(contract_owner))
            .unwrap_or(0);
    }

    // Setters

    #[modifiers(only_owner)]
    fn set_pool_hash(&mut self, pool_hash: Hash) -> Result<(), Error> {
        self.data::<Data>().pool_hash = pool_hash;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error> {
        self.data::<Data>().creation_fee = creation_fee;
        Ok(())
    }

    #[modifiers(only_owner)]
    fn set_unstake_fee(&mut self, unstake_fee: Balance) -> Result<(), Error> {
        self.data::<Data>().unstake_fee = unstake_fee;
        Ok(())
    }
}
