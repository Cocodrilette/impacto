// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

import "./IImpactManager.sol";

contract ImpactManager is IImpactManager {
    mapping(address => uint256) donations;

    function donate() public payable {
        if (msg.value == 0) revert("Debes donar algo");
        donations[msg.sender] += msg.value;

        emit Donated(msg.sender, msg.value);
    }
}
