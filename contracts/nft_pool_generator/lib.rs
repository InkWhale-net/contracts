#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]

#[openbrush::contract]
pub mod nft_pool_generator {
    use ink::prelude::{
        vec::Vec,
    };
    use ink::ToAccountId;
    use ink::env::CallFlags;

    use openbrush::{
        contracts::{
            ownable::*,
        },
        modifiers,
        traits::{
            Storage,
        },
    };
    use my_nft_pool::my_nft_pool::MyNFTPoolRef;

    use inkwhale_project::traits::generic_pool_generator::Psp22Ref;
    use inkwhale_project::impls::{
        generic_pool_generator::*,
        admin::*,
        upgradeable::*
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct NFTPoolGenerator {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        manager: generic_pool_generator::data::Data,
        #[storage_field]
        admin_data: admin::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    impl Ownable for NFTPoolGenerator {}
    impl GenericPoolGeneratorTrait for NFTPoolGenerator {}
    impl AdminTrait for NFTPoolGenerator {}
    impl UpgradeableTrait for NFTPoolGenerator {}
    
    impl NFTPoolGenerator {
        #[ink(constructor)]
        pub fn new(pool_hash: Hash, inw_contract: AccountId, creation_fee: Balance, unstake_fee: Balance, owner_address: AccountId,) -> Self {
            let mut instance = Self::default();

            instance._init_with_owner(owner_address);
            instance.initialize(
                pool_hash,
                inw_contract,
                creation_fee,
                unstake_fee
            )
            .ok()
            .unwrap();

            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, pool_hash: Hash, inw_contract: AccountId, creation_fee: Balance, unstake_fee: Balance
        ) -> Result<(), Error> {
            self.manager.pool_hash = pool_hash;
            self.manager.creation_fee = creation_fee;
            self.manager.inw_contract = inw_contract;
            self.manager.unstake_fee = unstake_fee;

            Ok(())
        }

        #[ink(message)]
        pub fn new_pool(
            &mut self,
            contract_owner: AccountId,
            psp34_contract_address: AccountId,
            psp22_contract_address: AccountId,
            max_staking_amount: Balance,
            multiplier: Balance,
            duration: u64,
            start_time: u64
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            let fees = self.manager.creation_fee;
            //Collect INW as transaction Fees
            let allowance = Psp22Ref::allowance(
                &self.manager.inw_contract,
                caller,
                self.env().account_id()
            );
            assert!(allowance >= fees);

            let balance = Psp22Ref::balance_of(
                &self.manager.inw_contract,
                caller
            );
            assert!(balance >= fees,"not enough balance");

            let builder = Psp22Ref::transfer_from_builder(
                &self.manager.inw_contract,
                caller,
                self.env().account_id(),
                fees,
                Vec::<u8>::new(),
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

            if result.is_ok() {
                if Psp22Ref::burn(&self.manager.inw_contract, self.env().account_id(), fees).is_ok() {
                    let contract = MyNFTPoolRef::new(contract_owner, self.manager.inw_contract, psp34_contract_address, psp22_contract_address, max_staking_amount, multiplier, duration, start_time, self.manager.unstake_fee)
                        .endowment(0)
                        .code_hash(self.manager.pool_hash)
                        .salt_bytes(self.manager.pool_count.to_le_bytes())
                        .instantiate();
                    let contract_account: AccountId = contract.to_account_id();

                    self.manager.pool_count += 1;
                    self.manager.pool_list.insert(&self.manager.pool_count, &contract_account);

                    let mut last_index = 0;
                    if self
                        .manager
                        .pool_ids_last_index
                        .get(&Some(contract_owner))
                        .is_some()
                    {
                        last_index = self
                            .manager
                            .pool_ids_last_index
                            .get(&Some(contract_owner))
                            .unwrap();
                    }
                    self.manager.pool_ids.insert(
                        contract_owner,
                        &self.manager.pool_count,
                    );
                    self.manager
                        .pool_ids_last_index
                        .insert(&Some(contract_owner), &(last_index + 1));
                } else {
                    return Err(Error::CannotBurn);
                } 
            }

            result
        }
    }
}