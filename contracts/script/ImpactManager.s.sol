// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import "../src/ImpactManager.sol";

contract ImpactManagerScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);

        ImpactManager im = new ImpactManager();

        im.mint(deployer, 1000000 ether);

        IImpactManager.CreateProjectDto memory p1 = IImpactManager
            .CreateProjectDto({
                name: "Reforestacion de arboles en Bogota",
                description: "Somos una DAO enfocada en reforestar los bosques de Bogota tras los incendios. Nos hemos desenvuelto principalmente en el area de ReFi y DeSci desde 2022",
                lifetime: 180 days,
                target: 13750 ether,
                owner: msg.sender,
                imageUrl: "https://vhqpfhyaynbpkhkwuuwo.supabase.co/storage/v1/object/public/impacto/trees.webp"
            });

        im.propose(p1);
        im.approveProject(0);
        im.approveMilestone(0, 50);

        vm.stopBroadcast();
    }
}
