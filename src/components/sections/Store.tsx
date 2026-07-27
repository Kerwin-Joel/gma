import { ArrowRight, Glasses, Sun, Eye, Sparkles } from "lucide-react";
import { SectionLabel } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { useMobile } from "../../hooks/useMobile";
import { GRADIENT, PRIMARY } from "../../constants/theme";

const CATEGORIES = [
  {
    icon: Glasses,
    name: "Monturas",
    desc: "Más de 200 modelos de las mejores marcas nacionales e internacionales.",
    color: "#E83EF0",
    bg: "linear-gradient(135deg,#F9D0FB 0%,#EEB2F5 100%)",
  },
  {
    icon: Sun,
    name: "Lentes de Sol",
    desc: "Protección UV400 con estilo. Polarizados, deportivos y de moda.",
    color: "#B90FC2",
    bg: "linear-gradient(135deg,#FDE68A 0%,#FCA5A5 100%)",
  },
  {
    icon: Eye,
    name: "Lentes de Contacto",
    desc: "Diarios, mensuales y de color. Marcas líderes con envío a domicilio.",
    color: "#7C3AED",
    bg: "linear-gradient(135deg,#C4B5FD 0%,#93C5FD 100%)",
  },
  {
    icon: Sparkles,
    name: "Accesorios",
    desc: "Estuches, cadenas, líquidos limpiadores y todo lo que tu visión necesita.",
    color: "#0891B2",
    bg: "linear-gradient(135deg,#A5F3FC 0%,#6EE7B7 100%)",
  },
];

export function Store() {
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";
  const py = mob ? "52px" : tab ? "72px" : "96px";

  return (
    <section
      style={{
        background: "linear-gradient(160deg,#0f0414 0%,#1a0528 60%,#0f0414 100%)",
        padding: `${py} ${px}`,
        width: "100%",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle,rgba(232,62,240,.07) 1.5px,transparent 1.5px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(232,62,240,.12),transparent 65%)",
          top: -200,
          right: -100,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? 32 : 56 }}>
            <SectionLabel
              style={{
                justifyContent: "center",
                background: "rgba(232,62,240,.12)",
                border: "1px solid rgba(232,62,240,.25)",
                color: "#E83EF0",
              }}
            >
              Tienda Online
            </SectionLabel>
            <h2
              style={{
                color: "#fff",
                marginTop: 14,
                marginBottom: 14,
                lineHeight: 1.1,
              }}
            >
              Todo lo que tu visión{" "}
              <span
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                necesita
              </span>
              , en un solo lugar.
            </h2>
            <p
              style={{
                fontSize: mob ? 14 : 16,
                color: "rgba(255,255,255,.55)",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Compra tus lentes, monturas y accesorios desde casa. Envíos a todo
              el Perú con garantía GMA.
            </p>
          </div>
        </Reveal>

        {/* Category grid */}
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mob
                ? "1fr"
                : tab
                ? "repeat(2,1fr)"
                : "repeat(4,1fr)",
              gap: mob ? 14 : 20,
              marginBottom: mob ? 32 : 48,
            }}
          >
            {CATEGORIES.map(({ icon: Icon, name, desc, color, bg }) => (
              <div
                key={name}
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 20,
                  padding: mob ? "22px 20px" : "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  cursor: "pointer",
                  transition: "background 240ms ease, border-color 240ms ease, transform 240ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,.07)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,62,240,.3)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,.04)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.08)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color={color} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--hf)",
                      fontWeight: 700,
                      fontSize: 17,
                      color: "#fff",
                      marginBottom: 6,
                    }}
                  >
                    {name}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,.45)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>

                {/* Link */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: PRIMARY,
                  }}
                >
                  Ver productos <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Main CTA */}
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              className="btn"
              style={{ fontSize: mob ? 14 : 15, padding: mob ? "13px 24px" : "14px 32px" }}
            >
              Explorar tienda completa <ArrowRight size={15} />
            </button>
            <button
              className="btn-ghost"
              style={{
                fontSize: mob ? 14 : 15,
                padding: mob ? "13px 24px" : "14px 32px",
                color: "rgba(255,255,255,.7)",
                borderColor: "rgba(255,255,255,.18)",
              }}
            >
              Ver ofertas del mes
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
