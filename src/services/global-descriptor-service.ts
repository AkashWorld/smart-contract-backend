import BN from 'bn.js';
import fs from 'fs';
import Web3 from 'web3';
// tslint:disable-next-line:no-submodule-imports
import { Tx } from 'web3/eth/types';
import { GlobalDescriptor } from '../../types/web3-contracts/GlobalDescriptor';
import loadContractAddress from '../utilities/contract-address-loader';
import PromiEvent from 'web3/promiEvent';
import { TransactionReceipt } from 'web3/types';

export class GlobalDescriptorService {

	private static readonly GLOBAL_DESCRIPTOR_ABI_PATH =
		'build/contracts/GlobalDescriptor.json';

	private static BNToNumber(val: BN): number {
		return parseFloat((val as unknown) as string);
	}

	private readonly web3Client: Web3;

	private readonly contract: GlobalDescriptor;

	private readonly DECIMAL_OFFSET: number = Math.pow(10, 4);

	constructor(
		web3Client = new Web3('http://localhost:7545'),
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
	): PromiEvent<TransactionReceipt> {
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
		return (transaction.send(txOptions) as unknown) as PromiEvent<
			TransactionReceipt
		>;
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