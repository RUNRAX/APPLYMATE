"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";

export function NotificationBell() {
  const [pendingCount, setPendingCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const checkPending = async () => {
      try {
        const res = await fetch("/api/review/pending-count");
        if (res.ok) {
          const data = await res.json();
          setPendingCount(data.pendingCount || 0);
          setNewCount(data.newJobsCount || 0);
        }
      } catch (e) {
        console.error("Failed to fetch counts", e);
      }
    };
    checkPending();
    const interval = setInterval(checkPending, 30000);
    return () => clearInterval(interval);
  }, []);

  const totalNotifications = pendingCount + newCount;

  const trigger = (
    <button 
      aria-label="Notifications"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: 'transparent',
        border: 'none',
        color: '#6B7280',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#F3F4F6';
        e.currentTarget.style.color = '#111827';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = '#6B7280';
      }}
    >
      <Bell style={{ width: '20px', height: '20px' }} />
      {totalNotifications > 0 && (
        <span style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          background: '#DC2626',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
          borderRadius: '50%',
          width: '16px',
          height: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 0 2px #FFFFFF'
        }}>
          {totalNotifications}
        </span>
      )}
    </button>
  );

  return (
    <Dropdown id="notifications" trigger={trigger} align="right">
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem' }}>
        <h4 style={{ 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          color: '#111827', 
          marginBottom: '0.25rem',
          padding: '0 0.25rem' 
        }}>
          Notifications
        </h4>
        
        {totalNotifications === 0 ? (
          <p style={{ fontSize: '0.875rem', color: '#6B7280', textAlign: 'center', padding: '1.5rem 0' }}>
            You're all caught up!
          </p>
        ) : (
          <>
            {newCount > 0 && (
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: '#EFF6FF', 
                borderRadius: '8px', 
                border: '1px solid #BFDBFE' 
              }}>
                <p style={{ fontSize: '0.875rem', color: '#1E3A8A', margin: 0 }}>
                  <strong style={{ color: '#1D4ED8' }}>{newCount} New Jobs</strong> discovered by the agent! They are currently being analyzed and applied to.
                </p>
              </div>
            )}
            
            {pendingCount > 0 && (
              <Link href="/dashboard/review" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: '0.75rem', 
                  backgroundColor: '#FFFBEB', 
                  borderRadius: '8px', 
                  border: '1px solid #FDE68A', 
                  transition: 'background-color 0.2s',
                  cursor: 'pointer' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF3C7'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFBEB'}
                >
                  <p style={{ fontSize: '0.875rem', color: '#92400E', margin: 0 }}>
                    <strong style={{ color: '#B45309' }}>{pendingCount} Applications</strong> require your manual review. Click here to approve them.
                  </p>
                </div>
              </Link>
            )}
          </>
        )}
      </div>
    </Dropdown>
  );
}
