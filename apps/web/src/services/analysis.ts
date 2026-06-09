import { apiClient, ApiResponse, ApiError } from "@/lib/api-client"
import { GasAnalysisResult } from "./gas"
import { AuditResult } from "./audit"
import { mockBackend, MOCK_MODE } from "./mock/mock-backend"

// Analysis Types
export interface ContractUploadRequest {
    code: string
    name: string
    language: "solidity" | "vyper"
}

export interface ContractUploadResponse {
    analysisId: string
    contractName: string
    uploadedAt: Date
}

export interface AnalysisContext {
    analysisId: string
    contract: {
        code: string
        name: string
        language: string
        uploadedAt: Date
    }
    gas?: GasAnalysisResult
    audit?: AuditResult
    copilotHistory: Array<{
        role: "user" | "assistant"
        content: string
        timestamp: Date
    }>
    recommendations: string[]
    reportHash?: string
    transactionHash?: string
}

// Analysis Service
export const analysisService = {
    async uploadContract(
        request: ContractUploadRequest
    ): Promise<ApiResponse<ContractUploadResponse> | ApiError> {
        if (MOCK_MODE) {
            return mockBackend.uploadContract(request.code, request.name)
        }
        return apiClient.post<ContractUploadResponse>("/api/analysis/upload", request)
    },

    async getContext(analysisId: string): Promise<ApiResponse<AnalysisContext> | ApiError> {
        if (MOCK_MODE) {
            return mockBackend.getContext(analysisId)
        }
        return apiClient.get<AnalysisContext>(`/api/analysis/${analysisId}`)
    },

    async deleteAnalysis(analysisId: string): Promise<ApiResponse<{ deleted: boolean }> | ApiError> {
        if (MOCK_MODE) {
            return {
                success: true,
                data: { deleted: true }
            }
        }
        return apiClient.delete<{ deleted: boolean }>(`/api/analysis/${analysisId}`)
    },
}
