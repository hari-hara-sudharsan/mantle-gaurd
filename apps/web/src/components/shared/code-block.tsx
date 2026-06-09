import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface CodeBlockProps {
    code: string
    language?: string
    className?: string
    showLineNumbers?: boolean
}

export function CodeBlock({ code, language, className, showLineNumbers = true }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={cn("relative group border border-white/5 rounded-xl bg-black overflow-hidden font-mono text-sm leading-relaxed", className)}>
            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
                <span className="text-xs text-muted-foreground uppercase">{language || "plaintext"}</span>
                <button
                    onClick={copyToClipboard}
                    className="p-1 rounded hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre>
                    <code className="block">
                        {code.split('\n').map((line, i) => (
                            <span key={i} className="table-row">
                                {showLineNumbers && (
                                    <span className="table-cell pr-4 text-muted-foreground/30 select-none text-right w-8">
                                        {i + 1}
                                    </span>
                                )}
                                <span className="table-cell">{line || ' '}</span>
                            </span>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    )
}
