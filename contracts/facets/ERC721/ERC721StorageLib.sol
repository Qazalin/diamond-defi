// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library ERC721StorageLib {
    struct ERC721Storage {
        // Token name
        string _name;
        // Token symbol
        string _symbol;
        // Mapping from token ID to owner address
        mapping(uint256 => address) _owners;
        // Mapping owner address to token count
        mapping(address => uint256) _balances;
        // Mapping from token ID to approved address
        mapping(uint256 => address) _tokenApprovals;
        // Mapping from owner to operator approvals
        mapping(address => mapping(address => bool)) _operatorApprovals;
    }
    bytes32 constant ERC721_STORAGE_KEY = keccak256("Tokens.ERC721.storage");

    function getERC721Storage()
        internal
        pure
        returns (ERC721Storage storage e721)
    {
        // Assembly only reads from local memory
        bytes32 position = ERC721_STORAGE_KEY;
        assembly {
            e721.slot := position
        }
    }
}
