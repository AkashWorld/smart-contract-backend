import Web3 from 'web3';
import accountLoader from '../../src/utilities/account-address-loader';
import getContractAddress from '../../src/utilities/contract-address-loader';
import { UserDescriptorService } from '../../src/services/user-descriptor-service';

const web3 = new Web3('http://localhost:7545');
let rutgersLatLong = { latitude: 40.501304, longitude: -74.447367 };
let weight = 180;

function randomSign(): number {
	if (Math.random() < 0.5) return -1;
	return 1;
}

async function delayBlockTimestamp() {
	web3.currentProvider.send(
		{
			jsonrpc: '2.0',
			method: 'evm_increaseTime',
			params: [Math.floor(86400 * Math.random())],
			id: new Date().getTime()
		},
		() => {}
	);
}

async function populateContractWithData(
	contractService: UserDescriptorService,
	accountId: string,
	count = 1000
) {
	for (let i = 0; i < count; ++i) {
		const latLongRand = Math.random() * 0.05;
		const weightRand = Math.random() * 5;
		rutgersLatLong.latitude += randomSign() * latLongRand;
		rutgersLatLong.longitude += randomSign() * latLongRand;
		weight += randomSign() * weightRand;
		const value = {
			unit: 'lb',
			value: weight,
			latitude: rutgersLatLong.latitude,
			longitude: rutgersLatLong.longitude
		};
		await contractService.insertValue(accountId, value);
		console.log(JSON.stringify(value) + ' : ' + i);
		await delayBlockTimestamp();
	}
}

async function main() {
	const accountId = await accountLoader(undefined, 1);
	const userDescriptor = new UserDescriptorService();

	await populateContractWithData(userDescriptor, accountId);
	console.log('Finished!');
}

main();
