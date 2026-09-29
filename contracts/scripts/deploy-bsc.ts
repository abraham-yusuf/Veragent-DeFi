/**
 * Deploy Veragent contracts to BSC (testnet or mainnet)
 *
 * Usage:
 *   cd contracts
 *   npx hardhat run ../scripts/deploy-bsc.ts --network bscTestnet
 *   npx hardhat run ../scripts/deploy-bsc.ts --network bsc
 *
 * Or from repo root (if hardhat is in contracts/):
 *   cd contracts && npx hardhat run ../scripts/deploy-bsc.ts --network bscTestnet
 *
 * Path suggestion: scripts/deploy-bsc.ts  (or contracts/scripts/deploy-bsc.ts)
 */
import { network } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEPLOYMENTS_DIR = path.join(__dirname, "..", "..", "deployments");

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();
  const networkName = (network as unknown as { networkName?: string }).networkName ?? "unknown";
  const chainId = (await ethers.provider.getNetwork()).chainId;

  console.log("========================================");
  console.log(" Veragent-DeFi Deploy");
  console.log("========================================");
  console.log("Network:   ", networkName);
  console.log("Chain ID:  ", chainId.toString());
  console.log("Deployer:  ", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:   ", ethers.formatEther(balance), "BNB");
  console.log("----------------------------------------");

  if (balance === 0n) {
    throw new Error(
      "Deployer has 0 balance. Get tBNB from https://testnet.bnbchain.org/faucet-smart"
    );
  }

  // --- AgentIdentityRegistry ---
  console.log("\n[1/2] Deploying AgentIdentityRegistry...");
  const Registry = await ethers.getContractFactory("AgentIdentityRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log("  ✓ AgentIdentityRegistry:", registryAddress);

  // --- AgentNameResolver ---
  console.log("\n[2/2] Deploying AgentNameResolver...");
  const Resolver = await ethers.getContractFactory("AgentNameResolver");
  // AgentNameResolver constructor membutuhkan alamat registry
  const resolver = await Resolver.deploy(registryAddress);
  await resolver.waitForDeployment();
  const resolverAddress = await resolver.getAddress();
  console.log("  ✓ AgentNameResolver:    ", resolverAddress);

  // --- Save deployment artifact ---
  if (!fs.existsSync(DEPLOYMENTS_DIR)) {
    fs.mkdirSync(DEPLOYMENTS_DIR, { recursive: true });
  }

  const artifact = {
    network: networkName,
    chainId: Number(chainId),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      AgentIdentityRegistry: registryAddress,
      AgentNameResolver: resolverAddress,
    },
  };

  const outPath = path.join(DEPLOYMENTS_DIR, `${networkName}.json`);
  fs.writeFileSync(outPath, JSON.stringify(artifact, null, 2));
  console.log("\n----------------------------------------");
  console.log("Saved deployment →", outPath);
  console.log("========================================");
  console.log("\nNext steps:");
  console.log("  1. Update shared/chains.ts contracts addresses");
  console.log("  2. Set REGISTRY_ADDRESS_BSC_TESTNET in agents/.env");
  console.log("  3. Verify on BscScan (optional):");
  if (Number(chainId) === 97) {
    console.log(
      `     https://testnet.bscscan.com/address/${registryAddress}`
    );
  } else if (Number(chainId) === 56) {
    console.log(`     https://bscscan.com/address/${registryAddress}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
