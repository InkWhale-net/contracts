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
            access_control::extensions::enumerable::*,
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
        upgradeable_data: upgradeable::data::Data,
        #[storage_field]
        access: access_control::Data<enumerable::Members>,
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
    impl AccessControl for LaunchpadGenerator {}
    impl AccessControlEnumerable for LaunchpadGenerator {}

    impl LaunchpadGenerator {
        #[ink(constructor)]
        pub fn new(launchpad_hash: Hash, inw_contract: AccountId, creation_fee: Balance, tx_rate: u32, admin_address: AccountId) -> Result<Self, Error> {
            let mut instance = Self::default();

            let caller = Self::env().caller();
            instance._init_with_owner(caller);

            match instance.initialize(
                launchpad_hash,
                inw_contract,
                creation_fee,
                tx_rate,
                admin_address
            ) {
                Ok(()) => Ok(instance),
                Err(e) => Err(e),
            }
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn initialize(&mut self, launchpad_hash: Hash, inw_contract: AccountId, creation_fee: Balance, tx_rate: u32, admin_address: AccountId) -> Result<(), Error> {
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

            self._init_with_admin(self.env().caller());
            self.grant_role(ADMINER, self.env().caller()).expect("Should grant ADMINER role");
            
            if !self.has_role(ADMINER, admin_address) {
                self.grant_role(ADMINER, admin_address).expect("Should grant ADMINER role");
            }

            Ok(())
        }

        #[ink(message)]
        pub fn new_launchpad(
            &mut self,
            project_info_uri: String,
            token_address: AccountId,
            total_supply: Balance,

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

            if total_supply == 0 {
                return Err(Error::InvalidTotalSupply);
            }
            
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

            if  token_allowance < total_supply || token_balance < total_supply {
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
            
            // Collect total supply of token            
            let builder = Psp22Ref::transfer_from_builder(
                &token_address,
                caller,
                self.env().account_id(),
                total_supply,
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
            
            let launchpad_creation_result = 
                MyLaunchpadRef::new(
                    caller,
                    project_info_uri,
                    token_address,
                    total_supply,
                    self.env().account_id(),
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
                .instantiate();

            if let Result::Ok(contract) = launchpad_creation_result {               
                // Save launchpad contract address
                let contract_account: AccountId = contract.to_account_id();              

                self.manager.launchpad_count = self.manager.launchpad_count.checked_add(1).ok_or(Error::CheckedOperations)?;
                self.manager.launchpad_by_id.insert(&self.manager.launchpad_count, &contract_account); // Start from 1

                let launchpad_by_owner = self.manager.launchpad_by_owner.get(&caller);

                if let Some(mut launchpad) = launchpad_by_owner {
                    launchpad.push(contract_account);
                    self.manager.launchpad_by_owner.insert(&caller, &launchpad);
                } else {
                    let launchpad = vec![contract_account];
                    self.manager.launchpad_by_owner.insert(&caller, &launchpad);                    
                }
                                
                // Default is the inactive launchpad
                self.manager.is_active_launchpad.insert(&contract_account, &false);
                
                // Burn creation fee
                if Psp22Ref::burn(&self.manager.inw_contract, self.env().account_id(), fees).is_err() {
                    return Err(Error::CannotBurn);
                } 
                
                // Launchpad generator approves for launchpad contract the token amount   
                if Psp22Ref::approve(&token_address, contract_account, total_supply).is_err() {
                    return Err(Error::CannotApprove);
                }

                // Launchpad generator tops up token for launchpad
                let topup_result = LaunchpadContractRef::topup(&contract_account, total_supply);

                if topup_result.is_err() {
                    return Err(Error::CannotTopupToken);
                }            

                // Emit event
                // self.env().emit_event(AddNewLaunchpadEvent {
                //     launchpad_id: self.manager.launchpad_count,
                //     launchpad_address: contract_account
                // });
            } else {
                let r = match launchpad_creation_result {
                    Ok(_) => Ok(()),
                    Err(e) => Err(e),
                };

                return r;
            }   
            
            Ok(())
        }
    }
}