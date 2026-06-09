"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Activity, AlertTriangle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AuditHeroSection() {
    const [securityStatus, setSecurityStatus] = useState("Scanning")
    const [threatsDetected, setThreatsDetected] = useState(0)

    useEffect(() => {
        // Simulated security monitoring
        const interval = setInterval(() => {
            setThreatsDetected(prev => Math.max(0, prev + (Math.random() - 0.7) * 2))
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative border-b border-white/5 bg-gradient-to-b from-background via-background to-transparent">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <Badge variant="outline" className="mb-4 border-red-500/30 text-red-400 bg-red-500/10">
                        <Shield className="w-3 h-3 mr-1" />
                        AI Security Platform
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                            AI-Powered Security
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            Command Center
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                        Deep vulnerability analysis with Mantle-specific security patterns and AI-powered threat detection.
                    </p>
                </motion.div>

                {/* Live security indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-6"
                >
                    {/* Security Status */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <Shield className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs text-white/70">Security Engine</p>
                            <p className="text-sm font-semibold text-emerald-400">Active</p>
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-emerald-400"
                        />
                    </div>

                    {/* Threat Detection */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="p-2 rounded-lg bg-red-500/10">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                            <p className="text-xs text-white/70">Threats Monitored</p>
                            <p className="text-sm font-semibold text-white tabular-nums">
                                {Math.round(threatsDetected * 100)}+
                            </p>
                        </div>
                    </div>

                    {/* Analysis Speed */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Clock className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-white/70">Analysis Time</p>
                            <p className="text-sm font-semibold text-white tabular-nums">
                                &lt;5s
                            </p>
                        </div>
                    </div>

                    {/* AI Confidence */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Activity className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-white/70">AI Confidence</p>
                            <p className="text-sm font-semibold text-primary">98%</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
        </div>
    )
}