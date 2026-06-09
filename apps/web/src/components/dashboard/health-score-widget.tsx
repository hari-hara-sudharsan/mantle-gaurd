"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Code, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAnalysis } from "@/providers/analysis-provider"

export function HealthScoreWidget() {
    const { analysis } = useAnalysis()
    const { health } = analysis

    const scoreCategories = [
        {
            label: "Security",
            value: health.security,
            icon: Shield,
            color: "text-[#00FFB2]",
            bg: "bg-[#00FFB2]/10",
        },
        {
            label: "Gas",
            value: health.gas,
            icon: Zap,
            color: "text-[#00C2FF]",
            bg: "bg-[#00C2FF]/10",
        },
        {
            label: "Architecture",
            value: health.architecture,
            icon: Code,
            color: "text-[#FFD300]",
            bg: "bg-[#FFD300]/10",
        },
        {
            label: "Mantle",
            value: health.mantleCompatibility,
            icon: CheckCircle2,
            color: "text-[#A855F7]",
            bg: "bg-[#A855F7]/10",
        },
    ]

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-[#00FFB2]"
        if (score >= 70) return "text-[#FFD300]"
        if (score >= 50) return "text-orange-500"
        return "text-red-500"
    }

    const getScoreGlow = (score: number) => {
        if (score >= 90) return "shadow-[0_0_40px_rgba(0,255,178,0.3)]"
        if (score >= 70) return "shadow-[0_0_40px_rgba(255,211,0,0.3)]"
        if (score >= 50) return "shadow-[0_0_40px_rgba(251,146,60,0.3)]"
        return "shadow-[0_0_40px_rgba(239,68,68,0.3)]"
    }

    return (
        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Contract Health Score</h2>
                <p className="text-sm text-white/50">
                    Unified analysis across security, gas, and architecture
                </p>
            </div>

            {/* Overall Score - Hero */}
            <div className="flex items-center justify-center mb-10">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="relative"
                >
                    {/* Glow effect */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-full blur-3xl",
                            getScoreGlow(health.overall)
                        )}
                    />

                    {/* Score circle */}
                    <div className="relative w-48 h-48 rounded-full border-4 border-white/10 bg-black/60 flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className={cn("text-6xl font-bold tabular-nums", getScoreColor(health.overall))}>
                                {health.overall}
                            </div>
                            <div className="text-sm text-white/50 text-center mt-1">
                                / 100
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4">
                {scoreCategories.map((category, index) => {
                    const Icon = category.icon

                    return (
                        <motion.div
                            key={category.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                            className="relative rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-lg", category.bg)}>
                                    <Icon className={cn("w-4 h-4", category.color)} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-white/50 mb-1">{category.label}</div>
                                    <div className={cn("text-2xl font-bold tabular-nums", category.color)}>
                                        {category.value}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Status indicator */}
            {health.overall > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.4 }}
                    className="mt-6 text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm">
                        <div className={cn("w-2 h-2 rounded-full", {
                            "bg-[#00FFB2]": health.overall >= 90,
                            "bg-[#FFD300]": health.overall >= 70 && health.overall < 90,
                            "bg-orange-500": health.overall >= 50 && health.overall < 70,
                            "bg-red-500": health.overall < 50,
                        })} />
                        <span className="text-white/70">
                            {health.overall >= 90 && "Excellent Health"}
                            {health.overall >= 70 && health.overall < 90 && "Good Health"}
                            {health.overall >= 50 && health.overall < 70 && "Needs Attention"}
                            {health.overall < 50 && "Critical Issues"}
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Empty state */}
            {health.overall === 0 && (
                <div className="text-center text-white/40 py-8">
                    <p className="text-sm">No analysis data available</p>
                    <p className="text-xs mt-1">Upload a contract to see health metrics</p>
                </div>
            )}
        </div>
    )
}
