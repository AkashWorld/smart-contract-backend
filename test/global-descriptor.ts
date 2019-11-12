import * as truffleTypes from '../types/truffle-contracts';
import BigNumber from 'bignumber.js';

const GlobalDescriptor = artifacts.require('GlobalDescriptor');

function bigNumberToNumber(val: BigNumber): number {
	return parseInt((val as unknown) as string);
}

contract('GlobalDescriptor test', async accounts => {
	it('should return 0 when unit value does not exist', async () => {
		const contractInstance = await GlobalDescriptor.new();

		const returnedValue = await contractInstance.getLatestUnitValue('lb', {
			from: accounts[0]
		});
		assert.equal(
			returnedValue.toNumber(),
			0,
			'did not return 0 when units did not exist'
		);
	});
	it('should return a value when inserted a value', async () => {
		const contractInstance = await GlobalDescriptor.new();
		const expectedVal = 150;
		await contractInstance.insertValue('lb', expectedVal, 50, 50, {
			from: accounts[0]
		});

		const returnedValue = await contractInstance.getLatestUnitValue('lb', {
			from: accounts[0]
		});

		assert.equal(
			returnedValue.toNumber(),
			expectedVal,
			'did not return the latest recorded value from unit lb'
		);
	});
	it('should return the correct pair of values per unit', async () => {
		const contractInstance = await GlobalDescriptor.new();
		const expectedVal1 = { unit: 'lb', val: 150 };
		const expectedVal2 = { unit: 'inch', val: 12 };
		const expectedVal3 = { unit: 'g', val: 30 };
		await contractInstance.insertValue(
			expectedVal1.unit,
			expectedVal1.val,
			50,
			50,
			{
				from: accounts[0]
			}
		);
		await contractInstance.insertValue(
			expectedVal2.unit,
			expectedVal2.val,
			50,
			50,
			{
				from: accounts[0]
			}
		);
		await contractInstance.insertValue(
			expectedVal3.unit,
			expectedVal3.val,
			50,
			50,
			{
				from: accounts[0]
			}
		);

		const returnedVal1 = await contractInstance.getLatestUnitValue('lb', {
			from: accounts[0]
		});
		const returnedVal2 = await contractInstance.getLatestUnitValue('inch', {
			from: accounts[0]
		});
		const returnedVal3 = await contractInstance.getLatestUnitValue('g', {
			from: accounts[0]
		});

		assert.equal(
			returnedVal1.toNumber(),
			expectedVal1.val,
			'returned value is not the same as the input value, 150'
		);
		assert.equal(
			returnedVal2.toNumber(),
			expectedVal2.val,
			'returned value is not the same as the input value, 12'
		);
		assert.equal(
			returnedVal3.toNumber(),
			30,
			'returned value is not the same as the input value, 30'
		);
	});
	it('should return most recent values of multiple inserted values', async () => {
		const contractInstance = await GlobalDescriptor.new();
		const expectedVal = 150;
		const key = 'lb';
		await contractInstance.insertValue(key, 50, 50, 50, {
			from: accounts[0]
		});
		await contractInstance.insertValue(key, 140, 50, 50, {
			from: accounts[0]
		});
		await contractInstance.insertValue(key, 500, 50, 50, {
			from: accounts[0]
		});
		await contractInstance.insertValue(key, 150, 50, 50, {
			from: accounts[0]
		});

		const returnedValue = await contractInstance.getLatestUnitValue(key, {
			from: accounts[0]
		});

		assert.equal(
			returnedValue.toNumber(),
			expectedVal,
			'last inserted value is not returned value'
		);
	});
	it('should return an empty list if the unit does not exist', async () => {
		const contractInstance = await GlobalDescriptor.new();
		const returnedArray = await contractInstance.getAllUnitValues('lb', {
			from: accounts[0]
		});

		assert.equal(
			returnedArray.length,
			0,
			'array length is not 0, expected empty'
		);
	});
	it('should return a list full of values if values were inserted', async () => {
		const contractInstance = await GlobalDescriptor.new();
		const expectedValues = [23, 435, 22, 150, 700, 20, 13];
		const expectedLong = [10, 20, 30, 40, 50, 60, 70];
		const expectedLat = [100, 110, 90, 120, 80, 20, 5];
		const key = 'lb';
		for (let i = 0; i < expectedValues.length; ++i) {
			await contractInstance.insertValue(
				key,
				expectedValues[i],
				expectedLong[i],
				expectedLat[i],
				{
					from: accounts[0]
				}
			);
		}

		const returnedArray = await contractInstance.getAllUnitValues('lb', {
			from: accounts[0]
		});

		console.log(returnedArray);

		assert.equal(
			returnedArray.length,
			expectedValues.length,
			'array length does not match expected length'
		);
		for (let i = 0; i < returnedArray.length; ++i) {
			assert.equal(
				bigNumberToNumber(returnedArray[i].unitValue),
				expectedValues[i]
			);
			assert.equal(
				bigNumberToNumber(returnedArray[i].latitude),
				expectedLat[i]
			);
			assert.equal(
				bigNumberToNumber(returnedArray[i].longitude),
				expectedLong[i]
			);
		}
	});
	it('should return an empty list of units if units were not inserted', async () => {
		const contractInstance = await GlobalDescriptor.new();

		const returnedArray = await contractInstance.getAllAvailableUnits();

		assert.equal(returnedArray.length, 0, 'did not return empty array');
	});
	it('should return a list of units if units were inserted', async () => {
		const contractInstance = await GlobalDescriptor.new();
		await contractInstance.insertValue('lb', 150, 50, 50, {
			from: accounts[0]
		});
		await contractInstance.insertValue('cm', 150, 50, 50, {
			from: accounts[0]
		});
		await contractInstance.insertValue('miles', 150, 50, 50, {
			from: accounts[0]
		});

		const returnedArray = await contractInstance.getAllAvailableUnits();

		assert.equal(returnedArray.length, 3, 'did not returned 3 unit array');
		assert.equal(returnedArray[0], 'lb', 'incorrect unit');
		assert.equal(returnedArray[1], 'cm', 'incorrect unit');
		assert.equal(returnedArray[2], 'miles', 'incorrect unit');
	});
	it('should not return duplicate units if units were inserted', async () => {
		const contractInstance = await GlobalDescriptor.new();
		await contractInstance.insertValue('lb', 150, 50, 50, {
			from: accounts[0]
		});
		await contractInstance.insertValue('lb', 50, 50, 50, {
			from: accounts[0]
		});
		await contractInstance.insertValue('lb', 20, 50, 50, {
			from: accounts[0]
		});

		const returnedArray = await contractInstance.getAllAvailableUnits();

		assert.equal(returnedArray.length, 1, 'did not returned 1 unit array');
		assert.equal(returnedArray[0], 'lb');
	});
	it('should return the correct amount and starting index for paginated list', async () => {
		const contractInstance = await GlobalDescriptor.new();
		const unitValues: number[] = [];
		for (let i = 0; i < 50; ++i) {
			unitValues.push(Math.floor(Math.random() * 150));
		}

		for (let val of unitValues) {
			await contractInstance.insertValue('lb', val, 50, 50, {
				from: accounts[0]
			});
		}

		const returnedVals = await contractInstance.getPaginatedUnitValues(
			'lb',
			5,
			10,
			{
				from: accounts[0]
			}
		);

		let j = 0;
		for (let i = 35; i < 45; ++i) {
			assert.equal(
				bigNumberToNumber(returnedVals[j].unitValue),
				unitValues[i]
			);
			j += 1;
		}
	});
});
