import Web3 from 'web3';
import accountLoader from '../../src/utilities/account-address-loader';
import { UserDescriptorService } from '../../src/services/user-descriptor-service';

const web3 = new Web3('http://localhost:7545');
let rutgersLatLong = { latitude: 40.501304, longitude: -74.447367 };

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
	count: number,
	unit: string,
	startAmount: number,
	unitGenerator: () => number
) {
	for (let i = 0; i < count; ++i) {
		const latLongRand = Math.random() * 0.05;
		rutgersLatLong.latitude += randomSign() * latLongRand;
		rutgersLatLong.longitude += randomSign() * latLongRand;
		startAmount += unitGenerator();
		const value = {
			unit,
			value: startAmount,
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

	await populateContractWithData(
		userDescriptor,
		accountId,
		250,
		'lb',
		150,
		() => randomSign() * Math.random() * 3
	);

	await populateContractWithData(
		userDescriptor,
		accountId,
		250,
		'inch',
		65,
		() => Math.random() * 0.05
	);
	console.log('Finished!');
}

main();
