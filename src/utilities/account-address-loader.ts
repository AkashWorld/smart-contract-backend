import Web3 from 'web3';

export default async function loadEtheriumAccountID(
	blockchainAddress = 'http://localhost:7545',
	index = 0
): Promise<string> {
	const web3 = new Web3(blockchainAddress);
	return (await web3.eth.getAccounts())[index];
}
