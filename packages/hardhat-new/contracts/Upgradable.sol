// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

contract Upgradable is Initializable {
  uint256 public x;

  function initialize(uint256 _x) public initializer {
    x = _x;
  }
}
