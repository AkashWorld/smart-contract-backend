import { expect } from 'chai';
import { server } from '../../src/server';

it.only('should start an express server at port 8080', () => {
	expect(server).is.not.null;

	expect((server.address() as any).address).to.be.equal('::');
	expect((server.address() as any).port).to.be.equal(8080);

	server.close();
});
