import { auth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AutoApplyToggle } from "./AutoApplyToggle";
import styles from "../dashboard.module.css";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Mock API key state for now
  const apiKeyPrefix = process.env.GROQ_API_KEY ? "gsk_..." + process.env.GROQ_API_KEY.slice(-4) : "";

  const preference = await prisma.jobPreference.findUnique({
    where: { userId: session.user.id }
  });
  const isAutoApply = preference?.autoApply || false;

  const connectedPlatforms = await prisma.platformCredential.findMany({
    where: { userId: session.user.id },
    select: { platform: true }
  });
  
  const hasGoogle = connectedPlatforms.some(p => p.platform === 'company_portal');
  const hasLinkedIn = connectedPlatforms.some(p => p.platform === 'linkedin');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--foreground)' }}>Settings</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>Manage your account, billing, and API integrations.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
        
        {/* Profile Section */}
        <Card style={{ padding: '1.5rem', background: 'rgba(88, 28, 135, 0.15)', border: '1px solid var(--glass-border)' }}>
          <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--foreground)' }}>Account Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <Input label="Full Name" defaultValue={session.user.name || ""} disabled />
            <Input label="Email Address" defaultValue={session.user.email || ""} disabled />
          </div>
          <Button variant="secondary" style={{ fontSize: '0.9rem' }}>Edit Profile</Button>
        </Card>

        {/* AI Integration Section */}
        <Card style={{ padding: '1.5rem', background: 'rgba(88, 28, 135, 0.15)', border: '1px solid var(--glass-border)' }}>
          <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--foreground)' }}>AI Integration</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
            ApplyMate uses Groq to tailor your resume and answer complex application questions at lightning speed.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <Input 
                label="Groq API Key" 
                type="password" 
                placeholder="gsk_..." 
                defaultValue={apiKeyPrefix}
              />
            </div>
            <Button variant="primary">Update Key</Button>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
            Keys are encrypted at rest using AES-256.
          </p>
        </Card>

        {/* Automation Section */}
        <Card style={{ padding: '1.5rem', background: 'rgba(88, 28, 135, 0.15)', border: '1px solid var(--glass-border)' }}>
          <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--foreground)' }}>Agent Application Pipeline</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
            Choose whether the AI agent applies automatically on your behalf or generates a resume and waits for your manual verification.
          </p>
          <AutoApplyToggle initialValue={isAutoApply} />
        </Card>

        {/* Danger Zone */}
        <Card style={{ padding: '1.5rem', border: '1px solid var(--error, #fca5a5)', backgroundColor: '#FEF2F2' }}>
          <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--error, #DC2626)', marginBottom: '0.5rem' }}>Danger Zone</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="danger" style={{ fontSize: '0.9rem', backgroundColor: '#DC2626', color: 'white' }}>Delete Account</Button>
        </Card>

      </div>
    </div>
  );
}
