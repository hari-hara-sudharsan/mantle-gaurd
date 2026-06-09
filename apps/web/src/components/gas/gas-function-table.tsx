"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Info, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionCard } from "@/components/shared/section-card"
import { cn } from "@/lib/utils"
import type { FunctionAnalysis } from "./gas-profiler-experience"

interface GasFunctionTableProps {
    functions: FunctionAnalysis[]
    onFunctionClick?: (func: FunctionAnalysis) => void
}

export function GasFunctionTable({ functions, onFunctionClick }: GasFunctionTableProps) {
    const [expandedRow, setExpandedRow] = useState<number | null>(null)
    const [sortBy, setSortBy] = useState<"name" | "gas" | "severity">("gas")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

    const toggleRow = (index: number) => {
        setExpandedRow(expandedRow === index ? null : index)
    }

    const handleSort = (column: typeof sortBy) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(column)
            setSortOrder("desc")
        }
    }

    const sortedFunctions = [...functions].sort((a, b) => {
        let comparison = 0

        switch (sortBy) {
            case "name":
                comparison = a.name.localeCompare(b.name)
                break
            case "gas":
                comparison = a.total - b.total
                break
            case "severity": {
                const severityOrder = { low: 0, medium: 1, high: 2 }
                comparison = severityOrder[a.severity] - severityOrder[b.severity]
                break
            }
        }

        return sortOrder === "asc" ? comparison : -comparison
    })

    return (
        <SectionCard
            title="Function-level Analysis"
            description="Detailed gas breakdown for each contract function"
        >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                <button
                                    onClick={() => handleSort("name")}
                                    className="flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    Function
                                    {sortBy === "name" && (
                                        <span className="text-primary">{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </button>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                                <button
                                    onClick={() => handleSort("gas")}
                                    className="flex items-center gap-2 ml-auto hover:text-white transition-colors"
                                >
                                    Gas Used
                                    {sortBy === "gas" && (
                                        <span className="text-primary">{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </button>
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                                DA Fee
                            </th>
                            <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                                Total Cost
                            </th>
                            <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                                <button
                                    onClick={() => handleSort("severity")}
                                    className="flex items-center gap-2 mx-auto hover:text-white transition-colors"
                                >
                                    Severity
                                    {sortBy === "severity" && (
                                        <span className="text-primary">{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </button>
                            </th>
                            <th className="w-16 py-4 px-4 text-sm font-medium text-muted-foreground text-center">
                                View
                            </th>
                            <th className="w-16"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedFunctions.map((func, index) => (
                            <motion.tr
                                key={`${func.name}-${index}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <td colSpan={7} className="p-0">
                                    <div className={cn(
                                        "border-b border-white/5 transition-colors",
                                        expandedRow === index && "bg-white/5"
                                    )}>
                                        <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto] items-center gap-4 py-4 px-4">
                                            <button
                                                onClick={() => onFunctionClick?.(func)}
                                                className={cn(
                                                    "font-mono text-sm font-medium transition-all text-left px-3 py-1.5 rounded-md",
                                                    func.name.length <= 10
                                                        ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                                                        : func.name.length <= 18
                                                            ? "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                                                            : "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                                                )}
                                            >
                                                {func.name}
                                            </button>

                                            <div className="text-right tabular-nums text-sm text-white">
                                                {func.gas.toLocaleString()}
                                            </div>

                                            <div className="text-right tabular-nums text-sm text-muted-foreground">
                                                {func.daFee.toFixed(4)}
                                            </div>

                                            <div className="text-right tabular-nums text-sm font-semibold text-white">
                                                {func.total.toLocaleString()}
                                            </div>

                                            <div className="flex justify-center">
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "capitalize",
                                                        func.severity === "low" && "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
                                                        func.severity === "medium" && "border-amber-500/30 text-amber-400 bg-amber-500/10",
                                                        func.severity === "high" && "border-red-500/30 text-red-400 bg-red-500/10"
                                                    )}
                                                >
                                                    {func.severity}
                                                </Badge>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onFunctionClick?.(func)
                                                }}
                                                className="w-10 h-10 p-0"
                                                title="View function details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleRow(index)
                                                }}
                                                className="w-10 h-10 p-0"
                                                title="View details"
                                            >
                                                {expandedRow === index ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>

                                        <AnimatePresence>
                                            {expandedRow === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-6 pt-2 bg-white/[0.02] border-t border-white/5">
                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            <div className="space-y-3">
                                                                <div className="flex items-start gap-2">
                                                                    <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                                                    <div>
                                                                        <p className="text-xs font-medium text-muted-foreground mb-1">
                                                                            Explanation
                                                                        </p>
                                                                        <p className="text-sm text-white/80">
                                                                            {func.explanation}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-3">
                                                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                                                                    <p className="text-xs font-medium text-muted-foreground mb-2">
                                                                        Optimization Suggestion
                                                                    </p>
                                                                    <p className="text-sm text-white/90 mb-3">
                                                                        {func.optimization}
                                                                    </p>
                                                                    {func.estimatedSavings && (
                                                                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                                                            Savings: {func.estimatedSavings}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {sortedFunctions.map((func, index) => (
                    <motion.div
                        key={`${func.name}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <p className="font-mono text-sm font-medium text-white flex-1">
                                {func.name}
                            </p>
                            <Badge
                                variant="outline"
                                className={cn(
                                    "capitalize shrink-0",
                                    func.severity === "low" && "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
                                    func.severity === "medium" && "border-amber-500/30 text-amber-400 bg-amber-500/10",
                                    func.severity === "high" && "border-red-500/30 text-red-400 bg-red-500/10"
                                )}
                            >
                                {func.severity}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Gas</p>
                                <p className="font-semibold text-white tabular-nums">{func.gas.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">DA Fee</p>
                                <p className="font-semibold text-white tabular-nums">{func.daFee.toFixed(4)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Total</p>
                                <p className="font-semibold text-white tabular-nums">{func.total.toLocaleString()}</p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRow(index)}
                            className="w-full gap-2"
                        >
                            {expandedRow === index ? (
                                <>Less details <ChevronUp className="w-4 h-4" /></>
                            ) : (
                                <>More details <ChevronDown className="w-4 h-4" /></>
                            )}
                        </Button>

                        <AnimatePresence>
                            {expandedRow === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-3 pt-3 border-t border-white/10"
                                >
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground mb-1">Explanation</p>
                                        <p className="text-sm text-white/80">{func.explanation}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground mb-1">Optimization</p>
                                        <p className="text-sm text-white/80">{func.optimization}</p>
                                    </div>
                                    {func.estimatedSavings && (
                                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                            Savings: {func.estimatedSavings}
                                        </Badge>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </SectionCard>
    )
}
