import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface SectionCardProps {
    title: string
    description?: string
    children: React.ReactNode
    className?: string
    contentClassName?: string
}

export function SectionCard({ title, description, children, className, contentClassName }: SectionCardProps) {
    return (
        <Card className={cn("glass overflow-hidden", className)}>
            <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                {description && <CardDescription className="text-muted-foreground/80">{description}</CardDescription>}
            </CardHeader>
            <CardContent className={cn("p-6", contentClassName)}>
                {children}
            </CardContent>
        </Card>
    )
}
