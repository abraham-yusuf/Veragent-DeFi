#!/usr/bin/env bash
# Deploy Veragent contracts to BSC Testnet or Mainnet
#
# Usage:
#   ./scripts/deploy-bsc.sh testnet
#   ./scripts/deploy-bsc.sh mainnet
#
# Prerequisites:
#   - contracts/.env with BSC_TESTNET_PRIVATE_KEY (or BSC_PRIVATE_KEY)
#   - tBNB on deployer for testnet (https://testnet.bnbchain.org/faucet-smart)
#   - npm install already run inside contracts/

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONTRACTS_DIR="${ROOT}/contracts"
NETWORK_ARG="${1:-testnet}"

case "$NETWORK_ARG" in
  testnet|bscTestnet)
    HH_NETWORK="bscTestnet"
    ;;
  mainnet|bsc)
    HH_NETWORK="bsc"
    echo "⚠️  Deploying to BSC MAINNET. Press Ctrl+C within 5s to abort..."
    sleep 5
    ;;
  *)
    echo "Usage: $0 [testnet|mainnet]"
    exit 1
    ;;
esac

if [[ ! -d "$CONTRACTS_DIR" ]]; then
  echo "Error: contracts/ directory not found at $CONTRACTS_DIR"
  exit 1
fi

cd "$CONTRACTS_DIR"

if [[ ! -f ".env" ]]; then
  echo "Warning: contracts/.env not found. Copy from .env.example and set keys."
fi

echo "→ Compiling contracts..."
npx hardhat compile

echo "→ Deploying to network: $HH_NETWORK"
# Prefer TS script if present, else ignition module
if [[ -f "${ROOT}/scripts/deploy-bsc.ts" ]]; then
  npx hardhat run "${CONTRACTS_DIR}/scripts/deploy-bsc.ts" --network "$HH_NETWORK"
elif [[ -f "scripts/deploy-bsc.ts" ]]; then
  npx hardhat run scripts/deploy-bsc.ts --network "$HH_NETWORK"
elif [[ -d "ignition/modules" ]]; then
  echo "→ Using Hardhat Ignition..."
  npx hardhat ignition deploy ignition/modules/AgentRegistryModule.ts --network "$HH_NETWORK"
else
  echo "Error: No deploy script found (scripts/deploy-bsc.ts or ignition module)."
  exit 1
fi

echo "✓ Done."
