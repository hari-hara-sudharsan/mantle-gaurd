// API Configuration
// Backend URL: https://mantle-gaurd.onrender.com
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://mantle-gaurd.onrender.com"

export const API_CONFIG = {
    baseUrl: BACKEND_URL,
    mockMode: process.env.NEXT_PUBLIC_MOCK_BACKEND === 'true',
    endpoints: {
        analyze: '/analyze',
        audit: '/audit',
        chat: '/chat',
        registerAudit: '/register-audit',
        health: '/',
    },
    timeout: 30000, // 30 seconds
}

// Log configuration on load
if (typeof window !== 'undefined') {
    console.log('=== API CONFIGURATION ===')
    console.log('Base URL:', API_CONFIG.baseUrl)
    console.log('Mock Mode:', API_CONFIG.mockMode)
    console.log('Environment NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)
    console.log('Environment NEXT_PUBLIC_MOCK_BACKEND:', process.env.NEXT_PUBLIC_MOCK_BACKEND)
}

export function getApiUrl(endpoint: string): string {
    return `${API_CONFIG.baseUrl}${endpoint}`
}
