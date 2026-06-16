import { API_CONFIG } from "@/config/api"
import axios from 'axios'

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

// Create axios instance with interceptors
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
        return config
    },
    (error) => {
        console.error('Request interceptor error:', error)
        return Promise.reject(error)
    }
)

// Response interceptor to handle errors
apiClient.interceptors.response.use(
    (response) => {
        console.log(`API Response: ${response.status} ${response.statusText}`)
        return response
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message)

        // If token is invalid or expired, clear auth
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
        }

        return Promise.reject(error)
    }
)

// Legacy API Client (for backward compatibility)
class ApiClientLegacy {
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
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

        console.log(`API Request: ${options.method || 'GET'} ${url}`)

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    ...options.headers,
                },
            })

            console.log(`API Response: ${response.status} ${response.statusText}`)

            const data = await response.json()

            if (!response.ok) {
                console.error("API Error:", data)

                // If unauthorized, clear auth
                if (response.status === 401) {
                    localStorage.removeItem('auth_token')
                    localStorage.removeItem('user')
                }

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

export const apiClientLegacy = new ApiClientLegacy(API_BASE_URL)
