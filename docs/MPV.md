# MVP (Minimum Viable Product) — Veragent DeFi

**Target:** 3–4 minggu · Base Sepolia → Base Mainnet  
**Chain primary:** Base  
**Runtime:** OpenAI Agents SDK (TypeScript)  
**Onchain:** Coinbase AgentKit + CDP Agentic Wallet  
**Payment:** x402 (B20 + USDC)  
**Identity:** ERC-8004 (`AgentIdentityRegistry`)

## Scope MVP (yang WAJIB jalan end-to-end)

1. **Onboarding**
   - Connect wallet (Wagmi + RainbowKit) di Base Sepolia / Base
   - Register agent on-chain (ERC-8004)

2. **Agent Runtime**
   - 1 template: **Yield Optimizer** (scan APY sederhana + report)
   - Tools: `get_b20_balance`, `transfer_b20`, `pay_and_fetch` (x402)

3. **Payments**
   - Agent bisa **bayar** API berbayar via x402 memakai B20
   - (Opsional seller) 1 endpoint demo yang menerima B20 via x402

4. **Trust**
   - Agent terdaftar di `AgentIdentityRegistry`
   - Reputation score tampil di dashboard (read-only dulu)

5. **Dashboard**
   - List agent, status active, saldo B20, last actions

## Out of Scope MVP (ditunda)

- OpenClaw / Nanobot
- Bankr token launch & self-funding
- Multi-agent swarm
- BSC sebagai primary (BSC boleh tetap di wagmi sebagai secondary)
- No-code builder lengkap

## Tech MVP

| Layer | Stack |
|-------|--------|
| Frontend | Next.js + Wagmi + RainbowKit |
| Agents | OpenAI Agents SDK + AgentKit + x402 + viem |
| Contracts | Hardhat — AgentIdentityRegistry + AgentNameResolver |
| Chain | Base Sepolia (dev) → Base Mainnet |
| Token | B20 (Asset variant) |

## Definition of Done

- [ ] User connect wallet Base
- [ ] Deploy/register 1 agent on-chain
- [ ] Agent punya saldo B20 (mint/faucet test)
- [ ] Agent berhasil bayar 1 endpoint x402 dengan B20
- [ ] Dashboard menampilkan agent + balance + 1 payment history
- [ ] Tidak ada dependency OpenClaw / Nanobot / Bankr di path kritis

## Validation

- Test di Base Sepolia dengan dana test
- Ukur: sukses rate x402 payment, latency register agent, error rate tools
