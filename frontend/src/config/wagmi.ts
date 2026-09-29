/**
 * Wagmi + RainbowKit Configuration for Veragent-DeFi
 * Supports BNB Smart Chain (BSC) + Base networks.
 */
import { http } from "wagmi";
import { base, baseSepolia, bsc, bscTestnet } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const wagmiConfig = getDefaultConfig({
  appName: "Veragent DeFi Agent Hub",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [bscTestnet, bsc, baseSepolia, base], // BSC first for hackathon
  transports: {
    [bscTestnet.id]: http(
      process.env.NEXT_PUBLIC_BSC_TESTNET_RPC ||
        "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
    ),
    [bsc.id]: http(
      process.env.NEXT_PUBLIC_BSC_RPC || "https://bsc-dataseed.bnbchain.org"
    ),
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [base.id]: http("https://mainnet.base.org"),
  },
});
