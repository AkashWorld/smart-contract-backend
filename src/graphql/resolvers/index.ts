import _ from 'lodash';
import createNewAccountResolver from './create-account-resolver';
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
