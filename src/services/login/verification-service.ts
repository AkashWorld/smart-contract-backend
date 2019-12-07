import Web3 from 'web3';
import dotenv from 'dotenv';
const Web3EthPersonal = require('web3-eth-personal');
dotenv.config();
const web3personal = new Web3EthPersonal(process.env.BLOCKCHAIN_URL);

/** function will accept the signed message from user and retrieve
 * the address associated with that address. This is done through
 * web3 functions ecrecover. As long as the address is part of the
 * current blockchain node then the verification will be successful.
 */
export async function verify(signedAddress: string) {
	const web3 = new Web3(process.env.BLOCKCHAIN_URL);

	try {
		let address: string = web3.eth.accounts.recover('Auth', signedAddress);

		/**
		 * Sanity checking this because its over network
		 */
		if (
			typeof address != 'string' ||
			address == null ||
			address.length == 0
		) {
			console.error('Retrieved address is invalid');
			return null;
		}

		/**Check to see if recieved account is part of the node*/
		const existingAccounts = await web3personal.getAccounts();
		if (!existingAccounts.find((val: string) => val == address)) {
			console.error('Could not verify account exists in blockchain');
			return null;
		}

		return address;
	} catch (error) {
		console.error(error);
		return null;
	}
}
