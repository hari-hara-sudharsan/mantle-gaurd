"use client"

import { motion } from "framer-motion"
import { SectionCard } from "@/components/shared/section-card"
import { Badge } from "@/components/ui/badge"
import {
    Brain,
    Zap,
    AlertTriangle,
    Shield,
    Target,
    TrendingUp,
    Clock,
    DollarSign
} from "lucide-react"
import { SecurityIssue } from "./audit-experience"

interface SecurityReasoningEngineProps {
    issues: SecurityIssue[]
}

export function SecurityReasoningEngine({ issues }: SecurityReasoningEngineProps) {
    const getSeverityReasoningFactors = (issue: SecurityIssue) => {
        const factors = []

        if (issue.severity === "critical") {
            factors.push(
                { factor: "Assets at Risk", value: "High", icon: "💰", color: "text-red-400" },
                { factor: "Public Access", value: "Yes", icon: "🌐", color: "text-red-400" },
                { factor: "Easy Exploitability", value: "Yes", icon: "⚡", color: "text-red-400" },
                { factor: "Impact Scope", value: "All Users", icon: "👥", color: "text-red-400" }
            )
        } else if (issue.severity === "high") {
            factors.push(
                { factor: "Financial Impact", value: "Medium", icon: "💳", color: "text-orange-400" },
                { factor: "Access Required", value: "Public", icon: "🔓", color: "text-orange-400" },
                { factor: "Skill Level", value: "Low", icon: "🎯", color: "text-orange-400" },
                { factor: "Detection Risk", value: "Low", icon: "👁️", color: "text-orange-400" }
            )
        } else if (issue.severity === "medium") {
            factors.push(
                { factor: "Impact Scope", value: "Limited", icon: "📊", color: "text-yellow-400" },
                { factor: "Exploitation", value: "Moderate", icon: "🔧", color: "text-yellow-400" },
                { factor: "Prerequisites", value: "Some", icon: "⚙️", color: "text-yellow-400" }
            )
        } else {
            factors.push(
                { factor: "Impact", value: "Minimal", icon: "📝", color: "text-blue-400" },
                { factor: "Risk", value: "Low", icon: "🛡️", color: "text-blue-400" },
                { factor: "Priority", value: "Optional", icon: "⭐", color: "text-blue-400" }
            )
        }

        return factors
    }

    const getConfidenceFactors = (confidence: number) => {
        const factors = []

        if (confidence >= 95) {
            factors.push("Static analysis pattern match", "Multiple detection methods", "Well-known vulnerability type")
        } else if (confidence >= 85) {
            factors.push("Clear code pattern detected", "Single detection method", "Common vulnerability")
        } else if (confidence >= 70) {
            factors.push("Potential pattern found", "Requires manual verification", "Edge case scenario")
        } else {
            factors.push("Uncertain detection", "Further analysis needed", "Low confidence pattern")
        }

        return factors
    }

    const topIssues = issues.filter(i => i.severity === "critical" || i.severity === "high").slice(0, 3)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <SectionCard
                title="Security Reasoning Engine"
                description="AI-powered analysis of vulnerability severity and confidence"
                icon={<Brain className="w-6 h-6 text-purple-400" />}
            >
                <div className="space-y-6">
                    {topIssues.map((issue, index) => (
                        <motion.div
                            key={issue.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="font-semibold text-white flex items-center gap-2 mb-1">
                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                        {issue.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">{issue.location}</p>
                                </div>
                                <Badge className={`
                                    ${issue.severity === "critical" ? "bg-red-600 text-red-100" :
                                        issue.severity === "high" ? "bg-orange-600 text-orange-100" :
                                            issue.severity === "medium" ? "bg-yellow-600 text-yellow-100" :
                                                "bg-blue-600 text-blue-100"}
                                `}>
                                    {issue.severity.toUpperCase()}
                                </Badge>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-4">
                                {/* Severity Reasoning */}
                                <div className="p-3 bg-white/5 rounded border border-white/10">
                                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                                        <Target className="w-4 h-4 text-red-400" />
                                        Why {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Severity?
                                    </h5>
                                    <div className="space-y-2">
                                        {getSeverityReasoningFactors(issue).map((factor, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{factor.icon}</span>
                                                    <span className="text-white/90">{factor.factor}</span>
                                                </div>
                                                <span className={`font-medium ${factor.color}`}>
                                                    {factor.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Confidence Analysis */}
                                <div className="p-3 bg-white/5 rounded border border-white/10">
                                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-yellow-400" />
                                        {issue.confidence}% Confidence Analysis
                                    </h5>
                                    <div className="space-y-2">
                                        {getConfidenceFactors(issue.confidence).map((factor, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                <span className="text-white/90">{factor}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Confidence Meter */}
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                            <span>Confidence</span>
                                            <span>{issue.confidence}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${issue.confidence}%` }}
                                                transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                                                className={`h-2 rounded-full ${issue.confidence >= 95 ? "bg-green-500" :
                                                        issue.confidence >= 85 ? "bg-yellow-500" :
                                                            issue.confidence >= 70 ? "bg-orange-500" : "bg-red-500"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AI Reasoning Summary */}
                            <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded border border-purple-500/20">
                                <p className="text-sm text-white/90">
                                    <strong className="text-purple-400">AI Reasoning:</strong> {
                                        issue.severity === "critical" ?
                                            "This vulnerability allows immediate fund drainage with minimal prerequisites, affecting all users and requiring urgent remediation." :
                                            issue.severity === "high" ?
                                                "Significant security risk with public access and potential financial impact requiring prompt attention." :
                                                issue.severity === "medium" ?
                                                    "Moderate risk vulnerability that should be addressed in next development cycle." :
                                                    "Low-impact issue for future optimization and code quality improvement."
                                    }
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Overall Reasoning Summary */}
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-purple-400" />
                            AI Security Assessment Summary
                        </h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-400 mb-1">
                                    {issues.filter(i => i.severity === "critical").length}
                                </div>
                                <div className="text-muted-foreground">Critical Risks</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-400 mb-1">
                                    {issues.filter(i => i.severity === "high").length}
                                </div>
                                <div className="text-muted-foreground">High Risks</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400 mb-1">
                                    {Math.round(issues.reduce((sum, i) => sum + i.confidence, 0) / issues.length)}%
                                </div>
                                <div className="text-muted-foreground">Avg Confidence</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400 mb-1">
                                    {issues.filter(i => i.confidence >= 90).length}
                                </div>
                                <div className="text-muted-foreground">High Confidence</div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionCard>
        </motion.div>
    )
}