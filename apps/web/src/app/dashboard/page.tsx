"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { SectionCard } from "@/components/shared/section-card"
import { PageHeader } from "@/components/shared/page-header"
import { Activity, DollarSign, ShieldCheck, TrendingUp, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAnalysis } from "@/providers/analysis-provider"
import { HealthScoreWidget } from "@/components/dashboard/health-score-widget"
import { PriorityQueueWidget } from "@/components/dashboard/priority-queue-widget"
import { ActivityTimelineWidget } from "@/components/dashboard/activity-timeline-widget"
import { AIInsightsWidget } from "@/components/dashboard/ai-insights-widget"
import { QuickActionsWidget } from "@/components/dashboard/quick-actions-widget"
import { ActivityFeed } from "@/components/shared/activity-feed"
import { ANIMATION_VARIANTS, ANIMATION_TRANSITIONS, STATUS_COLORS } from "@/lib/design-system"

const chartData = [
    { time: "00:00", score: 88, savings: 2.1 },
    { time: "03:00", score: 92, savings: 4.4 },
    { time: "06:00", score: 94, savings: 5.8 },
    { time: "09:00", score: 96, savings: 7.2 },
    { time: "12:00", score: 98, savings: 9.1 },
    { time: "15:00", score: 96, savings: 8.6 },
    { time: "18:00", score: 97, savings: 9.8 },
]

const fetchDashboardSummary = async () => {
    return {
        activeAudits: 4,
        gasSavings: "21%",
        networkHealth: "Nominal",
        recommendations: 6,
        findings: [
            "No critical vulnerabilities found in the latest audit.",
            "Gas hotspot detected in BridgeRouter.sol.",
            "DA fee projection updated for the next epoch.",
        ],
        actions: [
            "Review pending security alert for vault-v2.",
            "Approve recommended gas optimizations.",
            "Sync wallet and verify contract owners.",
        ],
    }
}

