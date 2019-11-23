import { IContext } from '../context';
import { AccountsService } from '../../services/accounts-service';

const accountsService = new AccountsService();

const resolver = {
	Query: {
		getBalance: (_: any, __: any, context: IContext) => {
			if (!context) return null;
			return accountsService.getEtheriumBalance(
				context.getEtheriumAccountId()
			);
		}
	}
};

export default resolver;
