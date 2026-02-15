# Base L2 DeFi Protocols – Knowledge Base for YieldOptimizer Agent

## Overview
Base adalah Layer 2 Ethereum yang dibangun oleh Coinbase, menggunakan OP Stack. Karakteristik utama:
- Gas fee sangat rendah (~0.0001–0.001 ETH per tx)
- Finality cepat (~2 detik block time)
- EVM-compatible → semua tool Ethereum bisa digunakan
- TVL tinggi di DeFi (terutama DEX dan lending)

## Protokol Utama untuk Yield Farming & Liquidity Provision (per Feb 2026)

### 1. Aerodrome Finance (DEX & AMM V2)
- Tipe: Concentrated Liquidity DEX (fork Velodrome)
- Token: AERO (governance & incentives)
- Yield sources: Trading fees + AERO emissions + bribes
- Pools populer: USDC/WETH, cbETH/WETH, DAI/USDC
- Cara optimize: Cari pools dengan high fees + high emissions
- Risiko utama: Impermanent loss tinggi di volatile pairs
- Kontrak utama (Base mainnet): Aerodrome Router, Pools, veAERO locking

### 2. Moonwell (Lending & Borrowing)
- Tipe: Money market (fork Compound V3)
- Token: WELL (governance)
- Yield sources: Lending APY + WELL incentives + borrow rewards
- Assets utama: USDC, ETH, WETH, cbETH, DAI
- Fitur: Isolated markets, risk isolation
- Cara optimize: Supply stablecoin saat borrow demand tinggi
- Risiko utama: Liquidation jika collateral ratio turun

### 3. Uniswap V3 (Concentrated Liquidity)
- Tipe: Classic concentrated liquidity DEX
- Yield sources: Trading fees (0.05%, 0.3%, 1%) + optional farming via third-party
- Pools populer: WETH/USDC 0.3%, cbETH/ETH 0.05%
- Cara optimize: Posisikan range narrow di harga saat ini untuk fee capture tinggi
- Risiko utama: Impermanent loss sangat tinggi jika harga bergerak jauh

### 4. Seamless Protocol (Lending)
- Tipe: Lending market (mirip Aave V3)
- Token: SEAM (governance)
- Yield sources: Supply APY + SEAM incentives
- Assets: USDC, ETH, WETH, DAI, dll.
- Fitur: Cross-chain bridging built-in, flash loans
- Risiko utama: Oracle manipulation, liquidation cascades

### 5. Balancer V2 (Weighted Pools)
- Tipe: Multi-asset weighted pools
- Yield sources: Swap fees + BAL emissions (via gauges)
- Cara optimize: Join boosted pools atau gauge farms
- Risiko utama: Complex math → IL calculation sulit

### 6. Pendle (Yield Tokenization)
- Tipe: Yield trading & fixed yield
- Yield sources: PT (Principal Token) discount + YT (Yield Token) leverage
- Cara optimize: Lock PT untuk fixed yield tinggi, trade YT untuk leveraged yield
- Risiko utama: Time decay pada YT, smart contract risk

### Catatan Penting untuk Agent
- Selalu gunakan RPC Base Sepolia untuk testing: https://sepolia.base.org
- Mainnet RPC reliable: https://mainnet.base.org atau Alchemy/Infura
- Prioritaskan protokol dengan TVL > $100M dan audit multiple (untuk safety)
- Update APY real-time via on-chain calls atau subgraph (Aerodrome, Moonwell punya subgraph The Graph)
- Hindari protokol baru tanpa audit atau TVL rendah (<$10M)

Last updated: Februari 2026