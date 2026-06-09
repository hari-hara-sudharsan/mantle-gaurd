import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface AnimatedLoaderProps {
    text?: string
    className?: string
    size?: "sm" | "md" | "lg"
}

export function AnimatedLoader({ text, className, size = "md" }: AnimatedLoaderProps) {
    const sizes = {
        sm: "h-4 w-4 stroke-[3]",
        md: "h-8 w-8 stroke-[2]",
        lg: "h-12 w-12 stroke-[1.5]",
    }

    return (
        <div className={cn("flex flex-col items-center justify-center py-10 gap-4", className)}>
            <div className="relative">
                <Loader2 className={cn("animate-spin text-primary", sizes[size])} />
                <div className={cn("absolute inset-0 blur-lg bg-primary/20 rounded-full", sizes[size])} />
            </div>
            {text && <p className="text-sm font-medium animate-pulse text-muted-foreground tracking-widest uppercase">{text}</p>}
        </div>
    )
}
