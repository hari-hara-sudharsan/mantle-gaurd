import { ApiError, ApiResponse } from "@/lib/api-client"
import { mockBackend, MOCK_MODE } from "./mock/mock-backend"
import { API_CONFIG } from "@/config/api"

const API_BASE_URL = API_CONFIG.baseUrl

export interface GasAnalyzeRequest {
    contract: string
    analysisId?: string
    fileName?: string
}

export interface BackendGasFunction {
    name: string
    visibility?: string
    gasEstimate: number
    l2Fee: number
    daFee: number
    totalFee: number
    suggestions?: string[]
}

export interface BackendGasAnalyzeResponse {
    success: boolean
    contract?: string
    functions: BackendGasFunction[]
    error?: string
    message?: string
}

export interface GasAnalysisResult {
    analysisId: string
    contractName: string
    totalGas: number
    daFee: number
    mntCost: number
    optimizationScore: number
    functions: Array<{
        name: string
        selector?: string
        gasUsed: number
        callCount?: number
        averageGas?: number
        complexity: "low" | "medium" | "high"
        visibility?: string
        l2Fee?: number
        daFee?: number
        totalFee?: number
        suggestions?: string[]
    }>
    hotspots: Array<{
        function: string
        gasUsed: number
        percentage: number
        severity: "low" | "medium" | "high" | "critical"
    }>
    recommendations: Array<{
        title: string
        description: string
        estimatedSavings: string
        priority: "low" | "medium" | "high"
    }>
}

export interface GasProfile {
    optimizedCode: string
    estimatedSavings: string
    suggestions: string[]
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

async function postContract<T>(endpoint: string, request: GasAnalyzeRequest): Promise<T> {
    try {
        const jsonResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contract: request.contract,
                sourceCode: request.contract,
                code: request.contract,
                analysisId: request.analysisId,
            }),
        })

        return await parseResponse<T>(jsonResponse)
    } catch (error) {
        if (!shouldRetryAsFormData(error)) {
            throw error
        }

        const formData = new FormData()
        formData.append("file", new File([request.contract], request.fileName || "Contract.sol", { type: "text/plain" }))
        formData.append("contract", request.contract)
        formData.append("sourceCode", request.contract)
        formData.append("code", request.contract)
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

function normalizeComplexity(gasEstimate: number): "low" | "medium" | "high" {
    if (gasEstimate >= 100000) return "high"
    if (gasEstimate >= 60000) return "medium"
    return "low"
}

function normalizeGasResponse(raw: BackendGasAnalyzeResponse, request: GasAnalyzeRequest): GasAnalysisResult {
    const functions = raw.functions || []
    const totalGas = functions.reduce((sum, fn) => sum + (fn.gasEstimate || 0), 0)
    const daFee = functions.reduce((sum, fn) => sum + (fn.daFee || 0), 0)
    const l2Fee = functions.reduce((sum, fn) => sum + (fn.l2Fee || 0), 0)
    const totalFee = functions.reduce((sum, fn) => sum + (fn.totalFee || 0), 0)
    const recommendations = functions.flatMap((fn) =>
        (fn.suggestions || []).map((suggestion) => ({
            title: `${fn.name} optimization`,
            description: suggestion,
            estimatedSavings: "Review backend estimate",
            priority: normalizeComplexity(fn.gasEstimate) === "high" ? "high" as const : "medium" as const,
        }))
    )

    const maxGas = Math.max(...functions.map((fn) => fn.gasEstimate || 0), 1)

    return {
        analysisId: request.analysisId || crypto.randomUUID(),
        contractName: raw.contract || "Contract",
        totalGas,
        daFee,
        mntCost: totalFee || l2Fee + daFee,
        optimizationScore: Math.max(35, Math.min(95, 100 - Math.round((recommendations.length / Math.max(functions.length, 1)) * 18))),
        functions: functions.map((fn) => ({
            name: fn.name,
            gasUsed: fn.gasEstimate,
            complexity: normalizeComplexity(fn.gasEstimate),
            visibility: fn.visibility,
            l2Fee: fn.l2Fee,
            daFee: fn.daFee,
            totalFee: fn.totalFee,
            suggestions: fn.suggestions || [],
        })),
        hotspots: functions
            .filter((fn) => fn.gasEstimate >= maxGas * 0.45 || normalizeComplexity(fn.gasEstimate) !== "low")
            .map((fn) => ({
                function: fn.name,
                gasUsed: fn.gasEstimate,
                percentage: totalGas ? Math.round((fn.gasEstimate / totalGas) * 100) : 0,
                severity: normalizeComplexity(fn.gasEstimate),
            })),
        recommendations: recommendations.length > 0
            ? recommendations
            : [{
                title: "No major gas issues detected",
                description: "Backend did not return optimization suggestions for this contract.",
                estimatedSavings: "0 gas",
                priority: "low",
            }],
    }
}

export const gasService = {
    async analyze(request: GasAnalyzeRequest): Promise<ApiResponse<GasAnalysisResult> | ApiError> {
        if (MOCK_MODE) {
            return mockBackend.analyzeGas(request.analysisId || "local-analysis")
        }

        try {
            const raw = await postContract<BackendGasAnalyzeResponse>("/analyze", request)
            return {
                success: true,
                data: normalizeGasResponse(raw, request),
            }
        } catch (error) {
            return {
                success: false,
                error: "Gas analysis failed",
                details: error instanceof Error ? error.message : "Unknown error",
            }
        }
    },

    async profileCode(code: string): Promise<GasProfile> {
        const result = await this.analyze({ contract: code })
        if (!result.success) {
            throw new Error(result.error || "Gas profiling failed")
        }

        if (!result.data) {
            throw new Error("Gas profiling response was empty")
        }

        return {
            optimizedCode: code,
            estimatedSavings: `${Math.max(0, 100 - result.data.optimizationScore)}%`,
            suggestions: result.data.recommendations.map((item) => item.description),
        }
    },

    async getCurrentGasPrices() {
        return { l2GasPrice: 0, daGasPrice: 0 }
    },
}
