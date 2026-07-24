"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import styles from "./components.module.css";

export const springPhysics = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 28,
  mass: 0.8,
};

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "interactive";
  glow?: boolean;
  interactive?: boolean;
}

export function Card({
  children,
  variant = "default",
  interactive = false,
  className,
  style,
  ...props
}: CardProps) {
  const variantClass = {
    default: styles.card,
    elevated: styles.cardElevated,
    outlined: styles.cardOutlined,
    interactive: styles.cardInteractive,
  }[interactive ? "interactive" : variant];

  return (
    <motion.div
      className={`${variantClass} ${className || ""}`}
      style={style}
      whileHover={interactive ? { y: -3, transition: { duration: 0.2 } } : undefined}
      whileTap={interactive ? { scale: 0.99, transition: { duration: 0.1 } } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Keep backward compatibility - some files import as GlassCard
export const GlassCard = Card;
