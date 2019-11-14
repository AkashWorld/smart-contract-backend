import _ from 'lodash';
import helloWorldResolver from './hello-world-resolver';
import userDescriptorResolver from './user-descriptor-resolvers';
import dynamicAnalyticsResolver from './dynamic-analytics-resolver';

export const resolvers = _.merge(
	{},
	helloWorldResolver,
	userDescriptorResolver,
	dynamicAnalyticsResolver
);
