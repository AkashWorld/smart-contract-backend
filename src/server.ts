import bodyparser from 'body-parser';
import express from 'express';
import { serveGraphQLRequest, createGraphQLSubscription } from './graphql';
import { Context } from './graphql/context';
import { createServer } from 'http';
import dotenv from 'dotenv';
import {verify} from './services/login/verification-service'

dotenv.config();

const PORT = process.env.PORT;

const app = express();

let accId:any = null;
let context:any = null;

/**
 * Allow only JSON request bodies
 */
app.use(bodyparser.json());

/**
 * GraphQL endpoint
 */
app.post('/graphql', (req, res) => {
	accId = verify(req.header('authorization'));
	if(accId !== null){
		context = new Context(accId);
	}
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
