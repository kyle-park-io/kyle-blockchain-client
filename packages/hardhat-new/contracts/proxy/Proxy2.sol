// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import 'hardhat/console.sol';

contract Proxy2 {
  // ✅ EIP-1967 표준 슬롯 사용
  bytes32 private constant LOGIC_SLOT = keccak256('proxy.logic.contract');

  constructor(address _logic) {
    _setLogic(_logic);
  }

  // ✅ Logic 주소를 안전한 EIP-1967 슬롯에 저장
  function _setLogic(address _logic) private {
    bytes32 slot = LOGIC_SLOT;
    assembly {
      sstore(slot, _logic)
    }
  }

  // ✅ Logic 주소를 안전한 EIP-1967 슬롯에서 가져오기
  function _getLogic() public view returns (address _logic) {
    bytes32 slot = LOGIC_SLOT;
    assembly {
      _logic := sload(slot)
    }
  }

  // ✅ This function allows the contract to receive Ether when sent directly without data
  receive() external payable {}

  fallback() external payable {
    address _logic = _getLogic();
    require(_logic != address(0), 'Logic contract not set');

    console.log(unicode'🔹 Proxy fallback() 실행됨 - logic 주소:', _logic);
    console.log(
      'msg.sender =',
      msg.sender,
      ', msg.data.length =',
      msg.data.length
    );

    assembly {
      let ptr := mload(0x40) // 메모리 공간 확보
      calldatacopy(ptr, 0, calldatasize()) // 입력 데이터 복사

      let result := delegatecall(gas(), _logic, ptr, calldatasize(), ptr, 0) // ✅ 수정: ptr을 출력 위치로 지정
      let size := returndatasize()

      returndatacopy(ptr, 0, size) // ✅ 반환 데이터 복사

      switch result
      case 0 {
        revert(ptr, size)
      } // ❌ 실패하면 revert
      default {
        return(ptr, size)
      } // ✅ 정상 실행되면 반환
    }
  }
}
