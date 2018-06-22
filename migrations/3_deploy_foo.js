var Foo = artifacts.require("Foo");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Foo, {
    from: accounts[0],
    value: 1000000000000000,
  });
};
