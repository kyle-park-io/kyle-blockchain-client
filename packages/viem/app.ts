import { Abi, createPublicClient, createWalletClient, Hex, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, polygonAmoy } from 'viem/chains';
import { readJsonFile } from './utils/json';

const example = async () => {
  const transport = 'https://mainnet.infura.io/v3/<apiKey>';

  const client = createPublicClient({
    chain: mainnet,
    transport: http(transport),
  });
  // console.log(client);

  try {
    const blockNumber = await client.getBlockNumber();
    console.log(blockNumber);
  } catch (err) {
    console.error(err);
  }

  try {
    const account = privateKeyToAccount('0x...');

    const walletClient = createWalletClient({
      account,
      chain: mainnet,
      transport: http(transport),
    });
    console.log(walletClient.account);
  } catch (err) {
    console.error(err);
  }

  // deploy
  try {
    const transport = 'https://mainnet.infura.io/v3/<apiKey>';

    type ABIType = { abi: object[]; bytecode: string };
    const abiData = readJsonFile<ABIType>('./artifacts/exERC20.json');
    if (abiData === null) {
      throw new Error('ABI is null. Cannot proceed with contract deployment.');
    }

    const account = privateKeyToAccount('0x...');
    const walletClient = createWalletClient({
      account,
      chain: polygonAmoy,
      transport: http(transport),
    });

    const [address] = await walletClient.getAddresses();
    const deployTx = await walletClient.deployContract({
      abi: abiData.abi as Abi,
      // account: address,
      bytecode: abiData.bytecode as Hex,
    });
    console.log(deployTx);
  } catch (err) {
    console.error(err);
  }
};
void example();
