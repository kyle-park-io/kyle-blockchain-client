import { ethers } from 'ethers';
import FileReader from './utils/fs';

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

async function subscribe(): Promise<void> {
  const util = new FileReader();

  const address = await util.getContractAddress('Token');
  const abi = await util.getAbi('Token');

  const contract = new ethers.Contract(address, abi, provider);

  try {
    await contract.on('Approval', (a, b, c, d) => {
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(d);
    });
  } catch (error) {
    console.error('error: ', error);
  }
}

void subscribe();
