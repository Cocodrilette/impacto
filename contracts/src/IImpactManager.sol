// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

contract IImpactManager {
    // Weight and compliance should be normal numbers without scalars like 10% = 10
    struct Milestone {
        string name;
        string description;
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
        uint256 currentMilestone;
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
    event ProjectProposed(uint256 indexed projectId);
    event ProjectApproved(uint256 indexed projectId);
    event MilestoneApproved(uint256 indexed projectId, uint256 compliance);
}
