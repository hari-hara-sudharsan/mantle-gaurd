"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw, Upload, FileCode } from "lucide-react"
import { ANIMATION_VARIANTS, ANIMATION_TRANSITIONS } from "@/lib/design-system"

interface ContractToolbarProps {
    onBackToLibrary: () => void
    onChangeDemoContract: () => void
    onClearContract: () => void
    onUploadDifferent: () => void
    hasContract: boolean
}

export function ContractToolbar({
    onBackToLibrary,
    onChangeDemoContract,
    onClearContract,
    onUploadDifferent,
    hasContract
}: ContractToolbarProps) {
    if (!hasContract) return null

    return (
        <motion.div
            variants={ANIMATION_VARIANTS.fadeInDown}
            initial="hidden"
            animate="visible"
            transition={ANIMATION_TRANSITIONS.default}
            className="mb-4"
        >
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-4">
                <div className="flex flex-wrap items-center gap-3">
                    {/* Back to Library */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBackToLibrary}
                        className="gap-2 text-white/80 hover:text-white hover:bg-white/5"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back to Library</span>
                        <span className="sm:hidden">Back</span>
                    </Button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-white/10" />

                    {/* Change Demo Contract */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onChangeDemoContract}
                        className="gap-2 text-white/80 hover:text-white hover:bg-white/5"
                    >
                        <FileCode className="w-4 h-4" />
                        <span className="hidden sm:inline">Change Demo</span>
                        <span className="sm:hidden">Demo</span>
                    </Button>

                    {/* Clear Contract */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearContract}
                        className="gap-2 text-white/80 hover:text-white hover:bg-white/5"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden sm:inline">Clear Contract</span>
                        <span className="sm:hidden">Clear</span>
                    </Button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-white/10" />

                    {/* Upload Different Contract */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onUploadDifferent}
                        className="gap-2 text-primary/80 hover:text-primary hover:bg-primary/5"
                    >
                        <Upload className="w-4 h-4" />
                        <span className="hidden sm:inline">Upload Different</span>
                        <span className="sm:hidden">Upload</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
