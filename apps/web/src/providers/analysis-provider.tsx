"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Unified Analysis Types
export interface ContractInfo {
    code: string
    name: string
    uploadedAt: Date
    language: string
}

export interface GasAnalysisData {
    totalGas: number
    optimizationScore: number
    findings: GasFinding[]
    executionCost: number
    daFee: number
}

interface GasFinding {
    severity: string
    problem: string
    suggestion: string
    estimatedSavings: string
}

export interface AuditData {
    securityScore: number
    issues: SecurityIssue[]
    riskLevel: "low" | "medium" | "high" | "critical"
    criticalCount: number
    highCount: number
}

interface SecurityIssue {
    severity: string
    title: string
    description: string
    impact: string
    id: string
}

export interface AIConversation {
    messages: Array<{
        role: "user" | "assistant"
        content: string
        timestamp: Date
    }>
    recommendations: string[]
}

export interface HealthScore {
    overall: number
    security: number
    gas: number
    architecture: number
    mantleCompatibility: number
}

export interface UnifiedAnalysis {
    analysisId: string | null
    contract: ContractInfo | null
    gas: GasAnalysisData | null
    audit: AuditData | null
    ai: AIConversation
    health: HealthScore
    lastUpdated: Date
    reportHash: string | null
    transactionHash: string | null
}

export interface PriorityAction {
    id: string
    title: string
    priority: "critical" | "high" | "medium" | "low"
    category: "security" | "gas" | "architecture"
    description: string
    estimatedImpact: string
    action: () => void
}

