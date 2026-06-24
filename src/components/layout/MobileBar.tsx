import { useState, useEffect } from "react";
import { Phone, Calendar } from "lucide-react";
import { WAIcon } from "../ui/WAIcon";
import { BookingModal } from "../ui/BookingModal";
import { useMobile } from "../../hooks/useMobile";

export function MobileBar() {
  const mob = useMobile(768);
  const [scrolled, setSc] = useState(false);
  const [booking, setBk] = useState(false);

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!mob) return null;

  return (
    <>
      <div
        className="mbar"
        style={{
          transform: scrolled ? "translateY(0)" : "translateY(100%)",
          opacity: scrolled ? 1 : 0,
          transition: "transform .4s cubic-bezier(0.16,1,0.3,1), opacity .3s ease",
        }}
      >
        <a
          className="mbb"
          href="tel:+51952950811"
          style={{ textDecoration: "none" }}
        >
          <Phone size={18} />
          <span>Llamar</span>
        </a>

        <button className="mbb a" onClick={() => setBk(true)}>
          <Calendar size={18} />
          <span>Cita</span>
        </button>

        <a
          className="mbb"
          href="https://wa.me/51952950811"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <WAIcon sz={18} />
          <span>WhatsApp</span>
        </a>
      </div>

      {booking && <BookingModal onClose={() => setBk(false)} />}
    </>
  );
}
