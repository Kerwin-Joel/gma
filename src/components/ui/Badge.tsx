import type { ReactNode, CSSProperties } from "react";

interface BadgeProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Pill({ children, style }: BadgeProps) {
  return (
    <div className="pill" style={style}>
      <span className="pill-dot" />
      {children}
    </div>
  );
}

export function SectionLabel({ children, style }: BadgeProps) {
  return (
    <p className="lbl" style={style}>
      {children}
    </p>
  );
}
