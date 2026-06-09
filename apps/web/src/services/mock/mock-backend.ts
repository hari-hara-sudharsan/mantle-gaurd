/**
 * Mock Backend Simulation
 * This simulates backend responses for demo purposes
 * Replace with real API calls when backend is ready
 */

import { ApiResponse } from "@/lib/api-client"
import { GasAnalysisResult } from "../gas"
import { AuditResult } from "../audit"
import { CopilotResponse } from "../copilot"
import { GenerateReportResponse, ReportData } from "../report"
import { AuditHashLogResponse, VerifyAuditResponse } from "../wallet"
import { ContractUploadResponse, AnalysisContext } from "../analysis"

// Simulated delay for realistic feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Generate UUID
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

// Mock data store
const mockStore = new Map<string, AnalysisContext>()

export const mockBackend = {
    // Contract Upload
    async uploadContract(code: string, name: string): Promise<ApiResponse<ContractUploadResponse>> {
        await delay(800)

        const analysisId = generateUUID()
        const uploadedAt = new Date()

        // Store in mock database
        mockStore.set(analysisId, {
            analysisId,
            contract: {
                code,
                name,
                language: 'solidity',
                uploadedAt
            },
            copilotHistory: [],
            recommendations: []
        })

        return {
            success: true,
            data: {
                analysisId,
                contractName: name,
                uploadedAt
            },
            message: "Contract uploaded successfully"
        }
    },

    // Gas Analysis
    async analyzeGas(analysisId: string): Promise<ApiResponse<GasAnalysisResult>> {
        await delay(2000) // Simulate analysis time

        return {
            success: true,
            data: {
                analysisId,
                totalGas: 245678,
                daFee: 1200,
                mntCost: 0.045,
                optimizationScore: 72,
                functions: [
                    {
                        name: "transfer",
                        selector: "0xa9059cbb",
                        gasUsed: 51234,
                        callCount: 100,
                        averageGas: 512,
                        complexity: "medium"
                    },
                    {
                        name: "approve",
                        selector: "0x095ea7b3",
                        gasUsed: 43210,
                        callCount: 80,
                        averageGas: 540,
                        complexity: "low"
                    },
                    {
                        name: "complexCalculation",
                        selector: "0x12345678",
                        gasUsed: 89000,
                        callCount: 50,
                        averageGas: 1780,
                        complexity: "high"
                    }
                ],
                hotspots: [
                    {
                        function: "complexCalculation",
                        gasUsed: 89000,
                        percentage: 36.2,
                        severity: "high"
                    },
                    {
                        function: "transfer",
                        gasUsed: 51234,
                        percentage: 20.8,
                        severity: "medium"
                    }
                ],
                recommendations: [
                    {
                        title: "Use unchecked arithmetic",
                        description: "Lines 45-67 contain arithmetic operations that cannot overflow. Use unchecked blocks to save gas.",
                        estimatedSavings: "15,000 gas per transaction",
                        priority: "high"
                    },
                    {
                        title: "Cache array length",
                        description: "Loop at line 89 reads array length on every iteration. Cache it in a local variable.",
                        estimatedSavings: "3,000 gas per transaction",
                        priority: "medium"
                    },
                    {
                        title: "Pack storage variables",
                        description: "Variables at lines 23-27 can be packed into fewer storage slots.",
                        estimatedSavings: "20,000 gas on deployment",
                        priority: "high"
                    }
                ]
            },
            message: "Gas analysis completed"
        }
    },

    // Security Audit
    async analyzeAudit(analysisId: string): Promise<ApiResponse<AuditResult>> {
        await delay(2500) // Simulate analysis time

        return {
            success: true,
            data: {
                analysisId,
                securityScore: 68,
                riskLevel: "high",
                findings: [
                    {
                        id: "finding-001",
                        title: "Reentrancy Vulnerability",
                        severity: "critical",
                        category: "Reentrancy",
                        description: "The withdraw() function makes an external call before updating the user's balance, allowing a malicious contract to recursively call withdraw and drain all funds.",
                        impact: "An attacker can drain all ETH from the contract through recursive calls. Estimated potential loss: 100% of contract balance.",
                        recommendation: "Follow the checks-effects-interactions pattern: update state variables before making external calls. Consider using OpenZeppelin's ReentrancyGuard.",
                        affectedFunction: "withdraw()",
                        lineNumber: 45,
                        codeSnippet: "(bool success, ) = msg.sender.call{value: amount}(\"\");",
                        confidence: 95
                    },
                    {
                        id: "finding-002",
                        title: "Integer Overflow Vulnerability",
                        severity: "high",
                        category: "Arithmetic",
                        description: "Unchecked multiplication in calculateReward() can lead to integer overflow, allowing users to receive inflated rewards.",
                        impact: "Users can manipulate reward calculations to receive more tokens than intended, potentially draining the reward pool.",
                        recommendation: "Use SafeMath library or Solidity 0.8+ built-in overflow checks.",
                        affectedFunction: "calculateReward()",
                        lineNumber: 78,
                        codeSnippet: "reward = amount * multiplier;",
                        confidence: 90
                    },
                    {
                        id: "finding-003",
                        title: "Unprotected Self-Destruct",
                        severity: "critical",
                        category: "Access Control",
                        description: "The destroy() function lacks access control, allowing anyone to destroy the contract and steal funds.",
                        impact: "Complete loss of contract functionality and all stored funds.",
                        recommendation: "Add onlyOwner modifier to restrict access to authorized addresses only.",
                        affectedFunction: "destroy()",
                        lineNumber: 123,
                        codeSnippet: "selfdestruct(payable(msg.sender));",
                        confidence: 98
                    }
                ],
                summary: {
                    criticalCount: 2,
                    highCount: 1,
                    mediumCount: 3,
                    lowCount: 5,
                    totalIssues: 11
                },
                executiveSummary: "The smart contract has critical security vulnerabilities that pose significant risks to user funds and contract integrity. Two critical issues (reentrancy and unprotected self-destruct) require immediate attention before any deployment. The contract's security score of 68/100 indicates substantial security improvements are needed."
            },
            message: "Security audit completed"
        }
    },

    // Copilot Chat
    async chat(question: string, analysisId: string): Promise<ApiResponse<CopilotResponse>> {
        await delay(1500)

        // Generate contextual response based on question
        let answer = ""
        if (question.toLowerCase().includes("withdraw") || question.toLowerCase().includes("reentrancy")) {
            answer = "The withdraw function is vulnerable to reentrancy attacks because it follows an unsafe pattern:\n\n1. It checks the user's balance\n2. Makes an external call to send ETH\n3. Only THEN updates the balance\n\nThis creates a window where the attacker's contract can call withdraw() again before the balance is updated, repeatedly draining funds.\n\nThe fix is to follow the Checks-Effects-Interactions pattern:\n1. Check conditions\n2. Update state (balance = 0)\n3. Make external calls\n\nThis ensures the balance is already zero if a reentrant call occurs."
        } else if (question.toLowerCase().includes("gas") || question.toLowerCase().includes("optimize")) {
            answer = "Based on the gas analysis, your contract can save approximately 38,000 gas per transaction by implementing these optimizations:\n\n1. **Unchecked arithmetic** (lines 45-67): Save ~15,000 gas\n2. **Storage packing** (lines 23-27): Save ~20,000 gas on deployment\n3. **Cache array length** (line 89): Save ~3,000 gas\n\nThe biggest win is storage packing - rearranging your state variables can significantly reduce gas costs."
        } else {
            answer = "I've analyzed your smart contract and found several areas that need attention. The contract has a security score of 68/100 with 2 critical vulnerabilities. The main issues are:\n\n1. Reentrancy in the withdraw function\n2. Unprotected self-destruct allowing anyone to destroy the contract\n3. Integer overflow in reward calculations\n\nWould you like me to explain any of these in detail or generate secure fixes?"
        }

        return {
            success: true,
            data: {
                answer,
                context: {
                    contractReferences: ["withdraw()", "balances", "calculateReward()"],
                    findingReferences: ["finding-001", "finding-002"],
                    gasReferences: ["function-gas-003"]
                },
                confidence: 92
            }
        }
    },

    // Generate Report
    async generateReport(analysisId: string, format: string): Promise<ApiResponse<GenerateReportResponse>> {
        await delay(1000)

        const reportId = `report-${analysisId.slice(0, 8)}`
        const hash = Array.from({ length: 64 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('')

        return {
            success: true,
            data: {
                reportId,
                format,
                content: JSON.stringify({
                    analysisId,
                    timestamp: new Date().toISOString(),
                    securityScore: 68,
                    gasScore: 72,
                    overallHealth: 70
                }),
                hash,
                downloadUrl: `/api/report/${reportId}/download?format=${format}`
            },
            message: "Report generated successfully"
        }
    },

    // Log Audit Hash to Blockchain
    async logAuditHash(reportHash: string, walletAddress: string): Promise<ApiResponse<AuditHashLogResponse>> {
        await delay(3000) // Simulate blockchain transaction time

        const txHash = '0x' + Array.from({ length: 64 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('')

        const blockNumber = Math.floor(Math.random() * 1000000) + 12000000

        return {
            success: true,
            data: {
                transactionHash: txHash,
                blockNumber,
                timestamp: Math.floor(Date.now() / 1000),
                auditHash: reportHash,
                contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            },
            message: "Audit hash logged to Mantle Network"
        }
    },

    // Verify Audit
    async verifyAudit(reportHash: string): Promise<ApiResponse<VerifyAuditResponse>> {
        await delay(1500)

        // Simulate verification (always return true for demo)
        return {
            success: true,
            data: {
                verified: true,
                match: true,
                transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
                blockNumber: 12345678,
                timestamp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
                walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                onChainHash: reportHash
            },
            message: "Audit verified successfully"
        }
    },

    // Get Analysis Context
    async getContext(analysisId: string): Promise<ApiResponse<AnalysisContext>> {
        await delay(500)

        const context = mockStore.get(analysisId)

        if (!context) {
            return {
                success: false,
                error: "Analysis not found",
                details: `No analysis found for ID: ${analysisId}`
            }
        }

        return {
            success: true,
            data: context
        }
    }
}

// Enable mock mode flag
export const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_BACKEND === 'true'
