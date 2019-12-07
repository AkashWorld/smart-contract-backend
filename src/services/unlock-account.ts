import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();
const web3 = new Web3(process.env.BLOCKCHAIN_URL);

export default function unlockAccount(accountAddress: string) {
	web3.eth.personal.unlockAccount(accountAddress, 'password', 100000000);
}
