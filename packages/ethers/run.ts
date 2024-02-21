import { ethers } from 'ethers';
import FileReader from './utils/fs';

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

const privateKey =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

async function run(): Promise<void> {
  const util = new FileReader();

  // wallet
  const wallet = new ethers.Wallet(privateKey, provider);
  // const address = await util.getContractAddress('Caller');
  const address = await util.getContractAddress('Token');
  const abi = await util.getAbi('Token');

  // wallet
  const contract = new ethers.Contract(address, abi);

  const a = 'totalSupply';
  // const result = await contract.totalSupply();
  const result = await contract[a](...[]);
  console.log(result);
}

void run();
