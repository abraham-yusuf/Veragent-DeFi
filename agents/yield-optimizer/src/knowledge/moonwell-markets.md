# Moonwell Markets – Knowledge Base untuk YieldOptimizer Agent

## Overview Moonwell
- Money market lending & borrowing di Base (fork Compound V3 + Morpho Blue elements)
- Token governance: WELL
- Fitur utama:
  - Isolated markets (risiko terpisah per asset)
  - Supply & borrow APY dinamis berdasarkan utilization
  - Incentives WELL untuk supplier & borrower
- Kontrak utama (Base mainnet):
  - Comptroller: 0x0a1e6a2f2d9d4f8b5c4f5d6e7f8a9b0c1d2e3f4a (contoh, cek docs resmi)
  - cUSDC / mUSDC market: variabel per asset
  - Oracle: Chainlink price feeds + fallback

## Markets Populer & Strategi Yield (per Feb 2026)

1. **USDC (Core Market)**
   - Supply APY: 4–12% (tergantung utilization)
   - Borrow APY: 6–18%
   - Incentives: WELL rewards untuk supplier
   - Strategi: Supply saat utilization >70% (APY tinggi), borrow saat rendah untuk leverage farming

2. **WETH / ETH**
   - Supply APY: 2–8%
   - Borrow APY: 4–15%
   - Strategi: Supply cbETH/WETH untuk yield staking + lending
   - Risiko: Volatilitas ETH → liquidation mudah

3. **cbETH (Coinbase Wrapped Staked ETH)**
   - Supply APY: 3–9% + staking yield ~3–4%
   - Strategi: Supply cbETH untuk double-dip (staking + lending rewards)
   - Risiko: Premium/discount cbETH vs ETH

4. **DAI / USDbC**
   - Stablecoin markets
   - Supply APY: 5–14%
   - Strategi: Safe untuk compounding stabil, borrow untuk leverage stable farming
   - Risiko: Depeg minor pada stablecoin

5. **Isolated Markets (High-Risk Assets)**
   - Contoh: Token baru atau volatile (misal memecoins terverifikasi)
   - APY sering >30% tapi risiko liquidation sangat tinggi
   - Strategi: Hindari kecuali user eksplisit minta high-risk mode

## Tips untuk Agent
- Cek utilization rate: >80% → supply APY naik drastis
- Monitor WELL incentives via Moonwell dashboard atau on-chain gauge
- Collateral factor: Biasanya 75–90% untuk blue-chip assets
- Liquidation threshold: Jaga health factor >1.2× minimum
- Gunakan Moonwell subgraph atau direct call ke Comptroller untuk data real-time
- Prioritaskan markets dengan:
  - TVL > $50M
  - Utilization stabil
  - Incentives WELL mingguan > 1M WELL

Last updated: Februari 2026