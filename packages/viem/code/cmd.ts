import { deployContract } from './deploy';

const example = async () => {
  await deployContract('DexCalc', []);
  const factory = await deployContract('Factory', [
    '0xC126f0c68d5A75A86D98c0283fA424C8DFe78BD5',
  ]);
  const weth = await deployContract('WETH', []);
  await deployContract('Router', [factory, weth]);
};

void example();
