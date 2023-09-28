#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![allow(clippy::too_many_arguments)]
#[openbrush::implementation(AccessControl, AccessControlEnumerable, Ownable)]
#[openbrush::contract]
pub mod launchpad_generator {
    use ink::prelude::{string::String, vec, vec::Vec};
    use ink::ToAccountId;

    use my_launchpad::my_launchpad::MyLaunchpadRef;
    use openbrush::{
        contracts::{access_control::extensions::enumerable::*, ownable::*},
        modifiers,
        traits::Storage,
    };

    // use inkwhale_project::traits::launchpad_contract::LaunchpadContractRef;
    use inkwhale_project::traits::launchpad_generator::Psp22Ref;

    use inkwhale_project::impls::{admin::*, launchpad_generator::*, upgradeable::*};
    use inkwhale_project::impls::launchpad_contract::PhaseInput;

    #[derive(Default, Storage)]
    #[ink(storage)]
    pub struct LaunchpadGenerator {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        manager: launchpad_generator::data::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
    }

    // #[ink(event)]
    // pub struct AddNewLaunchpadEvent {
    //     launchpad_id: u64,
    //     launchpad_address: AccountId
    // }

    impl LaunchpadGeneratorTrait for LaunchpadGenerator {}
    impl AdminTrait for LaunchpadGenerator {}
    impl UpgradeableTrait for LaunchpadGenerator {}

    impl LaunchpadGenerator {
        #[ink(constructor)]
        pub fn new(
            launchpad_hash: Hash,
            inw_contract: AccountId,
            creation_fee: Balance,
            tx_rate: u32,
            admin_address: AccountId,
        ) -> Result<Self, Error> {
            let mut instance = Self::default();

            let caller = Self::env().caller();
            ownable::Internal::_init_with_owner(&mut instance, caller);

            match instance.initialize(
                launchpad_hash,
                inw_contract,
                creation_fee,
                tx_rate,
                admin_address,
            ) {
                Ok(()) => Ok(instance),
                Err(e) => Err(e),
            }
        }

        #[modifiers(only_owner)]
        fn initialize(
            &mut self,
            launchpad_hash: Hash,
            inw_contract: AccountId,
            creation_fee: Balance,
            tx_rate: u32,
            admin_address: AccountId,
        ) -> Result<(), Error> {
            if self.manager.creation_fee > 0 {
                return Err(Error::AlreadyInit);
            }

            self.manager.launchpad_hash = launchpad_hash;
            self.manager.inw_contract = inw_contract;

            if creation_fee == 0 {
                return Err(Error::InvalidCreationFee);
            }
            self.manager.creation_fee = creation_fee;

            if tx_rate > 10000 {
                return Err(Error::InvalidTxRate);
            }
            self.manager.tx_rate = tx_rate;

            access_control::Internal::_init_with_admin(self, Some(self.env().caller()));
            AccessControl::grant_role(self, ADMINER, Some(self.env().caller()))
                .expect("Should grant ADMINER role");

            if !AccessControl::has_role(self, ADMINER, Some(admin_address)) {
                AccessControl::grant_role(self, ADMINER, Some(admin_address))
                    .expect("Should grant ADMINER role");
            }

            Ok(())
        }

        #[ink(message)]
        pub fn new_launchpad(
            &mut self,
            project_info_uri: String,
            token_address: AccountId,
            total_supply: Balance,

            phases: Vec<PhaseInput>
        ) -> Result<(), Error> {
            let caller = self.env().caller();

            // Check INW balance and allowance
            let fees = self.manager.creation_fee;

            let allowance =
                Psp22Ref::allowance(&self.manager.inw_contract, caller, self.env().account_id());

            let balance = Psp22Ref::balance_of(&self.manager.inw_contract, caller);

            if allowance < fees || balance < fees {
                return Err(Error::InvalidBalanceAndAllowance);
            }

            // Collect INW as transaction Fees
            let builder = Psp22Ref::transfer_from_builder(
                &self.manager.inw_contract,
                caller,
                self.env().account_id(),
                fees,
                Vec::<u8>::new(),
            );            

            let result = match builder.try_invoke() {
                Ok(Ok(Ok(_))) => Ok(()),
                Ok(Ok(Err(e))) => Err(e.into()),
                Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                Err(ink::env::Error::NotCallable) => Ok(()),
                _ => Err(Error::CannotTransfer),
            };

            if result.is_err() {
                return Err(Error::CannotTransfer);
            }

            // Check token balance and allowance
            if total_supply == 0 {
                return Err(Error::InvalidTotalSupply);
            }

            let token_allowance =
                Psp22Ref::allowance(&token_address, caller, self.env().account_id());

            let token_balance = Psp22Ref::balance_of(&token_address, caller);

            if token_allowance < total_supply || token_balance < total_supply {
                return Err(Error::InvalidTokenBalanceAndAllowance);
            }          
           
            let launchpad_creation_result = MyLaunchpadRef::new(
                caller,
                project_info_uri,
                token_address,
                total_supply,
                self.env().account_id(),
                self.manager.tx_rate,
                phases
            )
            .endowment(0)
            .code_hash(self.manager.launchpad_hash)
            .salt_bytes(self.manager.launchpad_count.to_le_bytes())
            .instantiate();

            if let Result::Ok(contract) = launchpad_creation_result {
                // Save launchpad contract address
                let contract_account: AccountId = contract.to_account_id();

                self.manager.launchpad_count = self
                    .manager
                    .launchpad_count
                    .checked_add(1)
                    .ok_or(Error::CheckedOperations)?;
                self.manager
                    .launchpad_by_id
                    .insert(&self.manager.launchpad_count, &contract_account); // Start from 1

                let launchpad_by_owner = self.manager.launchpad_by_owner.get(&caller);

                if let Some(mut launchpad) = launchpad_by_owner {
                    launchpad.push(contract_account);
                    self.manager.launchpad_by_owner.insert(&caller, &launchpad);
                } else {
                    let launchpad = vec![contract_account];
                    self.manager.launchpad_by_owner.insert(&caller, &launchpad);
                }

                // Default is the inactive launchpad
                self.manager
                    .is_active_launchpad
                    .insert(&contract_account, &false);

                // Burn creation fee
                if Psp22Ref::burn(&self.manager.inw_contract, self.env().account_id(), fees)
                    .is_err()
                {
                    return Err(Error::CannotBurn);
                }

                // Transfer total supply of token from caller to the launchpad contract              
                let builder = Psp22Ref::transfer_from_builder(
                    &token_address,
                    caller,
                    contract_account,
                    total_supply,
                    Vec::<u8>::new(),
                );
                
                let token_transfer_result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => Err(Error::CannotTransfer),
                };

                if token_transfer_result.is_err() {
                    return Err(Error::CannotTransfer);
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