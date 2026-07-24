"use client";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "true";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#F9FAFB' }}>
      <div className="animate-scale-in" style={{ width: '100%', maxWidth: '420px' }}>
        <Card variant="elevated" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Logo />
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#111827', fontFamily: 'var(--font-display)' }}>
            Welcome back
          </h2>
          <p style={{ color: '#6B7280', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Sign in to your ApplyMate account
          </p>

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Input label="Email address" name="email" type="email" placeholder="you@example.com" required />
            <Input label="Password" name="password" type="password" placeholder="••••••••" required />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#4F46E5', width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #D1D5DB' }} />
                Remember me
              </label>
              <Link href="#" style={{ color: '#4F46E5', fontWeight: 500, textDecoration: 'none' }}>Forgot password?</Link>
            </div>

            {registered && <div style={{ color: "#059669", fontSize: "0.875rem", textAlign: "center", padding: "0.75rem", backgroundColor: "#ECFDF5", borderRadius: "8px", fontWeight: 500 }}>Account created successfully! Please sign in.</div>}
            {error && <div style={{ color: "#DC2626", fontSize: "0.875rem", textAlign: "center", marginTop: "0.5rem" }}>{error}</div>}

            <Button variant="primary" size="lg" type="submit" disabled={loading} style={{ marginTop: '0.5rem', width: '100%' }}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            
            <Button variant="secondary" size="lg" type="button" style={{ width: '100%' }}>
              Continue with Google
            </Button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#6B7280' }}>
            Don't have an account? <Link href="/register" style={{ color: '#4F46E5', fontWeight: 600, marginLeft: '0.25rem', textDecoration: 'none' }}>Register</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', color: '#6B7280' }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
