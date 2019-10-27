/**
 * Resolver for the Query localizedHelloWorld
 * What is a graphql resolver? https://www.apollographql.com/docs/apollo-server/data/data/#resolver-map
 * The schema that corresponds to this is in ../schema/hello-world.graphql
 */

const resolver = {
	Query: {
		localizedHelloWorld: () => {
			return {
				java: "System.out.println('Hello, World');",
				python: "print('Hello, World')",
				cpp: "std::cout << 'Hello, World' << std::endl;",
				javascript: "console.log('Hello, World')"
			};
		}
	}
};

export default resolver;
