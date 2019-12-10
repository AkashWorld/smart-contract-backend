import { GlobalDescriptorService } from './services/global-descriptor-service';
import loadEtheriumAccountId from './utilities/account-address-loader';
import cache from 'memory-cache';
import { GLOBAL_CACHE_KEY } from './graphql/resolvers/global-descriptor-resolvers';

async function retrieveGlobalValues(count = 1000) {
	const accId = await loadEtheriumAccountId();
	const globalDescriptorService = new GlobalDescriptorService();
	const units = await globalDescriptorService.getAllAvailableUnitsForGlobal(
		accId
	);
	units.forEach(async element => {
		const arr = await globalDescriptorService.getPaginatedValuesRecordedForUnit(
			accId,
			element,
			0,
			1000
		);
		const key = GLOBAL_CACHE_KEY + element;
		cache.put(key, arr);
		console.log('Completed pre-fetching of ' + element);
	});
}

export function populateCache() {
	retrieveGlobalValues();
}
