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
            // Compliance should be 100 as default
            compliance: 100
        });
        milestones[1] = Milestone({
            name: "Medicion de impacto",
            description: "Se establecen los indicadores de impacto y el proyecto ha demostrado avances en su cumplimiento.",
            weight: 20,
            compliance: 100
        });
        milestones[2] = Milestone({
            name: "Impacto social final",
            description: "El proyecto ha sido completado y se han medido los indicadores de impacto. El proyecto cumplio con los objetivos planteados.",
            weight: 70,
            compliance: 100
        });

        return milestones;
    }
    
    function _getLinearReputationBasedAllocation(uint256 n, uint256 _projectId) internal view returns (uint256) {
        if(n == 0) return 0;
        Project storage project = projectById[projectId];
        Milestones[] storage milestones = milestonesByProjectId[projectId];
        Milestone storage milestone = milestones[n - 1];
        uint256 T1 = (project.target * milestone.weight) / 100;
        if(n == 1) return T1;
        uint256 _reputationIndex = 0;
        for (uint256 i = 0; i < n - 1; i++) {
            _reputationIndex += milestones[i].weight * milestones[i].compliance;
        }
        return T1 + (_reputationIndex  * (project.target - T1)) / 100;
    }

    function getAllocation(uint256 _projectId, uint256 n) public view returns (uint256){
        Project storage project = projectById[projectId];
        uint256 I = milestonesByProjectId[projectId].length
        uint256 t = block.timestamp - project.starttime;
        uint256 Pk = project.lifetime / I * (n-1);
        uint256 Pn = project.lifetime / I * n;
       return _getLinearReputationBasedAllocation(n - 1, _projectId) + ((t-Pk) / Pn) * (_getLinearReputationBasedAllocation(n, _projectId) - _getLinearReputationBasedAllocation(n - 1, _projectId));
    }
}
