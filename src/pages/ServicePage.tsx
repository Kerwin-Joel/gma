import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SVCS } from "../data/services";
import { PageSEO } from "../components/seo/PageSEO";
import { serviceSchema, breadcrumbSchema } from "../seo/schemas";
import { ServiceDetail } from "./ServiceDetail";
import { Nav } from "../components/layout/Nav";
import { MobileDrawer } from "../components/layout/MobileDrawer";
import { BookingModal } from "../components/ui/BookingModal";
import { WAIcon } from "../components/ui/WAIcon";

export function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBk] = useState(false);
  const [scrolled, setSc] = useState(false);
  const [menu, setM] = useState(false);

  const svc = SVCS.find((s) => s.id === id);

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 120);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    document.body.style.overflow = menu || booking ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, booking]);

  if (!svc) {
    navigate("/");
    return null;
  }

  return (
    <>
      <PageSEO
        title={`${svc.n} — Ópticas GMA | Jaén`}
        description={`${svc.full ?? svc.d} Ópticas GMA, Jaén, Cajamarca.`}
        path={`/servicio/${svc.id}`}
        keywords={`${svc.n} Jaén, ${svc.n} Cajamarca, ópticas Jaén, salud visual Perú`}
        jsonLd={[
          serviceSchema(svc.n, svc.full ?? svc.d, `/servicio/${svc.id}`),
          breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/#servicios" }, { name: svc.n, path: `/servicio/${svc.id}` }])
        ]}
      />

      <Nav
        scrolled={scrolled}
        onBooking={() => setBk(true)}
        onMenu={() => setM(true)}
        menuOpen={menu}
        onHome={() => navigate("/")}
      />
      <MobileDrawer open={menu} onClose={() => setM(false)} onBooking={() => setBk(true)} />

      <ServiceDetail svc={svc} onBack={() => navigate(-1)} onBooking={() => setBk(true)} />

      <div
        className="wa"
        style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "scale(1)" : "scale(0.7)", transition: "opacity .4s ease, transform .4s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: scrolled ? "all" : "none" }}>
        <WAIcon />
      </div>

      {booking && <BookingModal onClose={() => setBk(false)} />}
    </>
  );
}
