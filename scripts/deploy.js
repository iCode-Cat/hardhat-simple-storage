// imports
const { ethers } = require('hardhat');

// async main
async function main() {
  // Hardhat does know about compiled contracts.
  const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log('Deploying Contract...');

  // Deploying to hardhat's default network.
  const SimpleStorage = await simpleStorageFactory.deploy();

  await SimpleStorage.deployed();
  console.log('Contract deployed at:', SimpleStorage.address);
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
