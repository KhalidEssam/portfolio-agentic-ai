"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { fadeUp, fadeLeft, fadeRight, scaleIn, SPRING } from "@/lib/animations";
import { Variants } from "framer-motion";

const VARIANTS: Record<string, Variants> = {
  up:    fadeUp,
  left:  fadeLeft,
  right: fadeRight,
  scale: scaleIn,
};

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  className,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[direction]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ ...SPRING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
