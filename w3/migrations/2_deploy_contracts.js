// migrations/2_deploy_contracts.js
const PhraCoin = artifacts.require("PhraCoin");

module.exports = function (deployer) {
  deployer.deploy(PhraCoin, 1000000); // 1 million PHRA tokens
};  