# Roadmap — Veragent DeFi Agent Hub

Fokus: **Base · OpenAI Agents SDK · AgentKit · x402 · B20 · ERC-8004**  
Ditunda: OpenClaw, Nanobot, Bankr (sampai ada volume user)

---

## Phase 1: Foundation — SELESAI / HAMPIR SELESAI
- [x] Struktur monorepo (agents, contracts, frontend, docs)
- [x] AgentIdentityRegistry + AgentNameResolver
- [x] Deploy testnet (Base Sepolia + BSC Testnet)
- [x] Frontend skeleton (Wagmi + RainbowKit)
- [x] EVM plugin read-only

**Keputusan arsitektur (Oktober 2026):**
- Chain primary → **Base**
- Runtime → **OpenAI Agents SDK**
- Drop/tunda OpenClaw + Nanobot
- Bankr → fase monetisasi

---

## Phase 2: Core Integration (Minggu 1–2 dari sekarang) — PRIORITAS

### 2.1 Agents stack baru
- [ ] Ganti runtime ke OpenAI Agents SDK
- [ ] Install AgentKit + CDP + x402 + viem
- [ ] `config.ts` (Base, B20 factory, registry)
- [ ] CDP wallet provider (`wallet/cdp.ts`)

### 2.2 B20 + EVM write
- [ ] Plugin `b20.ts`: createB20, transfer, balance
- [ ] Perdalam `evm.ts`: transfer native, (opsional) swap via AgentKit
- [ ] Buat 1 B20 test token di Base Sepolia

### 2.3 x402
- [ ] Client buyer: `wrapFetchWithPayment` + allowedAssets B20
- [ ] (Opsional) Seller demo: Express/Fastify endpoint 402 menerima B20
- [ ] Spend controls + network allowlist Base only

### 2.4 Agent template
- [ ] Yield Optimizer (tools: balance, transfer, pay_and_fetch)
- [ ] Instructions + guardrails sederhana

**Exit criteria Phase 2:** Agent di testnet bisa register + bayar 1 URL x402 dengan B20.

---

## Phase 3: MVP Product (Minggu 3–4)

- [ ] Frontend: deploy/register agent UI
- [ ] Dashboard: list agent, B20 balance, last txs
- [ ] Wire agent runtime ke backend/job runner sederhana
- [ ] End-to-end test script (register → fund B20 → x402 pay)
- [ ] Update README (stack baru, hapus instruksi Nanobot/OpenClaw dari path kritis)

**Exit criteria:** Definition of Done di `MPV.md` terpenuhi.

---

## Phase 4: Beta (Bulan 2)

- [ ] Reputation updates on-chain (berdasarkan performance sederhana)
- [ ] Basename / name resolver di UI
- [ ] Swap tool (Aerodrome/Uniswap) via AgentKit
- [ ] Mainnet Base soft launch (limit user)
- [ ] Monitoring & alert (tx gagal, spend limit)

---

## Phase 5: Monetisasi & Scale (Bulan 3+)

- [ ] **Bankr** (opsional): token launch agent → fee → fund compute
- [ ] Multi-template (Trade Executor, Rebalancer)
- [ ] Agent marketplace (filter by ERC-8004 rep)
- [ ] Validity Transactions (Base Cobalt) untuk conditional DeFi
- [ ] Evaluasi ulang OpenClaw hanya jika ada skill yang tidak bisa diganti AgentKit

---

## Catatan prioritas chain

| Chain | Status |
|-------|--------|
| Base Sepolia | Dev / MVP |
| Base Mainnet | Production target |
| BSC | Secondary / nanti; bukan blocking MVP |
