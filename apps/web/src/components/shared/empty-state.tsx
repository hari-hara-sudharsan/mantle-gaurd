import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
    title: string
    description?: string
    icon?: LucideIcon
    action?: React.ReactNode
    className?: string
}

export function EmptyState({ title, description, icon: Icon, action, className }: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.01]", className)}>
            {Icon && (
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4 border border-white/5">
                    <Icon className="w-8 h-8 text-muted-foreground/50" />
                </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            {description && <p className="text-muted-foreground text-center max-w-[300px] mb-6">{description}</p>}
            {action && <div>{action}</div>}
        </div>
    )
}
