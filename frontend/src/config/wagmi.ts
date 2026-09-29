/**
 * Wagmi + RainbowKit Configuration for Veragent-DeFi
 * Uses shared chains (BSC + Base). Prefer BSC for Indonesia Web3 Hackathon.
 *
 * Path suggestion: frontend/src/config/wagmi.ts
 */
import { http } from "wagmi";
import { base, baseSepolia, bsc, bscTestnet } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const bscRpc =
  process.env.NEXT_PUBLIC_BSC_RPC || "https://bsc-dataseed.bnbchain.org";
const bscTestnetRpc =
  process.env.NEXT_PUBLIC_BSC_TESTNET_RPC ||
  "https://data-seed-prebsc-1-s1.bnbchain.org:8545";

export const wagmiConfig = getDefaultConfig({
  appName: "Veragent DeFi Agent Hub",
  projectId:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  // BSC first for hackathon UX
  chains: [bscTestnet, bsc, baseSepolia, base],
  transports: {
    [bscTestnet.id]: http(bscTestnetRpc),
    [bsc.id]: http(bscRpc),
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [base.id]: http("https://mainnet.base.org"),
  },
  ssr: true,
});
