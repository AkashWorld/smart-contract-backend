import { GlobalDescriptorService } from './services/global-descriptor-service';
import loadEtheriumAccountId from './utilities/account-address-loader';
import cache from 'memory-cache';
import {
	GLOBAL_CACHE_KEY,
	CACHE_AMOUNT
} from './graphql/resolvers/global-descriptor-resolvers';

async function retrieveGlobalValues(count = CACHE_AMOUNT) {
	const accId = await loadEtheriumAccountId();
	const globalDescriptorService = new GlobalDescriptorService();
	const units = await globalDescriptorService.getAllAvailableUnitsForGlobal(
		accId
	);
	units.forEach(async element => {
		console.log(`Retrieving ${element}s`);
		const arr = await globalDescriptorService.getAllValuesRecordedForUnit(
			accId,
			element
		);
		const key = GLOBAL_CACHE_KEY + element;
		cache.put(key, arr);
		console.log(arr);
		console.log(
			'Completed pre-fetching of ' + element + ' of size: ' + arr.length
		);
	});
}

export function populateCache() {
	retrieveGlobalValues();
}
