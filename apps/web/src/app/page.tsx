"use client";

import { LandingHero } from "@/components/dashboard/landing-hero";
import { SectionCard } from "@/components/shared/section-card";
import { Shield, Zap, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <LandingHero />
      
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">The Security Standard for Mantle</h2>
          <p className="text-muted-foreground text-lg">Engineered for accuracy, speed, and efficiency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Vulnerability Shield",
              desc: "Deep scan contracts for ownership bugs, reentrancy, and Mantle-specific edge cases.",
              icon: <Shield className="w-8 h-8 text-[#00FFB2]" />,
            },
            {
              title: "Gas Profiler",
              desc: "Identify expensive opcodes and optimize your logic for Mantle\"\"s L2 architecture.",
              icon: <Zap className="w-8 h-8 text-[#00C2FF]" />,
            },
            {
              title: "Mantle Copilot",
              desc: "A dedicated AI interface for smart contract queries, trained on the official Mantle ecosystem.",
              icon: <Terminal className="w-8 h-8 text-[#00FFB2]" />,
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <SectionCard title={feature.title} description="" icon={feature.icon}>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </SectionCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
