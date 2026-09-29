/**
 * Smoke test: register agent identity pertama di BSC Testnet via plugin logic.
 * Jalan: node scripts/test-register-agent.mjs
 */
import { ethers } from 'ethers';

const RPC = 'https://data-seed-prebsc-1-s1.bnbchain.org:8545';
const REGISTRY = '0x5D0c9D417E854b75b663869AfB53761Ed33f395f';
const PK = process.env.AGENT_PRIVATE_KEY || process.env.BSC_TESTNET_PRIVATE_KEY;

const abi = [
  'function registerAgent(address to, string name, string specialization, string tokenURI) external returns (uint256)',
  'function getAgentByName(string name) external view returns (uint256 tokenId, tuple(string name, string specialization, uint256 reputationScore, uint256 createdAt, bool active) identity)',
  'function totalAgents() external view returns (uint256)',
];

const provider = new ethers.JsonRpcProvider(RPC, 97);
const wallet = new ethers.Wallet(PK, provider);
const registry = new ethers.Contract(REGISTRY, abi, wallet);

const agentName = `yieldmaster-${Date.now().toString(36)}`;

console.log('Agent wallet:', wallet.address);
console.log('Balance:', ethers.formatEther(await provider.getBalance(wallet.address)), 'tBNB');
console.log('Registering agent:', agentName, '(specialization: yield_farming)...\n');

const tx = await registry.registerAgent(wallet.address, agentName, 'yield_farming', '');
console.log('tx:', tx.hash);
const receipt = await tx.wait();
console.log('confirmed block:', receipt.blockNumber, '| gas used:', receipt.gasUsed.toString());

const [tokenId, identity] = await registry.getAgentByName(agentName);
console.log('\n✅ Agent registered onchain:');
console.log('  tokenId:', tokenId.toString());
console.log('  name:', identity.name);
console.log('  specialization:', identity.specialization);
console.log('  reputation:', identity.reputationScore.toString());
console.log('  active:', identity.active);
console.log('  total agents:', (await registry.totalAgents()).toString());
console.log('\nExplorer: https://testnet.bscscan.com/tx/' + tx.hash);
