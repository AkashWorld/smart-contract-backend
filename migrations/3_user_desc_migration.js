const Descriptor = artifacts.require("UserDescriptors");

module.exports = function(deployer) {
  deployer.deploy(Descriptor);
};
