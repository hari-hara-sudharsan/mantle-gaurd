"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, TrendingUp, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAnalysis } from "@/providers/analysis-provider"
import { useRouter } from "next/navigation"

export function AIInsightsWidget() {
    const { analysis, hasAnalysis } = useAnalysis()
    const router = useRouter()

    // Generate AI insights from analysis
    const insights: Array<{
        title: string
        description: string
        category: "security" | "gas" | "architecture" | "ai"
        confidence: number
    }> = []

    if (analysis.audit) {
        if (analysis.audit.criticalCount > 0) {
            insights.push({
                title: "Critical Security Issues Detected",
                description: `${analysis.audit.criticalCount} critical vulnerabilities require immediate attention`,
                category: "security",
                confidence: 95,
            })
        }

        if (analysis.audit.securityScore < 70) {
            insights.push({
                title: "Security Score Below Threshold",
                description: "Contract needs significant security improvements before deployment",
                category: "security",
                confidence: 92,
            })
        }
    }

    if (analysis.gas) {
        if (analysis.gas.optimizationScore < 80) {
            insights.push({
                title: "Gas Optimization Opportunities",
                description: `${100 - analysis.gas.optimizationScore}% potential gas savings identified`,
                category: "gas",
                confidence: 88,
            })
        }

        if (analysis.gas.daFee > 0) {
            insights.push({
                title: "Mantle DA Cost Projection",
                description: `Estimated DA fees: ${analysis.gas.daFee} MNT per transaction`,
                category: "gas",
                confidence: 85,
            })
        }
    }

    if (analysis.health.overall > 0 && analysis.health.overall < 60) {
        insights.push({
            title: "Overall Health Needs Attention",
            description: "Multiple areas require improvement for production readiness",
            category: "architecture",
            confidence: 90,
        })
    }

    if (analysis.ai.messages.length > 5) {
        insights.push({
            title: "AI Learning Active",
            description: "Copilot has built context from your interactions",
            category: "ai",
            confidence: 87,
        })
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "security":
                return "text-red-500"
            case "gas":
                return "text-[#00C2FF]"
            case "architecture":
                return "text-[#FFD300]"
            case "ai":
                return "text-[#A855F7]"
            default:
                return "text-white/50"
        }
    }

    const getCategoryBg = (category: string) => {
        switch (category) {
            case "security":
                return "bg-red-500/10"
            case "gas":
                return "bg-[#00C2FF]/10"
            case "architecture":
                return "bg-[#FFD300]/10"
            case "ai":
                return "bg-[#A855F7]/10"
            default:
                return "bg-white/5"
        }
    }

    return (
        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-[#A855F7]" />
                    <h2 className="text-xl font-bold text-white">AI Insights</h2>
                    <Sparkles className="w-4 h-4 text-[#FFD300]" />
                </div>
                <p className="text-sm text-white/50">
                    Intelligent recommendations powered by unified analysis
                </p>
            </div>

            {/* Insights */}
            {hasAnalysis && insights.length > 0 ? (
                <div className="space-y-3">
                    {insights.map((insight, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className={cn(
                                "group relative rounded-xl border border-white/10 p-4 cursor-pointer transition-all duration-300 hover:bg-white/5 hover:shadow-lg",
                                getCategoryBg(insight.category)
                            )}
                            onClick={() => {
                                if (insight.category === "security") router.push("/audit")
                                if (insight.category === "gas") router.push("/gas")
                                if (insight.category === "ai") router.push("/copilot")
                            }}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={cn(
                                            "text-xs font-semibold uppercase",
                                            getCategoryColor(insight.category)
                                        )}>
                                            {insight.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-white/40">
                                            <TrendingUp className="w-3 h-3" />
                                            {insight.confidence}% confidence
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-semibold text-white mb-1">
                                        {insight.title}
                                    </h3>
                                    <p className="text-xs text-white/60">
                                        {insight.description}
                                    </p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/30 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-full bg-[#A855F7]/10 mb-4">
                        <Brain className="w-6 h-6 text-[#A855F7]" />
                    </div>
                    <p className="text-sm text-white/50 mb-1">No insights yet</p>
                    <p className="text-xs text-white/30">
                        AI will generate recommendations after analysis
                    </p>
                </div>
            )}

            {/* Ask Copilot CTA */}
            {hasAnalysis && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: insights.length * 0.1 + 0.2 }}
                    onClick={() => router.push("/copilot")}
                    className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#A855F7] to-[#00C2FF] p-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                    Ask Copilot About These Insights →
                </motion.button>
            )}
        </div>
    )
}
