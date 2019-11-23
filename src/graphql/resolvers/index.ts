import _ from 'lodash';
import createNewAccountResolver from './create-account-resolver';
import helloWorldResolver from './hello-world-resolver';
import loginResolver from './login-resolver';
import userDescriptorResolver from './user-descriptor-resolvers';
import dynamicAnalyticsResolver from './dynamic-analytics-resolver';
import accountsResolver from './accounts-resolver';

export const resolvers = _.merge(
	{},
	createNewAccountResolver,
	helloWorldResolver,
	userDescriptorResolver,
	loginResolver,
	dynamicAnalyticsResolver,
	accountsResolver
);
