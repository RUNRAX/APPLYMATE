"use client";

import { useEffect, useState } from "react";
import { getAgentStatus } from "@/app/actions/agent";
import { Bot, RefreshCcw, Search, Zap, UserX, AlertCircle, Moon, PauseCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AgentStatusIndicator() {
  const [status, setStatus] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  useEffect(() => {
    // Initial fetch
    getAgentStatus().then(setStatus);

    // Poll every 3 seconds
    const interval = setInterval(() => {
      getAgentStatus().then(setStatus);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  // Determine styles and icon based on status string
  let icon = <Bot size={18} />;
  let color = "var(--primary)";
  let isPulsing = false;

  const s = status.status?.toUpperCase() || "IDLE";
  
  if (s === "IDLE") {
    color = "#6B7280"; // gray
  } else if (s === "PENDING" || s === "INITIALIZING" || s === "AUTHENTICATING") {
    icon = s === "PENDING" ? <Loader size={18} className="animate-spin" /> : <RefreshCcw size={18} className="animate-spin" />;
    color = "#4F46E5"; // indigo
    isPulsing = true;
  } else if (s === "SEARCHING") {
    icon = <Search size={18} />;
    color = "#2563EB"; // blue
    isPulsing = true;
  } else if (s === "ACTIVE") {
    icon = <Zap size={18} />;
    color = "#059669"; // green
    isPulsing = true;
  } else if (s === "EXTRACTING") {
    icon = <Zap size={18} />;
    color = "#7C3AED"; // purple
    isPulsing = true;
  } else if (s.includes("WAITING") || s === "SLEEPING") {
    icon = s === "SLEEPING" ? <Moon size={18} /> : <UserX size={18} />;
    color = "#D97706"; // amber
    isPulsing = s.includes("WAITING");
  } else if (s === "PAUSED") {
    icon = <PauseCircle size={18} />;
    color = "#9CA3AF"; // gray
  } else if (s === "ERROR") {
    icon = <AlertCircle size={18} />;
    color = "#DC2626"; // red
  } else {
    isPulsing = true;
  }

  return (
    <div style={{
      background: 'var(--background)',
      border: '1px solid var(--border)',
      borderLeft: `4px solid ${color}`,
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div 
        className={isPulsing ? "animate-pulse" : ""}
        style={{ 
          color, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: `color-mix(in srgb, ${color} 15%, transparent)`,
          padding: '0.5rem',
          borderRadius: '50%',
        }}>
        {icon}
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Discovery Agent: <span style={{ color }}>{status.status}</span>
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
          {status.message}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
        <Button 
          variant={s === "PAUSED" ? "primary" : "secondary"}
          onClick={async () => {
            const { stopAgent, startAgent } = await import("@/app/actions/agent");
            if (s === "PAUSED") {
              await startAgent();
              setStatus({ ...status, status: "PENDING", message: "Agent triggered — starting immediately..." });
              showToast("Agent triggered! Starting immediately...");
            } else {
              await stopAgent();
              setStatus({ ...status, status: "PAUSED", message: "Agent stopped by user" });
              showToast("Agent stopped and paused.");
            }
          }}
          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
        >
          {s === "PAUSED" ? "Start Agent" : "Stop Agent"}
        </Button>
        <Button 
          variant="secondary"
          onClick={() => {
            getAgentStatus().then(setStatus);
            showToast("Agent status refreshed!");
          }}
          style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <RefreshCcw size={16} />
        </Button>

        {toastMessage && (
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            right: 0,
            background: 'var(--background)',
            border: '1px solid var(--success)',
            color: 'var(--success)',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-md)',
            animation: 'fadeInOut 2s forwards'
          }}>
            {toastMessage}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-5px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
      `}} />
    </div>
  );
}
