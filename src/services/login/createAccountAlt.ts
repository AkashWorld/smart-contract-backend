import * as bodyparser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import * as httpserver from 'http';
const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

export async function createAcc(privateKey: String){
  let newAcc = await web3.eth.accounts.privateKeyToAccount(privateKey);
  let accounts = await web3.eth.getAccounts();
  console.log(accounts);
  let new_account_index = accounts.length - 1;
  let new_account = accounts[new_account_index];
  let wal = web3.eth.accounts.wallet;
  return new_account;
}
