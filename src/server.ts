import bodyparser from 'body-parser';
import express from 'express';
import { serveGraphQLRequest, createGraphQLSubscription } from './graphql';
import { Context, IContext } from './graphql/context';
import { createServer } from 'http';
import dotenv from 'dotenv';
const cors = require('cors');
dotenv.config();

const PORT = process.env.PORT;

const app = express();

/**
 * Allow only JSON request bodies
 */
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * GraphQL endpoint
 */

/** cors to be used in order to grant access to graphql server through queries
 * Using this cuz using grahpql-js for queries, graphql-js makes query from front
 * end easier, so cors will be used to get access.
 */
app.use(cors());

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

//end of graphql setup

export const server = createServer(app);

server.listen(PORT, () => {
	createGraphQLSubscription(server);
	console.log(`Express server initialized on port ${PORT}`);
	console.log(
		`GraphQL requests are enabled on /graphql endpoint via POST requests`
	);
});
