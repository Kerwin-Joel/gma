import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { GCheck } from "../ui/GCheck";
import { SectionLabel } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { useCount } from "../../hooks/useCount";
import { useMobile } from "../../hooks/useMobile";

interface TrustedPartnerProps {
  onBooking: () => void;
}

export function TrustedPartner({ onBooking }: TrustedPartnerProps) {
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const [go, setGo] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  const n14 = useCount(14, go);
  const n2  = useCount(2,  go);
  const n8  = useCount(8,  go);

  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const px = mob ? "18px" : tab ? "32px" : "64px";
  const py = mob ? "52px" : tab ? "72px" : "96px";

  return (
    <section style={{ background: "var(--bg)", padding: `${py} ${px}`, width: "100%", overflowX: "hidden" }}>
      <div style={{ display: "flex", flexDirection: mob || tab ? "column" : "row", gap: mob ? 28 : 52, maxWidth: 1160, margin: "0 auto", width: "100%" }}>

        <Reveal style={{ flex: mob || tab ? "none" : "1 1 56%", width: "100%" }}>
          <SectionLabel>Nosotros</SectionLabel>
          <h2 style={{ marginBottom: 16 }}>Tu Socio de Confianza<br />en Salud Visual</h2>
          <p style={{ fontSize: mob ? 14 : 15, color: "var(--body)", lineHeight: 1.85, marginBottom: 28, maxWidth: 440 }}>
            Desde exámenes de rutina hasta tratamientos especializados, estamos aquí para cuidar tu visión en cada etapa de tu vida.
          </p>
          <div ref={statRef} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid var(--br)", borderBottom: "1px solid var(--br)", padding: "20px 0" }}>
            {[
              { v: n14, s: "+", l: "Años de servicio" },
              { v: n2,  s: "",  l: "Locales en Perú" },
              { v: n8,  s: "+", l: "Especialidades" },
            ].map(({ v, s, l }, i) => (
              <div key={i} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid var(--br)" : "none", padding: mob ? "0 4px" : "0 16px" }}>
                <div className="gt" style={{ fontFamily: "var(--hf)", fontWeight: 700, fontSize: mob ? 30 : "clamp(32px,5vw,52px)", lineHeight: 1 }}>{v}{s}</div>
                <div style={{ fontSize: mob ? 10 : 12, color: "var(--body)", marginTop: 6, fontWeight: 500, lineHeight: 1.3 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} style={{ flex: mob || tab ? "none" : "1 1 42%", width: "100%" }}>
          <div style={{
              background: "linear-gradient(135deg, rgba(var(--p-rgb),.08) 0%, rgba(var(--secondary-rgb),.04) 100%)",
              borderRadius: 12,
              padding: mob ? "28px 20px" : "36px 32px",
              border: "1px solid rgba(var(--p-rgb),.15)",
              boxShadow: "0 4px 24px rgba(50,26,49,.07)",
            }}>
            <h4 style={{ color: "var(--head)", marginBottom: 18, lineHeight: 1.35, fontSize: mob ? 18 : 22 }}>
              Tu Camino al Bienestar Visual Comienza Aquí.
            </h4>
            {[
              "Convenios con instituciones privadas y del estado",
              "Sistema de reserva de citas online fácil",
              "Atención de urgencia y horario extendido",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                <GCheck />
                <span style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.65 }}>{t}</span>
              </div>
            ))}
            <button className="btn" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} onClick={onBooking}>
              Reservar Examen <ArrowRight size={14} />
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
