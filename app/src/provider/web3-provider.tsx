import "@rainbow-me/rainbowkit/styles.css";

import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { foundry, hardhat, polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AppConfig } from "../config";

const customSepolia = {
  ...polygonAmoy,
  rpcUrls: {
    default: {
      http: [AppConfig.rpcUrl],
    },
  },
} as typeof polygonAmoy;

const config = getDefaultConfig({
  appName: "App",
  projectId: AppConfig.walletConnectProjectId,
  chains: AppConfig.enableTestnets ? [polygonAmoy] : [hardhat],
  ssr: true,
});

export const client = new QueryClient();

export const chain = AppConfig.enableTestnets ? polygonAmoy : hardhat;
export const clientConfig = createConfig({
  chains: AppConfig.enableTestnets ? [customSepolia] : [hardhat],
  transports: {
    [foundry.id]: http("http://localhost:8545"),
    [polygonAmoy.id]: http(AppConfig.rpcUrl),
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
