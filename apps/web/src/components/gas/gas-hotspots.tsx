"use client"

import { motion } from "framer-motion"
import { Flame, TrendingUp, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface GasHotspot {
    functionName: string
    gasCost: number
    severity: "critical" | "high" | "medium" | "low"
    potentialSavings: string
    issue: string
}

interface GasHotspotsProps {
    hotspots: GasHotspot[]
}

export function GasHotspots({ hotspots }: GasHotspotsProps) {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical":
                return {
                    bg: "bg-red-500/10",
                    border: "border-red-500/30",
                    text: "text-red-400",
                    badge: "bg-red-500/10 text-red-400 border-red-500/30"
                }
            case "high":
                return {
                    bg: "bg-orange-500/10",
                    border: "border-orange-500/30",
                    text: "text-orange-400",
                    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30"
                }
            case "medium":
                return {
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/30",
                    text: "text-amber-400",
                    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }
            default:
                return {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/30",
                    text: "text-blue-400",
                    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30"
                }
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-orange-500/10">
                    <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Gas Hotspots</h3>
                    <p className="text-sm text-muted-foreground">
                        Top expensive functions requiring optimization
                    </p>
                </div>
            </div>

            <div className="grid gap-4">
                {hotspots.map((hotspot, index) => {
                    const colors = getSeverityColor(hotspot.severity)

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={cn(
                                "group relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-xl",
                                colors.border,
                                colors.bg
                            )}
                        >
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge variant="outline" className={cn("capitalize text-xs", colors.badge)}>
                                            {hotspot.severity}
                                        </Badge>
                                        {index === 0 && (
                                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
                                                #1 Hotspot
                                            </Badge>
                                        )}
                                    </div>
                                    <h4 className="font-mono font-bold text-white text-lg mb-1">
                                        {hotspot.functionName}
                                    </h4>
                                    <p className="text-sm text-white/70">
                                        {hotspot.issue}
                                    </p>
                                </div>

                                <div className="text-right shrink-0">
                                    <p className="text-xs text-muted-foreground mb-1">Gas Cost</p>
                                    <p className={cn("text-2xl font-bold tabular-nums", colors.text)}>
                                        {hotspot.gasCost.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                    <span className="text-xs text-muted-foreground">Potential Savings:</span>
                                </div>
                                <span className="text-sm font-semibold text-emerald-400">
                                    {hotspot.potentialSavings}
                                </span>
                            </div>

                            {/* Hover gradient */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    )
                })}
            </div>

            {/* Summary */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/20"
            >
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-white mb-1">Optimization Priority</h4>
                        <p className="text-sm text-white/80 leading-relaxed">
                            These {hotspots.length} functions consume{" "}
                            <span className="font-semibold text-orange-400">
                                {hotspots.reduce((sum, h) => sum + h.gasCost, 0).toLocaleString()} gas
                            </span>
                            . Optimizing them could reduce your total deployment cost by up to{" "}
                            <span className="font-semibold text-emerald-400">
                                {Math.round(hotspots.reduce((sum, h) => sum + parseInt(h.potentialSavings), 0) / hotspots.length)}%
                            </span>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
