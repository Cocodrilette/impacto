// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

import "../src/ImpactManager.sol";

contract Harness {
    ImpactManager public impactManager;

    constructor(ImpactManager im) {
        impactManager = im;
    }

    function donate(uint256 amount) public {}

    function proposeProject(
        IImpactManager.CreateProjectDto memory project
    ) public {}

    function approveProject(uint256 projectId) public {}

    function approveMilestone(uint256 projectId, uint256 compliance) public {}
}
