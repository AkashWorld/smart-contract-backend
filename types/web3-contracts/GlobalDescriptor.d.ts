/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from 'bn.js';
import Contract, { contractOptions } from 'web3/eth/contract';
import { EventLog, Callback, EventEmitter } from 'web3/types';
import { TransactionObject, BlockType } from 'web3/eth/types';
import { ContractEvent } from './types';

interface EventOptions {
	filter?: object;
	fromBlock?: BlockType;
	topics?: string[];
}

export class GlobalDescriptor extends Contract {
	constructor(
		jsonInterface: any[],
		address?: string,
		options?: contractOptions
	);
	clone(): GlobalDescriptor;
	methods: {
		getLatestUnitValue(unit: string): TransactionObject<BN>;

		getAllUnitValues(
			unit: string
		): TransactionObject<
			({ unitValue: BN; longitude: BN; latitude: BN; time: BN })[]
		>;

		getPaginatedUnitValues(
			unit: string,
			start: number | string,
			count: number | string
		): TransactionObject<
			({ unitValue: BN; longitude: BN; latitude: BN; time: BN })[]
		>;

		insertValue(
			unit: string,
			value: number | string,
			longitude: number | string,
			latitude: number | string
		): TransactionObject<void>;

		getAllAvailableUnits(): TransactionObject<(string)[]>;
	};
	events: {
		allEvents: (
			options?: EventOptions,
			cb?: Callback<EventLog>
		) => EventEmitter;
	};
}
