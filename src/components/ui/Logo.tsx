import { PRIMARY } from "../../constants/theme";

interface LogoProps {
  dark?: boolean;
}

export function Logo({ dark = false }: LogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", flexShrink: 0, userSelect: "none", WebkitTapHighlightColor: "transparent" }}>
      <svg width="34" height="34" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="17" fill="var(--p)" />
        <ellipse cx="18" cy="12.5" rx="4.8" ry="2.7" stroke="white" strokeWidth="1.4" fill="none" />
        <circle cx="18" cy="12.5" r="1.5" fill="white" />
        <text x="18" y="25.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Host Grotesk,sans-serif">GMA</text>
      </svg>
      <span style={{ fontFamily: "var(--hf)", fontWeight: 700, fontSize: 16, color: dark ? "#fff" : "var(--head)" }}>
        Ópticas GMA<span style={{ color: PRIMARY }}>.</span>
      </span>
    </div>
  );
}
