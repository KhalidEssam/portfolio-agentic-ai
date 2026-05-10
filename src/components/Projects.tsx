"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import profileData from "@/data/profileData.json";
import SectionHeader from "./ui/SectionHeader";
import { slideInLeft, SPRING } from "@/lib/animations";

const TAG_PRIORITY: Record<string, "green" | "violet" | "neutral"> = {
  NestJS:   "green",
  "Node.js": "green",
  FastAPI:  "green",
  Python:   "green",
  React:    "violet",
  "Next.js":"violet",
  TypeScript:"violet",
  PostgreSQL:"violet",
};

export default function Projects() {
  const { projects } = profileData;

  return (
    <section
      id="projects"
      className="py-20 px-4"
      style={{
        background: "rgba(255,255,255,0.01)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="04" label="Projects" title="Featured Work" />

        <div className="flex flex-col gap-4 mt-2">
          {projects.map((project, i) => {
            const num     = String(i + 1).padStart(2, "0");
            const isFirst = i === 0;

            return (
              <motion.div
                key={project.name}
                className={`relative rounded-xl p-6 overflow-hidden ${isFirst ? "animate-glow-border" : ""}`}
                style={{
                  background: isFirst ? "rgba(0,255,136,0.025)" : "#0d0d12",
                  border: `1px solid ${isFirst ? "rgba(0,255,136,0.22)" : "rgba(255,255,255,0.07)"}`,
                }}
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: i * 0.12 }}
                whileHover={{
                  x: 6,
                  borderColor: "rgba(0,255,136,0.22)",
                  background: "rgba(0,255,136,0.02)",
                }}
              >
                {/* Number badge */}
                <span
                  className="absolute -top-px left-4 px-2 text-[10px] font-black tracking-[1px]"
                  style={{
                    background: "#080808",
                    color: isFirst ? "#00ff88" : "#475569",
                  }}
                >
                  {num}
                </span>

                <div className="mt-1">
                  <div className="flex items-start justify-between mb-2">
                    <motion.h3
                      className="text-[15px] font-bold text-white"
                      whileHover={{ color: "#00ff88" }}
                      transition={{ duration: 0.15 }}
                    >
                      {project.name}
                    </motion.h3>
                    <div className="flex gap-3 ml-4 flex-shrink-0">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} GitHub`}
                          className="text-base"
                          style={{ color: "#475569" }}
                          whileHover={{ color: "#00ff88", y: -2 }}
                          transition={{ duration: 0.15 }}
                        >
                          <FaGithub />
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} live`}
                          className="text-sm"
                          style={{ color: "#475569" }}
                          whileHover={{ color: "#00ff88", y: -2 }}
                          transition={{ duration: 0.15 }}
                        >
                          <FaExternalLinkAlt />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs leading-[1.7] mb-3" style={{ color: "#64748b" }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => {
                      const v = TAG_PRIORITY[tech] ?? "neutral";
                      return (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[9px] font-semibold"
                          style={{
                            border: `1px solid ${v === "green" ? "rgba(0,255,136,0.22)" : v === "violet" ? "rgba(139,92,246,0.22)" : "rgba(255,255,255,0.07)"}`,
                            color:  v === "green" ? "#00ff88" : v === "violet" ? "#a78bfa" : "#475569",
                            background: v === "green" ? "rgba(0,255,136,0.08)" : v === "violet" ? "rgba(139,92,246,0.10)" : "rgba(255,255,255,0.03)",
                          }}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
