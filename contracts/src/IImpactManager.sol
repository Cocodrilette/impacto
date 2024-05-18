// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

contract IImpactManager {
    struct Milestone {
        string name;
        string description;
        uint256 weight;
        bool completed;
    }

    struct Project {
        string name;
        string description;
        uint256 lifetime;
        uint256 starttime;
        uint256 target;
        uint256 collected;
        address payable owner;
        Milestone[] milestones;
        bool approved;
    }

    event Donated(address indexed donor, uint256 amount);
}
