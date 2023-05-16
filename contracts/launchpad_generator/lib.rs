#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#![allow(clippy::inline_fn_without_body)]
#![allow(clippy::too_many_arguments)]
#![allow(clippy::large_enum_variant)]

#[openbrush::contract]
pub mod launchpad_generator {
    use ink::prelude::{
        string::String,
        vec::Vec,
        vec
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
    use my_launchpad::my_launchpad::MyLaunchpadRef;

    use inkwhale_project::traits::launchpad_generator::Psp22Ref;
    use inkwhale_project::traits::launchpad_contract::LaunchpadContractRef;

    use inkwhale_project::impls::{
        launchpad_generator::*,
        admin::*,
        upgradeable::*
    };

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct LaunchpadGenerator {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        manager: launchpad_generator::data::Data,
        #[storage_field]
        admin_data: admin::data::Data,
        #[storage_field]
        upgradeable_data: upgradeable::data::Data
    }

    // #[ink(event)]
    // pub struct AddNewLaunchpadEvent {
    //     launchpad_id: u64,
    //     launchpad_address: AccountId
    // }

    impl Ownable for LaunchpadGenerator {}
    impl LaunchpadGeneratorTrait for LaunchpadGenerator {}
    impl AdminTrait for LaunchpadGenerator {}
    impl UpgradeableTrait for LaunchpadGenerator {}

    impl LaunchpadGenerator {
        #[ink(constructor)]
        pub fn new(launchpad_hash: Hash, inw_contract: AccountId, creation_fee: Balance, tx_rate: u32, owner_address: AccountId) -> Result<Self, Error> {
            let mut instance = Self::default();

            instance._init_with_owner(owner_address);

            match instance.initialize(
                launchpad_hash,
                inw_contract,
                creation_fee,
                tx_rate
            ) {
                Ok(()) => Ok(instance),
                Err(e) => Err(e),
            }
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, launchpad_hash: Hash, inw_contract: AccountId, creation_fee: Balance, tx_rate: u32) -> Result<(), Error> {
            if self.manager.creation_fee > 0 {
                return Err(Error::AlreadyInit);
            }
            
            self.manager.launchpad_hash = launchpad_hash;
            self.manager.inw_contract = inw_contract;
            
            if creation_fee == 0 {
                return Err(Error::InvalidCreationFee);
            }
            self.manager.creation_fee = creation_fee;

            self.manager.tx_rate = tx_rate;

            Ok(())
        }

        #[ink(message)]
        pub fn new_launchpad(
            &mut self,
            contract_owner: AccountId,
            project_info_uri: String,
            token_address: AccountId,
            
            phase_name: Vec<String>,
            phase_start_time: Vec<u64>,
            phase_end_time: Vec<u64>,
            phase_immediate_release_rate: Vec<u32>,
            phase_vesting_duration: Vec<u64>,
            phase_vesting_unit: Vec<u64>,
            
            phase_is_public: Vec<bool>,
            phase_public_amount: Vec<Balance>,
            phase_public_price: Vec<Balance>,
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

            // Get total amount of tokens for puclic sale
            let total_amount = phase_public_amount
                                    .iter()
                                    .enumerate()
                                    .filter(|&(i, _)| phase_is_public[i])
                                    .map(|(_, e)| e)
                                    .sum();
            
            // Check token balance and allowance
            let token_allowance = Psp22Ref::allowance(
                &token_address,
                caller,
                self.env().account_id()
            );

            let token_balance = Psp22Ref::balance_of(
                &token_address,
                caller
            );

            if  token_allowance < total_amount || token_balance < total_amount {
                return Err(Error::InvalidTokenBalanceAndAllowance);
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
                return Err(Error::CannotTransfer);
            }   
            
            // Collect token for public sale if avail
            if total_amount > 0 {
                let builder = Psp22Ref::transfer_from_builder(
                    &token_address,
                    caller,
                    self.env().account_id(),
                    total_amount,
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
                    return Err(Error::CannotTransfer);
                }   
            }
            
            if let Result::Ok(contract) = 
                MyLaunchpadRef::new(
                    contract_owner, 
                    project_info_uri,
                    token_address,
                    self.manager.inw_contract,
                    self.manager.tx_rate,
                    
                    phase_name,
                    phase_start_time,
                    phase_end_time,
                    phase_immediate_release_rate,
                    phase_vesting_duration,
                    phase_vesting_unit,
                    
                    phase_is_public,
                    phase_public_amount,
                    phase_public_price)
                .endowment(0)
                .code_hash(self.manager.launchpad_hash)
                .salt_bytes(self.manager.launchpad_count.to_le_bytes())
                .instantiate() {
                
                // Record launchpad contract address
                let contract_account: AccountId = contract.to_account_id();              

                self.manager.launchpad_count = self.manager.launchpad_count.checked_add(1).ok_or(Error::CheckedOperations)?;
                self.manager.launchpad_by_id.insert(&self.manager.launchpad_count, &contract_account);

                let launchpad_by_owner = self.manager.launchpad_by_owner.get(&contract_owner);

                if let Some(mut launchpad) = launchpad_by_owner {
                    launchpad.push(contract_account);
                    self.manager.launchpad_by_owner.insert(&contract_owner, &launchpad);
                } else {
                    let launchpad = vec![contract_account];
                    self.manager.launchpad_by_owner.insert(&contract_owner, &launchpad);                    
                }
                                
                // Default is the active launchpad
                self.manager.is_active_launchpad.insert(&contract_account, &true);
                self.manager.active_launchpad_count = self.manager.active_launchpad_count.checked_add(1).ok_or(Error::CheckedOperations)?;
                
                // Burn creation fee
                if Psp22Ref::burn(&self.manager.inw_contract, self.env().account_id(), fees).is_err() {
                    return Err(Error::CannotBurn);
                } 

                if total_amount > 0 {
                    // Launchpad generator approves for launchpad contract the token amount   
                    if Psp22Ref::approve(&token_address, contract_account, total_amount).is_err() {
                        return Err(Error::CannotApprove);
                    }

                    // Launchpad generator tops up token for launchpad
                    let topup_result = LaunchpadContractRef::topup(&contract_account, total_amount);

                    if topup_result.is_err() {
                        return Err(Error::CannotTopupToken);
                    }
                }

                // Emit event
                // self.env().emit_event(AddNewLaunchpadEvent {
                //     launchpad_id: self.manager.launchpad_count,
                //     launchpad_address: contract_account
                // });
            } else {
                return Err(Error::CannotCreatePool);
            }   
            
            Ok(())
        }
    }
}