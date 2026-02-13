# TODO.md - Progress Pekerjaan Veragent-DeFi

## Phase 1: Foundation (Week 1-2) - In Progress 🔧

### 1.1 Setup Repo & Basic Structure ✅
- [x] Create repository structure (`/agents`, `/contracts`, `/frontend`, `/scripts`)
- [x] Create README.md with project overview and tech stack
- [x] Create docs folder (ROADMAP.md, PRD.md, MPV.md)
- [x] Add .gitignore for node_modules, build artifacts, env files

### 1.2 Install Dependencies ✅
- [x] Initialize npm in `/contracts` with Hardhat 3 + toolbox
- [x] Install OpenZeppelin Contracts for ERC-721
- [x] Initialize npm in `/agents` with TypeScript + ethers.js
- [x] Initialize npm in `/frontend` with Next.js + Wagmi + RainbowKit
- [x] Create `.env.example` files for each directory

### 1.3 Generate Solidity for Identity Registry with ERC-721 ✅
- [x] `AgentIdentityRegistry.sol` — ERC-8004 compliant registry (ERC-721 NFT)
  - [x] Agent registration with name, specialization, metadata URI
  - [x] Unique agent name enforcement
  - [x] Reputation score tracking (0-10000 scale)
  - [x] Agent lifecycle (activate/deactivate)
  - [x] Query agent by name
- [x] Tests for AgentIdentityRegistry (registration, reputation, lifecycle)

### 1.4 Integrate ENS/Basenames for Naming ✅
- [x] `AgentNameResolver.sol` — Basename resolver for agent naming
  - [x] Link Basename (e.g., "yieldmaster.base.eth") to agent wallet
  - [x] Resolve basename to wallet address
  - [x] Reverse resolve wallet to basename
  - [x] Unlink basename support
- [x] Tests for AgentNameResolver (linking, resolving, unlinking)

### 1.5 Hardhat Configuration for Base Testnet ✅
- [x] Hardhat 3 config with Base Sepolia network
- [x] Ignition deployment module (AgentRegistryModule)
- [x] Deployment script (`scripts/deploy-base-sepolia.sh`)

### 1.6 ElizaOS + OpenClaw Agent Setup ✅
- [x] Agent Manager class (create, list, deactivate agents)
- [x] Agent templates (yield farming, trading, rebalancing)
- [x] TypeScript type definitions for agent config/state
- [x] EVM plugin for on-chain interactions (balance, token read, registry)

### 1.7 Frontend Foundation ✅
- [x] Next.js project structure with TypeScript
- [x] Wagmi + RainbowKit config for Base Sepolia/Mainnet
- [x] Basic landing page with wallet connect placeholder
- [x] App layout with metadata

### 1.8 Pending (Requires Network/Keys) ⏳
- [ ] Compile contracts (requires Solidity compiler download)
- [ ] Run contract tests on local Hardhat network
- [ ] Deploy sample ERC-8004 registry to Base Sepolia testnet
- [ ] Install frontend npm dependencies and verify build
- [ ] Verify agent TypeScript compilation

---

## Phase 2: MVP Build (Week 3-4) - Not Started

- [ ] Build frontend dashboard (agent list, monitoring)
- [ ] Create first agent template in ElizaOS + OpenClaw (yield bot with EVM plugin)
- [ ] Integrate x402 for micropayments (HTTP 402 middleware)
- [ ] Test end-to-end: Deploy agent → register on-chain → execute dummy trade
- [ ] Internal demo, commit to `dev/mvp`

## Phase 3: Beta & Iteration (Month 2)

- [ ] Add reputation tracking UI via ERC-8004
- [ ] Integrate CDP Coinbase for agentic wallets
- [ ] User testing: Invite beta testers
- [ ] Fix bugs and optimize gas (Base docs best practices)

## Phase 4: Launch & Scale (Month 3+)

- [ ] Mainnet deploy on Base
- [ ] Advanced features: Multi-agent coordination, custom plugins
- [ ] Marketing: Hackathon submission, partnerships
- [ ] Open-source contributions, community agents marketplace

---

## Quick Reference

### Project Structure
```
Veragent-DeFi/
├── agents/          # ElizaOS + OpenClaw agent logic (TypeScript)
│   ├── src/
│   │   ├── index.ts           # Agent Manager
│   │   ├── types.ts           # Type definitions
│   │   ├── templates/         # Agent templates
│   │   └── plugins/evm.ts     # EVM on-chain plugin
│   └── package.json
├── contracts/       # Solidity smart contracts (Hardhat 3)
│   ├── contracts/
│   │   ├── AgentIdentityRegistry.sol  # ERC-8004 + ERC-721
│   │   └── AgentNameResolver.sol      # ENS/Basenames
│   ├── test/                          # Mocha + Ethers tests
│   ├── ignition/modules/              # Deployment modules
│   └── hardhat.config.ts
├── frontend/        # React/NextJS dashboard
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   └── config/wagmi.ts    # Wallet config
│   └── package.json
├── scripts/         # Deployment scripts
│   └── deploy-base-sepolia.sh
├── docs/            # Documentation
│   ├── ROADMAP.md
│   ├── PRD.md
│   └── MPV.md
└── TODO.md          # This file
```

### Commands
```bash
# Contracts
cd contracts && npm install && npx hardhat compile && npx hardhat test

# Agents
cd agents && npm install && npm run build

# Frontend
cd frontend && npm install && npm run dev

# Deploy to Base Sepolia
./scripts/deploy-base-sepolia.sh
```

---

Updated: 2026-02-13