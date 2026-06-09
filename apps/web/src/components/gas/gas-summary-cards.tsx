"use client"

import { motion } from "framer-motion"
import { Gauge, Database, Coins, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GasAnalysisData } from "./gas-profiler-experience"

interface GasSummaryCardsProps {
    data: GasAnalysisData
}

export function GasSummaryCards({ data }: GasSummaryCardsProps) {
    const cards = [
        {
            title: "Total Gas",
            value: data.totalGas.toLocaleString(),
            subtitle: "Execution cost",
            icon: Gauge,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            glowColor: "shadow-blue-500/20"
        },
        {
            title: "DA Fee",
            value: data.daFee.toFixed(4),
            subtitle: "Mantle data availability",
            icon: Database,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
            glowColor: "shadow-purple-500/20"
        },
        {
            title: "Estimated MNT",
            value: data.estimatedMNT.toFixed(2),
            subtitle: "Real deployment cost",
            icon: Coins,
            color: "text-emerald-400",
            bgColor: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
            glowColor: "shadow-emerald-500/20"
        },
        {
            title: "Optimization Score",
            value: data.optimizationScore,
            subtitle: getScoreLabel(data.optimizationScore),
            icon: TrendingUp,
            color: getScoreColor(data.optimizationScore),
            bgColor: getScoreBgColor(data.optimizationScore),
            borderColor: getScoreBorderColor(data.optimizationScore),
            glowColor: getScoreGlowColor(data.optimizationScore)
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon

                return (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className={cn(
                            "group relative rounded-3xl border bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl",
                            card.borderColor,
                            card.glowColor
                        )}
                    >
                        {/* Glow effect on hover */}
                        <div className={cn(
                            "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10",
                            card.bgColor
                        )} />

                        {/* Icon */}
                        <div className={cn(
                            "inline-flex p-3 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110",
                            card.bgColor
                        )}>
                            <Icon className={cn("w-6 h-6", card.color)} />
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                {card.title}
                            </p>

                            <motion.p
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                className="text-3xl font-bold text-white tabular-nums"
                            >
                                {card.value}
                            </motion.p>

                            <p className={cn("text-xs font-medium", card.color)}>
                                {card.subtitle}
                            </p>
                        </div>

                        {/* Animated border gradient */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                )
            })}
        </div>
    )
}

function getScoreLabel(score: number): string {
    if (score >= 90) return "Excellent"
    if (score >= 75) return "Good"
    if (score >= 60) return "Needs improvement"
    return "Poor optimization"
}

function getScoreColor(score: number): string {
    if (score >= 90) return "text-emerald-400"
    if (score >= 75) return "text-primary"
    if (score >= 60) return "text-amber-400"
    return "text-red-400"
}

function getScoreBgColor(score: number): string {
    if (score >= 90) return "bg-emerald-500/10"
    if (score >= 75) return "bg-primary/10"
    if (score >= 60) return "bg-amber-500/10"
    return "bg-red-500/10"
}

function getScoreBorderColor(score: number): string {
    if (score >= 90) return "border-emerald-500/20"
    if (score >= 75) return "border-primary/20"
    if (score >= 60) return "border-amber-500/20"
    return "border-red-500/20"
}

function getScoreGlowColor(score: number): string {
    if (score >= 90) return "shadow-emerald-500/20"
    if (score >= 75) return "shadow-primary/20"
    if (score >= 60) return "shadow-amber-500/20"
    return "shadow-red-500/20"
}
