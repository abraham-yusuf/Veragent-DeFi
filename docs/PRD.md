# Product Requirements Document (PRD) — Veragent DeFi Agent Hub

## 1. Product Overview

Veragent adalah web app untuk mengelola portofolio DeFi melalui **AI agents otonom di Base**, dengan:

- **Identity & trust** on-chain (ERC-8004)
- **Micropayments** agent-to-service dan user-to-agent (x402)
- **Token native Base (B20)** sebagai aset pembayaran & utility
- **Agent runtime** modern (OpenAI Agents SDK) + **Coinbase AgentKit** untuk aksi onchain

**Bukan** fokus utama MVP: self-funding via token launch (Bankr), multi-runtime (OpenClaw/Nanobot), atau BSC-first.

## 2. Goals

| Goal | Metrik sukses (MVP) |
|------|---------------------|
| Agent bisa bayar & dieksekusi onchain | ≥ 1 flow x402 B20 sukses di testnet |
| User percaya agent | Agent terdaftar ERC-8004 + score terlihat |
| Time-to-value cepat | Deploy agent < 5 menit dari connect wallet |
| Stack maintainable | 1 runtime TS, tanpa bridge Python |

## 3. User Personas

1. **Retail Investor** — ingin yield/rebalance pasif tanpa monitor 24/7  
2. **Builder / Power User** — deploy agent custom, bayar fee pakai B20, monitor onchain  

## 4. Functional Requirements

### 4.1 Authentication & Identity
- Wallet login (MetaMask / Coinbase Wallet / RainbowKit) di **Base**
- Register agent → mint identity di `AgentIdentityRegistry` (ERC-8004)
- (Phase 2+) link Basename / AgentNameResolver

### 4.2 Agent Creation & Management
- Template MVP: **Yield Optimizer**
- Runtime: **OpenAI Agents SDK**
- Onchain actions via **AgentKit** (transfer, balance, nanti swap)
- Config: risk level, assets (termasuk B20), spend limit

### 4.3 Autonomous Operations (MVP terbatas)
- Tools: cek balance B20, transfer B20, panggil API berbayar (x402)
- Belum wajib: auto-compound production-grade / multi-DEX routing

### 4.4 Payments & Monetization
- **x402** sebagai payment rail utama
- Asset: **B20** (primary) + USDC (opsional)
- Agent sebagai **buyer** (bayar data/API)
- (Opsional) service Veragent sebagai **seller** (endpoint 402)

### 4.5 Trust & Reputation
- On-chain identity + reputation score (0–10000)
- Dashboard menampilkan score & status active

### 4.6 UI/UX
- Connect wallet, deploy agent, list agents, balance B20, log aksi/payment

## 5. Non-Functional Requirements

- **Chain:** Base Sepolia → Base Mainnet; gas rendah, finalitas cepat
- **Security:** CDP managed wallet (no raw PK di production); spend controls x402
- **Stack:** TypeScript end-to-end (agents + frontend); Solidity untuk registry
- **Observability:** log tool calls + tx hash

## 6. Explicit Non-Goals (MVP)

- OpenClaw / Nanobot sebagai runtime
- Bankr token launch (fase monetisasi setelah ada user)
- Full multi-agent swarm
- BSC sebagai chain utama

## 7. Success Metrics

| Metrik | Target MVP |
|--------|------------|
| Agents registered on-chain | ≥ 20 (testnet) |
| x402 payments sukses (B20) | ≥ 50 |
| Critical path tanpa crash | 99% tool success di happy path |
| Time deploy agent | < 5 menit |

## 8. Tech Stack (Canonical)

- Frontend: Next.js, Wagmi, RainbowKit  
- Agents: OpenAI Agents SDK, Coinbase AgentKit, x402 SDK, viem  
- Contracts: Hardhat, OpenZeppelin, ERC-8004 registry  
- Token: B20 (Base native standard)  
- Payments: x402 + CDP Facilitator (production)


## 9. Arsitektur Target Detail dan Prinsip
- Base primary (B20 + x402 native)
- 1 agent runtime: OpenAI Agents SDK (TypeScript)
- Onchain layer: Coinbase AgentKit + CDP Agentic Wallet
- Payment: x402 (B20 + USDC)
- Identity: ERC-8004 registry yang sudah ada
- Ditunda: OpenClaw, Nanobot, Bankr (fase monetisasi)

### Struktur Folder Target

```text
Veragent-DeFi/
├── agents/                          # Agent runtime (OpenAI Agents SDK + AgentKit)
│   ├── src/
│   │   ├── index.ts                 # Entry: start agent runtime
│   │   ├── agent.ts                 # OpenAI Agents SDK agent definition
│   │   ├── types.ts                 # Types (update)
│   │   ├── config.ts                # Network, B20, registry addresses
│   │   ├── wallet/
│   │   │   └── cdp.ts               # CDP Agentic Wallet provider
│   │   ├── plugins/
│   │   │   ├── agentkit.ts          # AgentKit actions (swap, transfer, x402)
│   │   │   ├── b20.ts               # createB20, mint, transfer, policy
│   │   │   ├── evm.ts               # Existing + write actions
│   │   │   └── x402.ts              # wrapFetchWithPayment + settle
│   │   ├── templates/
│   │   │   ├── yield-optimizer.ts
│   │   │   ├── trade-executor.ts
│   │   │   └── portfolio-rebalancer.ts
│   │   └── tools/                   # Tool definitions for Agents SDK
│   │       ├── defi.ts
│   │       ├── payment.ts
│   │       └── identity.ts
│   ├── package.json
│   └── .env.example
│
├── contracts/                       # Tetap (Hardhat)
│   ├── contracts/
│   │   ├── AgentIdentityRegistry.sol
│   │   └── AgentNameResolver.sol
│   └── ...
│
├── frontend/                        # Next.js dashboard
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── AgentCard.tsx
│   │   │   ├── DeployAgent.tsx
│   │   │   └── PaymentStatus.tsx
│   │   └── config/
│   │       └── wagmi.ts             # Base primary, BSC secondary
│   └── ...
│
├── services/                        # NEW: x402 resource server (opsional seller)
│   └── x402-api/
│       ├── src/server.ts            # Express/Fastify + paymentMiddleware
│       └── package.json
│
├── shared/                          # Addresses, ABIs, constants
│   ├── addresses.ts                 # B20 factory, registry, etc.
│   └── abis/
│
├── docs/
│   ├── MPV.md
│   ├── PRD.md
│   ├── ROADMAP.md
│   └── ARCHITECTURE.md              # NEW (opsional)
│
└── TODO.md
```
