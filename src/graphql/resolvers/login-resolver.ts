import { verify } from '../../services/login/verification-service';

/**
 *Resolver obtains the unsigned_address from the query request
 *then it calls the loginDataInput to obtained the singed_address
 *which then is returned as query.
 */

const resolver = {
	Mutation: {
		verify: (_: any, args: { signed_message: string }, context: any) => {
			console.log(args.signed_message);
			const ret_address = verify(args.signed_message);
			return {
				address: ret_address
			};
		}
	}
};

export default resolver;

/** The bleow code was for a different method that is no longer in use. It is
 * kept here just in case any need for it arises.
 */ // 	login: (_: any, args: { unsigned_message: string }, context: any) => {
// let signedAddress = loginDataInput(args.unsigned_message);
// return {
// signed_message: signedAddress
// };
// },
