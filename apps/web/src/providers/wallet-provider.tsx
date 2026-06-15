"use client"

import { type ReactNode } from "react"
import { WagmiProvider, createConfig, http } from "wagmi"
import { RainbowKitProvider, getDefaultConfig, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit"
import { metaMaskWallet, coinbaseWallet, walletConnectWallet, rainbowWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets'
import { mantle, mantleSepoliaTestnet } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@rainbow-me/rainbowkit/styles.css"

// Define chains
const chains = [mantleSepoliaTestnet, mantle] as const

// WalletConnect Project ID
const projectId = "a01e311e5083a7d5ab2fa5e5c92eb3ff"

// Configure wallets
const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [
                metaMaskWallet,
                coinbaseWallet,
                walletConnectWallet,
                rainbowWallet,
                trustWallet,
            ],
        },
    ],
    {
        appName: 'MantleGuard',
        projectId,
    }
)

// Create wagmi config
const config = createConfig({
    chains,
    connectors,
    transports: {
        [mantle.id]: http('https://rpc.mantle.xyz'),
        [mantleSepoliaTestnet.id]: http('https://rpc.sepolia.mantle.xyz'),
    },
    ssr: true,
})

// Create QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

export function WalletProvider({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    modalSize="compact"
                    theme={darkTheme({
                        accentColor: '#00E5A0',
                        accentColorForeground: 'black',
                        borderRadius: 'large',
                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
