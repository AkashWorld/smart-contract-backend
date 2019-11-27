import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();
const web3 = new Web3(process.env.BLOCKCHAIN_URL);

export async function createNewAccount(privateKey: String) {
	// this section generates the account

	if (privateKey.substring(0, 2) !== '0x') {
		privateKey = '0x' + privateKey;
	}

	/**
	 * TODO: TypeScript type definition says this function has no input but documentation says it does.
	 */
	const newAccountAddress: string = await (web3.eth
		.personal as any).importRawKey(privateKey, 'password');
	if (newAccountAddress === null) {
		return null;
	}

	const accounts = await web3.eth.getAccounts();
	const newAccount = accounts.pop();
	if (newAccount == null) {
		return null;
	}

	// puts ether into new accounts
	const val: string = web3.utils.toWei('10'); // for now putting 10 ethers in new accounts
	web3.eth.sendTransaction({
		from: accounts[0],
		to: newAccount,
		value: val
	});
	return newAccountAddress;
}

/** The above accounts are created as locked account. This means whenever want to deploy a contract
  * with them we need to unlock them. To unlock use the snippet of code below:
		let acc_unlock = address of the account that needs to be unlocked;
		web3.eth.personal.unlockAccount(acc_unlock, 'password', 1000);
	*/
