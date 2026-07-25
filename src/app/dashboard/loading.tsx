"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DashboardLoading() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        zIndex: 50
      }}
    >
      {/* Apple-style Frosted Glass Pill */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 2rem',
          borderRadius: '9999px', // Pill shape
          background: 'rgba(255, 255, 255, 0.15)', // Extremely subtle white tint
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 2px 4px rgba(255,255,255,0.1)',
          overflow: 'hidden'
        }}
      >
        <div className="spinner" style={{ width: '1.5rem', height: '1.5rem', borderWidth: '2px', borderColor: 'rgba(255,255,255,0.2)', borderTopColor: 'var(--foreground)' }} />
        <p className="font-sans" style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.02em', margin: 0 }}>
          Loading...
        </p>
      </motion.div>
    </motion.div>
  );
}
