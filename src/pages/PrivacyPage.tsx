import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { PageSEO } from "../components/seo/PageSEO";
import { Nav } from "../components/layout/Nav";
import { MobileDrawer } from "../components/layout/MobileDrawer";
import { BookingModal } from "../components/ui/BookingModal";
import { WAIcon } from "../components/ui/WAIcon";
import { useMobile } from "../hooks/useMobile";
import { scrollToSection } from "../utils/scroll";

interface Section { id: string; title: string; content: string[] }

const SECTIONS: Section[] = [
  {
    id: "responsable",
    title: "1. Responsable del tratamiento",
    content: [
      "El responsable del tratamiento de sus datos personales es Ópticas GMA, con domicilio en Jaén, Cajamarca, Perú. Puede contactarnos a través de:",
      "• Correo electrónico: contacto@opticasgma.pe",
      "• Teléfono / WhatsApp: +51 952 950 811",
      "• Dirección física: Jaén, Cajamarca, Perú",
    ],
  },
  {
    id: "datos",
    title: "2. Datos que recopilamos",
    content: [
      "Recopilamos únicamente los datos necesarios para prestar nuestros servicios de salud visual:",
      "Datos de identificación: nombre completo, DNI o documento de identidad equivalente.",
      "Datos de contacto: número de teléfono (WhatsApp), correo electrónico.",
      "Datos de salud: historial visual, diagnósticos, prescripciones y resultados de exámenes oculares. Estos datos están sujetos a protección especial conforme a la Ley N.º 29733.",
      "Datos de uso del sitio web: dirección IP, páginas visitadas, tiempo de sesión, a través de cookies analíticas (con su consentimiento).",
      "Datos de reservas: servicio solicitado, fecha y hora de la cita, motivo de consulta.",
    ],
  },
  {
    id: "finalidad",
    title: "3. Finalidad del tratamiento",
    content: [
      "Utilizamos sus datos personales para las siguientes finalidades:",
      "a) Gestión de citas: agendar, confirmar y recordar su cita médica.",
      "b) Prestación del servicio: realizar el examen visual, emitir diagnósticos y prescripciones, y dar seguimiento a su historial clínico.",
      "c) Comunicaciones: enviarle información sobre el estado de su cita, resultados de exámenes o instrucciones de cuidado post-consulta.",
      "d) Newsletter (solo con consentimiento explícito): consejos de salud visual y novedades de Ópticas GMA.",
      "e) Cumplimiento legal: conservar registros médicos conforme a la normativa sanitaria peruana.",
      "f) Mejora del servicio: análisis estadístico anonimizado del uso de la web para mejorar la experiencia del usuario.",
    ],
  },
  {
    id: "base",
    title: "4. Base legal del tratamiento",
    content: [
      "El tratamiento de sus datos se realiza bajo las siguientes bases legales, conforme a la Ley N.º 29733 y su Reglamento (D.S. 003-2013-JUS):",
      "• Ejecución de una relación contractual o precontractual: para gestionar su cita y prestarle el servicio solicitado.",
      "• Consentimiento: para el envío de newsletter y el uso de cookies no esenciales. Puede retirar su consentimiento en cualquier momento.",
      "• Obligación legal: para la conservación de historias clínicas según la normativa sanitaria.",
      "• Interés legítimo: para la seguridad del sistema informático y la prevención del fraude.",
    ],
  },
  {
    id: "conservacion",
    title: "5. Plazo de conservación",
    content: [
      "Conservamos sus datos durante el tiempo necesario para las finalidades descritas:",
      "• Datos de salud e historias clínicas: mínimo 10 años desde la última consulta, conforme a la normativa sanitaria peruana.",
      "• Datos de contacto y reservas: 3 años desde la última interacción, salvo que solicite su supresión antes.",
      "• Datos de newsletter: hasta que retire su consentimiento.",
      "• Datos de navegación (cookies): según la duración indicada en nuestra Política de Cookies.",
      "Transcurridos estos plazos, los datos serán suprimidos de forma segura o anonimizados.",
    ],
  },
  {
    id: "derechos",
    title: "6. Sus derechos",
    content: [
      "Conforme a la Ley N.º 29733 de Protección de Datos Personales, usted tiene derecho a:",
      "• Acceso: conocer qué datos personales suyos tratamos y para qué.",
      "• Rectificación: corregir datos inexactos o incompletos.",
      "• Cancelación (supresión): solicitar la eliminación de sus datos cuando ya no sean necesarios.",
      "• Oposición: oponerse al tratamiento de sus datos en determinadas circunstancias.",
      "• Portabilidad: recibir sus datos en formato estructurado y legible por máquina.",
      "Para ejercer cualquiera de estos derechos, envíe un correo a contacto@opticasgma.pe indicando su nombre, el derecho que desea ejercer y adjuntando copia de su documento de identidad. Le responderemos en un plazo máximo de 20 días hábiles.",
    ],
  },
  {
    id: "terceros",
    title: "7. Cesión de datos a terceros",
    content: [
      "Ópticas GMA no vende, alquila ni comparte sus datos personales con terceros con fines comerciales.",
      "Únicamente podemos comunicar sus datos en los siguientes supuestos:",
      "• Proveedores de servicios: empresas que nos prestan servicios tecnológicos (alojamiento web, software de gestión de citas) bajo contratos de confidencialidad y que actúan únicamente según nuestras instrucciones.",
      "• Obligación legal: cuando una norma o resolución judicial nos obligue a ello.",
      "• Derivación médica: con su consentimiento expreso, cuando sea necesario derivarle a otro especialista.",
      "Ningún dato de salud es compartido sin su consentimiento explícito.",
    ],
  },
  {
    id: "cookies",
    title: "8. Cookies",
    content: [
      "Nuestro sitio web utiliza cookies para mejorar su experiencia de navegación.",
      "Cookies esenciales: necesarias para el funcionamiento básico del sitio (gestión de sesión, seguridad). No requieren consentimiento.",
      "Cookies analíticas: utilizamos herramientas de análisis anonimizado para entender cómo se usa el sitio y mejorarlo. Solo se activan con su consentimiento.",
      "Cookies de preferencias: recuerdan sus elecciones (idioma, región). Solo se activan con su consentimiento.",
      "Puede gestionar o revocar su consentimiento sobre las cookies en cualquier momento desde la configuración de su navegador o a través del panel de gestión de cookies de este sitio.",
    ],
  },
  {
    id: "seguridad",
    title: "9. Seguridad de los datos",
    content: [
      "Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos personales contra acceso no autorizado, pérdida, destrucción o alteración, entre ellas:",
      "• Cifrado de datos en tránsito mediante TLS (HTTPS).",
      "• Control de acceso a los sistemas con autenticación y roles definidos.",
      "• Copias de seguridad periódicas en servidores seguros.",
      "• Formación del personal en protección de datos y confidencialidad.",
      "En caso de producirse una brecha de seguridad que afecte a sus datos, le notificaremos conforme a lo establecido en la legislación vigente.",
    ],
  },
  {
    id: "actualizacion",
    title: "10. Actualización de esta política",
    content: [
      "Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o en la legislación aplicable.",
      "Cuando realicemos cambios sustanciales, le notificaremos a través del correo electrónico que nos proporcionó o mediante un aviso destacado en nuestro sitio web.",
      "La fecha de la última actualización siempre aparecerá al pie de este documento.",
      "Última actualización: enero de 2025.",
    ],
  },
];

