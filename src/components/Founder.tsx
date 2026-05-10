"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, pillPop } from "@/lib/animations";

const STACK_TAGS = [
  { label: "Next.js",            variant: "violet" },
  { label: "React Native",       variant: "violet" },
  { label: "Supabase PostgreSQL",variant: "green"  },
  { label: "Realtime + RLS",     variant: "green"  },
  { label: "Redis / Upstash",    variant: "green"  },
  { label: "Serverless",         variant: "neutral"},
  { label: "OTA Updates",        variant: "neutral"},
  { label: "TypeScript",         variant: "neutral"},
] as const;

type TagVariant = "green" | "violet" | "neutral";

const TAG_STYLES: Record<TagVariant, { border: string; color: string; bg: string }> = {
  green:   { border: "rgba(0,255,136,0.22)",   color: "#00ff88", bg: "rgba(0,255,136,0.08)"   },
  violet:  { border: "rgba(139,92,246,0.22)",  color: "#a78bfa", bg: "rgba(139,92,246,0.10)"  },
  neutral: { border: "rgba(255,255,255,0.07)", color: "#64748b", bg: "rgba(255,255,255,0.03)" },
};

export default function Founder() {
  return (
    <section
      id="rawaq"
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: "rgba(139,92,246,0.02)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Orb */}
      <div
        className="absolute pointer-events-none rounded-full animate-orb-breathe"
        style={{
          top: -60, right: -60, width: 300, height: 300,
          background: "radial-gradient(circle,rgba(139,92,246,0.16) 0%,transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader index="02" label="Founder" title="Building Rawaq" />

        <AnimatedSection direction="scale">
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: "#0d0d12",
              border: "1px solid rgba(139,92,246,0.22)",
            }}
          >
            {/* Top gradient overlay */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: 180,
                background: "linear-gradient(135deg,rgba(139,92,246,0.12) 0%,transparent 60%)",
              }}
            />

            {/* Card top */}
            <div className="relative z-10 p-7 grid sm:grid-cols-[1fr_auto] gap-5 items-start">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[1px] mb-3"
                  style={{
                    background: "rgba(139,92,246,0.10)",
                    border: "1px solid rgba(139,92,246,0.22)",
                    color: "#a78bfa",
                  }}
                >
                  🚀 Founder &amp; Solo Developer
                </span>

                <h3 className="text-[28px] font-black text-white mb-2 tracking-tight">
                  Rawaq
                  <span
                    style={{
                      background: "linear-gradient(90deg,#a78bfa,#00ff88)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    .app
                  </span>
                </h3>

                <p className="text-sm leading-[1.75] mb-4 max-w-xl" style={{ color: "#64748b" }}>
                  A social community platform and B2B event marketplace where organizers can
                  seamlessly create, manage, and sell tickets — built entirely solo as founder
                  and developer across web and mobile.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["🌐 Next.js Platform", "📱 React Native App", "⚡ Serverless Backend"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold"
                        style={{
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "#64748b",
                          background: "rgba(255,255,255,0.03)",
                        }}
                      >
                        {badge}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                <p className="text-[9px] uppercase tracking-[1px] mb-1.5" style={{ color: "#475569" }}>
                  Status
                </p>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold"
                  style={{
                    background: "rgba(0,255,136,0.08)",
                    border: "1px solid rgba(0,255,136,0.22)",
                    color: "#00ff88",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-dot" />
                  In Development
                </span>
              </div>
            </div>

            {/* Middle — two feature cards */}
            <div className="relative z-10 grid sm:grid-cols-2 gap-4 px-7 pb-6">
              {[
                {
                  icon: "🎟️",
                  title: "Event Marketplace",
                  body: "B2B platform for organizers to list and sell tickets. Real-time sales dashboards, attendee management, and QR check-in powered by Supabase Realtime.",
                },
                {
                  icon: "👥",
                  title: "Community Layer",
                  body: "Social discovery layer for users to find events, follow organizers, and connect. Redis/Upstash caching for performance. OTA mobile updates via Expo.",
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[1.5px] mb-2"
                    style={{ color: "#a78bfa" }}
                  >
                    {icon} {title}
                  </p>
                  <p className="text-xs leading-[1.7]" style={{ color: "#64748b" }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer — tech tags + link */}
            <div
              className="relative z-10 px-7 py-4 flex flex-wrap items-center justify-between gap-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <motion.div
                className="flex flex-wrap gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {STACK_TAGS.map(({ label, variant }) => {
                  const s = TAG_STYLES[variant];
                  return (
                    <motion.span
                      key={label}
                      variants={pillPop}
                      className="px-2 py-0.5 rounded text-[9px] font-semibold"
                      style={{ border: `1px solid ${s.border}`, color: s.color, background: s.bg }}
                    >
                      {label}
                    </motion.span>
                  );
                })}
              </motion.div>

              <motion.a
                href="https://rawaq.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-4 py-1.5 rounded-lg text-[10px] font-semibold transition-colors"
                style={{
                  border: "1px solid rgba(139,92,246,0.22)",
                  color: "#a78bfa",
                }}
                whileHover={{
                  background: "rgba(139,92,246,0.10)",
                  borderColor: "rgba(139,92,246,0.40)",
                }}
                transition={{ duration: 0.2 }}
              >
                rawaq.app ↗
              </motion.a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
