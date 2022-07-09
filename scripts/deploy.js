// imports
const { ethers, run } = require('hardhat');

// async main
async function main() {
  // Hardhat does know about compiled contracts.
  const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log('Deploying Contract...');

  // Deploying to hardhat's default network.
  const SimpleStorage = await simpleStorageFactory.deploy();

  await SimpleStorage.deployed();
  console.log('Contract deployed at:', SimpleStorage.address);
  // When working with local network, etherscan verify not needed.

  // What happens after deploy the code?

  // chainId 4 === rinkeby

  // Wait 6 blocks to make sure the contract is mined.
  // await SimpleStorage.deployTransaction.wait(6);
  // Verify on etherscan
  // await verify(SimpleStorage.address, []);

  const currentValue = await SimpleStorage.retrieve();
  console.log('Current value:', currentValue);

  // Update the current value
  const transactionResponse = await SimpleStorage.store(7);
  // wait 1 block
  await transactionResponse.wait(1);
  // Get the new value
  const updatedValue = await SimpleStorage.retrieve();
  console.log('New value:', updatedValue);
}

// Verify on ethers scan
async function verify(contractAddress, args) {
  console.log('Verifying contract...');
  // Run allows us to run hardhat command
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('verify')) {
      console.log('Contract verified!');
    } else {
      console.log('Contract not verified!', e);
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
