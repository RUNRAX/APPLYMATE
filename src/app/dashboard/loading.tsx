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
          padding: '0.8rem 1.5rem',
          borderRadius: '9999px',
          background: 'rgba(30, 30, 30, 0.6)', // Transparent dark grey
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)',
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
