#!/bin/bash
# Deploy contracts to Base Sepolia testnet
# Usage: ./deploy-base-sepolia.sh

set -e

echo "🚀 Deploying Veragent contracts to Base Sepolia..."

cd "$(dirname "$0")/../contracts"

# Compile contracts
echo "📦 Compiling contracts..."
npx hardhat compile --profile production

# Deploy using Hardhat Ignition
echo "🔧 Deploying AgentIdentityRegistry and AgentNameResolver..."
npx hardhat ignition deploy ./ignition/modules/AgentRegistry.ts --network baseSepolia

echo "✅ Deployment complete!"
echo "📝 Check ignition/deployments/ for deployed contract addresses"
