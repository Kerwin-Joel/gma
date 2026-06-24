import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, ChevronRight, ChevronDown,
  Home, Eye, Users, MapPin, Phone, Clock, BookOpen,
} from "lucide-react";
import { Logo } from "../ui/Logo";
import { WAIcon } from "../ui/WAIcon";
import { SVCS } from "../../data/services";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onBooking: () => void;
}

const LINKS = [
  { label: "Inicio",    sub: "Página principal",       icon: <Home size={18} />,     sectionId: "inicio" },
  { label: "Servicios", sub: "Exámenes y tratamientos", icon: <Eye size={18} />,      hasSubmenu: true },
  { label: "Nosotros",  sub: "Quiénes somos",           icon: <Users size={18} />,    sectionId: "nosotros" },
  { label: "Blog",      sub: "Artículos y consejos",    icon: <BookOpen size={18} />, sectionId: "blog" },
  { label: "Contacto",  sub: "Ubicación y horarios",    icon: <MapPin size={18} />,   sectionId: "contacto" },
];

export function MobileDrawer({ open, onClose, onBooking }: MobileDrawerProps) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const bdropRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const tidRef = useRef<ReturnType<typeof setTimeout>>();

  const handleNav = (sectionId?: string) => {
    onClose();
    if (!sectionId) return;
    const isHome = window.location.pathname === "/";
    const scroll = () => {
      if (sectionId === "inicio") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    };
    if (isHome) {
      setTimeout(scroll, 340);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  useEffect(() => {
    if (!open) return;
    clearTimeout(tidRef.current);
    cancelAnimationFrame(rafRef.current);
    setVisible(true);
  }, [open]);

  useEffect(() => {
    if (open || !visible) return;
    cancelAnimationFrame(rafRef.current);
    const p = panelRef.current;
    const b = bdropRef.current;
    if (p) {
      p.style.clipPath = "";
      p.style.opacity = "";
      p.style.willChange = "";
      p.classList.remove("open");
      p.classList.add("closing");
    }
    if (b) {
      b.classList.remove("open");
      b.classList.add("closing");
    }
    tidRef.current = setTimeout(() => setVisible(false), 580);
    return () => clearTimeout(tidRef.current);
  }, [open, visible]);

  useLayoutEffect(() => {
    if (!visible) return;
    rafRef.current = requestAnimationFrame(() => {
      const p = panelRef.current;
      const b = bdropRef.current;
      if (p) {
        p.classList.add("open");
        const settle = () => {
          p.style.clipPath = "none";
          p.style.opacity = "1";
          p.style.willChange = "auto";
        };
        p.addEventListener("animationend", settle, { once: true });
      }
      if (b) b.classList.add("open");
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div ref={bdropRef} className="sig-bdrop" onClick={onClose} />

      <div ref={panelRef} className="sig-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sig-head">
          <Logo />
          <button className="sig-x" onClick={onClose} aria-label="Cerrar menú">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <line x1="1" y1="1" x2="12" y2="12" stroke="rgba(50,26,49,.45)" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="1" x2="1" y2="12" stroke="rgba(50,26,49,.45)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="sig-divider" />

        {/* Nav links */}
        <nav className="sig-links">
          {LINKS.map(({ label, sub, icon, sectionId, hasSubmenu }, i) => (
            <div key={label}>
              <button
                className={`sig-link sig-link--${i}`}
                onClick={() => {
                  if (hasSubmenu) setOpenSub((v) => !v);
                  else handleNav(sectionId);
                }}
              >
                <div className="sig-link-icon">{icon}</div>
                <div className="sig-link-meta">
                  <div className="sig-link-row">
                    <span className="sig-link-text">{label}</span>
                  </div>
                  <span className="sig-link-sub">{sub}</span>
                </div>
                {hasSubmenu ? (
                  <ChevronDown
                    size={14}
                    className="sig-link-arr"
                    style={{
                      transition: "transform 360ms cubic-bezier(0.4,0,0.2,1)",
                      transform: openSub ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                ) : (
                  <ArrowRight size={12} className="sig-link-arr" />
                )}
              </button>

              {/* Servicios submenu */}
              {hasSubmenu && (
                <div className="sig-submenu" style={{ gridTemplateRows: openSub ? "1fr" : "0fr" }}>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ paddingLeft: 20, paddingBottom: 6 }}>
                      {SVCS.map((svc) => (
                        <button
                          key={svc.id}
                          className="sig-sub-item"
                          onClick={() => { onClose(); navigate(`/servicio/${svc.id}`); }}
                        >
                          <div className="sig-sub-icon">
                            <svc.Icon size={13} color="var(--p)" strokeWidth={1.8} />
                          </div>
                          <span className="sig-sub-label">{svc.n}</span>
                          <ChevronRight size={11} style={{ color: "rgba(50,26,49,.3)", flexShrink: 0 }} />
                        </button>
                      ))}
                      <button
                        className="sig-sub-all"
                        onClick={() => handleNav("servicios")}
                      >
                        Ver todos los servicios <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom — CTA + WhatsApp + contacto */}
        <div className="sig-bottom">
          <div className="sig-cta-row">
            <button className="sig-cta" onClick={() => { onClose(); onBooking(); }}>
              Reservar Cita <ArrowRight size={14} />
            </button>
            <button className="sig-wa" aria-label="Contactar por WhatsApp">
              <WAIcon sz={18} />
            </button>
          </div>

          <div className="sig-contact">
            <div className="sig-contact-row">
              <Phone size={11} />
              <span>+51 952 950 811</span>
            </div>
            <div className="sig-contact-row">
              <Clock size={11} />
              <span>Lun–Sáb 8:30–21:00</span>
              <div className="sig-open">
                <div className="sig-open-dot" />
                <span>Jaén - Cajamarca</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
