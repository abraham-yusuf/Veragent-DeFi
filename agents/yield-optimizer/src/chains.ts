/**
 * Chain registry — konfigurasi multi-chain untuk Veragent agents.
 * BSC (BNB Smart Chain) adalah primary chain untuk hackathon; Base tetap didukung.
 */

export interface ChainConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorer: string;
  registryAddress?: string;
  resolverAddress?: string;
  /** DeFi protocol addresses on this chain */
  defi: {
    router?: string;
    factory?: string;
    wrappedNative?: string;
    lending?: string;
  };
}

export const CHAINS: Record<string, ChainConfig> = {
  bscTestnet: {
    chainId: 97,
    name: 'BSC Testnet',
    rpcUrl:
      process.env.BSC_TESTNET_RPC_URL ||
      'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
    explorer: 'https://testnet.bscscan.com',
    registryAddress: process.env.REGISTRY_ADDRESS_BSC_TESTNET,
    defi: {
      // PancakeSwap testnet
      router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1', // V2 Router testnet
      wrappedNative: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', // WBNB testnet
    },
  },
  bsc: {
    chainId: 56,
    name: 'BNB Smart Chain',
    rpcUrl: process.env.BSC_RPC_URL || 'https://bsc-dataseed.bnbchain.org',
    explorer: 'https://bscscan.com',
    registryAddress: process.env.REGISTRY_ADDRESS_BSC,
    defi: {
      // PancakeSwap mainnet
      router: '0x10ED43C718714eb63d5aA57B78B54704E256024E', // V2 Router
      factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // V2 Factory
      wrappedNative: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
      lending: '0xfD36E2c2a6789Db23113685031d7F16329158384', // Venus Comptroller
    },
  },
  baseSepolia: {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
    explorer: 'https://sepolia.basescan.org',
    registryAddress:
      process.env.REGISTRY_ADDRESS_BASE_SEPOLIA ||
      '0x9664B2AfF8c3d280fe6cD9149a5BdEfC4C3EB7b7',
    resolverAddress: '0xbC481897128410491b39BB3223D6345c324249CB',
    defi: {},
  },
  base: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    defi: {},
  },
};

/** Default chain untuk hackathon: BSC Testnet */
export const DEFAULT_CHAIN_KEY = 'bscTestnet';

export function getChain(key: string = DEFAULT_CHAIN_KEY): ChainConfig {
  const chain = CHAINS[key];
  if (!chain) throw new Error(`Unknown chain: ${key}`);
  return chain;
}