export function PrivacyPage() {
  const nav = useNavigate();
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const [booking, setBk] = useState(false);
  const [menu, setM] = useState(false);
  const [scrolled, setSc] = useState(false);
  const [active, setActive] = useState("responsable");

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

  const scrollTo = (id: string) => {
    setActive(id);
    scrollToSection(id);
  };

  return (
    <>
      <PageSEO
        title="Política de Privacidad | Ópticas GMA"
        description="Conoce cómo Ópticas GMA protege y trata tus datos personales conforme a la Ley 29733 de Protección de Datos Personales del Perú."
        path="/privacidad"
        noindex={true}
      />

      <Nav scrolled={scrolled} onBooking={() => setBk(true)} onMenu={() => setM(true)} menuOpen={menu} onHome={() => nav("/")} />
      <MobileDrawer open={menu} onClose={() => setM(false)} onBooking={() => setBk(true)} />

      <div style={{ paddingTop: 72, background: "var(--bg)", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "0.5px solid var(--br)", padding: mob ? "28px 18px 24px" : "36px 64px 32px" }}>
          <button
            onClick={() => nav("/")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "var(--body)", padding: "0 0 16px", transition: "color .2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--body)")}
          >
            <ArrowLeft size={14} /> Volver al inicio
          </button>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(var(--p-rgb),.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Shield size={22} color="var(--p)" />
            </div>
            <div>
              <h1 style={{ fontFamily: "var(--hf)", fontSize: mob ? 22 : 30, fontWeight: 800, color: "var(--head)", marginBottom: 6 }}>
                Política de Privacidad
              </h1>
              <p style={{ fontSize: 13.5, color: "var(--body)", lineHeight: 1.6 }}>
                Ópticas GMA · Última actualización: enero 2025 · Conforme a la Ley N.º 29733
              </p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1060, margin: "0 auto", padding: mob ? "28px 18px 80px" : `40px 64px 96px`, display: "grid", gridTemplateColumns: mob || tab ? "1fr" : "220px 1fr", gap: 40, alignItems: "start" }}>

          {/* Sidebar TOC */}
          {!mob && !tab && (
            <nav style={{ position: "sticky", top: 96 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--body)", marginBottom: 12, opacity: .6 }}>Contenido</div>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    background: active === s.id ? "rgba(var(--p-rgb),.08)" : "none",
                    border: "none", borderLeft: `2px solid ${active === s.id ? "var(--p)" : "transparent"}`,
                    padding: "7px 12px", borderRadius: "0 8px 8px 0",
                    fontSize: 12.5, fontWeight: active === s.id ? 700 : 400,
                    color: active === s.id ? "var(--p)" : "var(--body)",
                    cursor: "pointer", transition: "all .18s", marginBottom: 2,
                  }}
                >
                  {s.title.replace(/^\d+\.\s/, "")}
                </button>
              ))}
            </nav>
          )}

          {/* Content */}
          <div>
            <div style={{ background: "rgba(var(--p-rgb),.06)", border: "0.5px solid rgba(var(--p-rgb),.18)", borderRadius: 12, padding: "14px 18px", marginBottom: 36, fontSize: 13.5, color: "var(--head)", lineHeight: 1.65 }}>
              Su privacidad es importante para nosotros. Esta política explica qué datos recopilamos, por qué y cómo los protegemos, conforme a la Ley N.º 29733 de Protección de Datos Personales de Perú.
            </div>

            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} style={{ marginBottom: 44, scrollMarginTop: 100 }}>
                <h2 style={{ fontFamily: "var(--hf)", fontSize: mob ? 17 : 20, fontWeight: 800, color: "var(--head)", marginBottom: 16, paddingBottom: 10, borderBottom: "0.5px solid var(--br)" }}>
                  {section.title}
                </h2>
                {section.content.map((para, i) => (
                  <p key={i} style={{ fontSize: 14.5, color: "var(--body)", lineHeight: 1.8, marginBottom: 10 }}>
                    {para}
                  </p>
                ))}
              </section>
            ))}

            {/* Contact box */}
            <div style={{ background: "var(--dark-bg)", borderRadius: 14, padding: "24px 26px" }}>
              <div style={{ fontFamily: "var(--hf)", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>¿Preguntas sobre tu privacidad?</div>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: 16 }}>
                Escríbenos a <span style={{ color: "var(--p)" }}>contacto@opticasgma.pe</span> o llámanos al <span style={{ color: "var(--p)" }}>+51 952 950 811</span>. Respondemos en máximo 20 días hábiles.
              </p>
              <button className="btn" style={{ fontSize: 13 }} onClick={() => setBk(true)}>
                Contactar · Reservar cita
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wa" style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "scale(1)" : "scale(.7)", transition: "opacity .4s ease, transform .4s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: scrolled ? "all" : "none" }}>
        <WAIcon />
      </div>

      {booking && <BookingModal onClose={() => setBk(false)} />}
    </>
  );
}
