import { cn } from "@/lib/utils"

interface PageHeaderProps {
    title: string
    description?: string
    children?: React.ReactNode
    className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-1 md:flex-row md:items-center md:justify-between mb-8", className)}>
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                {description && <p className="text-muted-foreground text-sm md:text-base">{description}</p>}
            </div>
            {children && <div className="flex items-center gap-3 mt-4 md:mt-0">{children}</div>}
        </div>
    )
}
