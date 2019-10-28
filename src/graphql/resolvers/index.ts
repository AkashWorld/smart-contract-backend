import _ from 'lodash';
import helloWorldResolver from './hello-world-resolver';
import loginResolver from './login-resolver';
import userDescriptorResolver from './user-descriptor-resolvers';
import loginResolver from './login-resolver';

export const resolvers = _.merge(
	{},
	helloWorldResolver,
	userDescriptorResolver,
	loginResolver
);
