import { LoginMM } from '../../services/login/loginMMService';
import { loginDataInput } from '../../services/login/loginpost';

/**
 *Resolver obtains the unsigned_address from the query request
 *then it calls the loginDataInput to obtained the singed_address
 *which then is returned as query.
 */

const resolver = {
	Query: {
		loginMM: (_: any, args: { signed_address: string }, context: any) => {
			console.log(args.signed_address);
			const ret_address = LoginMM(args.signed_address);
			return {
				address: ret_address
			};
		}
	}
};

export default resolver;

/** The bleow code was for a different method that is no longer in use. It is
 * kept here just in case any need for it arises.
 */ // 	login: (_: any, args: { unsigned_address: string }, context: any) => {
// let signedAddress = loginDataInput(args.unsigned_address);
// return {
// signed_address: signedAddress
// };
// },
