import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PageSEO } from "../components/seo/PageSEO";
import { breadcrumbSchema } from "../seo/schemas";
import {
  Home,
  Award,
  BookOpen,
  Users,
  Heart,
  Eye,
  Shield,
  Star,
  ArrowRight,
  GraduationCap,
  MapPin,
  Phone,
  CalendarCheck,
} from "lucide-react";
import { Nav } from "../components/layout/Nav";
import { MobileDrawer } from "../components/layout/MobileDrawer";
import { BookingModal } from "../components/ui/BookingModal";
import { WAIcon } from "../components/ui/WAIcon";
import { SectionLabel } from "../components/ui/Badge";
import { Reveal } from "../components/ui/Reveal";
import { useMobile } from "../hooks/useMobile";
import { IMG, DOCTOR_IMG } from "../constants/theme";

const P = "var(--p)";
const G = "var(--g)";

const CREDENTIALS = [
  { icon: <GraduationCap size={15} />, text: "Médico Cirujano – Universidad Nacional de Cajamarca" },
  { icon: <Award size={15} />, text: "Especialista en Oftalmología – CMP certificado" },
  { icon: <BookOpen size={15} />, text: "Diplomado en Optometría Clínica Avanzada" },
  { icon: <MapPin size={15} />, text: "Fundador y Director de Ópticas GMA, Jaén" },
];

const VALORES = [
  {
    Icon: Eye,
    title: "Precisión diagnóstica",
    desc: "Cada evaluación es rigurosa y detallada. Usamos equipos de última generación para no dejar nada al azar en tu salud visual.",
  },
  {
    Icon: Heart,
    title: "Trato humano",
    desc: "Creemos que una buena consulta va más allá del diagnóstico. Escuchamos, explicamos y acompañamos en cada etapa del proceso.",
  },
  {
    Icon: Shield,
    title: "Ética profesional",
    desc: "Actuamos siempre con honestidad y transparencia. Recomendamos solo lo que tu salud ocular realmente necesita.",
  },
  {
    Icon: Users,
    title: "Compromiso con la comunidad",
    desc: "Somos parte de Jaén. Nuestro propósito es que cada familia de la región tenga acceso a atención visual de primera calidad.",
  },
];

const STATS = [
  { value: "15+", label: "Años de experiencia" },
  { value: "5 000+", label: "Pacientes atendidos" },
  { value: "4.9★", label: "Valoración promedio" },
  { value: "100%", label: "Compromiso con tu visión" },
];

const TIMELINE = [
  {
    year: "2009",
    title: "Inicio de la vocación",
    desc: "El Dr. Mendoza culmina su carrera de Medicina en la UNC con mención en salud sensorial, desarrollando una pasión profunda por la oftalmología.",
  },
  {
    year: "2012",
    title: "Especialización",
    desc: "Tras su residencia médica, se especializa en optometría clínica y enfermedades oculares, formándose con referentes nacionales del sector.",
  },
  {
    year: "2016",
    title: "Fundación de GMA Ópticas",
    desc: "Con el sueño de llevar atención ocular de calidad a Jaén, funda Ópticas GMA. Comienza con consultas individuales y un compromiso total con cada paciente.",
  },
  {
    year: "2019",
    title: "Expansión y tecnología",
    desc: "GMA incorpora equipos de diagnóstico digital de vanguardia: topografía corneal, campimetría computarizada y tonometría de no contacto.",
  },
  {
    year: "2022",
    title: "Reconocimiento regional",
    desc: "Ópticas GMA es reconocida como una de las ópticas de mayor confianza en la provincia de Jaén, con miles de pacientes satisfechos y referencias médicas locales.",
  },
  {
    year: "2025",
    title: "Crecimiento continuo",
    desc: "Con un equipo sólido y tecnología actualizada, GMA sigue creciendo con el mismo espíritu de su fundación: cuidar la visión de cada persona como si fuera la propia.",
  },
];

