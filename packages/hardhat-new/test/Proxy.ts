import {
  time,
  loadFixture,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import hre from 'hardhat';
import * as ethers from 'ethers';
import { setTimeout } from 'timers/promises';

describe('Proxy Contract Tests with viem', function () {
  async function deployContractsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Logic = await hre.ethers.getContractFactory('Logic');
    const logic = await Logic.deploy();
    const logicAddress = await logic.getAddress();

    const Proxy = await hre.ethers.getContractFactory('Proxy2');
    const proxy = await Proxy.deploy(logicAddress);
    const proxyAddress = await proxy.getAddress();

    return { proxy, proxyAddress, logic, logicAddress, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('', async function () {
      const { proxyAddress, logicAddress } = await loadFixture(
        deployContractsFixture,
      );
      console.log('proxy contract address: ', proxyAddress);
      console.log('logic contract address: ', logicAddress);
    });
  });

  describe('Create Transaction', function () {
    it('', async function () {
      const { proxy, proxyAddress, logic, logicAddress, otherAccount } =
        await loadFixture(deployContractsFixture);

      const proxyAsLogic = new ethers.Contract(
        proxyAddress, // Proxy contract address
        logic.interface, // Logic's ABI (not Proxy's)
        otherAccount,
      );
      await proxyAsLogic.setValue('42');

      const proxyValue = await proxyAsLogic.getValue();
      console.log(`Value in Proxy's storage (should be 42): ${proxyValue}`);
      expect(await proxyAsLogic.getValue()).to.equal(42);

      const logicValue = await logic.getValue();
      console.log(`Value in Logic's storage (should be 0): ${logicValue}`);
      expect(logicValue).to.equal(0);
    });
  });

  // it('A', async function () {
  //   await t();
  // });

  async function t() {
    // const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    await loadFixture(deployContractsFixture);

    // // Create viem clients
    // const publicClient = await hre.viem.getPublicClient({
    //   chain: hardhat,
    //   transport: http(),
    // });

    // const [a, secondWalletClient] = await hre.viem.getWalletClients({
    //   chain: hardhat,
    //   transport: http(),
    // });
    // console.log(a);

    // console.log(secondWalletClient);

    // const contract = await hre.viem.deployContract('Proxy', [
    //   'arg1',
    //   50,
    //   'arg3',
    // ]);
    // console.log(contract);
  }

  // const walletClient = createWalletClient({
  //   chain: hardhat,
  //   transport: http(),
  // });

  // before(async () => {
  //   const accounts = await walletClient.getAddresses();
  //   owner = accounts[0];
  //   otherAccount = accounts[1];

  //   // Deploy Logic contract
  //   const logicDeployment = await buildModule('LogicModule', (m) => {
  //     const logic = m.contract('Logic');
  //     return { logic };
  //   }).deploy();
  //   logicAddress = logicDeployment.logic.address;

  //   // Deploy Proxy contract, passing logic contract address
  //   const proxyDeployment = await buildModule('ProxyModule', (m) => {
  //     const proxy = m.contract('Proxy', [logicAddress]);
  //     return { proxy };
  //   }).deploy();
  //   proxyAddress = proxyDeployment.proxy.address;
  // });

  // it('Should delegate calls from Proxy to Logic', async () => {
  //   // Create Logic contract instance at Proxy's address
  //   const proxyLogic = getContract({
  //     address: proxyAddress,
  //     abi: [
  //       {
  //         inputs: [
  //           { internalType: 'uint256', name: '_value', type: 'uint256' },
  //         ],
  //         name: 'setValue',
  //         outputs: [],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [],
  //         name: 'getValue',
  //         outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //     ],
  //     publicClient,
  //     walletClient,
  //   });

  //   // Call setValue via Proxy (which should store value in Proxy storage)
  //   const tx = await walletClient.writeContract({
  //     address: proxyAddress,
  //     abi: proxyLogic.abi,
  //     functionName: 'setValue',
  //     args: [42],
  //     account: owner,
  //   });

  //   await publicClient.waitForTransactionReceipt({ hash: tx });

  //   // Read value from Proxy (should be stored in Proxy storage)
  //   const value = await publicClient.readContract({
  //     address: proxyAddress,
  //     abi: proxyLogic.abi,
  //     functionName: 'getValue',
  //   });

  //   expect(value).to.equal(42n);
  // });

  // it('Should retain storage in Proxy', async () => {
  //   // Set value through Proxy
  //   await walletClient.writeContract({
  //     address: proxyAddress,
  //     abi: [
  //       {
  //         inputs: [
  //           { internalType: 'uint256', name: '_value', type: 'uint256' },
  //         ],
  //         name: 'setValue',
  //         outputs: [],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //     ],
  //     functionName: 'setValue',
  //     args: [99],
  //     account: owner,
  //   });

  //   // Get value from Proxy (should store data in Proxy's storage)
  //   const storedValue = await publicClient.readContract({
  //     address: proxyAddress,
  //     abi: [
  //       {
  //         inputs: [],
  //         name: 'getValue',
  //         outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //     ],
  //     functionName: 'getValue',
  //   });

  //   expect(storedValue).to.equal(99n);

  //   // Check Logic contract (should still be 0, proving storage is in Proxy)
  //   const logicValue = await publicClient.readContract({
  //     address: logicAddress,
  //     abi: [
  //       {
  //         inputs: [],
  //         name: 'getValue',
  //         outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //     ],
  //     functionName: 'getValue',
  //   });

  //   expect(logicValue).to.equal(0n);
  // });

  // it('Should accept Ether via receive()', async () => {
  //   const amount = parseEther('1');

  //   // Send Ether directly to Proxy
  //   const tx = await walletClient.sendTransaction({
  //     account: owner,
  //     to: proxyAddress,
  //     value: amount,
  //   });

  //   await publicClient.waitForTransactionReceipt({ hash: tx });

  //   // Check Proxy's balance
  //   const balance = await publicClient.getBalance({
  //     address: proxyAddress,
  //   });

  //   expect(balance).to.equal(amount);
  // });

  // it('Should forward Ether via delegatecall', async () => {
  //   const amount = parseEther('0.5');

  //   // Send Ether through Proxy with no data (should trigger receive function)
  //   const tx = await walletClient.sendTransaction({
  //     account: owner,
  //     to: proxyAddress,
  //     value: amount,
  //     data: '0x',
  //   });

  //   await publicClient.waitForTransactionReceipt({ hash: tx });

  //   // Check Proxy's balance
  //   const balance = await publicClient.getBalance({
  //     address: proxyAddress,
  //   });

  //   expect(balance).to.equal(parseEther('1.5'));
  // });
});
