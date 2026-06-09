import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
    status: "success" | "warning" | "error" | "info" | "neutral"
    children: React.ReactNode
    className?: string
    dot?: boolean
}

export function StatusBadge({ status, children, className, dot = true }: StatusBadgeProps) {
    const statusStyles = {
        success: "border-primary/20 bg-primary/10 text-primary",
        warning: "border-orange-500/20 bg-orange-500/10 text-orange-500",
        error: "border-danger/20 bg-danger/10 text-danger",
        info: "border-accent/20 bg-accent/10 text-accent",
        neutral: "border-muted/20 bg-muted/10 text-muted-foreground",
    }

    const dotStyles = {
        success: "bg-primary",
        warning: "bg-orange-500",
        error: "bg-danger",
        info: "bg-accent",
        neutral: "bg-muted-foreground",
    }

    return (
        <Badge variant="outline" className={cn("font-medium py-0.5 gap-1.5", statusStyles[status], className)}>
            {dot && <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", dotStyles[status])} />}
            {children}
        </Badge>
    )
}
