#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use self::my_interest_distribution::{MyInterestDistribution, MyInterestDistributionRef};

#[openbrush::implementation(AccessControl, AccessControlEnumerable, Ownable)]
#[openbrush::contract]
pub mod my_interest_distribution {
    use openbrush::{contracts::ownable::*, traits::Storage};

    use inkwhale_project::impls::{
        admin::*,
        interest_distribution::*, 
        upgradeable::*
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MyInterestDistribution {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: interest_distribution::data::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
    }

    impl UpgradeableTrait for MyInterestDistribution {}
    impl AdminTrait for MyInterestDistribution {}
    impl InterestDistributionTrait for MyInterestDistribution {}

    impl MyInterestDistribution {
        #[ink(constructor)]
        pub fn new(
            azero_staking_contract: AccountId,
            master_account: AccountId,
            total_rate: u64,
            interest_account_rate: u64
        ) -> Result<Self, Error> {
            let mut instance = Self::default();

            let caller = Self::env().caller();            
            ownable::Internal::_init_with_owner(&mut instance, caller);

            access_control::Internal::_init_with_admin(&mut instance, Some(caller));
            AccessControl::grant_role(&mut instance, ADMINER, Some(caller)).expect("Should grant ADMINER role");
           
            instance.data.azero_staking_contract = azero_staking_contract;
            instance.data.master_account = master_account;

            if total_rate == 0 {
                return Err(Error::InvalidTotalRate);
            }
            instance.data.total_rate = total_rate;

            if interest_account_rate > total_rate {
                return Err(Error::InvalidInterestAccountRate);
            }            
            instance.data.interest_account_rate = interest_account_rate;

            Ok(instance)
        }
    }
}