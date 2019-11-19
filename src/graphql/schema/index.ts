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

=======
type Create {
	newKey: String!
}

extend type Query {
	createNewAccount(privateKey: String!): Create!
}

>>>>>>> Login and Account creation nearly finished
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

type Login {
	signed_address: String!
}

type Verify {
	address: String!
}

extend type Query {
	login(unsigned_address: String!): Login!
	loginMM(signed_address: String!): Verify!
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
