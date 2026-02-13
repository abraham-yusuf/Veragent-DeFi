/**
 * EVM Plugin for Veragent agents
 *
 * Provides on-chain interaction capabilities for agents
 * using ethers.js to read/write on Base network.
 * This plugin is used by ElizaOS agents via OpenClaw tool-calling.
 */
import { ethers } from "ethers";

export interface EVMPluginConfig {
  rpcUrl: string;
  chainId: number;
  registryAddress?: string;
}

export class EVMPlugin {
  private provider: ethers.JsonRpcProvider;
  private config: EVMPluginConfig;

  constructor(config: EVMPluginConfig) {
    this.config = config;
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl, config.chainId);
  }

  /**
   * Get the current block number
   */
  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber();
  }

  /**
   * Get ETH balance for an address
   */
  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  /**
   * Read ERC-20 token balance
   */
  async getTokenBalance(tokenAddress: string, walletAddress: string): Promise<string> {
    const abi = ["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"];
    const contract = new ethers.Contract(tokenAddress, abi, this.provider);

    const [balance, decimals] = await Promise.all([
      contract.balanceOf(walletAddress),
      contract.decimals(),
    ]);

    return ethers.formatUnits(balance, decimals);
  }

  /**
   * Get agent identity from the registry contract
   */
  async getAgentIdentity(tokenId: number): Promise<{
    name: string;
    specialization: string;
    reputationScore: bigint;
    createdAt: bigint;
    active: boolean;
  } | null> {
    if (!this.config.registryAddress) return null;

    const abi = [
      "function agents(uint256) view returns (string name, string specialization, uint256 reputationScore, uint256 createdAt, bool active)",
    ];
    const contract = new ethers.Contract(this.config.registryAddress, abi, this.provider);

    try {
      const agent = await contract.agents(tokenId);
      return {
        name: agent.name,
        specialization: agent.specialization,
        reputationScore: agent.reputationScore,
        createdAt: agent.createdAt,
        active: agent.active,
      };
    } catch {
      return null;
    }
  }
}

export default EVMPlugin;
