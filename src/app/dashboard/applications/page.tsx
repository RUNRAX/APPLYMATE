import { auth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import styles from "../dashboard.module.css";

export default async function ApplicationsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    include: { jobListing: true },
    orderBy: { submittedAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--foreground)' }}>Applications</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>Track and manage all your automated job applications.</p>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {applications.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 className="font-display" style={{ fontSize: '1.2rem', color: 'var(--foreground)', marginBottom: '0.5rem', fontWeight: 600 }}>No applications yet</h3>
            <p>Your agent will start applying soon. Check back later.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--secondary)' }}>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--foreground)', fontSize: '0.875rem' }}>Job Title</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--foreground)', fontSize: '0.875rem' }}>Company</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--foreground)', fontSize: '0.875rem' }}>Platform</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--foreground)', fontSize: '0.875rem' }}>Status</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--foreground)', fontSize: '0.875rem' }}>Match Score</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--foreground)', fontSize: '0.875rem' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--foreground)' }}>{app.jobListing.title}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted-foreground)' }}>{app.jobListing.company}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted-foreground)' }}>{app.jobListing.platform}</td>
                    <td style={{ padding: '1rem' }}><StatusBadge status={app.status} /></td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '100%', maxWidth: '60px', height: '6px', backgroundColor: 'var(--secondary)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${app.jobListing.matchScore || 0}%`, backgroundColor: 'var(--primary)', borderRadius: '999px' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--foreground)', fontWeight: 500 }}>
                          {Math.round(app.jobListing.matchScore || 0)}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                      {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Pending'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
