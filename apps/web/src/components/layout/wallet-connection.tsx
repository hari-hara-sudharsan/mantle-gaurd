"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export function WalletConnection() {
    return (
        <ConnectButton
            chainStatus="icon"
            accountStatus="address"
            showBalance={true}
        />
    )
}
