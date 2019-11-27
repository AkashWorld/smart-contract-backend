import bodyparser from 'body-parser';
import express from 'express';
import { serveGraphQLRequest, createGraphQLSubscription } from './graphql';
import { Context, IContext } from './graphql/context';
import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

/**
 * Allow only JSON request bodies
 */
app.use(bodyparser.json());

/**
 * GraphQL endpoint
 */
app.post('/graphql', (req, res) => {
	const authHeader = req.header('authorization');
	const context: IContext | undefined = !authHeader
		? undefined
		: new Context(authHeader);
	serveGraphQLRequest(
		{
			source: req.body.query,
			operationName: req.body.operationName,
			variableValues: req.body.variables,
			contextValue: context
		},
		res
	);
});

export const server = createServer(app);

server.listen(PORT, () => {
	createGraphQLSubscription(server);
	console.log(`Express server initialized on port ${PORT}`);
	console.log(
		`GraphQL requests are enabled on /graphql endpoint via POST requests`
	);
});
