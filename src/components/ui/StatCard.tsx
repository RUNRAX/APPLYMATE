"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { slideUp } from "@/lib/animations";
import styles from "./components.module.css";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, trend, trendValue, icon }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const numericValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
    const isPercentage = typeof value === "string" && value.includes("%");
    const suffix = isPercentage ? "%" : "";

    if (isNaN(numericValue)) {
      setDisplayValue(String(value));
      return;
    }

    const duration = 1200;
    const startTime = performance.now();

    function tick(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numericValue * eased);
      setDisplayValue(current + suffix);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(Math.round(numericValue) + suffix);
      }
    }

    requestAnimationFrame(tick);
  }, [value]);

  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "—";
  const trendClass = trend === "up" ? styles.statCardTrendUp : trend === "down" ? styles.statCardTrendDown : styles.statCardTrendNeutral;

  return (
    <motion.div
      className={styles.statCard}
      variants={slideUp}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className={styles.statCardAccent} />
      <div className={styles.statCardHeader}>
        <span className={styles.statCardLabel}>{label}</span>
        {icon && <div className={styles.statCardIcon}>{icon}</div>}
      </div>
      <div className={styles.statCardValue}>{displayValue}</div>
      {trend && trendValue && (
        <div className={`${styles.statCardTrend} ${trendClass}`}>
          <span>{trendIcon}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </motion.div>
  );
}
