# Agents - ElizaOS + OpenClaw (TS/JS untuk agent logic)

## Structure
- `src/index.ts` - Agent Manager entry point
- `src/types.ts` - TypeScript type definitions
- `src/templates/` - Agent templates (yield farming, trading, rebalancing)
- `src/plugins/evm.ts` - EVM plugin for on-chain interactions

## Setup
```bash
npm install
npm run build
```

## Agent Templates
- **Yield Optimizer** - Scans APY across Base DeFi protocols, auto-compounds
- **Trade Executor** - Executes swaps on Base DEXes
- **Portfolio Rebalancer** - Maintains target asset allocations

## Configuration
Copy `.env.example` to `.env` and fill in the required values.
