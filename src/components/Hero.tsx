"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import profileData from "@/data/profileData.json";
import { SPRING } from "@/lib/animations";

const CODE_LINES = [
  { key: "stack",     value: "['NestJS', 'React']",   valueColor: "#f59e0b" },
  { key: "ai",        value: "['LangChain', 'RAG']",  valueColor: "#f59e0b" },
  { key: "founder",   value: "'Rawaq.app'",            valueColor: "#a78bfa" },
  { key: "available", value: "true",                   valueColor: "#00ff88" },
  { key: "remote",    value: "true",                   valueColor: "#00ff88" },
  { key: "yoe",       value: "4",                      valueColor: "#fb923c" },
];

const HERO_ITEMS = [
  { delay: 0.1 },
  { delay: 0.2 },
  { delay: 0.3 },
  { delay: 0.4 },
  { delay: 0.5 },
  { delay: 0.65 },
];

export default function Hero() {
  const { personal, socialLinks } = profileData;
  const canvasRef                 = useRef<HTMLCanvasElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${p.o})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* Typewriter */
  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= CODE_LINES.length) { clearInterval(iv); return prev; }
          return prev + 1;
        });
      }, 260);
      return () => clearInterval(iv);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-4 py-20"
    >
      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      />

      {/* Orbs */}
      <div
        className="absolute pointer-events-none rounded-full animate-orb-breathe"
        style={{
          top: -100, right: -80, width: 500, height: 500,
          background: "radial-gradient(circle,rgba(139,92,246,0.20) 0%,transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full animate-orb-breathe"
        style={{
          bottom: -60, left: -60, width: 340, height: 340,
          background: "radial-gradient(circle,rgba(0,255,136,0.10) 0%,transparent 65%)",
          animationDelay: "1.5s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div className="flex flex-col gap-4">
          {/* Status chip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: HERO_ITEMS[0].delay }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{
                background: "rgba(0,255,136,0.08)",
                border: "1px solid rgba(0,255,136,0.22)",
                color: "#00ff88",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-dot" />
              Open to opportunities
            </span>
          </motion.div>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: HERO_ITEMS[1].delay }}
            className="text-[10px] font-semibold uppercase tracking-[2.5px] text-gray-500"
          >
            Full-Stack Developer · AI Enthusiast · Founder
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: HERO_ITEMS[2].delay }}
            className="text-5xl font-black leading-[1.02] tracking-[-1.5px] text-white"
          >
            Hi, I&apos;m
            <br />
            <span
              style={{
                background: "linear-gradient(100deg,#00ff88 0%,#a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {personal.name}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: HERO_ITEMS[3].delay }}
            className="text-sm text-gray-500 leading-[1.8] max-w-sm"
          >
            Building scalable backend systems and AI-powered applications. Founder of{" "}
            <span style={{ color: "#a78bfa" }}>Rawaq.app</span> — a community-driven event platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: HERO_ITEMS[4].delay }}
            className="flex gap-3 flex-wrap"
          >
            <motion.a
              href="#contact"
              className="px-5 py-2.5 rounded-lg text-xs font-bold"
              style={{ background: "#00ff88", color: "#080808" }}
              whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(0,255,136,0.28)" }}
              transition={{ duration: 0.2 }}
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="px-5 py-2.5 rounded-lg text-xs font-medium"
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                color: "#64748b",
              }}
              whileHover={{ y: -3, color: "#fff", borderColor: "rgba(255,255,255,0.20)" }}
              transition={{ duration: 0.2 }}
            >
              View Projects →
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: HERO_ITEMS[5].delay }}
            className="flex gap-5"
          >
            {[
              { href: socialLinks.github,   icon: <FaGithub />,   label: "GitHub"   },
              { href: socialLinks.linkedin, icon: <FaLinkedin />, label: "LinkedIn" },
              { href: socialLinks.twitter,  icon: <FaTwitter />,  label: "Twitter"  },
            ].map(({ href, icon, label }) =>
              href ? (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-lg text-gray-500"
                  whileHover={{ y: -2, color: "#00ff88" }}
                  transition={{ duration: 0.15 }}
                >
                  {icon}
                </motion.a>
              ) : null
            )}
          </motion.div>
        </div>

        {/* Right — Code card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.35 }}
          className="animate-float"
        >
          <div
            className="rounded-[14px] overflow-hidden animate-glow-border"
            style={{
              background: "#0d0d12",
              border: "1px solid rgba(0,255,136,0.22)",
            }}
          >
            {/* Card header */}
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{
                background: "rgba(0,255,136,0.04)",
                borderBottom: "1px solid rgba(0,255,136,0.12)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <span className="w-2 h-2 rounded-full bg-[#28c840]" />
              <span className="ml-1 text-[10px] font-mono" style={{ color: "#64748b" }}>
                engineer.ts
              </span>
            </div>

            {/* Code body */}
            <div className="px-5 py-4 font-mono text-[11.5px] leading-[2.1]">
              <div>
                <span style={{ color: "#818cf8" }}>const</span>{" "}
                <span style={{ color: "#00ff88" }}>khaled</span> = {"{"}
              </div>

              {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={line.key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="pl-4"
                >
                  <span style={{ color: "#94a3b8" }}>{line.key}</span>
                  <span style={{ color: "#64748b" }}>: </span>
                  <span style={{ color: line.valueColor }}>{line.value}</span>
                  <span style={{ color: "#64748b" }}>,</span>
                </motion.div>
              ))}

              <div>
                {"};"}
                {visibleLines >= CODE_LINES.length && (
                  <span
                    className="inline-block w-0.5 h-3.5 ml-0.5 align-text-bottom animate-cursor-blink"
                    style={{ background: "#00ff88" }}
                  />
                )}
              </div>
              <div className="mt-2" style={{ color: "#334155" }}>
                {"// Currently @ BMC + EXOLN"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
