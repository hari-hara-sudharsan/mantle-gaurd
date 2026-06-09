"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, CheckCircle2, AlertCircle, Info, Zap, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { STATUS_COLORS, ICON_SIZES } from "@/lib/design-system"
import { useAnalysis } from "@/providers/analysis-provider"

export interface Notification {
    id: string
    type: "success" | "warning" | "danger" | "info"
    title: string
    message: string
    timestamp: Date
    read: boolean
    icon?: React.ComponentType<{ className?: string }>
    action?: {
        label: string
        onClick: () => void
    }
}

export function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const { analysis } = useAnalysis()

    // Listen for analysis updates and create notifications
    useEffect(() => {
        if (analysis.gas && analysis.gas.optimizationScore > 0) {
            addNotification({
                type: "success",
                title: "Gas Analysis Complete",
                message: `Optimization score: ${analysis.gas.optimizationScore}/100`,
                icon: Zap,
            })
        }

        if (analysis.audit && analysis.audit.securityScore > 0) {
            const type = analysis.audit.criticalCount > 0 ? "danger" : analysis.audit.highCount > 0 ? "warning" : "success"
            addNotification({
                type,
                title: "Security Audit Complete",
                message: `Security score: ${analysis.audit.securityScore}/100. Found ${analysis.audit.issues.length} issues.`,
                icon: Shield,
            })
        }
    }, [analysis.gas, analysis.audit])

    const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
        const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date(),
            read: false,
        }
        setNotifications((prev) => [newNotification, ...prev])
    }

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
        )
    }

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    }

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    }

    const clearAll = () => {
        setNotifications([])
    }

    const unreadCount = notifications.filter((n) => !n.read).length

    const getIcon = (type: Notification["type"]) => {
        switch (type) {
            case "success":
                return CheckCircle2
            case "warning":
                return AlertCircle
            case "danger":
                return AlertCircle
            case "info":
                return Info
        }
    }

    const getColors = (type: Notification["type"]) => {
        switch (type) {
            case "success":
                return STATUS_COLORS.success
            case "warning":
                return STATUS_COLORS.warning
            case "danger":
                return STATUS_COLORS.danger
            case "info":
                return STATUS_COLORS.info
        }
    }

    return (
        <>
            {/* Bell Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
                <Bell className={cn(ICON_SIZES.md, "text-white/80 hover:text-white transition-colors")} />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                )}
            </button>

            {/* Notification Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[101] overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 py-5 border-b border-white/10 bg-black/40 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-xl font-bold text-white">Notifications</h2>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <X className={cn(ICON_SIZES.md, "text-white/60")} />
                                    </button>
                                </div>
                                {notifications.length > 0 && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold"
                                        >
                                            Mark all read
                                        </button>
                                        <span className="text-white/20">•</span>
                                        <button
                                            onClick={clearAll}
                                            className="text-xs text-white/60 hover:text-white transition-colors font-semibold"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Notifications List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {notifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center px-6">
                                        <div className="p-4 rounded-full bg-white/5 mb-4">
                                            <Bell className={cn(ICON_SIZES.xl, "text-white/40")} />
                                        </div>
                                        <p className="text-white/60 font-medium">No notifications yet</p>
                                        <p className="text-white/40 text-sm mt-2">
                                            You'll see updates here when actions complete
                                        </p>
                                    </div>
                                ) : (
                                    <div className="py-2">
                                        {notifications.map((notification, index) => {
                                            const Icon = notification.icon || getIcon(notification.type)
                                            const colors = getColors(notification.type)

                                            return (
                                                <motion.div
                                                    key={notification.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    onClick={() => markAsRead(notification.id)}
                                                    className={cn(
                                                        "px-6 py-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors relative",
                                                        !notification.read && "bg-white/[0.02]"
                                                    )}
                                                >
                                                    {!notification.read && (
                                                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                                                    )}

                                                    <div className="flex gap-3">
                                                        <div className={cn("p-2 rounded-lg shrink-0", colors.bg)}>
                                                            <Icon className={cn(ICON_SIZES.md, colors.text)} />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                                <h4 className="font-semibold text-white text-sm">
                                                                    {notification.title}
                                                                </h4>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        removeNotification(notification.id)
                                                                    }}
                                                                    className="p-1 rounded hover:bg-white/10 transition-colors shrink-0"
                                                                >
                                                                    <X className={cn(ICON_SIZES.xs, "text-white/40")} />
                                                                </button>
                                                            </div>
                                                            <p className="text-xs text-white/60 mb-2">{notification.message}</p>
                                                            <p className="text-[10px] text-white/40">
                                                                {formatTimestamp(notification.timestamp)}
                                                            </p>

                                                            {notification.action && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        notification.action!.onClick()
                                                                        setIsOpen(false)
                                                                    }}
                                                                    className="mt-3 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                                                                >
                                                                    {notification.action.label} →
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

function formatTimestamp(date: Date): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
}
