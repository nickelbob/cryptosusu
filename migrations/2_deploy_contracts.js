var Susu = artifacts.require("Susu");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Susu, {
    from: accounts[0],
    value: 1000000000000000,
  });
};
