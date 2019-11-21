import { IResolvers } from 'graphql-tools';
import { IContext } from '../context';
import { PubSub } from 'graphql-subscriptions';
import { GlobalDescriptorService } from '../../services/global-descriptor-service';
import { IDescriptor } from './user-descriptor-resolvers';
import { TRANSACTION_TYPE } from './user-descriptor-resolvers';

const insertionSubscription = new PubSub();

const globalDescriptorService = new GlobalDescriptorService();

const resolver: IResolvers = {
	Query: {
		getValuesForUnitGlobal: async(
			_,
			args: { unit: string },
			context: IContext	
		): Promise<IDescriptor[]> => {
			if (context == undefined) {
				Promise.reject('User context not available');
			}
			const ethAccId = context.getEtheriumAccountId();
			return globalDescriptorService.getAllValuesRecordedForUnit(
				ethAccId,
				args.unit
			);
		},
		getLatestUnitValueGlobal: async (
			_,
			args: { unit: string },
			context: IContext
		): Promise<number> => {
			if (context == undefined) {
				return Promise.reject('User context not available');
			}
			const ethAccId = context.getEtheriumAccountId();
			return globalDescriptorService.getLatestValueForUnit(
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
			return globalDescriptorService.getAllAvailableUnitsForGlobal(
				ethAccId
			);
		},

		

		
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
			return globalDescriptorService.getPaginatedValuesRecordedForUnit(
				ethAccId,
				args.unit,
				args.start,
				args.count
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