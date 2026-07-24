import { auth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import styles from "../dashboard.module.css";

export default async function InsightsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const apps = await prisma.application.findMany({
    where: { userId: session.user.id },
    include: { jobListing: true }
  });

  const successRate = apps.length > 0 
    ? Math.round((apps.filter(a => a.status === 'SUBMITTED').length / apps.length) * 100) 
    : 0;

  const avgMatch = apps.length > 0 
    ? Math.round(apps.reduce((acc, app) => acc + (app.jobListing.matchScore || 0), 0) / apps.length) 
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--foreground)' }}>Insights</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>Analytics and performance of your job search.</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Success Rate" value={`${successRate}%`} trend="up" trendValue="+5%" />
        <StatCard label="Avg. Match Score" value={`${avgMatch}%`} trend="neutral" trendValue="Stable" />
        <StatCard label="Total Saved Time" value={`${Math.round(apps.length * 15 / 60)}h`} trend="up" trendValue="+2h this week" />
      </div>

      <div className={styles.bentoGrid}>
        <Card style={{ padding: '1.5rem', background: 'var(--background)', border: '1px solid var(--border)' }}>
          <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem', color: 'var(--foreground)' }}>Applications by Platform</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['LinkedIn', 'Indeed', 'Wellfound'].map((platform, i) => {
              const platformApps = apps.filter(a => a.jobListing.platform === platform).length;
              const percent = apps.length > 0 ? Math.round((platformApps / apps.length) * 100) : 0;
              return (
                <div key={platform}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{platform}</span>
                    <span style={{ color: 'var(--muted-foreground)' }}>{platformApps} ({percent}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percent}%`, backgroundColor: 'var(--primary)', borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card style={{ padding: '1.5rem', background: 'var(--background)', border: '1px solid var(--border)' }}>
          <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem', color: 'var(--foreground)' }}>Top Matched Keywords</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['React', 'TypeScript', 'Next.js', 'Frontend', 'Tailwind', 'Node.js', 'Prisma'].map((tag, i) => (
              <span key={tag} style={{ 
                padding: '0.4rem 0.8rem', 
                backgroundColor: 'var(--accent-light, #EEF2FF)', 
                color: 'var(--primary)',
                border: '1px solid var(--accent-light, #EEF2FF)', 
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 500
              }}>
                {tag}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
