export const typeDefs = `
schema {
	query: Query
	mutation: Mutation
	subscription: Subscription
}

type Query {
	_: Boolean
}

type Mutation {
	_: Boolean
}

type Subscription {
	_: Boolean
}

type LocalizedHelloWorld {
	java: String!
	python: String!
	cpp: String!
	javascript: String!
}

type HelloWorldEvent {
	msg: String!
}

extend type Query {
	localizedHelloWorld: LocalizedHelloWorld!
}

extend type Subscription {
	helloWorldSubscription: HelloWorldEvent!
}
type Descriptor {
	unit: String!
	value: Float!
	longitude: Float!
	latitude: Float!
	unixTimestamp: Int!
}

extend type Query {
	getAllAvailableUnits: [String!]!
	getLatestUnitValue(unit: String!): Float!
	getPaginatedDescriptors(
		unit: String!
		start: Int!
		count: Int!
	): [Descriptor!]!
}

`
