// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "../libraries/LibDiamond.sol";

contract AccessControl {
    modifier onlyOwner() {
        require(
            msg.sender == LibDiamond.getDiamondStorage().contractOwner ||
                msg.sender == address(this),
            "Only the diamond owner is allowed"
        );
        _;
    }
}
