# Smart Contract Service

The purpose of this repository is to demonstrate how to use smart contracts and any tools in the etherium development environment to successfully demo a working implementation of a smart contract. The smart contract created is a simple implementation of a storage for user's looking to store personal descriptors (weight, height, or any other units they want).


## Install

Ensure that you have the latest [Node.js](https://nodejs.org/en/) installed.

Download [ganache](https://www.trufflesuite.com/ganache) GUI. This is a local blockchain that you can run on your own computer for development/tests. There is a command line version that we use as well but this can be a lot easier to visualize.

Sometimes the compilation of some libraries can fail if you don't have a c/c++ compiler installed since the Solidity compiler needs it. For linux systems, ensure gcc/g++ is installed; for Windows install [VS2019](https://visualstudio.microsoft.com/vs/) and ensure that you download the C++ windows toolchains.

Install all needed libraries with the following npm (Node Package Manager) command:

```
npm install         # This will install all dependencies listed in package.json in ./node_modules
```

To generate the final **GraphQL Schema**, compile **Smart Contracts**, generate types for TypeScript from the Smart Contracts(to make development easier), and finally compiling TypeScript down to JavaScript, run the following:

```
npm run build       # This should run automatically after npm install for the first time
```

## How to start the service
First we need to get the Etherium Blockchain ready, start the **Genache GUI**. Run the following command afterwards to upload the smart contracts. In addition to this, dummy data will be put in for testing (might take awhile!).
```
npm run migrate
```
Then just start the server!
```
npm start
```

## Query the GraphQL API!

The GraphQL API endpoint is the following

```
http://localhost:8080/graphql     #POST Request Only!
```

You can query the API after starting the server by using a [Altair GraphQL frontend client](https://altair.sirmuel.design/) (available in Chrome/Firefox/etc).

It looks something like this:
![](./gifs/graphql-client.png)

Try pasting the following query after following the above steps
```
query {
  getPaginatedDescriptors(unit:"lb", start: 0, count: 15) {
    value
    latitude
    longitude
  }
}
```

## Prepare your editor

The editor of choice is [VSCode](https://code.visualstudio.com/) for its extensive support for JavaScript and TypeScript development. it is **strongly** suggested that you use it. Two **MUST HAVE** extensions for VSCode is TSLint (deprecated) and Prettier. TSLint catches errors and enforces policies for TypeScript code, and Prettier formats your code when you save to a standard format. Configurations for TSLint can be found at [tslint.json](tslint). Please ensure you are downloading the deprecated version of TSLint as that has Autosave functionality.

![](./gifs/tslint.gif)

## License

MIT
