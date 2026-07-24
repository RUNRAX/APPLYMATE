"use client";

import React from "react";
import styles from "./components.module.css";

interface StatusBadgeProps {
  status: string;
}

function getStatusStyles(status: string): { bg: string; color: string; dotColor: string } {
  const s = status.toUpperCase();
  
  if (s === "SUBMITTED" || s === "SUCCESS" || s === "OFFER") {
    return { bg: "#ECFDF5", color: "#065F46", dotColor: "#059669" };
  }
  if (s === "QUEUED" || s === "NEW" || s === "PENDING_REVIEW") {
    return { bg: "#FFFBEB", color: "#92400E", dotColor: "#D97706" };
  }
  if (s === "FAILED" || s === "ERROR" || s === "REJECTED") {
    return { bg: "#FEF2F2", color: "#991B1B", dotColor: "#DC2626" };
  }
  if (s === "REVIEW" || s === "PENDING" || s === "INTERVIEW") {
    return { bg: "#F5F3FF", color: "#5B21B6", dotColor: "#7C3AED" };
  }
  if (s === "APPLIED") {
    return { bg: "#EEF2FF", color: "#3730A3", dotColor: "#4F46E5" };
  }
  
  return { bg: "#F3F4F6", color: "#6B7280", dotColor: "#9CA3AF" };
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { bg, color, dotColor } = getStatusStyles(status);
  
  return (
    <span
      className={styles.statusBadge}
      style={{ background: bg, color }}
    >
      <span className={styles.statusDot} style={{ background: dotColor }} />
      {status.replace(/_/g, " ")}
    </span>
  );
}
