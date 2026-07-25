"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BubbleBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="bubble-bg-container" style={{
      position: "fixed",
      inset: 0,
      zIndex: 0, // Put at 0, and make main zIndex 1
      backgroundColor: "transparent", // Don't use black, let body be black, bubbles float on top
      overflow: "hidden",
      pointerEvents: "none"
    }}>
      {/* Bubble 1: Top Right */}
      <motion.div
        animate={{
          x: ["0%", "-5%", "2%", "0%"],
          y: ["0%", "8%", "-3%", "0%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-35%",
          right: "-15%",
          width: "95vw",
          height: "95vw",
          minWidth: "800px",
          minHeight: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 80%)",
          boxShadow: "inset -10px -10px 30px rgba(255, 255, 255, 0.25), inset -2px -2px 10px rgba(255, 255, 255, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.02)"
        }}
      />
      
      {/* Bubble 2: Bottom Left */}
      <motion.div
        animate={{
          x: ["0%", "8%", "-4%", "0%"],
          y: ["0%", "-10%", "5%", "0%"],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          bottom: "-40%",
          left: "-25%",
          width: "110vw",
          height: "110vw",
          minWidth: "900px",
          minHeight: "900px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 80%)",
          boxShadow: "inset 12px 12px 40px rgba(255, 255, 255, 0.2), inset 2px 2px 12px rgba(255, 255, 255, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.02)"
        }}
      />

      {/* Bubble 3: Bottom Right (Medium) */}
      <motion.div
        animate={{
          x: ["0%", "-12%", "6%", "0%"],
          y: ["0%", "-15%", "8%", "0%"],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-5%",
          width: "55vw",
          height: "55vw",
          minWidth: "500px",
          minHeight: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, #0f0f0f 0%, #000000 80%)",
          boxShadow: "inset -8px 12px 35px rgba(255, 255, 255, 0.3), inset -1px 2px 10px rgba(255, 255, 255, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.02)"
        }}
      />
    </div>
  );
}
