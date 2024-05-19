"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig } from "@privy-io/wagmi";
import { avalancheFuji, foundry } from "viem/chains";
import { WagmiProvider } from "@privy-io/wagmi";
import { http } from "wagmi";
import { EnableTestnet } from "@/constants";

export const config = createConfig({
  chains: EnableTestnet ? [avalancheFuji] : [foundry], // Pass your required chains as an array
  transports: {
    [avalancheFuji.id]: http(),
    [foundry.id]: http("http://localhost:8545"),
  },
});
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <PrivyProvider
      appId="clwcrd9zx01ihbie8ucpa5dhc"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://ylozndsochkkfwjujmtk.supabase.co/storage/v1/object/public/Impacto%20logo/impacto-logo.png?t=2024-05-19T19%3A49%3A27.925Z",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
