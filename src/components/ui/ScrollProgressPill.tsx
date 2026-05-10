"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTIONS = [
  { id: "about",      label: "About"  },
  { id: "rawaq",      label: "Rawaq"  },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Projs"  },
  { id: "experience", label: "Exp."   },
  { id: "contact",    label: "Contact"},
];

export default function ScrollProgressPill() {
  const activeSection = useActiveSection();
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(Math.round(v * 100));
  });

  const activeIdx = SECTIONS.findIndex((s) => s.id === activeSection);
  const activeLabel =
    SECTIONS.find((s) => s.id === activeSection)?.label ?? "Scroll";

  return (
    <motion.div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div
        className="flex flex-col items-center gap-2 px-2.5 py-3 rounded-[40px]"
        style={{
          background: "rgba(8,8,8,0.90)",
          border: "1px solid rgba(0,255,136,0.22)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 24px rgba(0,255,136,0.08)",
        }}
      >
        {/* Scroll % */}
        <span
          className="font-black leading-none"
          style={{ fontSize: 10, color: "#00ff88" }}
        >
          {pct}%
        </span>
        <span
          className="font-semibold uppercase tracking-widest"
          style={{ fontSize: 7, color: "#64748b" }}
        >
          done
        </span>

        {/* Divider */}
        <div style={{ width: 20, height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* Section dots */}
        <div className="flex flex-col items-center gap-1.5">
          {SECTIONS.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
              }
              animate={{
                width:        4,
                height:       activeSection === s.id ? 14 : 4,
                borderRadius: activeSection === s.id ? 2 : 9999,
                background:
                  activeSection === s.id
                    ? "#00ff88"
                    : i < activeIdx
                    ? "rgba(0,255,136,0.35)"
                    : "#334155",
                boxShadow:
                  activeSection === s.id
                    ? "0 0 6px rgba(0,255,136,0.5)"
                    : "none",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "block", cursor: "pointer", border: "none", padding: 0 }}
              aria-label={`Scroll to ${s.label}`}
            />
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: 20, height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* Section name — vertical */}
        <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={activeSection}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: 8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#00ff88",
                whiteSpace: "nowrap",
              }}
            >
              {activeLabel}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
