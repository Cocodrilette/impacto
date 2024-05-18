// SPDX-License-Identifier: NO LICENSE
pragma solidity 0.8.20;

import "../lib/forge-std/src/Test.sol";
import "../harness/Harness.sol";

contract ImpactManagerTest is Test {
    Harness public harness;

    address public user1 = address(1);
    address public user2 = address(2);
    address public user3 = address(3);
    address public user4 = address(4);
    address public user5 = address(5);

    function setup() public {
        ImpactManager im = new ImpactManager();
        harness = new Harness(im);
    }
}
