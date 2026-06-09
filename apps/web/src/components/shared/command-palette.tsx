"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Activity,
    BarChart3,
    FileCode,
    Home,
    MessageSquare,
    Play,
    Search,
    Shield,
    ShieldCheck,
    Sparkles,
    Terminal,
    Zap,
} from "lucide-react"
import { ICON_SIZES, STATUS_COLORS } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface CommandAction {
    id: string
    label: string
    description?: string
    icon: React.ComponentType<{ className?: string }>
    iconColor?: string
    shortcut?: string[]
    action: () => void
    keywords?: string[]
}

export function CommandPalette() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    // Keyboard shortcut: Ctrl+K or Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = useCallback((action: () => void) => {
        setOpen(false)
        action()
    }, [])

    const navigationCommands: CommandAction[] = [
        {
            id: "nav-dashboard",
            label: "Dashboard",
            description: "View your overview",
            icon: Home,
            iconColor: STATUS_COLORS.info.text,
            action: () => router.push("/dashboard"),
            keywords: ["home", "overview"],
        },
        {
            id: "nav-gas",
            label: "Gas Profiler",
            description: "Optimize gas costs",
            icon: Zap,
            iconColor: STATUS_COLORS.warning.text,
            action: () => router.push("/gas"),
            keywords: ["optimize", "cost"],
        },
        {
            id: "nav-audit",
            label: "Security Audit",
            description: "Scan for vulnerabilities",
            icon: Shield,
            iconColor: STATUS_COLORS.danger.text,
            action: () => router.push("/audit"),
            keywords: ["security", "vulnerability", "scan"],
        },
        {
            id: "nav-copilot",
            label: "AI Copilot",
            description: "Chat with AI assistant",
            icon: MessageSquare,
            iconColor: STATUS_COLORS.success.text,
            action: () => router.push("/copilot"),
            keywords: ["ai", "chat", "assistant", "help"],
        },
        {
            id: "nav-verify",
            label: "Verify Audit",
            description: "Verify on-chain audit",
            icon: ShieldCheck,
            iconColor: STATUS_COLORS.purple.text,
            action: () => router.push("/verify"),
            keywords: ["blockchain", "verify", "integrity"],
        },
    ]

    const actionCommands: CommandAction[] = [
        {
            id: "action-gas-analyze",
            label: "Run Gas Analysis",
            description: "Analyze gas consumption",
            icon: Play,
            iconColor: STATUS_COLORS.warning.text,
            shortcut: ["G", "A"],
            action: () => {
                router.push("/gas")
                // Trigger analysis if contract exists
                setTimeout(() => {
                    const analyzeBtn = document.querySelector('[data-action="analyze-gas"]') as HTMLButtonElement
                    analyzeBtn?.click()
                }, 500)
            },
            keywords: ["run", "execute", "analyze", "gas"],
        },
        {
            id: "action-audit-run",
            label: "Run Security Audit",
            description: "Start vulnerability scan",
            icon: Play,
            iconColor: STATUS_COLORS.danger.text,
            shortcut: ["S", "A"],
            action: () => {
                router.push("/audit")
                setTimeout(() => {
                    const auditBtn = document.querySelector('[data-action="run-audit"]') as HTMLButtonElement
                    auditBtn?.click()
                }, 500)
            },
            keywords: ["run", "execute", "audit", "security", "scan"],
        },
        {
            id: "action-copilot-open",
            label: "Open AI Copilot",
            description: "Start AI conversation",
            icon: Sparkles,
            iconColor: STATUS_COLORS.success.text,
            shortcut: ["C", "O"],
            action: () => router.push("/copilot"),
            keywords: ["ai", "chat", "copilot", "open"],
        },
        {
            id: "action-demo-contract",
            label: "Load Demo Contract",
            description: "Quick start with example",
            icon: FileCode,
            iconColor: STATUS_COLORS.info.text,
            action: () => {
                router.push("/gas")
                setTimeout(() => {
                    const demoBtn = document.querySelector('[data-action="load-demo"]') as HTMLButtonElement
                    demoBtn?.click()
                }, 500)
            },
            keywords: ["demo", "example", "sample", "load"],
        },
    ]

    const systemCommands: CommandAction[] = [
        {
            id: "system-activity",
            label: "View Activity Log",
            description: "See recent actions",
            icon: Activity,
            iconColor: STATUS_COLORS.info.text,
            action: () => router.push("/logs"),
            keywords: ["activity", "history", "log"],
        },
        {
            id: "system-search",
            label: "Search Documentation",
            description: "Find help articles",
            icon: Search,
            iconColor: STATUS_COLORS.info.text,
            action: () => {
                // Open docs in new tab
                window.open("https://docs.mantle.xyz", "_blank")
            },
            keywords: ["help", "docs", "documentation", "search"],
        },
    ]

    return (
        <>
            {/* Trigger Button - Floating bottom right on mobile */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-40 md:hidden inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-black shadow-lg hover:scale-110 active:scale-95 transition-transform"
            >
                <Terminal className="w-6 h-6" />
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <CommandInput
                        placeholder="Type a command or search..."
                        className="h-14 text-base border-b border-white/10"
                    />
                    <CommandList className="max-h-[500px] custom-scrollbar">
                        <CommandEmpty className="py-12 text-center">
                            <div className="text-muted-foreground">
                                <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">No results found.</p>
                            </div>
                        </CommandEmpty>

                        <CommandGroup heading="Navigation">
                            {navigationCommands.map((cmd) => (
                                <CommandItem
                                    key={cmd.id}
                                    value={`${cmd.label} ${cmd.description} ${cmd.keywords?.join(" ")}`}
                                    onSelect={() => runCommand(cmd.action)}
                                    className="flex items-center gap-3 py-3 px-4 cursor-pointer"
                                >
                                    <div className={cn("p-2 rounded-lg", STATUS_COLORS.info.bg)}>
                                        <cmd.icon className={cn(ICON_SIZES.sm, cmd.iconColor)} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-white">{cmd.label}</div>
                                        {cmd.description && (
                                            <div className="text-xs text-muted-foreground">{cmd.description}</div>
                                        )}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        <CommandSeparator className="my-2" />

                        <CommandGroup heading="Actions">
                            {actionCommands.map((cmd) => (
                                <CommandItem
                                    key={cmd.id}
                                    value={`${cmd.label} ${cmd.description} ${cmd.keywords?.join(" ")}`}
                                    onSelect={() => runCommand(cmd.action)}
                                    className="flex items-center gap-3 py-3 px-4 cursor-pointer"
                                >
                                    <div className={cn("p-2 rounded-lg", STATUS_COLORS.success.bg)}>
                                        <cmd.icon className={cn(ICON_SIZES.sm, cmd.iconColor)} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-white">{cmd.label}</div>
                                        {cmd.description && (
                                            <div className="text-xs text-muted-foreground">{cmd.description}</div>
                                        )}
                                    </div>
                                    {cmd.shortcut && (
                                        <div className="flex gap-1">
                                            {cmd.shortcut.map((key) => (
                                                <kbd
                                                    key={key}
                                                    className="px-2 py-1 text-[10px] font-semibold bg-white/5 border border-white/10 rounded"
                                                >
                                                    {key}
                                                </kbd>
                                            ))}
                                        </div>
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        <CommandSeparator className="my-2" />

                        <CommandGroup heading="System">
                            {systemCommands.map((cmd) => (
                                <CommandItem
                                    key={cmd.id}
                                    value={`${cmd.label} ${cmd.description} ${cmd.keywords?.join(" ")}`}
                                    onSelect={() => runCommand(cmd.action)}
                                    className="flex items-center gap-3 py-3 px-4 cursor-pointer"
                                >
                                    <div className={cn("p-2 rounded-lg", STATUS_COLORS.purple.bg)}>
                                        <cmd.icon className={cn(ICON_SIZES.sm, cmd.iconColor)} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-white">{cmd.label}</div>
                                        {cmd.description && (
                                            <div className="text-xs text-muted-foreground">{cmd.description}</div>
                                        )}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>

                    {/* Footer with hint */}
                    <div className="border-t border-white/10 px-4 py-3 bg-black/20">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono">
                                    ↑↓
                                </kbd>
                                <span>Navigate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono">
                                    Enter
                                </kbd>
                                <span>Select</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono">
                                    Esc
                                </kbd>
                                <span>Close</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </CommandDialog>

            {/* Desktop hint - bottom left */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={() => setOpen(true)}
                className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 text-sm text-muted-foreground hover:text-white hover:border-primary/30 transition-all"
            >
                <Terminal className="w-4 h-4" />
                <span>Press</span>
                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-xs">
                    ⌘K
                </kbd>
            </motion.button>
        </>
    )
}
