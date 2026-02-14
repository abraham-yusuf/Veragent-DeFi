# Veragent DeFi Agent Hub on Base

DeFi Agent Manager Integration with ElizaOS + ERC-8004 + x402 + OpenClaw/Nanobot HKUDS + Bankr + ENS/Basenames on Base L2.

## Overview
Veragent DeFi adalah web app decentralized untuk manage portofolio DeFi via AI agents autonomous di Base L2. Agents pakai ElizaOS untuk orkestrasi, OpenClaw/Nanobot untuk execution (Nanobot sebagai alternatif lebih ringan), Bankr untuk self-sustaining funding, ERC-8004 untuk trust/rep, x402 untuk micropayments, ENS/Basenames untuk naming. Goal: Bikin DeFi passive & trustless, dengan agents yang auto-fund dirinya via token fees.

Mengapa booming? Align tren agentic DeFi di Base (low cost, fast)

## Tech Stack & Integrations
- **ElizaOS**: Framework TS untuk orkestrasi agents (swarms, EVM plugins untuk on-chain actions seperti transfers/deposits).
- **OpenClaw**: Tool-calling layer untuk advanced on-chain executions (swaps, yield farming).
- **Nanobot HKUDS** (Alternatif OpenClaw): Ultra-lightweight Python framework (\~3.5k LOC, v0.1.3.post7 per Feb 2026). Dukung multi-LLM (Claude, GPT, vLLM local), cron scheduling, persistent memory (grep-based), chat channels (Telegram, Discord). Integrasi via bridge (subprocess/API) ke ElizaOS untuk lightweight agents seperti monitoring yields. Setup: `pip install nanobot-ai`, config di `\~/.nanobot/config.json`. Cocok untuk prototipe cepat & tasks sederhana.
- **Bankr**: Infra self-sustaining—agents launch token (fair launch di Base), earn fees dari trading, fund compute sendiri (wallet built-in, cross-chain). Integrasi via @bankr/sdk (npm), API calls untuk deploy token/trade. Bikin agents "perpetual" tanpa dev funding.
- **ERC-8004**: On-chain identity/reputation (ephemeral NFTs untuk agents).
- **x402**: Seamless HTTP micropayments untuk agent fees.
- **ENS/Basenames**: Human-readable names seperti "yieldbot.base.eth".
- **Base L2 Native**: Integrations dengan Aerodrome/Uniswap (swaps), Moonwell/Compound (yield), via EVM plugins.

External Docs:
- Base: https://docs.base.org
- CDP Coinbase: https://cdp.coinbase.com
- x402: https://x402.org
- Ethereum/ENS: https://ethereum.org
- ERC-8004: https://eips.ethereum.org/EIPS/eip-8004
- ElizaOS: https://github.com/elizaOS/eliza (plugins & docs)
- OpenClaw: https://docs.openclaw.ai
- Nanobot HKUDS: https://github.com/HKUDS/nanobot (last commit Feb 13, 2026; setup via pip/uv)
- Bankr: https://docs.bankr.bot/ (SDK @bankr/sdk untuk wallet & token)

## Fitur MVP
1. Agent Marketplace/Dashboard — Browse/deploy agents (filter rep via ERC-8004).
2. Custom Agent Builder — No-code templates (yield farming, rebalancing), customize via ElizaOS/Nanobot prompts.
3. Autonomous Execution — Agents scan APY, execute trades (via OpenClaw/Nanobot tools + Bankr wallet).
4. Reputation System — ERC-8004 tracking (performance, audits).
5. Monetization — x402 fees + Bankr token launches untuk self-funding.
6. Monitoring — Real-time logs, notifications via Nanobot channels (Telegram/Discord).

## Setup Repo
- Clone: `git clone https://github.com/abraham-yusuf/Veragent-DeFi`
- Install: `bun install` (untuk TS/ElizaOS), `pip install nanobot-ai` (untuk Nanobot), `npm i @bankr/sdk` (untuk Bankr).
- Deploy contracts: Hardhat/Foundry ke Base Sepolia.
- Run agents: `nanobot agent -m "Test yield check"` atau ElizaOS `elizaos start`.

## Contributing
Lihat [TODO.md](./TODO.md) untuk tasks. PR welcome! Post progress di X: @bram0511.

License: MIT

