import { create } from 'zustand'

interface GasOptimization {
    id: string
    title: string
    impact: string
    description: string
}

interface GasState {
    optimizations: GasOptimization[]
    isAnalyzing: boolean
    setOptimizations: (opts: GasOptimization[]) => void
}

export const useGasStore = create<GasState>((set) => ({
    optimizations: [
        { id: '1', title: 'Batch Settlement', impact: '-22% Gas', description: 'High frequency optimization available' },
        { id: '2', title: 'L2 State Update', impact: '-15% Gas', description: 'Calldata compression recommended' },
        { id: '3', title: 'Oracle Refresh', impact: '-8% Gas', description: 'Interval adjustment proposed' },
    ],
    isAnalyzing: false,
    setOptimizations: (opts) => set({ optimizations: opts }),
}))
