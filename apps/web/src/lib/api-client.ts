import { API_CONFIG } from "@/config/api"

// Standard API Response Types
export interface ApiResponse<T = unknown> {
    success: true
    data?: T
    message?: string
}

export interface ApiError {
    success: false
    error: string
    details?: string
}

// API Configuration
const API_BASE_URL = API_CONFIG.baseUrl

// Standard API Client
class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        console.log("ApiClient initialized with baseUrl:", this.baseUrl)
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T> | ApiError> {
        const url = `${this.baseUrl}${endpoint}`
        console.log(`API Request: ${options.method || 'GET'} ${url}`)

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
            })

            console.log(`API Response: ${response.status} ${response.statusText}`)

            const data = await response.json()

            if (!response.ok) {
                console.error("API Error:", data)
                return {
                    success: false,
                    error: data.error || data.detail || "Request failed",
                    details: data.details || response.statusText,
                }
            }

            return {
                success: true,
                data,
                message: data.message,
            }
        } catch (error) {
            console.error("Network Error:", error)
            return {
                success: false,
                error: "Network error - Cannot reach backend",
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
