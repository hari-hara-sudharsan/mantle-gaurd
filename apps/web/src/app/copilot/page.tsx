"use client"

import { useState, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Sparkles, Paperclip, Image as ImageIcon, Send, X } from "lucide-react"

interface Message {
    role: "user" | "assistant"
    content: string
    files?: AttachedFile[]
}

interface AttachedFile {
    name: string
    size: number
    type: string
    url: string
}

export default function CopilotPage() {
    const [prompt, setPrompt] = useState("")
    const [messages, setMessages] = useState<Message[]>([])
    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)

    const canSend = prompt.trim().length > 0 || attachedFiles.length > 0

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
        const files = event.target.files
        if (!files || files.length === 0) return

        const newFiles: AttachedFile[] = []

        Array.from(files).forEach((file) => {
            // Validate file type
            if (type === "image" && !file.type.startsWith("image/")) {
                toast.error(`${file.name} is not an image file`)
                return
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                toast.error(`${file.name} is too large (max 10MB)`)
                return
            }

            const fileUrl = URL.createObjectURL(file)
            newFiles.push({
                name: file.name,
                size: file.size,
                type: file.type,
                url: fileUrl
            })
        })

        if (newFiles.length > 0) {
            setAttachedFiles((prev) => [...prev, ...newFiles])
            toast.success(`${newFiles.length} file(s) attached`)
        }

        // Reset input
        if (event.target) {
            event.target.value = ""
        }
    }

    const handleRemoveFile = (index: number) => {
        setAttachedFiles((prev) => {
            const newFiles = [...prev]
            // Revoke object URL to free memory
            URL.revokeObjectURL(newFiles[index].url)
            newFiles.splice(index, 1)
            return newFiles
        })
        toast.info("File removed")
    }

    const handleSend = () => {
        if (!canSend) {
            toast.error("Please enter a query or attach a file first.")
            return
        }

        const messageContent = prompt.trim() || "Attached files for analysis"

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: messageContent,
                files: attachedFiles.length > 0 ? [...attachedFiles] : undefined
            },
            {
                role: "assistant",
                content: attachedFiles.length > 0
                    ? `I've received ${attachedFiles.length} file(s). Analyzing the content and your prompt against Mantle protocol heuristics. I'll provide a detailed analysis in just a moment.`
                    : "Analyzing your prompt against Mantle protocol heuristics. I'll provide a detailed gas and security summary in just a moment."
            }
        ])

        setPrompt("")
        setAttachedFiles([])
        toast.success("Query sent to MantleGuard AI")
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B"
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
        return (bytes / (1024 * 1024)).toFixed(1) + " MB"
    }

    const showWelcome = messages.length === 0

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-4xl">
                {showWelcome ? (
                    /* Welcome Section */
                    <div className="flex flex-col items-center justify-center text-center space-y-8">
                        {/* Orange Icon */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/50">
                            <Sparkles className="w-12 h-12 text-white" />
                        </div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Welcome to MantleGuard AI Your AI Copilot Awaits.
                            </h1>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                                Discover smarter conversations, automated insights, and limitless creativity — all in one dashboard. Let's set you up in just a few steps.
                            </p>
                        </div>

                        {/* Input Area */}
                        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
                            {/* Attached Files Preview */}
                            {attachedFiles.length > 0 && (
                                <div className="mb-4 space-y-2">
                                    {attachedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                {file.type.startsWith("image/") ? (
                                                    <img
                                                        src={file.url}
                                                        alt={file.name}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center">
                                                        <Paperclip className="w-5 h-5 text-orange-600" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFile(index)}
                                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                            >
                                                <X className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="relative">
                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSend()
                                        }
                                    }}
                                    placeholder="Ask anything MantleGuard AI..."
                                    className="min-h-[80px] resize-none border-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-400 text-base"
                                />
                            </div>

                            {/* Hidden File Inputs */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => handleFileSelect(e, "file")}
                                accept=".sol,.txt,.pdf,.doc,.docx,.json"
                            />
                            <input
                                ref={imageInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => handleFileSelect(e, "image")}
                                accept="image/*"
                            />

                            {/* Bottom Bar */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                        <span className="text-sm font-medium">Attach</span>
                                    </button>
                                    <button
                                        onClick={() => imageInputRef.current?.click()}
                                        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                                    >
                                        <ImageIcon className="w-5 h-5" />
                                        <span className="text-sm font-medium">Upload Media</span>
                                    </button>
                                </div>
                                <button
                                    onClick={handleSend}
                                    disabled={!canSend}
                                    className="p-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Chat Messages */
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl p-4 ${message.role === "user"
                                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                                        : "bg-white/10 border border-white/20 text-white"
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed mb-2">
                                        {message.content}
                                    </p>
                                    {/* Display attached files in message */}
                                    {message.files && message.files.length > 0 && (
                                        <div className="space-y-2 mt-3">
                                            {message.files.map((file, fileIndex) => (
                                                <div
                                                    key={fileIndex}
                                                    className="flex items-center gap-2 p-2 bg-white/10 rounded-lg"
                                                >
                                                    {file.type.startsWith("image/") ? (
                                                        <img
                                                            src={file.url}
                                                            alt={file.name}
                                                            className="w-8 h-8 rounded object-cover"
                                                        />
                                                    ) : (
                                                        <Paperclip className="w-4 h-4" />
                                                    )}
                                                    <span className="text-xs truncate flex-1">
                                                        {file.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Input Area in Chat Mode */}
                        <div className="w-full bg-white rounded-2xl shadow-xl p-6 mt-8">
                            {/* Attached Files Preview */}
                            {attachedFiles.length > 0 && (
                                <div className="mb-4 space-y-2">
                                    {attachedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                {file.type.startsWith("image/") ? (
                                                    <img
                                                        src={file.url}
                                                        alt={file.name}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center">
                                                        <Paperclip className="w-5 h-5 text-orange-600" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFile(index)}
                                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                            >
                                                <X className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="relative">
                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSend()
                                        }
                                    }}
                                    placeholder="Ask anything MantleGuard AI..."
                                    className="min-h-[80px] resize-none border-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-400 text-base"
                                />
                            </div>

                            {/* Hidden File Inputs */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => handleFileSelect(e, "file")}
                                accept=".sol,.txt,.pdf,.doc,.docx,.json"
                            />
                            <input
                                ref={imageInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => handleFileSelect(e, "image")}
                                accept="image/*"
                            />

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                        <span className="text-sm font-medium">Attach</span>
                                    </button>
                                    <button
                                        onClick={() => imageInputRef.current?.click()}
                                        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                                    >
                                        <ImageIcon className="w-5 h-5" />
                                        <span className="text-sm font-medium">Upload Media</span>
                                    </button>
                                </div>
                                <button
                                    onClick={handleSend}
                                    disabled={!canSend}
                                    className="p-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
