import _ from 'lodash';
import helloWorldResolver from './hello-world-resolver';
import loginResolver from './login-resolver';
import userDescriptorResolver from './user-descriptor-resolvers';

export const resolvers = _.merge(
	{},
	helloWorldResolver,
	userDescriptorResolver,
	loginResolver
);
