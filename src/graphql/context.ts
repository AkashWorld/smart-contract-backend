/**
 * Interface for the Context object that will be passed into GraphQL
 * After we do authentication, we can pass the accountId around via a
 * context object for each GraphQL query that is executed from the front-end.
 */
export interface IContext {
	accountId: string;
}
