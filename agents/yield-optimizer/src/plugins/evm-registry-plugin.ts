// agents/yield-optimizer/src/plugins/evm-registry-plugin.ts
import { Plugin } from '@elizaos/core';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://base-sepolia-rpc.publicnode.com');
const wallet = new ethers.Wallet(process.env.AGENT_PRIVATE_KEY || '', provider);

const identityAddress = '0x9664B2AfF8c3d280fe6cD9149a5BdEfC4C3EB7b7';
const resolverAddress = '0xbC481897128410491b39BB3223D6345c324249CB';

// ABI minimal (sesuaikan dengan contract kamu)
const identityAbi = ['function mintIdentity(address owner, string memory name) external returns (uint256)'];
const resolverAbi = ['function setName(address agent, string memory name) external'];

export const evmRegistryPlugin: Plugin = {
  name: 'evm-registry',
  tools: [
    {
      name: 'mintAgentIdentity',
      description: 'Mint new ERC-8004 identity for this agent',
      parameters: { owner: 'string', name: 'string' },
      execute: async ({ owner, name }: { owner: string; name: string }) => {
        const contract = new ethers.Contract(identityAddress, identityAbi, wallet);
        const tx = await contract.mintIdentity(owner, name);
        await tx.wait();
        return { txHash: tx.hash, success: true };
      }
    },
    {
      name: 'setAgentBasename',
      description: 'Set Basename for agent via resolver',
      parameters: { agentAddress: 'string', basename: 'string' },
      execute: async ({ agentAddress, basename }: { agentAddress: string; basename: string }) => {
        const contract = new ethers.Contract(resolverAddress, resolverAbi, wallet);
        const tx = await contract.setName(agentAddress, basename);
        await tx.wait();
        return { txHash: tx.hash };
      }
    }
  ]
};