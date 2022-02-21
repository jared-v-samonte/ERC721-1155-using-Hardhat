require('dotenv').config();
require("@nomiclabs/hardhat-waffle");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.9",
  networks: {
    hardhat: {
    },
      goerli: {
        url: 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY,
        accounts: ['0x' + process.env.PRIVATE_KEY],
        gasPrice: 8000000000, // default is 'auto' which breaks chains without the london hardfork 
      },
      mainnet: {
        url: 'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY,
        accounts: ['0x' + process.env.PRIVATE_KEY],
        gasPrice: 8000000000, // default is 'auto' which breaks chains without the london hardfork 
      }
    },
    paths: {
      sources: "./src/contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./src/artifacts"
    },
};
