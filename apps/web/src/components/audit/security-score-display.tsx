"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle, XCircle, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface SecurityScoreDisplayProps {
    score: number
    breakdown: {
        accessControl: number
        reentrancy: number
        storageSafety: number
        inputValidation: number
        mantleCompatibility: number
    }
}

export function SecurityScoreDisplay({ score, breakdown }: SecurityScoreDisplayProps) {
    const getScoreColor = (value: number) => {
        if (value >= 90) return "text-emerald-400"
        if (value >= 75) return "text-amber-400"
        if (value >= 50) return "text-orange-400"
        return "text-red-400"
    }

    const getScoreGradient = (value: number) => {
        if (value >= 90) return "from-emerald-500/20 to-emerald-500/5"
        if (value >= 75) return "from-amber-500/20 to-amber-500/5"
        if (value >= 50) return "from-orange-500/20 to-orange-500/5"
        return "from-red-500/20 to-red-500/5"
    }

    const getScoreIcon = (value: number) => {
        if (value >= 90) return CheckCircle
        if (value >= 75) return AlertTriangle
        if (value >= 50) return AlertTriangle
        return XCircle
    }

    const categories = [
        {
            label: "Access Control",
            value: breakdown.accessControl,
            icon: Shield,
            description: "Function permissions and ownership"
        },
        {
            label: "Reentrancy",
            value: breakdown.reentrancy,
            icon: AlertTriangle,
            description: "External call safety patterns"
        },
        {
            label: "Storage Safety",
            value: breakdown.storageSafety,
            icon: Target,
            description: "State variable security"
        },
        {
            label: "Input Validation",
            value: breakdown.inputValidation,
            icon: CheckCircle,
            description: "Parameter checking and validation"
        },
        {
            label: "Mantle Compatibility",
            value: breakdown.mantleCompatibility,
            icon: Shield,
            description: "L2-specific security considerations"
        }
    ]

    const ScoreIcon = getScoreIcon(score)

    return (
        <div className="space-y-8">
            {/* Main Security Score */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={cn(
                    "relative rounded-3xl border bg-gradient-to-br backdrop-blur-sm p-8 overflow-hidden",
                    getScoreGradient(score),
                    score >= 90 ? "border-emerald-500/20" :
                        score >= 75 ? "border-amber-500/20" :
                            score >= 50 ? "border-orange-500/20" :
                                "border-red-500/20"
                )}
            >
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <ScoreIcon className={cn("w-8 h-8", getScoreColor(score))} />
                            <div>
                                <h2 className="text-3xl font-bold text-white">Security Score</h2>
                                <p className="text-sm text-white/70">
                                    AI-powered vulnerability assessment
                                </p>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className={cn("text-7xl font-bold tabular-nums", getScoreColor(score))}
                            >
                                {score}
                            </motion.span>
                            <span className="text-2xl text-white/60 font-medium">/100</span>
                        </div>

                        <p className="text-sm text-white/60 mt-2">
                            {score >= 90 ? "Excellent security posture" :
                                score >= 75 ? "Good security with minor issues" :
                                    score >= 50 ? "Moderate security risks detected" :
                                        "Critical security vulnerabilities found"}
                        </p>
                    </div>

                    {/* Circular Progress */}
                    <div className="relative">
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="85"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="8"
                                fill="none"
                            />
                            <motion.circle
                                cx="96"
                                cy="96"
                                r="85"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 85}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - score / 100) }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                                className={getScoreColor(score)}
                            />
                        </svg>
                    </div>
                </div>

                {/* Background glow */}
                <div className={cn(
                    "absolute inset-0 opacity-20 blur-3xl",
                    score >= 90 ? "bg-emerald-500" :
                        score >= 75 ? "bg-amber-500" :
                            score >= 50 ? "bg-orange-500" :
                                "bg-red-500"
                )} />
            </motion.div>

            {/* Category Breakdown */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    Security Categories
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    {categories.map((category, index) => {
                        const Icon = category.icon

                        return (
                            <motion.div
                                key={category.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{category.label}</p>
                                            <p className="text-xs text-muted-foreground">{category.description}</p>
                                        </div>
                                    </div>
                                    <span className={cn("text-3xl font-bold tabular-nums", getScoreColor(category.value))}>
                                        {category.value}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${category.value}%` }}
                                        transition={{ duration: 1.2, delay: index * 0.1 + 0.5 }}
                                        className={cn(
                                            "h-full rounded-full",
                                            category.value >= 90 ? "bg-emerald-400" :
                                                category.value >= 75 ? "bg-amber-400" :
                                                    category.value >= 50 ? "bg-orange-400" :
                                                        "bg-red-400"
                                        )}
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}