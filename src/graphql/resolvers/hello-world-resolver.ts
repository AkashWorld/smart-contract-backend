import { PubSub } from 'graphql-subscriptions';
/**
 * Resolver for the Query localizedHelloWorld
 * What is a graphql resolver? https://www.apollographql.com/docs/apollo-server/data/data/#resolver-map
 * The schema that corresponds to this is in ../schema/hello-world.graphql
 */

const HW_EVENT_ID = 'helloWorldEvent';
const pubsub = new PubSub();
let counter = 0;

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
	},
	Subscription: {
		helloWorldSubscription: {
			subscribe: () => {
				counter = 0;
				const it = pubsub.asyncIterator(HW_EVENT_ID);
				setInterval(() => {
					pubsub.publish(HW_EVENT_ID, {
						helloWorldSubscription: {
							msg: `Hello, World - ${counter++}`
						}
					});
				}, 200);
				return it;
			}
		}
	}
};

export default resolver;
