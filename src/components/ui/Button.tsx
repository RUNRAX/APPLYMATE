"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import styles from "./components.module.css";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: styles.btnPrimary,
    secondary: styles.btnSecondary,
    ghost: styles.btnGhost,
    outline: styles.btnOutline,
    danger: styles.btnDanger,
  }[variant];

  const sizeClass = {
    sm: styles.btnSm,
    md: styles.btnMd,
    lg: styles.btnLg,
    icon: styles.btnIcon,
  }[size];

  return (
    <motion.button
      className={`${styles.btn} ${variantClass} ${sizeClass} ${className || ""}`}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {isLoading && <span className="spinner" />}
      {!isLoading && icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children}
    </motion.button>
  );
}
