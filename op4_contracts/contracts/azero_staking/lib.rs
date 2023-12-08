#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![allow(clippy::too_many_arguments)]

pub use self::my_azero_staking::{MyAzeroStaking, MyAzeroStakingRef};

#[openbrush::implementation(AccessControl, AccessControlEnumerable, Ownable)]
#[openbrush::contract]
pub mod my_azero_staking {
    use openbrush::{contracts::ownable::*, traits::Storage};

    use inkwhale_project::impls::{
        azero_staking::*, 
        upgradeable::*
    };

    use ink::{
        codegen::{EmitEvent, Env},
        reflect::ContractEventBase,
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MyAzeroStaking {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        data: azero_staking::data::Data,
        #[storage_field]
        access: access_control::Data,
        #[storage_field]
        enumerable: enumerable::Data,
    }

    #[ink(event)]
    pub struct StakeEvent {
        staker: AccountId,
        amount: Balance,
        time: u64,
    }

    #[ink(event)]
    pub struct WithdrawalRequestEvent {
        request_id: u128,
        user: AccountId,        
        amount: Balance,
        time: u64
    }

    #[ink(event)]
    pub struct CancelEvent {
        request_id: u128,
        user: AccountId,        
        amount: Balance,
        time: u64
    }

    #[ink(event)]
    pub struct ClaimEvent {
        request_id: u128,
        user: AccountId,  
        azero_amount: Balance,
        time: u64  
    }

    #[ink(event)]
    pub struct ClaimRewardsEvent {
        user: AccountId,  
        azero_amount: Balance,
        inw_amount: Balance,
        time: u64  
    }

    #[ink(event)]
    pub struct WithdrawAzeroToStakeEvent {
        receiver: AccountId,
        amount: Balance, 
        time: u64 
    }

    #[ink(event)]
    pub struct WithdrawAzeroFromStakeAccountEvent {
        receiver: AccountId,
        amount: Balance, 
        time: u64      
    }

    #[ink(event)]
    pub struct WithdrawAzeroFromInterestAccountEvent {
        receiver: AccountId,
        amount: Balance, 
        time: u64      
    }

    #[ink(event)]
    pub struct WithdrawAzeroNotInAccountsEvent {
        receiver: AccountId,
        amount: Balance, 
        time: u64      
    }

    #[ink(event)]
    pub struct WithdrawAzeroEmergencyEvent {
        receiver: AccountId,
        amount: Balance, 
        time: u64      
    }

    #[ink(event)]
    pub struct WithdrawInwFromInterestAccountEvent {
        receiver: AccountId,
        amount: Balance, 
        time: u64      
    }

    #[ink(event)]
    pub struct WithdrawInwNotInAccountsEvent {
        receiver: AccountId,
        amount: Balance, 
        time: u64      
    }

    pub type Event = <MyAzeroStaking as ContractEventBase>::Type;

    impl AzeroStakingTrait for MyAzeroStaking {
        fn _emit_stake_event(
            &self,
            _staker: AccountId,
            _amount: Balance,
            _time: u64
        ) {        
            MyAzeroStaking::emit_event(
                self.env(),
                Event::StakeEvent(StakeEvent {
                    staker: _staker,
                    amount: _amount,
                    time: _time
                }),
            );
        }

        fn _emit_withrawal_request_event(
            &self,
            _request_id: u128,
            _user: AccountId,        
            _amount: Balance,
            _time: u64
        ) {
            MyAzeroStaking::emit_event(
                self.env(),
                Event::WithdrawalRequestEvent(WithdrawalRequestEvent {
                    request_id: _request_id,
                    user: _user,        
                    amount: _amount,
                    time: _time
                }),
            );
        }

        fn _emit_cancel_event(
            &self,
            _request_id: u128,
            _user: AccountId,        
            _amount: Balance,
            _time: u64
        ) {
            MyAzeroStaking::emit_event(
                self.env(),
                Event::CancelEvent(CancelEvent {
                    request_id: _request_id,
                    user: _user,        
                    amount: _amount,
                    time: _time
                }),
            );
        }

        fn _emit_claim_event(
            &self,
            _request_id: u128,
            _user: AccountId,  
            _azero_amount: Balance,           
            _time: u64  
        ) { 
            MyAzeroStaking::emit_event(
                self.env(),
                Event::ClaimEvent(ClaimEvent {
                    request_id: _request_id,
                    user: _user,  
                    azero_amount: _azero_amount,          
                    time: _time  
                }),
            );
        }

        fn _emit_claim_rewards_event(
            &self,
            _user: AccountId,  
            _azero_amount: Balance,
            _inw_amount: Balance,
            _time: u64   
        ) { 
            MyAzeroStaking::emit_event(
                self.env(),
                Event::ClaimRewardsEvent(ClaimRewardsEvent {
                    user: _user,  
                    azero_amount: _azero_amount,    
                    inw_amount: _inw_amount,      
                    time: _time  
                }),
            );
        }

        fn _emit_withdraw_azero_to_stake_event(
            &self,
            _receiver: AccountId,
            _amount: Balance, 
            _time: u64 
        ) {     
            MyAzeroStaking::emit_event(
                self.env(),
                Event::WithdrawAzeroToStakeEvent(WithdrawAzeroToStakeEvent {
                    receiver: _receiver,
                    amount: _amount, 
                    time: _time 
                }),
            );       
        }

        fn _emit_withdraw_azero_from_stake_account_event(
            &self,
            _receiver: AccountId,
            _amount: Balance, 
            _time: u64 
        ) {     
            MyAzeroStaking::emit_event(
                self.env(),
                Event::WithdrawAzeroFromStakeAccountEvent(WithdrawAzeroFromStakeAccountEvent { 
                    receiver: _receiver,
                    amount: _amount, 
                    time: _time 
                }),
            );       
        }

        fn _emit_withdraw_azero_from_interest_account_event(
            &self,
            _receiver: AccountId,
            _amount: Balance, 
            _time: u64 
        ) {    
            MyAzeroStaking::emit_event(
                self.env(),
                Event::WithdrawAzeroFromInterestAccountEvent(WithdrawAzeroFromInterestAccountEvent {
                    receiver: _receiver,
                    amount: _amount, 
                    time: _time 
                }),
            );         
        }

        fn _emit_withdraw_azero_not_in_accounts_event(
            &self,
            _receiver: AccountId,
            _amount: Balance, 
            _time: u64 
        ) {    
            MyAzeroStaking::emit_event(
                self.env(),
                Event::WithdrawAzeroNotInAccountsEvent(WithdrawAzeroNotInAccountsEvent {
                    receiver: _receiver,
                    amount: _amount, 
                    time: _time 
                }),
            );         
        }

        fn _emit_withdraw_azero_emergency_event(
            &self,
            _receiver: AccountId,
            _amount: Balance, 
            _time: u64 
        ) {    
            MyAzeroStaking::emit_event(
                self.env(),
                Event::WithdrawAzeroEmergencyEvent(WithdrawAzeroEmergencyEvent {
                    receiver: _receiver,
                    amount: _amount, 
                    time: _time 
                }),
            );         
        }

        fn _emit_withdraw_inw_from_interest_account_event(
            &self,
            _receiver: AccountId,
            _amount: Balance, 
            _time: u64 
        ) {  
            MyAzeroStaking::emit_event(
                self.env(),
                Event::WithdrawInwFromInterestAccountEvent(WithdrawInwFromInterestAccountEvent {
                    receiver: _receiver,
                    amount: _amount, 
                    time: _time 
                }),
            );   
        }

        fn _emit_withdraw_inw_not_in_accounts_event(
            &self,
            _receiver: AccountId,
            _amount: Balance, 
            _time: u64 
        ) {  
            MyAzeroStaking::emit_event(
                self.env(),
                Event::WithdrawInwNotInAccountsEvent(WithdrawInwNotInAccountsEvent {
                    receiver: _receiver,
                    amount: _amount, 
                    time: _time 
                }),
            );   
        }
    }

    impl UpgradeableTrait for MyAzeroStaking {}

    impl MyAzeroStaking {
        #[ink(constructor)]
        pub fn new(
            min_staking_amount: Balance,
            max_total_staking_amount: Balance,
            apy: Balance, // scaled 10000
            max_waiting_time: u64,
            inw_contract: AccountId,
            inw_multiplier: Balance, // scaled 10000
            unstaking_fee: Balance // in inw to claim 
        ) -> Result<Self, Error> {
            let mut instance = Self::default();

            let caller = Self::env().caller();            
            ownable::Internal::_init_with_owner(&mut instance, caller);

            access_control::Internal::_init_with_admin(&mut instance, Some(caller));
            AccessControl::grant_role(&mut instance, ADMINER, Some(caller)).expect("Should grant ADMINER role");
            AccessControl::grant_role(&mut instance, WITHDRAWAL_MANAGER, Some(caller)).expect("Should grant WITHDRAW_TO_STAKE role");
            AccessControl::grant_role(&mut instance, UPDATING_MANAGER, Some(caller)).expect("Should grant UPDATING_MANAGER role");
        
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

        fn initialize(
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

            if unstaking_fee == 0 {
                return Err(Error::InvalidUnstakingFee);
            }

            self.data.min_staking_amount = min_staking_amount;
            self.data.max_total_staking_amount = max_total_staking_amount;
            self.data.apy = apy;
            self.data.max_waiting_time = max_waiting_time; 
            
            self.data.inw_contract = inw_contract;        
            self.data.inw_multiplier = inw_multiplier;
            self.data.unstaking_fee = unstaking_fee;  

            self.data.withdrawal_request_count = 0;

            self.data.total_azero_staked = 0;
            self.data.total_azero_claimed = 0;
            self.data.total_inw_claimed = 0;
            self.data.total_azero_for_waiting_withdrawals = 0;
            self.data.total_azero_reserved_for_withdrawals = 0;
            self.data.total_azero_withdrawn_to_stake = 0;

            self.data.azero_stake_account = 0;
            self.data.azero_interest_account = 0;
            self.data.inw_interest_account = 0;

            self.data.last_azero_interest_topup = 0;            

            self.data.is_selecting_requests_to_pay = false;
            self.data.is_locked = false;

            Ok(())          
        }

        pub fn emit_event<EE: EmitEvent<Self>>(emitter: EE, event: Event) {
            emitter.emit_event(event);
        }
    }
}