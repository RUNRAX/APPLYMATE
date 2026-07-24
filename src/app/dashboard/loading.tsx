"use client";
import { Cpu, Terminal, Settings, Database, Cloud, Code, GitBranch, Layers, LayoutTemplate, Workflow } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DashboardLoading() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const Icons = [Cpu, Terminal, Settings, Database, Cloud, Code, GitBranch, Layers, LayoutTemplate, Workflow];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--background-secondary)',
        overflow: 'hidden',
        zIndex: 50
      }}
    >
      {/* Animated Background Engineering Icons Grid */}
      <div style={{
        position: 'absolute',
        inset: -50,
        opacity: 0.03,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '3rem',
        padding: '2rem',
        pointerEvents: 'none',
        transform: 'rotate(-5deg) scale(1.1)'
      }}>
        {Array.from({ length: 60 }).map((_, i) => {
          const Icon = Icons[i % Icons.length];
          return (
            <motion.div 
              key={i} 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon size={48} />
            </motion.div>
          );
        })}
      </div>

      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        zIndex: 2,
        background: 'var(--card)',
        padding: '3rem 4rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border)'
      }}>
        <div className="spinner" style={{ width: '3rem', height: '3rem', borderWidth: '3px', borderColor: 'var(--border)', borderTopColor: 'var(--primary)' }} />
        <p className="font-display" style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Loading Workspace
        </p>
      </div>
    </motion.div>
  );
}
