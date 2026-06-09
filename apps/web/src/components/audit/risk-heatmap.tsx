"use client"

import { motion } from "framer-motion"
import { SectionCard } from "@/components/shared/section-card"
import { TrendingUp, AlertTriangle } from "lucide-react"
import { RiskHeatmapData } from "./audit-experience"

interface RiskHeatmapProps {
    data: RiskHeatmapData[]
}

export function RiskHeatmap({ data }: RiskHeatmapProps) {
    const getRiskColor = (level: RiskHeatmapData["riskLevel"]) => {
        switch (level) {
            case "critical":
                return "bg-red-600 border-red-500 text-red-100"
            case "high":
                return "bg-orange-600 border-orange-500 text-orange-100"
            case "medium":
                return "bg-yellow-600 border-yellow-500 text-yellow-100"
            case "low":
                return "bg-blue-600 border-blue-500 text-blue-100"
            case "safe":
                return "bg-green-600 border-green-500 text-green-100"
            default:
                return "bg-gray-600 border-gray-500 text-gray-100"
        }
    }

    const getRiskLabel = (level: RiskHeatmapData["riskLevel"]) => {
        switch (level) {
            case "critical":
                return "CRITICAL"
            case "high":
                return "HIGH"
            case "medium":
                return "MEDIUM"
            case "low":
                return "LOW"
            case "safe":
                return "SAFE"
            default:
                return "UNKNOWN"
        }
    }

    const criticalCount = data.filter(d => d.riskLevel === "critical").length
    const highCount = data.filter(d => d.riskLevel === "high").length

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <SectionCard
                title="Risk Heatmap"
                description="Function-level vulnerability distribution"
                icon={<TrendingUp className="w-6 h-6 text-primary" />}
            >
                <div className="space-y-4">
                    {/* Risk Overview */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                            <div>
                                <p className="font-semibold text-white">Risk Summary</p>
                                <p className="text-sm text-muted-foreground">
                                    {criticalCount} critical, {highCount} high risk functions
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total Functions</p>
                            <p className="text-xl font-bold text-white">{data.length}</p>
                        </div>
                    </div>

                    {/* Function Risk Bars - Vertical Layout */}
                    <div className="space-y-3">
                        {data.map((item, index) => (
                            <motion.div
                                key={item.functionName}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * index }}
                                className="group cursor-pointer"
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-mono text-sm font-medium text-white min-w-[200px] truncate">
                                        {item.functionName}
                                    </span>
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden border border-white/10 relative group-hover:border-white/20 transition-all">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(item.issues / Math.max(...data.map(d => d.issues))) * 100}%` }}
                                                transition={{ duration: 0.8, delay: 0.1 * index }}
                                                className={`h-full flex items-center justify-between px-3 ${getRiskColor(item.riskLevel)} transition-all duration-300`}
                                            >
                                                <span className="text-xs font-bold whitespace-nowrap">
                                                    {getRiskLabel(item.riskLevel)}
                                                </span>
                                                <span className="text-sm font-semibold">
                                                    {item.issues} {item.issues === 1 ? 'issue' : 'issues'}
                                                </span>
                                            </motion.div>
                                        </div>
                                        <div className="flex-shrink-0 w-6">
                                            {item.riskLevel !== "safe" && (
                                                <span className="animate-pulse text-lg">⚠️</span>
                                            )}
                                            {item.riskLevel === "safe" && (
                                                <span className="text-lg">✅</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Risk Legend */}
                    <div className="border-t border-white/10 pt-4">
                        <p className="text-sm font-medium text-white mb-3">Risk Levels</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { level: "critical" as const, label: "Critical", count: criticalCount },
                                { level: "high" as const, label: "High", count: highCount },
                                { level: "medium" as const, label: "Medium", count: data.filter(d => d.riskLevel === "medium").length },
                                { level: "low" as const, label: "Low", count: data.filter(d => d.riskLevel === "low").length },
                                { level: "safe" as const, label: "Safe", count: data.filter(d => d.riskLevel === "safe").length }
                            ].map(({ level, label, count }) => (
                                <div
                                    key={level}
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(level)}`}
                                >
                                    {label}: {count}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Hint */}
                    <div className="text-center pt-2">
                        <p className="text-xs text-muted-foreground">
                            Click functions to view detailed vulnerability analysis
                        </p>
                    </div>
                </div>
            </SectionCard>
        </motion.div>
    )
}