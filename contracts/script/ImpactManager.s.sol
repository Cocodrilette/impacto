// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import "../src/ImpactManager.sol";

contract ImpactManagerScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ImpactManager im = new ImpactManager();

        IImpactManager.CreateProjectDto memory p1 = IImpactManager
            .CreateProjectDto({
                name: "Reforestacion de arboles en Bogota",
                description: "Somos una DAO enfocada en reforestar los bosques de Bogota tras los incendios. Nos hemos desenvuelto principalmente en el area de ReFi y DeSci desde 2022",
                lifetime: 180 days,
                target: 13750 ether,
                owner: msg.sender,
                imageUrl: "https://vhqpfhyaynbpkhkwuuwo.supabase.co/storage/v1/object/public/impacto/trees.webp"
            });
        IImpactManager.CreateProjectDto memory p2 = IImpactManager
            .CreateProjectDto({
                name: "Re ubicacion de los hipopotamos en Colombia",
                description: "Somos un proyecto con el objetivo de reubicar los hipopotamos que habitan en el rio Magdalena",
                lifetime: 360 days,
                target: 22000 ether,
                owner: msg.sender,
                imageUrl: "https://vhqpfhyaynbpkhkwuuwo.supabase.co/storage/v1/object/public/impacto/hipos.webp"
            });
        IImpactManager.CreateProjectDto memory p3 = IImpactManager
            .CreateProjectDto({
                name: "Conservacion de truchas en el Huila",
                description: "Somos un proyecto de DeSci que se enfoca en la investigacion de parasitos en las truchas del Huila.",
                lifetime: 90 days,
                target: 7000 ether,
                owner: msg.sender,
                imageUrl: "https://vhqpfhyaynbpkhkwuuwo.supabase.co/storage/v1/object/public/impacto/truchas.webp"
            });

        im.propose(p1);
        im.propose(p2);
        im.propose(p3);

        vm.stopBroadcast();
    }
}
