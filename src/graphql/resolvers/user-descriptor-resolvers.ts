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
		getAllAvailableUnits: async (_, __, context) => {
			if (context == undefined) {
				return Promise.reject('User context not available');
			}
			const ethAccId = context.getEtheriumAccountId();
			return services.userDescriptorService.getAllAvailableUnitsForUser(
				ethAccId
			);
		},
		getLatestUnitValue: async (
			_,
			args: { unit: string },
			context: IContext
		): Promise<number> => {
			if (context == undefined) {
				return Promise.reject('User context not available');
			}
			const ethAccId = context.getEtheriumAccountId();
			return services.userDescriptorService.getLatestValueForUnit(
				ethAccId,
				args.unit
			);
		},
		getPaginatedDescriptors: async (
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
			return services.userDescriptorService.getPaginatedValuesRecordedForUnit(
				ethAccId,
				args.unit,
				args.start,
				args.count
			);
		}
	},
	Mutation: {
		insertValue: async (
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
				Promise.reject('User context not available');
			}
			const ethAccId = context.getEtheriumAccountId();
			return services.userDescriptorService.insertValueAsync(
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
