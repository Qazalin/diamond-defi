// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

library ERC20StorageLib {
    struct ERC20Storage {
        string name;
        string symbol;
        uint256 totalSupply;
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
    }
    bytes32 constant ERC20_STORAGE_KEY = keccak256("Tokens.ERC20.storage");

    function getERC20Storage()
        internal
        pure
        returns (ERC20Storage storage e20)
    {
        // Assembly only reads from local memory
        bytes32 position = ERC20_STORAGE_KEY;
        assembly {
            e20.slot := position
        }
    }
}
