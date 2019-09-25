/**
 * Khalid Akash - 2019
 * This script deploys all smart contracts in ./contracts directory to a locally running
 * blockchain (http://localhost:7545 by default) and writes their address to a JSON file
 * in build/deployed-contracts.json.
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import Web3 from 'web3';

/**
 * Can give port number as an argument in the Command Line, for example:
 * npx ts-node ./bin/deploy-contracts.ts 9000
 */
let blockChainAddress: string = 'http://localhost:7545';
if (process.argv.length > 2) {
	blockChainAddress = 'http://localhost:' + process.argv[2];
}
/**
 * Client to connect to a blockchain, in this scenario, its a local one at port 8545
 */
const provider = new Web3.providers.HttpProvider(blockChainAddress);
const web3 = new Web3(provider);

/**
 * We have to make sure our contracts, in the ./contracts folder, are compiled.
 * If the build directory is empty, we execute the compiler
 * We spawn a shell that will execuet the shell command 'npx truffle compile'
 */
if (
	!fs.existsSync('./build/contracts') ||
	fs.readdirSync('./build/contracts').length === 0
) {
	spawnSync('npx', ['truffle', 'compile'], { stdio: 'inherit' });
}

/**
 * All Smart Contracts will be compiled to ./build/contracts into a JSON file. The JSON
 * file has a property called ABI which contains the bytecode of the contract to run on the EVM.
 */
const contractList = fs.readdirSync('./build/contracts');
/**
 * Filter out all files in the directory that is not a JSON or does not have EVM bytecode
 */
const contractBytecodePair = contractList
	.map(fileName => './build/contracts/' + fileName)
	.filter(fileName => fileName.endsWith('.json'))
	.map(fileName => {
		const buffer = fs.readFileSync(fileName);
		const contractJSON = JSON.parse(buffer.toString());
		if (!contractJSON || !contractJSON.bytecode) {
			return null;
		}
		return {
			bytecode: contractJSON.bytecode,
			contractName: contractJSON.contractName
		};
	})
	.filter(pair => pair != null);

/**
 * This function deploys the Smart Contracts to the blockchain and saves their addresses
 * in a JSON file in 'build/deployed-contracts.json'
 * https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=deploy#deploy
 * @param contractByteCode The bytecode of the Smart Contract that will be deployed
 * to the EVM
 */
async function deployContractsToBlockchain() {
	const account = (await web3.eth.getAccounts())[0];
	const outputJSON = [];
	for (const pair of contractBytecodePair) {
		const contract = new web3.eth.Contract([]);
		const transaction = contract.deploy({
			arguments: [],
			data: pair!.bytecode
		});
		const deployedContract = await transaction.send({
			from: account,
			gas: 1_500_000,
			gasPrice: '30000000000000'
		});
		outputJSON.push({
			name: pair!.contractName,
			address: deployedContract.options.address
		});
		console.log(
			`Deployed ${pair!.contractName} to the Blockchain at address ${
				deployedContract.options.address
			}`
		);
	}
	fs.writeFile(
		'./build/deployed-contracts.json',
		JSON.stringify(outputJSON),
		err => console.error
	);
}

deployContractsToBlockchain();
