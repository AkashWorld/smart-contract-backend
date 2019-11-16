
import BN from 'bn.js';
import fs from 'fs';
import Web3 from 'web3';
// tslint:disable-next-line:no-submodule-imports
import { Tx } from 'web3/eth/types';
import { GlobalDescriptor } from '../../types/web3-contracts/GlobalDescriptor';
import loadContractAddress from '../utilities/contract-address-loader';
import { TRANSACTION_TYPE } from '../graphql/resolvers/user-descriptor-resolvers';
import dotenv from 'dotenv';

dotenv.config();

/**
 * This class's purpose is to be an abstraction for interacting with the Blockchain, and in particular,
 * the GlobalDescriptor Smart Contract. This class implements methods that are in the smart contract and executes
 * it on behalf of the invoker of this class. The actual smart contract can be found in ./contracts/GlobalDescriptor.sol
 *
 * We want to create a class like this for every smart contract.
 */
export class GlobalDescriptorService {
	/**
	 * GLOBAL_DESCRIPTOR_ABI_PATH is the path to the JSON that has information about the SmartContract that
	 * web3js can read. This allows Web3JS to add methods to a contract object that we can invoke from JavaScript.
	 */
	private static readonly GLOBAL_DESCRIPTOR_ABI_PATH =
		'build/contracts/GlobalDescriptor.json';

	private static BNToNumber(val: BN): number {
		return parseFloat((val as unknown) as string);
	}
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
	private readonly contract: GlobalDescriptor;

	private readonly DECIMAL_OFFSET: number = Math.pow(10, 4);

	/**
	 * Initializes the Web3 client that connects to the blockchain and creates the contract object.
	 */
	constructor(
		web3Client = new Web3(process.env.BLOCKCHAIN_URL),
		contract?: GlobalDescriptor
	) {
		this.web3Client = web3Client;
		this.contract =
			contract == undefined
				? (new this.web3Client.eth.Contract(
						this.getContractAbi(),
						loadContractAddress('GlobalDescriptor')
				  ) as GlobalDescriptor)
				: contract;
	}

	/**
	 * Abstraction for GlobalDescriptor (smart contract) method, insertValue(unit: string, value: number)
	 * See ./contracts/GlobalDescriptor.sol for the actual contract method
	 * @param accountId ID of the account sending the request (Local blockchain autogenerates 10 accounts to use)
	 * @param value Data needed to enter itno blockchain
	 * @param gas Optional paramter, defaults to 5,000,000. Need gas to perform any sort of operation.
	 */
	public insertValue(
		accountId: string,
		value: {
			unit: string;
			value: number;
			latitude?: number;
			longitude?: number;
		},
		gas = 5_000_000
	): Promise<string> {
		return new Promise((resolve, reject) => {
			if (value.latitude == null || value.longitude == null) {
				value.latitude = 999;
				value.longitude = 999;
			}
			const transaction = this.contract.methods.insertValue(
				value.unit,
				Math.floor(value.value * this.DECIMAL_OFFSET),
				Math.floor(value.longitude * this.DECIMAL_OFFSET),
				Math.floor(value.latitude * this.DECIMAL_OFFSET)
			);
			const txOptions: Tx = {
				from: accountId,
				gas
			};
			transaction
				.send(txOptions)
				.on('transactionHash', txHash => resolve(txHash))
				.on('error', err => reject(err.message));
		});
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

	public insertValueAsync(
		accountId: string,
		value: {
			unit: string;
			value: number;
			latitude?: number;
			longitude?: number;
		},
		subscriptionCallback: (
			transactionHash: string,
			transactionType: TRANSACTION_TYPE,
			message: string
		) => void,
		gas = 5_000_000
	) {
		return new Promise((resolve, reject) => {
			if (value.latitude == null || value.longitude == null) {
				value.latitude = 999;
				value.longitude = 999;
			}
			const transaction = this.contract.methods.insertValue(
				value.unit,
				Math.floor(value.value * this.DECIMAL_OFFSET),
				Math.floor(value.longitude * this.DECIMAL_OFFSET),
				Math.floor(value.latitude * this.DECIMAL_OFFSET)
			);
			const txOptions: Tx = {
				from: accountId,
				gas
			};
			transaction
				.send(txOptions)
				.on('transactionHash', rec => {
					resolve(rec);
				})
				.on('receipt', rec => {
					subscriptionCallback(
						rec.transactionHash,
						TRANSACTION_TYPE.RECIEPT,
						rec.blockHash
					);
				})
				.on('confirmation', (conf, rec) => {
					subscriptionCallback(
						rec.transactionHash,
						TRANSACTION_TYPE.CONFIRMATION,
						conf.toString(10)
					);
				})
				.on('error', err => {
					reject(err.message);
				});
		});
	}

	/**
	 * This allows Web3JS to add methods to a contract object that we can invoke for our using the
	 * JSON ABI (Application Binary Interface). The JSON ABI has the contract methods that can be
	 * invoked with input paramters/types, and output paramters/types.
	 */
	private getContractAbi(): any[] {
		const rawJson = fs.readFileSync(
			GlobalDescriptorService.GLOBAL_DESCRIPTOR_ABI_PATH
		);
		return JSON.parse(rawJson.toString()).abi;
	}
}

export interface IDescriptor {
	unit: string;
	value: number;
	longitude: number;
	latitude: number;
	unixTimestamp: number;
}
