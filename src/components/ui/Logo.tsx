import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }} className={className}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 10,
        background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "1rem",
        fontFamily: "var(--font-display)",
        boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)",
      }}>
        A
      </div>
      <span style={{
        fontSize: "1.15rem",
        fontWeight: 600,
        fontFamily: "var(--font-display)",
        color: "var(--foreground)",
        letterSpacing: "-0.02em",
      }}>
        ApplyMate
      </span>
    </Link>
  );
}

export default Logo;