- **OpenClaw**: Tool execution layer—agents pakai OpenClaw untuk tool-calling real (deploy contracts, interact DEX, atau trigger physical actions kalau extend). Banyak demo di X pakai OpenClaw untuk autonomous DeFi (e.g., auto-deposit USDC ke yield vaults, stream payments).
- **ERC-8004**: Standar identity & reputation on-chain. Setiap agent punya "passport" ERC-8004: track performance (win rate trades, ROI history, audit logs), verifikasi trust (anti-manipulation), dan portable reputation antar chain. Users bisa scan reputation sebelum "hire" atau trust agent dengan funds.
- **x402**: Payment rails seamless. Agents bayar satu sama lain (misal agent A bayar agent B untuk data oracle via micropayments HTTP 402), atau users bayar fee agent via x402 (no API keys, direct HTTP). Cocok untuk agent-to-agent commerce di DeFi (e.g., pay for premium signals atau execution).
- **ENS/Basenames**: Naming human-readable. Agents punya nama seperti "yieldmaster.base.eth" atau "tradebot.abrahamyusuf.base.eth". Bikin discoverable & brandable—users search agent via Basenames di app, atau agents referensi satu sama lain pakai nama ENS.

### Fitur Utama Web App (Prioritas untuk MVP & Booming Potential):
1. **Agent Marketplace/Dashboard** — Browse & deploy agents dari registry ERC-8004 (filter by reputation score, past ROI, specialties seperti "yield sniper" atau "perp trader"). Users connect wallet Base, assign funds/permissions.
2. **Custom Agent Builder** — No-code/low-code interface: pilih template (yield farming, rebalancing), set parameters (risk tolerance, chains), lalu ElizaOS + OpenClaw generate & deploy agent on-chain.
3. **Autonomous Execution & Monitoring** — Agents jalankan 24/7: scan APY spikes, auto-compound, exit positions kalau risk tinggi. Real-time dashboard + notifications (via X atau email).
4. **Reputation & Trust System** — ERC-8004 scans: lihat history agent (verified by on-chain proofs). High-rep agents dapat badge, lebih mudah attract users/funds.
5. **Monetization via x402** — Charge micro-fees per action (e.g., 0.1% success fee), atau agents bayar satu sama lain untuk kolaborasi (data sharing, joint strategies).
6. **Integration DeFi Base Native** — Swap via Aerodrome/Uniswap, yield via Moonwell/Compound forks, perps via protocols seperti Avantis atau SynFutures di Base.
7. **Social/Community Features** — Share agent performance via Basenames, leaderboard top agents, atau community-voted strategies.

## External References
* **Base Docs**: Guides untuk deploy smart contracts, integrate DeFi protocols seperti Aerodrome/Uniswap di Base https://docs.base.org
* **CDP Coinbase**: API/SDK untuk wallets, payments, onchain tools—cocok buat agentic wallets/x402 di Base https://docs.cdp.coinbase.com/
* **x402.org**: Protokol untuk seamless HTTP payments, micropayments agent-to-agent tanpa friction https://docs.x402.org
* **Ethereum.org**: Docs ENS/Basenames untuk naming, plus ERC standards dasar https://ethereum.org/developers/docs
* **ERC-8004 Spec**: EIP untuk trustless agents—registries Identity, Reputation, Validation via ERC-721 NFTs ephemeral
  - https://eips.ethereum.org/EIPS/eip-8004
  - https://medium.com/@gwrx2005/erc-8004-and-the-ethereum-ai-agent-economy-technical-economic-and-policy-analysis-3134290b24d1
  - https://www.forbes.com/sites/digital-assets/2026/02/05/ai-agents-gain-trust-via-ethereum-erc-8004-on-mainnet/
  - https://eco.com/support/en/articles/13221214-what-is-erc-8004-the-ethereum-standard-enabling-trustless-ai-agents
  - https://onekey.so/blog/ecosystem/everything-you-need-to-know-about-erc-8004-20260210113200/?srsltid=AfmBOorWLWGmQNw0jAvffpptVBUkstWqc4WHz4GQXYMrliPS8jBXPPjp

  
* **ElizaOS Docs**: Framework TS untuk AI agents autonomous, plugins EVM untuk on-chain actions seperti transfers etc
  - https://docs.elizaos.ai
  - https://www.quicknode.com/guides/ai/how-to-setup-an-ai-agent-with-eliza-ai16z-framework
  - https://metamask.io/news/create-an-ai-agent-that-can-transfer-and-swap-tokens-using-elizaos
  - https://ethereum.org/id/apps/elizaos

* **OpenClaw Docs**: Tool untuk autonomous agents, integrate wallets on Base, DeFi skills seperti swaps/yield
  - https://docs.openclaw.ai
  - https://lablab.ai/ai-tutorials/openclaw-tutorial-part-one-ai-hackathons
  - https://onekey.so/blog/ecosystem/base-ai-season-is-here-mapping-the-openclaw-agentic-ecosystem-on-base-20260204133326/?srsltid=AfmBOopGlNvq3P8GV2D8FB6kMBloS8M9lYef4l0Yw6Fb-4jkrAF2g__D
  - https://milvus.io/blog/openclaw-formerly-clawdbot-moltbot-explained-a-complete-guide-to-the-autonomous-ai-agent.md
  - https://rnwy.com/learn/how-to-build-ai-agent-openclaw
