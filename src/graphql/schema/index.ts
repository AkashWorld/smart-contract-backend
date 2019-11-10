<<<<<<< HEAD
export const typeDefs = `
schema {
	query: Query
	mutation: Mutation
	subscription: Subscription
}

=======
export const typeDefs = `
>>>>>>> commit fo current account creation and login
type Query {
	_: Boolean
}

type Mutation {
	_: Boolean
}

<<<<<<< HEAD
type Subscription {
	_: Boolean
}

=======

>>>>>>> commit fo current account creation and login
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

extend type Query {
	login(unsigned_address: String!): Login!
	loginM : Login!
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
