# MVP (Minimum Viable Product) - Veragent DeFi

Target: 2-4 minggu dev, launch testnet Base.

## Fitur Minimal
1. Onboarding: Connect wallet (Bankr built-in untuk cross-chain).
2. Agent Deployment: Builder no-code (ElizaOS templates + Nanobot lightweight logic).
3. Execution: Agents monitor/execute yields (Nanobot cron, OpenClaw tools, Bankr wallet untuk tx & token launch).
4. Trust: ERC-8004 registration.
5. Monitoring: Dashboard + Nanobot notifications (Telegram).

## Tech untuk MVP
- Frontend: React/NextJS + RainbowKit.
- Agents: ElizaOS + Nanobot bridge (pip install nanobot-ai; config multi-LLM).
- Backend: Bankr SDK (@bankr/sdk) untuk self-funding.
- Contracts: Solidity ERC-8004.
- Deployment: Vercel (frontend), Base Sepolia (contracts), local/cloud untuk agents.

Validation: Test dummy funds, measure ROI & fees dari Bankr token.
