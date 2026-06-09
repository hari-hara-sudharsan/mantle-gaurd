import { cn } from "@/lib/utils"

interface GradientTextProps {
    children: React.ReactNode
    from?: string
    to?: string
    className?: string
}

export function GradientText({
    children,
    from = "from-primary",
    to = "to-accent",
    className
}: GradientTextProps) {
    return (
        <span className={cn(
            "bg-clip-text text-transparent bg-gradient-to-r font-bold",
            from,
            to,
            className
        )}>
            {children}
        </span>
    )
}
