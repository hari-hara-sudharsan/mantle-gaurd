"use client"

import { motion } from "framer-motion"
import { Sparkles, TrendingUp, Database, Layers, Zap, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface OptimizationScoreEngineProps {
    score: number
    breakdown: {
        storageEfficiency: number
        loopEfficiency: number
        calldataUsage: number
        daCostEfficiency: number
        mantleScore: number
    }
}

export function OptimizationScoreEngine({ score, breakdown }: OptimizationScoreEngineProps) {
    const getScoreColor = (value: number) => {
        if (value >= 90) return "text-emerald-400"
        if (value >= 75) return "text-primary"
        if (value >= 60) return "text-amber-400"
        return "text-red-400"
    }

    const getScoreGradient = (value: number) => {
        if (value >= 90) return "from-emerald-500/20 to-emerald-500/5"
        if (value >= 75) return "from-primary/20 to-primary/5"
        if (value >= 60) return "from-amber-500/20 to-amber-500/5"
        return "from-red-500/20 to-red-500/5"
    }

    const categories = [
        {
            label: "Storage Efficiency",
            value: breakdown.storageEfficiency,
            icon: Database,
            description: "Storage read/write optimization"
        },
        {
            label: "Loop Efficiency",
            value: breakdown.loopEfficiency,
            icon: TrendingUp,
            description: "Iteration and batching patterns"
        },
        {
            label: "Calldata Usage",
            value: breakdown.calldataUsage,
            icon: Layers,
            description: "Input parameter optimization"
        },
        {
            label: "DA Cost Efficiency",
            value: breakdown.daCostEfficiency,
            icon: Zap,
            description: "Mantle data availability costs"
        },
        {
            label: "Overall Mantle Score",
            value: breakdown.mantleScore,
            icon: Target,
            description: "Combined Mantle L2 optimization"
        }
    ]

    return (
        <div className="space-y-6">
            {/* Main Score Display */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "relative rounded-3xl border bg-gradient-to-br backdrop-blur-sm p-8 overflow-hidden",
                    getScoreGradient(score),
                    score >= 90 ? "border-emerald-500/20" :
                        score >= 75 ? "border-primary/20" :
                            score >= 60 ? "border-amber-500/20" :
                                "border-red-500/20"
                )}
            >
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                            <h3 className="text-2xl font-bold text-white">AI Optimization Score</h3>
                        </div>
                        <p className="text-sm text-white/70">
                            AI-powered analysis of your contract&apos;s gas efficiency
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.7, type: "spring" }}
                            className="relative"
                        >
                            {/* Circular Progress */}
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                <motion.circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 70}`}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - score / 100) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className={getScoreColor(score)}
                                />
                            </svg>

                            {/* Score Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className={cn("text-5xl font-bold tabular-nums", getScoreColor(score))}
                                >
                                    {score}
                                </motion.span>
                                <span className="text-sm text-white/60 font-medium">/100</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Glow effect */}
                <div className={cn(
                    "absolute inset-0 opacity-30 blur-3xl",
                    score >= 90 ? "bg-emerald-500" :
                        score >= 75 ? "bg-primary" :
                            score >= 60 ? "bg-amber-500" :
                                "bg-red-500"
                )} />
            </motion.div>

            {/* Category Breakdown */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Score Breakdown
                </h4>

                {categories.map((category, index) => {
                    const Icon = category.icon

                    return (
                        <motion.div
                            key={category.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">{category.label}</p>
                                        <p className="text-xs text-muted-foreground">{category.description}</p>
                                    </div>
                                </div>
                                <span className={cn("text-2xl font-bold tabular-nums", getScoreColor(category.value))}>
                                    {category.value}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${category.value}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                    className={cn(
                                        "h-full rounded-full",
                                        category.value >= 90 ? "bg-emerald-400" :
                                            category.value >= 75 ? "bg-primary" :
                                                category.value >= 60 ? "bg-amber-400" :
                                                    "bg-red-400"
                                    )}
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
