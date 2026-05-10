"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileData from "@/data/profileData.json";
import SectionHeader from "./ui/SectionHeader";
import AnimatedSection from "./ui/AnimatedSection";
import { SPRING } from "@/lib/animations";

export default function Experience() {
  const { experience, education } = profileData;
  const lineRef    = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-60px 0px" });

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader index="05" label="Experience" title="Where I've Worked" />

        {/* Timeline */}
        <div className="relative pl-6 mt-2" ref={lineRef}>
          {/* Animated line */}
          <motion.div
            className="absolute left-0 top-2 bottom-2 w-px origin-top"
            style={{
              background: "linear-gradient(180deg,#00ff88 0%,#7c3aed 60%,transparent 100%)",
            }}
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {experience.map((exp, i) => {
            const isActive = i === 0;
            return (
              <AnimatedSection key={i} delay={i * 0.1} className="relative mb-6">
                {/* Dot */}
                <div
                  className={`absolute -left-[29px] top-5 w-2.5 h-2.5 rounded-full border-2 ${isActive ? "animate-pulse-dot" : ""}`}
                  style={{
                    background:   isActive ? "#00ff88" : "#080808",
                    borderColor:  isActive ? "#00ff88" : "rgba(255,255,255,0.15)",
                    boxShadow:    isActive ? "0 0 12px rgba(0,255,136,0.50)" : "none",
                  }}
                />

                <motion.div
                  className="rounded-xl p-5"
                  style={{
                    background: isActive ? "rgba(0,255,136,0.02)" : "#0d0d12",
                    border: `1px solid ${isActive ? "rgba(0,255,136,0.22)" : "rgba(255,255,255,0.07)"}`,
                  }}
                  whileHover={{ x: 5, borderColor: "rgba(255,255,255,0.14)" }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-[10px] font-semibold mb-1" style={{ color: "#00ff88" }}>
                    {exp.period}
                  </p>
                  <h3 className="text-sm font-bold text-white mb-0.5">{exp.role}</h3>
                  <p className="text-xs mb-3" style={{ color: "#64748b" }}>
                    {exp.company} · {exp.location}
                  </p>
                  <p className="text-xs leading-[1.7] mb-3" style={{ color: "#475569" }}>
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[9px] font-medium"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "#475569",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Education */}
        <SectionHeader index="" label="" title="Education" />
        <div className="space-y-4 mt-2">
          {education.map((edu, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                className="rounded-xl p-5"
                style={{
                  background: "#0d0d12",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p className="text-[10px] font-semibold mb-1" style={{ color: "#00ff88" }}>
                  {edu.period || "Graduated"}
                </p>
                <h3 className="text-sm font-bold text-white mb-0.5">{edu.degree}</h3>
                <p className="text-xs mb-2" style={{ color: "#64748b" }}>{edu.institution}</p>
                <p className="text-xs" style={{ color: "#475569" }}>{edu.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
