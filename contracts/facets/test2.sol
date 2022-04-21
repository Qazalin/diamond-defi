// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "./testStorageLib.sol";

contract Test2 {
    function setA(uint256 _val) public {
        TestStorage storage s = TestStorageLib.getTestStorage();
        s.a = _val * 2;
    }

   function getA() public view returns (uint256) {
        return TestStorageLib.getTestStorage().a;
    }
}
