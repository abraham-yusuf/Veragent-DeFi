# Veragent-DeFi — BSC Support Pack

Files in this folder are ready to copy into the main repo.

## Layout (suggested paths in your repo)

```
Veragent-DeFi/
├── shared/
│   └── chains.ts                 ← shared chain config
├── frontend/src/config/
│   └── wagmi.ts                  ← replace existing
├── contracts/
│   ├── hardhat.config.ts         ← replace existing
│   └── .env.example              ← merge keys
├── scripts/
│   ├── deploy-bsc.ts             ← TypeScript deploy
│   └── deploy-bsc.sh             ← shell wrapper
└── deployments/                  ← auto-created by deploy script
    └── bscTestnet.json
```

## Quick start

### 1. Copy files

```bash
# From this pack into your clone of Veragent-DeFi
cp shared/chains.ts               /path/to/Veragent-DeFi/shared/chains.ts
cp frontend/config/wagmi.ts       /path/to/Veragent-DeFi/frontend/src/config/wagmi.ts
cp contracts/hardhat.config.ts    /path/to/Veragent-DeFi/contracts/hardhat.config.ts
cp contracts/.env.example         /path/to/Veragent-DeFi/contracts/.env.example
cp scripts/deploy-bsc.ts          /path/to/Veragent-DeFi/scripts/deploy-bsc.ts
cp scripts/deploy-bsc.sh          /path/to/Veragent-DeFi/scripts/deploy-bsc.sh
chmod +x /path/to/Veragent-DeFi/scripts/deploy-bsc.sh
```

### 2. Fund deployer (testnet)

1. Create/export a wallet private key
2. Get tBNB: https://testnet.bnbchain.org/faucet-smart
3. Put key in `contracts/.env`:

```env
BSC_TESTNET_PRIVATE_KEY=0xYOUR_KEY
BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.bnbchain.org:8545
```

### 3. Deploy

```bash
cd contracts
npm install   # if not done
cp .env.example .env   # then edit keys
cd ..
./scripts/deploy-bsc.sh testnet
```

Or:

```bash
cd contracts
npx hardhat run ../scripts/deploy-bsc.ts --network bscTestnet
```

### 4. After deploy

1. Open `deployments/bscTestnet.json`
2. Copy addresses into:
   - `shared/chains.ts` → `bscTestnet.contracts`
   - `agents/.env` → `REGISTRY_ADDRESS_BSC_TESTNET=...`
3. Restart frontend / agents

### 5. Agents usage example

```ts
import { toEvmPluginConfig } from "../shared/chains";
import { EVMPlugin } from "./plugins/evm";

const plugin = new EVMPlugin(toEvmPluginConfig(97)); // BSC Testnet
const block = await plugin.getBlockNumber();
```

## Notes

- Hardhat 3 uses `network.connect()` in the deploy script — matches your current toolbox style.
- If `AgentNameResolver` constructor does **not** take the registry address, the script falls back to zero-arg deploy.
- For production mainnet: `./scripts/deploy-bsc.sh mainnet` (has 5s safety delay).
