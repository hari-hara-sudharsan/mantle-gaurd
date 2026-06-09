"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, AlertOctagon, AlertTriangle, AlertCircle, Info, Eye, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionCard } from "@/components/shared/section-card"
import { cn } from "@/lib/utils"
import type { SecurityIssue } from "./audit-experience"

interface IssueExplorerProps {
    issues: SecurityIssue[]
    onIssueClick?: (issue: SecurityIssue) => void
}

export function IssueExplorer({ issues, onIssueClick }: IssueExplorerProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [severityFilter, setSeverityFilter] = useState<string>("all")
    const [sortBy, setSortBy] = useState<"severity" | "title" | "confidence">("severity")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case "critical":
                return AlertOctagon
            case "high":
                return AlertTriangle
            case "medium":
                return AlertCircle
            default:
                return Info
        }
    }

    const getSeverityColors = (severity: string) => {
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

    // Filter and sort issues
    const filteredIssues = issues
        .filter(issue => {
            const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                issue.location.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesSeverity = severityFilter === "all" || issue.severity === severityFilter
            return matchesSearch && matchesSeverity
        })
        .sort((a, b) => {
            let comparison = 0

            switch (sortBy) {
                case "severity":
                    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
                    comparison = severityOrder[a.severity] - severityOrder[b.severity]
                    break
                case "title":
                    comparison = a.title.localeCompare(b.title)
                    break
                case "confidence":
                    comparison = a.confidence - b.confidence
                    break
            }

            return sortOrder === "asc" ? comparison : -comparison
        })

    const handleSort = (column: typeof sortBy) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(column)
            setSortOrder("desc")
        }
    }

    return (
        <SectionCard
            title="Security Issues"
            description="Detected vulnerabilities and security concerns"
            icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
        >
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search issues..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2">
                    <select
                        value={severityFilter}
                        onChange={(e) => setSeverityFilter(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-black border border-white/10 text-white text-sm"
                    >
                        <option value="all">All Severities</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>

            {/* Issues Table - Desktop */}
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                                    <button
                                        onClick={() => handleSort("severity")}
                                        className="flex items-center gap-2 hover:text-white transition-colors"
                                    >
                                        Severity
                                        {sortBy === "severity" && (
                                            <span className="text-primary">
                                                {sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </span>
                                        )}
                                    </button>
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                                    <button
                                        onClick={() => handleSort("title")}
                                        className="flex items-center gap-2 hover:text-white transition-colors"
                                    >
                                        Issue
                                        {sortBy === "title" && (
                                            <span className="text-primary">
                                                {sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </span>
                                        )}
                                    </button>
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Impact</th>
                                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                                    <button
                                        onClick={() => handleSort("confidence")}
                                        className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                                    >
                                        Confidence
                                        {sortBy === "confidence" && (
                                            <span className="text-primary">
                                                {sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </span>
                                        )}
                                    </button>
                                </th>
                                <th className="w-16 py-3 px-4 text-sm font-medium text-muted-foreground text-center">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIssues.map((issue, index) => {
                                const Icon = getSeverityIcon(issue.severity)
                                const colors = getSeverityColors(issue.severity)

                                return (
                                    <motion.tr
                                        key={issue.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                                        onClick={() => onIssueClick?.(issue)}
                                    >
                                        <td className="py-4 px-4">
                                            <Badge variant="outline" className={cn("capitalize", colors.badge)}>
                                                <Icon className="w-3 h-3 mr-1" />
                                                {issue.severity}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-semibold text-white">{issue.title}</p>
                                                <p className="text-xs text-muted-foreground">{issue.category}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={cn(
                                                "font-mono text-sm font-medium px-3 py-1.5 rounded-md inline-block",
                                                issue.location.length <= 10
                                                    ? "bg-emerald-500/20 text-emerald-300"
                                                    : issue.location.length <= 15
                                                        ? "bg-cyan-500/20 text-cyan-300"
                                                        : "bg-purple-500/20 text-purple-300"
                                            )}>
                                                {issue.location}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-white/70">{issue.impact}</span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className="text-sm font-semibold text-emerald-400">
                                                {issue.confidence}%
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Issues Cards - Mobile */}
            <div className="md:hidden space-y-4">
                {filteredIssues.map((issue, index) => {
                    const Icon = getSeverityIcon(issue.severity)
                    const colors = getSeverityColors(issue.severity)

                    return (
                        <motion.div
                            key={issue.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => onIssueClick?.(issue)}
                            className={cn(
                                "rounded-2xl border p-4 cursor-pointer hover:shadow-lg transition-all",
                                colors.border,
                                colors.bg
                            )}
                        >
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline" className={cn("capitalize text-xs", colors.badge)}>
                                            <Icon className="w-3 h-3 mr-1" />
                                            {issue.severity}
                                        </Badge>
                                        <span className="text-xs text-emerald-400 font-semibold">
                                            {issue.confidence}%
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-white mb-1">{issue.title}</h4>
                                    <p className="text-xs text-muted-foreground mb-2">{issue.category}</p>
                                    <p className="text-xs text-white/70">{issue.impact}</p>
                                </div>
                                <Eye className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="text-xs">
                                <span className="text-muted-foreground">Location: </span>
                                <span className="font-mono text-primary">{issue.location}</span>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {filteredIssues.length === 0 && (
                <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                        {searchTerm || severityFilter !== "all"
                            ? "No issues match your filters"
                            : "No security issues detected"}
                    </p>
                </div>
            )}
        </SectionCard>
    )
}