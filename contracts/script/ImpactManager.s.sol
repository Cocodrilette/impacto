// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import "../src/ImpactManager.sol";

contract ImpactManagerScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ImpactManager im = new ImpactManager();
        im; // silence compiler warning

        vm.stopBroadcast();
    }
}
