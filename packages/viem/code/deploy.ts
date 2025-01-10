import { Abi, createPublicClient, createWalletClient, Hex, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, polygonAmoy } from 'viem/chains';
import { readJsonFile, saveJsonToFile } from '../utils/json';

export const deployContract = async (
  contractName: string,
  params: unknown[],
) => {
  try {
    const network = polygonAmoy;
    const transport = 'https://mainnet.infura.io/v3/<apiKey>';

    type ABIType = { abi: object[]; bytecode: string };
    const abiData = readJsonFile<ABIType>('./artifacts/exERC20.json');
    if (abiData === null) {
      throw new Error('ABI is null. Cannot proceed with contract deployment.');
    }

    // client
    const publicClient = createPublicClient({
      chain: polygonAmoy,
      transport: http(transport),
    });
    const account = privateKeyToAccount('0x...');
    const walletClient = createWalletClient({
      account,
      chain: polygonAmoy,
      transport: http(transport),
    });

    const [address] = await walletClient.getAddresses();
    // const deployTx = await walletClient.deployContract({
    //   abi: abiData.abi as Abi,
    //   account: address,
    //   bytecode: abiData.bytecode as Hex,
    //   gas: BigInt('900000'),
    // });
    const deployTx =
      '0x5e5ecb7f8a472062e12523db42a8501b049ee523700f72e74d455c54b500853e';

    const receipt = await publicClient.getTransactionReceipt({
      hash: deployTx,
    });
    const contractAddress = receipt.contractAddress as string;
    const block = await publicClient.getBlock({
      blockNumber: receipt.blockNumber,
    });

    type Contract = {
      network: string;
      native: string;
      explorer: string;
      address: string;
      deployer: string;
      blockNumber: string;
      blockHash: string;
      transactionHash: string;
      timestamp: string;
    };
    const data: Contract = {
      network: network.name,
      native: network.nativeCurrency.symbol,
      explorer: network.blockExplorers.default.url,
      address: contractAddress,
      deployer: address,
      blockNumber: block.number.toString(),
      blockHash: block.hash,
      transactionHash: deployTx,
      timestamp: block.timestamp.toString(),
    };

    saveJsonToFile(data, `./json/${receipt.contractAddress}.json`);
    return contractAddress;
  } catch (err) {
    console.error(err);
  }
};
// void deployContract();
