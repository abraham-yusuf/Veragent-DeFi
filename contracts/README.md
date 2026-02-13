# Contracts - Solidity for ERC-8004 registries, agent factories

## Smart Contracts
- **AgentIdentityRegistry.sol** - ERC-8004 compliant Identity Registry (ERC-721 NFT)
- **AgentNameResolver.sol** - ENS/Basenames resolver for agent naming

## Setup
```bash
npm install
npx hardhat compile
npx hardhat test
```

## Deploy to Base Sepolia
```bash
# Set environment variables (see .env.example)
npx hardhat ignition deploy ./ignition/modules/AgentRegistry.ts --network baseSepolia
```

## Architecture
- Each agent is an ERC-721 NFT with on-chain identity metadata
- Reputation scores tracked on-chain (0-10000 scale)
- ENS/Basenames integration for human-readable agent names
- Built with Hardhat 3 + OpenZeppelin Contracts
