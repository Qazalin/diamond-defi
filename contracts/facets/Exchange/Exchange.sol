// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "../ERC20/ERC20.sol";

contract Exchange is ERC20 {
    address public HOTMAddress;

    constructor(address _HOTMToken) {
        require(
            _HOTMToken != address(0),
            "Invalid token address, cannot except null"
        );
        HOTMAddress = _HOTMToken;
    }

    /**
     * @dev Gets the ETH reserve of the pool
     */
    function getEthReserve() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Gets the token reserve of the pool
     */
    function getTokenReserve() public view returns (uint256) {
        return balanceOf(address(this));
    }
}
