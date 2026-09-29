// agents/yield-optimizer/src/plugins/evm-registry-plugin.ts
import { Plugin } from '@elizaos/core';
import { ethers } from 'ethers';
import { getChain, CHAINS, DEFAULT_CHAIN_KEY, type ChainConfig } from '../chains.js';

// ABI minimal (sesuaikan dengan contract)
const identityAbi = [
  'function registerAgent(address to, string name, string specialization, string tokenURI) external returns (uint256)',
  'function getAgentByName(string name) external view returns (uint256 tokenId, tuple(string name, string specialization, uint256 reputationScore, uint256 createdAt, bool active) identity)',
  'function totalAgents() external view returns (uint256)',
];
const resolverAbi = ['function setName(address agent, string name) external'];

function makeProvider(chain: ChainConfig) {
  return new ethers.JsonRpcProvider(chain.rpcUrl, chain.chainId);
}

export const evmRegistryPlugin: Plugin = {
  name: 'evm-registry',
  tools: [
    {
      name: 'registerAgentIdentity',
      description:
        'Register new ERC-8004 agent identity on the active chain (default: BSC Testnet)',
      parameters: {
        name: 'string',
        specialization: 'string',
        chain: 'string (optional: bscTestnet | bsc | baseSepolia | base)',
      },
      execute: async ({
        name,
        specialization,
        chain,
      }: {
        name: string;
        specialization: string;
        chain?: string;
      }) => {
        const cfg = getChain(chain ?? DEFAULT_CHAIN_KEY);
        if (!cfg.registryAddress) throw new Error(`No registry deployed on ${cfg.name}`);
        const wallet = new ethers.Wallet(process.env.AGENT_PRIVATE_KEY || '', makeProvider(cfg));
        const contract = new ethers.Contract(cfg.registryAddress, identityAbi, wallet);
        const tx = await contract.registerAgent(wallet.address, name, specialization, '');
        const receipt = await tx.wait();
        return {
          txHash: tx.hash,
          chainId: cfg.chainId,
          explorer: `${cfg.explorer}/tx/${tx.hash}`,
          success: receipt.status === 1,
        };
      },
    },
    {
      name: 'lookupAgent',
      description: 'Look up a registered agent by name (read-only, any supported chain)',
      parameters: { name: 'string', chain: 'string (optional)' },
      execute: async ({ name, chain }: { name: string; chain?: string }) => {
        const cfg = getChain(chain ?? DEFAULT_CHAIN_KEY);
        if (!cfg.registryAddress) throw new Error(`No registry deployed on ${cfg.name}`);
        const contract = new ethers.Contract(cfg.registryAddress, identityAbi, makeProvider(cfg));
        const [tokenId, identity] = await contract.getAgentByName(name);
        return { tokenId: tokenId.toString(), ...identity, chain: cfg.name };
      },
    },
    {
      name: 'chainHealth',
      description: 'Check connectivity: latest block number + agent wallet balance on a chain',
      parameters: { chain: 'string (optional)' },
      execute: async ({ chain }: { chain?: string }) => {
        const cfg = getChain(chain ?? DEFAULT_CHAIN_KEY);
        const provider = makeProvider(cfg);
        const block = await provider.getBlockNumber();
        let balance = '0';
        if (process.env.AGENT_PRIVATE_KEY) {
          const wallet = new ethers.Wallet(process.env.AGENT_PRIVATE_KEY, provider);
          balance = ethers.formatEther(await provider.getBalance(wallet.address));
        }
        return { chain: cfg.name, chainId: cfg.chainId, blockNumber: block, agentBalance: balance };
      },
    },
  ],
};

export { CHAINS, getChain, DEFAULT_CHAIN_KEY };
