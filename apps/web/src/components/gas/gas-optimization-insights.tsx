"use client"

import { motion } from "framer-motion"
import { Sparkles, AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionCard } from "@/components/shared/section-card"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import type { OptimizationSuggestion } from "./gas-profiler-experience"

interface GasOptimizationInsightsProps {
    optimizations: OptimizationSuggestion[]
}

export function GasOptimizationInsights({ optimizations }: GasOptimizationInsightsProps) {
    const handleApplySuggestion = (optimization: OptimizationSuggestion) => {
        toast.success("Optimization applied to contract", {
            description: `${optimization.suggestion.substring(0, 50)}...`
        })
    }

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case "high":
                return <AlertCircle className="w-5 h-5" />
            case "medium":
                return <AlertTriangle className="w-5 h-5" />
            case "low":
                return <Info className="w-5 h-5" />
            default:
                return <Info className="w-5 h-5" />
        }
    }

    const getSeverityColors = (severity: string) => {
        switch (severity) {
            case "high":
                return {
                    bg: "bg-red-500/10",
                    border: "border-red-500/20",
                    text: "text-red-400",
                    badge: "border-red-500/30 text-red-400 bg-red-500/10"
                }
            case "medium":
                return {
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/20",
                    text: "text-amber-400",
                    badge: "border-amber-500/30 text-amber-400 bg-amber-500/10"
                }
            case "low":
                return {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                    text: "text-blue-400",
                    badge: "border-blue-500/30 text-blue-400 bg-blue-500/10"
                }
            default:
                return {
                    bg: "bg-white/5",
                    border: "border-white/10",
                    text: "text-white",
                    badge: "border-white/20 text-white/80 bg-white/5"
                }
        }
    }

    return (
        <SectionCard
            title="AI Optimization Recommendations"
            description="Intelligent suggestions to reduce gas costs"
            icon={<Sparkles className="w-6 h-6 text-primary animate-pulse" />}
        >
            <div className="space-y-4">
                {optimizations.map((optimization, index) => {
                    const colors = getSeverityColors(optimization.severity)

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={cn(
                                "group relative rounded-3xl border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
                                colors.border,
                                colors.bg
                            )}
                        >
                            {/* Glow effect on hover */}
                            <div className={cn(
                                "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10",
                                colors.bg
                            )} />

                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className={cn(
                                    "p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110",
                                    colors.bg,
                                    colors.text
                                )}>
                                    {getSeverityIcon(optimization.severity)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <Badge
                                                    variant="outline"
                                                    className={cn("capitalize", colors.badge)}
                                                >
                                                    {optimization.severity} Priority
                                                </Badge>
                                                {optimization.line && (
                                                    <span className="text-xs text-muted-foreground">
                                                        Line {optimization.line}
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="font-semibold text-white leading-relaxed">
                                                {optimization.problem}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Suggestion */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                            <p className="text-xs font-medium text-primary uppercase tracking-wider">
                                                Recommended Fix
                                            </p>
                                        </div>
                                        <p className="text-sm text-white/90 leading-relaxed pl-6">
                                            {optimization.suggestion}
                                        </p>
                                    </div>

                                    {/* Savings */}
                                    <div className="flex items-center justify-between gap-4 pt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground">
                                                Estimated Savings:
                                            </span>
                                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-semibold">
                                                {optimization.estimatedSavings}
                                            </Badge>
                                        </div>

                                        <Button
                                            size="sm"
                                            onClick={() => handleApplySuggestion(optimization)}
                                            className="gap-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50"
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            Apply Suggestion
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Animated border on hover */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    )
                })}
            </div>

            {/* Summary */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-primary/10 via-[#00C2FF]/10 to-primary/10 border border-primary/20"
            >
                <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-white">AI Analysis Summary</h4>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                    Found <span className="font-semibold text-primary">{optimizations.length} optimization opportunities</span> that could reduce your total gas consumption by an estimated{" "}
                    <span className="font-semibold text-emerald-400">
                        {optimizations.reduce((sum, opt) => {
                            const match = opt.estimatedSavings.match(/-?(\d+)%/)
                            return sum + (match ? parseInt(match[1]) : 0)
                        }, 0)}%
                    </span>.
                    Implementing these changes will improve your contract efficiency and reduce deployment costs on Mantle.
                </p>
            </motion.div>
        </SectionCard>
    )
}
