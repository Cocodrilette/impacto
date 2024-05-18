// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

import "../lib/forge-std/src/Test.sol";
import "../src/ImpactManager.sol";

contract ImpactManagerTest is Test {
    ImpactManager im;

    address public user1 = address(1);
    address public user2 = address(2);
    address public user3 = address(3);
    address public user4 = address(4);
    address public user5 = address(5);

    function setUp() public {
        im = new ImpactManager();
    }

    function test_donate() public {
        im.mint(user1, 100);

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
        assertEq(project.id, 0);
    }
}
