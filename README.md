# Veragent-DeFi
DeFi Agent Manager Integration with ElizaOS + ERC-8004 + x402 + OpenClaw + ENS/Basenames

App untuk mengelola portofolio crypto secara otomatis. Users input preferensi, lalu AI agents (built with OpenClaw) lakukan trading, rebalancing, atau yield farming. Identitas agents via ERC-8004 memastikan kepercayaan, pembayaran fee via x402, dan ENS untuk labeling agents seperti "traderbot.base.eth". ElizaOS handle runtime agents di Base.

## 📊 Project Status

**Current Phase:** Phase 1 - Foundation ✅ **COMPLETED** (February 13, 2026)

- ✅ Repository setup and structure
- ✅ Comprehensive documentation (ROADMAP, PRD, MVP spec)
- ✅ Integration planning for all key technologies
- ✅ Development foundation established

**Next Phase:** Phase 2 - MVP Build 🚀 (Week 3-4)

📖 **Documentation:**
- [Phase 1 Completion Report](./docs/PHASE1_COMPLETION.md)
- [Phase 2 Readiness Checklist](./docs/PHASE2_READINESS.md)
- [Project Roadmap](./docs/ROADMAP.md)
- [Changelog](./CHANGELOG.md)


### Konsep Utama Platform: "Veragent DeFi Agent Hub on Base"
Web app (frontend React/NextJS + wallet connect) di mana users bisa:
- Deploy/customize AI agents untuk manage portofolio DeFi mereka.
- Agents jalankan tugas autonomous: yield farming, rebalancing, risk hedging, atau trading perps.
- Semua on-chain di Base untuk low fees & speed.

### Integrasi Stack:
- **ElizaOS**: Framework utama untuk orkestrasi & runtime agents. Agents dibuild sebagai "Elizas" dengan persistent memory (RAG), plugins EVM untuk read/write on-chain data (misal cek APY di Aerodrome atau Uniswap pools di Base). ElizaOS handle multi-agent coordination, seperti swarm agents kolaborasi untuk strategi kompleks.
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
