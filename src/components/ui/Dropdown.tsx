"use client";

import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useOverlay } from "@/components/providers/OverlayManager";
import { dropdownVariants } from "@/lib/animations";
import styles from "./components.module.css";

interface DropdownProps {
  id: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  width?: number | string;
  className?: string;
}

export function Dropdown({ id, trigger, children, align = "right", width = 320, className }: DropdownProps) {
  const { isOpen, toggle, close } = useOverlay(id);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click-outside detection
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    // Delay to avoid the triggering click
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen, close]);

  return (
    <div ref={containerRef} className={styles.dropdownWrapper}>
      <div onClick={toggle} style={{ cursor: "pointer" }}>
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.dropdown} ${align === "left" ? styles.dropdownLeft : ""} ${className || ""}`}
            style={{ width }}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
