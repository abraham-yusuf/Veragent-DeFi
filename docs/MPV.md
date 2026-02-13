# MVP (Minimum Viable Product)
MVP fokus ke core value: Users deploy simple AI agent untuk manage DeFi portofolio dasar (e.g., yield farming on Base). Launch di testnet Base dulu, biar cepat iterate. Target: 1-2 minggu dev kalau solo.

**Fitur Minimal:**
1. **User Onboarding**: Connect wallet (via CDP Coinbase SDK atau Wagmi), register Basename (ENS integration) untuk agent name seperti "myyieldbot.base.eth".
2. **Agent Deployment**: No-code builder—pilih template (e.g., "Yield Optimizer"), set params (risk level, assets seperti USDC), deploy via ElizaOS (pakai plugins EVM untuk on-chain setup).
3. **Autonomous Actions**: Agent (built with OpenClaw) scan APY di pools (e.g., Aerodrome via API), auto-deposit/compound. Track via dashboard sederhana.
4. **Trust & Payments**: Agent register ke ERC-8004 Identity Registry (ephemeral NFT), bayar fees via x402 (micropayments untuk executions).
5. **Monitoring**: Real-time logs di web app, notifications kalau action executed.

**Tech Stack untuk MVP:**
- Frontend: React/NextJS, wallet connect via RainbowKit.
- Backend/Agents: ElizaOS TS framework + OpenClaw untuk tool-calling (e.g., EVM plugin buat transfers).
- Smart Contracts: Solidity—deploy ERC-8004 registries di Base (pakai reference impl dari EIP).
- Deployment: Vercel untuk frontend, Base Sepolia testnet untuk contracts (guides di Base docs).

**Validation**: Test dengan dummy funds, measure metrics seperti execution success rate. Launch ke komunitas X (@bram0511 bisa post progress).
