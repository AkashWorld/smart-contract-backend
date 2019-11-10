import { loginDataInput } from '../../services/login/loginpost';
import {createNewAccount} from '../../services/login/createAccount'

/**
 *Resolver obtains the unsigned_address from the query request
 *then it calls the loginDataInput to obtained the singed_address
 *which then is returned as query.
 */

const resolver = {
	Query: {
		login: (_: any, args: { unsigned_address: string }, context: any) => {
			let signedAddress = loginDataInput(args.unsigned_address);
			return {
				signed_address: signedAddress
			};
		},
    loginM: () =>{
      let newAccountPrivateKey = createNewAccount();
      return{
        signed_address: newAccountPrivateKey
      };
    }
	}
};

export default resolver;
