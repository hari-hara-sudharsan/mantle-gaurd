"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Flame, AlertCircle, Info, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAnalysis } from "@/providers/analysis-provider"
import { useRouter } from "next/navigation"

export function PriorityQueueWidget() {
    const { getPriorityActions } = useAnalysis()
    const router = useRouter()
    const actions = getPriorityActions()

    const getPriorityConfig = (priority: string) => {
        switch (priority) {
            case "critical":
                return {
                    icon: Flame,
                    color: "text-red-500",
                    bg: "bg-red-500/10",
                    border: "border-red-500/20",
                    label: "Critical",
                }
            case "high":
                return {
                    icon: AlertTriangle,
                    color: "text-orange-500",
                    bg: "bg-orange-500/10",
                    border: "border-orange-500/20",
                    label: "High",
                }
            case "medium":
                return {
                    icon: AlertCircle,
                    color: "text-[#FFD300]",
                    bg: "bg-[#FFD300]/10",
                    border: "border-[#FFD300]/20",
                    label: "Medium",
                }
            default:
                return {
                    icon: Info,
                    color: "text-[#00C2FF]",
                    bg: "bg-[#00C2FF]/10",
                    border: "border-[#00C2FF]/20",
                    label: "Low",
                }
        }
    }

    const getCategoryIcon = (category: string) => {
        const colors = {
            security: "text-red-500",
            gas: "text-[#00C2FF]",
            architecture: "text-[#FFD300]",
        }
        return colors[category as keyof typeof colors] || "text-white/50"
    }

    const handleActionClick = (action: any) => {
        // Navigate to appropriate page based on category
        if (action.category === "security") {
            router.push("/audit")
        } else if (action.category === "gas") {
            router.push("/gas")
        }
    }

    return (
        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-white">Priority Queue</h2>
                    {actions.length > 0 && (
                        <div className="text-xs text-white/50">
                            {actions.length} {actions.length === 1 ? "action" : "actions"}
                        </div>
                    )}
                </div>
                <p className="text-sm text-white/50">
                    AI-prioritized actions based on impact and severity
                </p>
            </div>

            {/* Actions List */}
            {actions.length > 0 ? (
                <div className="space-y-3">
                    {actions.map((action, index) => {
                        const config = getPriorityConfig(action.priority)
                        const Icon = config.icon

                        return (
                            <motion.div
                                key={action.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                onClick={() => handleActionClick(action)}
                                className={cn(
                                    "group relative rounded-xl border bg-white/5 p-4 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:shadow-lg",
                                    config.border
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Priority indicator */}
                                    <div className={cn("p-2 rounded-lg", config.bg)}>
                                        <Icon className={cn("w-4 h-4", config.color)} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn("text-xs font-semibold uppercase", config.color)}>
                                                {config.label}
                                            </span>
                                            <span className={cn("text-xs", getCategoryIcon(action.category))}>
                                                {action.category}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                                            {action.title}
                                        </h3>
                                        <p className="text-xs text-white/60 line-clamp-2 mb-2">
                                            {action.description}
                                        </p>
                                        {action.estimatedImpact && (
                                            <div className="text-xs text-white/40">
                                                Impact: {action.estimatedImpact}
                                            </div>
                                        )}
                                    </div>

                                    {/* Arrow icon */}
                                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-5 h-5 text-white/50" />
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-full bg-[#00FFB2]/10 mb-4">
                        <Info className="w-6 h-6 text-[#00FFB2]" />
                    </div>
                    <p className="text-sm text-white/50 mb-1">No priority actions</p>
                    <p className="text-xs text-white/30">
                        Run an analysis to see recommendations
                    </p>
                </div>
            )}
        </div>
    )
}
