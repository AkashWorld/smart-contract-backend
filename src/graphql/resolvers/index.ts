import _ from 'lodash';
import accountCreateVerifyResolver from './accounts-create-verify-resolver';
import helloWorldResolver from './hello-world-resolver';
import userDescriptorResolver from './user-descriptor-resolvers';
import dynamicAnalyticsResolver from './dynamic-analytics-resolver';
import accountsResolver from './accounts-resolver';
import globalDescriptorResolver from './global-descriptor-resolvers';
import crawlerResolver from './crawler-resolver';

export const resolvers = _.merge(
	{},
	accountCreateVerifyResolver,
	helloWorldResolver,
	userDescriptorResolver,
	dynamicAnalyticsResolver,
	accountsResolver,
	globalDescriptorResolver,
	crawlerResolver
);
