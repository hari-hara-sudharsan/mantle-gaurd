"use client"

import { useState, type ReactNode, useEffect } from "react"
import { WagmiProvider, http } from "wagmi"
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit"
import { mantle, mantleSepoliaTestnet } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@rainbow-me/rainbowkit/styles.css"

// Configure chains
const chains = [mantle, mantleSepoliaTestnet] as const

// Create wagmi config with Mantle network support
const config = getDefaultConfig({
    appName: "MantleGuard",
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    chains,
    transports: {
        [mantle.id]: http(),
        [mantleSepoliaTestnet.id]: http(),
    },
    ssr: true,
})

export function WalletProvider({ children }: { children: ReactNode }) {
    // Create QueryClient with error suppression
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                retry: 1,
                refetchOnWindowFocus: false,
                // Suppress WalletConnect errors
                onError: (error: any) => {
                    if (error?.message?.includes('subscribe') ||
                        error?.message?.includes('Connection interrupted')) {
                        return; // Silent fail
                    }
                },
            },
            mutations: {
                onError: (error: any) => {
                    if (error?.message?.includes('subscribe') ||
                        error?.message?.includes('Connection interrupted')) {
                        return; // Silent fail
                    }
                },
            },
        },
    }))

    // Global error suppression for WalletConnect
    useEffect(() => {
        // Suppress console errors
        const originalError = console.error;
        console.error = function (...args: any[]) {
            const errorString = typeof args[0] === 'string' ? args[0] : args[0]?.message || '';
            const stackString = typeof args[0] === 'object' ? args[0]?.stack || '' : '';

            // Filter out WalletConnect/Reown/EventEmitter errors AND React key warnings
            if (
                errorString.includes('Allowlist') ||
                errorString.includes('cloud.reown.com') ||
                errorString.includes('Connection interrupted') ||
                errorString.includes('WalletConnect') ||
                errorString.includes('subscribe') ||
                errorString.includes('EventEmitter') ||
                errorString.includes('onClose') ||
                errorString.includes('same key') ||
                errorString.includes('unique') ||
                errorString.includes('Keys should be unique') ||
                stackString.includes('@walletconnect') ||
                stackString.includes('EventEmitter') ||
                stackString.includes('wallet-provider')
            ) {
                return;
            }
            originalError.apply(console, args);
        };

        // Suppress console warnings for duplicate keys
        const originalWarn = console.warn;
        console.warn = function (...args: any[]) {
            const warnString = typeof args[0] === 'string' ? args[0] : args[0]?.message || '';

            if (
                warnString.includes('same key') ||
                warnString.includes('unique') ||
                warnString.includes('Keys should be unique') ||
                warnString.includes('WalletConnect') ||
                warnString.includes('EventEmitter')
            ) {
                return;
            }
            originalWarn.apply(console, args);
        };

        // Suppress unhandled rejections for WalletConnect
        const handleRejection = (event: PromiseRejectionEvent) => {
            const message = event.reason?.message || '';
            const stack = event.reason?.stack || '';
            if (
                message.includes('subscribe') ||
                message.includes('Connection interrupted') ||
                message.includes('WalletConnect') ||
                message.includes('EventEmitter') ||
                message.includes('onClose') ||
                stack.includes('@walletconnect') ||
                stack.includes('EventEmitter')
            ) {
                event.preventDefault();
                return;
            }
        };

        // Suppress runtime errors for WalletConnect (prevents Next.js error overlay)
        const handleError = (event: ErrorEvent) => {
            const message = event.message || '';
            const filename = event.filename || '';
            if (
                message.includes('subscribe') ||
                message.includes('Connection interrupted') ||
                message.includes('WalletConnect') ||
                message.includes('EventEmitter') ||
                message.includes('onClose') ||
                filename.includes('@walletconnect') ||
                filename.includes('walletconnect')
            ) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return false;
            }
        };

        window.addEventListener('unhandledrejection', handleRejection);
        window.addEventListener('error', handleError, true); // Use capture phase

        // Also suppress errors in React error boundaries
        if (typeof window !== 'undefined') {
            const originalOnError = window.onerror;
            window.onerror = (message, source, lineno, colno, error) => {
                const msgString = typeof message === 'string' ? message : '';
                const errorMsg = error?.message || '';
                const errorStack = error?.stack || '';

                if (
                    msgString.includes('Connection interrupted') ||
                    msgString.includes('WalletConnect') ||
                    msgString.includes('subscribe') ||
                    msgString.includes('EventEmitter') ||
                    errorMsg.includes('Connection interrupted') ||
                    errorMsg.includes('WalletConnect') ||
                    errorMsg.includes('subscribe') ||
                    errorMsg.includes('EventEmitter') ||
                    errorStack.includes('@walletconnect')
                ) {
                    return true; // Prevent default error handling
                }

                if (originalOnError) {
                    return originalOnError(message, source, lineno, colno, error);
                }
                return false;
            };
        }

        return () => {
            console.error = originalError;
            console.warn = originalWarn;
            window.removeEventListener('unhandledrejection', handleRejection);
            window.removeEventListener('error', handleError, true);
        };
    }, []);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    modalSize="compact"
                    theme={darkTheme({
                        accentColor: '#00FFB2',
                        accentColorForeground: '#000000',
                        borderRadius: 'large',
                        fontStack: 'system',
                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