export default function DashboardPage() {
    const { analysis, hasAnalysis } = useAnalysis()

    const { data } = useQuery({
        queryKey: ["dashboard", "summary"],
        queryFn: fetchDashboardSummary,
    })

    const stats = useMemo(
        () => [
            {
                title: "Active Audits",
                subtitle: "SECURITY OVERVIEW",
                value: data?.activeAudits ?? 4,
                description: "Track contract security and remediation status in real time.",
                icon: ShieldCheck,
                ...STATUS_COLORS.success,
            },
            {
                title: "Gas Savings",
                subtitle: "PROJECTED IMPACT",
                value: data?.gasSavings ?? "21%",
                description: "Estimated gas reduction through optimizations.",
                icon: DollarSign,
                ...STATUS_COLORS.info,
            },
            {
                title: "Network Health",
                subtitle: "MANTLE STATUS",
                value: data?.networkHealth ?? "Nominal",
                description: "Real-time Mantle network performance metrics.",
                icon: Activity,
                ...STATUS_COLORS.warning,
            },
            {
                title: "Optimization",
                subtitle: "RECOMMENDED FIXES",
                value: data?.recommendations ?? 6,
                description: "AI-generated improvements ready to apply.",
                icon: TrendingUp,
                ...STATUS_COLORS.purple,
            },
        ],
        [data]
    )

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="border-b border-white/5 bg-gradient-to-b from-background via-background to-transparent">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10"
                        >
                            Dashboard
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            MantleGuard AI Security Suite
                        </h1>
                        <p className="text-lg text-white/70 max-w-3xl mx-auto">
                            Unified intelligence platform for gas optimization, security auditing, and AI-powered assistance on Mantle Network.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Day 8 Unified Intelligence Section */}
                {hasAnalysis ? (
                    <>
                        {/* Health Score Hero */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={ANIMATION_TRANSITIONS.default}
                            className="mb-8"
                        >
                            <HealthScoreWidget />
                        </motion.div>

                        {/* Intelligence Grid */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ ...ANIMATION_TRANSITIONS.default, delay: 0.1 }}
                            className="grid gap-6 lg:grid-cols-2 mb-8"
                        >
                            <PriorityQueueWidget />
                            <AIInsightsWidget />
                        </motion.div>

                        {/* Activity & Actions */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ ...ANIMATION_TRANSITIONS.default, delay: 0.2 }}
                            className="grid gap-6 lg:grid-cols-2 mb-8"
                        >
                            <SectionCard
                                title="Recent Activity"
                                description="Your latest analysis events"
                                icon={<Activity className="w-6 h-6 text-primary" />}
                            >
                                <ActivityFeed limit={5} />
                            </SectionCard>
                            <QuickActionsWidget />
                        </motion.div>
                    </>
                ) : (
                    /* Empty State - No Analysis Yet */
                    <motion.div
                        variants={ANIMATION_VARIANTS.scaleIn}
                        initial="hidden"
                        animate="visible"
                        transition={ANIMATION_TRANSITIONS.spring}
                        className="mb-8"
                    >
                        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ ...ANIMATION_TRANSITIONS.springBounce, delay: 0.2 }}
                                className="inline-flex p-6 rounded-full bg-[#00FFB2]/10 mb-6"
                            >
                                <ShieldCheck className="w-12 h-12 text-[#00FFB2]" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-white mb-3">
                                Welcome to MantleGuard
                            </h2>
                            <p className="text-white/60 mb-8 max-w-md mx-auto">
                                Upload a smart contract to start analyzing gas costs, security vulnerabilities, and get AI-powered recommendations.
                            </p>
                            <QuickActionsWidget />
                        </div>
                    </motion.div>
                )}

                {/* Stats Cards - Always Visible */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon

                        return (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={cn(
                                    "group relative rounded-2xl border bg-black/40 backdrop-blur-sm px-5 py-6 transition-all duration-300 hover:bg-black/60 hover:shadow-2xl",
                                    stat.border
                                )}
                            >
                                {/* Icon */}
                                <div className={cn(
                                    "inline-flex p-3 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110",
                                    stat.bg
                                )}>
                                    <Icon className={cn("w-6 h-6", stat.text)} />
                                </div>

                                {/* Content */}
                                <div className="space-y-2.5">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                                            {stat.title}
                                        </h3>
                                        <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                                            {stat.subtitle}
                                        </p>
                                    </div>

                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                        className="py-2"
                                    >
                                        <p className="text-4xl font-bold text-white tabular-nums leading-none">
                                            {stat.value}
                                        </p>
                                    </motion.div>

                                    <p className="text-xs text-white/50 leading-relaxed">
                                        {stat.description}
                                    </p>
                                </div>

                                {/* Hover gradient border effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        )
                    })}
                </div>

                {/* Vertical Stack - Security Trend, Recent Findings, Action Items */}
                <div className="mt-10 space-y-6">
                    {/* Security Trend - Clean Area Chart */}
                    <SectionCard title="Security Trend" description="Audit score and savings over time">
                        <div className="h-[360px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00FFB2" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#00FFB2" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid stroke="#ffffff20" strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="time"
                                        tickLine={false}
                                        axisLine={{ stroke: "#ffffff20" }}
                                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={{ stroke: "#ffffff20" }}
                                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    />
                                    <Tooltip
                                        wrapperStyle={{ background: "#0f1725", border: "1px solid rgba(255,255,255,0.08)" }}
                                        contentStyle={{ backgroundColor: "#111827", border: "none", borderRadius: "8px" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#00FFB2"
                                        fill="url(#scoreGradient)"
                                        fillOpacity={1}
                                        strokeWidth={2}
                                        dot={{ fill: "#00FFB2", strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>

                    {/* Recent Findings - Grid Layout */}
                    <SectionCard title="Recent Findings" description="Latest audit results">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {data?.findings.map((item, idx) => (
                                <div key={idx} className="rounded-2xl bg-white/5 p-4 text-white hover:bg-white/10 transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Action Items - Grid Layout */}
                    <SectionCard title="Action Items" description="Priority tasks">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {data?.actions.map((item, idx) => (
                                <div key={idx} className="rounded-2xl bg-white/5 p-4 text-white hover:bg-white/10 transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            </div>
        </div>
    )
}
