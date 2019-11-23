import * as bodyparser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import * as httpserver from 'http';
const Web3 = require('web3');

/** function will accept the signed message from user and retrieve
 * the address associated with that address. This is done through
 * web3 functions ecrecover. As long as the address is part of the
 * current blockchain node then the verification will be successful.
 */
export async function verify(signed_address: String) {
	const web3 = new Web3(
		new Web3.providers.HttpProvider('http://localhost:7545')
	);

	let address: string = '';

	try {
		address = web3.eth.accounts.recover('Auth', signed_address);
	} catch {
		return null;
	}
	return address;
}
