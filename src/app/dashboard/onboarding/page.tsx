"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { submitOnboarding } from "@/app/actions/onboarding";
import Link from "next/link";

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({});

  const togglePlatform = (platform: string) => {
    setConnectedPlatforms(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setAnalyzing(true);
      setTimeout(() => setAnalyzing(false), 1500); // Simulated AI parsing delay
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: step >= i ? 'var(--primary)' : 'var(--secondary)',
              color: step >= i ? 'white' : 'var(--muted-foreground)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, transition: 'all 0.3s'
            }}>
              {i}
            </div>
            {i < 4 && <div style={{ width: '40px', height: '2px', backgroundColor: step > i ? 'var(--primary)' : 'var(--border)' }} />}
          </div>
        ))}
      </div>

      <Card style={{ width: '100%', maxWidth: '600px', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
        <form action={submitOnboarding} style={{ height: '100%' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>Step 1: Upload Resume</h2>
                <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>Upload your latest resume. Our AI will parse and extract your skills and experience.</p>
                
                <div style={{ border: '2px dashed var(--border, #D1D5DB)', backgroundColor: 'var(--secondary, #F9FAFB)', padding: '3rem', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary)'}>
                  <input type="file" name="resumeFile" accept=".pdf,.doc,.docx" style={{ display: 'none' }} id="resumeUpload" onChange={handleFileChange} />
                  <label htmlFor="resumeUpload" style={{ cursor: 'pointer', display: 'block', width: '100%', height: '100%', color: 'var(--foreground)' }}>
                    {analyzing ? (
                      <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                        <span className="spinner"></span> Analyzing Resume...
                      </div>
                    ) : fileName ? (
                      <div style={{ color: 'var(--success, #059669)', fontWeight: 'bold' }}>
                        ✅ {fileName}
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', fontWeight: 'normal' }}>Analysis Complete. Click to change file.</div>
                      </div>
                    ) : (
                      <div>Drag and drop your PDF here, or click to browse.</div>
                    )}
                  </label>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>Step 2: Set Preferences</h2>
                <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>What kind of roles are you looking for?</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Input name="targetRoles" label="Target Roles (comma separated)" placeholder="Frontend Engineer, React Developer" required />
                  <Input name="locations" label="Locations (comma separated)" placeholder="San Francisco, New York, Remote" />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: "var(--foreground)", fontWeight: 500, marginTop: '0.5rem' }}>
                    <input type="checkbox" name="remoteOnly" defaultChecked style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                    Remote Only
                  </label>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>Step 3: Secure Session Setup</h2>
                <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
                  ApplyMate uses a secure cloud browser architecture. To protect your security, we <strong>do not store</strong> your passwords.
                </p>
                <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px' }}>
                  <h4 style={{ color: '#1D4ED8', fontWeight: 600, marginBottom: '0.5rem' }}>How it works:</h4>
                  <ul style={{ color: '#1E3A8A', fontSize: '0.9rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>You will enter your Google credentials directly in the Dashboard when you want to launch a discovery session.</li>
                    <li>We connect you to a secure Browserless.io cloud instance.</li>
                    <li>Credentials are cleared from memory immediately after the session ends.</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>Ready to Launch</h2>
                <p style={{ color: 'var(--muted-foreground)', marginBottom: '3rem' }}>ApplyMate is fully configured. We will now start scanning for jobs and submitting tailored applications on your behalf.</p>
                
                <Button variant="primary" type="submit" onClick={() => setLoading(true)} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                  {loading ? "Launching..." : "Launch Agent"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between' }}>
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
          ) : <div />}
          
          {step < 4 && (
            <Button type="button" variant="primary" onClick={nextStep} disabled={step === 1 && (!fileName || analyzing)}>Continue</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
