import { apiClient } from '@/lib/api-client'
import type { LoginCredentials, SignupCredentials, AuthResponse, User } from '@/types/auth'

export const authService = {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', credentials)

            // Store token in localStorage
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
            }

            return response.data
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }
    },

    /**
     * Signup new user
     */
    async signup(credentials: SignupCredentials): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/signup', credentials)

            // Store token in localStorage
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
            }

            return response.data
        } catch (error) {
            console.error('Signup error:', error)
            throw error
        }
    },

    /**
     * Logout user
     */
    logout(): void {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
    },

    /**
     * Get current user from localStorage
     */
    getCurrentUser(): User | null {
        try {
            const userStr = localStorage.getItem('user')
            return userStr ? JSON.parse(userStr) : null
        } catch {
            return null
        }
    },

    /**
     * Get auth token
     */
    getToken(): string | null {
        return localStorage.getItem('auth_token')
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken()
    },

    /**
     * Verify token and get user profile
     */
    async verifyToken(): Promise<User | null> {
        try {
            const token = this.getToken()
            if (!token) return null

            const response = await apiClient.get<{ user: User }>('/auth/verify')

            // Update stored user
            localStorage.setItem('user', JSON.stringify(response.data.user))

            return response.data.user
        } catch (error) {
            console.error('Token verification error:', error)
            this.logout()
            return null
        }
    },
}
