import { GRADIENT } from "../../constants/theme";

export function GCheck() {
  return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function GradDot() {
  return (
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: GRADIENT, flexShrink: 0 }} />
  );
}
