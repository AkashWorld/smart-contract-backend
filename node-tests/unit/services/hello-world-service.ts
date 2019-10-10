import { expect } from 'chai';
import { helloWorld } from '../../../src/index';

describe('Hello World Unit Test', () => {
	it("should return 'Hello, World' string", () => {
		const expected = 'Hello, World';

		const result = helloWorld();

		expect(result).to.equal(expected);
	});
});
