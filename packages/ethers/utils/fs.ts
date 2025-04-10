import fs from 'fs';

export default class FileReader {
  cwd = process.cwd();
  public async getAbi(contractName: string): Promise<any[]> {
    const jsonInterface = JSON.parse(
      fs.readFileSync(`${this.cwd}/artifacts/${contractName}.json`, 'utf-8'),
    );
    const abi = jsonInterface.abi;
    return abi;
  }

  public async getBytecode(contractName: string): Promise<string> {
    const jsonInterface = JSON.parse(
      fs.readFileSync(`${this.cwd}/artifacts/${contractName}.json`, 'utf-8'),
    );
    const bytecode = jsonInterface.bytecode;
    return bytecode;
  }

  public async getContractAddress(contractName: string): Promise<string> {
    try {
      const contract = await fs.promises.readFile(
        `${this.cwd}/contracts/${contractName}.contract.json`,
        'utf8',
      );
      const parsedContract = JSON.parse(contract);
      const contractAddress = parsedContract.contractAddress;

      return await Promise.resolve(contractAddress.toString());
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
