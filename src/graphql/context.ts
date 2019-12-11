import jwt from 'jsonwebtoken';
/**
 * Interface for the Context object that will be passed into GraphQL
 * After we do authentication, we can pass the accountId around via a
 * context object for each GraphQL query that is executed from the front-end.
 */
export interface IContext {
	getEtheriumAccountId: () => string;
}

export class Context implements IContext {
	private ethereumAccountId: string;

	/**This constructor will recieve singed messages for any transactions
	 * and return the address which the message came from to be used as
	 * context variable in other scripts.
	 */
	constructor(ethereumAccountId: string) {
		this.ethereumAccountId = ethereumAccountId;
	}

	public getEtheriumAccountId(): string {
		return this.ethereumAccountId;
	}

	static PRIVATE_KEY =
		"DON'T STORE YOUR PRIVATE KEY LIKE THIS PLEASE, IM JUST FUDGING";

	static signAccountId(accountId: string): string {
		console.log(`Signing accountId ${accountId}`);
		const token = jwt.sign(
			{ authorization: accountId },
			Context.PRIVATE_KEY,
			{
				audience: 'HealthAnalyticsEngine',
				issuer: 'SmartContractBackend'
			}
		);
		console.log(`Signed token: ${token}`);
		return token;
	}

	static verifyToken(token: string): string | undefined {
		try {
			const decodedToken = jwt.verify(token, Context.PRIVATE_KEY, {
				audience: 'HealthAnalyticsEngine',
				issuer: 'SmartContractBackend'
			});
			return (decodedToken as any).authorization;
		} catch (err) {
			console.error(err);
			return undefined;
		}
	}
}
