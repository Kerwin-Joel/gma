import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Img } from "../ui/Img";
import { SectionLabel } from "../ui/Badge";
import { GradDot } from "../ui/GCheck";
import { Reveal } from "../ui/Reveal";
import { IMG } from "../../constants/theme";
import { useMobile } from "../../hooks/useMobile";

export function About() {
  const nav = useNavigate();
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";
  const py = mob ? "52px" : tab ? "72px" : "96px";

  return (
    <section style={{ background: "#fff", padding: `${py} ${px}`, width: "100%", overflowX: "hidden" }}>
      <div style={{ display: "flex", flexDirection: mob || tab ? "column" : "row", gap: mob ? 28 : 60, maxWidth: 1160, margin: "0 auto", width: "100%", alignItems: mob || tab ? "flex-start" : "center" }}>

        <Reveal style={{ flex: mob || tab ? "none" : "0 0 44%", width: "100%" }}>
          <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 16px 48px rgba(13,27,42,.1)" }}>
            <Img src={IMG.about} alt="Ópticas GMA" style={{ width: "100%", height: mob ? 220 : tab ? 300 : 460, objectFit: "cover" }} />
          </div>
        </Reveal>

        <Reveal delay={180} style={{ flex: 1, width: "100%" }}>
          <SectionLabel>Nosotros</SectionLabel>
          <h2 style={{ marginBottom: 16 }}>Cuidamos Tu Visión<br />en Cada Paso</h2>
          <p style={{ fontSize: mob ? 14 : 15, color: "var(--body)", lineHeight: 1.875, marginBottom: 24 }}>
            Creemos en anticiparnos y crear soluciones que no solo abordan los desafíos actuales, sino que también abren camino al éxito futuro de tu salud visual.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {[
              "Tratamiento individual y personalizado",
              "Los más altos estándares profesionales",
              "Equipo especializado en salud ocular",
            ].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <GradDot />
                <span style={{ fontSize: 14, color: "var(--head)", fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
          <button className="btn" onClick={() => nav("/nosotros")}>Conocer más <ArrowRight size={14} /></button>
        </Reveal>

      </div>
    </section>
  );
}
