pub use crate::{
    impls::generic_pool_generator::{
        data,
        data::*,
    },
    traits::{
        generic_pool_generator::*,
        error::Error
    }
};

use ink_prelude::{
    vec::Vec,
};

use openbrush::{
    traits::{
        Storage,
        Balance,
        AccountId,
        Hash
    }
};

impl<T> GenericPoolGeneratorTrait for T 
    where 
        T: Storage<Data> 
{
    default fn get_pool_by_owner(
        &self,
        contract_owner: AccountId,
        index: u64,
    ) -> u64 {
        self.data::<Data>()
            .pool_ids
            .get_value(contract_owner, &(index as u128))
            .unwrap()
    }

    default fn get_pool_count_by_owner(&self, contract_owner: AccountId) -> u64 {
        return self.data::<Data>()
            .pool_ids_last_index
            .get(&Some(contract_owner)).unwrap_or(0);
    }

    default fn get_pool(&self, index: u64) -> Option<AccountId> {
        return self.data::<Data>().pool_list.get(&index);
    }

    default fn get_pool_count(&self) -> u64 {
        self.data::<Data>().pool_count
    }

    default fn get_creation_fee(&self) -> Balance {
        self.data::<Data>().creation_fee
    }

    default fn get_unstake_fee(&self) -> Balance {
        self.data::<Data>().unstake_fee
    }

    default fn get_wal_contract(&self) -> AccountId {
        self.data::<Data>().wal_contract
    }
        
    default fn get_pool_hash(&self) -> Hash {
        self.data::<Data>().pool_hash
    }

    default fn set_pool_hash(&mut self, pool_hash: Hash) -> Result<(), Error> {
        self.data::<Data>().pool_hash = pool_hash;
        Ok(())
    }

    default fn set_wal_contract(&mut self, wal_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().wal_contract = wal_contract;
        Ok(())
    }
    
    default fn set_creation_fee(&mut self, creation_fee: Balance) -> Result<(), Error> {
        self.data::<Data>().creation_fee = creation_fee;
        Ok(()) 
    }
      
    default fn set_unstake_fee(&mut self, unstake_fee: Balance) -> Result<(), Error> {
        self.data::<Data>().unstake_fee = unstake_fee;
        Ok(())
    }

    /// Withdraw Fees - only Owner
    default fn withdraw_fee(&mut self, value: Balance) -> Result<(), Error> {
        assert!(value <= Self::env().balance(), "not enough balance");
        assert!(
            Self::env().transfer(Self::env().caller(), value).is_ok(),
            "error withdraw_fee"
        );
        Ok(()) 
    }

    default fn withdraw_wal(&mut self, value: Balance) -> Result<(), Error> {
        assert!(Psp22Ref::transfer(
            &self.data::<Data>().wal_contract,
            Self::env().caller(),
            value,
            Vec::<u8>::new()
        ).is_ok());
        Ok(())
    }
}