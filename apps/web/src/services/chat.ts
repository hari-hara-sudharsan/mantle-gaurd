import api from './api';

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface ChatResponse {
    answer: string;
    suggestions?: string[];
}

export const chatService = {
    async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
        return api.post('/chat/message', { messages });
    },

    async clearSession() {
        return api.post('/chat/clear');
    },
};
