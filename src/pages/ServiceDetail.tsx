import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingModal } from "../components/ui/BookingModal";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  Star,
  MapPin,
  Award,
  User,
  LayoutGrid,
  Users,
  BookOpen,
} from "lucide-react";
import { Img } from "../components/ui/Img";
import { SVCS } from "../data/services";
import { SERVICE_META } from "../data/servicesMeta";
import { useMobile } from "../hooks/useMobile";
import type { Service } from "../types";

interface ServiceDetailProps {
  svc: Service;
  onBack: () => void;
  onBooking: () => void;
}

function Section({
  bg = "#fff",
  px,
  children,
  py = "28px",
}: {
  bg?: string;
  px: string;
  py?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: bg, padding: `0 ${px} ${py}` }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>{children}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 9.5,
        fontWeight: 700,
        color: "var(--p)",
        letterSpacing: ".1em",
        textTransform: "uppercase",
        paddingTop: "24px",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

export function ServiceDetail({ svc, onBack, onBooking }: ServiceDetailProps) {
  const navigate = useNavigate();
  const mob = useMobile(768);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const meta = SERVICE_META[svc.id];
  const px = mob ? "20px" : "48px";
  const related = meta.related
    .map((id) => SVCS.find((s) => s.id === id))
    .filter(Boolean) as Service[];

  const goSection = (id: string) => navigate("/", { state: { scrollTo: id } });

  return (
    <div className="svc-page">
      {/* ── 1. Header glass ──
           Los orbs van en backgroundImage del propio contenedor.
           El hijo con backdropFilter los blura porque los ve como
           pintura del padre — técnica estándar de glassmorphism. */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--dark-bg)",
          backgroundImage: [
            "radial-gradient(ellipse 280px 220px at 88% 10%,  rgba(232,62,240,.72)  0%, transparent 68%)",
            "radial-gradient(ellipse 200px 180px at  8% 90%,  rgba(205,111,161,.62) 0%, transparent 60%)",
            "radial-gradient(ellipse 160px 130px at 48% 52%,  rgba(232,62,240,.38)  0%, transparent 55%)",
          ].join(", "),
          padding: `72px ${px} 28px`,
        }}
      >
        {/* Glass panel — blura la backgroundImage del padre */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,4,10,.38)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            borderBottom: "0.5px solid rgba(232,62,240,.22)",
          }}
        />

        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,.4)",
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 18,
              padding: 0,
              fontFamily: "var(--sf)",
              transition: "color .2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,.82)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,.4)")
            }
          >
            <ArrowLeft size={14} /> Volver al inicio
          </button>

          {/* Category badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(232,62,240,.18)",
              border: "0.5px solid rgba(232,62,240,.32)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 10,
              fontWeight: 600,
              color: "var(--p)",
              letterSpacing: ".07em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            <svc.Icon size={9} /> {meta.category}
          </div>

          <h1
            style={{
              fontFamily: "var(--hf)",
              fontSize: mob ? 28 : 36,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 10,
            }}
          >
            {svc.n}
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,.55)",
              lineHeight: 1.7,
              maxWidth: 500,
              margin: 0,
            }}
          >
            {svc.d}
          </p>
        </div>
      </div>
      {/* ── /glass header ── */}

      {/* ── 2. Hero imagen (A) ── */}
      <div
        style={{
          position: "relative",
          height: mob ? 220 : 300,
          overflow: "hidden",
        }}
      >
        <Img
          src={svc.img}
          alt={svc.n}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(50,26,49,.42) 0%, rgba(0,0,0,.12) 40%, rgba(0,0,0,.5) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: mob ? 20 : 48,
            width: 44,
            height: 44,
            borderRadius: 11,
            background: "rgba(255,255,255,.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,.18)",
          }}
        >
          <svc.Icon size={18} color="var(--p)" strokeWidth={1.8} />
        </div>
      </div>

      {/* ── 3. Stats (B) ── */}
      <div style={{ background: "#fff", padding: `20px ${px} 0` }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              {
                icon: <Star size={15} color="var(--p)" />,
                label: "Valoración",
                value: "4.9 / 5",
              },
              {
                icon: <MapPin size={15} color="var(--p)" />,
                label: "Modalidad",
                value: "Presencial",
              },
              {
                icon: <Award size={15} color="var(--p)" />,
                label: "Especialistas",
                value: "Certificados",
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  background: "var(--bg)",
                  borderRadius: 10,
                  border: "0.5px solid var(--br)",
                  padding: "11px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {icon}
                <div
                  style={{
                    fontSize: mob ? 11 : 13,
                    fontWeight: 700,
                    color: "var(--head)",
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "var(--body)",
                    textAlign: "center",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust bar */}
          <div
            style={{
              display: "flex",
              gap: 0,
              marginTop: 16,
              borderTop: "0.5px solid var(--br)",
              borderBottom: "0.5px solid var(--br)",
            }}
          >
            {[
              { val: "15+ años", lab: "de experiencia" },
              { val: "5,000+", lab: "pacientes atendidos" },
              { val: "Lun – Sáb", lab: "8:30 – 21:00" },
            ].map(({ val, lab }, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  textAlign: "center",
                  borderRight: i < 2 ? "0.5px solid var(--br)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--head)",
                    lineHeight: 1.2,
                  }}
                >
                  {val}
                </div>
                <div
                  style={{ fontSize: 9.5, color: "var(--body)", marginTop: 2 }}
                >
                  {lab}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Descripción + Pills ── */}
      <Section px={px}>
        <SectionLabel>Sobre este servicio</SectionLabel>
        <p
          style={{
            fontSize: 15,
            color: "var(--body)",
            lineHeight: 1.85,
            marginBottom: 16,
          }}
        >
          {svc.full}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {meta.pills.map((pill) => (
            <span
              key={pill}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(var(--p-rgb),.07)",
                border: "0.5px solid rgba(var(--p-rgb),.2)",
                borderRadius: 20,
                padding: "5px 12px",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--p)",
              }}
            >
              <Check size={10} strokeWidth={2.5} /> {pill}
            </span>
          ))}
        </div>
      </Section>

      {/* ── 5. Cómo funciona ── */}
      <Section px={px}>
        <div
          style={{
            background: "var(--head)",
            borderRadius: 16,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: "var(--p)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Cómo funciona
          </div>
          {meta.steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "11px 0",
                borderBottom:
                  i < meta.steps.length - 1
                    ? "0.5px solid rgba(255,255,255,.07)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "rgba(232,62,240,.18)",
                  border: "1px solid rgba(232,62,240,.28)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--p)",
                }}
              >
                {i + 1}
              </div>
              {/* --accent-soft: color más claro del proyecto */}
              <span
                style={{
                  fontSize: 13.5,
                  color: "var(--accent-soft)",
                  lineHeight: 1.55,
                  paddingTop: 3,
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6. Beneficios clave ── */}
      <Section px={px}>
        <SectionLabel>Beneficios clave</SectionLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
            gap: mob ? 8 : 12,
          }}
        >
          {svc.benefits.map((b, i) => (
            <div key={i} className="benefit-item">
              <div className="benefit-check">
                <Check size={14} color="#fff" strokeWidth={2.5} />
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--head)",
                  lineHeight: 1.5,
                }}
              >
                {b}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 7. ¿Para quién es? ── */}
      <Section px={px} bg="var(--bg)">
        <SectionLabel>¿Para quién es?</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {meta.forWho.map((who, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 11 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "rgba(var(--p-rgb),.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={13} color="var(--p)" strokeWidth={1.8} />
              </div>
              <span
                style={{
                  fontSize: 13.5,
                  color: "var(--head)",
                  lineHeight: 1.45,
                }}
              >
                {who}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 8. Preguntas frecuentes ── */}
      <Section px={px} py="20px">
        <SectionLabel>Preguntas frecuentes</SectionLabel>
        {meta.faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "0.5px solid var(--br)" }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "14px 0",
                gap: 12,
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--head)",
                  lineHeight: 1.45,
                }}
              >
                {faq.q}
              </span>
              <ChevronDown
                size={15}
                color="rgba(50,26,49,.35)"
                style={{
                  flexShrink: 0,
                  transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
                  transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: openFaq === i ? "1fr" : "0fr",
                transition:
                  "grid-template-rows 320ms cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--body)",
                    lineHeight: 1.72,
                    paddingBottom: 16,
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Section>

      {/* ── 9. Mini CTA strip — alta intención post-FAQ ── */}
      <div style={{ background: "var(--bg)", padding: `24px ${px}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div
            style={{
              background: "rgba(var(--p-rgb),.08)",
              border: "0.5px solid rgba(var(--p-rgb),.2)",
              borderRadius: 14,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--head)",
                  marginBottom: 2,
                }}
              >
                ¿Ya te decidiste?
              </div>
              <div style={{ fontSize: 11.5, color: "var(--body)" }}>
                Agenda tu cita en menos de 2 minutos
              </div>
            </div>
            <button
              onClick={onBooking}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                background: "var(--p)",
                color: "#fff",
                border: "none",
                borderRadius: 30,
                padding: "10px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "opacity .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = ".85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Reservar <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── 10. Servicios relacionados ── */}
      <Section px={px} bg="var(--bg)">
        <SectionLabel>También te puede interesar</SectionLabel>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {related.map((rel) => (
            <button
              key={rel.id}
              onClick={() => navigate(`/servicio/${rel.id}`)}
              className="svc-related-card"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                  height: mob ? 84 : 110,
                }}
              >
                <Img
                  src={rel.img}
                  alt={rel.n}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,.72))",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: "rgba(255,255,255,.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <rel.Icon size={11} color="#fff" strokeWidth={1.8} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 10,
                    right: 10,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: "#fff",
                    lineHeight: 1.3,
                  }}
                >
                  {rel.n}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Ver todos */}
        <button
          onClick={() => goSection("servicios")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 14,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--p)",
            padding: 0,
          }}
        >
          Ver todos nuestros servicios <ArrowRight size={12} />
        </button>
      </Section>

      {/* ── 11. Navega en Ópticas GMA ── */}
      <Section px={px} py="24px">
        <SectionLabel>Navega en Ópticas GMA</SectionLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 8,
          }}
        >
          {[
            {
              label: "Servicios",
              sub: "Ver todos",
              icon: <LayoutGrid size={14} color="var(--p)" />,
              fn: () => goSection("servicios"),
            },
            {
              label: "Nosotros",
              sub: "Conoce el equipo",
              icon: <Users size={14} color="var(--p)" />,
              fn: () => goSection("nosotros"),
            },
            {
              label: "Blog",
              sub: "Artículos",
              icon: <BookOpen size={14} color="var(--p)" />,
              fn: () => goSection("blog"),
            },
            {
              label: "Contacto",
              sub: "Ubicación",
              icon: <MapPin size={14} color="var(--p)" />,
              fn: () => goSection("contacto"),
            },
          ].map(({ label, sub, icon, fn }) => (
            <button
              key={label}
              onClick={fn}
              className="svc-nav-chip"
              style={{
                background: "var(--bg)",
                borderRadius: 10,
                border: "0.5px solid var(--br)",
                padding: "10px 12px",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                transition: "border-color .2s, background .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(var(--p-rgb),.3)";
                e.currentTarget.style.background = "rgba(var(--p-rgb),.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--br)";
                e.currentTarget.style.background = "var(--bg)";
              }}
            >
              {icon}
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--head)",
                }}
              >
                {label}
              </span>
              <span style={{ fontSize: 10.5, color: "var(--body)" }}>
                {sub}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* ── 12. Reservar cita — wizard inline ── */}
      <div
        style={{
          background: "var(--bg)",
          padding: `0 ${px} ${mob ? "80px" : "60px"}`,
          paddingTop: "0",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <BookingModal inline onClose={() => {}} />
        </div>
      </div>
    </div>
  );
}
