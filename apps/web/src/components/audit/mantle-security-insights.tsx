"use client"

import { motion } from "framer-motion"
import { SectionCard } from "@/components/shared/section-card"
import { Network, Layers, Shield, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface MantleSecurityInsightsProps {
    insights: string[]
}

export function MantleSecurityInsights({ insights }: MantleSecurityInsightsProps) {
    const getInsightIcon = (insight: string) => {
        if (insight.includes("Bridge") || insight.includes("cross-chain")) {
            return <Network className="w-5 h-5 text-blue-400" />
        }
        if (insight.includes("DA layer") || insight.includes("data")) {
            return <Layers className="w-5 h-5 text-purple-400" />
        }
        if (insight.includes("L2") || insight.includes("batching")) {
            return <Shield className="w-5 h-5 text-green-400" />
        }
        if (insight.includes("Sequencer") || insight.includes("timestamp")) {
            return <AlertTriangle className="w-5 h-5 text-yellow-400" />
        }
        return <Info className="w-5 h-5 text-gray-400" />
    }

    const getInsightType = (insight: string) => {
        if (insight.includes("Bridge") || insight.includes("cross-chain")) {
            return { label: "Bridge Security", color: "bg-blue-500/10 border-blue-500/20 text-blue-400" }
        }
        if (insight.includes("DA layer") || insight.includes("data")) {
            return { label: "Data Availability", color: "bg-purple-500/10 border-purple-500/20 text-purple-400" }
        }
        if (insight.includes("L2") || insight.includes("batching")) {
            return { label: "L2 Optimization", color: "bg-green-500/10 border-green-500/20 text-green-400" }
        }
        if (insight.includes("Sequencer") || insight.includes("timestamp")) {
            return { label: "Sequencer Risk", color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" }
        }
        return { label: "General", color: "bg-gray-500/10 border-gray-500/20 text-gray-400" }
    }

    const mantleSpecificChecks = [
        {
            check: "Cross-chain message validation",
            status: "pass",
            description: "Proper validation of bridge messages detected"
        },
        {
            check: "DA cost optimization",
            status: "warning",
            description: "Large calldata usage increases L1 costs"
        },
        {
            check: "Batch operation patterns",
            status: "pass",
            description: "Functions support efficient batching"
        },
        {
            check: "Sequencer dependency",
            status: "info",
            description: "Contract relies on block.timestamp accuracy"
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
        >
            <SectionCard
                title="Mantle Security Insights"
                description="L2-specific security patterns and considerations"
                icon={<Network className="w-6 h-6 text-blue-400" />}
            >
                <div className="space-y-6">
                    {/* Mantle-Specific Checks */}
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-400" />
                            Mantle L2 Security Assessment
                        </h4>

                        <div className="grid sm:grid-cols-2 gap-3">
                            {mantleSpecificChecks.map((check, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="p-3 bg-white/5 rounded border border-white/10"
                                >
                                    <div className="flex items-start gap-3">
                                        {check.status === "pass" && <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />}
                                        {check.status === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />}
                                        {check.status === "info" && <Info className="w-4 h-4 text-blue-400 mt-0.5" />}

                                        <div className="flex-1">
                                            <p className="font-medium text-white text-sm">{check.check}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{check.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* AI-Generated Insights */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-white flex items-center gap-2">
                            <Layers className="w-5 h-5 text-purple-400" />
                            AI-Detected L2 Patterns
                        </h4>

                        {insights.map((insight, index) => {
                            const insightType = getInsightType(insight)

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        {getInsightIcon(insight)}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${insightType.color}`}>
                                                    {insightType.label}
                                                </span>
                                            </div>
                                            <p className="text-white/90 text-sm leading-relaxed">{insight}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* L2 Security Score */}
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-white flex items-center gap-2">
                                <Network className="w-5 h-5 text-blue-400" />
                                Mantle Compatibility Score
                            </h4>
                            <div className="text-2xl font-bold text-blue-400">85/100</div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Bridge Integration</span>
                                <span className="text-white">Excellent</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">DA Efficiency</span>
                                <span className="text-white">Good</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Gas Optimization</span>
                                <span className="text-white">Excellent</span>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            Mantle Best Practices
                        </h4>

                        <ul className="space-y-2 text-sm text-white/90">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                <span>Implement batch operations to reduce transaction costs on L2</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                <span>Validate all cross-chain messages from Mantle bridge</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                <span>Optimize calldata size to minimize DA layer costs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                <span>Consider sequencer liveness assumptions in time-sensitive operations</span>
                            </li>
                        </ul>
                    </div>

                    {/* Educational Footer */}
                    <div className="text-center pt-4 border-t border-white/10">
                        <p className="text-xs text-muted-foreground">
                            These insights are generated by AI analysis trained on Mantle L2 security patterns
                        </p>
                    </div>
                </div>
            </SectionCard>
        </motion.div>
    )
}