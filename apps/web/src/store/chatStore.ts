import { create } from 'zustand'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
}

interface ChatState {
    messages: Message[]
    isTyping: boolean
    addMessage: (message: Message) => void
    setTyping: (status: boolean) => void
    clearChat: () => void
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [
        { id: '1', role: 'assistant', content: 'Hello! I am your MantleGuard Copilot. How can I help you today?', timestamp: Date.now() }
    ],
    isTyping: false,
    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    setTyping: (status) => set({ isTyping: status }),
    clearChat: () => set({ messages: [] }),
}))
