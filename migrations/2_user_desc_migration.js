'use strict';
exports.__esModule = true;
var Descriptor = artifacts.require('UserDescriptors');
module.exports = function(deployer) {
	deployer.deploy(Descriptor);
};
