"use client";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Target, Wand2, Bot, Sparkles, Shield, Zap, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.gradientBg} />
      
      {/* Navigation Bar */}
      <nav className={`${styles.nav} animate-fade-up`} style={{ animationDelay: '50ms' }}>
        <Logo />
        <div className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#results">Results</a>
        </div>
        <div className={styles.navActions}>
          <Link href="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">Get started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.badge} animate-fade-up`} style={{ animationDelay: '100ms' }}>
          <Sparkles size={14} />
          <span>AI-Powered</span>
        </div>
        
        <h1 className={`${styles.heroTitle} animate-fade-up`} style={{ animationDelay: '150ms' }}>
          Your AI-Powered Job Application Agent
        </h1>
        
        <p className={`${styles.heroSubtitle} animate-fade-up`} style={{ animationDelay: '200ms' }}>
          The autonomous AI agent that tailors your resume, answers tricky ATS questions, and applies to jobs while you focus on what matters.
        </p>

        <div className={`${styles.ctaGroup} animate-fade-up`} style={{ animationDelay: '250ms' }}>
          <Link href="/register">
            <Button variant="primary" size="lg">
              Get Started <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">Sign In</Button>
          </Link>
        </div>
      </section>

      {/* Floating Stats Preview */}
      <section className={`${styles.statsSection} animate-scale-in`} style={{ animationDelay: '350ms' }}>
        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>12,481</div>
            <div className={styles.statLabel}>Total Applications</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>94%</div>
            <div className={styles.statLabel}>Success Rate</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>1,200h</div>
            <div className={styles.statLabel}>Time Saved</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>3.4k</div>
            <div className={styles.statLabel}>Active Users</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Everything you need to win</h2>
          <p className={styles.sectionSubtitle}>A complete arsenal designed to bypass filters and get you in front of human recruiters.</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Target size={24} /></div>
            <h3>Smart Matching</h3>
            <p>Our embeddings pipeline matches your profile to job descriptions with incredible accuracy, avoiding wasted applications.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Wand2 size={24} /></div>
            <h3>AI Tailoring</h3>
            <p>Every resume is rewritten specifically for the role, increasing ATS pass rates without ever fabricating experience.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Bot size={24} /></div>
            <h3>Full Autonomy</h3>
            <p>Playwright-powered bots navigate complex forms, handle iFrames, and submit applications directly from your isolated browser.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Shield size={24} /></div>
            <h3>Privacy First</h3>
            <p>Your data never leaves your isolated environment. We use local vector databases and secure enclaves for your PII.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Zap size={24} /></div>
            <h3>Instant Alerts</h3>
            <p>Get notified the moment you receive an interview request or when your application status changes in the ATS.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Sparkles size={24} /></div>
            <h3>Cover Letters</h3>
            <p>Hyper-personalized cover letters generated based on company values, recent news, and the specific hiring manager.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className={styles.howItWorksSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Four steps to hired</h2>
          <p className={styles.sectionSubtitle}>We've reduced the grueling application process down to a 5-minute setup.</p>
        </div>

        <div className={styles.stepsGrid}>
          {[
            { num: '1', title: 'Connect Data', desc: 'Upload your master resume and connect your LinkedIn profile.' },
            { num: '2', title: 'Set Preferences', desc: 'Define your target roles, minimum salary, and preferred locations.' },
            { num: '3', title: 'Agent Matches', desc: 'Our AI scans thousands of listings and finds perfect matches.' },
            { num: '4', title: 'Auto Apply', desc: 'The bot tailors your resume and submits the application instantly.' }
          ].map((step, i) => (
            <div key={i} className={styles.stepCard}>
              <div className={styles.stepNum}>{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.finalCtaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Ready to automate your job search?</h2>
          <p className={styles.ctaSubtitle}>Join 12,000+ engineers landing interviews while they sleep.</p>
          <div className={styles.ctaButtons}>
            <Link href="/register">
              <Button variant="secondary" size="lg">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Logo />
          <p className={styles.copyright}>© 2026 ApplyMate Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
