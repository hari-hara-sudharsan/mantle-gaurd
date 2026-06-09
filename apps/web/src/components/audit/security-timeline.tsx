"use client"

import { motion } from "framer-motion"
import { CheckCircle, Loader2, Clock, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AuditState, AuditTimelineEntry } from "./audit-experience"

interface SecurityTimelineProps {
    auditState: AuditState
    timeline?: AuditTimelineEntry[]
}

const AUDIT_STEPS = [
    { key: "parsing", label: "Parsing contract structure" },
    { key: "analyzing", label: "Running security checks" },
    { key: "detecting", label: "Detecting vulnerabilities" },
    { key: "complete", label: "Generating security report" }
]

export function SecurityTimeline({ auditState, timeline }: SecurityTimelineProps) {
    const getCurrentStepIndex = () => {
        switch (auditState) {
            case "parsing":
                return 0
            case "analyzing":
                return 1
            case "detecting":
                return 2
            case "complete":
                return 3
            default:
                return -1
        }
    }

    const currentStep = getCurrentStepIndex()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-red-500/10">
                    <Shield className="w-5 h-5 text-red-400" />
                </div>
                <div>
                    <h3 className="font-semibold text-white">Security Analysis Progress</h3>
                    <p className="text-sm text-muted-foreground">
                        {auditState === "complete" ? "Analysis complete" : "AI scanning for vulnerabilities..."}
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {AUDIT_STEPS.map((step, index) => {
                    const isComplete = index < currentStep || auditState === "complete"
                    const isCurrent = index === currentStep
                    const isPending = index > currentStep && auditState !== "complete"

                    return (
                        <motion.div
                            key={step.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-4"
                        >
                            {/* Icon */}
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300",
                                isComplete && "bg-emerald-500/20 border border-emerald-500/30",
                                isCurrent && "bg-red-500/20 border border-red-500/30 animate-pulse",
                                isPending && "bg-white/5 border border-white/10"
                            )}>
                                {isComplete && (
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                )}
                                {isCurrent && (
                                    <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
                                )}
                                {isPending && (
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className={cn(
                                    "text-sm font-medium transition-colors",
                                    isComplete && "text-white",
                                    isCurrent && "text-red-400",
                                    isPending && "text-muted-foreground"
                                )}>
                                    {step.label}
                                </p>
                                {timeline && timeline[index] && isComplete && (
                                    <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">
                                        {timeline[index].time}
                                    </p>
                                )}
                            </div>

                            {/* Status indicator */}
                            {isCurrent && (
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="text-xs text-red-400 font-medium"
                                >
                                    Scanning...
                                </motion.div>
                            )}
                            {isComplete && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-xs text-emerald-400 font-medium"
                                >
                                    ✓ Complete
                                </motion.div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Progress bar */}
            <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Overall Progress</span>
                    <span className="text-xs font-semibold text-red-400 tabular-nums">
                        {auditState === "complete"
                            ? "100%"
                            : `${Math.round(((currentStep + 1) / AUDIT_STEPS.length) * 100)}%`}
                    </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: auditState === "complete"
                                ? "100%"
                                : `${((currentStep + 1) / AUDIT_STEPS.length) * 100}%`
                        }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-red-400 via-orange-400 to-red-400 rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    )
}