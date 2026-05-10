"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import profileData from "@/data/profileData.json";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_LINKS = [
  { href: "#about",      label: "About",      id: "about"      },
  { href: "#rawaq",      label: "Rawaq",       id: "rawaq"      },
  { href: "#skills",     label: "Skills",      id: "skills"     },
  { href: "#projects",   label: "Projects",    id: "projects"   },
  { href: "#experience", label: "Experience",  id: "experience" },
  { href: "#contact",    label: "Contact",     id: "contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const activeSection           = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0.60)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-base font-black text-white tracking-tight">
          {profileData.personal.name.split(" ")[0]}
          <span style={{ color: "#00ff88" }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-xs font-medium pb-0.5 transition-colors duration-200"
              style={{ color: activeSection === link.id ? "#ffffff" : "#64748b" }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-0.5 h-px rounded-full"
                  style={{ background: "linear-gradient(90deg,#00ff88,transparent)" }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            className="text-xs font-bold px-4 py-1.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#00ff88", color: "#080808" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 6px 20px rgba(0,255,136,0.30)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="px-4 py-2 flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-sm font-medium border-b transition-colors"
                  style={{
                    color: activeSection === link.id ? "#00ff88" : "#64748b",
                    borderColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-3 mb-2 py-2.5 text-center text-xs font-bold rounded-lg"
                style={{ background: "#00ff88", color: "#080808" }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
