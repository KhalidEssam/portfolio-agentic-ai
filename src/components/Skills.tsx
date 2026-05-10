"use client";

import { motion } from "framer-motion";
import profileData from "@/data/profileData.json";
import SectionHeader from "./ui/SectionHeader";
import { pillPop, staggerContainer, SPRING } from "@/lib/animations";

type CardVariant = "green" | "violet" | "neutral";

const CATEGORY_CONFIG: Record<string, { variant: CardVariant; label?: string }> = {
  Backend:  { variant: "green",   label: "Core Expertise" },
  Frontend: { variant: "violet"  },
  "AI/ML":  { variant: "neutral" },
  DevOps:   { variant: "neutral" },
  Tools:    { variant: "neutral" },
};

const ICONS: Record<string, string> = {
  Frontend: "🎨",
  Backend:  "⚙️",
  "AI/ML":  "🤖",
  DevOps:   "☁️",
  Tools:    "🛠️",
};

const BORDER: Record<CardVariant, string> = {
  green:   "rgba(0,255,136,0.22)",
  violet:  "rgba(139,92,246,0.22)",
  neutral: "rgba(255,255,255,0.07)",
};

const CAT_COLOR: Record<CardVariant, string> = {
  green:   "#00ff88",
  violet:  "#a78bfa",
  neutral: "#64748b",
};

const PILL_STYLE: Record<CardVariant, { border: string; color: string; bg: string }> = {
  green:   { border: "rgba(0,255,136,0.22)",   color: "#00ff88", bg: "rgba(0,255,136,0.08)"   },
  violet:  { border: "rgba(139,92,246,0.22)",  color: "#a78bfa", bg: "rgba(139,92,246,0.10)"  },
  neutral: { border: "rgba(255,255,255,0.07)", color: "#64748b", bg: "rgba(255,255,255,0.03)" },
};

export default function Skills() {
  const { skills } = profileData;
  const entries = Object.entries(skills);

  return (
    <section id="skills" className="py-20 px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="03" label="Skills" title="Tech Stack" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {entries.map(([category, items], i) => {
            const cfg     = CATEGORY_CONFIG[category] ?? { variant: "neutral" as CardVariant };
            const variant = cfg.variant;
            const isWide  = category === "Backend";

            return (
              <motion.div
                key={category}
                className={`rounded-xl p-5 ${isWide ? "sm:col-span-2 lg:col-span-2" : ""}`}
                style={{
                  background: "#0d0d12",
                  border: `1px solid ${BORDER[variant]}`,
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: `0 10px 36px ${variant === "green" ? "rgba(0,255,136,0.10)" : variant === "violet" ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.04)"}` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-[26px] h-[26px] rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{
                      background: variant === "green" ? "rgba(0,255,136,0.08)" : variant === "violet" ? "rgba(139,92,246,0.10)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${BORDER[variant]}`,
                    }}
                  >
                    {ICONS[category] ?? "📦"}
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[1.5px]"
                    style={{ color: CAT_COLOR[variant] }}
                  >
                    {category}
                    {cfg.label && (
                      <span className="ml-2 opacity-60 normal-case tracking-normal text-[9px]">
                        — {cfg.label}
                      </span>
                    )}
                  </span>
                </div>

                {/* Pills */}
                <motion.div
                  className="flex flex-wrap gap-1.5"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {items.map((skill) => {
                    const s = PILL_STYLE[variant];
                    return (
                      <motion.span
                        key={skill}
                        variants={pillPop}
                        className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                        style={{ border: `1px solid ${s.border}`, color: s.color, background: s.bg }}
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
