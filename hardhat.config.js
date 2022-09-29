/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",

  paths : {
    sources: './chain/contracts',
    cache: './chain/cache',
    artifacts: './chain/artifacts',
    scripts: './chain/scripts',
    tests: './chain/test'
  }
};