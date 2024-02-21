// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Caller {
  address immutable token;

  event Event(uint indexed i, address caller);

  constructor(address addr) {
    token = addr;
  }

  function Run() public {
    emit Event(1, msg.sender);
    IERC20(token).approve(msg.sender, 1000);
    emit Event(2, msg.sender);
  }
}
