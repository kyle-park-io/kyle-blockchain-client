// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import 'hardhat/console.sol';

contract Logic {
  uint256 public value; // ✅ 프록시 컨트랙트의 스토리지에 저장됨

  function setValue(uint256 _value) public {
    value = _value; // ✅ delegatecall을 통해 프록시의 스토리지에 저장
    console.log(unicode'🔹 setValue() 실행됨: 저장된 값 =', value);
  }

  function getValue() public view returns (uint256) {
    console.log(unicode'🔹 getValue() 실행됨: 반환할 값 =', value);
    return value; // ✅ delegatecall을 통해 프록시의 스토리지 값을 반환
  }
}
