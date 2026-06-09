import Link from "next/link"
import {
    LayoutDashboard,
    Flame,
    ShieldCheck,
    Bot,
    ScrollText,
    Settings
} from "lucide-react"

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Gas Profiler", href: "/gas", icon: Flame },
    { name: "Audit Engine", href: "/audit", icon: ShieldCheck },
    { name: "Copilot", href: "/copilot", icon: Bot },
    { name: "On-chain Logs", href: "/logs", icon: ScrollText },
    { name: "Settings", href: "/settings", icon: Settings },
]

export function SidebarContent() {
    return (
        <div className="flex flex-col h-full bg-background md:bg-transparent">
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <div className="font-bold text-xl tracking-tight flex items-center gap-2">
                    <ShieldCheck className="text-primary w-6 h-6" />
                    <span>Mantle<span className="text-primary">Guard</span></span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors group"
                        >
                            <Icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="bg-secondary/50 rounded-xl p-4 border border-white/5 shadow-neon">
                    <p className="text-xs font-medium mb-1 text-foreground">Network Status</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Operational
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Sidebar() {
    return (
        <aside className="w-64 h-full border-r border-border glass flex flex-col z-20 hidden md:flex shrink-0">
            <SidebarContent />
        </aside>
    )
}
