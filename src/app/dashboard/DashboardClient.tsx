"use client";

import { useTransition, useState, useCallback } from "react";
import { useSSE } from "@/features/dashboard/useSSE";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import styles from "./dashboard.module.css";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TrendingUp, Clock, ArrowUpRight, PlayCircle, FileText, Link as LinkIcon, Play, Square } from "lucide-react";
import { testAutoApply } from "@/app/actions/test-apply";
import ResumeVault from "./ResumeVault";

interface DashboardClientProps {
  stats: {
    totalApplied: number;
    queuedApps: number;
    pendingReviews: number;
    matchRate: string;
    activeBots: number;
  };
  initialResume: any;
  connectedPlatforms?: string[];
}

export default function DashboardClient({ stats, initialResume, connectedPlatforms = [] }: DashboardClientProps) {
  const [isPending, startTransition] = useTransition();
  const [testMessage, setTestMessage] = useState("");
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [agentLoading, setAgentLoading] = useState(false);
  const events = useSSE();
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] || 'there';

  const handleTestApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;
    startTransition(() => {
      testAutoApply(formData).then(() => {
        form.reset();
        setTestMessage("Successfully sent to Review Queue!");
        setTimeout(() => setTestMessage(""), 5000);
      });
    });
  };

  return (
    <motion.div 
      className={styles.container}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Welcome Hero Banner */}
      <motion.div variants={staggerItem}>
        <Card variant="elevated" className={styles.welcomeHero}>
          <div className={styles.heroContent}>
            <div className={styles.heroLabel}>Welcome back</div>
            <h1 className={styles.heroTitle}>
              Hello, <span>{firstName}.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Your autonomous agent is scanning <strong>{stats.activeBots > 0 ? '42 boards' : '0 boards'}</strong> right now.
              {stats.pendingReviews > 0 ? ` ${stats.pendingReviews} high-fit roles need your review.` : ' No pending reviews.'}
            </p>
            <div className={styles.heroActions}>
              <Link href="/dashboard/review">
                <Button variant="primary" size="md">
                  Review Queue <ArrowUpRight size={16} />
                </Button>
              </Link>
              <Button variant="outline" size="md" onClick={() => alert("Feature coming soon! (Agent Pause/Resume functionality)")}>
                Pause Agent
              </Button>
            </div>
          </div>
          
          <div className={styles.testApplySection}>
            <form onSubmit={handleTestApply} className={styles.testApplyForm}>
              <div className={styles.inputWrapper}>
                <Input name="jobUrl" placeholder="Paste a LinkedIn Job URL to test the bot..." disabled={isPending} required />
              </div>
              <Button variant="primary" type="submit" size="md" disabled={isPending}>
                {isPending ? (
                  <><span className="spinner"></span> Queuing...</>
                ) : (
                  <><PlayCircle size={16} /> Test Auto-Apply</>
                )}
              </Button>
            </form>
            {testMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={styles.successMessage}
              >
                ✓ {testMessage}
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Quick Setup Actions */}
      <motion.div variants={staggerItem} className={styles.statsGrid}>
        <Card className={styles.setupCard}>
          <div className={styles.setupCardHeader}>
            <div className={`${styles.setupIcon} ${stats.activeBots > 0 ? styles.iconActive : styles.iconIdle}`}>
              {stats.activeBots > 0 ? <Square size={20} /> : <Play size={20} />}
            </div>
            <div>
              <h3 className={styles.setupTitle}>{stats.activeBots > 0 ? "Agent Running" : "Agent Idle"}</h3>
              <p className={styles.setupDescription}>{stats.activeBots > 0 ? "Discovery agent is actively scanning for jobs." : "Start the agent to begin automated job discovery."}</p>
            </div>
          </div>
          <div className={styles.setupAction}>
            <Button 
              variant={stats.activeBots > 0 ? "outline" : "primary"} 
              disabled={agentLoading}
              onClick={async () => {
                setAgentLoading(true);
                try {
                  if (stats.activeBots > 0) {
                    await fetch('/api/agent/stop', { method: 'POST' });
                  } else {
                    const { startAgent } = await import('@/app/actions/agent');
                    await startAgent();
                  }
                  window.location.reload();
                } catch (err) {
                  console.error('Agent toggle failed:', err);
                  setAgentLoading(false);
                }
              }}
              className={styles.fullWidthBtn}
            >
              {agentLoading ? <><span className="spinner"></span> {stats.activeBots > 0 ? 'Stopping...' : 'Starting...'}</> : (stats.activeBots > 0 ? 'Stop Agent' : 'Start Agent')}
            </Button>
          </div>
        </Card>

        <Card className={styles.setupCard}>
          <div className={styles.setupCardHeader}>
            <div className={`${styles.setupIcon} ${styles.iconPurple}`}>
              <FileText size={20} />
            </div>
            <div>
              <h3 className={styles.setupTitle}>
                {initialResume ? "Resume Uploaded" : "Add Base Resume"}
              </h3>
              <p className={styles.setupDescription}>
                {initialResume 
                  ? "Your active base resume is ready for the agent to use." 
                  : "The agent uses this to tailor a new resume for each job."}
              </p>
            </div>
          </div>
          <div className={styles.setupAction}>
            <Button variant={initialResume ? "outline" : "primary"} className={styles.fullWidthBtn} onClick={() => setIsResumeModalOpen(true)}>
              {initialResume ? "Re-upload Resume" : "Upload Resume"}
            </Button>
          </div>
        </Card>

        {/* Connect Platforms Card */}
        <Card className={styles.setupCard}>
          <div className={styles.setupCardHeader}>
            <div className={`${styles.setupIcon} ${styles.iconAmber}`}>
              <LinkIcon size={20} />
            </div>
            <div>
              <h3 className={styles.setupTitle}>
                {connectedPlatforms?.includes('company_portal') || connectedPlatforms?.includes('linkedin') ? "Platforms Linked" : "Link Platforms"}
              </h3>
              <p className={styles.setupDescription}>
                {connectedPlatforms?.includes('company_portal') || connectedPlatforms?.includes('linkedin')
                  ? "Your agent has access to job portals." 
                  : "Connect accounts for the agent to use."}
              </p>
            </div>
          </div>
          <div className={styles.platformActions}>
            <Link href="/dashboard/connect/company_portal" className={styles.linkUnstyled}>
              <Button variant={connectedPlatforms?.includes('company_portal') ? "outline" : "primary"} className={styles.fullWidthBtn}>
                {connectedPlatforms?.includes('company_portal') ? "✓ Google Connected" : "Connect Google"}
              </Button>
            </Link>
            <Link href="/dashboard/connect/linkedin" className={styles.linkUnstyled}>
              <Button variant="outline" className={styles.fullWidthBtn}>
                {connectedPlatforms?.includes('linkedin') ? "✓ LinkedIn Connected" : "Connect LinkedIn"}
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Resume Vault Modal */}
      <ResumeVault initialResume={initialResume} isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />

      {/* Stat Cards — 2 column layout */}
      <motion.div variants={staggerItem} className={styles.statsGrid}>
        <StatCard
          label="Total Applied"
          value={stats.totalApplied}
          trend="up"
          trendValue="+12 this week"
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          label="Queued"
          value={stats.queuedApps}
          trend="neutral"
          trendValue="Ready to ship"
          icon={<Clock size={20} />}
        />
      </motion.div>

      {/* Bento Grid — Activity + Live Feed */}
      <motion.div variants={staggerItem} className={styles.bentoGrid}>
        <Card className={styles.activityCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Application Activity</h3>
            <span className={styles.cardSubtitle}>Last 7 days</span>
          </div>
          <div className={styles.activityContent}>
            <p>Gathering application analytics...</p>
          </div>
        </Card>

        <Card className={styles.liveFeedCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Live Event Feed</h3>
            <div className={styles.liveIndicator}>
              <span className={styles.pulseDot}></span>
              <span className={styles.liveText}>Live</span>
            </div>
          </div>

          <div className={styles.feedContent}>
            <AnimatePresence>
              {events.length === 0 ? (
                <div className={styles.emptyFeed}>
                  Waiting for live agent events...
                </div>
              ) : (
                events.map((ev, i) => (
                  <motion.div
                    key={i + ev.title}
                    initial={{ opacity: 0, x: -16, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.feedItem}
                  >
                    <div className={styles.feedItemHeader}>
                      <StatusBadge status={ev.type.replace('_', ' ')} />
                      <span className={styles.feedTimestamp}>
                        {ev.timestamp || 'Just now'}
                      </span>
                    </div>
                    <div className={styles.feedItemTitle}>{ev.title}</div>
                    {ev.company && <div className={styles.feedItemCompany}>at {ev.company}</div>}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
