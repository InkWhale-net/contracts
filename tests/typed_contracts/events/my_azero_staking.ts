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

	public subscribeOnWithrawalRequestEventEvent(callback : (event : EventTypes.WithrawalRequestEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithrawalRequestEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithrawalRequestEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithrawalRequestEvent');
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

	public subscribeOnWithdrawAzeroEventEvent(callback : (event : EventTypes.WithdrawAzeroEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawAzeroEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawAzeroEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawAzeroEvent');
	}

	public subscribeOnWithdrawInwEventEvent(callback : (event : EventTypes.WithdrawInwEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('WithdrawInwEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.WithdrawInwEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'WithdrawInwEvent');
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