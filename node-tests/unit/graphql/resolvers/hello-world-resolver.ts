import { expect } from 'chai';
import helloWorldResolver from '../../../../src/graphql/resolvers/hello-world-resolver';

it('should return the correct Hello, World strings', () => {
	const helloWorldStrings = helloWorldResolver.Query.localizedHelloWorld;

	expect(helloWorldStrings).to.not.be.null;
	expect(helloWorldStrings().java).to.be.equal(
		"System.out.println('Hello, World');"
	);
	expect(helloWorldStrings().cpp).to.be.equal(
		"std::cout << 'Hello, World' << std::endl;"
	);
	expect(helloWorldStrings().javascript).to.be.equal(
		"console.log('Hello, World')"
	);
	expect(helloWorldStrings().python).to.be.equal("print('Hello, World')");
});
