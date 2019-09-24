import { UserDescriptorsContract } from '../types/truffle-contracts';

const Descriptor = artifacts.require('UserDescriptors');

module.exports = (deployer: {
	deploy: (arg: UserDescriptorsContract) => void;
}) => {
	deployer.deploy(Descriptor);
};
