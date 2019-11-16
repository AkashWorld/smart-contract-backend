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
let web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));


export async function createNewAccount(){
	// this section generates the account
		await web3.eth.personal.newAccount('password');
		let accounts = await web3.eth.getAccounts();
		let new_account_index = accounts.length - 1;
		let new_account = accounts[new_account_index];
		let val:String = web3.utils.toWei("10"); // for now putting 10 ethers in new accounts
		//web3.eth.sendTransaction({from:accounts[0],to:new_account,value:val});

	//This section will be to give new user their key to get the account
		// use mnemoinc phrase in ganache gui being run; this one below is from my device, and has to be changed if being run
		//on another device.
  	let mnemonic = "cousin cross pill arm illness apart nation snow track property rebuild hawk";
		let seed:String = await bip39.mnemonicToSeed(mnemonic);
		let hdk = hdkey.fromMasterSeed(seed);
		let node = hdk.derivePath(`m/44'/60'/0'/0/${new_account_index}`); //currently set to one but should be a variable that increments
	//

	let toBeReturned:String = node.getWallet().getPrivateKeyString(); //the private key


	return toBeReturned;
}

/** The above accounts are created as locked account. This means whenever want to deploy a contract
  * with them we need to unlock them. To unlock use the snippet of code below:
		let acc_unlock = address of the account that needs to be unlocked;
		web3.eth.personal.unlockAccount(acc_unlock, 'password', 1000);
	*/
