import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { SVCS } from "../../data/services";
import { useMobile } from "../../hooks/useMobile";

interface NavProps {
  scrolled: boolean;
  onBooking: () => void;
  onMenu: () => void;
  menuOpen?: boolean;
  onHome?: () => void;
}

export function Nav({
  scrolled,
  onBooking,
  onMenu,
  menuOpen = false,
  onHome,
}: NavProps) {
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const navigate = useNavigate();
  const [glassVisible, setGlass] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const svcRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const goHome = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const goSection = (id: string) => {
    if (window.location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const openSvc = () => {
    clearTimeout(closeTimer.current);
    setSvcOpen(true);
  };
  const closeSvc = () => {
    closeTimer.current = setTimeout(() => setSvcOpen(false), 120);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setGlass(total > 0 && window.scrollY / total >= 0.05);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${glassVisible ? " glass-on" : ""}`}>
      <div
        className={`nav-pill${scrolled ? " scrolled" : ""}`}
        style={mob ? {
          opacity: menuOpen ? 0 : 1,
          transform: menuOpen ? "translateY(-20px) scale(0.95)" : "translateY(0) scale(1)",
          transition: "opacity 380ms cubic-bezier(0.4,0,0.2,1), transform 400ms cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: menuOpen ? "none" : undefined,
        } : undefined}
      >
        <div
          id="nav-logo-anchor"
          onClick={onHome}
          style={{ cursor: onHome ? "pointer" : "default" }}
        >
          <Logo />
        </div>

        {/* ── Desktop links ── */}
        {!mob && !tab && (
          <div style={{ display: "flex", gap: 2, marginLeft: 12, flex: 1 }}>

            {/* Inicio */}
            <button className="nav-link" onClick={goHome}>
              Inicio
            </button>

            {/* Servicios — dropdown */}
            <div
              ref={svcRef}
              style={{ position: "relative" }}
              onMouseEnter={openSvc}
              onMouseLeave={closeSvc}
            >
              <button
                className={`nav-link${svcOpen ? " nav-link--active" : ""}`}
                onClick={() => setSvcOpen((v) => !v)}
              >
                Servicios
                <ChevronDown
                  size={12}
                  strokeWidth={2.5}
                  className={`nav-chevron${svcOpen ? " nav-chevron--up" : ""}`}
                />
              </button>

              {/* Dropdown panel */}
              <div className={`nav-dropdown${svcOpen ? " nav-dropdown--open" : ""}`}>
                <div className="nav-dropdown-inner">
                  <div className="nav-dropdown-grid">
                    {SVCS.map((s) => (
                      <button
                        key={s.id}
                        className="nav-dropdown-item"
                        onClick={() => { setSvcOpen(false); navigate(`/servicio/${s.id}`); }}
                      >
                        <div className="nav-dropdown-icon">
                          <s.Icon size={14} strokeWidth={1.8} />
                        </div>
                        <span className="nav-dropdown-label">{s.n}</span>
                        <ChevronRight size={10} className="nav-dropdown-arr" />
                      </button>
                    ))}
                  </div>
                  <div className="nav-dropdown-footer">
                    <button
                      className="nav-dropdown-all"
                      onClick={() => { setSvcOpen(false); goSection("servicios"); }}
                    >
                      Ver todos los servicios <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Nosotros */}
            <button className="nav-link" onClick={() => navigate("/nosotros")}>
              Nosotros
            </button>

            {/* Blog */}
            <button className="nav-link" onClick={() => navigate("/blog")}>
              Blog
            </button>

            {/* Contacto */}
            <button className="nav-link" onClick={() => goSection("contacto")}>
              Contacto
            </button>

          </div>
        )}

        <div
          style={{
            marginLeft: mob || tab ? "auto" : 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {!mob && (
            <button className="btn-nav" onClick={onBooking}>
              Reservar Cita{" "}
              <span className="arr">
                <ArrowRight size={12} />
              </span>
            </button>
          )}
          {(mob || tab) && (
            <button
              onClick={onMenu}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className={`nav-ham${menuOpen ? " open" : ""}`}
            >
              <span className="nav-ham-icon">
                <span className="nav-ham-line" />
                <span className="nav-ham-line" />
                <span className="nav-ham-line" />
              </span>
              <span className="nav-eye-icon" aria-hidden="true">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12 C5.5 6.5 9.5 5 12 5 C14.5 5 18.5 6.5 22 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M22 12 C18.5 17.5 14.5 19 12 19 C9.5 19 5.5 17.5 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                  <circle cx="13.4" cy="10.6" r="0.6" fill="white" opacity="0.8" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
