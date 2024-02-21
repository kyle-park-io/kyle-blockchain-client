import { ethers } from 'hardhat';
import fs from 'fs';

async function main(): Promise<void> {
  try {
    const Test = await ethers.getContractFactory('Test');
    const test = await Test.deploy();
    await test.waitForDeployment();
    const testAddress = await test.getAddress();
    const deployer = await ethers.getSigners();

    console.log(`deployed to ${testAddress}`);
    const result = {
      deployer: deployer[0].address,
      contract: 'test',
      contractAddress: testAddress,
    };
    const jsonString = JSON.stringify(result);

    await fs.promises.writeFile('config/Test.contract.json', jsonString);
  } catch (err) {
    console.error(err);
  }
}

void main();
