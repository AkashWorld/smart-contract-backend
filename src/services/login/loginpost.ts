/*
  * This module recieves the etherium address from the caller and
  * returns a web3 signed string, this string will serve as the verification
  * key for authorization puroposes.

  * web3.sign has an advantage of requiring to be linked with environment linked
  * ganache to work, since only address web3 has access to will be signed.
  * Address not within in the block will be entered in or rejected based on
  * circumstances, will work on this part later.
*/

<<<<<<< HEAD
import * as bodyparser from 'body-parser';
import * as express from 'express';
import {NextFunction,Request,Response,Router} from 'express';
=======
import * as express from 'express';
import {Router,Response,Request,NextFunction} from 'express';
import * as bodyparser from 'body-parser';
>>>>>>> e58ccbe151bc454b65dc7a87c3704e094b3f6782
import * as httpserver from 'http';
const Web3 = require('web3');


// Sets up the web3 from provider which is either Ganache at port 7545 or from
// any other environment (ex:Metamask)
<<<<<<< HEAD
let web3:any;
=======
var web3:any;
>>>>>>> e58ccbe151bc454b65dc7a87c3704e094b3f6782
if(typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider);
}
else{
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
}

<<<<<<< HEAD
// uses the web3 sign function to create signed token
export async function loginDataInput(address:string){

  let signed_address = await web3.eth.sign("Authorize",address,(err:any,result:any)=>{
    if(err) { return "Error"; }
=======
//uses the web3 sign function to create signed token
export async function loginDataInput(address:string){

  var signed_address = await web3.eth.sign("Authorize",address,(err:any,result:any)=>{
    if(err) return "Error";
>>>>>>> e58ccbe151bc454b65dc7a87c3704e094b3f6782
    return result;
  });


  return signed_address;
}
