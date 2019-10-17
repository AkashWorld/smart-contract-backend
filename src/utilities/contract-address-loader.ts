import fs from 'fs';

/**
 * Loads contract address that was migrated by truffle
 * @param contractName Base name of contract (UserDescriptors instead of UserDescripts.sol)
 */
export default function loadContractAddress(contractName: string): string {
	const rawJson = fs.readFileSync(`./build/contracts/${contractName}.json`);
	const contractAddresses: any = JSON.parse(rawJson.toString());
	if (contractAddresses.contractName !== contractName) {
		console.error('Could not find Truffle ABI of ' + contractName);
		return '';
	}
	if (contractAddresses.networks == undefined) {
		console.error(
			'Could not find networks in Truffle ABI of ' + contractName
		);
		return '';
	}
	for (const key of Object.keys(contractAddresses.networks)) {
		return contractAddresses.networks[key].address;
	}
	console.error('Could not find address');
	return '';
}
