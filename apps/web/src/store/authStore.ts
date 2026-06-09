import { create } from 'zustand'

interface AuthState {
    address: string | null
    isConnected: boolean
    setAddress: (address: string | null) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    address: null,
    isConnected: false,
    setAddress: (address) => set({ address, isConnected: !!address }),
    logout: () => set({ address: null, isConnected: false }),
}))
