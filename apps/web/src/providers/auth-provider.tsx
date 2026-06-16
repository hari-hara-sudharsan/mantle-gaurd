'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService } from '@/services/auth'
import type { User, AuthState, LoginCredentials, SignupCredentials } from '@/types/auth'

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>
    signup: (credentials: SignupCredentials) => Promise<void>
    logout: () => void
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    })

    // Check authentication on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const user = authService.getCurrentUser()

                if (user && authService.isAuthenticated()) {
                    // Verify token is still valid
                    const verifiedUser = await authService.verifyToken()

                    setState({
                        user: verifiedUser,
                        isAuthenticated: !!verifiedUser,
                        isLoading: false,
                    })
                } else {
                    setState({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    })
                }
            } catch (error) {
                console.error('Auth initialization error:', error)
                setState({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                })
            }
        }

        initAuth()
    }, [])

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials)

            setState({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch (error) {
            throw error
        }
    }

    const signup = async (credentials: SignupCredentials) => {
        try {
            const response = await authService.signup(credentials)

            setState({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        authService.logout()

        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        })
    }

    const refreshUser = async () => {
        try {
            const user = await authService.verifyToken()

            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: !!user,
            }))
        } catch (error) {
            console.error('Failed to refresh user:', error)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                signup,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
