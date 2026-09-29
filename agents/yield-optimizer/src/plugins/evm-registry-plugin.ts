// agents/yield-optimizer/src/plugins/evm-registry-plugin.ts
import { Plugin } from '@elizaos/core';
import { ethers } from 'ethers';
import {
  DEFAULT_CHAIN_ID,
  getChain,
  getExplorerTxUrl,
  type SupportedChainId,
} from '../chains.js';

// ABI minimal (selaras dengan AgentIdentityRegistry.sol)
const identityAbi = [
  'function registerAgent(address to, string name, string specialization, string tokenURI) external returns (uint256)',
  'function getAgentByName(string name) external view returns (uint256 tokenId, tuple(string name, string specialization, uint256 reputationScore, uint256 createdAt, bool active) identity)',
  'function totalAgents() external view returns (uint256)',
];

function resolveChain(chainId?: number | string) {
  const id = Number(chainId ?? DEFAULT_CHAIN_ID);
  const cfg = getChain(id);
  if (!cfg) throw new Error(`Unsupported chain: ${chainId}`);
  return cfg;
}

function registryOf(cfg: ReturnType<typeof resolveChain>) {
  const addr =
    cfg.contracts?.agentIdentityRegistry ??
    process.env[`REGISTRY_ADDRESS_${cfg.shortName.toUpperCase()}`] ??
    process.env.REGISTRY_ADDRESS;
  if (!addr) throw new Error(`No registry address configured on ${cfg.name}`);
  return addr;
}

export const evmRegistryPlugin: Plugin = {
  name: 'evm-registry',
  tools: [
    {
      name: 'registerAgentIdentity',
      description:
        'Register new ERC-8004 agent identity on a chain (default: BSC Testnet, chainId 97)',
      parameters: {
        name: 'string',
        specialization: 'string',
        chainId: 'number (optional: 97 | 56 | 84532 | 8453)',
      },
      execute: async ({
        name,
        specialization,
        chainId,
      }: {
        name: string;
        specialization: string;
        chainId?: number;
      }) => {
        const cfg = resolveChain(chainId);
        const provider = new ethers.JsonRpcProvider(cfg.rpcUrls.default, cfg.id);
        const wallet = new ethers.Wallet(process.env.AGENT_PRIVATE_KEY || '', provider);
        const contract = new ethers.Contract(registryOf(cfg), identityAbi, wallet);
        const tx = await contract.registerAgent(wallet.address, name, specialization, '');
        const receipt = await tx.wait();
        return {
          txHash: tx.hash,
          chainId: cfg.id,
          explorer: getExplorerTxUrl(cfg.id, tx.hash),
          success: receipt.status === 1,
        };
      },
    },
    {
      name: 'lookupAgent',
      description: 'Look up a registered agent by name (read-only)',
      parameters: { name: 'string', chainId: 'number (optional)' },
      execute: async ({ name, chainId }: { name: string; chainId?: number }) => {
        const cfg = resolveChain(chainId);
        const provider = new ethers.JsonRpcProvider(cfg.rpcUrls.default, cfg.id);
        const contract = new ethers.Contract(registryOf(cfg), identityAbi, provider);
        const [tokenId, identity] = await contract.getAgentByName(name);
        return { tokenId: tokenId.toString(), ...identity, chain: cfg.name };
      },
    },
    {
      name: 'chainHealth',
      description: 'Check connectivity: latest block + agent wallet balance on a chain',
      parameters: { chainId: 'number (optional)' },
      execute: async ({ chainId }: { chainId?: number }) => {
        const cfg = resolveChain(chainId);
        const provider = new ethers.JsonRpcProvider(cfg.rpcUrls.default, cfg.id);
        const block = await provider.getBlockNumber();
        let balance = '0';
        if (process.env.AGENT_PRIVATE_KEY) {
          const wallet = new ethers.Wallet(process.env.AGENT_PRIVATE_KEY, provider);
          balance = ethers.formatEther(await provider.getBalance(wallet.address));
        }
        return {
          chain: cfg.name,
          chainId: cfg.id,
          blockNumber: block,
          agentBalance: balance,
          nativeSymbol: cfg.nativeCurrency.symbol,
        };
      },
    },
  ],
};

export { DEFAULT_CHAIN_ID, getChain };
export type { SupportedChainId };
