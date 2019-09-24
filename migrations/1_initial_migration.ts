import { MigrationsContract } from '../types/truffle-contracts';

const Migrations = artifacts.require('Migrations');

module.exports = (deployer: { deploy: (arg: MigrationsContract) => void }) => {
	deployer.deploy(Migrations);
};

export {};
