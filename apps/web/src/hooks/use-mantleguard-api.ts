"use client"

import { useMutation } from "@tanstack/react-query"
import {
    auditService,
    copilotService,
    gasService,
    walletService,
    type AuditRequest,
    type CopilotRequest,
    type GasAnalyzeRequest,
    type RegisterAuditRequest,
} from "@/services"

export function useGasAnalysis() {
    return useMutation({
        mutationFn: (request: GasAnalyzeRequest) => gasService.analyze(request),
    })
}

export function useAuditAnalysis() {
    return useMutation({
        mutationFn: (request: AuditRequest) => auditService.analyze(request),
    })
}

export function useCopilotChat() {
    return useMutation({
        mutationFn: (request: CopilotRequest) => copilotService.chat(request),
    })
}

export function useRegisterAudit() {
    return useMutation({
        mutationFn: (request: RegisterAuditRequest) => walletService.registerAudit(request),
    })
}
