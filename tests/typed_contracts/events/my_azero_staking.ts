import type * as EventTypes from '../event-types/my_azero_staking';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_azero_staking.json';
import {getEventTypeDescription} from "../shared/utils";
import {handleEventReturn} from "@727-ventures/typechain-types";

export default class EventsClass {
	readonly __nativeContract : ContractPromise;
	readonly __api : ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		api : ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__api = api;
	}

	public subscribeOnStakeEventEvent(callback : (event : EventTypes.StakeEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('StakeEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.StakeEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'StakeEvent');
	}

	public subscribeOnWithdrawalRequestEventEvent(callback : (event : EventTypes.WithdrawalRequestEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawalRequestEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawalRequestEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawalRequestEvent');
	}

	public subscribeOnCancelEventEvent(callback : (event : EventTypes.CancelEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('CancelEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.CancelEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'CancelEvent');
	}

	public subscribeOnClaimEventEvent(callback : (event : EventTypes.ClaimEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('ClaimEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.ClaimEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'ClaimEvent');
	}

	public subscribeOnClaimRewardsEventEvent(callback : (event : EventTypes.ClaimRewardsEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('ClaimRewardsEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.ClaimRewardsEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'ClaimRewardsEvent');
	}

	public subscribeOnWithdrawAzeroToStakeEventEvent(callback : (event : EventTypes.WithdrawAzeroToStakeEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawAzeroToStakeEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawAzeroToStakeEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawAzeroToStakeEvent');
	}

	public subscribeOnWithdrawAzeroFromStakeAccountEventEvent(callback : (event : EventTypes.WithdrawAzeroFromStakeAccountEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawAzeroFromStakeAccountEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawAzeroFromStakeAccountEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawAzeroFromStakeAccountEvent');
	}

	public subscribeOnWithdrawAzeroFromInterestAccountEventEvent(callback : (event : EventTypes.WithdrawAzeroFromInterestAccountEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawAzeroFromInterestAccountEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawAzeroFromInterestAccountEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawAzeroFromInterestAccountEvent');
	}

	public subscribeOnWithdrawAzeroNotInAccountsEventEvent(callback : (event : EventTypes.WithdrawAzeroNotInAccountsEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawAzeroNotInAccountsEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawAzeroNotInAccountsEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawAzeroNotInAccountsEvent');
	}

	public subscribeOnWithdrawAzeroEmergencyEventEvent(callback : (event : EventTypes.WithdrawAzeroEmergencyEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawAzeroEmergencyEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawAzeroEmergencyEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawAzeroEmergencyEvent');
	}

	public subscribeOnWithdrawInwFromInterestAccountEventEvent(callback : (event : EventTypes.WithdrawInwFromInterestAccountEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawInwFromInterestAccountEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawInwFromInterestAccountEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawInwFromInterestAccountEvent');
	}

	public subscribeOnWithdrawInwNotInAccountsEventEvent(callback : (event : EventTypes.WithdrawInwNotInAccountsEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawInwNotInAccountsEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawInwNotInAccountsEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawInwNotInAccountsEvent');
	}


	private __subscribeOnEvent(
		callback : (args: any[], event: any) => void,
		filter : (eventName: string) => boolean = () => true
	) {
		// @ts-ignore
		return this.__api.query.system.events((events) => {
			events.forEach((record: any) => {
				const { event } = record;

				if (event.method == 'ContractEmitted') {
					const [address, data] = record.event.data;

					if (address.toString() === this.__nativeContract.address.toString()) {
						const {args, event} = this.__nativeContract.abi.decodeEvent(data);

						if (filter(event.identifier.toString()))
							callback(args, event);
					}
				}
			});
		});
	}

}