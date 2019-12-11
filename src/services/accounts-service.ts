import Web3 = require('web3');
import dotenv = require('dotenv');
dotenv.config();

export class AccountsService {
	private readonly web3Client: Web3;

	/**
	 * Initializes the Web3 client that connects to the blockchain and creates the contract object.
	 */
	constructor(web3Client = new Web3(process.env.BLOCKCHAIN_URL)) {
		this.web3Client = web3Client;
	}

	async getEtheriumBalance(accountId: string): Promise<number> {
		const wei = await this.web3Client.eth.getBalance(accountId, 'latest');
		const ether = Web3.utils.fromWei(wei, 'ether');
		return parseFloat(ether);
	}
}
