"use client"

import { useAccount, useBalance, useChainId } from "wagmi"
import { WalletConnection } from "@/components/layout/wallet-connection"
import { Card } from "@/components/ui/card"

export default function TestWalletPage() {
    const { address, isConnected } = useAccount()
    const chainId = useChainId()
    const { data: balance } = useBalance({ address })

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-white mb-8">Wallet Connection Test</h1>

                <Card className="p-6 bg-card/50">
                    <h2 className="text-xl font-semibold text-white mb-4">Connect Your Wallet</h2>
                    <WalletConnection />
                </Card>

                {isConnected && (
                    <Card className="p-6 bg-card/50 space-y-4">
                        <h2 className="text-xl font-semibold text-white mb-4">Connection Details</h2>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="text-green-500 font-semibold">✅ Connected</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Address:</span>
                                <code className="text-white text-sm">{address}</code>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Chain ID:</span>
                                <span className="text-white">{chainId}</span>
                            </div>

                            {balance && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Balance:</span>
                                    <span className="text-white">{parseFloat(balance.formatted).toFixed(4)} {balance.symbol}</span>
                                </div>
                            )}
                        </div>
                    </Card>
                )}

                {!isConnected && (
                    <Card className="p-6 bg-card/50">
                        <p className="text-muted-foreground text-center">
                            No wallet connected. Click "Connect Wallet" above to get started.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    )
}
