var Susu = artifacts.require("Susu");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(Susu);
};
