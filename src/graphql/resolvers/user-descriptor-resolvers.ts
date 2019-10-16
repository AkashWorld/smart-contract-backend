import { IResolvers } from 'graphql-tools';
import { IContext } from '../context';
import services from '../../services';
export interface IDescriptor {
	unit: String;
	value: number;
	longitude: number;
	latitude: number;
	unixTimestamp: number;
}

const resolver: IResolvers = {
	Query: {
		getLatestUnitValue: async (
			_,
			args: { unit: string },
			context: IContext
		): Promise<number> => {
			if (context == undefined)
				return Promise.reject('User context not available');
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
			if (context == undefined)
				Promise.reject('User context not available');
			if (args.count <= 0) Promise.reject('Invalid count argument');
			const ethAccId = context.getEtheriumAccountId();
			return services.userDescriptorService.getPaginatedValuesRecordedForUnit(
				ethAccId,
				args.unit,
				args.start,
				args.count
			);
		}
	}
};

export default resolver;
