"use client"

import { motion } from "framer-motion"
import { FileCode, Shield, Zap, MessageSquare, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAnalysis } from "@/providers/analysis-provider"
import { formatDistanceToNow } from "date-fns"

interface TimelineEvent {
    id: string
    type: "contract" | "gas" | "audit" | "ai" | "complete"
    title: string
    description: string
    timestamp: Date
    icon: any
    color: string
}

export function ActivityTimelineWidget() {
    const { analysis, hasAnalysis } = useAnalysis()

    // Build timeline from analysis data
    const events: TimelineEvent[] = []

    if (analysis.contract) {
        events.push({
            id: "contract-upload",
            type: "contract",
            title: "Contract Uploaded",
            description: `${analysis.contract.name} ready for analysis`,
            timestamp: analysis.contract.uploadedAt,
            icon: FileCode,
            color: "text-[#00FFB2]",
        })
    }

    if (analysis.gas) {
        events.push({
            id: "gas-analysis",
            type: "gas",
            title: "Gas Analysis Complete",
            description: `Optimization score: ${analysis.gas.optimizationScore}%`,
            timestamp: analysis.lastUpdated,
            icon: Zap,
            color: "text-[#00C2FF]",
        })
    }

    if (analysis.audit) {
        events.push({
            id: "audit-complete",
            type: "audit",
            title: "Security Audit Complete",
            description: `Security score: ${analysis.audit.securityScore}% - ${analysis.audit.riskLevel} risk`,
            timestamp: analysis.lastUpdated,
            icon: Shield,
            color: "text-[#A855F7]",
        })
    }

    if (analysis.ai.messages.length > 0) {
        const lastMessage = analysis.ai.messages[analysis.ai.messages.length - 1]
        events.push({
            id: "ai-message",
            type: "ai",
            title: "AI Copilot Conversation",
            description: `${analysis.ai.messages.length} messages exchanged`,
            timestamp: lastMessage.timestamp,
            icon: MessageSquare,
            color: "text-[#FFD300]",
        })
    }

    // Sort by timestamp descending
    events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    return (
        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Activity Timeline</h2>
                <p className="text-sm text-white/50">
                    Recent analysis and AI interactions
                </p>
            </div>

            {/* Timeline */}
            {hasAnalysis && events.length > 0 ? (
                <div className="space-y-4">
                    {events.map((event, index) => {
                        const Icon = event.icon

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="relative flex gap-4"
                            >
                                {/* Timeline line */}
                                {index < events.length - 1 && (
                                    <div className="absolute left-[19px] top-10 bottom-0 w-px bg-white/10" />
                                )}

                                {/* Icon */}
                                <div className={cn(
                                    "relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center"
                                )}>
                                    <Icon className={cn("w-5 h-5", event.color)} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-6">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="text-sm font-semibold text-white">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-white/40">
                                            <Clock className="w-3 h-3" />
                                            {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/60">
                                        {event.description}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}

                    {/* Completion indicator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: events.length * 0.1 + 0.2, duration: 0.4 }}
                        className="flex items-center gap-3 rounded-lg bg-[#00FFB2]/10 border border-[#00FFB2]/20 p-3"
                    >
                        <CheckCircle2 className="w-5 h-5 text-[#00FFB2] flex-shrink-0" />
                        <div className="text-xs text-white/70">
                            Analysis pipeline complete - all systems operational
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                        <Clock className="w-6 h-6 text-white/30" />
                    </div>
                    <p className="text-sm text-white/50 mb-1">No activity yet</p>
                    <p className="text-xs text-white/30">
                        Upload a contract to start tracking
                    </p>
                </div>
            )}
        </div>
    )
}
