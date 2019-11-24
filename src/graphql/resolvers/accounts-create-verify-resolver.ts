import { verify } from '../../services/login/verification-service';
import { createNewAccount } from '../../services/login/create-account-service';

/**
 *Resolver obtains the unsigned_address from the query request
 *then it calls the loginDataInput to obtained the singed_address
 *which then is returned as query.
 *
 * Resolver also is responsible for creating new accounts. Users will
 * copy and paste private key from metamask and paste in to client text box
 * which will be parameter for createNewAccount and function will return new
 * account address.
 */

 const resolver = {
 	Mutation: {
 		verify: (_: any, args: { signedMessage: string }, context: any) => {
 			const returnAddress = verify(args.signedMessage);
      return{
        address: returnAddress
      };
 		},

    createNewAccount: (
      _: any,
      args: { privateKey: string },
      context: any
    ) => {
      const newAccountAddress = createNewAccount(args.privateKey);
      return {
        newKey: newAccountAddress
      };
    }
 	}
 };

 export default resolver;
