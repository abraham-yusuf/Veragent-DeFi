#!/bin/bash
# Deploy contracts to BSC Testnet (chainId 97)
# Prerequisites:
#   1. cd contracts && cp .env.example .env
#   2. Isi BSC_TESTNET_PRIVATE_KEY (wallet berisi tBNB)
#   3. Faucet tBNB: https://testnet.bnbchain.org/faucet-smart
# Usage: ./scripts/deploy-bsc-testnet.sh

set -e

echo "🚀 Deploying Veragent contracts to BSC Testnet (chainId 97)..."

cd "$(dirname "$0")/../contracts"

if [ ! -f .env ]; then
  echo "❌ contracts/.env belum ada. Salin dari .env.example dan isi BSC_TESTNET_PRIVATE_KEY dulu."
  exit 1
fi

# Compile contracts
echo "📦 Compiling contracts..."
npx hardhat compile --profile production

# Deploy using Hardhat Ignition
echo "🔧 Deploying AgentIdentityRegistry and AgentNameResolver..."
npx hardhat ignition deploy ./ignition/modules/AgentRegistry.ts --network bscTestnet

echo ""
echo "✅ Deployment complete!"
echo "📝 Alamat kontrak ada di contracts/ignition/deployments/chain-97/deployed_addresses.json"
echo "👉 Isi ke env:"
echo "   - contracts/.env          : (tidak perlu, hanya untuk deploy)"
echo "   - agents/.env             : REGISTRY_ADDRESS_BSC_TESTNET=<registry>"
echo "   - frontend/.env.local     : NEXT_PUBLIC_REGISTRY_ADDRESS_BSC_TESTNET=<registry>"
echo "🔍 Verifikasi di explorer: https://testnet.bscscan.com"
