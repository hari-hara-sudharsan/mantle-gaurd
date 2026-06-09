"use client";

import { motion } from "framer-motion";
import { GradientText } from "@/components/shared/gradient-text";
import { GlowButton } from "@/components/shared/glow-button";
import { MetricCard } from "@/components/shared/metric-card";
import { ShieldCheck, Zap, MessageSquare, ArrowRight, Activity, Lock, Cpu } from "lucide-react";
import Link from "next/link";

const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
        {children}
    </motion.div>
);

export function LandingHero() {
    return (
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

            {/* Hero Content */}
            <div className="max-w-5xl mx-auto text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6 backdrop-blur-sm">
                        <Activity className="w-3 h-3 animate-pulse" />
                        <span>Now Live on Mantle Network</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        <GradientText variant="mantle" className="block mb-2">AI-native security suite</GradientText>
                        <span>for Mantle developers</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Analyze gas costs, detect Mantle-specific vulnerabilities,
                        and chat with an AI copilot trained on Mantle docs.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link href="/dashboard">
                            <GlowButton size="lg" className="h-14 px-8 text-lg group">
                                Launch Dashboard
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </GlowButton>
                        </Link>
                        <GlowButton variant="outline" size="lg" className="h-14 px-8 text-lg">
                            Explore Docs
                        </GlowButton>
                    </div>
                </motion.div>

                {/* Floating Demo Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto text-left">
                    <FloatingCard delay={0}>
                        <MetricCard
                            title="Audit Score"
                            value="98/100"
                            icon={<ShieldCheck className="w-5 h-5 text-primary" />}
                            trend="+12% vs last scan"
                            description="Real-time vulnerability detection"
                        />
                    </FloatingCard>

                    <FloatingCard delay={2}>
                        <MetricCard
                            title="Gas Optimized"
                            value="15.4%"
                            icon={<Zap className="w-5 h-5 text-accent" />}
                            trend="-240k Gas"
                            description="Mantle-specific cost reduction"
                        />
                    </FloatingCard>

                    <FloatingCard delay={4}>
                        <MetricCard
                            title="AI Confidence"
                            value="Secure"
                            icon={<MessageSquare className="w-5 h-5 text-primary" />}
                            trend="High Accuracy"
                            description="Copilot threat analysis active"
                        />
                    </FloatingCard>
                </div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />
        </div>
    );
}
