import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

const IgIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FbIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YtIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);
import { useNavigate } from "react-router-dom";
import { SVCS } from "../../data/services";
import { useMobile } from "../../hooks/useMobile";

const P = "#e83ef0";
const G = "linear-gradient(135deg, #e83ef0, #cd6fa1)";
const BG = "#1a0a19";
const MUT = "rgba(255,255,255,.38)";
const DIM = "rgba(255,255,255,.07)";

const SOCIAL = [
  {
    key: "ig",
    label: "Instagram",
    icon: <IgIcon size={14} />,
    url: "https://www.instagram.com/opticasgma",
    color: "#E1306C",
  },
  {
    key: "fb",
    label: "Facebook",
    icon: <FbIcon size={14} />,
    url: "https://www.facebook.com/GMAOptica",
    color: "#1877F2",
  },
  {
    key: "wa",
    label: "WhatsApp",
    icon: <MessageCircle size={14} />,
    url: "https://wa.me/51952950811",
    color: "#25D366",
  },
];

function Chip({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: `0.5px solid rgba(232,62,240,.3)`,
        borderRadius: 20,
        padding: "5px 11px",
        fontSize: 12,
        color: P,
        background: "rgba(232,62,240,.04)",
        cursor: onClick ? "pointer" : "default",
        marginBottom: 7,
        transition: "background .18s",
      }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.background = "rgba(232,62,240,.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(232,62,240,.04)";
      }}
    >
      {icon}
      {children}
    </div>
  );
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "rgba(232,62,240,.6)",
        marginBottom: 13,
      }}
    >
      {children}
    </div>
  );
}

function FooterLink({
  onClick,
  href,
  children,
}: {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    fontSize: 12.5,
    color: MUT,
    marginBottom: 8,
    cursor: "pointer",
    transition: "color .18s",
    display: "block",
    textDecoration: "none",
  };
  const enter = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = "rgba(255,255,255,.78)");
  const leave = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = MUT);
  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        {children}
      </a>
    );
  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {children}
    </div>
  );
}

