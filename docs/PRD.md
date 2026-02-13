# PRD (Product Requirements Document)

**Product Overview:**
DeFi Agent Manager adalah web app decentralized buat users manage portofolio via AI agents autonomous di Base L2. Agents pakai ElizaOS untuk orkestrasi, OpenClaw untuk actions on-chain, ERC-8004 untuk trust, x402 untuk payments, ENS/Basenames untuk naming. Goal: Bikin DeFi accessible & passive, tanpa manual trading.

**User Personas:**
- Retail Investor: Mau yield tinggi tanpa monitor 24/7.
- Dev/Builder: Customize agents untuk strategi kompleks.

**Functional Requirements:**
1. **Authentication & Identity**:
   - Wallet login via CDP Coinbase atau MetaMask.
   - Agent naming via ENS/Basenames (e.g., resolve "agent.base.eth" ke address).
   - Req: Integrate ENS resolver dari Ethereum.org docs.

2. **Agent Creation & Management**:
   - Templates: Yield Farming, Rebalancing, Trading.
   - Customize: Set prompts/personality di ElizaOS (persistent memory untuk learn dari trades).
   - Deploy: OpenClaw handle wallet integration (e.g., agent punya sub-wallet via Coinbase Agentic Wallets).
   - Req: Pakai ElizaOS plugins EVM untuk read/write (e.g., transfer ETH/USDC).

3. **Autonomous Operations**:
   - Actions: Scan pools (API dari Base docs), execute swaps/deposits.
   - Coordination: Multi-agents kolaborasi via ElizaOS swarm.
   - Req: OpenClaw skills untuk DeFi (swaps via Uniswap, yield via Moonwell).

4. **Trust & Reputation**:
   - Register agents ke ERC-8004 registries (Identity: ERC-721 metadata, Reputation: on-chain scores dari past performance, Validation: proofs).
   - Req: Implement lightweight registries seperti di EIP-8004 spec— satu contract per chain.

5. **Payments & Monetization**:
   - Micro-fees via x402 (agent bayar untuk data/oracles, users bayar success fees).
   - Req: HTTP 402 middleware dari x402.org, integrate dengan Ethereum wallets.

6. **UI/UX**:
   - Dashboard: View agent status, history, ROI.
   - Mobile-friendly (React).

**Non-Functional Requirements:**
- Performance: Low-latency executions (<1s untuk Base tx).
- Security: Agent permissions limited (spend caps via OpenClaw guardrails), audits untuk contracts.
- Scalability: Handle 100+ agents via ElizaOS deploy anywhere (local/cloud).
- Compliance: No KYC, tapi follow Ethereum standards.
- Tech: TypeScript/Solidity, test coverage >80%.

**Success Metrics:** 100 users di MVP, 90% retention, positive feedback di X.

