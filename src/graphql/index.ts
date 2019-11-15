import { Response } from 'express';
import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { IContext, Context } from './context';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { Server } from 'http';

/**
 * Makes schema from schema definition (typeDefs) and resolvers (functions that resolve the requested query)
 */
const schema = makeExecutableSchema({ typeDefs, resolvers });

interface IGraphQLEndpointRequest {
	source: string;
	operationName?: string;
	variableValues?: Map<String, any>;
	contextValue?: IContext;
}

/**
 * Processes GraphQL request and returns the result
 *
 * @param args are values needed to execute the GraphQL query. args.source is the query itself,
 * args.operationName is the name of the query, args.variableValues are variables sent with the query,
 * and contextValue is a custom context object that can be passed to the query so the requested
 * resource can authenticate access to the resource.
 * @param res is the express Response object that GraphQL will send the processed response to.
 */
export function serveGraphQLRequest(
	args: IGraphQLEndpointRequest,
	res: Response
) {
	graphql({ schema, ...args }).then(result => {
		res.send(result);
	});
}

/**
 * Using the server as the input, this function creates the subscription
 * capabilities using Websocket for GraphQL. This means that time series data
 * can be given to the client (for example the client can subscribe to data, and
 * as the backend recieves the data one at a time, the data can slowly be pushed
 * to the client rather than having to wait for all the data to arrive at the backend
 * before pushing it to the client).
 * ws://localhost:8080/subscriptions
 *
 * A conceptual overview can be found on https://graphql.org/blog/subscriptions-in-graphql-and-relay/
 * @param server http server, usually created from an express instance
 */
export function createGraphQLSubscription(server: Server) {
	new SubscriptionServer(
		{
			execute,
			subscribe,
			schema: schema,
			onConnect: (params: any) => {
				if (!params.authorization) return null;
				const context = new Context(params.authorization);
				console.log(
					`ws://onConnect: (authorization) => accountId: ${context.getEtheriumAccountId()}`
				);
				return context;
			}
		},
		{
			server: server,
			path: '/subscriptions'
		}
	);
}
