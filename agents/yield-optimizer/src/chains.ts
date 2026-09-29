/**
 * Agents chain config — re-export dari shared/chains.ts (satu sumber kebenaran).
 * Path relatif: agents/yield-optimizer/src/chains.ts -> ../../../shared/chains.ts
 */
export {
  CHAIN_LIST,
  DEFAULT_CHAIN_ID,
  SUPPORTED_CHAINS,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  getChain,
  getExplorerAddressUrl,
  getExplorerTxUrl,
  getRpcUrl,
  toEvmPluginConfig,
} from '../../../shared/chains.js';
export type { ChainConfig, SupportedChainId } from '../../../shared/chains.js';

/** Default chain key untuk agents (hackathon: BSC Testnet) */
export const DEFAULT_CHAIN_KEY = 'bscTestnet' as const;
