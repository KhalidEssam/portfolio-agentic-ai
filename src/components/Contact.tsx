"use client";

import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiGlobe } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import profileData from "@/data/profileData.json";
import AnimatedSection from "./ui/AnimatedSection";
import { SPRING } from "@/lib/animations";

export default function Contact() {
  const { personal, socialLinks } = profileData;

  const CARDS = [
    { icon: <HiMail className="text-base" />,          label: "Email",    value: personal.email,    href: `mailto:${personal.email}`   },
    { icon: <HiPhone className="text-base" />,         label: "Phone",    value: personal.phone,    href: `tel:${personal.phone}`      },
    { icon: <HiLocationMarker className="text-base" />,label: "Location", value: `${personal.location} · Remote`, href: null          },
    { icon: <HiGlobe className="text-base" />,         label: "Website",  value: personal.website,  href: personal.website             },
  ];

  const SOCIALS = [
    { href: socialLinks.github,   icon: <FaGithub />,   label: "GitHub"   },
    { href: socialLinks.linkedin, icon: <FaLinkedin />, label: "LinkedIn" },
    { href: socialLinks.twitter,  icon: <FaTwitter />,  label: "Twitter"  },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4"
      style={{
        background: "rgba(255,255,255,0.01)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-[600px] mx-auto text-center">
          <AnimatedSection>
            <span className="block text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: "#00ff88" }}>
              06 — Contact
            </span>
            <h2 className="text-[32px] font-black text-white mb-3">Let&apos;s Build Together</h2>
            <p className="text-sm mb-10" style={{ color: "#64748b" }}>
              Currently open to full-time, contract, and consulting roles. Drop me a line.
            </p>
          </AnimatedSection>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left">
            {CARDS.map(({ icon, label, value, href }, i) => {
              const inner = (
                <motion.div
                  key={label}
                  className="rounded-xl p-4 flex items-center gap-3"
                  style={{
                    background: "#0d0d12",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: i * 0.09 }}
                  whileHover={{ y: -3, borderColor: "rgba(0,255,136,0.22)", boxShadow: "0 10px 30px rgba(0,255,136,0.07)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(0,255,136,0.08)",
                      border: "1px solid rgba(0,255,136,0.22)",
                      color: "#00ff88",
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[1px] mb-0.5" style={{ color: "#64748b" }}>
                      {label}
                    </p>
                    <p className="text-xs font-semibold text-white">{value}</p>
                  </div>
                </motion.div>
              );
              return href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </div>

          {/* Social buttons */}
          <div className="flex gap-3 justify-center">
            {SOCIALS.map(({ href, icon, label }, i) =>
              href ? (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-base"
                  style={{
                    background: "#0d0d12",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#64748b",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: 0.35 + i * 0.08 }}
                  whileHover={{ y: -3, borderColor: "rgba(0,255,136,0.22)", color: "#00ff88", boxShadow: "0 8px 20px rgba(0,255,136,0.10)" }}
                >
                  {icon}
                </motion.a>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
