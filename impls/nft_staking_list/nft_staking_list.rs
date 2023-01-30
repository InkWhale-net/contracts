pub use crate::{
    impls::nft_staking_list::{
        data,
        data::*,
    },
    traits::{
        nft_staking_list::*,
    }
};

use openbrush::{
    contracts::{
        traits::psp34::*,
    },
    traits::{
        Storage,
        AccountId
    }
};

impl<T> NftStakingListTrait for T 
    where 
        T: Storage<Data> 
{
    default fn get_total_staked_by_account(&self, account: AccountId) -> u64 {
        return self.data::<Data>().staking_list.count(account) as u64;
    }

    default fn get_staked_id(&self, account: AccountId, index: u64) -> Option<Id> {
        return self.data::<Data>().staking_list.get_value(account, &(index as u128));
    }
}