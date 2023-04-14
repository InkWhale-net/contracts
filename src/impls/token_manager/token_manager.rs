pub use crate::{
    impls::token_manager::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        token_manager::*,
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
        Hash,
    }
};
use ink::env::CallFlags;

impl<T> TokenManagerTrait for T 
where 
    T:  Storage<Data> + 
        Storage<ownable::Data>
{
    default fn get_token_contract_address(&self, index: u64) -> Option<AccountId> {
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

    default fn get_inw_contract(&self) -> AccountId {
        self.data::<Data>().inw_contract
    }

    #[modifiers(only_owner)]
    default fn set_contract_hash(&mut self, psp22_hash: Hash) -> Result<(), Error> {
        self.data::<Data>().standard_psp22_hash = psp22_hash;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_inw_contract(&mut self, inw_contract: AccountId) -> Result<(), Error> {
        self.data::<Data>().inw_contract = inw_contract;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn withdraw_inw(&mut self, value: Balance) -> Result<(), Error> {
        let builder = Psp22Ref::transfer_builder(
            &self.data::<Data>().inw_contract,
            Self::env().caller(),
            value,
            Vec::<u8>::new()
        )
        .call_flags(CallFlags::default().set_allow_reentry(true));

        let result = match builder.try_invoke() {
            Ok(Ok(Ok(_))) => Ok(()),
            Ok(Ok(Err(e))) => Err(e.into()),
            Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
            Err(ink::env::Error::NotCallable) => Ok(()),
            _ => {
                Err(Error::CannotTransfer)
            }
        };

        result
    }
}
