"use client"

import { motion } from "framer-motion"
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts"
import { SectionCard } from "@/components/shared/section-card"
import type { GasAnalysisData } from "./gas-profiler-experience"

interface GasChartsSectionProps {
    data: GasAnalysisData
}

export function GasChartsSection({ data }: GasChartsSectionProps) {
    // Bar chart data - function gas usage
    const barData = data.functions.map(func => ({
        name: func.name.split("(")[0], // Just function name without params
        gas: func.gas,
        optimized: func.estimatedSavings
            ? func.gas * (1 - parseInt(func.estimatedSavings) / 100)
            : func.gas
    }))

    // Pie chart data - fee composition
    const executionFee = data.totalGas * 0.000001 // Mock calculation
    const pieData = [
        { name: "Execution Fee", value: executionFee, percentage: (executionFee / (executionFee + data.daFee) * 100).toFixed(1) },
        { name: "DA Fee", value: data.daFee, percentage: (data.daFee / (executionFee + data.daFee) * 100).toFixed(1) }
    ]

    const COLORS = {
        execution: "#00FFB2",
        da: "#A855F7",
        optimized: "#00C2FF"
    }

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Function Gas Bar Chart */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <SectionCard
                    title="Function Gas Usage"
                    description="Current vs optimized gas consumption"
                >
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="currentGas" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={COLORS.execution} stopOpacity={0.8} />
                                        <stop offset="100%" stopColor={COLORS.execution} stopOpacity={0.3} />
                                    </linearGradient>
                                    <linearGradient id="optimizedGas" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={COLORS.optimized} stopOpacity={0.8} />
                                        <stop offset="100%" stopColor={COLORS.optimized} stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    angle={-15}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0f1725",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "12px",
                                        padding: "12px"
                                    }}
                                    labelStyle={{ color: "#fff", marginBottom: "8px" }}
                                    formatter={(value: number) => [value.toLocaleString(), ""]}
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: "20px" }}
                                    iconType="circle"
                                />
                                <Bar
                                    dataKey="gas"
                                    fill="url(#currentGas)"
                                    name="Current Gas"
                                    radius={[8, 8, 0, 0]}
                                />
                                <Bar
                                    dataKey="optimized"
                                    fill="url(#optimizedGas)"
                                    name="After Optimization"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </SectionCard>
            </motion.div>

            {/* Fee Breakdown Pie Chart */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <SectionCard
                    title="Mantle Fee Breakdown"
                    description="L2 cost composition"
                >
                    <div className="h-[350px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    <linearGradient id="executionGradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor={COLORS.execution} />
                                        <stop offset="100%" stopColor="#00D89E" />
                                    </linearGradient>
                                    <linearGradient id="daGradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor={COLORS.da} />
                                        <stop offset="100%" stopColor="#C084FC" />
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={(entry) => `${entry.percentage}%`}
                                    labelLine={false}
                                >
                                    <Cell fill="url(#executionGradient)" />
                                    <Cell fill="url(#daGradient)" />
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0f1725",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "12px",
                                        padding: "12px"
                                    }}
                                    formatter={(value: number) => [value.toFixed(4), "Cost"]}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Fee breakdown details */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                            <p className="text-xs text-muted-foreground mb-1">Execution Fee</p>
                            <p className="text-lg font-bold text-white tabular-nums">
                                {executionFee.toFixed(4)} ETH
                            </p>
                            <p className="text-xs text-emerald-400 mt-1">
                                {pieData[0].percentage}% of total
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                            <p className="text-xs text-muted-foreground mb-1">DA Fee</p>
                            <p className="text-lg font-bold text-white tabular-nums">
                                {data.daFee.toFixed(4)} ETH
                            </p>
                            <p className="text-xs text-purple-400 mt-1">
                                {pieData[1].percentage}% of total
                            </p>
                        </div>
                    </div>
                </SectionCard>
            </motion.div>
        </div>
    )
}
