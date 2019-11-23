import { createNewAccount } from '../../services/login/create-account-service';

const resolver = {
	Mutation: {
		createNewAccount: (
			_: any,
			args: { privateKey: string },
			context: any
		) => {
			const newAccountPrivateKey = createNewAccount(args.privateKey);
			return {
				newKey: newAccountPrivateKey
			};
		}
	}
};

export default resolver;
