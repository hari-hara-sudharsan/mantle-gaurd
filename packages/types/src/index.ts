export type Severity = "critical" | "high" | "medium" | "low";

export interface AuditIssue {
    severity: Severity;
    title: string;
    description: string;
    line: number;
    fix: string;
}

export interface AuditReport {
    id: string;
    contractAddress?: string;
    timestamp: string;
    score: number;
    issues: AuditIssue[];
}

export interface GasOptimization {
    title: string;
    description: string;
    originalCode: string;
    optimizedCode: string;
    estimatedSavings: string;
}

export interface WalletSecurityProfile {
    address: string;
    reputationScore: number;
    riskLevel: 'safe' | 'suspicious' | 'blacklisted';
    lastSeen: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
}
