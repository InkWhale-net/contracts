#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::azero_staking::{AzeroStaking, AzeroStakingRef};

#[openbrush::implementation(AccessControl, AccessControlEnumerable, Ownable)]
#[openbrush::contract]
pub mod azero_staking {
    use ink::prelude::{string::String, vec::Vec};

    use openbrush::{contracts::ownable::*, modifiers, traits::Storage};

    use inkwhale_project::impls::{azero_staking::*, upgradeable::*};

    use ink::{
        codegen::{EmitEvent, Env},
        reflect::ContractEventBase,
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct AzeroStaking {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: azero_staking::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
    }

    impl UpgradeableTrait for AzeroStaking {}

    impl AzeroStaking {
        #[ink(constructor)]
        pub fn new(
            min_staking_amount: Balance,
            max_total_staking_amount: Balance,
            apy: Balance,
            max_waiting_time: u64,
            inw_contract: AccountId,
            inw_multiplier: Balance,
            unstaking_fee: Balance
        ) -> Result<Self, Error> {
            let mut instance = Self::default();

            let caller = Self::env().caller();            
            ownable::Internal::_init_with_owner(&mut instance, caller);

            access_control::Internal::_init_with_admin(&mut instance, Some(caller));
            AccessControl::grant_role(&mut instance, ADMINER, Some(caller)).expect("Should grant ADMINER role");
        
            match instance.initialize(
                min_staking_amount,
                max_total_staking_amount,
                apy,
                max_waiting_time,
                inw_contract,
                inw_multiplier,
                unstaking_fee
            ) {
                Ok(()) => Ok(instance),
                Err(e) => Err(e),
            }
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(
            &mut self,
            min_staking_amount: Balance,
            max_total_staking_amount: Balance,
            apy: Balance,
            max_waiting_time: u64,
            inw_contract: AccountId,
            inw_multiplier: Balance,
            unstaking_fee: Balance
        ) -> Result<(), Error> {
            if self.data.min_staking_amount > 0 {
                return Err(Error::AlreadyInit);
            }

            if min_staking_amount == 0 {
                return Err(Error::InvalidMinStakingAmount);
            }
            
            if max_total_staking_amount < min_staking_amount {
                return Err(Error::InvalidMaxStakingAmount);
            }
            
            if apy == 0 {
                return Err(Error::InvalidApy);
            }

            if max_waiting_time == 0 {
                return Err(Error::InvalidMaxWaitingTime);
            }

            if inw_multiplier == 0 {
                return Err(Error::InvalidMultiplier);
            }

            self.data.min_staking_amount = min_staking_amount;
            self.data.max_total_staking_amount = max_total_staking_amount;
            self.data.apy = apy;
            self.data.max_waiting_time = max_waiting_time; 
            
            self.data.inw_contract = inw_contract;        
            self.data.inw_multiplier = inw_multiplier;
            self.data.unstaking_fee = unstaking_fee;  

            Ok(())          
        }
    }
}