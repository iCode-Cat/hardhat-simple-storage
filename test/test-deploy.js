const { ethers } = require('hardhat');
const { expect, assert } = require('chai');

describe('SimpleStorage', () => {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it('Should start with favorite number of 0', async () => {
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue, 0);
  });

  it('Should update the current value', async () => {
    const expectedValue = 7;
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue, expectedValue);
  });

  it('Should push a person into array', async () => {
    const favoriteNumber = 2;
    const name = 'JUJU';
    const pushUser = await simpleStorage.addPerson(name, favoriteNumber);
    await pushUser.wait(1);
    const people = await simpleStorage.people(0);
    // Log people array
    assert.equal(people.name, name);
  });
});
