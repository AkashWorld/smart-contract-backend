const Web3 = require('web3');
/**
 * Interface for the Context object that will be passed into GraphQL
 * After we do authentication, we can pass the accountId around via a
 * context object for each GraphQL query that is executed from the front-end.
 */
export interface IContext {
	getEtheriumAccountId: ()=>string;
}

export class Context implements IContext {
	private signedMessage: string;

	/**This constructor will recieve singed messages for any transactions
	 * and return the address which the message came from to be used as
	 * context variable in other scripts.
	 */
	constructor(signedMessage: string) {
		this.signedMessage = signedMessage;
	}

	public getEtheriumAccountId():string {
		return this.findAccount();
	}

  private findAccount(){
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:7545')
    );

    let etheriumAccountId: string = '';

    try {
      etheriumAccountId = web3.eth.accounts.recover(
        'Auth',
        this.signedMessage
      );
    } catch {
      return '';
    }
    return etheriumAccountId;
  }
}
