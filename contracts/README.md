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

## Deployed Contracts (Base Sepolia Testnet)

| Contract Name              | Address                                    | Purpose                                      |
|----------------------------|--------------------------------------------|----------------------------------------------|
| AgentIdentityRegistry      | 0x9664B2AfF8c3d280fe6cD9149a5BdEfC4C3EB7b7 | ERC-8004 Identity & Reputation Registry      |
| AgentNameResolver          | 0xbC481897128410491b39BB3223D6345c324249CB | Name resolution for agent Basenames/ENS-like |

- Explorer: https://sepolia.basescan.org/address/0x9664B2AfF8c3d280fe6cD9149a5BdEfC4C3EB7b7
- Explorer: https://sepolia.basescan.org/address/0xbC481897128410491b39BB3223D6345c324249CB
