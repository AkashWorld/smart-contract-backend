import { IContext } from '../context';
import { UserDescriptorService } from '../../services/user-descriptor-service';

const userDescriptorService = new UserDescriptorService();

const TREND = Object.freeze({
	UP: 'UP',
	DOWN: 'DOWN',
	SAME: 'SAME'
});

interface IDailyTrend {
	unit: string;
	value: number;
	trend: string;
}

const resolver = {
	Query: {
		getDailyWeight: async (
			_: any,
			__: any,
			context: IContext
		): Promise<IDailyTrend | null> => {
			if (!context) {
				Promise.reject('Context not found');
			}
			const paginatedData = await userDescriptorService.getPaginatedValuesRecordedForUnit(
				context.getEtheriumAccountId(),
				'lb',
				0,
				2
			);
			if (!paginatedData || paginatedData.length == 0) {
				return null;
			}
			const unit = paginatedData[paginatedData.length - 1].unit;
			const value = paginatedData[paginatedData.length - 1].value;
			let trend = null;
			if (value > paginatedData[0].value) {
				trend = TREND.UP;
			} else if (value < paginatedData[0].value) {
				trend = TREND.DOWN;
			} else {
				trend = TREND.SAME;
			}
			return { unit, value, trend };
		},
		getDailyBMI: async (
			_: any,
			__: any,
			context: IContext
		): Promise<IDailyTrend | null> => {
			if (!context) {
				return null;
			}
			const heights = (await userDescriptorService.getPaginatedValuesRecordedForUnit(
				context.getEtheriumAccountId(),
				'inch',
				0,
				2
			)).map(val => val.value);
			if (heights.length == 0) {
				return null;
			}
			const weights = (await userDescriptorService.getPaginatedValuesRecordedForUnit(
				context.getEtheriumAccountId(),
				'lb',
				0,
				2
			)).map(val => val.value);
			if (weights.length == 0) {
				return null;
			}
			const BMI =
				(703 * weights[weights.length - 1]) /
				Math.pow(heights[heights.length - 1], 2);
			const pastBMI = (703 * weights[0]) / Math.pow(heights[0], 2);
			let trend = null;
			if (BMI < pastBMI) {
				trend = TREND.DOWN;
			} else if (BMI > pastBMI) {
				trend = TREND.UP;
			} else {
				trend = TREND.SAME;
			}
			return { unit: 'BMI', value: BMI, trend };
		}
	}
};

export default resolver;
