import bodyparser from 'body-parser';
import express from 'express';
import { serveGraphQLRequest, createGraphQLSubscription } from './graphql';
import { Context, IContext } from './graphql/context';
import { createServer } from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { populateCache } from './pre-fetcher';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/**
 * GraphQL endpoint
 */

app.post('/graphql', (req, res) => {
	const authHeader = req.header('authorization');
	const context: IContext | undefined = !authHeader
		? undefined
		: new Context(authHeader);
	console.log(
		'Request context: ' + (context ? context.getEtheriumAccountId() : null)
	);
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
	populateCache();
});
