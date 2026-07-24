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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 9999
      }}
    >
      {/* 3D Rectangular Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          background: 'var(--card)',
          padding: '3rem 5rem',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px var(--border), inset 0 1px 0 rgba(255,255,255,0.05)',
          transformPerspective: 1000,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="spinner" style={{ width: '3rem', height: '3rem', borderWidth: '3px', borderColor: 'var(--border)', borderTopColor: 'var(--primary)' }} />
        <p className="font-display" style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Loading
        </p>
      </motion.div>
    </motion.div>
  );
}
