import { ethers } from 'ethers';
import FileReader from './utils/fs';
import fs from 'fs';

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

const privateKey =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

async function deploy(contractName: string, args: any[]): Promise<void> {
  try {
    const util = new FileReader();

    // wallet
    const wallet = new ethers.Wallet(privateKey, provider);
    const abi = await util.getAbi(contractName);
    const bytecode = await util.getBytecode(contractName);

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    // args
    const contract = await factory.deploy(...args);

    console.log(contract);
    console.log(`deployed to token`);
    // write json
    const save = {
      deployer: wallet.address,
      contract: contractName,
      contractAddress: contract.target,
    };
    const jsonString = JSON.stringify(save);
    await fs.promises.writeFile(
      `contracts/${contractName}.contract.json`,
      jsonString,
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

void deploy('Token', ['a', 'b', '100000']);
// void deploy('Caller', ['0x9Fb25CB67fcB9b6CF836DDEA446124bDf37791b9']);
// void deploy('DexCalc', []);
// void deploy('Factory', ['0xDf58Bcb38B2fC723AeEd111bE9324782015ada83']);
