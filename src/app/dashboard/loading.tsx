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
      {/* Liquid Glass Morphism Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '3.5rem 5.5rem',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.0) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)',
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
          overflow: 'hidden'
        }}
      >
        {/* Animated Shine Effect */}
        <motion.div
          animate={{ x: ['-150%', '250%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            transform: 'skewX(-25deg)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />

        <div className="spinner" style={{ position: 'relative', zIndex: 1, width: '3.5rem', height: '3.5rem', borderWidth: '3px', borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)' }} />
        <p className="font-display" style={{ position: 'relative', zIndex: 1, color: 'var(--foreground)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Loading
        </p>
      </motion.div>
    </motion.div>
  );
}
