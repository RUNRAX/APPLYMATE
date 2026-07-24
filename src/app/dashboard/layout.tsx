"use client";
import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard.module.css";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Eye,
  BarChart3,
  SlidersHorizontal,
  Lock,
  LogOut,
  Search,
  FileEdit,
  Sparkles,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NotificationBell } from "./NotificationBell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Applications', href: '/dashboard/applications', icon: FileText },
    { label: 'Review Queue', href: '/dashboard/review', icon: Eye },
    { label: 'Resume Builder', href: '/dashboard/resume-builder', icon: FileEdit },
    { label: 'Resume Analysis', href: '/dashboard/resume-analysis', icon: Sparkles },
    { label: 'Insights', href: '/dashboard/insights', icon: BarChart3 },
    { label: 'Preferences', href: '/dashboard/preferences', icon: SlidersHorizontal },
    { label: 'Settings', href: '/dashboard/settings', icon: Lock },
  ];

  const currentPage = navItems.find(item =>
    item.end ? pathname === item.href : pathname.startsWith(item.href)
  );

  return (
    <div className={styles.dashboardOuter}>
      {/* Mobile overlay */}
      <div 
        className={`${styles.mobileSidebarOverlay} ${isMobileMenuOpen ? styles.mobileOpen : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div style={{ 
            opacity: isSidebarCollapsed ? 0 : 1, 
            width: isSidebarCollapsed ? 0 : 'auto',
            overflow: 'hidden',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}>
            <Logo />
          </div>
          
          <button 
            className={styles.collapseBtn} 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map(item => {
            const isActive = item.end
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon className={styles.navIcon} />
                {!isSidebarCollapsed && item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
            </div>
            {!isSidebarCollapsed && (
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className={styles.userName}>
                  {session?.user?.name || 'User'}
                </div>
                <div className={styles.userEmail}>
                  {session?.user?.email}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className={styles.signOutBtn}
            title={isSidebarCollapsed ? "Sign out" : undefined}
          >
            <LogOut className={styles.navIcon} />
            {!isSidebarCollapsed && "Sign out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className={styles.headerTitle}>
              {currentPage?.label || 'Overview'}
            </div>
          </div>
          <div className={styles.headerActions}>
            {/* Search bar */}
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} />
              <input
                placeholder="Search jobs, companies…"
                className={styles.searchInput}
              />
            </div>

            {/* Agent Active badge */}
            <div className={styles.agentBadge}>
              <span className={styles.agentDot}>
                <span className={styles.agentDotPing} />
                <span className={styles.agentDotCore} />
              </span>
              <span>Agent Active</span>
            </div>

            {/* Notification bell */}
            <NotificationBell />
          </div>
        </header>

        <div className={styles.scrollArea}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
