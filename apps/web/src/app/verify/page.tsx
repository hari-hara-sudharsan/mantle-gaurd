"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/page-header"
import { CheckCircle2, XCircle, Upload, Hash, Shield, ExternalLink } from "lucide-react"
import { walletService, VerifyAuditResponse } from "@/services"
import { cn } from "@/lib/utils"

export default function VerifyPage() {
    const [reportFile, setReportFile] = useState<File | null>(null)
    const [reportHash, setReportHash] = useState<string>("")
    const [verificationResult, setVerificationResult] = useState<VerifyAuditResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setReportFile(file)
        setError(null)

        // Calculate hash from file
        const text = await file.text()
        const hash = await calculateHash(text)
        setReportHash(hash)
    }

    const calculateHash = async (content: string): Promise<string> => {
        const encoder = new TextEncoder()
        const data = encoder.encode(content)
        const hashBuffer = await crypto.subtle.digest("SHA-256", data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
    }

    const handleVerify = async () => {
        if (!reportHash) {
            setError("Please upload a report first")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const result = await walletService.verifyAudit({ reportHash })

            if (!result.success) {
                setError(result.error || "Verification failed")
                return
            }

            setVerificationResult(result.data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Verification failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-[1400px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <PageHeader
                    title="Verify Audit Report"
                    description="Verify the integrity and authenticity of audit reports stored on Mantle Network"
                >
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/10">
                        Verification
                    </Badge>
                </PageHeader>

                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-[#00FFB2]" />
                            <h2 className="text-2xl font-bold text-white">Upload Report</h2>
                        </div>

                        <div className="space-y-6">
                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-3">
                                    Select Audit Report (JSON)
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="report-upload"
                                    />
                                    <label
                                        htmlFor="report-upload"
                                        className="flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-8 cursor-pointer hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                                    >
                                        <Upload className="w-6 h-6 text-primary" />
                                        <span className="text-white/70">
                                            {reportFile ? reportFile.name : "Click to upload or drag and drop"}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Report Hash */}
                            {reportHash && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-xl bg-white/5 p-4"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Hash className="w-4 h-4 text-[#00C2FF]" />
                                        <span className="text-sm font-semibold text-white">Report Hash</span>
                                    </div>
                                    <code className="text-xs text-white/60 font-mono break-all">
                                        {reportHash}
                                    </code>
                                </motion.div>
                            )}

                            {/* Verify Button */}
                            <button
                                onClick={handleVerify}
                                disabled={!reportHash || loading}
                                className={cn(
                                    "w-full rounded-xl py-4 font-semibold text-white transition-all duration-300",
                                    reportHash && !loading
                                        ? "bg-gradient-to-r from-[#00FFB2] to-[#00C2FF] hover:shadow-lg hover:shadow-primary/20"
                                        : "bg-white/10 cursor-not-allowed opacity-50"
                                )}
                            >
                                {loading ? "Verifying..." : "Verify on Mantle Network"}
                            </button>

                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="rounded-xl bg-red-500/10 border border-red-500/20 p-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <XCircle className="w-5 h-5 text-red-500" />
                                        <span className="text-sm text-red-500">{error}</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Verification Result */}
                {verificationResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div
                            className={cn(
                                "rounded-2xl border p-8",
                                verificationResult.match
                                    ? "border-[#00FFB2]/20 bg-[#00FFB2]/5"
                                    : "border-red-500/20 bg-red-500/5"
                            )}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                {verificationResult.match ? (
                                    <CheckCircle2 className="w-12 h-12 text-[#00FFB2]" />
                                ) : (
                                    <XCircle className="w-12 h-12 text-red-500" />
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">
                                        {verificationResult.match ? "✓ Verified" : "✗ Not Verified"}
                                    </h2>
                                    <p className="text-sm text-white/60">
                                        {verificationResult.match
                                            ? "Report integrity confirmed on Mantle Network"
                                            : "Report hash not found or does not match"}
                                    </p>
                                </div>
                            </div>

                            {verificationResult.match && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-white/5 p-4">
                                        <div className="text-xs text-white/50 mb-1">Transaction Hash</div>
                                        <code className="text-sm text-white/80 font-mono break-all">
                                            {verificationResult.transactionHash}
                                        </code>
                                    </div>
                                    <div className="rounded-xl bg-white/5 p-4">
                                        <div className="text-xs text-white/50 mb-1">Block Number</div>
                                        <div className="text-sm text-white/80 font-mono">
                                            {verificationResult.blockNumber}
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-white/5 p-4">
                                        <div className="text-xs text-white/50 mb-1">Wallet Address</div>
                                        <code className="text-sm text-white/80 font-mono break-all">
                                            {verificationResult.walletAddress}
                                        </code>
                                    </div>
                                    <div className="rounded-xl bg-white/5 p-4">
                                        <div className="text-xs text-white/50 mb-1">Timestamp</div>
                                        <div className="text-sm text-white/80">
                                            {verificationResult.timestamp
                                                ? new Date(verificationResult.timestamp * 1000).toLocaleString()
                                                : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {verificationResult.transactionHash && (
                                <a
                                    href={`https://explorer.mantle.xyz/tx/${verificationResult.transactionHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                                >
                                    View on Mantle Explorer
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
