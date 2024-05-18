// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

import "./IImpactManager.sol";
import "./Access/Ownable.sol";

contract ImpactManager is IImpactManager, Ownable {
    mapping(address => uint256) public donations;
    mapping(uint256 => Project) public projectById;
    mapping(uint256 => Milestone[]) public milestonesByProjectId;
    Project[] private projects;

    function donate() public payable {
        if (msg.value == 0) revert("Debes donar algo");
        donations[msg.sender] += msg.value;

        emit Donated(msg.sender, msg.value);
    }

    function propose(CreateProjectDto calldata createProjectDto) public {
        Project memory project = Project({
            id: projects.length,
            name: createProjectDto.name,
            description: createProjectDto.description,
            lifetime: createProjectDto.lifetime,
            starttime: 0, // this value is set when the project is approved
            target: createProjectDto.target,
            collected: 0,
            reputation: 1,
            owner: payable(createProjectDto.owner),
            approved: false
        });

        Milestone[] memory milestones = _defaultMilestones();

        projects.push(project);
        projectById[project.id] = project;
        milestonesByProjectId[project.id].push(milestones[0]);
        milestonesByProjectId[project.id].push(milestones[1]);
        milestonesByProjectId[project.id].push(milestones[2]);
    }

    function approve(uint256 projectId) public onlyOwner {
        Project storage project = projectById[projectId];
        project.approved = true;
        project.starttime = block.timestamp;
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function _defaultMilestones() private pure returns (Milestone[] memory) {
        Milestone[] memory milestones = new Milestone[](3);
        milestones[0] = Milestone({
            name: "Validacion inicial",
            description: "El proyecto demuestra ser viable y las personas involucradas tienen la capacidad de llevarlo a cabo.",
            weight: 10,
            completed: false
        });
        milestones[1] = Milestone({
            name: "Medicion de impacto",
            description: "Se establecen los indicadores de impacto y el proyecto ha demostrado avances en su cumplimiento.",
            weight: 20,
            completed: false
        });
        milestones[2] = Milestone({
            name: "Impacto social final",
            description: "El proyecto ha sido completado y se han medido los indicadores de impacto. El proyecto cumplio con los objetivos planteados.",
            weight: 70,
            completed: false
        });

        return milestones;
    }
}
