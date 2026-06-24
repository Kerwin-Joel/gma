import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Img } from "../ui/Img";
import { SectionLabel } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { SVCS } from "../../data/services";
import { useMobile } from "../../hooks/useMobile";

export function Services() {
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";
  const py = mob ? "52px" : tab ? "72px" : "96px";

  return (
    <section style={{ background: "#fff", padding: `${py} ${px}`, width: "100%", overflowX: "hidden" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? 28 : 48 }}>
            <SectionLabel style={{ justifyContent: "center" }}>Nuestros Servicios</SectionLabel>
            <h2>Atención Ocular Integral<br />y Especializada</h2>
          </div>
        </Reveal>
        {mob ? <MobileAccordion /> : <DesktopPanel />}
      </div>
    </section>
  );
}

function DesktopPanel() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(() =>
    sessionStorage.getItem("gma:lastService") ?? SVCS[0].id
  );
  const active = SVCS.find((s) => s.id === activeId)!;

  return (
    <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

      {/* Left: service list */}
      <div style={{ flex: "0 0 36%", display: "flex", flexDirection: "column", gap: 3 }}>
        {SVCS.map((s) => {
          const on = activeId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => { sessionStorage.setItem("gma:lastService", s.id); setActiveId(s.id); }}
              style={{
                display: "flex", alignItems: "center", gap: 13,
                padding: "11px 13px", borderRadius: 10, textAlign: "left", width: "100%",
                background: on ? "rgba(var(--p-rgb),.06)" : "transparent",
                border: `0.5px solid ${on ? "rgba(var(--p-rgb),.22)" : "transparent"}`,
                cursor: "pointer",
                transition: "background 240ms var(--ease-in-out), border-color 240ms var(--ease-in-out)",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                background: on ? "rgba(var(--p-rgb),.12)" : "var(--bg)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 240ms",
              }}>
                <s.Icon size={16} color={on ? "var(--p)" : "var(--body)"} strokeWidth={1.8} />
              </div>
              <span style={{
                flex: 1, fontSize: 13.5, fontWeight: on ? 500 : 400, lineHeight: 1.3,
                color: on ? "var(--p)" : "var(--head)",
                transition: "color 240ms",
              }}>{s.n}</span>
              <ArrowRight
                size={13}
                color={on ? "var(--p)" : "var(--br)"}
                style={{ flexShrink: 0, transition: "color 240ms" }}
              />
            </button>
          );
        })}
      </div>

      {/* Right: detail panel — key triggers svcFade on service change */}
      <div style={{ flex: 1, minWidth: 0 }} key={activeId}>
        <div className="svc-detail-panel">
          <div style={{ borderRadius: 16, overflow: "hidden", height: 300, position: "relative", marginBottom: 24 }}>
            <Img src={active.img} alt={active.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.08) 0%, rgba(0,0,0,.52) 100%)" }} />
            <div style={{
              position: "absolute", top: 16, left: 16,
              width: 40, height: 40, borderRadius: 10,
              background: "rgba(255,255,255,.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <active.Icon size={18} color="var(--p)" strokeWidth={1.8} />
            </div>
          </div>

          <h3 style={{ fontFamily: "var(--hf)", fontSize: 22, marginBottom: 10 }}>{active.n}</h3>
          <p style={{ fontSize: 14.5, color: "var(--body)", lineHeight: 1.85, marginBottom: 24 }}>{active.full}</p>
          <button className="btn" onClick={() => navigate(`/servicio/${active.id}`)}>
            Ver detalle completo <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileAccordion() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(() =>
    sessionStorage.getItem("gma:lastService") ?? SVCS[0].id
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {SVCS.map((s) => {
        const isOpen = openId === s.id;
        return (
          <div
            key={s.id}
            style={{
              borderRadius: 12,
              border: `0.5px solid ${isOpen ? "rgba(var(--p-rgb),.3)" : "var(--br)"}`,
              background: "#fff",
              overflow: "hidden",
              transition: "border-color 300ms var(--ease-in-out)",
            }}
          >
            {/* Accordion header */}
            <button
              onClick={() => {
                const next = isOpen ? null : s.id;
                if (next) sessionStorage.setItem("gma:lastService", next);
                setOpenId(next);
              }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", width: "100%", textAlign: "left",
                background: "none", border: "none", cursor: "pointer",
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                background: isOpen ? "rgba(var(--p-rgb),.1)" : "var(--bg)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 280ms var(--ease-in-out)",
              }}>
                <s.Icon size={15} color={isOpen ? "var(--p)" : "var(--body)"} strokeWidth={1.8} />
              </div>
              <span style={{
                flex: 1, fontSize: 14, fontWeight: 500,
                color: isOpen ? "var(--p)" : "var(--head)",
                transition: "color 280ms",
              }}>{s.n}</span>
              <ChevronDown
                size={16}
                color={isOpen ? "var(--p)" : "var(--body)"}
                style={{
                  flexShrink: 0,
                  transition: "transform 360ms cubic-bezier(0.4,0,0.2,1)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Accordion body — CSS grid trick for smooth height animation */}
            <div style={{
              display: "grid",
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              transition: "grid-template-rows 400ms cubic-bezier(0.4,0,0.2,1)",
            }}>
              <div style={{ overflow: "hidden" }}>
                <div style={{ padding: "0 16px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 82, height: 66, borderRadius: 8, overflow: "hidden",
                    flexShrink: 0, background: "var(--bg)",
                  }}>
                    <Img src={s.img} alt={s.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12.5, color: "var(--body)", lineHeight: 1.65, marginBottom: 12 }}>{s.d}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/servicio/${s.id}`); }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        background: "var(--p)", color: "#fff", border: "none",
                        borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: 500,
                        cursor: "pointer",
                        transition: "opacity 200ms",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = ".85")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      Ver detalle <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
