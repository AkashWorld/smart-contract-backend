import _ from 'lodash';
import createNewAccountResolver from './create_account_resolver';
import helloWorldResolver from './hello-world-resolver';
import loginResolver from './login-resolver';
import userDescriptorResolver from './user-descriptor-resolvers';

export const resolvers = _.merge(
	{},
	createNewAccountResolver,
	helloWorldResolver,
	userDescriptorResolver,
	loginResolver
);
