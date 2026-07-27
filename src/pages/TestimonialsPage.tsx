import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ArrowRight, Quote } from "lucide-react";
import { PageSEO } from "../components/seo/PageSEO";
import { Nav } from "../components/layout/Nav";
import { MobileDrawer } from "../components/layout/MobileDrawer";
import { BookingModal } from "../components/ui/BookingModal";
import { WAIcon } from "../components/ui/WAIcon";
import { SectionLabel } from "../components/ui/Badge";
import { Reveal } from "../components/ui/Reveal";
import { useMobile } from "../hooks/useMobile";

interface Testimonial {
  name: string;
  initials: string;
  role: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  featured?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "María Elena Vásquez",
    initials: "MV",
    role: "Paciente",
    service: "Examen de la Vista",
    rating: 5,
    date: "Noviembre 2024",
    featured: true,
    text: "Llevaba años sin hacerme un examen de la vista. El Dr. Santamaría fue increíblemente paciente y detallado. Me detectaron un astigmatismo que no sabía que tenía. Los lentes nuevos cambiaron mi calidad de vida por completo. Nunca más voy a dejar pasar tanto tiempo sin revisarme.",
  },
  {
    name: "Carlos Huamán Ríos",
    initials: "CH",
    role: "Paciente",
    service: "Graduación de Lentes",
    rating: 5,
    date: "Octubre 2024",
    text: "Vine para actualizar mis lentes y salí con unos progresivos que no creía que me fuera a adaptar tan rápido. En tres días ya los usaba con total naturalidad. La atención es muy profesional y el local muy limpio y moderno.",
  },
  {
    name: "Rosa Delgado Paredes",
    initials: "RD",
    role: "Madre de paciente",
    service: "Salud Visual Infantil",
    rating: 5,
    date: "Octubre 2024",
    text: "Mi hijo de 7 años tenía bajo rendimiento escolar y no entendíamos por qué. La Dra. Quispe detectó que tenía miopía. Hoy, con sus lentes, mejoró sus notas y disfruta el colegio. Ojalá hubiéramos venido antes. Los recomiendo ampliamente.",
  },
  {
    name: "Juan Pablo Torres",
    initials: "JP",
    role: "Paciente",
    service: "Lentes de Contacto",
    rating: 5,
    date: "Septiembre 2024",
    text: "Siempre creí que mis ojos no tolerarían los lentes de contacto. Aquí me demostraron lo contrario. Me hicieron pruebas, adaptaron los lentes a mi caso y me los llevé ese mismo día. La primera prueba fue gratuita y el seguimiento, excelente.",
  },
  {
    name: "Lucia Fernández Chávez",
    initials: "LF",
    role: "Paciente",
    service: "Consulta Oftalmológica",
    rating: 5,
    date: "Septiembre 2024",
    text: "Tenía mucho miedo por los destellos que veía al cerrar los ojos. El especialista me explicó con total calma qué era y por qué ocurría. El diagnóstico fue claro, el tratamiento sencillo, y en dos semanas los síntomas desaparecieron. Excelente servicio.",
  },
  {
    name: "Armando Solis Becerra",
    initials: "AS",
    role: "Paciente",
    service: "Presión Ocular",
    rating: 5,
    date: "Agosto 2024",
    text: "Tengo antecedentes de glaucoma en la familia, así que vengo cada seis meses a controlar la presión ocular. El tonómetro de aire es completamente indoloro. Me da mucha tranquilidad saber que estoy en buenas manos.",
  },
  {
    name: "Patricia Núñez Castillo",
    initials: "PN",
    role: "Paciente",
    service: "Graduación de Lentes",
    rating: 5,
    date: "Agosto 2024",
    text: "Vine recomendada por una amiga y no me arrepiento. Las monturas son hermosas y la variedad impresionante. Me ayudaron a elegir la que mejor le sienta a mi rostro. Entregaron en 24 horas como prometieron. Todo perfectamente embalado.",
  },
  {
    name: "Enrique Villanueva",
    initials: "EV",
    role: "Paciente",
    service: "Examen de la Vista",
    rating: 5,
    date: "Julio 2024",
    text: "Trabajo más de 10 horas frente al ordenador y tenía dolores de cabeza constantes. Me recetaron lentes con filtro de luz azul y diseño antifatiga. El cambio fue inmediato. Ahora termino la jornada sin cefaleas. Totalmente recomendados.",
  },
  {
    name: "Sandra Mejía Rojas",
    initials: "SM",
    role: "Madre de paciente",
    service: "Salud Visual Infantil",
    rating: 5,
    date: "Julio 2024",
    text: "La Dra. Quispe tiene una forma especial de tratar a los niños. Mi hija de 5 años entró nerviosa y salió riendo. El ambiente es muy amigable. Detectaron un problema de estrabismo a tiempo y el tratamiento fue muy bien explicado.",
  },
];

const STATS = [
  { value: "5 000+", label: "Pacientes atendidos" },
  { value: "4.9 ★", label: "Valoración Google" },
  { value: "15+", label: "Años de experiencia" },
  { value: "98 %", label: "Recomendarían GMA" },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
      ))}
    </div>
  );
}

