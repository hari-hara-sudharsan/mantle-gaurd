import api from './api';

export interface WalletStats {
    address: string;
    reputationScore: number;
    riskLevel: 'safe' | 'suspicious' | 'blacklisted';
    recentActivity: any[];
}

export const walletService = {
    async getStats(address: string): Promise<WalletStats> {
        return api.get(`/wallet/${address}/stats`);
    },

    async validateContractInteraction(address: string, data: string) {
        return api.post('/wallet/validate-interaction', { address, data });
    },
};
