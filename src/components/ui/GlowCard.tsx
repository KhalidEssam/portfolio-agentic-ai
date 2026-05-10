"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "green" | "violet" | "neutral";

const BORDER: Record<Variant, string> = {
  green:   "rgba(0,255,136,0.22)",
  violet:  "rgba(139,92,246,0.22)",
  neutral: "rgba(255,255,255,0.07)",
};

const HOVER_SHADOW: Record<Variant, string> = {
  green:   "0 10px 36px rgba(0,255,136,0.10)",
  violet:  "0 10px 36px rgba(139,92,246,0.12)",
  neutral: "0 10px 36px rgba(255,255,255,0.04)",
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function GlowCard({
  children,
  variant = "neutral",
  active = false,
  className = "",
  onClick,
}: Props) {
  return (
    <motion.div
      className={`rounded-xl bg-dark-card ${active ? "animate-glow-border" : ""} ${className}`}
      style={{ border: `1px solid ${BORDER[variant]}` }}
      whileHover={{ y: -4, boxShadow: HOVER_SHADOW[variant] }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
