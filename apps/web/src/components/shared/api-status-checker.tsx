"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, XCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type ApiStatus = "checking" | "connected" | "error" | "hidden"

export function ApiStatusChecker() {
    const [status, setStatus] = useState<ApiStatus>("checking")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [apiUrl, setApiUrl] = useState<string>("")

    useEffect(() => {
        checkApiConnection()
    }, [])

    const checkApiConnection = async () => {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        setApiUrl(url)

        try {
            console.log("Checking API connection to:", url)
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 5000)

            const response = await fetch(`${url}/`, {
                method: "GET",
                signal: controller.signal,
            })

            clearTimeout(timeoutId)

            if (response.ok) {
                const data = await response.json()
                console.log("API Response:", data)
                setStatus("connected")
                setTimeout(() => setStatus("hidden"), 3000)
            } else {
                setStatus("error")
                setErrorMessage(`Backend returned ${response.status}: ${response.statusText}`)
            }
        } catch (error) {
            console.error("API Connection Error:", error)
            setStatus("error")
            if (error instanceof Error) {
                if (error.name === "AbortError") {
                    setErrorMessage("Connection timeout - Backend is not responding")
                } else {
                    setErrorMessage(`Cannot reach backend: ${error.message}`)
                }
            } else {
                setErrorMessage("Network error - Cannot reach backend")
            }
        }
    }

    if (status === "hidden") return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 right-4 z-50 max-w-md"
            >
                {status === "checking" && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-400">Checking API Connection...</p>
                            <p className="text-xs text-blue-300/60 mt-1">{apiUrl}</p>
                        </div>
                    </div>
                )}

                {status === "connected" && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-green-400">Backend Connected</p>
                            <p className="text-xs text-green-300/60 mt-1">API is ready</p>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-400 mb-1">Backend Connection Failed</p>
                                <p className="text-xs text-red-300/80 mb-2">{errorMessage}</p>
                                <div className="text-xs text-red-300/60 space-y-1">
                                    <p><strong>API URL:</strong> {apiUrl}</p>
                                    <p><strong>Mock Mode:</strong> {process.env.NEXT_PUBLIC_MOCK_BACKEND || "false"}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={checkApiConnection}
                            className="mt-3 w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs py-2 px-3 rounded transition-colors"
                        >
                            Retry Connection
                        </button>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
