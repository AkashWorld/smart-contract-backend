import bodyparser from 'body-parser';
import express from 'express';
import { serveGraphQLRequest } from './graphql';
import { Context } from './graphql/context';

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
			contextValue: new Context(
				'0x09fd9523039175C6B7c5838C729BD3e52Ee4D251'
			)
		},
		res
	);
});

app.post('/login',(req,res)=>{
	serveGraphQLRequest(
		{
			source: req.body.query,
			operationName: req.body.operationName,
			variableValues: req.body.vairables,
			contextValue: new Context('')
		},
		res);
});

export const server = app.listen(PORT, () => {
	console.log(`Express server initialized on port ${PORT}`);
	console.log(
		`GraphQL requests are enabled on /graphql endpoint via POST requests`
	);
});
