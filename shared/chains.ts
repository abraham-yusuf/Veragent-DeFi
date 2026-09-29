/**
 * Shared chain configuration for Veragent-DeFi
 * Used by frontend (wagmi/viem), agents (ethers), and contracts tooling.
 *
 * Supports: BSC Mainnet, BSC Testnet, Base, Base Sepolia
 */

export type SupportedChainId = 56 | 97 | 8453 | 84532;

export interface ChainConfig {
  id: SupportedChainId;
  name: string;
  shortName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: string;
    public: string[];
  };
  blockExplorers: {
    default: { name: string; url: string };
  };
  testnet: boolean;
  /** Optional deployed Veragent contracts on this chain */
  contracts?: {
    agentIdentityRegistry?: `0x${string}`;
    agentNameResolver?: `0x${string}`;
  };
  /** Common DeFi protocol addresses (for agent tools) */
  defi?: {
    wbnbOrWeth: `0x${string}`;
    pancakeSmartRouter?: `0x${string}`;
    pancakeSwapRouterV3?: `0x${string}`;
    pancakeV3Factory?: `0x${string}`;
    pancakeV2Router?: `0x${string}`;
    venusComptroller?: `0x${string}`;
  };
}

/** BSC Mainnet — primary target for Indonesia Web3 Hackathon */
export const bsc: ChainConfig = {
  id: 56,
  name: "BNB Smart Chain",
  shortName: "bsc",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: {
    default: "https://bsc-dataseed.bnbchain.org",
    public: [
      "https://bsc-dataseed.bnbchain.org",
      "https://bsc-rpc.publicnode.com",
      "https://rpc.ankr.com/bsc",
      "https://bsc-dataseed.defibit.io",
    ],
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
  testnet: false,
  contracts: {
    // Fill after deploy
    agentIdentityRegistry: undefined,
    agentNameResolver: undefined,
  },
  defi: {
    wbnbOrWeth: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    pancakeSmartRouter: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4",
    pancakeSwapRouterV3: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
    pancakeV3Factory: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
    pancakeV2Router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    venusComptroller: "0xfD36E2c2a6789Db23113685031d7F16329158384",
  },
};

/** BSC Testnet — use for hackathon demos & testing */
export const bscTestnet: ChainConfig = {
  id: 97,
  name: "BNB Smart Chain Testnet",
  shortName: "bscTestnet",
  nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
    public: [
      "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
      "https://bsc-testnet-rpc.publicnode.com",
    ],
  },
  blockExplorers: {
    default: { name: "BscScan Testnet", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
  contracts: {
    agentIdentityRegistry: "0x5D0c9D417E854b75b663869AfB53761Ed33f395f",
    agentNameResolver: "0xF769DD73Bf00457132E7f9F413720EC314AB20eC",
  },
  defi: {
    // Testnet addresses (Pancake V3 periphery often mirrors mainnet CREATE2 where applicable)
    wbnbOrWeth: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", // WBNB testnet
    pancakeSwapRouterV3: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
    pancakeV3Factory: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
  },
};

/** Base Mainnet */
export const base: ChainConfig = {
  id: 8453,
  name: "Base",
  shortName: "base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: "https://mainnet.base.org",
    public: ["https://mainnet.base.org", "https://base-rpc.publicnode.com"],
  },
  blockExplorers: {
    default: { name: "BaseScan", url: "https://basescan.org" },
  },
  testnet: false,
  contracts: {
    agentIdentityRegistry: undefined,
    agentNameResolver: undefined,
  },
  defi: {
    wbnbOrWeth: "0x4200000000000000000000000000000000000006", // WETH on Base
  },
};

/** Base Sepolia */
export const baseSepolia: ChainConfig = {
  id: 84532,
  name: "Base Sepolia",
  shortName: "baseSepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: "https://sepolia.base.org",
    public: [
      "https://sepolia.base.org",
      "https://base-sepolia-rpc.publicnode.com",
    ],
  },
  blockExplorers: {
    default: { name: "BaseScan Sepolia", url: "https://sepolia.basescan.org" },
  },
  testnet: true,
  contracts: {
    agentIdentityRegistry: undefined,
    agentNameResolver: undefined,
  },
  defi: {
    wbnbOrWeth: "0x4200000000000000000000000000000000000006",
  },
};

/** All supported chains */
export const SUPPORTED_CHAINS: Record<SupportedChainId, ChainConfig> = {
  56: bsc,
  97: bscTestnet,
  8453: base,
  84532: baseSepolia,
};

/** Ordered list for UI / wagmi (BSC first for hackathon) */
export const CHAIN_LIST: ChainConfig[] = [bscTestnet, bsc, baseSepolia, base];

/** Default chain for hackathon submission */
export const DEFAULT_CHAIN_ID: SupportedChainId = 97; // BSC Testnet

export function getChain(chainId: number): ChainConfig | undefined {
  return SUPPORTED_CHAINS[chainId as SupportedChainId];
}

export function getRpcUrl(chainId: number): string {
  const chain = getChain(chainId);
  if (!chain) throw new Error(`Unsupported chainId: ${chainId}`);
  return chain.rpcUrls.default;
}

export function getExplorerTxUrl(chainId: number, txHash: string): string {
  const chain = getChain(chainId);
  if (!chain) return txHash;
  return `${chain.blockExplorers.default.url}/tx/${txHash}`;
}

export function getExplorerAddressUrl(chainId: number, address: string): string {
  const chain = getChain(chainId);
  if (!chain) return address;
  return `${chain.blockExplorers.default.url}/address/${address}`;
}

/**
 * Helper for agents EVMPlugin config
 */
export function toEvmPluginConfig(
  chainId: SupportedChainId,
  overrides?: { rpcUrl?: string; registryAddress?: `0x${string}` }
) {
  const chain = SUPPORTED_CHAINS[chainId];
  return {
    rpcUrl: overrides?.rpcUrl ?? chain.rpcUrls.default,
    chainId: chain.id,
    registryAddress:
      overrides?.registryAddress ?? chain.contracts?.agentIdentityRegistry,
  };
}
