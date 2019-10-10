import bodyparser from 'body-parser';
import express from 'express';
import { serveGraphQLRequest } from './graphql';

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
			variableValues: req.body.variables
		},
		res
	);
});

export const server = app.listen(PORT, () => {
	console.log(`Express server initialized on port ${PORT}`);
	console.log(
		`GraphQL requests are enabled on /graphql endpoint via POST requests`
	);
});
