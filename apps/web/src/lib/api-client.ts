// Standard API Response Types
export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    message?: string
}

export interface ApiError {
    success: false
    error: string
    details?: string
}

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Standard API Client
class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T> | ApiError> {
        const url = `${this.baseUrl}${endpoint}`

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
            })

            const data = await response.json()

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || "Request failed",
                    details: data.details || response.statusText,
                }
            }

            return {
                success: true,
                data,
                message: data.message,
            }
        } catch (error) {
            return {
                success: false,
                error: "Network error",
                details: error instanceof Error ? error.message : "Unknown error",
            }
        }
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T> | ApiError> {
        return this.request<T>(endpoint, { method: "GET" })
    }

    async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T> | ApiError> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        })
    }

    async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T> | ApiError> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        })
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T> | ApiError> {
        return this.request<T>(endpoint, { method: "DELETE" })
    }
}

export const apiClient = new ApiClient(API_BASE_URL)
