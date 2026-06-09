"use client"

import { motion } from "framer-motion"
import { AlertTriangle, AlertCircle, AlertOctagon, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SecurityIssue } from "./audit-experience"

interface AuditOverviewCardsProps {
    issues: SecurityIssue[]
}

export function AuditOverviewCards({ issues }: AuditOverviewCardsProps) {
    const criticalCount = issues.filter(issue => issue.severity === "critical").length
    const highCount = issues.filter(issue => issue.severity === "high").length
    const mediumCount = issues.filter(issue => issue.severity === "medium").length
    const lowCount = issues.filter(issue => issue.severity === "low").length

    const cards = [
        {
            severity: "Critical Issues",
            count: criticalCount,
            icon: AlertOctagon,
            color: "text-red-400",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/20",
            glowColor: "shadow-red-500/20",
            description: "Immediate attention required"
        },
        {
            severity: "High Issues",
            count: highCount,
            icon: AlertTriangle,
            color: "text-orange-400",
            bgColor: "bg-orange-500/10",
            borderColor: "border-orange-500/20",
            glowColor: "shadow-orange-500/20",
            description: "Significant security risks"
        },
        {
            severity: "Medium Issues",
            count: mediumCount,
            icon: AlertCircle,
            color: "text-amber-400",
            bgColor: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
            glowColor: "shadow-amber-500/20",
            description: "Moderate security concerns"
        },
        {
            severity: "Low Issues",
            count: lowCount,
            icon: Info,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            glowColor: "shadow-blue-500/20",
            description: "Minor improvements suggested"
        }
    ]

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon

                return (
                    <motion.div
                        key={card.severity}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className={cn(
                            "group relative rounded-2xl border backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-2xl cursor-pointer",
                            card.borderColor,
                            card.bgColor,
                            card.glowColor
                        )}
                    >
                        {/* Glow effect on hover */}
                        <div className={cn(
                            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10",
                            card.bgColor
                        )} />

                        {/* Icon */}
                        <div className={cn(
                            "inline-flex p-3 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110",
                            card.bgColor
                        )}>
                            <Icon className={cn("w-6 h-6", card.color)} />
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                {card.severity}
                            </p>

                            <motion.p
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                className="text-5xl font-bold text-white tabular-nums leading-none"
                            >
                                {card.count}
                            </motion.p>

                            <p className={cn("text-xs font-medium", card.color)}>
                                {card.description}
                            </p>
                        </div>

                        {/* Pulse animation for critical issues */}
                        {card.severity === "Critical Issues" && card.count > 0 && (
                            <motion.div
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"
                            />
                        )}

                        {/* Animated border gradient */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                )
            })}
        </div>
    )
}