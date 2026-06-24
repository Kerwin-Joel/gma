import { Clock, Phone, MapPin } from "lucide-react";
import { GRADIENT } from "../../constants/theme";

const ITEMS = [
  { Icon: Clock, l: "Horario", v: "Lun–Sáb: 8:30 – 9:00 PM" },
  { Icon: Phone, l: "Llámanos", v: "+51 952 950 811" },
  { Icon: MapPin, l: "Encuéntranos", v: "Jaén y Bagua Grande" },
] as const;

interface InfoBarProps {
  variant?: "mobile" | "desktop";
  tab?: boolean;
}

export function InfoBar({ variant = "desktop", tab = false }: InfoBarProps) {
  if (variant === "mobile") {
    return (
      <div
        style={{
          background: "#fff",
          borderTop: "1px solid var(--br)",
          height: "7rem",
        }}
      ></div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        background: "#fff",
        borderTop: "1px solid var(--br)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: 1160,
          margin: "0 auto",
          padding: tab ? "0 32px" : "0 64px",
        }}
      >
        {ITEMS.map(({ Icon, l, v }, i) => (
          <div
            key={l}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flex: 1,
              paddingLeft: i === 0 ? 0 : 36,
              paddingTop: 20,
              paddingBottom: 20,
              borderLeft: i > 0 ? "1px solid var(--br)" : "none",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: GRADIENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 3px 10px rgba(var(--p-rgb),.22)",
              }}
            >
              <Icon size={16} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--body)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                {l}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--head)",
                }}
              >
                {v}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
