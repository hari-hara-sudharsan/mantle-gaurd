"use client"

import { motion } from "framer-motion"
import { Zap, Shield, MessageSquare, FileText, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function QuickActionsWidget() {
    const router = useRouter()

    const actions = [
        {
            label: "Gas Profiler",
            description: "Optimize costs",
            icon: Zap,
            color: "text-[#00C2FF]",
            bg: "bg-[#00C2FF]/10",
            border: "border-[#00C2FF]/20",
            onClick: () => router.push("/gas"),
        },
        {
            label: "Security Audit",
            description: "Find vulnerabilities",
            icon: Shield,
            color: "text-[#A855F7]",
            bg: "bg-[#A855F7]/10",
            border: "border-[#A855F7]/20",
            onClick: () => router.push("/audit"),
        },
        {
            label: "AI Copilot",
            description: "Ask questions",
            icon: MessageSquare,
            color: "text-[#FFD300]",
            bg: "bg-[#FFD300]/10",
            border: "border-[#FFD300]/20",
            onClick: () => router.push("/copilot"),
        },
        {
            label: "View Logs",
            description: "Activity history",
            icon: BarChart3,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            onClick: () => router.push("/logs"),
        },
    ]

    return (
        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Quick Actions</h2>
                <p className="text-sm text-white/50">
                    Jump to key features and workflows
                </p>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {actions.map((action, index) => {
                    const Icon = action.icon

                    return (
                        <motion.button
                            key={action.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            onClick={action.onClick}
                            className={cn(
                                "group relative rounded-xl border p-4 text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                                action.border,
                                action.bg
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "p-2 rounded-lg transition-transform duration-300 group-hover:scale-110",
                                    action.bg
                                )}>
                                    <Icon className={cn("w-5 h-5", action.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-white mb-0.5">
                                        {action.label}
                                    </h3>
                                    <p className="text-xs text-white/50">
                                        {action.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
