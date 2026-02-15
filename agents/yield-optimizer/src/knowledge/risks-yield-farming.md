# Risiko Utama di Yield Farming – Knowledge Base untuk YieldOptimizer Agent

## Prinsip Umum
Yield farming adalah aktivitas berisiko tinggi – reward tinggi biasanya datang dengan risiko tinggi. Agent harus **selalu** mengkomunikasikan risiko kepada user dan **tidak pernah** menjamin profit.

## Risiko Kategori Besar

### 1. Smart Contract Risk (Paling Kritis)
- Bug/exploit di kode protokol → dana hilang total
- Contoh historis: Ronin, Poly Network, Cream Finance
- Mitigasi:
  - Hanya gunakan protokol dengan multiple audit (Certik, PeckShield, OpenZeppelin)
  - TVL > $100 juta (sering lebih aman karena lebih banyak mata)
  - Cek apakah ada bug bounty aktif

### 2. Impermanent Loss (IL)
- Kerugian nilai aset LP dibandingkan hold aset terpisah
- IL sangat tinggi pada pair volatile (ETH/USDC, cbETH/ETH)
- Mitigasi:
  - Gunakan stablecoin pair (USDC/DAI/USDT) untuk IL rendah
  - Narrow range di Uniswap V3 hanya jika harga stabil
  - Keluar posisi jika harga bergerak >10–15%

### 3. Liquidation Risk (Lending/Borrowing)
- Jika health factor < 1 → posisi dilikuidasi otomatis
- Mitigasi:
  - Jaga collateral ratio >150–200%
  - Hindari borrow volatile assets saat market turun
  - Monitor oracle price feeds

### 4. Oracle Manipulation / Price Feed Risk
- Flash loan attack manipulasi oracle → harga salah → liquidation massal
- Mitigasi: Gunakan protokol dengan Chainlink CCIP atau multiple oracles

### 5. Rug Pull / Exit Scam
- Tim developer kabur dengan dana liquidity / treasury
- Mitigasi:
  - Hindari protokol baru tanpa track record
  - Cek apakah tim doxxed atau punya vesting lock

### 6. Gas Fee Volatility
- Saat network congested → gas spike → tx gagal atau mahal
- Mitigasi: Gunakan Base L2 (gas selalu rendah), set max gas limit

### 7. Bridge Risk (jika cross-chain)
- Bridge hack sangat umum (Wormhole, Nomad, Ronin)
- Mitigasi: Hindari bridge jika memungkinkan, gunakan native Base assets

### 8. Regulatory & Compliance Risk
- Protokol bisa diblokir atau user dibatasi di beberapa negara
- Mitigasi: Tidak relevan untuk agent, tapi ingatkan user

### Aturan Keras untuk YieldOptimizer Agent
- **JANGAN PERNAH** merekomendasikan posisi dengan leverage >2x tanpa konfirmasi user
- **SELALU** sertakan peringatan risiko di setiap proposal action
- **TOLAK** action jika protokol TVL < $50 juta atau belum diaudit 2+ firma
- **BATASI** exposure per protokol maks 30–40% dari total portofolio
- Jika ragu → minta konfirmasi user sebelum execute tx bernilai >$1,000

Last updated: Februari 2026