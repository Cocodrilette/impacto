// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

import "../lib/forge-std/src/Test.sol";
import "../src/ImpactManager.sol";

contract ImpactManagerTest is Test {
    ImpactManager im;

    address public owner = address(69);
    address public user1 = address(1);
    address public user2 = address(2);

    function setUp() public {
        vm.prank(owner);
        im = new ImpactManager();
    }

    function test_donate() public {
        __mint__(user1, 100);

        vm.prank(user1);
        im.donate(100);

        uint256 donation = im.donations(user1);
        assertEq(donation, 100);
    }

    function test_propuse() public {
        IImpactManager.CreateProjectDto memory dto = IImpactManager
            .CreateProjectDto({
                name: "Project 1",
                description: "Description",
                lifetime: 100,
                target: 100,
                owner: user1
            });

        im.propose(dto);

        IImpactManager.Project memory project = im.getProjectById(0);
        IImpactManager.Milestone[] memory milestones = im
            .getMilestonesByProjectId(0);

        assertEq(project.id, 0);
        assertEq(milestones.length, 3);
    }

    function test_approveProject() public {
        IImpactManager.CreateProjectDto memory dto = IImpactManager
            .CreateProjectDto({
                name: "Project 1",
                description: "Description",
                lifetime: 100,
                target: 100,
                owner: user1
            });

        im.propose(dto);

        uint256 PROJECT_ID = 0;

        vm.prank(owner);
        im.approveProject(PROJECT_ID);

        IImpactManager.Project memory project = im.getProjectById(PROJECT_ID);
        IImpactManager.Milestone[] memory milestones = im
            .getMilestonesByProjectId(PROJECT_ID);

        assertEq(project.approved, true);
        assertEq(project.currentMilestone, 1);
        assertEq(project.starttime, block.timestamp);
        assertEq(milestones[0].compliance, 100);
    }

    function test_approveMilestone() public {
        IImpactManager.CreateProjectDto memory dto = IImpactManager
            .CreateProjectDto({
                name: "Project 1",
                description: "Description",
                lifetime: 100,
                target: 100,
                owner: user1
            });

        im.propose(dto);

        uint256 PROJECT_ID = 0;

        vm.prank(owner);
        im.approveProject(PROJECT_ID);

        vm.prank(owner);
        im.approveMilestone(PROJECT_ID, 100);

        IImpactManager.Project memory project = im.getProjectById(PROJECT_ID);
        IImpactManager.Milestone[] memory milestones = im
            .getMilestonesByProjectId(PROJECT_ID);

        assertEq(project.currentMilestone, 2);
        assertEq(milestones[1].compliance, 100);
    }

    function test_getAllocation() public {
        IImpactManager.CreateProjectDto memory dto = IImpactManager
            .CreateProjectDto({
                name: "Project 1",
                description: "Description",
                lifetime: block.timestamp + 1 days * 30 * 6,
                target: 100 ether,
                owner: user1
            });

        im.propose(dto);

        uint256 PROJECT_ID = 0;

        vm.prank(owner);
        im.approveProject(PROJECT_ID);

        vm.prank(owner);
        im.approveMilestone(PROJECT_ID, 100);
        

        vm.warp(block.timestamp + 1 days * 30 * 1);
        uint256 allocation = im.getAllocation(PROJECT_ID, 1);
        assert(allocation == 5e18);
        vm.warp(block.timestamp + 1 days * 30 * 1);
        allocation = im.getAllocation(PROJECT_ID, 1);
        assert(allocation == 10e18);

    }

    function __mint__(address to, uint256 amount) public {
        vm.prank(owner);
        im.mint(to, amount);
    }
}
