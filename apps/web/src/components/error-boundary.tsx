"use client"

import React, { Component, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        // Check if it's a WalletConnect error or args.map error
        const message = error.message || ''
        const stack = error.stack || ''

        if (
            message.includes('Connection interrupted') ||
            message.includes('WalletConnect') ||
            message.includes('subscribe') ||
            message.includes('EventEmitter') ||
            message.includes('onClose') ||
            message.includes('args.map') ||
            message.includes('is not a function') ||
            stack.includes('@walletconnect') ||
            stack.includes('EventEmitter') ||
            stack.includes('wallet-provider') ||
            stack.includes('error-boundary')
        ) {
            // Suppress the error - don't set hasError
            return { hasError: false }
        }

        // For other errors, show error UI
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const message = error.message || ''
        const stack = error.stack || ''

        // Suppress WalletConnect errors and args.map errors silently
        if (
            message.includes('Connection interrupted') ||
            message.includes('WalletConnect') ||
            message.includes('subscribe') ||
            message.includes('EventEmitter') ||
            message.includes('onClose') ||
            message.includes('args.map') ||
            message.includes('is not a function') ||
            stack.includes('@walletconnect') ||
            stack.includes('EventEmitter') ||
            stack.includes('wallet-provider') ||
            stack.includes('error-boundary')
        ) {
            return
        }

        // Log other errors for debugging
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-background">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/80 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
