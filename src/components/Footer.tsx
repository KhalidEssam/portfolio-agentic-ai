"use client";

import { motion } from "framer-motion";
import profileData from "@/data/profileData.json";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <p className="text-xs" style={{ color: "#475569" }}>
          © {new Date().getFullYear()} {profileData.personal.name} · Built with Next.js · Powered by AI
        </p>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[10px] font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#64748b",
          }}
          whileHover={{ borderColor: "rgba(0,255,136,0.22)", color: "#00ff88" }}
          transition={{ duration: 0.2 }}
        >
          ↑ Back to top
        </motion.button>
      </div>
    </footer>
  );
}
