import { create } from 'zustand'

interface AuditItem {
    id: string
    name: string
    status: 'secure' | 'warning' | 'error'
    risk: 'Low' | 'Medium' | 'High'
    time: string
}

interface AuditState {
    audits: AuditItem[]
    isScanning: boolean
    addAudit: (audit: AuditItem) => void
    setScanning: (status: boolean) => void
}

export const useAuditStore = create<AuditState>((set) => ({
    audits: [
        { id: '1', name: 'MantleBridge.sol', status: 'secure', risk: 'Low', time: '2m ago' },
        { id: '2', name: 'VaultV3.sol', status: 'warning', risk: 'Medium', time: '15m ago' },
        { id: '3', name: 'LendProtocol.sol', status: 'secure', risk: 'Low', time: '1h ago' },
    ],
    isScanning: false,
    addAudit: (audit) => set((state) => ({ audits: [audit, ...state.audits] })),
    setScanning: (status) => set({ isScanning: status }),
}))
