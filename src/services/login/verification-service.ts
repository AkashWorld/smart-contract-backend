const Web3 = require('web3');
import dotenv from 'dotenv';
dotenv.config();

/** function will accept the signed message from user and retrieve
 * the address associated with that address. This is done through
 * web3 functions ecrecover. As long as the address is part of the
 * current blockchain node then the verification will be successful.
 */
export function verify(signedAddress: string) {
	const web3 = new Web3(process.env.BLOCKCHAIN_URL);

	try {
		const address: string = web3.eth.accounts.recover(
			'Auth',
			signedAddress
		);
		/**
		 * Sanity checking this because its over network
		 */
		if (
			typeof address != 'string' ||
			address == null ||
			address.length == 0
		) {
			return null;
		}
		return address;
	} catch (error) {
		console.error(error);
		return null;
	}
}
