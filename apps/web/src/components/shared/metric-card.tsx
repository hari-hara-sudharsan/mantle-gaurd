import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
    label?: string
    title?: string
    value: string | number
    description?: string
    icon?: LucideIcon | React.ReactElement
    trend?: {
        value: number
        positive: boolean
    } | string
    className?: string
    glow?: boolean
}

export function MetricCard({ label, title, value, description, icon: Icon, trend, className, glow }: MetricCardProps) {
    const trendData = typeof trend === "string" ? undefined : trend

    return (
        <Card className={cn("glass relative group overflow-hidden", glow && "shadow-neon", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title || label}</p>
                    {Icon && (typeof Icon === "function"
                        ? <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                        : Icon)}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-2xl font-bold">{value}</div>
                    {(description || trend) && (
                        <div className="flex items-center gap-2">
                            {trendData && (
                                <span className={cn("text-xs font-medium", trendData.positive ? "text-primary" : "text-destructive")}>
                                    {trendData.positive ? "+" : "-"}{Math.abs(trendData.value)}%
                                </span>
                            )}
                            {typeof trend === "string" && (
                                <span className="text-xs font-medium text-primary">
                                    {trend}
                                </span>
                            )}
                            {description && <p className="text-xs text-muted-foreground">{description}</p>}
                        </div>
                    )}
                </div>
                {glow && (
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                )}
            </CardContent>
        </Card>
    )
}
