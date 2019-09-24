import fs from 'fs';
import Web3 from 'web3';
// tslint:disable-next-line:no-submodule-imports
import { Tx } from 'web3/eth/types';
import { UserDescriptors } from '../../types/web3-contracts/UserDescriptors';

export class UserDescriptorService {
	private static readonly USER_DESCRIPTOR_ABI_PATH =
		'build/contracts/UserDescriptors.json';
	private readonly providerLink: string = 'http://localhost:8545';
	private readonly web3Client: Web3;
	private readonly contract: UserDescriptors;
	constructor(contractAddress: string, port: number) {
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
	 * Turn this to async
	 */
	private getContractAbi(): any[] {
		const rawJson = fs.readFileSync(
			UserDescriptorService.USER_DESCRIPTOR_ABI_PATH
		);
		return JSON.parse(rawJson.toString()).abi;
	}
}
