# Roadmap - Veragent DeFi Agent Hub

Tahapan 3-6 bulan, iterative via GitHub issues.

## Phase 1: Foundation (Week 1-2)
- Setup repo, deps (ElizaOS, OpenClaw, Nanobot via pip, @bankr/sdk).
- Deploy ERC-8004 registry di Base testnet.
- Integrasi ENS/Basenames.
- Copilot task: Solidity ERC-8004.

## Phase 2: Agents Logic (Week 3-4)
- Setup OpenClaw + Nanobot alternatif (bridge via subprocess ke ElizaOS).
- Buat template agents (yield bot) dengan Nanobot cron & tools custom (EVM calls).
- Integrasi Bankr: SDK untuk wallet, token launch (self-funding fees).
- Test: Run hybrid agents, execute dummy trade via Bankr.
- Branch: feat/agents-nanobot-bankr.

## Phase 3: MVP Build & Integration (Week 5-6)
- Frontend dashboard (React + Wagmi).
- End-to-end: Deploy agent ElizaOS/Nanobot, launch token Bankr, update rep ERC-8004.
- Tambah x402 middleware.

## Phase 4: Beta & Iteration (Month 2)
- Add reputation tracking.
- Beta test via X (@bram0511).
- Optimize: Nanobot local LLM (vLLM) untuk efisiensi.

## Phase 5: Launch & Scale (Month 3+)
- Mainnet Base deploy.
- Advanced: Multi-agent swarms, Bankr community skills.
- Marketing: Hackathon, partnerships DeFi protocols.
