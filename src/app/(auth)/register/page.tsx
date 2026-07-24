"use client";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { useState } from "react";
import { registerUser } from "@/app/actions/auth";

export default function Register() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      const res = await registerUser(formData);
      if (res?.error) {
        setError(res.error);
      }
    } catch (e) {
      // Handled in server action
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#F9FAFB' }}>
      <div className="animate-scale-in" style={{ width: '100%', maxWidth: '420px' }}>
        <Card variant="elevated" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Logo />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#111827', fontFamily: 'var(--font-display)' }}>
            Create Account
          </h2>
          <p style={{ color: '#6B7280', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Start your autonomous job search
          </p>

          <form action={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Input label="Full Name" name="name" type="text" placeholder="John Doe" required />
            <Input label="Email address" name="email" type="email" placeholder="you@example.com" required />
            <Input label="Password" name="password" type="password" placeholder="••••••••" required />
            
            <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.25rem', lineHeight: '1.5' }}>
              By creating an account, you agree to our <Link href="#" style={{ color: '#4F46E5', textDecoration: 'none' }}>Terms of Service</Link> and <Link href="#" style={{ color: '#4F46E5', textDecoration: 'none' }}>Privacy Policy</Link>.
            </div>

            {error && <div style={{ color: "#DC2626", fontSize: "0.875rem", textAlign: "center", marginTop: "0.5rem" }}>{error}</div>}

            <Button variant="primary" size="lg" type="submit" disabled={loading} style={{ marginTop: '0.5rem', width: '100%' }}>
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#6B7280' }}>
            Already have an account? <Link href="/login" style={{ color: '#4F46E5', fontWeight: 600, marginLeft: '0.25rem', textDecoration: 'none' }}>Sign in</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
