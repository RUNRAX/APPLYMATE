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
      <GlassLoader />
    </motion.div>
  );
}
