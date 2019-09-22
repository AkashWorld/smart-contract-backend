const Descriptor = artifacts.require("Descriptor");

module.exports = function(deployer) {
  deployer.deploy(Descriptor);
};
