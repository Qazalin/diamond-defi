// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../../interfaces/IERC721Metadata.sol";

contract ERC721Contract is ERC721, IERC721Metadata {
    uint256 private tokenId = 0;
    uint256 public MAX_SUPPLY = 100;

    constructor(
        string memory _cid,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) ERC721Metadata(_cid) {}

    function mint() external {
        require(tokenId < MAX_SUPPLY, "All tokens have been minted");

        tokenId++;
        _safeMint(msg.sender, tokenId);
    }

    // Use WithIPFSMetaData implementation
    function _baseURI()
        internal
        view
        override(ERC721, ERC721Metadata)
        returns (string memory)
    {
        return ERC721Metadata._baseURI();
    }

    // Use ERC721Metadata implementation
    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721Metadata)
        returns (string memory)
    {
        return ERC721Metadata.tokenURI(_tokenId);
    }
}
