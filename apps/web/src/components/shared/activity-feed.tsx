"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Upload,
    Zap,
    Shield,
    FileText,
    CheckCircle2,
    Clock,
    Sparkles,
    Link2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { STATUS_COLORS, ICON_SIZES, ANIMATION_VARIANTS, ANIMATION_TRANSITIONS } from "@/lib/design-system"
import { useAnalysis } from "@/providers/analysis-provider"
import { format } from "date-fns"

export interface ActivityItem {
    id: string
    type: "contract" | "gas" | "audit" | "ai" | "report" | "blockchain"
    title: string
    description: string
    timestamp: Date
    status: "pending" | "completed" | "error"
    icon: React.ComponentType<{ className?: string }>
    metadata?: {
        score?: number
        issues?: number
        savings?: string
        txHash?: string
    }
}

export function ActivityFeed({ limit = 10 }: { limit?: number }) {
    const [activities, setActivities] = useState<ActivityItem[]>([])
    const { analysis } = useAnalysis()

    // Generate activity items from analysis state
    useEffect(() => {
        const newActivities: ActivityItem[] = []

        if (analysis.contract) {
            newActivities.push({
                id: `contract-${analysis.contract.uploadedAt.getTime()}`,
                type: "contract",
                title: "Contract Uploaded",
                description: analysis.contract.name || "Contract.sol",
                timestamp: analysis.contract.uploadedAt,
                status: "completed",
                icon: Upload,
            })
        }

        if (analysis.gas) {
            newActivities.push({
                id: `gas-${Date.now()}`,
                type: "gas",
                title: "Gas Analysis Complete",
                description: `Optimization score: ${analysis.gas.optimizationScore}/100`,
                timestamp: new Date(),
                status: "completed",
                icon: Zap,
                metadata: {
                    score: analysis.gas.optimizationScore,
                    savings: `${analysis.gas.daFee.toFixed(4)} MNT`,
                },
            })
        }

        if (analysis.audit) {
            newActivities.push({
                id: `audit-${Date.now()}`,
                type: "audit",
                title: "Security Audit Complete",
                description: `Found ${analysis.audit.issues.length} issues`,
                timestamp: new Date(),
                status: "completed",
                icon: Shield,
                metadata: {
                    score: analysis.audit.securityScore,
                    issues: analysis.audit.issues.length,
                },
            })
        }

        if (analysis.reportHash) {
            newActivities.push({
                id: `report-${Date.now()}`,
                type: "report",
                title: "Report Generated",
                description: `Hash: ${analysis.reportHash.slice(0, 12)}...`,
                timestamp: new Date(),
                status: "completed",
                icon: FileText,
            })
        }

        if (analysis.transactionHash) {
            newActivities.push({
                id: `blockchain-${Date.now()}`,
                type: "blockchain",
                title: "Logged to Mantle",
                description: `TX: ${analysis.transactionHash.slice(0, 12)}...`,
                timestamp: new Date(),
                status: "completed",
                icon: Link2,
                metadata: {
                    txHash: analysis.transactionHash,
                },
            })
        }

        if (analysis.ai.messages.length > 0) {
            const lastMessage = analysis.ai.messages[analysis.ai.messages.length - 1]
            if (lastMessage.role === "assistant") {
                newActivities.push({
                    id: `ai-${lastMessage.timestamp.getTime()}`,
                    type: "ai",
                    title: "AI Response Generated",
                    description: lastMessage.content.slice(0, 60) + "...",
                    timestamp: lastMessage.timestamp,
                    status: "completed",
                    icon: Sparkles,
                })
            }
        }

        // Sort by timestamp (newest first) and limit
        const sortedActivities = newActivities
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit)

        setActivities(sortedActivities)
    }, [analysis, limit])

    const getIconColor = (type: ActivityItem["type"]) => {
        switch (type) {
            case "contract":
                return STATUS_COLORS.info
            case "gas":
                return STATUS_COLORS.warning
            case "audit":
                return STATUS_COLORS.danger
            case "ai":
                return STATUS_COLORS.success
            case "report":
                return STATUS_COLORS.purple
            case "blockchain":
                return STATUS_COLORS.success
            default:
                return STATUS_COLORS.info
        }
    }

    const getStatusIcon = (status: ActivityItem["status"]) => {
        switch (status) {
            case "completed":
                return CheckCircle2
            case "pending":
                return Clock
            case "error":
                return Clock // You could add an error icon
            default:
                return Clock
        }
    }

    if (activities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-white/5 mb-4">
                    <Clock className={cn(ICON_SIZES.xl, "text-white/40")} />
                </div>
                <p className="text-white/60 font-medium">No activity yet</p>
                <p className="text-white/40 text-sm mt-2">
                    Upload a contract to get started
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-1">
            <AnimatePresence mode="popLayout">
                {activities.map((activity, index) => {
                    const colors = getIconColor(activity.type)
                    const Icon = activity.icon
                    const StatusIcon = getStatusIcon(activity.status)

                    return (
                        <motion.div
                            key={activity.id}
                            variants={ANIMATION_VARIANTS.fadeInUp}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ ...ANIMATION_TRANSITIONS.fast, delay: index * 0.05 }}
                            layout
                            className={cn(
                                "group relative flex items-start gap-3 p-4 rounded-xl transition-colors",
                                "hover:bg-white/5 cursor-pointer"
                            )}
                        >
                            {/* Timeline connector */}
                            {index < activities.length - 1 && (
                                <div className="absolute left-[22px] top-12 bottom-0 w-px bg-white/10" />
                            )}

                            {/* Icon */}
                            <div className={cn(
                                "relative z-10 p-2 rounded-lg shrink-0 transition-all duration-300",
                                colors.bg,
                                "group-hover:scale-110"
                            )}>
                                <Icon className={cn(ICON_SIZES.sm, colors.text)} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="font-semibold text-white text-sm">
                                        {activity.title}
                                    </h4>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <StatusIcon className={cn(ICON_SIZES.xs, STATUS_COLORS.success.text)} />
                                    </div>
                                </div>

                                <p className="text-xs text-white/60 mb-2">
                                    {activity.description}
                                </p>

                                {/* Metadata */}
                                {activity.metadata && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {activity.metadata.score !== undefined && (
                                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-[10px] font-semibold">
                                                <span className="text-white/40">Score:</span>
                                                <span className={colors.text}>{activity.metadata.score}</span>
                                            </div>
                                        )}
                                        {activity.metadata.issues !== undefined && (
                                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-[10px] font-semibold">
                                                <span className="text-white/40">Issues:</span>
                                                <span className={STATUS_COLORS.danger.text}>{activity.metadata.issues}</span>
                                            </div>
                                        )}
                                        {activity.metadata.savings && (
                                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-[10px] font-semibold">
                                                <span className="text-white/40">Savings:</span>
                                                <span className={STATUS_COLORS.success.text}>{activity.metadata.savings}</span>
                                            </div>
                                        )}
                                        {activity.metadata.txHash && (
                                            <button
                                                onClick={() => window.open(`https://explorer.mantle.xyz/tx/${activity.metadata!.txHash}`, "_blank")}
                                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-[10px] font-semibold hover:bg-white/10 transition-colors"
                                            >
                                                <span className="text-white/40">View TX</span>
                                                <Link2 className={cn(ICON_SIZES.xs, STATUS_COLORS.info.text)} />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Timestamp */}
                                <p className="text-[10px] text-white/40">
                                    {format(activity.timestamp, "MMM d, h:mm a")}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
