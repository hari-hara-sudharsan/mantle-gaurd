"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Activity, Zap, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function GasHeroSection() {
    const [gasPrice, setGasPrice] = useState(0.00041)
    const [latency, setLatency] = useState(124)

    useEffect(() => {
        // Animated gas ticker
        const interval = setInterval(() => {
            setGasPrice(prev => prev + (Math.random() - 0.5) * 0.00002)
            setLatency(prev => Math.max(100, Math.min(200, prev + (Math.random() - 0.5) * 10)))
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative border-b border-white/5 bg-gradient-to-b from-background via-background to-transparent">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/10">
                        <Zap className="w-3 h-3 mr-1" />
                        Gas Intelligence Platform
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                            Mantle-native gas intelligence
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-[#00C2FF] to-primary bg-clip-text text-transparent">
                            for Solidity developers
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                        Analyze execution cost, DA fees, and optimization opportunities before deployment.
                    </p>
                </motion.div>

                {/* Live status indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-6"
                >
                    {/* Live Gas Price */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-white/70">Live Gas Price</p>
                            <p className="text-sm font-semibold text-white tabular-nums">
                                {gasPrice.toFixed(5)} ETH
                            </p>
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-primary"
                        />
                    </div>

                    {/* Mantle Status */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <Activity className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs text-white/70">Mantle Status</p>
                            <p className="text-sm font-semibold text-emerald-400">Operational</p>
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="w-2 h-2 rounded-full bg-emerald-400"
                        />
                    </div>

                    {/* Network Latency */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Clock className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-white/70">Network Latency</p>
                            <p className="text-sm font-semibold text-white tabular-nums">
                                {Math.round(latency)}ms
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
        </div>
    )
}
