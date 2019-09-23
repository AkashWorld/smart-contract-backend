import fs from "fs";
import Web3 from "web3";
// tslint:disable-next-line:no-submodule-imports
import Contract from "web3/eth/contract";
import { Tx } from "web3/eth/types";
// tslint:disable-next-line:no-submodule-imports
import { Provider } from "web3/providers";
import { UserDescriptors } from "../types/web3-contracts/UserDescriptors";

export class UserDescriptorClient {
  private static readonly USER_DESCRIPTOR_ABI_PATH =
    "build/UserDescriptors.json";
  private static readonly PROVIDER_LINK: string = "http://localhost:7545";
  private readonly web3Client: Web3;
  private readonly contract: UserDescriptors;
  constructor(contractAddress: string) {
    const provider = new web3.providers.HttpProvider(
      UserDescriptorClient.PROVIDER_LINK
    );
    this.web3Client = new Web3(provider);
    this.contract = new web3.eth.Contract(
      this.getContractAbi(),
      contractAddress
    ) as UserDescriptors;
  }

  public async insertValue(
    accountId: string,
    unit: string,
    value: number,
    gas?: number
  ): Promise<void> {
    if (gas === undefined) {
      gas = 5_000_000;
    }
    const transaction = this.contract.methods.insertValue(unit, value);
    const txOptions: Tx = {
      from: accountId,
      gas
    };
    transaction
      .send(txOptions)
      .on("receipt", receipt => {
        console.log(`Transaction event available ${receipt.transactionHash}`);
      })
      .on("error", console.error);
  }

  public async getLatestValueForUnit(
    accountId: string,
    unit: string,
    gas?: number
  ) {
    if (gas === undefined) {
      gas = 5_000_000;
    }
    const txOptions: Tx = {
      from: accountId,
      gas
    };
    return this.contract.methods.getLatestUnitValue(unit).call(txOptions);
  }

  public async getAllValuesRecordedForUnit(
    accountId: string,
    unit: string,
    gas?: number
  ) {
    if (gas === undefined) {
      gas = 5_000_000;
    }
    const txOptions: Tx = {
      from: accountId,
      gas
    };
    return this.contract.methods.getAllUnitValues(unit).call(txOptions);
  }

  public async getAllAvailableUnitsForUser(accountId: string, gas?: number) {
    if (gas === undefined) {
      gas = 5_000_000;
    }
    const txOptions: Tx = {
      from: accountId,
      gas
    };
    return this.contract.methods.getAllAvailableUnits().call(txOptions);
  }

  public async getAccountAtIndex(index: number): Promise<string> {
    const accounts = await this.web3Client.eth.getAccounts();
    if (accounts.length >= index) {
      Promise.reject();
    }
    return accounts[index];
  }

  /**
   * Turn this to async
   */
  private getContractAbi(): any[] {
    const rawJson = fs.readFileSync(
      UserDescriptorClient.USER_DESCRIPTOR_ABI_PATH
    );
    return JSON.parse(rawJson.toString()).abi;
  }
}
