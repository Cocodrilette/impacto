#!/bin/bash

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
  echo "Error: Please provide an argument."
  exit 1
fi

source .env

network="$1"

function deploy_local() {
    # set balance to 100eth
    cast rpc anvil_setBalance $PUBLIC_KEY 0x56BC75E2D63100000 --rpc-url http://localhost:8545
    forge script script/ImpactManager.s.sol:ImpactManagerScript --rpc-url http://localhost:8545 --broadcast
}

function deploy_testnet() {
    forge script script/ImpactManager.s.sol:ImpactManagerScript --rpc-url $AVALANCHE_RPC_URL --broadcast --verify -vvvv
}

case "$network" in "local")
    deploy_local
    ;;
  "testnet")
    deploy_testnet
    ;;
  *)
    echo "Error: Invalid network '$network'."
    exit 1
    ;;
esac

exit 0