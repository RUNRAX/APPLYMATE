import { Variants, Transition } from 'framer-motion';

/* ─── Shared Spring Physics ─── */
export const springPhysics: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 0.8,
};

export const smoothSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 24,
  mass: 0.6,
};

/* ─── Fade In ─── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

/* ─── Slide Up + Fade ─── */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

/* ─── Slide In from Left ─── */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

/* ─── Scale In (Modals, Dropdowns) ─── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

/* ─── Stagger Container ─── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    }
  }
};

/* ─── Stagger Item ─── */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  },
};

/* ─── Page Transition ─── */
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

/* ─── Dropdown Enter (from top) ─── */
export const dropdownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -8, 
    scale: 0.96,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.12, ease: 'easeIn' }
  }
};

/* ─── Hover Lift (for interactive cards) ─── */
export const hoverLift = {
  whileHover: { y: -3, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
};

/* ─── Count Up Animation Helper ─── */
export function countUpAnimation(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
) {
  const startTime = performance.now();
  
  function tick(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Cubic ease-out
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = from + (to - from) * eased;
    
    onUpdate(current);
    
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  }
  
  requestAnimationFrame(tick);
}
