import Web3 from 'web3';
import dotenv from 'dotenv';
const Web3EthPersonal = require('web3-eth-personal');
const web3personal = new Web3EthPersonal(process.env.BLOCKCHAIN_URL);

dotenv.config();
const web3 = new Web3(process.env.BLOCKCHAIN_URL);

export async function createNewAccount(privateKey: String) {
	const accounts = await web3personal.getAccounts();
	if (!accounts) {
		console.error('Could not retrieve accounts');
		return null;
	}
	const originalNumberOfAccounts = accounts.length;

	if (privateKey.substring(0, 2) !== '0x') {
		privateKey = '0x' + privateKey;
	}

	/** given private key will import the account, duplicate accounts will not be
	 * created, so there will have to be check to see if same private key tries to
	 * register twice
	 */
	const newAccountAddress: string = await (web3.eth
		.personal as any).importRawKey(privateKey, 'password');
	if (!newAccountAddress) {
		console.error('Could not retrieve new account address');
		return null;
	}

	const updatedAccounts = await web3personal.getAccounts();
	let updatedNumberOfAccounts = updatedAccounts.length;

	/**checks to see if we have same number of accounts before and after import
	 * and returns null if yes, meaning no new account was added; if same account
	 * tries to register twice
	 */
	if (updatedNumberOfAccounts == originalNumberOfAccounts) return null;

	// puts ether into new accounts
	const val: string = web3.utils.toWei('10'); // for now putting 10 ethers in new accounts
	web3.eth.sendTransaction({
		from: updatedAccounts[0],
		to: newAccountAddress,
		value: val
	});

	return newAccountAddress;
}

/** The above accounts are created as locked account. This means whenever want to deploy a contract
  * with them we need to unlock them. To unlock use the snippet of code below:
		let acc_unlock = address of the account that needs to be unlocked;
		web3.eth.personal.unlockAccount(acc_unlock, 'password', 1000);
	*/
