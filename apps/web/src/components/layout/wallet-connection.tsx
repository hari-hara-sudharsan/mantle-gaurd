"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useDisconnect, useBalance } from "wagmi"
import { useEffect } from "react"

export function WalletConnection() {
    const { address, isConnected, chain } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({
        address: address,
    })

    // Log wallet connection status
    useEffect(() => {
        if (isConnected && address) {
            console.log("✅ Wallet Connected:", {
                address,
                chain: chain?.name,
                chainId: chain?.id,
                balance: balance?.formatted,
            })
        }
    }, [isConnected, address, chain, balance])

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== 'loading'
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated')

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        type="button"
                                        className="bg-primary text-black hover:bg-primary/90 shadow-neon font-semibold rounded-full h-9 px-6 font-sans transition-all duration-200 hover:scale-105"
                                    >
                                        Connect Wallet
                                    </button>
                                )
                            }

                            if (chain.unsupported) {
                                return (
                                    <button
                                        onClick={openChainModal}
                                        type="button"
                                        className="bg-red-500 text-white hover:bg-red-600 font-semibold rounded-full h-9 px-6 font-sans transition-all duration-200"
                                    >
                                        Wrong Network
                                    </button>
                                )
                            }

                            return (
                                <div className="flex gap-2">
                                    <button
                                        onClick={openChainModal}
                                        type="button"
                                        className="flex items-center gap-2 bg-black/20 border border-white/10 hover:border-primary/50 rounded-full h-9 px-3 transition-all duration-200"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                className="w-4 h-4 rounded-full overflow-hidden"
                                                style={{
                                                    background: chain.iconBackground,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        className="w-4 h-4"
                                                    />
                                                )}
                                            </div>
                                        )}
                                        <span className="text-sm text-white/90 hidden sm:inline">
                                            {chain.name}
                                        </span>
                                    </button>

                                    <button
                                        onClick={openAccountModal}
                                        type="button"
                                        className="bg-primary text-black hover:bg-primary/90 shadow-neon font-semibold rounded-full h-9 px-4 font-sans transition-all duration-200 flex items-center gap-2"
                                    >
                                        <span className="hidden sm:inline text-sm">
                                            {account.displayBalance
                                                ? ` ${account.displayBalance}`
                                                : ''}
                                        </span>
                                        <span className="text-sm font-mono">
                                            {account.displayName}
                                        </span>
                                    </button>
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}
