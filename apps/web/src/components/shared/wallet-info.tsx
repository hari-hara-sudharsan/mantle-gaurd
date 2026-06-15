"use client"

import { useAccount, useBalance, useEnsName } from "wagmi"
import { Card } from "@/components/ui/card"
import { Wallet, CheckCircle2, XCircle, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

export function WalletInfo() {
    const { address, isConnected, chain } = useAccount()
    const { data: balance } = useBalance({ address })
    const { data: ensName } = useEnsName({ address })
    const [copied, setCopied] = useState(false)

    const copyAddress = async () => {
        if (address) {
            await navigator.clipboard.writeText(address)
            setCopied(true)
            toast.success("Address copied to clipboard!")
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const openExplorer = () => {
        if (address && chain) {
            const explorerUrl = chain.id === 5000
                ? `https://explorer.mantle.xyz/address/${address}`
                : `https://sepolia.mantlescan.xyz/address/${address}`
            window.open(explorerUrl, '_blank')
        }
    }

    if (!isConnected || !address) {
        return (
            <Card className="p-6 bg-card/50 border-border">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <Wallet className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">No Wallet Connected</h3>
                        <p className="text-sm text-muted-foreground">
                            Connect your wallet to access all features
                        </p>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-6 bg-card/50 border-border">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-semibold text-white">
                                    {ensName || "Wallet"}
                                </h3>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">Connected</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Address</span>
                        <div className="flex items-center gap-2">
                            <code className="text-xs font-mono text-white bg-black/20 px-2 py-1 rounded">
                                {address.slice(0, 6)}...{address.slice(-4)}
                            </code>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={copyAddress}
                            >
                                <Copy className={`w-3 h-3 ${copied ? 'text-green-500' : ''}`} />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={openExplorer}
                            >
                                <ExternalLink className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Network</span>
                        <span className="text-white font-medium">{chain?.name}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Balance</span>
                        <span className="text-white font-medium">
                            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
                        </span>
                    </div>
                </div>

                {chain && (chain.id !== 5000 && chain.id !== 5003) && (
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-medium text-yellow-500">Wrong Network</p>
                                <p className="text-xs text-yellow-500/80 mt-1">
                                    Please switch to Mantle or Mantle Sepolia Testnet
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
