import { expect } from 'chai';
import { UserDescriptorService } from '../../../src/services/user-descriptor-service';
import sinon from 'sinon';
import BN from 'bn.js';

describe('Tests User Descriptor contract service', () => {
	it('insertValue calls contract insertValue method', () => {
		const mockWeb3 = sinon.mock({} as any);
		const transactionStub = {
			send: sinon.stub()
		};
		const contractStub = {
			methods: {
				insertValue: sinon.stub().returns(transactionStub)
			}
		};
		const userDescriptor = new UserDescriptorService(
			mockWeb3 as any,
			contractStub as any
		);

		userDescriptor.insertValue('testId', {
			unit: 'testUnit',
			value: 10,
			latitude: 10,
			longitude: 10
		});

		expect(contractStub.methods.insertValue.calledOnce).true;
		expect(transactionStub.send.calledOnce).true;
	});
	it('getLatestValueForUnit calls contract getLatestUnitValue method', async () => {
		const mockWeb3 = sinon.mock({} as any);
		const callStub = {
			call: sinon.stub().resolves(new BN('100000'))
		};
		const contractStub = {
			methods: {
				getLatestUnitValue: sinon.stub().returns(callStub)
			}
		};
		const userDescriptor = new UserDescriptorService(
			mockWeb3 as any,
			contractStub as any
		);

		const latestVal = await userDescriptor.getLatestValueForUnit(
			'testId',
			'lb'
		);

		expect(latestVal).to.be.equal(10);
		expect(contractStub.methods.getLatestUnitValue.calledOnce).true;
		expect(callStub.call.calledOnce).true;
	});
	it('getAllValuesRecordedForUnit calls contract getAllUnitValues method', async () => {
		const mockWeb3 = sinon.mock({} as any);
		const expectedResponse = [
			{
				unitValue: new BN(10000),
				longitude: new BN(10000),
				latitude: new BN(10000),
				unixTimestamp: new BN(10000)
			},
			{
				unitValue: new BN(20000),
				longitude: new BN(20000),
				latitude: new BN(20000),
				unixTimestamp: new BN(20000)
			},
			{
				unitValue: new BN(30000),
				longitude: new BN(30000),
				latitude: new BN(30000),
				unixTimestamp: new BN(30000)
			}
		];
		const callStub = {
			call: sinon.stub().resolves(expectedResponse)
		};
		const contractStub = {
			methods: {
				getAllUnitValues: sinon.stub().returns(callStub)
			}
		};
		const userDescriptor = new UserDescriptorService(
			mockWeb3 as any,
			contractStub as any
		);

		const allVals = await userDescriptor.getAllValuesRecordedForUnit(
			'testId',
			'lb'
		);

		expect(allVals.length).to.equal(3);
	});
	it('should getPaginatedValuesRecordedForUnit calls contract getPaginatedUnitValues method', async () => {
		const mockWeb3 = sinon.mock({} as any);
		const expectedResponse = [
			{
				unitValue: new BN(20000),
				longitude: new BN(20000),
				latitude: new BN(20000),
				unixTimestamp: new BN(20000)
			},
			{
				unitValue: new BN(30000),
				longitude: new BN(30000),
				latitude: new BN(30000),
				unixTimestamp: new BN(30000)
			}
		];
		const callStub = {
			call: sinon.stub().resolves(expectedResponse)
		};
		const contractStub = {
			methods: {
				getPaginatedUnitValues: sinon.stub().returns(callStub)
			}
		};
		const userDescriptor = new UserDescriptorService(
			mockWeb3 as any,
			contractStub as any
		);

		const allVals = await userDescriptor.getPaginatedValuesRecordedForUnit(
			'testId',
			'lb',
			0,
			2
		);

		expect(allVals.length).to.equal(2);
	});
	it('should getAllUnitsForUser calls contract getAllAvailableUnits method', async () => {
		const mockWeb3 = sinon.mock({} as any);
		const expectedResponse = ['lb', 'cm', 'inch'];
		const callStub = {
			call: sinon.stub().resolves(expectedResponse)
		};
		const contractStub = {
			methods: {
				getAllAvailableUnits: sinon.stub().returns(callStub)
			}
		};
		const userDescriptor = new UserDescriptorService(
			mockWeb3 as any,
			contractStub as any
		);

		const allVals = await userDescriptor.getAllAvailableUnitsForUser(
			'testId'
		);

		expect(allVals.length).to.equal(3);
	});
});
