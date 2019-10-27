import {loginDataInput} from '../../services/login/loginpost'
import * as express from 'express';
import {Router,Response,Request,NextFunction} from 'express';
import * as bodyparser from 'body-parser';
import * as httpserver from 'http';
//import Web3 from 'web3';
const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const resolver = {
  Query: {
    login:(_:any,args:{unsigned_address:string},context:any) => {
      //var signedAddress = web3.eth.sign("Authorization",args.unsigned_address).then()
      var signedAddress = loginDataInput(args.unsigned_address);
      return{
        signed_address: signedAddress
      };
    }
  }
};

export default resolver;
