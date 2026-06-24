import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: BtnProps) {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
}

export function GhostButton({ children, ...props }: BtnProps) {
  return (
    <button className="btn-ghost" {...props}>
      {children}
    </button>
  );
}
