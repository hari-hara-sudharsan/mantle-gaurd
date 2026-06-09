"use client"

import { motion } from "framer-motion"
import { SectionCard } from "@/components/shared/section-card"
import { Badge } from "@/components/ui/badge"
import {
    AlertTriangle,
    TrendingUp,
    Shield,
    Clock,
    CheckCircle,
    XCircle,
    Minus,
    Target
} from "lucide-react"
import { AuditData } from "./audit-experience"

interface ExecutiveSummaryProps {
    data: AuditData
}

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
    const criticalIssues = data.issues.filter(i => i.severity === "critical").length
    const highIssues = data.issues.filter(i => i.severity === "high").length
    const totalIssues = data.issues.length

    const getRiskLevel = () => {
        if (criticalIssues > 0) return { level: "Critical", color: "bg-red-600", icon: XCircle }
        if (highIssues > 2) return { level: "High", color: "bg-orange-600", icon: AlertTriangle }
        if (highIssues > 0) return { level: "Medium", color: "bg-yellow-600", icon: Minus }
        return { level: "Low", color: "bg-green-600", icon: CheckCircle }
    }

    const risk = getRiskLevel()
    const RiskIcon = risk.icon

    const getMainConcern = () => {
        if (criticalIssues > 0) {
            const criticalIssue = data.issues.find(i => i.severity === "critical")
            return criticalIssue?.category || "Critical Vulnerability"
        }
        if (highIssues > 0) {
            const highIssue = data.issues.find(i => i.severity === "high")
            return highIssue?.category || "High Risk Pattern"
        }
        return "General Security Review"
    }

    const getRecommendedAction = () => {
        if (criticalIssues > 0) return "Immediate remediation required"
        if (highIssues > 0) return "Address high-priority issues"
        return "Review and monitor"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            <SectionCard
                title="Executive Summary"
                description="AI-generated security overview for stakeholders"
                icon={<TrendingUp className="w-6 h-6 text-primary" />}
            >
                <div className="space-y-6">
                    {/* Risk Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <RiskIcon className="w-5 h-5 text-white" />
                                <span className="text-sm text-muted-foreground">Overall Risk</span>
                            </div>
                            <Badge className={`${risk.color} text-white font-bold`}>
                                {risk.level}
                            </Badge>
                        </div>

                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                            <div className="text-sm text-muted-foreground mb-2">Critical Issues</div>
                            <div className="text-2xl font-bold text-red-400">{criticalIssues}</div>
                        </div>

                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                            <div className="text-sm text-muted-foreground mb-2">High Issues</div>
                            <div className="text-2xl font-bold text-orange-400">{highIssues}</div>
                        </div>

                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                            <div className="text-sm text-muted-foreground mb-2">Security Score</div>
                            <div className="text-2xl font-bold text-primary">{data.securityScore}/100</div>
                        </div>
                    </div>

                    {/* Key Findings */}
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-400" />
                            Key Findings Summary
                        </h4>

                        <div className="grid lg:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Main Concern:</span>
                                <p className="text-white font-medium mt-1">{getMainConcern()}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Recommended Action:</span>
                                <p className="text-white font-medium mt-1">{getRecommendedAction()}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Timeline:</span>
                                <p className="text-white font-medium mt-1">
                                    {criticalIssues > 0 ? "Immediate" : highIssues > 0 ? "7 days" : "Next sprint"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-400" />
                            Security Score Breakdown
                        </h4>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-muted-foreground mb-1">Access Control</div>
                                <div className="text-xl font-bold text-white">{data.scoreBreakdown.accessControl}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-muted-foreground mb-1">Reentrancy</div>
                                <div className="text-xl font-bold text-white">{data.scoreBreakdown.reentrancy}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-muted-foreground mb-1">Storage Safety</div>
                                <div className="text-xl font-bold text-white">{data.scoreBreakdown.storageSafety}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-muted-foreground mb-1">Input Validation</div>
                                <div className="text-xl font-bold text-white">{data.scoreBreakdown.inputValidation}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-muted-foreground mb-1">Mantle Compatibility</div>
                                <div className="text-xl font-bold text-blue-400">{data.scoreBreakdown.mantleCompatibility}</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Items */}
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            Recommended Actions
                        </h4>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-red-400 border-red-400">Priority 1</Badge>
                                <span className="text-white">Fix reentrancy vulnerability in withdraw function</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-orange-400 border-orange-400">Priority 2</Badge>
                                <span className="text-white">Add access control to admin functions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-yellow-400 border-yellow-400">Priority 3</Badge>
                                <span className="text-white">Implement return value checks for external calls</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Line */}
                    <div className="text-center p-4 bg-black/30 rounded-lg border border-white/10">
                        <p className="text-white/90 text-sm">
                            <strong>Bottom Line:</strong> {criticalIssues > 0 ?
                                "Contract has critical vulnerabilities requiring immediate attention before deployment." :
                                "Contract security is acceptable with recommended improvements."
                            }
                        </p>
                    </div>
                </div>
            </SectionCard>
        </motion.div>
    )
}