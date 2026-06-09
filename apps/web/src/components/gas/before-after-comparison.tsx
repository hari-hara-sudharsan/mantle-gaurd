"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingDown, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface BeforeAfterComparisonProps {
    currentCost: number
    optimizedCost: number
    savingsPercent: number
    currentMNT: number
    optimizedMNT: number
}

export function BeforeAfterComparison({
    currentCost,
    optimizedCost,
    savingsPercent,
    currentMNT,
    optimizedMNT
}: BeforeAfterComparisonProps) {
    const savingsMNT = currentMNT - optimizedMNT

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-emerald-500/10">
                    <TrendingDown className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Before vs After Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                        Projected impact of applying all AI suggestions
                    </p>
                </div>
            </div>

            {/* Visual Comparison */}
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                {/* Before */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6"
                >
                    <div className="text-center mb-4">
                        <p className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-2">
                            Current Cost
                        </p>
                        <motion.p
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-5xl font-bold text-white tabular-nums mb-2"
                        >
                            {currentCost.toLocaleString()}
                        </motion.p>
                        <p className="text-sm text-muted-foreground">gas units</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/70">Estimated MNT:</span>
                            <span className="font-semibold text-white tabular-nums">{currentMNT.toFixed(2)}</span>
                        </div>
                        <div className="h-3 bg-red-500/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-red-500/60 rounded-full"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="hidden md:flex items-center justify-center"
                >
                    <div className="p-4 rounded-full bg-primary/10 border border-primary/30">
                        <ArrowRight className="w-8 h-8 text-primary" />
                    </div>
                </motion.div>

                {/* After */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6"
                >
                    <div className="text-center mb-4">
                        <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                            Optimized Cost
                        </p>
                        <motion.p
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-5xl font-bold text-white tabular-nums mb-2"
                        >
                            {optimizedCost.toLocaleString()}
                        </motion.p>
                        <p className="text-sm text-muted-foreground">gas units</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/70">Estimated MNT:</span>
                            <span className="font-semibold text-white tabular-nums">{optimizedMNT.toFixed(2)}</span>
                        </div>
                        <div className="h-3 bg-emerald-500/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(optimizedCost / currentCost) * 100}%` }}
                                transition={{ duration: 1, delay: 0.7 }}
                                className="h-full bg-emerald-500/60 rounded-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Savings Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-primary/10 to-emerald-500/10 p-6 overflow-hidden"
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                            <CheckCircle className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-1">
                                Total Savings Potential
                            </h4>
                            <p className="text-sm text-white/70">
                                By implementing all AI recommendations
                            </p>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <motion.p
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.8, type: "spring" }}
                            className="text-6xl font-bold text-emerald-400 tabular-nums mb-1"
                        >
                            {savingsPercent}%
                        </motion.p>
                        <p className="text-sm text-emerald-400/80 font-semibold">
                            Save {savingsMNT.toFixed(2)} MNT per deployment
                        </p>
                    </div>
                </div>

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-primary/5 to-emerald-500/5 opacity-50" />
            </motion.div>

            {/* Breakdown */}
            <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">Gas Reduced</p>
                    <p className="text-2xl font-bold text-white tabular-nums">
                        {(currentCost - optimizedCost).toLocaleString()}
                    </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">Cost Reduction</p>
                    <p className="text-2xl font-bold text-emerald-400 tabular-nums">
                        {savingsPercent}%
                    </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">MNT Saved</p>
                    <p className="text-2xl font-bold text-primary tabular-nums">
                        {savingsMNT.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    )
}