interface AnalysisContextType {
    analysis: UnifiedAnalysis
    setContract: (contract: ContractInfo) => void
    setAnalysisId: (id: string) => void
    setGasAnalysis: (gas: GasAnalysisData) => void
    setAuditResults: (audit: AuditData) => void
    setReportHash: (hash: string) => void
    setTransactionHash: (hash: string) => void
    addAIMessage: (role: "user" | "assistant", content: string) => void
    updateHealthScore: () => void
    getPriorityActions: () => PriorityAction[]
    clearAnalysis: () => void
    hasAnalysis: boolean
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

const initialAnalysis: UnifiedAnalysis = {
    analysisId: null,
    contract: null,
    gas: null,
    audit: null,
    ai: {
        messages: [],
        recommendations: []
    },
    health: {
        overall: 0,
        security: 0,
        gas: 0,
        architecture: 0,
        mantleCompatibility: 0
    },
    lastUpdated: new Date(),
    reportHash: null,
    transactionHash: null,
}

export function AnalysisProvider({ children }: { children: ReactNode }) {
    const [analysis, setAnalysis] = useState<UnifiedAnalysis>(initialAnalysis)

    // Load from localStorage on mount - Use page-specific keys
    useEffect(() => {
        // Check which page flag is active
        const gasPageActive = localStorage.getItem("mantleguard-gas-page")
        const auditPageActive = localStorage.getItem("mantleguard-audit-page")

        let stored: string | null = null

        // Load from page-specific key based on active page
        if (gasPageActive) {
            stored = localStorage.getItem("mantleguard-analysis-gas")
        } else if (auditPageActive) {
            stored = localStorage.getItem("mantleguard-analysis-audit")
        } else {
            // Fallback to general storage
            stored = localStorage.getItem("mantleguard-analysis")
        }

        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                // Convert date strings back to Date objects
                if (parsed.contract?.uploadedAt) {
                    parsed.contract.uploadedAt = new Date(parsed.contract.uploadedAt)
                }
                if (parsed.lastUpdated) {
                    parsed.lastUpdated = new Date(parsed.lastUpdated)
                }
                if (parsed.ai?.messages) {
                    parsed.ai.messages = parsed.ai.messages.map((msg: { role: string; content: string; timestamp: string }) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp)
                    }))
                }
                setAnalysis(parsed)
            } catch (error) {
                console.error("Failed to load analysis from storage", error)
            }
        }
    }, [])

    // Save to localStorage on change - Use page-specific keys
    useEffect(() => {
        // Check which page flag is active
        const gasPageActive = localStorage.getItem("mantleguard-gas-page")
        const auditPageActive = localStorage.getItem("mantleguard-audit-page")

        if (analysis.contract || analysis.gas || analysis.audit) {
            // Save to page-specific key if a page is active
            if (gasPageActive) {
                localStorage.setItem("mantleguard-analysis-gas", JSON.stringify(analysis))
            } else if (auditPageActive) {
                localStorage.setItem("mantleguard-analysis-audit", JSON.stringify(analysis))
            } else {
                // Fallback to general storage
                localStorage.setItem("mantleguard-analysis", JSON.stringify(analysis))
            }
        }
    }, [analysis])

    const setContract = (contract: ContractInfo) => {
        setAnalysis(prev => ({
            ...prev,
            contract,
            lastUpdated: new Date()
        }))
    }

    const setAnalysisId = (id: string) => {
        setAnalysis(prev => ({
            ...prev,
            analysisId: id,
            lastUpdated: new Date()
        }))
    }

    const setReportHash = (hash: string) => {
        setAnalysis(prev => ({
            ...prev,
            reportHash: hash,
            lastUpdated: new Date()
        }))
    }

    const setTransactionHash = (hash: string) => {
        setAnalysis(prev => ({
            ...prev,
            transactionHash: hash,
            lastUpdated: new Date()
        }))
    }

    const setGasAnalysis = (gas: GasAnalysisData) => {
        setAnalysis(prev => ({
            ...prev,
            gas,
            lastUpdated: new Date()
        }))
        updateHealthScore()
    }

    const setAuditResults = (audit: AuditData) => {
        setAnalysis(prev => ({
            ...prev,
            audit,
            lastUpdated: new Date()
        }))
        updateHealthScore()
    }

    const addAIMessage = (role: "user" | "assistant", content: string) => {
        setAnalysis(prev => ({
            ...prev,
            ai: {
                ...prev.ai,
                messages: [
                    ...prev.ai.messages,
                    {
                        role,
                        content,
                        timestamp: new Date()
                    }
                ]
            },
            lastUpdated: new Date()
        }))
    }

    const updateHealthScore = () => {
        setAnalysis(prev => {
            const security = prev.audit?.securityScore || 0
            const gas = prev.gas?.optimizationScore || 0
            const architecture = 85 // Placeholder
            const mantleCompatibility = 80 // Placeholder

            const overall = Math.round((security + gas + architecture + mantleCompatibility) / 4)

            return {
                ...prev,
                health: {
                    overall,
                    security,
                    gas,
                    architecture,
                    mantleCompatibility
                }
            }
        })
    }

    const getPriorityActions = (): PriorityAction[] => {
        const actions: PriorityAction[] = []

        // Add critical security issues
        if (analysis.audit?.issues) {
            analysis.audit.issues
                .filter(issue => issue.severity === "critical")
                .forEach((issue, index) => {
                    actions.push({
                        id: `security-${index}`,
                        title: `Fix ${issue.title}`,
                        priority: "critical",
                        category: "security",
                        description: issue.description,
                        estimatedImpact: issue.impact,
                        action: () => console.log("Fix security issue", issue.id)
                    })
                })
        }

        // Add high-impact gas optimizations
        if (analysis.gas?.findings) {
            analysis.gas.findings
                .filter((finding: GasFinding) => finding.severity === "high")
                .slice(0, 3)
                .forEach((finding: GasFinding, index: number) => {
                    actions.push({
                        id: `gas-${index}`,
                        title: `Optimize ${finding.problem}`,
                        priority: "high",
                        category: "gas",
                        description: finding.suggestion,
                        estimatedImpact: finding.estimatedSavings,
                        action: () => console.log("Optimize gas", finding)
                    })
                })
        }

        // Sort by priority
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return actions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    }

    const clearAnalysis = () => {
        setAnalysis(initialAnalysis)
        // Clear all analysis storage keys
        localStorage.removeItem("mantleguard-analysis")
        localStorage.removeItem("mantleguard-analysis-gas")
        localStorage.removeItem("mantleguard-analysis-audit")
    }

    const hasAnalysis = !!(analysis.contract || analysis.gas || analysis.audit)

    return (
        <AnalysisContext.Provider
            value={{
                analysis,
                setContract,
                setAnalysisId,
                setGasAnalysis,
                setAuditResults,
                setReportHash,
                setTransactionHash,
                addAIMessage,
                updateHealthScore,
                getPriorityActions,
                clearAnalysis,
                hasAnalysis
            }}
        >
            {children}
        </AnalysisContext.Provider>
    )
}

export function useAnalysis() {
    const context = useContext(AnalysisContext)
    if (!context) {
        throw new Error("useAnalysis must be used within AnalysisProvider")
    }
    return context
}