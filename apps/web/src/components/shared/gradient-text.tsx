import { cn } from "@/lib/utils"

interface GradientTextProps {
    children: React.ReactNode
    from?: string
    to?: string
    variant?: "primary" | "accent" | "danger" | string
    className?: string
}

export function GradientText({
    children,
    from = "from-primary",
    to = "to-accent",
    variant,
    className
}: GradientTextProps) {
    const variantClass = variant === "primary"
        ? "from-primary to-accent"
        : variant === "accent"
            ? "from-accent to-primary"
            : variant === "danger"
                ? "from-red-400 to-orange-400"
                : `${from} ${to}`

    return (
        <span className={cn(
            "bg-clip-text text-transparent bg-gradient-to-r font-bold",
            variantClass,
            className
        )}>
            {children}
        </span>
    )
}
