// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

contract IImpactManager {
    struct Milestone {
        string name;
        string description;
        // Weight and compliance should be normal numbers without scalars like 10% = 10
        uint256 weight;
        uint256 compliance;
    }

    struct Project {
        uint256 id;
        string name;
        string description;
        uint256 lifetime;
        uint256 starttime;
        uint256 target;
        uint256 collected;
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
