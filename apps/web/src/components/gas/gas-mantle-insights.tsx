"use client"

import { motion } from "framer-motion"
import { Lightbulb, TrendingUp, AlertTriangle, Info } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { GasAnalysisData } from "./gas-profiler-experience"

interface GasMantleInsightsProps {
    data: GasAnalysisData
}

export function GasMantleInsights({ data }: GasMantleInsightsProps) {
    // Generate Mantle-specific insights
    const insights = generateMantleInsights(data)

    return (
        <SectionCard
            title="Mantle-specific Observations"
            description="L2 optimization insights for your contract"
            icon={<Lightbulb className="w-6 h-6 text-amber-400" />}
        >
            <div className="grid md:grid-cols-2 gap-4">
                {insights.map((insight, index) => {
                    const Icon = insight.icon

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={cn(
                                "group relative rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg",
                                insight.borderColor,
                                insight.bgColor
                            )}
                        >
                            {/* Glow effect */}
                            <div className={cn(
                                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10",
                                insight.bgColor
                            )} />

                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "p-2 rounded-lg shrink-0",
                                    insight.iconBg
                                )}>
                                    <Icon className={cn("w-5 h-5", insight.iconColor)} />
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="font-semibold text-white text-sm leading-snug">
                                            {insight.title}
                                        </h4>
                                        <Badge
                                            variant="outline"
                                            className={cn("shrink-0 text-xs", insight.badgeColor)}
                                        >
                                            {insight.type}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-white/70 leading-relaxed">
                                        {insight.description}
                                    </p>

                                    {insight.impact && (
                                        <div className="flex items-center gap-2 pt-2">
                                            <span className="text-xs text-muted-foreground">
                                                Impact:
                                            </span>
                                            <span className={cn("text-xs font-semibold", insight.impactColor)}>
                                                {insight.impact}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Summary banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-[#00C2FF]/10 to-primary/10 border border-primary/20"
            >
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-white mb-2">Mantle L2 Advantage</h4>
                        <p className="text-sm text-white/80 leading-relaxed">
                            Your contract benefits from Mantle&apos;s modular architecture. The data availability fees are lower than traditional L2s,
                            and the sequencer provides consistent block times for predictable gas costs.
                            Consider batching transactions for maximum efficiency.
                        </p>
                    </div>
                </div>
            </motion.div>
        </SectionCard>
    )
}

interface MantleInsight {
    title: string
    description: string
    type: string
    icon: typeof Lightbulb
    iconColor: string
    iconBg: string
    borderColor: string
    bgColor: string
    badgeColor: string
    impact?: string
    impactColor?: string
}

function generateMantleInsights(data: GasAnalysisData): MantleInsight[] {
    const insights: MantleInsight[] = []

    // DA Fee Analysis
    const daPercentage = (data.daFee / (data.daFee + data.totalGas * 0.000001)) * 100
    if (daPercentage > 40) {
        insights.push({
            title: "High Data Availability Costs",
            description: "DA fees represent a significant portion of your total cost. Consider minimizing calldata size or using compression techniques for array parameters.",
            type: "Optimization",
            icon: TrendingUp,
            iconColor: "text-amber-400",
            iconBg: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
            bgColor: "bg-amber-500/5",
            badgeColor: "border-amber-400/30 text-amber-400 bg-amber-500/10",
            impact: `${daPercentage.toFixed(0)}% of total cost`,
            impactColor: "text-amber-400"
        })
    }

    // MNT Cost Insight
    if (data.estimatedMNT > 2) {
        insights.push({
            title: "Deployment Cost Consideration",
            description: "At current MNT prices, this contract&apos;s deployment will be moderately expensive. Review optimization suggestions to reduce costs before mainnet deployment.",
            type: "Cost Alert",
            icon: AlertTriangle,
            iconColor: "text-orange-400",
            iconBg: "bg-orange-500/10",
            borderColor: "border-orange-500/20",
            bgColor: "bg-orange-500/5",
            badgeColor: "border-orange-400/30 text-orange-400 bg-orange-500/10",
            impact: `${data.estimatedMNT.toFixed(2)} MNT`,
            impactColor: "text-orange-400"
        })
    }

    // Optimization Score Insight
    if (data.optimizationScore < 80) {
        insights.push({
            title: "Room for Gas Optimization",
            description: "Your contract has several optimization opportunities. Implementing the AI suggestions could significantly reduce gas costs and improve execution efficiency.",
            type: "Improvement",
            icon: TrendingUp,
            iconColor: "text-blue-400",
            iconBg: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            bgColor: "bg-blue-500/5",
            badgeColor: "border-blue-400/30 text-blue-400 bg-blue-500/10",
            impact: `Score: ${data.optimizationScore}/100`,
            impactColor: "text-blue-400"
        })
    }

    // Mantle Sequencer Timing
    insights.push({
        title: "Predictable Block Times",
        description: "Mantle&apos;s sequencer provides consistent 2-second block times, allowing for reliable transaction timing and gas cost predictions across deployments.",
        type: "Network Info",
        icon: Info,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        bgColor: "bg-emerald-500/5",
        badgeColor: "border-emerald-400/30 text-emerald-400 bg-emerald-500/10",
        impact: "2s blocks",
        impactColor: "text-emerald-400"
    })

    return insights
}
