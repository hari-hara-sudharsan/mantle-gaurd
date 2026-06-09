import { apiClient, ApiResponse, ApiError } from "@/lib/api-client"
import { mockBackend, MOCK_MODE } from "./mock/mock-backend"

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
            return mockBackend.chat(request.question, request.analysisId || '')
        }
        return apiClient.post<CopilotResponse>("/api/copilot/chat", request)
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

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        const url = `${API_BASE_URL}/api/copilot/chat/stream`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: request.question,
                    analysisId: request.analysisId,
                }),
            })

            if (!response.ok) {
                throw new Error("Stream request failed")
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let fullResponse = ""

            if (!reader) {
                throw new Error("No reader available")
            }

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                fullResponse += chunk
                request.onChunk(chunk)
            }

            request.onComplete(fullResponse)
        } catch (error) {
            request.onError(error instanceof Error ? error.message : "Unknown error")
        }
    },
}