function NewsletterBlock({ maxW }: { maxW: number | string }) {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "sending" | "done">("idle");
  const [touched, setTouched] = useState(false);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const err   = touched && !valid
    ? (email.trim() ? "Formato de email inválido" : "Ingresa tu correo")
    : "";

  const submit = () => {
    setTouched(true);
    if (!valid || status !== "idle") return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 1500);
  };

  if (status === "done") return (
    <div style={{
      padding: "20px 18px 22px",
      background: "rgba(232,62,240,.07)",
      border: "0.5px solid rgba(232,62,240,.22)",
      borderRadius: 14,
      animation: "ftNlIn .55s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* Checkmark circle */}
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: G,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 14,
        boxShadow: "0 0 0 8px rgba(232,62,240,.10), 0 0 0 16px rgba(232,62,240,.04)",
        animation: "ftNlPop .58s cubic-bezier(0.34,1.56,0.64,1) .1s both",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <polyline points="20 6 9 17 4 12"
            strokeDasharray="24" strokeDashoffset="24"
            style={{ animation: "ftNlCheck .42s cubic-bezier(0.16,1,0.3,1) .52s forwards" }}
          />
        </svg>
      </div>
      <div style={{
        fontFamily: "var(--hf)", fontSize: 15, fontWeight: 700,
        color: "#fff", marginBottom: 7,
        animation: "ftNlIn .45s cubic-bezier(0.16,1,0.3,1) .28s both",
      }}>
        ¡Ya eres parte de GMA!
      </div>
      <p style={{
        fontSize: 12.5, color: MUT, lineHeight: 1.7, margin: 0,
        animation: "ftNlIn .45s cubic-bezier(0.16,1,0.3,1) .38s both",
      }}>
        Te enviamos la bienvenida a{" "}
        <strong style={{ color: "rgba(255,255,255,.65)", fontWeight: 600 }}>{email}</strong>.{" "}
        Revisa tu bandeja — y la carpeta de spam por si acaso.
      </p>
    </div>
  );

  return (
    <>
      <p style={{ fontSize: 12.5, color: MUT, lineHeight: 1.75, marginBottom: 14 }}>
        Consejos de salud visual y novedades de Ópticas GMA directo a tu correo.
      </p>

      {/* Input row */}
      <div style={{
        display: "flex",
        border: `0.5px solid ${err ? "rgba(226,75,74,.45)" : "rgba(232,62,240,.22)"}`,
        borderRadius: 9, overflow: "hidden",
        maxWidth: maxW, marginBottom: err ? 6 : 10,
        transition: "border-color .22s",
      }}>
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={e => { setEmail(e.target.value); if (touched) setTouched(false); }}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={{
            flex: 1, background: "rgba(255,255,255,.05)", border: "none",
            padding: "11px 13px", fontSize: 12.5, color: "#fff",
            fontFamily: "var(--sf)", outline: "none", minWidth: 0,
          }}
        />
        <button
          onClick={submit}
          disabled={status === "sending"}
          aria-label="Suscribirse al newsletter"
          style={{
            background: G, border: "none", padding: "0 16px",
            cursor: status === "sending" ? "default" : "pointer",
            color: "#fff", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            minWidth: 48, transition: "opacity .2s",
            opacity: status === "sending" ? .7 : 1,
          }}
        >
          {status === "sending" ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              style={{ animation: "ftNlSpin .75s linear infinite" }}
              aria-hidden="true">
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          ) : (
            <ArrowRight size={15} />
          )}
        </button>
      </div>

      {/* Inline error */}
      {err && (
        <span style={{
          fontSize: 11, color: "#e24b4a", display: "block", marginBottom: 8,
          animation: "ftNlErrIn .22s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {err}
        </span>
      )}

      {/* Trust pills */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {["Sin spam", "Cada 2 semanas", "Cancelar siempre"].map(t => (
          <span key={t} style={{
            fontSize: 10.5, padding: "3px 8px", borderRadius: 10,
            background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.28)",
            border: "0.5px solid rgba(255,255,255,.07)",
          }}>
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

export function Footer() {
  const nav = useNavigate();
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";

  const goSection = (id: string) => {
    if (window.location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      nav("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer style={{ background: BG, width: "100%", overflowX: "hidden" }}>
      {/* Accent bar */}
      <div style={{ height: 3, background: G }} />

      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: mob ? `36px ${px} 0` : tab ? `48px ${px} 0` : `56px ${px} 0`,
        }}
      >
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mob
              ? "1fr"
              : tab
                ? "1fr 1fr"
                : "1.6fr 1fr 1fr 1.2fr",
            gap: mob ? 32 : tab ? 28 : 40,
            paddingBottom: mob ? 28 : 44,
            borderBottom: `0.5px solid ${DIM}`,
          }}
        >
          {/* ── Col 1: Brand ── */}
          <div style={{ gridColumn: tab && !mob ? "1 / -1" : "auto" }}>
            <div
              style={{
                fontFamily: "var(--hf)",
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-.01em",
                marginBottom: 8,
              }}
            >
              GMA <span style={{ color: P }}>Ópticas</span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: MUT,
                lineHeight: 1.8,
                marginBottom: 18,
                maxWidth: 280,
              }}
            >
              Visión clara, vida plena. Cuidando tu salud ocular con tecnología
              y calidez humana.
            </p>

            {/* CTA */}
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: G,
                border: "none",
                borderRadius: 22,
                padding: "10px 18px",
                color: "#fff",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 16,
              }}
              onClick={() => goSection("contacto")}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Reservar cita
            </button>

            {/* Contact chips */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 18,
              }}
            >
              <Chip
                onClick={() => window.open("tel:+51952950811")}
                icon={
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
              >
                +51 952 950 811
              </Chip>
              <Chip
                onClick={() =>
                  window.open("https://wa.me/51952950811", "_blank")
                }
                icon={<MessageCircle size={12} />}
              >
                WhatsApp directo
              </Chip>
            </div>

            {/* Social row */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {SOCIAL.map(({ key, label, icon, url, color }) => (
                <button
                  key={key}
                  aria-label={label}
                  onClick={() =>
                    window.open(url, "_blank", "noopener,noreferrer")
                  }
                  title={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    flexShrink: 0,
                    border: `0.5px solid rgba(255,255,255,.12)`,
                    background: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,.38)",
                    transition:
                      "border-color .18s, color .18s, background .18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.background = `${color}18`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.12)";
                    e.currentTarget.style.color = "rgba(255,255,255,.38)";
                    e.currentTarget.style.background = "none";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* ── Col 2: Servicios ── */}
          <div>
            <ColTitle>Servicios</ColTitle>
            {SVCS.map((s) => (
              <FooterLink key={s.id} onClick={() => nav(`/servicio/${s.id}`)}>
                {s.n}
              </FooterLink>
            ))}
          </div>

          {/* ── Col 3: Empresa ── */}
          <div>
            <ColTitle>Empresa</ColTitle>
            <FooterLink onClick={() => goSection("nosotros")}>
              Nosotros
            </FooterLink>
            <FooterLink onClick={() => nav("/testimonios")}>
              Testimonios
            </FooterLink>
            <FooterLink onClick={() => nav("/blog")}>Artículos</FooterLink>
            <FooterLink onClick={() => nav("/privacidad")}>
              Política de privacidad
            </FooterLink>

            <div style={{ marginTop: 20 }}>
              <ColTitle>Síguenos</ColTitle>
              {SOCIAL.map(({ key, label, url, icon }) => (
                <FooterLink key={key} href={url}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    {icon} {label}
                  </span>
                </FooterLink>
              ))}
            </div>
          </div>

          {/* ── Col 4: Newsletter ── */}
          <div style={{ gridColumn: tab && !mob ? "1 / -1" : "auto" }}>
            <ColTitle>Newsletter</ColTitle>
            <NewsletterBlock maxW={tab ? 400 : "none"} />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            padding: mob ? "16px 0 72px" : "16px 0 24px",
          }}
        >
          <span style={{ fontSize: 11.5, color: "rgba(255,255,255,.2)" }}>
            © 2025{" "}
            <span style={{ color: "rgba(232,62,240,.55)" }}>Ópticas GMA</span>
            {" · "}Diseñado por{" "}
            <span
              style={{
                color: "rgba(255,255,255,.35)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                cursor: "pointer",
              }}
            >
              Kerwin Sandoval
            </span>
          </span>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button
              onClick={() => nav("/privacidad")}
              style={{
                background: "none",
                border: "none",
                fontSize: 11.5,
                color: "rgba(255,255,255,.2)",
                cursor: "pointer",
                transition: "color .18s",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = MUT)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,.2)")
              }
            >
              Privacidad
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIAL.map(({ key, label, icon, url }) => (
                <span
                  key={key}
                  title={label}
                  onClick={() =>
                    window.open(url, "_blank", "noopener,noreferrer")
                  }
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(255,255,255,.2)",
                    transition: "color .18s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = MUT)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,.2)")
                  }
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
