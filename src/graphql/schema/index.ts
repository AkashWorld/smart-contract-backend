export const typeDefs = `
type Query {
	_: Boolean
}

type Mtuation {
	_: Boolean
}

type LocalizedHelloWorld {
	java: String!
	python: String!
	cpp: String!
	javascript: String!
}

extend type Query {
	localizedHelloWorld: LocalizedHelloWorld!
}

`
