import React from "react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

interface GlowButtonProps extends ButtonProps {
    glowColor?: "primary" | "accent" | "danger"
}

export function GlowButton({ className, glowColor = "primary", ...props }: GlowButtonProps) {
    const glowStyles = {
        primary: "shadow-[0_0_15px_rgba(0,255,178,0.3)] hover:shadow-[0_0_25px_rgba(0,255,178,0.5)] border-primary/50 text-black bg-primary hover:bg-primary/90",
        accent: "shadow-[0_0_15px_rgba(0,194,255,0.3)] hover:shadow-[0_0_25px_rgba(0,194,255,0.5)] border-accent/50 text-white bg-accent hover:bg-accent/90",
        danger: "shadow-[0_0_15px_rgba(255,93,93,0.3)] hover:shadow-[0_0_25px_rgba(255,93,93,0.5)] border-danger/50 text-white bg-danger hover:bg-danger/90",
    }

    return (
        <Button
            className={cn(
                "font-bold transition-all duration-300 rounded-full h-10 px-6 active:scale-95",
                glowStyles[glowColor],
                className
            )}
            {...props}
        />
    )
}