export function TestimonialsPage() {
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

  useEffect(() => {
    document.body.style.overflow = menu || booking ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, booking]);

  const featured = TESTIMONIALS.find((t) => t.featured)!;
  const rest = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <>
      <PageSEO
        title="Testimonios de Pacientes | Ópticas GMA — Jaén"
        description="Más de 5 000 pacientes confían en Ópticas GMA. Lee los testimonios reales de nuestros pacientes sobre exámenes de la vista, lentes y atención oftalmológica en Jaén, Cajamarca."
        path="/testimonios"
        keywords="testimonios ópticas Jaén, opiniones Ópticas GMA, pacientes satisfechos, reseñas oftalmólogo"
      />

      <Nav scrolled={scrolled} onBooking={() => setBk(true)} onMenu={() => setM(true)} menuOpen={menu} onHome={() => nav("/")} />
      <MobileDrawer open={menu} onClose={() => setM(false)} onBooking={() => setBk(true)} />

      <div style={{ paddingTop: 72, background: "var(--bg)", minHeight: "100vh" }}>

        {/* ── Hero ── */}
        <div
          style={{
            background: "var(--dark-bg)",
            backgroundImage: [
              "radial-gradient(ellipse 320px 200px at 85% 40%, rgba(232,62,240,.52) 0%, transparent 65%)",
              "radial-gradient(ellipse 220px 180px at 8% 85%, rgba(205,111,161,.38) 0%, transparent 60%)",
            ].join(", "),
            padding: mob ? "52px 18px 56px" : `72px ${px} 76px`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,4,10,.32)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 620 }}>
            <SectionLabel style={{ color: "rgba(255,255,255,.65)", borderColor: "rgba(255,255,255,.15)" }}>
              Testimonios
            </SectionLabel>
            <h1 style={{ fontFamily: "var(--hf)", fontSize: mob ? 28 : 40, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 14 }}>
              Lo que dicen nuestros pacientes
            </h1>
            <p style={{ fontSize: mob ? 14 : 15.5, color: "rgba(255,255,255,.62)", lineHeight: 1.75 }}>
              Más de 5 000 pacientes han confiado su salud visual a Ópticas GMA. Estas son algunas de sus historias.
            </p>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{ background: "#fff", borderBottom: "0.5px solid var(--br)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: `20px ${px}`, display: "grid", gridTemplateColumns: `repeat(${mob ? 2 : 4}, 1fr)`, gap: 0 }}>
            {STATS.map(({ value, label }, i) => (
              <div key={label} style={{ textAlign: "center", padding: "12px 8px", borderRight: i < 3 && !mob ? "0.5px solid var(--br)" : "none" }}>
                <div style={{ fontFamily: "var(--hf)", fontSize: mob ? 20 : 26, fontWeight: 800, color: "var(--p)", marginBottom: 2 }}>{value}</div>
                <div style={{ fontSize: 11.5, color: "var(--body)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: mob ? "36px 18px 80px" : `52px ${px} 96px` }}>

          {/* ── Featured testimonial ── */}
          <Reveal>
            <div
              style={{
                background: "var(--dark-bg)",
                backgroundImage: "radial-gradient(ellipse 280px 180px at 92% 20%, rgba(232,62,240,.4) 0%, transparent 65%), radial-gradient(ellipse 200px 160px at 5% 85%, rgba(205,111,161,.3) 0%, transparent 60%)",
                borderRadius: 20,
                padding: mob ? "32px 22px" : "48px 56px",
                marginBottom: 48,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "rgba(10,4,10,.28)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderRadius: 20 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <Quote size={36} style={{ color: "var(--p)", opacity: .6, marginBottom: 20 }} />
                <p style={{ fontFamily: "var(--hf)", fontSize: mob ? 17 : 22, color: "#fff", lineHeight: 1.65, marginBottom: 28, maxWidth: 680, fontStyle: "italic" }}>
                  "{featured.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                    {featured.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--hf)", fontSize: 15, fontWeight: 700, color: "#fff" }}>{featured.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 2 }}>{featured.service} · {featured.date}</div>
                    <div style={{ marginTop: 4 }}><Stars n={featured.rating} /></div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "1fr 1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={i * 55}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    border: "0.5px solid var(--br)",
                    padding: "22px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    transition: "box-shadow 280ms var(--ease-out), transform 280ms var(--ease-out)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 10px 32px rgba(50,26,49,.10)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}
                >
                  {/* Top: stars + service */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <Stars n={t.rating} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: "var(--p)", background: "rgba(var(--p-rgb),.08)", padding: "2px 9px", borderRadius: 20, textTransform: "uppercase", letterSpacing: ".06em", whiteSpace: "nowrap" }}>
                      {t.service}
                    </span>
                  </div>
                  {/* Quote */}
                  <p style={{ fontSize: 13.5, color: "var(--body)", lineHeight: 1.72, flex: 1, fontStyle: "italic" }}>"{t.text}"</p>
                  {/* Author */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "0.5px solid var(--br)", paddingTop: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--hf)", fontSize: 13, fontWeight: 700, color: "var(--head)" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "var(--body)", marginTop: 1 }}>{t.role} · {t.date}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── CTA ── */}
          <Reveal>
            <div style={{ background: "var(--p)", borderRadius: 16, padding: mob ? "28px 22px" : "40px 48px", marginTop: 56, display: "flex", flexDirection: mob ? "column" : "row", alignItems: mob ? "flex-start" : "center", justifyContent: "space-between", gap: 20 }}>
              <div>
                <div style={{ fontFamily: "var(--hf)", fontSize: mob ? 20 : 24, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
                  ¿Listo para ser nuestro próximo caso de éxito?
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.72)", lineHeight: 1.6 }}>
                  Agenda tu cita hoy — atención personalizada, sin esperas.
                </p>
              </div>
              <button
                className="btn"
                style={{ background: "#fff", color: "var(--p)", whiteSpace: "nowrap", flexShrink: 0 }}
                onClick={() => setBk(true)}
              >
                Reservar cita <ArrowRight size={14} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="wa" style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "scale(1)" : "scale(.7)", transition: "opacity .4s ease, transform .4s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: scrolled ? "all" : "none" }}>
        <WAIcon />
      </div>

      {booking && <BookingModal onClose={() => setBk(false)} />}
    </>
  );
}
