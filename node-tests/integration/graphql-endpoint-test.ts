import request from 'supertest';
import { server } from '../../src/server';

describe('integration tests for graphql', () => {
	after(() => {
		server.close();
	});
	it('should return a non-error OK response from the GraphQL endpoint', done => {
		const query = {
			query: `{
            __schema {
                types {
                    name
                }
            }
        }`
		};

		request(server)
			.post('/graphql')
			.set('Accept', 'application/json')
			.send(query)
			.expect(200)
			.end(done);
	});
});
