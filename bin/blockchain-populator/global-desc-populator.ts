import Web3 from 'web3';
import accountLoader from '../../src/utilities/account-address-loader';
import { UserDescriptorService } from '../../src/services/user-descriptor-service';
import { GlobalDescriptorService } from '../../src/services/global-descriptor-service';

const web3 = new Web3('http://localhost:7545');
let rutgersLatLong = { latitude: 40.501304, longitude: -74.447367 };

function randomSign(): number {
	if (Math.random() < 0.5) return -1;
	return 1;
}

const userDescriptorService = new UserDescriptorService();
const globalDescriptorService = new GlobalDescriptorService();

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
		await userDescriptorService.insertValue(accountId, value);
		await globalDescriptorService.insertValue(accountId, value);
		console.log(accountId + ': ' + JSON.stringify(value) + ' : ' + i);
		await delayBlockTimestamp();
	}
}

async function main() {
	for (let i = 0; i < 10; ++i) {
		const offset = Math.random() * 160;
		const accountId = await accountLoader(undefined, i);
		populateContractWithData(
			accountId,
			100,
			'lb',
			100 + offset,
			() => Math.random() * 0.5
		);
	}
	for (let i = 0; i < 10; ++i) {
		const offset = Math.random() * 60;
		const accountId = await accountLoader(undefined, i);
		populateContractWithData(
			accountId,
			100,
			'bpm',
			40 + offset,
			() => Math.random() * 0.5
		);
	}
	for (let i = 0; i < 10; ++i) {
		const offset = Math.random() * 40;
		const accountId = await accountLoader(undefined, i);
		populateContractWithData(
			accountId,
			5,
			'inch',
			60 + offset,
			() => Math.random() * 0.5
		);
	}
	console.log('Finished!');
}

main();
