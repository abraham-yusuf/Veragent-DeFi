# Product Requirements Document (PRD) - Veragent DeFi Agent Hub

## Product Overview
Web app untuk manage DeFi portofolio via autonomous AI agents di Base L2. Integrasi ElizaOS (orkestrasi), OpenClaw/Nanobot HKUDS (execution), Bankr (self-sustaining), ERC-8004 (trust), x402 (payments), ENS/Basenames (naming).

## User Personas
- Retail Investor: Passive yield tanpa monitor.
- Builder: Customize agents dengan self-funding.

## Functional Requirements
1. **Authentication & Identity**:
   - Wallet login (CDP Coinbase/MetaMask).
   - Agent naming via ENS/Basenames.
   - Req: Integrasi Bankr wallet untuk cross-chain access.

2. **Agent Creation & Management**:
   - Templates: Yield Farming, Rebalancing.
   - Customize: Prompts/personality di ElizaOS/Nanobot (persistent memory).
   - Deploy: OpenClaw untuk complex tools, Nanobot untuk lightweight (cron scheduling, multi-LLM seperti Claude).
   - Req: Bridge Nanobot (Python) ke ElizaOS (TS) via subprocess/API. Gunakan Bankr untuk launch token agent (fair launch, earn fees).

3. **Autonomous Operations**:
   - Actions: Scan pools, execute deposits (EVM plugins).
   - Coordination: ElizaOS swarms + Nanobot channels (Telegram notifications).
   - Self-Sustaining: Bankr handle funding (token fees bayar LLM/compute).

4. **Trust & Reputation**:
   - ERC-8004 registries (identity, rep scores dari performance/fees).

5. **Payments & Monetization**:
   - x402 micropayments + Bankr token fees (1-5% trade cut).

6. **UI/UX**:
   - Dashboard: Agent status, ROI, token launches via Bankr.

## Non-Functional Requirements
- Performance: Low-latency di Base (<1s tx).
- Security: Bankr wallet guardrails, Nanobot sandbox (restrictToWorkspace).
- Scalability: Nanobot lightweight untuk 100+ agents.
- Tech: TS/Solidity/Python hybrid.

## Success Metrics
100 users MVP, 90% retention, self-funded agents via Bankr.
