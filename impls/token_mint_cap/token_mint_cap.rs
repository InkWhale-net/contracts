pub use crate::{
    impls::token_mint_cap::{
        data,
        data::Data,
        data::*,
    },
    traits::{
        token_mint_cap::*,
        error::Error
    }
};

use openbrush::{
    modifiers,
    contracts::{
        psp22,
        psp22::*,
        traits::{
            psp22::PSP22Error
        },
        ownable::*
    },
    traits::{
        Storage,
        Balance,
        AccountId
    }
};

impl<T> TokenMintCapTrait for T 
where 
    T:  psp22::Internal +
        Storage<Data> + 
        Storage<psp22::Data> +
        Storage<ownable::Data>
{
    default fn public_mint(&mut self, amount: Balance)-> Result<(), PSP22Error> {
        let caller = Self::env().caller();
        let total_fee = (self.data::<Data>().minting_fee)
            .checked_mul(amount).unwrap()
            .checked_div(1000000000000)
            .unwrap();
        assert!(
            total_fee <= Self::env().transferred_value(),
            "invalid fee"
        );
        self.data::<Data>().total_minted = self.data::<Data>().total_minted.checked_add(amount).unwrap();
        assert!(self.data::<Data>().total_minted.checked_add(amount).unwrap() <= self.data::<Data>().minting_cap, "minting cap reached");
        self._mint_to(caller, amount)
    }

    #[modifiers(only_owner)]
    default fn owner_mint(&mut self, mint_to: AccountId, amount: Balance) -> Result<(), PSP22Error>{
        assert!(self.data::<psp22::Data>().total_supply().checked_add(amount).unwrap() <= self.data::<Data>().cap, "minting cap reached");
        self._mint_to(mint_to, amount)
    }

    #[modifiers(only_owner)]
    default fn set_cap(&mut self, cap: Balance) -> Result<(), PSP22Error> {
        self.data::<Data>().cap = cap;
        Ok(())
    }

    #[modifiers(only_owner)]
    default fn set_minting_fee(&mut self, minting_fee: Balance) -> Result<(), PSP22Error> {
        self.data::<Data>().minting_fee = minting_fee;
        Ok(())
    }

    default fn cap(&self) -> Balance {
        self.data::<Data>().cap
    }

    default fn minting_cap(&self) -> Balance {
        self.data::<Data>().minting_cap
    }

    default fn total_minted(&self) -> Balance {
        self.data::<Data>().total_minted
    }

    default fn minting_fee(&self) -> Balance {
        self.data::<Data>().minting_fee
    }
    
    #[modifiers(only_owner)]
    default fn withdraw_fee(&mut self, value: Balance) -> Result<(), Error> {
        assert!(value <= Self::env().balance(), "not enough balance");
        assert!(
            Self::env().transfer(Self::env().caller(), value).is_ok(),
            "error withdraw_fee"
        );
        Ok(())
    }
}