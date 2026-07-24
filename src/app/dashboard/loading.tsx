export default function DashboardLoading() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(8px)',
      backgroundColor: 'var(--background)',
      opacity: 0.8,
      zIndex: 50,
      transition: 'opacity 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div className="spinner" style={{ width: '3rem', height: '3rem', borderWidth: '3px' }} />
        <p className="font-display" style={{ color: 'var(--foreground)', fontWeight: 600 }}>Loading...</p>
      </div>
    </div>
  );
}
