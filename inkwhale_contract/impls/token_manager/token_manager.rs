pub use crate::{
    impls::token_manager::{
        data,
        data::*,
    },
    traits::{
        token_manager::*,
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
        Hash,
        String
    }
};

impl<T> TokenManagerTrait for T 
where 
    T: Storage<Data>
{
    default fn get_token_info(&self, index: u64) -> Option<Token> {
        return self.data::<Data>().token_list.get(&index)
    }

    default fn get_token_count(&self) -> u64 {
        self.data::<Data>().token_count
    }

    default fn get_creation_fee(&self) -> Balance {
        self.data::<Data>().creation_fee
    }

    default fn get_contract_hash(&self) -> Hash {
        self.data::<Data>().standard_psp22_hash
    }

    default fn get_wal_contract(&self) -> AccountId {
        self.data::<Data>().wal_contract
    }

    default fn set_contract_hash(&mut self, psp22_hash: Hash) -> Result<(), Error> {
        self.data::<Data>().standard_psp22_hash = psp22_hash;
        Ok(())
    }

    default fn set_wal_contract(&mut self, wal_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().wal_contract = wal_contract;
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