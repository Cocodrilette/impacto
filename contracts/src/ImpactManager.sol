// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

import "./IImpactManager.sol";
import "./Access/Ownable.sol";
import "./token/ERC20.sol";
import "../lib/forge-std/src/console2.sol";

contract ImpactManager is IImpactManager, Ownable, ERC20 {
    mapping(address => uint256) public donations;
    mapping(uint256 => Project) private projectById;
    mapping(uint256 => Milestone[]) public milestonesByProjectId;
    Project[] private projects;

    constructor() ERC20("Impact Token", "IMP", 18) {
        // This allows to transfer the fund to the project owner
        allowance[address(this)][address(this)] = type(uint256).max;
    }

    function donate(uint256 amount) public payable {
        if (amount == 0) revert("Debes donar algo");

        transfer(address(this), amount);
        donations[msg.sender] += amount;

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
            owner: createProjectDto.owner,
            approved: false,
            currentMilestone: 0,
            imageUrl: createProjectDto.imageUrl
        });

        Milestone[] memory milestones = _defaultMilestones();

        projects.push(project);
        projectById[project.id] = project;
        milestonesByProjectId[project.id].push(milestones[0]);
        milestonesByProjectId[project.id].push(milestones[1]);
        milestonesByProjectId[project.id].push(milestones[2]);

        emit ProjectProposed(project.id);
    }

    function approveProject(uint256 projectId) public onlyOwner {
        Project storage project = projectById[projectId];
        project.approved = true;
        project.starttime = block.timestamp;

        _approveMilestone(projectId, 100);
        emit ProjectApproved(projectId);
    }

    function approveMilestone(
        uint256 projectId,
        uint256 compliance
    ) public onlyOwner {// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

import "./IImpactManager.sol";
import "./Access/Ownable.sol";
import "./token/ERC20.sol";
import "../lib/forge-std/src/console2.sol";

contract ImpactManager is IImpactManager, Ownable, ERC20 {
    mapping(address => uint256) public donations;
    mapping(uint256 => Project) private projectById;
    mapping(uint256 => Milestone[]) public milestonesByProjectId;
    Project[] private projects;

    constructor() ERC20("Impact Token", "IMP", 18) {
        // This allows to transfer the fund to the project owner
        allowance[address(this)][address(this)] = type(uint256).max;
    }

    function donate(uint256 amount) public payable {
        if (amount == 0) revert("Debes donar algo");

        transfer(address(this), amount);
        donations[msg.sender] += amount;

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
            owner: createProjectDto.owner,
            approved: false,
            currentMilestone: 0,
            imageUrl: createProjectDto.imageUrl
        });

        Milestone[] memory milestones = _defaultMilestones();

        projects.push(project);
        projectById[project.id] = project;
        milestonesByProjectId[project.id].push(milestones[0]);
        milestonesByProjectId[project.id].push(milestones[1]);
        milestonesByProjectId[project.id].push(milestones[2]);

        emit ProjectProposed(project.id);
    }

    function approveProject(uint256 projectId) public onlyOwner {
        Project storage project = projectById[projectId];
        project.approved = true;
        project.starttime = block.timestamp;

        _approveMilestone(projectId, 100);
        emit ProjectApproved(projectId);
    }

    function approveMilestone(
        uint256 projectId,
        uint256 compliance
    ) public onlyOwner {
        _approveMilestone(projectId, compliance);
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function getProjectById(
        uint256 projectId
    ) public view returns (Project memory) {
        return projectById[projectId];
    }

    function getMilestonesByProjectId(
        uint256 projectId
    ) public view returns (Milestone[] memory) {
        return milestonesByProjectId[projectId];
    }

    function getMilestoneByProjectId(
        uint256 projectId,
        uint256 milestoneId
    ) public view returns (Milestone memory) {
        return milestonesByProjectId[projectId][milestoneId];
    }

    function withdrawAllocation(uint256 projectId, uint256 amount) public {
        Project storage project = projectById[projectId];
        require(project.approved, "The project is not approved yet");
        require(
            project.owner == msg.sender,
            "You are not the owner of the project"
        );
        uint256 allocation = getAllocation(projectId, project.currentMilestone);
        require(
            amount <= (allocation - project.collected),
            "The amount is higher than the allocation"
        );

        project.collected += amount;
        transferFrom(address(this), project.owner, amount);
    }

    function getAllocation(
        uint256 _projectId,
        uint256 n
    ) public view returns (uint256) {
        if (n == 0) return 0;
        Project storage project = projectById[_projectId];

        uint256 I = milestonesByProjectId[_projectId].length;
        uint256 t = (block.timestamp - project.starttime);
        uint256 Pk = ((project.lifetime / I) * (n - 1));
        uint256 Pn = ((project.lifetime / I) * n) - Pk;
        uint256 SCALAR = 1e18;
        uint256 numerator = (t - Pk) * SCALAR;
        uint256 denominator = Pn;

        uint256 scaledValue = numerator / denominator;
        return
            _getLinearReputationBasedAllocation(n - 1, _projectId) +
            (scaledValue *
                (_getLinearReputationBasedAllocation(n, _projectId) -
                    _getLinearReputationBasedAllocation(n - 1, _projectId))) /
            SCALAR;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _defaultMilestones() private pure returns (Milestone[] memory) {
        Milestone[] memory milestones = new Milestone[](3);
        milestones[0] = Milestone({
            name: "Validacion inicial",
            description: "El proyecto demuestra ser viable y las personas involucradas tienen la capacidad de llevarlo a cabo.",
            weight: 10,
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

    function _approveMilestone(uint256 projectId, uint256 compliance) internal {
        require(
            compliance >= 0 && compliance <= 100,
            "Compliance must be between 0 and 100"
        );
        Project storage project = projectById[projectId];
        console2.log("Current milestone ", project.currentMilestone);
        Milestone storage milestone = milestonesByProjectId[projectId][
            project.currentMilestone
        ];

        project.currentMilestone += 1;
        milestone.compliance = compliance;

        emit MilestoneApproved(projectId, compliance);
    }

    function _getLinearReputationBasedAllocation(
        uint256 n,
        uint256 _projectId
    ) internal view returns (uint256) {
        if (n == 0) return 0;

        Project storage project = projectById[_projectId];
        Milestone[] storage milestones = milestonesByProjectId[_projectId];
        uint256 T1 = (project.target * milestones[0].weight) / 100;
        if (n == 1) return T1;

        uint256 _reputationIndex = 0;

        for (uint256 i = 0; i <= n - 1; i++) {
            _reputationIndex += milestones[i].weight * milestones[i].compliance;
        }
        return T1 + ((_reputationIndex / 100) * (project.target - T1)) / 100;
    }
}

        _approveMilestone(projectId, compliance);
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function getProjectById(
        uint256 projectId
    ) public view returns (Project memory) {
        return projectById[projectId];
    }

    function getMilestonesByProjectId(
        uint256 projectId
    ) public view returns (Milestone[] memory) {
        return milestonesByProjectId[projectId];
    }

    function getMilestoneByProjectId(
        uint256 projectId,
        uint256 milestoneId
    ) public view returns (Milestone memory) {
        return milestonesByProjectId[projectId][milestoneId];
    }

    function withdrawAllocation(uint256 projectId, uint256 amount) public {
        Project storage project = projectById[projectId];
        require(project.approved, "The project is not approved yet");
        require(
            project.owner == msg.sender,
            "You are not the owner of the project"
        );
        uint256 allocation = getAllocation(projectId, project.currentMilestone);
        require(
            amount <= (allocation - project.collected),
            "The amount is higher than the allocation"
        );

        project.collected += amount;
        transferFrom(address(this), project.owner, amount);
    }

    function getAllocation(
        uint256 _projectId,
        uint256 n
    ) public view returns (uint256) {
        if (n == 0) return 0;
        Project storage project = projectById[_projectId];

        uint256 I = milestonesByProjectId[_projectId].length;
        uint256 t = (block.timestamp - project.starttime);
        uint256 Pk = ((project.lifetime / I) * (n - 1));
        uint256 Pn = ((project.lifetime / I) * n) - Pk;
        uint256 SCALAR = 1e18;
        uint256 numerator = (t - Pk) * SCALAR;
        uint256 denominator = Pn;

        uint256 scaledValue = numerator / denominator;
        return
            _getLinearReputationBasedAllocation(n - 1, _projectId) +
            (scaledValue *
                (_getLinearReputationBasedAllocation(n, _projectId) -
                    _getLinearReputationBasedAllocation(n - 1, _projectId))) /
            SCALAR;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _defaultMilestones() private pure returns (Milestone[] memory) {
        Milestone[] memory milestones = new Milestone[](3);
        milestones[0] = Milestone({
            name: "Validacion inicial",
            description: "El proyecto demuestra ser viable y las personas involucradas tienen la capacidad de llevarlo a cabo.",
            weight: 10,
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

    function _approveMilestone(uint256 projectId, uint256 compliance) internal {
        require(
            compliance >= 0 && compliance <= 100,
            "Compliance must be between 0 and 100"
        );
        Project storage project = projectById[projectId];
        console2.log("Current milestone ", project.currentMilestone);
        Milestone storage milestone = milestonesByProjectId[projectId][
            project.currentMilestone
        ];

        project.currentMilestone += 1;
        milestone.compliance = compliance;

        emit MilestoneApproved(projectId, compliance);
    }

    function _getLinearReputationBasedAllocation(
        uint256 n,
        uint256 _projectId
    ) internal view returns (uint256) {
        if (n == 0) return 0;

        Project storage project = projectById[_projectId];
        Milestone[] storage milestones = milestonesByProjectId[_projectId];
        uint256 T1 = (project.target * milestones[0].weight) / 100;
        if (n == 1) return T1;

        uint256 _reputationIndex = 0;

        for (uint256 i = 0; i <= n - 1; i++) {
            _reputationIndex += milestones[i].weight * milestones[i].compliance;
        }
        return T1 + ((_reputationIndex / 100) * (project.target - T1)) / 100;
    }
}
