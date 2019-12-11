import { IResolvers } from 'graphql-tools';
import { IContext, Context } from '../context';
import { GlobalDescriptorService } from '../../services/global-descriptor-service';
import { IDescriptor } from './user-descriptor-resolvers';
import cache from 'memory-cache';

const globalDescriptorService = new GlobalDescriptorService();

export const GLOBAL_CACHE_KEY = 'GLOBAL';
export const CACHE_AMOUNT = 250;

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
		},
		getAverageForUnit: async (
			_,
			args: { unit: string; count?: number },
			context: IContext
		) => {
			if (!context) {
				return null;
			}
			const cacheResult = cache.get(getAverageValueCacheKey(args.unit));
			if (cacheResult) {
				return cacheResult;
			}
			if (!args.count) {
				args.count = 500;
			}
			const data: IDescriptor[] = await globalDescriptorService.getPaginatedValuesRecordedForUnit(
				context.getEtheriumAccountId(),
				args.unit,
				0,
				args.count
			);
			const average =
				data.reduce((accum, curr) => accum + curr.value, 0) /
				data.length;
			cache.put(getAverageValueCacheKey(args.unit), average);
			return average;
		}
	}
};

export function getAverageValueCacheKey(unit: string): string {
	return `AVERAGE${unit}`;
}

export default resolver;
