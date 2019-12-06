export const typeDefs = `
type Verify {
	address: String!
}

type Create {
	newKey: String!
}

extend type Mutation {
	verify(signedMessage: String!): Verify!
	createNewAccount(privateKey: String!): Create!
}

extend type Query {
	getBalance: Float!
}

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

enum QueryTrend {
	gain
	lose
	maintain
}

type WebPage {
	title: String!
	link: String!
}

extend type Query {
	getWebsiteSuggestions(unitName: String!, trend: QueryTrend!, amount: Int): [WebPage!]!
}

enum Trend {
	UP
	SAME
	DOWN
}

type DailyTrend {
	unit: String!
	value: Float!
	trend: Trend
}

extend type Query {
	getDailyWeight: DailyTrend
	getDailyBMI: DailyTrend
}

extend type Query {
	getValuesForUnitGlobal(unit: String!): [Descriptor!]!
	getAllAvailableUnitsGlobal: [String!]!
	getLatestUnitValueGlobal(unit: String!): Float!
	getPaginatedDescriptorsGlobal(
		unit: String!
		start: Int!
		count: Int!
	): [Descriptor!]!
	getAverageForUnit(unit: String!, count: Int): Float!
}

extend type Mutation {
	insertValueGlobal(
		unit: String!
		value: Float!
		longitude: Float
		latitude: Float
	): String!
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
	getValuesForUnit(unit: String!): [Descriptor!]!
	getAllAvailableUnits: [String!]!
	getLatestUnitValue(unit: String!): Float!
	getPaginatedDescriptors(
		unit: String!
		start: Int!
		count: Int!
	): [Descriptor!]!
}

extend type Mutation {
	insertValue(
		unit: String!
		value: Float!
		longitude: Float
		latitude: Float
	): String!
}

enum TransactionResponse {
	TRANSACTION_HASH
	CONFIRMATION
	RECIEPT
	ERROR
}

type InsertValueResponse {
	transactionHash: String!
	responseType: TransactionResponse!
	message: String!
}

extend type Subscription {
	insertValueSubscription: InsertValueResponse!
}

`
