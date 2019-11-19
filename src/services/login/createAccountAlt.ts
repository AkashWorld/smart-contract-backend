import * as bodyparser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import * as httpserver from 'http';
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

export async function createAcc(privateKey: String) {
	const newAcc = await web3.eth.accounts.privateKeyToAccount(privateKey);
	const accounts = await web3.eth.getAccounts();
	console.log(accounts);
	const new_account_index = accounts.length - 1;
	const new_account = accounts[new_account_index];
	const wal = web3.eth.accounts.wallet;
	return new_account;
}
