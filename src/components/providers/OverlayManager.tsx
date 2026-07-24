"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface OverlayContextType {
  activeOverlayId: string | null;
  openOverlay: (id: string) => void;
  closeOverlay: () => void;
  isOverlayOpen: (id: string) => boolean;
}

const OverlayContext = createContext<OverlayContextType>({
  activeOverlayId: null,
  openOverlay: () => {},
  closeOverlay: () => {},
  isOverlayOpen: () => false,
});

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [activeOverlayId, setActiveOverlayId] = useState<string | null>(null);

  const openOverlay = useCallback((id: string) => {
    setActiveOverlayId(id);
  }, []);

  const closeOverlay = useCallback(() => {
    setActiveOverlayId(null);
  }, []);

  const isOverlayOpen = useCallback((id: string) => {
    return activeOverlayId === id;
  }, [activeOverlayId]);

  // Global Escape key handler
  useEffect(() => {
    if (!activeOverlayId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveOverlayId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeOverlayId]);

  return (
    <OverlayContext.Provider value={{ activeOverlayId, openOverlay, closeOverlay, isOverlayOpen }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay(id: string) {
  const { activeOverlayId, openOverlay, closeOverlay, isOverlayOpen } = useContext(OverlayContext);
  
  const isOpen = isOverlayOpen(id);
  
  const open = useCallback(() => openOverlay(id), [openOverlay, id]);
  const close = useCallback(() => {
    if (activeOverlayId === id) closeOverlay();
  }, [activeOverlayId, closeOverlay, id]);
  
  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return { isOpen, open, close, toggle };
}

export { OverlayContext };
