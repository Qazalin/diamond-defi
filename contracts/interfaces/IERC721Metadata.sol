// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IERC721.sol";

/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */
interface IERC721Metadata is IERC721 {

    /**
     *  @dev Emitted when the content identifyer changes
     */
    event MetadataURIChanged(string indexed baseURI);
    /**
     * @dev Returns the token collection name.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the token collection symbol.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */

    function tokenURI(uint256 tokenId) external view returns (string memory);

    function _baseURI() external view returns (string memory);

    function _setCID(string memory _cid) external;
}
