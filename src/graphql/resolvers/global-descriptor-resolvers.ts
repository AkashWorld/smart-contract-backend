import { IResolvers } from 'graphql-tools';
import { IContext, Context } from '../context';
import { GlobalDescriptorService } from '../../services/global-descriptor-service';
import { IDescriptor } from './user-descriptor-resolvers';

const globalDescriptorService = new GlobalDescriptorService();

const resolver: IResolvers = {
	Query: {
		getValuesForUnitGlobal: async (
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

		getAllAvailableUnitsGlobal: async (
			_: any,
			__: any,
			context: Context
		) => {
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
	}
};

export default resolver;
