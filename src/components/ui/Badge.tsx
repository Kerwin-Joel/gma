import type { ReactNode, CSSProperties } from "react";

interface BadgeProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Pill({ children, style, className }: BadgeProps) {
  return (
    <div className={`pill${className ? ` ${className}` : ""}`} style={style}>
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
