// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Test {
  function balanceOf() public pure returns (uint[2] memory) {
    uint a = 1;
    uint b = 1;
    return [a, b];
  }
}
