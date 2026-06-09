import api from './api';

export interface GasProfile {
    optimizedCode: string;
    estimatedSavings: string;
    suggestions: string[];
}

export const gasService = {
    async profileCode(code: string): Promise<GasProfile> {
        return api.post('/gas/profile', { code });
    },

    async getCurrentGasPrices() {
        return api.get('/gas/prices');
    },
};
