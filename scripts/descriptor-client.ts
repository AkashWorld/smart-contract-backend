import fs from "fs";
import Web3 from "web3";

const DESCRIPTOR_CONTRACT_ADDRESS =
  "0x82a0A114d0e3f22b975A19427023E257E5412d61";

/**
 * Reference Docs: https://web3js.readthedocs.io/en/v1.2.1/web3-eth.html
 */
async function main() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );
  const accounts = await web3.eth.getAccounts();
  if (accounts.length === 0) {
    console.error("No accounts found!");
    return;
  }
  const myAccount = accounts[0];
  console.log(`Chosen account: ${myAccount}`);
  const accountBalance = await web3.eth.getBalance(myAccount);
  console.log(`accountBalance: ${accountBalance}`);
  const contractAbi = loadContractABI();
  const contractOptions = {
    from: myAccount
  };
  const weightContract = new web3.eth.Contract(
    contractAbi,
    DESCRIPTOR_CONTRACT_ADDRESS,
    contractOptions
  );
  const weightToInsert = Math.floor(Math.random() * 1000);
  console.log("Inserting weight " + weightToInsert);
  const transactionObj = weightContract.methods.insertWeight(weightToInsert);
  transactionObj
    .send({ from: myAccount, gas: 5000000 })
    .on("transactionHash", hash => {
      console.log(`Hash: ${hash}`);
    })
    .on("receipt", receipt => {
      console.log(receipt);
      weightContract.methods
        .getLatestUserWeight()
        .call()
        .then(val => {
          console.log("getLatestUserWeight() -> " + val);
        });
    })
    .on("error", console.error);
}

function loadContractABI() {
  const rawData = fs.readFileSync("./build/contracts/Descriptor.json");
  const descriptorJson = JSON.parse(rawData.toString());
  return descriptorJson.abi;
}

main();
