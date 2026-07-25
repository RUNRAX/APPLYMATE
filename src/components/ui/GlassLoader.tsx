"use client";

import { motion } from "framer-motion";

export function GlassLoader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '2rem'
    }}>
      {/* Liquid Glass Circular Element */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.0) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderTopColor: 'rgba(255, 255, 255, 0.8)', // This makes the rotation visible
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Inner subtle glow */}
        <div style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.1)'
        }} />
      </motion.div>
      <p className="font-display animate-pulse" style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
        Loading...
      </p>
    </div>
  );
}
