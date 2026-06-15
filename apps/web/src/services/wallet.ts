import api from './api';
import { ApiError, ApiResponse } from "@/lib/api-client"
import { API_CONFIG } from "@/config/api"

const API_BASE_URL = API_CONFIG.baseUrl

export interface WalletStats {
    address: string;
    reputationScore: number;
    riskLevel: 'safe' | 'suspicious' | 'blacklisted';
    recentActivity: any[];
}

export interface RegisterAuditRequest {
    contractCode?: string
    auditResult?: unknown
    report?: unknown
}

export interface AuditHashLogResponse {
    transactionHash: string
    blockNumber: number
    timestamp?: number
    auditHash: string
    contractAddress?: string
    gasUsed?: number
    mantleChainLink?: string
}

export interface RegisterAuditResponse {
    audit_hash: string
    transaction_hash: string
    block_number: number
    gas_used: number
    mantle_chain_link: string
}

export interface VerifyAuditResponse {
    verified: boolean
    match: boolean
    transactionHash?: string
    blockNumber?: number
    timestamp?: number
    walletAddress?: string
    onChainHash?: string
}

async function parseResponse<T>(response: Response): Promise<T> {
    const text = await response.text()
    const data = text ? JSON.parse(text) : {}

    if (!response.ok || data.success === false) {
        throw new Error(data.error || data.detail || data.message || response.statusText)
    }

    return data
}

export const walletService = {
    async getStats(address: string): Promise<WalletStats> {
        return api.get(`/wallet/${address}/stats`);
    },

    async validateContractInteraction(address: string, data: string) {
        return api.post('/wallet/validate-interaction', { address, data });
    },

    async registerAudit(request: RegisterAuditRequest): Promise<ApiResponse<AuditHashLogResponse> | ApiError> {
        try {
            const response = await fetch(`${API_BASE_URL}/register-audit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contract: request.contractCode,
                    audit: request.auditResult,
                    report: request.report || request.auditResult,
                }),
            })
            const data = await parseResponse<RegisterAuditResponse>(response)

            return {
                success: true,
                data: {
                    auditHash: data.audit_hash,
                    transactionHash: data.transaction_hash,
                    blockNumber: data.block_number,
                    gasUsed: data.gas_used,
                    mantleChainLink: data.mantle_chain_link,
                },
            }
        } catch (error) {
            return {
                success: false,
                error: "Audit registration failed",
                details: error instanceof Error ? error.message : "Unknown error",
            }
        }
    },

    async verifyAudit({ reportHash }: { reportHash: string }): Promise<ApiResponse<VerifyAuditResponse> | ApiError> {
        return {
            success: true,
            data: {
                verified: false,
                match: false,
                onChainHash: reportHash,
            },
            message: "Direct verification endpoint is not available; use the Mantle explorer link returned by registration.",
        }
    },
};
