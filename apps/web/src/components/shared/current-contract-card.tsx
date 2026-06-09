"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileCode, Upload, X, CheckCircle2, Clock } from "lucide-react"
import { ANIMATION_VARIANTS, ANIMATION_TRANSITIONS } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface CurrentContractCardProps {
    fileName: string
    fileSize?: number
    uploadedAt?: Date
    onReplace: () => void
    onClear: () => void
    className?: string
}

export function CurrentContractCard({
    fileName,
    fileSize,
    uploadedAt,
    onReplace,
    onClear,
    className
}: CurrentContractCardProps) {
    const formatFileSize = (bytes?: number) => {
        if (!bytes) return "Unknown size"
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    }

    const formatTimestamp = (date?: Date) => {
        if (!date) return null
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    return (
        <motion.div
            variants={ANIMATION_VARIANTS.fadeInDown}
            initial="hidden"
            animate="visible"
            transition={ANIMATION_TRANSITIONS.default}
            className={cn("mb-6", className)}
        >
            <div className="rounded-2xl border border-primary/20 bg-black/40 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                            <FileCode className="w-6 h-6 text-primary" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white truncate">
                                {fileName}
                            </h3>
                            <Badge
                                variant="outline"
                                className="flex-shrink-0 border-primary/30 text-primary bg-primary/10 hover:bg-primary/20"
                            >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Loaded
                            </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
                            {/* File Size */}
                            <div className="flex items-center gap-1.5">
                                <FileCode className="w-4 h-4" />
                                <span>{formatFileSize(fileSize)}</span>
                            </div>

                            {/* Upload Timestamp */}
                            {uploadedAt && (
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatTimestamp(uploadedAt)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onReplace}
                            className="gap-2 text-white/80 hover:text-white hover:bg-white/5"
                        >
                            <Upload className="w-4 h-4" />
                            <span className="hidden sm:inline">Replace</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClear}
                            className="gap-2 text-white/80 hover:text-white hover:bg-white/5"
                        >
                            <X className="w-4 h-4" />
                            <span className="hidden sm:inline">Clear</span>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
