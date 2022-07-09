const { task } = require('hardhat/config');

// custom hardhat task
task('block-number', 'Prints the current block number').setAction(
  // JavaScript Error Function
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log('currentBlockNumber:' + blockNumber);
  }
);
