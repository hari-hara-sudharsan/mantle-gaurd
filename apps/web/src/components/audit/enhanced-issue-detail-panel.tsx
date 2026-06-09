"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    X, AlertTriangle, Code, Lightbulb, Target, Shield, Copy, ExternalLink,
    Brain, Zap, TrendingUp, Clock, DollarSign, Users, CheckCircle, Play,
    BookOpen, Gauge, ArrowRight, GitCompare, ToggleLeft, ToggleRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/simple-tabs"
import { SecurityIssue } from "./audit-experience"

interface EnhancedIssueDetailPanelProps {
    issue: SecurityIssue | null
    isOpen: boolean
    onClose: () => void
}

export function EnhancedIssueDetailPanel({ issue, isOpen, onClose }: EnhancedIssueDetailPanelProps) {
    const [activeTab, setActiveTab] = useState("intelligence")
    const [isAIExplaining, setIsAIExplaining] = useState(false)
    const [aiExplanation, setAIExplanation] = useState<string | null>(null)
    const [isSimulating, setIsSimulating] = useState(false)
    const [simulationStep, setSimulationStep] = useState(0)
    const [isGeneratingFix, setIsGeneratingFix] = useState(false)
    const [generatedFix, setGeneratedFix] = useState<string | null>(null)
    const [learningMode, setLearningMode] = useState(false)

    if (!issue) return null

    const getSeverityColor = (severity: SecurityIssue["severity"]) => {
        switch (severity) {
            case "critical":
                return "bg-red-600 text-red-100 border-red-500"
            case "high":
                return "bg-orange-600 text-orange-100 border-orange-500"
            case "medium":
                return "bg-yellow-600 text-yellow-100 border-yellow-500"
            case "low":
                return "bg-blue-600 text-blue-100 border-blue-500"
            default:
                return "bg-gray-600 text-gray-100 border-gray-500"
        }
    }

    const getExploitabilityLevel = () => {
        if (issue.severity === "critical") return { level: "Easy", color: "text-red-400", icon: "🟥" }
        if (issue.severity === "high") return { level: "Moderate", color: "text-orange-400", icon: "🟨" }
        return { level: "Hard", color: "text-green-400", icon: "🟩" }
    }

    const exploitability = getExploitabilityLevel()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Enhanced Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-4xl bg-card border-l border-white/10 z-50 overflow-y-auto"
                    >
                        <div className="p-6 space-y-6">
                            {/* Enhanced Header */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
                                    <div>
                                        <h2 className="text-xl font-bold text-white">AI Security Intelligence</h2>
                                        <p className="text-sm text-muted-foreground">Deep vulnerability analysis & remediation</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Learning Mode Toggle */}
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Learning Mode</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setLearningMode(!learningMode)}
                                            className="h-6 w-10 p-0"
                                        >
                                            {learningMode ?
                                                <ToggleRight className="w-5 h-5 text-green-400" /> :
                                                <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                                            }
                                        </Button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={onClose}
                                        className="hover:bg-white/10"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Intelligence Summary */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* Severity Reasoning */}
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                        <h4 className="font-semibold text-white">Severity Analysis</h4>
                                    </div>
                                    <Badge className={`${getSeverityColor(issue.severity)} font-semibold mb-2`}>
                                        {issue.severity.toUpperCase()}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground">
                                        {learningMode ?
                                            "This is marked critical because it can drain all funds with minimal effort" :
                                            "High impact, public access, easy exploitation"
                                        }
                                    </p>
                                </div>
                                {/* AI Confidence */}
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap className="w-4 h-4 text-yellow-400" />
                                        <h4 className="font-semibold text-white">AI Confidence</h4>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-2xl font-bold text-yellow-400">{issue.confidence}%</div>
                                        <div className="text-xs text-muted-foreground">
                                            {issue.confidence >= 95 ? "Very High" :
                                                issue.confidence >= 85 ? "High" :
                                                    issue.confidence >= 70 ? "Medium" : "Low"}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Static analysis + pattern matching
                                    </p>
                                </div>

                                {/* Exploitability Meter */}
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Gauge className="w-4 h-4 text-blue-400" />
                                        <h4 className="font-semibold text-white">Exploitability</h4>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{exploitability.icon}</span>
                                        <span className={`font-semibold ${exploitability.color}`}>
                                            {exploitability.level}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {learningMode ?
                                            "Anyone with a balance can exploit this" :
                                            "Public access, intermediate skill"
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Enhanced Tabs */}
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-6">
                                    <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
                                    <TabsTrigger value="simulation">Simulation</TabsTrigger>
                                    <TabsTrigger value="fix">AI Fix</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                    <TabsTrigger value="impact">Impact</TabsTrigger>
                                    <TabsTrigger value="learn">Learn</TabsTrigger>
                                </TabsList>
                                {/* Intelligence Tab - Main AI Analysis */}
                                <TabsContent value="intelligence" className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-white flex items-center gap-2">
                                                <Brain className="w-5 h-5 text-purple-400" />
                                                Root Cause Analysis
                                            </h4>
                                        </div>

                                        <div className="space-y-4 text-sm text-white/90">
                                            <div>
                                                <h5 className="font-medium text-white mb-2">🧠 What happened?</h5>
                                                <p className="text-white/80">
                                                    {learningMode ?
                                                        "The smart contract sends money before updating its records. It&apos;s like giving someone cash before writing down that you gave it to them." :
                                                        "The function makes an external call before updating internal state, violating the Checks-Effects-Interactions pattern."
                                                    }
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="font-medium text-white mb-2">🔍 Why did this happen?</h5>
                                                <ul className="space-y-1 text-white/80">
                                                    <li>• {learningMode ? "Developer followed logical order: check → send → update" : "CEI pattern not followed during implementation"}</li>
                                                    <li>• {learningMode ? "Didn't know about reentrancy attacks" : "Missing reentrancy protection modifier"}</li>
                                                    <li>• {learningMode ? "Code review didn't catch the issue" : "Insufficient security review process"}</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h5 className="font-medium text-white mb-2">⚡ How can this be exploited?</h5>
                                                <p className="text-white/80">
                                                    {learningMode ?
                                                        "A malicious user creates a special contract. When they withdraw money, their contract immediately asks for more money before the first withdrawal is recorded." :
                                                        "Attacker deploys contract with receive() function that re-enters withdraw() before balance update, enabling recursive fund drainage."
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Impact Analysis */}
                                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                            <DollarSign className="w-5 h-5 text-red-400" />
                                            Business Impact Assessment
                                        </h4>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Potential Loss:</span>
                                                <span className="text-red-400 ml-2 font-bold">${(Math.random() * 500 + 100).toFixed(0)}K+</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Affected Users:</span>
                                                <span className="text-white ml-2 font-medium">All Holders</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Impact Type:</span>
                                                <span className="text-orange-400 ml-2 font-medium">Treasury Drain</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Detection Risk:</span>
                                                <span className="text-yellow-400 ml-2 font-medium">Low</span>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                {/* Attack Simulation Tab */}
                                <TabsContent value="simulation" className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-semibold text-white flex items-center gap-2">
                                                <Target className="w-5 h-5 text-red-400" />
                                                Attack Simulation Center
                                            </h4>
                                            <Button
                                                onClick={async () => {
                                                    setIsSimulating(true)
                                                    setSimulationStep(0)

                                                    const steps = [
                                                        "Deploying malicious contract...",
                                                        "Calling vulnerable function...",
                                                        "External call triggered...",
                                                        "Reentering function...",
                                                        "Draining funds...",
                                                        "Attack complete!"
                                                    ]

                                                    for (let i = 0; i < steps.length; i++) {
                                                        setSimulationStep(i)
                                                        await new Promise(resolve => setTimeout(resolve, 800))
                                                    }

                                                    setIsSimulating(false)
                                                }}
                                                disabled={isSimulating}
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                {isSimulating ? "Simulating..." : "Run Simulation"}
                                            </Button>
                                        </div>

                                        {/* Attack Flow Visualization */}
                                        <div className="space-y-3">
                                            {[
                                                { step: "Attacker deploys malicious contract", icon: "👤", status: simulationStep >= 0 },
                                                { step: "Calls withdraw() with legitimate balance", icon: "💰", status: simulationStep >= 1 },
                                                { step: "Contract sends ETH, triggers receive()", icon: "⚡", status: simulationStep >= 2 },
                                                { step: "Malicious contract re-enters withdraw()", icon: "🔄", status: simulationStep >= 3 },
                                                { step: "Process repeats until funds drained", icon: "🔥", status: simulationStep >= 4 },
                                                { step: "All contract funds stolen", icon: "💀", status: simulationStep >= 5 }
                                            ].map((step, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0.3, scale: 0.95 }}
                                                    animate={{
                                                        opacity: step.status ? 1 : 0.3,
                                                        scale: step.status ? 1 : 0.95,
                                                        backgroundColor: step.status ? "rgb(239 68 68 / 0.1)" : "rgb(255 255 255 / 0.05)"
                                                    }}
                                                    className="flex items-center gap-4 p-3 rounded-lg border border-white/10"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                                        <span className="text-lg">{step.icon}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-white/90 text-sm">{step.step}</p>
                                                    </div>
                                                    {step.status && (
                                                        <CheckCircle className="w-5 h-5 text-red-400" />
                                                    )}
                                                    {isSimulating && index === simulationStep && (
                                                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        {simulationStep >= 5 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-4 p-3 bg-red-500/20 rounded-lg border border-red-500/30"
                                            >
                                                <p className="text-red-300 text-sm font-medium">
                                                    🚨 Simulation Complete: Contract successfully exploited
                                                </p>
                                                <p className="text-red-200/80 text-xs mt-1">
                                                    Time to drain: ~30 seconds | Gas cost: ~0.05 ETH
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>
                                </TabsContent>
                                {/* AI Fix Generator Tab */}
                                <TabsContent value="fix" className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-semibold text-white flex items-center gap-2">
                                                <Lightbulb className="w-5 h-5 text-green-400" />
                                                AI Fix Generator
                                            </h4>
                                            <Button
                                                onClick={async () => {
                                                    setIsGeneratingFix(true)
                                                    await new Promise(resolve => setTimeout(resolve, 2000))
                                                    setGeneratedFix(`function withdraw() public nonReentrant {
    uint256 amount = balances[msg.sender];
    require(amount > 0, "No balance");
    
    // Effects: Update state BEFORE external call
    balances[msg.sender] = 0;
    
    // Interactions: External call comes last
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    
    emit Withdrawal(msg.sender, amount);
}`)
                                                    setIsGeneratingFix(false)
                                                }}
                                                disabled={isGeneratingFix}
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <Zap className="w-4 h-4 mr-2" />
                                                {isGeneratingFix ? "Generating..." : "Generate Fix"}
                                            </Button>
                                        </div>

                                        {isGeneratingFix && (
                                            <div className="space-y-3">
                                                <div className="animate-pulse">
                                                    <div className="h-4 bg-white/10 rounded mb-2"></div>
                                                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                                                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                                </div>
                                                <p className="text-sm text-green-400">AI is analyzing secure patterns...</p>
                                            </div>
                                        )}

                                        {generatedFix && !isGeneratingFix && (
                                            <div className="space-y-4">
                                                {/* Before/After Comparison */}
                                                <div className="grid lg:grid-cols-2 gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-red-400 font-medium">❌ Before (Vulnerable)</span>
                                                        </div>
                                                        <pre className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs font-mono text-white overflow-x-auto">
                                                            {`function withdraw() public {
    uint256 amount = balances[msg.sender];
    // VULNERABLE: External call first
    (bool success, ) = msg.sender.call{value: amount}("");
    balances[msg.sender] = 0; // Too late!
}`}
                                                        </pre>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-green-400 font-medium">✅ After (Secure)</span>
                                                        </div>
                                                        <pre className="p-3 bg-green-500/10 border border-green-500/20 rounded text-xs font-mono text-white overflow-x-auto">
                                                            {generatedFix}
                                                        </pre>
                                                    </div>
                                                </div>

                                                {/* Fix Explanation */}
                                                <div className="p-3 bg-white/5 rounded border border-white/10">
                                                    <h5 className="font-medium text-white mb-2">🔧 What was changed:</h5>
                                                    <ul className="text-sm text-white/90 space-y-1">
                                                        <li>• Added ReentrancyGuard modifier for protection</li>
                                                        <li>• Moved balance update before external call (CEI pattern)</li>
                                                        <li>• Added proper error handling with require()</li>
                                                        <li>• Added withdrawal event for transparency</li>
                                                    </ul>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(generatedFix)}>
                                                        <Copy className="w-4 h-4 mr-2" />
                                                        Copy Fix
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <GitCompare className="w-4 h-4 mr-2" />
                                                        Apply to Code
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                                {/* Code Analysis Tab */}
                                <TabsContent value="code" className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                        <h4 className="font-semibold text-white mb-3">Vulnerable Code Location</h4>
                                        <div className="mb-2 text-sm text-muted-foreground">
                                            Function: <code className="text-white bg-white/10 px-2 py-1 rounded">{issue.affectedFunction}</code>
                                        </div>
                                        {issue.codeSnippet && (
                                            <pre className="p-4 bg-black/50 rounded border border-white/10 text-sm font-mono text-white overflow-x-auto">
                                                {issue.codeSnippet}
                                            </pre>
                                        )}
                                    </div>
                                </TabsContent>

                                {/* Business Impact Tab */}
                                <TabsContent value="impact" className="space-y-4">
                                    <div className="grid gap-4">
                                        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                                <DollarSign className="w-5 h-5 text-red-400" />
                                                Financial Impact
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Potential Loss:</span>
                                                    <span className="text-red-400 font-bold">${(Math.random() * 1000 + 200).toFixed(0)}K</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Risk Level:</span>
                                                    <span className="text-red-400">Maximum</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Recovery:</span>
                                                    <span className="text-white">Impossible</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                                <Users className="w-5 h-5 text-orange-400" />
                                                User Impact
                                            </h4>
                                            <ul className="space-y-1 text-sm text-white/90">
                                                <li>• All users lose deposited funds</li>
                                                <li>• Trust in protocol completely lost</li>
                                                <li>• Potential legal liability</li>
                                                <li>• Reputation damage across ecosystem</li>
                                            </ul>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Learning Tab */}
                                <TabsContent value="learn" className="space-y-4">
                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-blue-400" />
                                            Security Knowledge
                                        </h4>

                                        <div className="space-y-4">
                                            <div>
                                                <h5 className="font-medium text-white mb-2">📚 What is Reentrancy?</h5>
                                                <p className="text-sm text-white/80 leading-relaxed">
                                                    Reentrancy occurs when a function can be called again before its first execution is complete.
                                                    In smart contracts, this happens when external calls allow the recipient to call back into
                                                    the original contract.
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="font-medium text-white mb-2">🛡️ Prevention Patterns</h5>
                                                <ul className="space-y-1 text-sm text-white/80">
                                                    <li>• <strong>CEI Pattern:</strong> Checks, Effects, then Interactions</li>
                                                    <li>• <strong>ReentrancyGuard:</strong> Use mutex locks</li>
                                                    <li>• <strong>Pull Payments:</strong> Let users withdraw vs pushing</li>
                                                    <li>• <strong>State Machines:</strong> Explicit state management</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h5 className="font-medium text-white mb-2">📖 Further Reading</h5>
                                                <div className="space-y-2">
                                                    <Button size="sm" variant="outline" className="w-full justify-start">
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        Consensys Reentrancy Guide
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="w-full justify-start">
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        OpenZeppelin Security Patterns
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* Developer Action Center */}
                            <div className="border-t border-white/10 pt-4">
                                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Developer Action Center
                                </h4>
                                <div className="flex gap-3">
                                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Fix Now
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Review Later
                                    </Button>
                                    <Button variant="ghost" className="flex-1">
                                        Ignore
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}