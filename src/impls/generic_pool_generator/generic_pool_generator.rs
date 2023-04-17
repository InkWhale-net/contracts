pub use crate::{
    impls::generic_pool_generator::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        generic_pool_generator::*,
        error::Error
    }
};

use ink::prelude::{
    vec::Vec,
};

use openbrush::{
    modifiers,
    contracts::ownable::*,
    traits::{
        Storage,
        Balance,
        AccountId,
        Hash
    }
};

impl<T> GenericPoolGeneratorTrait for T 
where 
    T:  Storage<Data> + 
        Storage<ownable::Data>
{
    // Getters

    default fn get_pool_hash(&self) -> Hash {
        self.data::<Data>().pool_hash
    }

    default fn get_pool_count(&self) -> u64 {
        self.data::<Data>().pool_count
    }

    default fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    default fn get_creation_fee(&self) -> Balance {
        self.data::<Data>().creation_fee
    }

    default fn get_unstake_fee(&self) -> Balance {
        self.data::<Data>().unstake_fee
    }

    default fn get_pool(&self, index: u64) -> Option<AccountId> {
        return self.data::<Data>().pool_list.get(&index);
    }

    default fn get_pool_by_owner(
        &self,
        contract_owner: AccountId,
        index: u64,
    ) -> Option<u64> {
        self.data::<Data>()
            .pool_ids
            .get_value(contract_owner, &(index as u128))
    }

    default fn get_pool_count_by_owner(&self, contract_owner: AccountId) -> u64 {
        return self.data::<Data>()
            .pool_ids_last_index
            .get(&Some(contract_owner)).unwrap_or(0);
    }

    // Setters
  
    #[modifiers(only_owner)]
    default fn set_pool_hash(&mut self, pool_hash: Hash) -> Result<(), Error> {
        self.data::<Data>().pool_hash = pool_hash;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }
    
    #[modifiers(only_owner)]
    default fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error> {
        self.data::<Data>().creation_fee = creation_fee;
        Ok(()) 
    }
    
    #[modifiers(only_owner)]
    default fn set_unstake_fee(&mut self, unstake_fee: Balance) -> Result<(), Error> {
        self.data::<Data>().unstake_fee = unstake_fee;
        Ok(())
    }
}