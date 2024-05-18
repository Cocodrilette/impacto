export const AppConfig = {
  enableTestnets: process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true",
  rpcUrl: "https://avalanche-fuji.drpc.org",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
};
