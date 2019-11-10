import * as truffleTypes from '../types/truffle-contracts';
import BigNumber from 'bignumber.js';

/**
 * User descriptors contract reference
 */
const GlobalDescriptor = artifacts.require('GlobalDescriptor');

function bigNumberToNumber(val: BigNumber): number {
	return parseInt((val as unknown) as string);
}

contract('GlobalDescriptor test', async accounts => {
    it.only('should return 0 when unit value does not exist', async () => {
	
		const contractInstance = await GlobalDescriptor.new();
      /* 
        console.log(contractInstance.address);
        assert(contractInstance.address !== '');

        
    */
    
   const returnedValue = await contractInstance.test('lb', {
    from: accounts[0]
    });
    assert.equal(
        returnedValue.toNumber(),
        0,
        'did not return 0 when units did not exist'
    );

	});
    







});