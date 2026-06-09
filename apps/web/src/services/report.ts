import { apiClient, ApiResponse, ApiError } from "@/lib/api-client"
import { mockBackend, MOCK_MODE } from "./mock/mock-backend"

// Report Types
export interface ReportData {
    analysisId: string
    contractName: string
    timestamp: Date
    gas: {
        totalGas: number
        optimizationScore: number
        mntCost: number
        topOptimizations: string[]
    }
    audit: {
        securityScore: number
        criticalIssues: number
        highIssues: number
        topFindings: string[]
    }
    health: {
        overall: number
        security: number
        gas: number
        architecture: number
    }
    recommendations: string[]
}

export interface GenerateReportRequest {
    analysisId: string
    format?: "json" | "pdf" | "markdown"
}

export interface GenerateReportResponse {
    reportId: string
    format: string
    downloadUrl?: string
    content?: string
    hash?: string
}

// Report Service
export const reportService = {
    async generate(
        request: GenerateReportRequest
    ): Promise<ApiResponse<GenerateReportResponse> | ApiError> {
        if (MOCK_MODE) {
            return mockBackend.generateReport(request.analysisId, request.format || 'json')
        }
        return apiClient.post<GenerateReportResponse>("/api/report/generate", request)
    },

    async getReport(reportId: string): Promise<ApiResponse<ReportData> | ApiError> {
        if (MOCK_MODE) {
            // Mock report data
            return {
                success: true,
                data: {
                    analysisId: reportId,
                    contractName: "VulnerableVault",
                    timestamp: new Date(),
                    gas: {
                        totalGas: 245678,
                        optimizationScore: 72,
                        mntCost: 0.045,
                        topOptimizations: [
                            "Use unchecked arithmetic",
                            "Cache array length",
                            "Pack storage variables"
                        ]
                    },
                    audit: {
                        securityScore: 68,
                        criticalIssues: 2,
                        highIssues: 1,
                        topFindings: [
                            "Reentrancy in withdraw()",
                            "Unprotected self-destruct",
                            "Integer overflow in calculateReward()"
                        ]
                    },
                    health: {
                        overall: 70,
                        security: 68,
                        gas: 72,
                        architecture: 75
                    },
                    recommendations: [
                        "Address critical security issues immediately",
                        "Optimize gas usage in hot functions",
                        "Add comprehensive tests"
                    ]
                }
            }
        }
        return apiClient.get<ReportData>(`/api/report/${reportId}`)
    },

    async downloadReport(reportId: string, format: "json" | "pdf" | "markdown"): Promise<Blob> {
        if (MOCK_MODE) {
            // Create mock blob
            const content = JSON.stringify({
                reportId,
                format,
                generated: new Date().toISOString()
            }, null, 2)
            return new Blob([content], { type: 'application/json' })
        }

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        const response = await fetch(
            `${API_BASE_URL}/api/report/${reportId}/download?format=${format}`
        )
        return response.blob()
    },
}
