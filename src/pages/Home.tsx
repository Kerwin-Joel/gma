import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageSEO } from "../components/seo/PageSEO";
import { faqSchema } from "../seo/schemas";
import { scrollToSection } from "../utils/scroll";
import { Nav } from "../components/layout/Nav";
import { MobileDrawer } from "../components/layout/MobileDrawer";
import { BookingModal } from "../components/ui/BookingModal";
import { WAIcon } from "../components/ui/WAIcon";
import { Hero } from "../components/sections/Hero";
import { TrustedPartner } from "../components/sections/TrustedPartner";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { About } from "../components/sections/About";
import { BookingTestimonial } from "../components/sections/BookingTestimonial";
import { Blog } from "../components/sections/Blog";
import { Store } from "../components/sections/Store";
import { NavIntro } from "../components/ui/NavIntro";
export function Home() {
  const location = useLocation();
  const [prog, setP] = useState(0);
  const [menu, setM] = useState(false);
  const [scrolled, setSc] = useState(false);
  const [booking, setBk] = useState(false);
  const [introReady] = useState(true);

  useEffect(() => {
    const fn = () => {
      const t = document.documentElement.scrollHeight - window.innerHeight;
      setP(t > 0 ? (window.scrollY / t) * 100 : 0);
      setSc(window.scrollY > 120);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu || booking ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, booking]);

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) return;
    const t = setTimeout(() => scrollToSection(scrollTo), 80);
    return () => clearTimeout(t);
  }, [location.state]);


  return (
    <>
      <PageSEO
        title="Ópticas GMA | Especialistas en Salud Visual — Jaén, Cajamarca"
        description="Ópticas GMA en Jaén, Cajamarca. Examen de la vista, graduación de lentes, consulta oftalmológica y salud visual infantil. Dr. Antonio Santamaría — más de 15 años cuidando tu visión."
        path="/"
        keywords="ópticas Jaén, optometría Jaén, examen de vista Jaén, lentes Cajamarca, oftalmólogo Jaén, salud visual Perú"
        jsonLd={faqSchema([
          { q: "¿Dónde están ubicadas las Ópticas GMA?", a: "Estamos en Jaén, Cajamarca, Perú. Atendemos de lunes a sábado de 8:00 am a 7:00 pm." },
          { q: "¿Qué servicios ofrece Ópticas GMA?", a: "Ofrecemos examen de la vista, graduación de lentes, consulta oftalmológica, salud visual infantil, medición de presión ocular y adaptación de lentes de contacto." },
          { q: "¿Cómo reservo una cita en Ópticas GMA?", a: "Puedes reservar tu cita directamente en nuestra web o escribirnos por WhatsApp al +51 952 950 811." },
          { q: "¿El examen de la vista tiene costo?", a: "Contamos con precios accesibles y paquetes especiales. Contáctanos por WhatsApp para más información." },
        ])}
      />

      <div className="pbar" style={{ width: `${prog}%` }} />

      <NavIntro onComplete={() => {}} />
      <Nav scrolled={scrolled} onBooking={() => setBk(true)} onMenu={() => setM(true)} menuOpen={menu} />
      <MobileDrawer open={menu} onClose={() => setM(false)} onBooking={() => setBk(true)} />

      <div id="inicio"><Hero onBooking={() => setBk(true)} ready={introReady} /></div>
      <div id="nosotros"><TrustedPartner onBooking={() => setBk(true)} /></div>
      <div id="servicios"><Services /></div>
      <Process onBooking={() => setBk(true)} />
      <About />
      <BookingTestimonial />
      <div id="tienda"><Store /></div>
      <div id="blog"><Blog /></div>
      <div id="contacto" />

      <div
        className="wa"
        style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "scale(1)" : "scale(0.7)", transition: "opacity .4s ease, transform .4s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: scrolled ? "all" : "none" }}>
        <WAIcon />
      </div>

      {booking && <BookingModal onClose={() => setBk(false)} />}
    </>
  );
}
