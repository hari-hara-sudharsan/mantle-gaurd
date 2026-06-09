import api from './api';

export interface AuditRequest {
    contractAddress?: string;
    sourceCode?: string;
    chain?: string;
}

export interface AuditResult {
    id: string;
    score: number;
    vulnerabilities: {
        severity: 'critical' | 'high' | 'medium' | 'low';
        title: string;
        description: string;
        location?: string;
    }[];
    timestamp: string;
}

export const auditService = {
    async scanContract(data: AuditRequest): Promise<AuditResult> {
        return api.post('/audit/scan', data);
    },

    async getAuditHistory(): Promise<AuditResult[]> {
        return api.get('/audit/history');
    },

    async getAuditById(id: string): Promise<AuditResult> {
        return api.get(`/audit/${id}`);
    },
};
