/**
 * Khalid Akash 2019
 */
import fs from 'fs';
import Web3 from 'web3';
// tslint:disable-next-line:no-submodule-imports
import { Tx } from 'web3/eth/types';
import { UserDescriptors } from '../../types/web3-contracts/UserDescriptors';

/**
 * This class's purpose is to be an abstraction for interacting with the Blockchain, and in particular,
 * the UserDescriptors Smart Contract. This class implements methods that are in the smart contract and executes
 * it on behalf of the invoker of this class. The actual smart contract can be found in ./contracts/UserDescriptors.sol
 *
 * We want to create a class like this for every smart contract.
 */
export class UserDescriptorService {
	/**
	 * USER_DESCRIPTOR_ABI_PATH is the path to the JSON that has information about the SmartContract that
	 * web3js can read. This allows Web3JS to add methods to a contract object that we can invoke from JavaScript.
	 */
	private static readonly USER_DESCRIPTOR_ABI_PATH =
		'build/contracts/UserDescriptors.json';
	/**
	 * Local link to our Etherium blockchain (local node)
	 */
	private readonly providerLink: string = 'http://localhost:8545';
	/**
	 * Web3 is the main JavaScript client that allows us to interact with nodes in the blockchain.
	 * It is what Truffle uses in the backend, but we can invoke it directly to get more control and
	 * not rely too much on the Truffle framework.
	 * https://web3js.readthedocs.io/en/v1.2.0/getting-started.html
	 */
	private readonly web3Client: Web3;
	/**
	 * Local Smart Contract object that we can invoke methods on which will automatically invoke methods on the
	 * actual Smart Contract in the blockchain.
	 */
	private readonly contract: UserDescriptors;

	/**
	 * Initializes the Web3 client that connects to the blockchain and creates the contract object.
	 *
	 * @param contractAddress Address of the contract in the blockchain. If you do not know this address,
	 * you can execute the following shell command (AFTER LAUNCHING THE LOCAL BLOCKCHAIN) 'npx ts-node ./bin/deploy-contracts.ts'
	 * The script will deploy the contracts to the blockchain and write to the filesystem at ./build/deployed-contracts.json a JSON
	 * object that contains all the contracts and their addresses; retrieve the address from there.
	 *
	 * @param port Port in localhost (your personal computer) where the blockchain is running. Typically Ganache runs on port
	 * 7545 in the GUI or 8545 on the CLI. You can change the configuration in the truffle-config.js.
	 */
	constructor(contractAddress: string, port: number) {
		// Prevent port greater that 2^16 (max)
		if (port < Math.pow(2, 16)) {
			this.providerLink = 'http://localhost:' + port.toString();
		}
		const provider = new Web3.providers.HttpProvider(this.providerLink);
		this.web3Client = new Web3(provider);
		this.contract = new this.web3Client.eth.Contract(
			this.getContractAbi(),
			contractAddress
		) as UserDescriptors;
	}

	/**
	 * Abstraction for UserDescriptors (smart contract) method, insertValue(unit: string, value: number)
	 * See ./contracts/UserDescriptors.sol for the actual contract method
	 * @param accountId ID of the account sending the request (Local blockchain autogenerates 10 accounts to use)
	 * @param unit A unit such as lb, cm, miles, kilometer, etc
	 * @param value Quantity that of this particular unit
	 * @param gas Optional paramter, defaults to 5,000,000. Need gas to perform any sort of operation.
	 */
	public insertValue(
		accountId: string,
		unit: string,
		value: number,
		gas = 5_000_000
	): void {
		const transaction = this.contract.methods.insertValue(unit, value);
		const txOptions: Tx = {
			from: accountId,
			gas
		};
		transaction
			.send(txOptions)
			.on('receipt', receipt => {
				console.log(
					`insertValue(${accountId}, ${unit}, ${value}) => Transaction event available ${receipt.transactionHash}`
				);
			})
			.on('error', console.error);
	}

	/**
	 * Abstraction for UserDescriptors (smart contract) method, getLatestValueForUnit(unit: string): number
	 * See ./contracts/UserDescriptors.sol for the actual contract method
	 * @param accountId ID of the account sending the request (Local blockchain autogenerates 10 accounts to use)
	 * @param unit A unit such as lb, cm, miles, kilometer, etc
	 * @param gas Optional paramter, defaults to 5,000,000. Need gas to perform any sort of operation.
	 */
	public async getLatestValueForUnit(
		accountId: string,
		unit: string,
		gas = 5_000_000
	): Promise<number> {
		const txOptions: Tx = {
			from: accountId,
			gas
		};
		const value = ((await this.contract.methods
			.getLatestUnitValue(unit)
			.call(txOptions)) as unknown) as string;

		return parseInt(value, 10);
	}

	/**
	 * Abstraction for UserDescriptors (smart contract) method, getAllValuesRecordedForUnit(unit: string): number[]
	 * See ./contracts/UserDescriptors.sol for the actual contract method
	 * @param accountId ID of the account sending the request (Local blockchain autogenerates 10 accounts to use)
	 * @param unit A unit such as lb, cm, miles, kilometer, etc
	 * @param gas Optional paramter, defaults to 5,000,000. Need gas to perform any sort of operation.
	 */
	public async getAllValuesRecordedForUnit(
		accountId: string,
		unit: string,
		gas = 5_000_000
	): Promise<number[]> {
		const txOptions: Tx = {
			from: accountId,
			gas
		};
		const stringArray = await this.contract.methods
			.getAllUnitValues(unit)
			.call(txOptions);
		return stringArray.map(val => {
			return parseInt((val as unknown) as string, 10);
		});
	}

	/**
	 * Abstraction for UserDescriptors (smart contract) method, getAllAvailableUnitForUser(): string[]
	 * See ./contracts/UserDescriptors.sol for the actual contract method
	 * @param accountId ID of the account sending the request (Local blockchain autogenerates 10 accounts to use)
	 * @param gas Optional paramter, defaults to 5,000,000. Need gas to perform any sort of operation.
	 */
	public async getAllAvailableUnitsForUser(
		accountId: string,
		gas = 5_000_000
	) {
		const txOptions: Tx = {
			from: accountId,
			gas
		};
		return this.contract.methods.getAllAvailableUnits().call(txOptions);
	}

	/**
	 * Gets all the accounts in the blockchain and returns the ID of the account at
	 * a certain index in the returned array.
	 */
	public async getAccountAtIndex(index: number): Promise<string> {
		const accounts = await this.web3Client.eth.getAccounts();
		if (accounts.length <= index || index < 0) {
			return Promise.reject(
				Error(
					'index specified is out of bounds of length of the accounts array'
				)
			);
		}
		return accounts[index];
	}

	/**
	 * This allows Web3JS to add methods to a contract object that we can invoke for our using the
	 * JSON ABI (Application Binary Interface). The JSON ABI has the contract methods that can be
	 * invoked with input paramters/types, and output paramters/types.
	 */
	private getContractAbi(): any[] {
		const rawJson = fs.readFileSync(
			UserDescriptorService.USER_DESCRIPTOR_ABI_PATH
		);
		return JSON.parse(rawJson.toString()).abi;
	}
}
