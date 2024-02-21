import { ethers } from 'ethers';

const privateKey =
  '0x305aaf862f476b2fa336957c13debc85d2c4895a1a6da226131ddec95b58d696';

function test(): void {
  const wallet = new ethers.Wallet(privateKey);

  const sign = wallet.signMessage('hi');
  console.log(sign);
}

test();
