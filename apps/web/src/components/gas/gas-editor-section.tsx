"use client"

import { useCallback, useRef } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Upload, FileCode, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionCard } from "@/components/shared/section-card"
import { ContractToolbar } from "@/components/shared/contract-toolbar"
import { FileUpload } from "@/components/ui/file-upload"
import type { AnalysisState } from "./gas-profiler-experience"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface GasEditorSectionProps {
    code: string
    onChange: (code: string, fileName?: string, fileSize?: number) => void
    onLoadDemo: () => void
    analysisState: AnalysisState
    onBackToLibrary?: () => void
    onClearContract?: () => void
}

export function GasEditorSection({
    code,
    onChange,
    onLoadDemo,
    analysisState,
    onBackToLibrary,
    onClearContract
}: GasEditorSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleEditorChange = useCallback((value: string | undefined) => {
        onChange(value || "")
    }, [onChange])

    const handleFileDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file && file.name.endsWith(".sol")) {
            const reader = new FileReader()
            reader.onload = (e) => {
                onChange(e.target?.result as string || "", file.name, file.size)
            }
            reader.readAsText(file)
        }
    }, [onChange])

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                onChange(e.target?.result as string || "", file.name, file.size)
            }
            reader.readAsText(file)
        }
    }, [onChange])

    const handleUploadDifferent = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const isDisabled = analysisState !== "idle" && analysisState !== "complete" && analysisState !== "error"

    return (
        <SectionCard
            title="Smart Contract Source"
            description="Upload or paste your Solidity contract for analysis"
            icon={<FileCode className="w-6 h-6 text-primary" />}
        >
            <div className="space-y-4">
                {/* Contract Management Toolbar */}
                <ContractToolbar
                    hasContract={!!code}
                    onBackToLibrary={onBackToLibrary || (() => onChange(""))}
                    onChangeDemoContract={onLoadDemo}
                    onClearContract={onClearContract || (() => onChange(""))}
                    onUploadDifferent={handleUploadDifferent}
                />

                {/* Hidden file input for upload */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".sol"
                    onChange={handleFileSelect}
                    disabled={isDisabled}
                    className="hidden"
                />

                {/* Upload and Demo Actions */}
                {!code && (
                    <div className="flex flex-wrap gap-3">
                        <label className="relative">
                            <input
                                type="file"
                                accept=".sol"
                                onChange={handleFileSelect}
                                disabled={isDisabled}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <Button
                                variant="outline"
                                disabled={isDisabled}
                                className="gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Upload Contract
                            </Button>
                        </label>

                        <Button
                            variant="outline"
                            onClick={onLoadDemo}
                            disabled={isDisabled}
                            className="gap-2 border-primary/30 hover:border-primary/50 hover:bg-primary/10"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            Load Demo Contract
                        </Button>
                    </div>
                )}

                {/* Editor or Empty State */}
                {code ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-3xl overflow-hidden border border-white/10 bg-[#0f1725]/80 shadow-2xl"
                    >
                        <MonacoEditor
                            height="500px"
                            defaultLanguage="solidity"
                            value={code}
                            onChange={handleEditorChange}
                            options={{
                                readOnly: isDisabled,
                                minimap: { enabled: true },
                                fontSize: 14,
                                lineNumbers: "on",
                                renderWhitespace: "selection",
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                tabSize: 4,
                                theme: "vs-dark",
                                padding: { top: 16, bottom: 16 }
                            }}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-2 border-dashed border-white/10 rounded-3xl p-16 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04] transition-all"
                    >
                        <div className="flex items-center justify-center min-h-[400px]">
                            <FileUpload
                                onChange={(files) => {
                                    const file = files[0]
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onload = (e) => {
                                            onChange(e.target?.result as string || "", file.name, file.size)
                                        }
                                        reader.readAsText(file)
                                    }
                                }}
                                accept=".sol"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </SectionCard>
    )
}
