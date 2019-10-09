/*
   This file will be used to setup the network, port, and etc.
   It will import the express app from index.ts and then use it for the
   website
*/

import express,{Request,Response,Next} from "express";
import {app} from "./index";


// Didn't put in the environment varaible stuff as I don't know about them yet

async function main(){
  const port = 8080;
  app.listen(port,function(){
    console.log(`Express server intialized on port ${port}`)
  });
}

main();
