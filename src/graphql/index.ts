import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { graphql } from 'graphql';
import { Response } from 'express';
import { IContext } from './context';

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
