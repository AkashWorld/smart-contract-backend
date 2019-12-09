import bodyparser from 'body-parser';
import express from 'express';
import { serveGraphQLRequest, createGraphQLSubscription } from './graphql';
import { Context, IContext } from './graphql/context';
import { createServer } from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import loadEtheriumAccountID from './utilities/account-address-loader';
import { populateCache } from './pre-fetcher';

populateCache();

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
	loadEtheriumAccountID().then(id => {
		console.log('Request context: ' + id);
		serveGraphQLRequest(
			{
				source: req.body.query,
				operationName: req.body.operationName,
				variableValues: req.body.variables,
				contextValue: new Context(id)
			},
			res
		);
	});
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
