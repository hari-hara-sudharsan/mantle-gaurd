"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export function WalletConnection() {
    return (
        <ConnectButton
            accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
            }}
            chainStatus="full"
            showBalance={{
                smallScreen: false,
                largeScreen: true,
            }}
        />
    )
}
