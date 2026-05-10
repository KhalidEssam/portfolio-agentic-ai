"use client";

import { motion } from "framer-motion";
import profileData from "@/data/profileData.json";
import { HiLocationMarker, HiBriefcase, HiAcademicCap, HiGlobe } from "react-icons/hi";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, pillPop, SPRING } from "@/lib/animations";

const META = [
  { icon: <HiLocationMarker className="text-sm" />, text: "Cairo, Egypt · Remote OK" },
  { icon: <HiBriefcase   className="text-sm" />, text: "Open to opportunities · 2 weeks notice" },
  { icon: <HiAcademicCap className="text-sm" />, text: "MSA + Greenwich · BSc Computer Science (GPA 3.6)" },
  { icon: <HiGlobe       className="text-sm" />, text: "Arabic (Native) · English (Fluent) · Italian (Intermediate)" },
];

const STATS = [
  { value: "4+",    label: "Years Experience", variant: "neutral" },
  { value: "2",     label: "Current Roles",    variant: "neutral" },
  { value: "1",     label: "Startup Founded",  variant: "violet"  },
  { value: "AWS ✓", label: "Certified",        variant: "green"   },
];

export default function About() {
  const { personal, availability } = profileData;

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="01" label="About" title="Who I Am" />

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 mt-2">
          {/* Left */}
          <AnimatedSection direction="left">
            <p className="text-sm leading-[1.85] mb-6" style={{ color: "#94a3b8" }}>
              Passionate full-stack developer with 4+ years of experience building scalable backend
              systems and AI-powered applications. I specialize in NestJS and Node.js ecosystems,
              distributed architecture, and integrating LLMs into production products. Currently
              working at <strong className="text-white">BMC</strong> and{" "}
              <strong className="text-white">EXOLN</strong>, while independently building{" "}
              <strong style={{ color: "#a78bfa" }}>Rawaq.app</strong>.
            </p>

            <div className="space-y-2.5 mb-6">
              {META.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-xs" style={{ color: "#64748b" }}>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(0,255,136,0.08)",
                      border: "1px solid rgba(0,255,136,0.22)",
                      color: "#00ff88",
                    }}
                  >
                    {icon}
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[1.5px] mb-2.5" style={{ color: "#475569" }}>
              Looking For
            </p>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: "Mid-Senior Full-Stack", green: true  },
                { label: "AI/ML Engineer",        violet: true },
                { label: "Full-time · Contract · Consulting" },
              ].map(({ label, green, violet }) => (
                <motion.span
                  key={label}
                  variants={pillPop}
                  className="px-3 py-1 rounded-full text-[10px] font-medium"
                  style={{
                    border: `1px solid ${green ? "rgba(0,255,136,0.22)" : violet ? "rgba(139,92,246,0.22)" : "rgba(255,255,255,0.07)"}`,
                    color:  green ? "#00ff88" : violet ? "#a78bfa" : "#64748b",
                    background: green ? "rgba(0,255,136,0.08)" : violet ? "rgba(139,92,246,0.10)" : "rgba(255,255,255,0.03)",
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Right — stat cards */}
          <AnimatedSection direction="right">
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ value, label, variant }, i) => (
                <motion.div
                  key={label}
                  className="rounded-xl p-4"
                  style={{
                    background: "#0d0d12",
                    border: `1px solid ${variant === "green" ? "rgba(0,255,136,0.22)" : variant === "violet" ? "rgba(139,92,246,0.22)" : "rgba(255,255,255,0.07)"}`,
                  }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="text-[28px] font-black leading-none mb-1"
                    style={{
                      color: variant === "green" ? "#00ff88" : variant === "violet" ? "#a78bfa" : "#00ff88",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-[10px] font-medium"
                    style={{
                      color: variant === "green" ? "#00ff88" : variant === "violet" ? "#a78bfa" : "#64748b",
                    }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
