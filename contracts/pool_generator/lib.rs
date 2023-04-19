#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]

#[openbrush::contract]
pub mod pool_generator {
    use ink::prelude::{
        vec::Vec,
    };
    use ink::env::CallFlags;
    use ink::ToAccountId;

    use openbrush::{
        contracts::{
            ownable::*,
        },
        modifiers,
        traits::{
            Storage,
        },
    };
    use my_pool::my_pool::MyPoolRef;

    use inkwhale_project::traits::generic_pool_generator::Psp22Ref;
    use inkwhale_project::traits::generic_pool_contract::GenericPoolContractRef;

    use inkwhale_project::impls::{
        generic_pool_generator::*,
        admin::*,
        upgradeable::*
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct PoolGenerator {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        manager: generic_pool_generator::data::Data,
        #[storage_field]
        admin_data: admin::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    impl Ownable for PoolGenerator {}
    impl GenericPoolGeneratorTrait for PoolGenerator {}
    impl AdminTrait for PoolGenerator {}
    impl UpgradeableTrait for PoolGenerator {}

    impl PoolGenerator {
        #[ink(constructor)]
        pub fn new(pool_hash: Hash, inw_contract: AccountId, creation_fee: Balance, unstake_fee: Balance, owner_address: AccountId) -> Self {
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
            psp22_contract_address: AccountId,
            max_staking_amount: Balance,
            apy: u32,
            duration: u64,
            start_time: u64
        ) -> Result<(), Error> {
            let caller = self.env().caller();

            // Check INW balance and allowance
            let fees = self.manager.creation_fee;
            
            let allowance = Psp22Ref::allowance(
                &self.manager.inw_contract,
                caller,
                self.env().account_id()
            );

            let balance = Psp22Ref::balance_of(
                &self.manager.inw_contract,
                caller
            );

            if allowance < fees || balance < fees {
                return Err(Error::InvalidBalanceAndAllowance);
            }

            // Check token balance and allowance
            let min_reward_amount = max_staking_amount.checked_mul(duration as u128).ok_or(Error::CheckedOperations)?
                                    .checked_mul(apy as u128).ok_or(Error::CheckedOperations)?
                                    .checked_div(365 * 24 * 60 * 60 * 1000 * 10000).ok_or(Error::CheckedOperations)?;

            let token_allowance = Psp22Ref::allowance(
                &psp22_contract_address,
                caller,
                self.env().account_id()
            );

            let token_balance = Psp22Ref::balance_of(
                &psp22_contract_address,
                caller
            );

            if  token_allowance < min_reward_amount || token_balance < min_reward_amount {
                return Err(Error::InvalidTokenBalanceAndAllowance)
            }

            // Collect INW as transaction Fees 
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

            if result.is_err() {
                // return Err(Error::CannotTransfer);
                return result;
            }
            
            // Collect reward token to generator 
            let builder = Psp22Ref::transfer_from_builder(
                &psp22_contract_address,
                caller,
                self.env().account_id(),
                min_reward_amount,
                Vec::<u8>::new(),
            )
            .call_flags(CallFlags::default().set_allow_reentry(true));

            let token_transfer_result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => {
                    Err(Error::CannotTransfer)
                }
            };

            if token_transfer_result.is_err() {
                // return Err(Error::CannotTransfer);
                return token_transfer_result;
            }     
               
            if let Result::Ok(contract) = MyPoolRef::new(contract_owner, self.manager.inw_contract, psp22_contract_address, max_staking_amount, apy, duration, start_time, self.manager.unstake_fee)
                    .endowment(0)
                    .code_hash(self.manager.pool_hash)
                    .salt_bytes(self.manager.pool_count.to_le_bytes())
                    .instantiate() {
                
                // Record pool contract address to the pool list
                let contract_account: AccountId = contract.to_account_id();              

                self.manager.pool_count = self.manager.pool_count.checked_add(1).ok_or(Error::CheckedOperations)?;
                self.manager.pool_list.insert(&self.manager.pool_count, &contract_account);

                let mut last_index = 0;
                
                if let Some(stored_last_index) = self.manager.pool_ids_last_index.get(&Some(contract_owner)) {
                    last_index = stored_last_index;
                }

                self.manager.pool_ids.insert(
                    contract_owner,
                    &self.manager.pool_count
                );

                self.manager
                    .pool_ids_last_index
                    .insert(&Some(contract_owner), &(last_index + 1));

                // Pool generator approves for pool the reward mount    
                if Psp22Ref::approve(&psp22_contract_address, contract_account, min_reward_amount).is_err() {
                    return Err(Error::CannotApprove);
                }
            
                // Burn creation fee
                if Psp22Ref::burn(&self.manager.inw_contract, self.env().account_id(), fees).is_err() {
                    return Err(Error::CannotBurn);
                } 

                // Topup reward for pool
                let topup_result = GenericPoolContractRef::topup_reward_pool(&contract_account, min_reward_amount);

                if topup_result.is_err() {
                    return topup_result;
                }
            } else {
                return Err(Error::CannotCreatePool);
            }   
            
            Ok(())
        }
    }
}