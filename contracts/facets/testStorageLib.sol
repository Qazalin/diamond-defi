// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct TestStorage {
    uint256 a;
}
library TestStorageLib {

    bytes32 constant TEST_STORAGE_KEY = keccak256("Test.storage");

    function getTestStorage()
        internal
        pure
        returns (TestStorage storage t)
    {
        // Assembly only reads from local memory
        bytes32 position = TEST_STORAGE_KEY;
        assembly {
            t.slot := position
        }
    }
}
