# Aerodrome Pools – Knowledge Base untuk YieldOptimizer Agent

## Overview Aerodrome Finance
- DEX utama di Base (fork Velodrome Optimism)
- Model: ve(3,3) → lock AERO untuk vote gauge → dapat emissions
- Pools utama: Concentrated liquidity (mirip Uniswap V3) + Stable pools
- Yield sources:
  - Trading fees (0.01%–1% tergantung tier)
  - AERO emissions (dari gauge votes)
  - Bribes (dari protokol lain untuk vote gauge tertentu)
- Kontrak utama (Base mainnet):
  - Factory: 0x420DD381b31aEf6683db6B902084cB0FFECe40Da
  - Router: 0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43
  - veAERO: 0x4200000000000000000000000000000000000042 (token governance)

## Pools Populer & Strategi Yield (per Feb 2026)
1. **USDC / WETH (0.3% fee tier)**
   - Pair volatile → IL tinggi
   - APY tipikal: 15–40% (fees + emissions)
   - Strategi: Narrow range di sekitar harga saat ini jika tren sideways

2. **cbETH / WETH (0.05% fee tier)**
   - Pair staking ETH → IL sedang
   - APY tipikal: 8–25%
   - Strategi: Cocok untuk hold long-term, tambah liquidity saat cbETH premium tinggi

3. **USDC / DAI (stable pool)**
   - IL sangat rendah
   - APY tipikal: 5–15% (tergantung emissions)
   - Strategi: Safe base untuk compounding stabil

4. **AERO / WETH**
   - Pair governance token → volatil tinggi
   - APY sering >50% saat hype
   - Strategi: Masuk hanya saat emissions tinggi, exit cepat

5. **Boosted Pools (via veAERO voting)**
   - Pools dengan gauge votes tinggi dapat multiplier emissions
   - Cek gauge weight di veAERO dashboard atau on-chain
   - Strategi: Pilih pools dengan vote weight >10% untuk APY boost

## Tips untuk Agent
- Gunakan Aerodrome subgraph (The Graph) atau direct contract call untuk real-time APY & TVL
- Prioritaskan pools dengan:
  - TVL > $10M
  - Fees 24h > $50k
  - Emissions mingguan > 100k AERO
- Hindari pools baru tanpa audit atau TVL < $1M
- Monitor bribe marketplace (misal Hidden Hand atau langsung di Aerodrome UI) untuk extra yield

Last updated: Februari 2026