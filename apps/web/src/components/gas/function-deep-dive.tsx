"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Code, Zap, Database, Layers, Lightbulb, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { FunctionAnalysis } from "./gas-profiler-experience"

interface FunctionDeepDiveProps {
    func: FunctionAnalysis | null
    isOpen: boolean
    onClose: () => void
}

export function FunctionDeepDive({ func, isOpen, onClose }: FunctionDeepDiveProps) {
    if (!func) return null

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "border-red-500/30 text-red-400 bg-red-500/10"
            case "medium":
                return "border-amber-500/30 text-amber-400 bg-amber-500/10"
            default:
                return "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-background border-l border-white/10 shadow-2xl z-50 overflow-y-auto custom-scrollbar"
                    >
                        <div className="p-6 space-y-6">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Code className="w-5 h-5 text-primary" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Function Deep Dive</h2>
                                    </div>
                                    <p className="font-mono text-lg text-white/90">{func.name}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Severity Badge */}
                            <div>
                                <Badge variant="outline" className={cn("capitalize", getSeverityColor(func.severity))}>
                                    {func.severity} Severity
                                </Badge>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary" />
                                    Cost Breakdown
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap className="w-4 h-4 text-blue-400" />
                                            <p className="text-xs text-muted-foreground">Execution Cost</p>
                                        </div>
                                        <p className="text-2xl font-bold text-white tabular-nums">
                                            {func.gas.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">gas units</p>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Database className="w-4 h-4 text-purple-400" />
                                            <p className="text-xs text-muted-foreground">DA Fee</p>
                                        </div>
                                        <p className="text-2xl font-bold text-white tabular-nums">
                                            {func.daFee.toFixed(4)}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">ETH</p>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Layers className="w-4 h-4 text-emerald-400" />
                                            <p className="text-xs text-muted-foreground">Total Cost</p>
                                        </div>
                                        <p className="text-2xl font-bold text-white tabular-nums">
                                            {func.total.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">combined</p>
                                    </div>

                                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                                            <p className="text-xs text-emerald-400">Savings</p>
                                        </div>
                                        <p className="text-2xl font-bold text-emerald-400 tabular-nums">
                                            {func.estimatedSavings || "0%"}
                                        </p>
                                        <p className="text-xs text-emerald-400/80 mt-1">potential</p>
                                    </div>
                                </div>
                            </div>

                            {/* Function Explanation */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-amber-400" />
                                    AI Analysis
                                </h3>

                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-sm font-semibold text-primary mb-2">What&apos;s happening</p>
                                    <p className="text-white/80 leading-relaxed">
                                        {func.explanation}
                                    </p>
                                </div>
                            </div>

                            {/* Optimization Ideas */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Optimization Suggestion
                                </h3>

                                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-5">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-primary/20">
                                            <Lightbulb className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-primary mb-2">Recommended Fix</p>
                                            <p className="text-white/90 leading-relaxed">
                                                {func.optimization}
                                            </p>
                                        </div>
                                    </div>

                                    {func.estimatedSavings && (
                                        <div className="pt-4 border-t border-white/10">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-white/70">Estimated Impact:</span>
                                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-base font-bold">
                                                    -{func.estimatedSavings} gas
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Explain Like I'm New */}
                            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-amber-400 mb-2">
                                            Why is this expensive?
                                        </p>
                                        <p className="text-sm text-white/80 leading-relaxed">
                                            {func.severity === "high"
                                                ? "This function performs operations that are computationally expensive on the blockchain. Storage writes, loops, and external calls all consume significant gas."
                                                : func.severity === "medium"
                                                    ? "This function has moderate gas costs. While not critical, optimizations could still provide meaningful savings."
                                                    : "This function is relatively efficient. The gas costs are within expected ranges for this type of operation."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
