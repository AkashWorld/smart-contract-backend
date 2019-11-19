import { createNewAccount } from '../../services/login/createAccount';
import { createAcc } from '../../services/login/createAccountAlt';

const resolver = {
	Query: {
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
