/**
 * Interface for the Context object that will be passed into GraphQL
 * After we do authentication, we can pass the accountId around via a
 * context object for each GraphQL query that is executed from the front-end.
 */
export interface IContext {
	getEtheriumAccountId: () => string;
}

export class Context implements IContext {
	private accountId: string;

	constructor(accountId: string) {
		this.accountId = accountId;
	}

	public getEtheriumAccountId(): string {
		return this.accountId;
	}
}
