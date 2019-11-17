import { IResolvers } from 'graphql-tools';
import services from '../../services';
import { IContext } from '../context';
import { PubSub } from 'graphql-subscriptions';


export interface IDescriptor {
	unit: String;
	value: number;
	longitude: number;
	latitude: number;
	unixTimestamp: number;
}

export enum TRANSACTION_TYPE {
	TRANSACTION_HASH,
	RECIEPT,
	CONFIRMATION,
	ERROR
}

const insertionSubscription = new PubSub();

const resolver: IResolvers = {
	Query: {
		getLatestUnitValueGlobal: async (
			_,
			args: { unit: string },
			context: IContext
		): Promise<number> => {
			if (context == undefined) {
				return Promise.reject('Global context not available');
			}
			const ethAccId = context.getEtheriumAccountId();
			return services.globalDescriptorService.getLatestValueForUnit(
				ethAccId,
				args.unit
			);
		},
		
		// tslint:disable-next-line:object-literal-sort-keys
		getAllAvailableUnitsGlobal: async (_, __, context) => {
			if (context == undefined) {
				return Promise.reject('Global context not available');
			}
			const ethAccId = context.getEtheriumAccountId();
			return services.globalDescriptorService.getAllAvailableUnitsForGlobal(
				ethAccId
			);
		},
	/**
	 * Abstraction for UserDescriptors (smart contract) method, getAllValuesRecordedForUnit(unit: string): number[]
	 * See ./contracts/UserDescriptors.sol for the actual contract method
	 * @param accountId ID of the account sending the request (Local blockchain autogenerates 10 accounts to use)
	 * @param unit A unit such as lb, cm, miles, kilometer, etc
	 * @param gas Optional paramter, defaults to 5,000,000. Need gas to perform any sort of operation.
	 */
	public async getAllValuesRecordedForUnit(
		accountId: string,
		unit: string,
		gas = 5_000_000
	): Promise<IDescriptor[]> {
		const txOptions: Tx = {
			from: accountId,
			gas
		};
		const stringArray = await this.contract.methods
			.getAllUnitValues(unit)
			.call(txOptions);
		return stringArray.map(val => {
			return {
				unit,
				value:
					UserDescriptorService.BNToNumber(val.unitValue) /
					this.DECIMAL_OFFSET,
				longitude:
					UserDescriptorService.BNToNumber(val.longitude) /
					this.DECIMAL_OFFSET,
				latitude:
					GlobalDescriptorService.BNToNumber(val.latitude) /
					this.DECIMAL_OFFSET,
				unixTimestamp: GlobalDescriptorService.BNToNumber(val.time)
			};
		});
	}
		

		
		getPaginatedDescriptorsGlobal: async (
			_,
			args: { unit: string; start: number; count: number },
			context: IContext
		): Promise<IDescriptor[]> => {
			if (context == undefined) {
				Promise.reject('User context not available');
			}
			if (args.count <= 0) {
				Promise.reject('Invalid count argument');
			}
			const ethAccId = context.getEtheriumAccountId();
			return services.globalDescriptorService.getPaginatedValuesRecordedForUnit(
				ethAccId,
				args.unit,
				args.start,
				args.count
			);
		}
		
	},

	
	Mutation: {
		insertValueGlobal: async (
			_,
			args: {
				unit: string;
				value: number;
				latitude?: number;
				longitude?: number;
			},
			context: IContext
		) => {
			if (context == undefined) {
				Promise.reject('Global context not available');
			}
			const ethAccId = context.getEtheriumAccountId();
			return services.globalDescriptorService.insertValueAsync(
				ethAccId,
				{ ...args },
				(transactionHash, transactionType, message) => {
					const insertValueSubscription = {
						transactionHash,
						responseType: transactionType,
						message
					};
					insertionSubscription.publish(ethAccId, {
						insertValueSubscription
					});
				}
			);
		}
	},
	Subscription: {
		insertValueSubscription: {
			subscribe: (_: any, __: any, context: IContext) => {
				if (!context) return null;
				return insertionSubscription.asyncIterator(
					context.getEtheriumAccountId()
				);
			}
		}
	},
	TransactionResponse: {
		TRANSACTION_HASH: TRANSACTION_TYPE.TRANSACTION_HASH,
		RECIEPT: TRANSACTION_TYPE.RECIEPT,
		CONFIRMATION: TRANSACTION_TYPE.CONFIRMATION,
		ERROR: TRANSACTION_TYPE.ERROR
	}
};

export default resolver;
