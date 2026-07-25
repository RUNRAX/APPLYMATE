"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassLoader } from "@/components/ui/GlassLoader";

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 12rem)',
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <GlassLoader />
    </motion.div>
  );
}
