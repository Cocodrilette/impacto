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
        uint256 id;
        string name;
        string description;
        uint256 lifetime;
        uint256 starttime;
        uint256 target;
        uint256 collected;
        uint256 reputation;
        address payable owner;
        bool approved;
    }

    struct CreateProjectDto {
        string name;
        string description;
        uint256 lifetime;
        uint256 target;
        address owner;
    }

    event Donated(address indexed donor, uint256 amount);
}