/* Timeline con scroll tracking centralizado — línea + dots sincrónicos */
function Timeline({ mob }: { mob: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [prog, setProg]     = useState(0);
  const [active, setActive] = useState<boolean[]>(Array(TIMELINE.length).fill(false));
  const n = TIMELINE.length;

  useEffect(() => {
    const fn = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const p    = Math.min(1, Math.max(0, (vh * 0.65 - rect.top) / rect.height));
      setProg(p);

      if (mob) {
        // Mobile: activo cuando la lectura pasó el centro del dot
        // (no hay check de inView — solo desactiva al retroceder scroll)
        setActive(
          dotRefs.current.map(d => {
            if (!d) return false;
            const dr = d.getBoundingClientRect();
            return dr.top + dr.height / 2 < vh * 0.78;
          })
        );
      } else {
        // Desktop: activo cuando el frente de la línea alcanza el dot
        // (no hay check de inView — solo desactiva cuando la línea retrocede)
        const lineBottom = rect.top + p * rect.height;
        setActive(
          dotRefs.current.map(d => {
            if (!d) return false;
            const dr = d.getBoundingClientRect();
            return lineBottom >= dr.top + dr.height / 2;
          })
        );
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [mob, n]);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      {/* ── Línea vertical ── */}
      {!mob && (
        <>
          {/* Base gris (siempre visible) */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: 1.5, transform: "translateX(-50%)",
            background: "var(--br)",
          }} />
          {/* Relleno gradiente — scaleY GPU-composited, sin transition lag */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: 2,
            transformOrigin: "top center",
            transform: `translateX(-50%) scaleY(${prog})`,
            background: "linear-gradient(180deg, #e83ef0 0%, #cd6fa1 100%)",
            willChange: "transform",
          }} />
        </>
      )}

      {TIMELINE.map((item, i) => {
        const isLeft = i % 2 === 0;
        const on = active[i];

        /* ── Mobile ── */
        if (mob) return (
          <div key={item.year} style={{ display: "flex", gap: 16, marginBottom: 32, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
              <div
                ref={el => { dotRefs.current[i] = el; }}
                className={`tl-dot-reveal${on ? " on" : ""}`}
                style={{
                  width: 12, height: 12, borderRadius: "50%",
                  background: on ? "var(--g)" : "#e0d8e0",
                  boxShadow: on
                    ? "0 0 0 3px #fff, 0 0 0 5px rgba(var(--p-rgb),.18)"
                    : "0 0 0 3px #fff, 0 0 0 4px var(--br)",
                  transition: "opacity 960ms var(--ease-out), transform 960ms var(--ease-out), background 800ms var(--ease-out), box-shadow 840ms var(--ease-out)",
                }}
              />
              {i < n - 1 && (
                <div style={{ width: 1, flex: 1, background: "var(--br)", marginTop: 6, minHeight: 40 }} />
              )}
            </div>
            <div className={`tl-reveal-r${on ? " on" : ""}`} style={{ transitionDelay: undefined }}>
              <div style={{ fontFamily: "var(--hf)", fontSize: 12, fontWeight: 700, color: "var(--p)", marginBottom: 3 }}>{item.year}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--head)", marginBottom: 5 }}>{item.title}</div>
              <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.75 }}>{item.desc}</p>
            </div>
          </div>
        );

        /* ── Desktop ── */
        return (
          <div key={item.year} style={{
            display: "grid",
            gridTemplateColumns: "1fr 60px 1fr",
            marginBottom: 40,
            alignItems: "flex-start",
          }}>
            {/* Columna izquierda */}
            <div
              className={`tl-reveal-l${on && isLeft ? " on" : ""}`}
              style={{ textAlign: "right", paddingRight: 28, paddingTop: 4, transitionDelay: undefined }}
            >
              {isLeft && (
                <>
                  <div style={{ fontFamily: "var(--hf)", fontSize: 13, fontWeight: 700, color: "var(--p)", marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--head)", marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.75 }}>{item.desc}</p>
                </>
              )}
            </div>

            {/* Dot central — ref para detección de posición */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
              <div
                ref={el => { dotRefs.current[i] = el; }}
                className={`tl-dot-reveal${on ? " on" : ""}`}
                style={{
                  width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                  background: on ? "var(--g)" : "#e8dde8",
                  boxShadow: on
                    ? "0 0 0 4px #fff, 0 0 0 6px rgba(var(--p-rgb),.22)"
                    : "0 0 0 4px #fff, 0 0 0 5px var(--br)",
                  transition: "opacity 960ms var(--ease-out), transform 960ms var(--ease-out), background 800ms var(--ease-out), box-shadow 840ms var(--ease-out)",
                }}
              />
            </div>

            {/* Columna derecha */}
            <div
              className={`tl-reveal-r${on && !isLeft ? " on" : ""}`}
              style={{ paddingLeft: 28, paddingTop: 4, transitionDelay: undefined }}
            >
              {!isLeft && (
                <>
                  <div style={{ fontFamily: "var(--hf)", fontSize: 13, fontWeight: 700, color: "var(--p)", marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--head)", marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.75 }}>{item.desc}</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AboutPage() {
  const nav = useNavigate();
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";

  const [booking, setBk] = useState(false);
  const [menu, setM] = useState(false);
  const [scrolled, setSc] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fn = () => setSc(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <Nav
        scrolled={scrolled}
        onBooking={() => setBk(true)}
        onMenu={() => setM(true)}
        menuOpen={menu}
        onHome={() => nav("/")}
      />
      <MobileDrawer open={menu} onClose={() => setM(false)} onBooking={() => setBk(true)} />

      <PageSEO
        title="Nosotros — Dr. Alfredo Mendoza | Ópticas GMA"
        description="Conoce al Dr. Alfredo Mendoza, fundador de Ópticas GMA. Más de 15 años de experiencia en oftalmología y optometría clínica en Jaén, Cajamarca."
        path="/nosotros"
        type="profile"
        keywords="Dr. Alfredo Mendoza, oftalmólogo Jaén, Ópticas GMA nosotros, especialista visual Cajamarca"
        jsonLd={[
          breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Nosotros", path: "/nosotros" }]),
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dr. Alfredo Mendoza",
            "jobTitle": "Médico Oftalmólogo y Fundador",
            "description": "Especialista en oftalmología con más de 15 años de experiencia. Fundador y director de Ópticas GMA en Jaén, Cajamarca.",
            "worksFor": { "@type": "MedicalBusiness", "name": "Ópticas GMA", "url": "https://opticasgma.pe" },
            "alumniOf": "Universidad Nacional de Cajamarca",
            "url": "https://opticasgma.pe/nosotros"
          }
        ]}
      />

      <div style={{ paddingTop: 72 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ padding: mob ? "14px 18px 0" : "16px 64px 0" }}>
          <nav className="blog-breadcrumb" aria-label="Navegación">
            <button onClick={() => nav("/")}><Home size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />Inicio</button>
            <span className="sep">›</span>
            <span className="cur">Nosotros</span>
          </nav>
        </div>

        {/* ── Hero ── */}
        <div
          style={{
            background: "var(--dark-bg)",
            backgroundImage: [
              "radial-gradient(ellipse 380px 220px at 90% 40%, rgba(232,62,240,.5) 0%, transparent 65%)",
              "radial-gradient(ellipse 220px 180px at 5% 85%, rgba(205,111,161,.38) 0%, transparent 60%)",
            ].join(", "),
            padding: mob ? "52px 18px 60px" : `72px ${px} 80px`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,4,10,.28)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
            <SectionLabel style={{ color: "rgba(255,255,255,.7)", borderColor: "rgba(255,255,255,.15)" }}>
              Nosotros · Ópticas GMA
            </SectionLabel>
            <h1
              style={{
                fontFamily: "var(--hf)",
                fontSize: mob ? 30 : 46,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.12,
                marginBottom: 16,
              }}
            >
              Más de 15 años cuidando<br />la visión de Jaén
            </h1>
            <p style={{ fontSize: mob ? 14 : 16, color: "rgba(255,255,255,.65)", lineHeight: 1.8, maxWidth: 560 }}>
              Ópticas GMA nació de una vocación genuina: llevar atención ocular especializada, honesta y cercana a cada persona de nuestra comunidad.
            </p>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{ background: "#fff", borderBottom: "0.5px solid var(--br)" }}>
          <div
            style={{
              maxWidth: 1160,
              margin: "0 auto",
              padding: mob ? "22px 18px" : `28px ${px}`,
              display: "grid",
              gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)",
              gap: mob ? 20 : 0,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: mob ? "0" : "0 24px",
                  borderRight: !mob && i < STATS.length - 1 ? "0.5px solid var(--br)" : "none",
                }}
              >
                <div style={{ fontFamily: "var(--hf)", fontSize: mob ? 26 : 32, fontWeight: 800, background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "var(--body)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Doctor section ── */}
        <div style={{ background: "#fff", padding: mob ? "52px 18px 60px" : `72px ${px} 80px` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: mob || tab ? "1fr" : "1fr 1.3fr",
                gap: mob ? 36 : 64,
                alignItems: "center",
              }}
            >
              {/* Photo */}
              <Reveal>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      boxShadow: "0 24px 64px rgba(232,62,240,.15), 0 8px 24px rgba(13,27,42,.1)",
                    }}
                  >
                    <img
                      src={DOCTOR_IMG}
                      alt="Dr. Mendoza – Director de Ópticas GMA"
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: mob ? 300 : 480, objectFit: "cover", display: "block" }}
                    />
                  </div>
                  {/* Badge flotante */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      right: mob ? 16 : -20,
                      background: "#fff",
                      borderRadius: 14,
                      padding: "12px 18px",
                      boxShadow: "0 8px 32px rgba(13,27,42,.12)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Star size={16} color="#fff" fill="#fff" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--head)" }}>Director & Fundador</div>
                      <div style={{ fontSize: 11, color: "var(--body)" }}>GMA Ópticas · Jaén</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Bio */}
              <Reveal delay={160}>
                <SectionLabel>El especialista</SectionLabel>
                <h2 style={{ fontFamily: "var(--hf)", fontSize: mob ? 26 : 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 6 }}>
                  Dr. Alfredo Mendoza
                </h2>
                <div style={{ fontSize: 13, color: P, fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
                  <Award size={13} /> Médico Oftalmólogo · CMP Colegiado
                </div>
                <p style={{ fontSize: mob ? 14 : 15, color: "var(--body)", lineHeight: 1.9, marginBottom: 16 }}>
                  El Dr. Alfredo Mendoza dedicó su vida a la salud visual desde que, siendo estudiante de medicina, comprendió que la vista es el sentido que más define nuestra calidad de vida. Nacido en Cajamarca, decidió quedarse en la región para servir a su gente.
                </p>
                <p style={{ fontSize: mob ? 14 : 15, color: "var(--body)", lineHeight: 1.9, marginBottom: 28 }}>
                  Fundó Ópticas GMA con una convicción clara: que cada persona de Jaén merece atención ocular de nivel hospitalario, con un trato cercano y sin complicaciones. Hoy lidera un equipo de especialistas comprometidos con ese mismo propósito.
                </p>

                {/* Credenciales */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {CREDENTIALS.map((c) => (
                    <div key={c.text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ color: P, marginTop: 1, flexShrink: 0 }}>{c.icon}</div>
                      <span style={{ fontSize: 13.5, color: "var(--head)", lineHeight: 1.5 }}>{c.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button className="btn" onClick={() => setBk(true)}>
                    Agendar con el Dr. <ArrowRight size={14} />
                  </button>
                  <a
                    href="https://wa.me/51952950811"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "0 22px",
                      height: 44,
                      borderRadius: 22,
                      border: "1.5px solid var(--br)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--head)",
                      textDecoration: "none",
                      transition: "border-color .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = P)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--br)")}
                  >
                    <Phone size={14} /> Consultar por WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── Misión y visión ── */}
        <div style={{ background: "var(--bg)", padding: mob ? "52px 18px 60px" : `72px ${px} 80px` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
                <SectionLabel style={{ justifyContent: "center" }}>Nuestra razón de ser</SectionLabel>
                <h2 style={{ fontFamily: "var(--hf)", fontSize: mob ? 24 : 34, fontWeight: 800 }}>
                  Misión y Visión
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 24 }}>
              {[
                {
                  icon: <Heart size={22} color="#fff" />,
                  label: "Misión",
                  title: "Proteger tu salud visual con excelencia",
                  desc: "Brindar atención oftalmológica y optométrica de alta calidad a la población de Jaén y la región, combinando tecnología de vanguardia con un trato humano, honesto y accesible. Queremos que cada paciente salga de nuestra consulta con más claridad, tanto en su visión como en su mente.",
                },
                {
                  icon: <Eye size={22} color="#fff" />,
                  label: "Visión",
                  title: "Ser el referente visual del norte peruano",
                  desc: "Consolidarnos como el centro de salud ocular de mayor confianza en la macrorregión norte del Perú, liderando con innovación, formación continua y un compromiso inquebrantable con el bienestar de nuestros pacientes. Una vida con buena visión es una vida plena.",
                },
              ].map((item) => (
                <Reveal key={item.label} delay={80}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      padding: mob ? "28px 24px" : "36px 32px",
                      border: "0.5px solid var(--br)",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: G,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: P, marginBottom: 8 }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "var(--hf)", fontSize: mob ? 18 : 22, fontWeight: 700, color: "var(--head)", marginBottom: 14, lineHeight: 1.3 }}>
                      {item.title}
                    </div>
                    <p style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.85 }}>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Valores ── */}
        <div style={{ background: "#fff", padding: mob ? "52px 18px 60px" : `72px ${px} 80px` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
                <SectionLabel style={{ justifyContent: "center" }}>Lo que nos define</SectionLabel>
                <h2 style={{ fontFamily: "var(--hf)", fontSize: mob ? 24 : 34, fontWeight: 800 }}>
                  Nuestros valores
                </h2>
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: mob ? "1fr" : tab ? "1fr 1fr" : "repeat(4,1fr)",
                gap: 20,
              }}
            >
              {VALORES.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div
                    style={{
                      padding: "28px 24px",
                      borderRadius: 14,
                      border: "0.5px solid var(--br)",
                      background: "var(--bg)",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "rgba(var(--p-rgb),.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                        color: P,
                      }}
                    >
                      <v.Icon size={18} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--head)", marginBottom: 8 }}>{v.title}</div>
                    <p style={{ fontSize: 13.5, color: "var(--body)", lineHeight: 1.75 }}>{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Historia / Timeline ── */}
        <div style={{ background: "var(--bg)", padding: mob ? "52px 18px 60px" : `72px ${px} 80px` }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <SectionLabel style={{ justifyContent: "center" }}>Nuestra historia</SectionLabel>
                <h2 style={{ fontFamily: "var(--hf)", fontSize: mob ? 24 : 34, fontWeight: 800 }}>
                  El camino de GMA
                </h2>
              </div>
            </Reveal>

            <Timeline mob={mob} />
          </div>
        </div>

        {/* ── Foto clínica + cita inspiradora ── */}
        <div style={{ background: "#fff", padding: mob ? "52px 18px 60px" : `72px ${px} 80px` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: mob || tab ? "1fr" : "1.2fr 1fr",
                gap: mob ? 36 : 64,
                alignItems: "center",
              }}
            >
              <Reveal>
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 56px rgba(13,27,42,.1)" }}>
                  <img src={IMG.clinic} alt="Clínica Ópticas GMA" loading="lazy" decoding="async" style={{ width: "100%", height: mob ? 240 : 400, objectFit: "cover", display: "block" }} />
                </div>
              </Reveal>
              <Reveal delay={140}>
                <SectionLabel>Nuestra clínica</SectionLabel>
                <h2 style={{ fontFamily: "var(--hf)", fontSize: mob ? 22 : 30, fontWeight: 800, lineHeight: 1.25, marginBottom: 16 }}>
                  Un espacio pensado para tu comodidad
                </h2>
                <p style={{ fontSize: mob ? 14 : 15, color: "var(--body)", lineHeight: 1.875, marginBottom: 16 }}>
                  Nuestras instalaciones en Jaén están diseñadas para que cada visita sea una experiencia tranquila y de confianza. Contamos con sala de espera cómoda, consultorios privados y tecnología de diagnóstico actualizada.
                </p>
                <p style={{ fontSize: mob ? 14 : 15, color: "var(--body)", lineHeight: 1.875, marginBottom: 28 }}>
                  Porque la salud ocular merece un entorno a su altura.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { Icon: MapPin, text: "Jaén, Cajamarca — atención presencial" },
                    { Icon: Phone, text: "+51 952 950 811 · WhatsApp disponible" },
                    { Icon: CalendarCheck, text: "Lunes a Sábado · 8:00 am – 7:00 pm" },
                  ].map(({ Icon, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ color: P, flexShrink: 0 }}><Icon size={14} /></div>
                      <span style={{ fontSize: 13.5, color: "var(--head)" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── CTA final — D4 ── */}
        <div style={{ background: "var(--bg)", padding: mob ? "40px 18px 56px" : `52px ${px} 64px` }}>
          <Reveal>
            <div
              style={{
                maxWidth: 1160,
                margin: "0 auto",
                borderRadius: 18,
                overflow: "hidden",
                background: "#fff",
                border: "0.5px solid var(--br)",
                boxShadow: "0 4px 24px rgba(13,27,42,.06)",
              }}
            >
              {/* Strip degradado */}
              <div style={{ height: 4, background: "linear-gradient(90deg, #B90FC2, #E83EF0, #cd6fa1)" }} />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: mob ? "24px 20px" : "28px 36px",
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >
                {/* Perfil doctor */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: G,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    AM
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--head)", marginBottom: 2 }}>
                      Dr. Alfredo Mendoza
                    </div>
                    <div style={{ fontSize: 12, color: "var(--body)" }}>Médico Oftalmólogo · Fundador GMA</div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 5,
                        fontSize: 11,
                        color: "var(--p)",
                        background: "rgba(var(--p-rgb),.07)",
                        border: "0.5px solid rgba(var(--p-rgb),.22)",
                        borderRadius: 20,
                        padding: "2px 9px",
                      }}
                    >
                      <MapPin size={10} /> Jaén, Cajamarca
                    </div>
                  </div>
                </div>

                {/* Divisor */}
                {!mob && (
                  <div style={{ width: 1, alignSelf: "stretch", background: "var(--br)", margin: "4px 0" }} />
                )}

                {/* Frase central */}
                <div style={{ flex: 1, minWidth: 200, maxWidth: 340 }}>
                  <p
                    style={{
                      fontSize: mob ? 13.5 : 14.5,
                      color: "var(--head)",
                      lineHeight: 1.65,
                      fontStyle: "italic",
                      marginBottom: 6,
                    }}
                  >
                    "Tu visión merece atención de primer nivel, cerca de casa."
                  </p>
                  <div style={{ fontSize: 11.5, color: "var(--body)" }}>
                    — Dr. Mendoza, Fundador de GMA Ópticas
                  </div>
                </div>

                {/* Divisor */}
                {!mob && (
                  <div style={{ width: 1, alignSelf: "stretch", background: "var(--br)", margin: "4px 0" }} />
                )}

                {/* Acciones */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: mob ? "stretch" : "flex-end", flexShrink: 0, width: mob ? "100%" : "auto" }}>
                  <button
                    className="btn"
                    onClick={() => setBk(true)}
                    style={{ justifyContent: mob ? "center" : undefined }}
                  >
                    Reservar mi cita <ArrowRight size={14} />
                  </button>
                  <a
                    href="https://wa.me/51952950811"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: mob ? "center" : undefined,
                      gap: 6,
                      height: 38,
                      borderRadius: 22,
                      border: "0.5px solid var(--br)",
                      padding: "0 18px",
                      fontSize: 13,
                      color: "var(--body)",
                      textDecoration: "none",
                      fontWeight: 500,
                      transition: "border-color .18s, color .18s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--p)"; e.currentTarget.style.color = "var(--p)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--br)"; e.currentTarget.style.color = "var(--body)"; }}
                  >
                    <Phone size={13} /> Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>

      {/* WA FAB */}
      <div className="wa" style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "scale(1)" : "scale(.7)", transition: "opacity .4s ease, transform .4s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: scrolled ? "all" : "none" }}>
        <WAIcon />
      </div>

      {booking && <BookingModal onClose={() => setBk(false)} />}
    </>
  );
}
