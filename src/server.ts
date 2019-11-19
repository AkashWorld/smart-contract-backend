import bodyparser from 'body-parser';
import express from 'express';
import { serveGraphQLRequest, createGraphQLSubscription } from './graphql';
import { Context } from './graphql/context';
import { createServer } from 'http';

const PORT = 8080;

const app = express();

/**
 * Allow only JSON request bodies
 */
app.use(bodyparser.json());

/**
 * GraphQL endpoint
 */
app.post('/graphql', (req, res) => {
	serveGraphQLRequest(
		{
			source: req.body.query,
			operationName: req.body.operationName,
			variableValues: req.body.variables,
			contextValue: new Context('') // place in here the signed message as a string
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
