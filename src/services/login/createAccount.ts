import * as bodyparser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import * as httpserver from 'http';
const Web3 = require('web3');
// imports to get private key to give
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const wallet = require('ethereumjs-wallet');
const { StringDecoder } = require('string_decoder');
const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

export async function createNewAccount(privateKey: String) {
	// this section generates the account
	const newAccountAddress = await web3.eth.personal.importRawKey(
		privateKey,
		'password'
	);
	const accounts = await web3.eth.getAccounts();
	const newAccountIndex = accounts.length - 1;
	const newAccount = accounts[newAccountIndex];

	// puts ether into new accounts
	const val: String = web3.utils.toWei('10'); // for now putting 10 ethers in new accounts
	web3.eth.sendTransaction({ from: accounts[0], to: newAccount, value: val });

	return newAccountAddress;
}

/** The above accounts are created as locked account. This means whenever want to deploy a contract
  * with them we need to unlock them. To unlock use the snippet of code below:
		let acc_unlock = address of the account that needs to be unlocked;
		web3.eth.personal.unlockAccount(acc_unlock, 'password', 1000);
	*/

// below code will be erased later, kept for now just in case:

// This section will be to give new user their key to get the account
// use mnemoinc phrase in ganache gui being run; this one below is from my device, and has to be changed if being run
// on another device.
// let mnemonic = "cousin cross pill arm illness apart nation snow track property rebuild hawk";
// let seed:String = await bip39.mnemonicToSeed(mnemonic);
// let hdk = hdkey.fromMasterSeed(seed);
// let node = hdk.derivePath(`m/44'/60'/0'/0/${new_account_index}`); //currently set to one but should be a variable that increments
//

// let toBeReturned:String = node.getWallet().getPrivateKeyString(); //the private key
