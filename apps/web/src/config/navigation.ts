import { Activity, Bot, CheckCircle, Home, LayoutDashboard, ScrollText, Settings, ShieldCheck } from "lucide-react"

export const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/gas", label: "Gas Profiler", icon: Activity },
    { href: "/audit", label: "Audit Engine", icon: ShieldCheck },
    { href: "/copilot", label: "Copilot", icon: Bot },
    { href: "/verify", label: "Verify", icon: CheckCircle },
    { href: "/logs", label: "On-chain Logs", icon: ScrollText },
    { href: "/settings", label: "Settings", icon: Settings },
]
