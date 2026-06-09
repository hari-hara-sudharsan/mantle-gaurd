import { ApiError, ApiResponse } from "@/lib/api-client"
import { mockBackend, MOCK_MODE } from "./mock/mock-backend"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface AuditRequest {
    contract: string
    analysisId?: string
    fileName?: string
    contractAddress?: string
    sourceCode?: string
    chain?: string
}

export type AuditSeverity = "critical" | "high" | "medium" | "low"

export interface BackendAuditFinding {
    severity: string
    issue: string
    description: string
    fix?: {
        before?: string
        after?: string
        explanation?: string
    }
    confidence?: number
}

export interface BackendAuditResponse {
    success: boolean
    findings: BackendAuditFinding[]
    error?: string
    message?: string
}

export interface AuditResult {
    analysisId: string
    securityScore: number
    riskLevel: "low" | "medium" | "high" | "critical"
    findings: Array<{
        id: string
        title: string
        severity: AuditSeverity
        category: string
        description: string
        impact: string
        recommendation: string
        affectedFunction: string
        lineNumber?: number
        codeSnippet?: string
        confidence: number
        fix?: {
            before?: string
            after?: string
            explanation?: string
        }
    }>
    summary: {
        criticalCount: number
        highCount: number
        mediumCount: number
        lowCount: number
        totalIssues: number
    }
    executiveSummary: string
}

async function parseResponse<T>(response: Response): Promise<T> {
    const text = await response.text()
    const data = text ? JSON.parse(text) : {}

    if (!response.ok || data.success === false) {
        throw new Error(data.error || data.detail || data.message || response.statusText)
    }

    return data
}

function shouldRetryAsFormData(error: unknown) {
    const message = error instanceof Error ? error.message.toLowerCase() : ""
    return message.includes("field required") || message.includes("unprocessable") || message.includes("unsupported media")
}

async function postContract<T>(endpoint: string, request: AuditRequest): Promise<T> {
    try {
        const jsonResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contract: request.contract || request.sourceCode,
                sourceCode: request.contract || request.sourceCode,
                code: request.contract || request.sourceCode,
                analysisId: request.analysisId,
            }),
        })

        return await parseResponse<T>(jsonResponse)
    } catch (error) {
        if (!shouldRetryAsFormData(error)) {
            throw error
        }

        const source = request.contract || request.sourceCode || ""
        const formData = new FormData()
        formData.append("file", new File([source], request.fileName || "Contract.sol", { type: "text/plain" }))
        formData.append("contract", source)
        formData.append("sourceCode", source)
        formData.append("code", source)
        if (request.analysisId) {
            formData.append("analysisId", request.analysisId)
        }

        const formResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            body: formData,
        })

        return parseResponse<T>(formResponse)
    }
}

function normalizeSeverity(severity: string): AuditSeverity {
    const normalized = severity.toLowerCase()
    if (normalized === "critical") return "critical"
    if (normalized === "high") return "high"
    if (normalized === "medium") return "medium"
    return "low"
}

function inferCategory(issue: string) {
    const text = issue.toLowerCase()
    if (text.includes("origin") || text.includes("owner") || text.includes("access")) return "Access Control"
    if (text.includes("reentr")) return "Reentrancy"
    if (text.includes("overflow") || text.includes("underflow") || text.includes("arith")) return "Arithmetic"
    if (text.includes("selfdestruct") || text.includes("delegatecall")) return "Dangerous Opcode"
    return "Security"
}

function normalizeAuditResponse(raw: BackendAuditResponse, request: AuditRequest): AuditResult {
    const findings = raw.findings || []
    const summary = findings.reduce(
        (acc, finding) => {
            const severity = normalizeSeverity(finding.severity)
            acc[`${severity}Count`] += 1
            acc.totalIssues += 1
            return acc
        },
        { criticalCount: 0, highCount: 0, mediumCount: 0, lowCount: 0, totalIssues: 0 }
    )

    const scorePenalty =
        summary.criticalCount * 28 +
        summary.highCount * 18 +
        summary.mediumCount * 9 +
        summary.lowCount * 3
    const securityScore = Math.max(5, 100 - scorePenalty)
    const riskLevel = summary.criticalCount > 0
        ? "critical"
        : summary.highCount > 0
            ? "high"
            : summary.mediumCount > 0
                ? "medium"
                : "low"

    return {
        analysisId: request.analysisId || crypto.randomUUID(),
        securityScore,
        riskLevel,
        findings: findings.map((finding, index) => {
            const severity = normalizeSeverity(finding.severity)
            return {
                id: `finding-${index + 1}`,
                title: finding.issue,
                severity,
                category: inferCategory(finding.issue),
                description: finding.description,
                impact: severity === "critical" || severity === "high"
                    ? "May create material risk if deployed without remediation."
                    : "Should be reviewed before production deployment.",
                recommendation: finding.fix?.explanation || finding.fix?.after || "Review the finding and apply the recommended secure pattern.",
                affectedFunction: finding.issue,
                codeSnippet: finding.fix?.before,
                confidence: finding.confidence ?? 85,
                fix: finding.fix,
            }
        }),
        summary,
        executiveSummary: findings.length > 0
            ? `The audit found ${summary.totalIssues} issue(s), including ${summary.criticalCount} critical and ${summary.highCount} high severity finding(s).`
            : "The audit did not return security findings for this contract.",
    }
}

export const auditService = {
    async analyze(request: AuditRequest): Promise<ApiResponse<AuditResult> | ApiError> {
        if (MOCK_MODE) {
            return mockBackend.analyzeAudit(request.analysisId || "local-analysis")
        }

        try {
            const raw = await postContract<BackendAuditResponse>("/audit", request)
            return {
                success: true,
                data: normalizeAuditResponse(raw, request),
            }
        } catch (error) {
            return {
                success: false,
                error: "Security audit failed",
                details: error instanceof Error ? error.message : "Unknown error",
            }
        }
    },

    async scanContract(data: AuditRequest): Promise<AuditResult> {
        const result = await this.analyze(data)
        if (!result.success) {
            throw new Error(result.error || "Security audit failed")
        }

        if (!result.data) {
            throw new Error("Security audit response was empty")
        }
        return result.data
    },

    async getAuditHistory(): Promise<AuditResult[]> {
        return []
    },

    async getAuditById(id: string): Promise<AuditResult> {
        throw new Error(`Audit history endpoint is not available for id ${id}`)
    },
}
