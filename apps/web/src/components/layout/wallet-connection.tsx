"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export function WalletConnection() {
    return (
        <div className="wallet-connection-wrapper">
            <ConnectButton
                chainStatus="icon"
                accountStatus={{
                    smallScreen: 'avatar',
                    largeScreen: 'full',
                }}
                showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                }}
            />
        </div>
    )
}
