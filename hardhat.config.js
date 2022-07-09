require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');
require('./tasks/block-number');
require('hardhat-gas-reporter');
require('solidity-coverage');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || 'http://localhost:8545';
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || '0x';
const ETHERS_SCAN_KEY = process.env.ETHERS_SCAN_KEY || '0x';
const COINMARKET_KEY = process.env.COINMARKET_KEY || '0x';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
      chainId: 4,
      // chainlist.org
    },
  },
  solidity: '0.8.7',
  etherscan: {
    apiKey: ETHERS_SCAN_KEY,
  },
  localhost: {
    url: 'http://127.0.0.1:8545/',
    chainId: 31337,
    accounts: [RINKEBY_PRIVATE_KEY],
  },
  gasReporter: {
    enabled: false,
    noColors: true,
    outputFile: 'gas-reporter.txt',
    currency: 'USD',
    coinmarketcap: COINMARKET_KEY,
  },
};
