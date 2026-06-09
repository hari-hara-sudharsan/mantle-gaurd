import { ApiResponse, ApiError } from "@/lib/api-client"
import { mockBackend, MOCK_MODE } from "./mock/mock-backend"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Copilot Types
export interface CopilotMessage {
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export interface CopilotRequest {
    question: string
    analysisId?: string
    conversationHistory?: CopilotMessage[]
}

export interface CopilotResponse {
    answer: string
    sources?: string[]
    context: {
        contractReferences: string[]
        findingReferences: string[]
        gasReferences: string[]
    }
    confidence: number
}

export interface StreamingCopilotRequest {
    question: string
    analysisId?: string
    onChunk: (chunk: string) => void
    onComplete: (fullResponse: string) => void
    onError: (error: string) => void
}

// Copilot Service
export const copilotService = {
    async chat(request: CopilotRequest): Promise<ApiResponse<CopilotResponse> | ApiError> {
        if (MOCK_MODE) {
            const response = await mockBackend.chat(request.question, request.analysisId || '')
            if (response.success && response.data) {
                return {
                    ...response,
                    data: {
                        ...response.data,
                        sources: [],
                    },
                }
            }
            return response
        }

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: request.question }),
            })
            const data = await response.json()

            if (!response.ok || data.success === false) {
                throw new Error(data.error || data.detail || data.message || response.statusText)
            }

            return {
                success: true,
                data: {
                    answer: data.answer,
                    sources: data.sources || [],
                    context: {
                        contractReferences: [],
                        findingReferences: [],
                        gasReferences: data.sources || [],
                    },
                    confidence: 90,
                },
            }
        } catch (error) {
            return {
                success: false,
                error: "Copilot request failed",
                details: error instanceof Error ? error.message : "Unknown error",
            }
        }
    },

    async chatStream(request: StreamingCopilotRequest): Promise<void> {
        if (MOCK_MODE) {
            // Simulate streaming
            const response = await mockBackend.chat(request.question, request.analysisId || '')
            if (response.success && response.data) {
                const text = response.data.answer
                const words = text.split(' ')
                let accumulated = ''

                for (const word of words) {
                    accumulated += (accumulated ? ' ' : '') + word
                    request.onChunk(word + ' ')
                    await new Promise(resolve => setTimeout(resolve, 50))
                }

                request.onComplete(text)
            } else {
                request.onError('Failed to get response')
            }
            return
        }

        const url = `${API_BASE_URL}/chat`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: request.question,
                }),
            })

            if (!response.ok) {
                throw new Error("Stream request failed")
            }

            const data = await response.json()
            const fullResponse = data.answer || ""
            request.onChunk(fullResponse)
            request.onComplete(fullResponse)
        } catch (error) {
            request.onError(error instanceof Error ? error.message : "Unknown error")
        }
    },
}
